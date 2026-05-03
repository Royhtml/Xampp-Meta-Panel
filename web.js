const { exec } = require('child_process');
const http = require('http');
const XAMPP_PATH = 'C:\\xampp';

// Fungsi eksekusi background (Auto-Start)
const runCommand = (command, msg) => {
    exec(`cmd /c "${command}"`, (err) => {
        if (err) console.error(`\x1b[31m[ERROR]\x1b[0m ${err.message}`);
        else console.log(`\x1b[32m[OK]\x1b[0m ${msg}`);
    });
};

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const executeStart = (command, msg) => {
        exec(`cmd /c "${command}"`, (err) => {
            if (err) res.end(JSON.stringify({ success: false, message: err.message }));
            else res.end(JSON.stringify({ success: true, message: msg }));
        });
    };

    const executeStop = (command, msg) => {
        exec(command, () => {
            res.end(JSON.stringify({ success: true, message: msg }));
        });
    };

    if (req.url === '/api/start-apache') executeStart(`${XAMPP_PATH}\\apache_start.bat`, "Apache Started");
    else if (req.url === '/api/stop-apache') executeStop(`taskkill /F /IM httpd.exe /T`, "Apache Force Stopped");
    else if (req.url === '/api/start-mysql') executeStart(`${XAMPP_PATH}\\mysql_start.bat`, "MySQL Started");
    else if (req.url === '/api/stop-mysql') executeStop(`taskkill /F /IM mysqld.exe /T`, "MySQL Force Stopped");
    else res.end(JSON.stringify({ error: "Not Found" }));
});

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`\x1b[36m%s\x1b[0m`, `=================================================`);
    console.log(`\x1b[36m%s\x1b[0m`, `Meta Panel API running on http://localhost:${PORT}`);
    console.log(`\x1b[36m%s\x1b[0m`, `To FORCE STOP XAMPP and quit, press Ctrl+C`);
    console.log(`\x1b[36m%s\x1b[0m`, `=================================================`);

    console.log(`\n\x1b[33m[INFO]\x1b[0m Memulai Apache & MariaDB secara otomatis...`);
    runCommand(`${XAMPP_PATH}\\apache_start.bat`, "Apache berhasil dihidupkan");
    runCommand(`${XAMPP_PATH}\\mysql_start.bat`, "MariaDB berhasil dihidupkan");
});

const shutdown = () => {
    console.log(`\n\n\x1b[33m[INFO]\x1b[0m Mematikan Apache & MariaDB (Force Kill)...`);
    exec(`taskkill /F /IM httpd.exe /T`, () => {
        console.log(`\x1b[31m[STOP]\x1b[0m Proses Apache (httpd.exe) dibunuh.`);
        exec(`taskkill /F /IM mysqld.exe /T`, () => {
            console.log(`\x1b[31m[STOP]\x1b[0m Proses MariaDB (mysqld.exe) dibunuh.`);
            process.exit(0);
        });
    });
};

process.on('SIGINT', shutdown);  
process.on('SIGTERM', shutdown);