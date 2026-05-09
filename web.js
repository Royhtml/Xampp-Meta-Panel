const { exec } = require('child_process');
const http = require('http');
const XAMPP_PATH = 'C:\\xampp';

const runBg = (cmd, msg) => {
  exec(`cmd /c "${cmd}"`, (err) => {
    if (err) console.error(`[ERROR] ${err.message}`);
    else console.log(`[OK] ${msg}`);
  });
};

const execStart = (cmd, msg, res) => {
  exec(`cmd /c "${cmd}"`, (err) => {
    if (err) res.end(JSON.stringify({ success: false, message: err.message }));
    else res.end(JSON.stringify({ success: true, message: msg }));
  });
};

const execStop = (cmd, msg, res) => {
  exec(cmd, () => res.end(JSON.stringify({ success: true, message: msg })));
};

const execStream = (cmd, res) => {
  const child = exec(cmd, { maxBuffer: 50*1024*1024 });
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  child.stdout.on('data', (d) => res.write(d));
  child.stderr.on('data', (d) => res.write(d));
  child.on('close', () => res.end());
  child.on('error', (e) => { res.write('Error: '+e.message); res.end(); });
  return child;
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
  const url = req.url;

  if (url === '/api/start-apache')  execStart(`${XAMPP_PATH}\\apache_start.bat`, 'Apache Started', res);
  else if (url === '/api/stop-apache')   execStop('taskkill /F /IM httpd.exe /T', 'Apache Force Stopped', res);
  else if (url === '/api/start-mysql')    execStart(`${XAMPP_PATH}\\mysql_start.bat`, 'MySQL Started', res);
  else if (url === '/api/stop-mysql')     execStop('taskkill /F /IM mysqld.exe /T', 'MySQL Force Stopped', res);

  else if (url.startsWith('/api/mysql-query?')) {
    let q = decodeURIComponent(url.split('query=')[1]);
    const blocked = 'GRANT,REVOKE,SHUTDOWN,LOAD_FILE,INTO OUTFILE'.split(',');
    if (blocked.some(b => q.toUpperCase().includes(b.trim()))) {
      res.end(JSON.stringify({success:false,message:'Command blocked.'})); return;
    }
    exec(`"${XAMPP_PATH}\\mysql\\bin\\mysql.exe" -u root -e "${q.replace(/"/g, '\\"')}"`,
      {maxBuffer:10*1024*1024}, (err,stdout,stderr) => {
        if (err && !stdout) res.end(JSON.stringify({success:false,message:stderr||err.message}));
        else res.end(JSON.stringify({success:true,result:(stdout||'').trim()}));
      });
  }

  else if (url.startsWith('/api/run-stream?')) {
    let params = new URL(`http://localhost${url}`).searchParams;
    let cmd = params.get('cmd');
    if (cmd) execStream(cmd, res);
    else res.end(JSON.stringify({error:'Missing cmd'}));
  }

  else if (url.startsWith('/api/run?')) {
    let params = new URL(`http://localhost${url}`).searchParams;
    let cmd = params.get('cmd');
    if (cmd) exec(cmd,{maxBuffer:50*1024*1024,timeout:30000},(err,stdout,stderr)=>{
      res.end(JSON.stringify({success:!err,result:(stdout||'').trim(),error:stderr||''}));
    });
    else res.end(JSON.stringify({error:'Missing cmd'}));
  }

  else if (url.startsWith('/api/kill-stream?')) {
    let params = new URL(`http://localhost${url}`).searchParams;
    let pid = params.get('pid');
    if (pid) exec(`taskkill /F /PID ${pid} /T`,()=>res.end(JSON.stringify({success:true})));
    else res.end(JSON.stringify({error:'Missing pid'}));
  }

  else res.end(JSON.stringify({error:'Endpoint not found'}));
});

server.listen(8080, () => {
  console.log(`Meta Panel API on http://localhost:8080`);
  runBg(`${XAMPP_PATH}\\apache_start.bat`, 'Apache started');
  runBg(`${XAMPP_PATH}\\mysql_start.bat`, 'MariaDB started');
});

process.on('SIGINT', () => {
  exec('taskkill /F /IM httpd.exe /T', () =>
    exec('taskkill /F /IM mysqld.exe /T', () => process.exit(0)));
});