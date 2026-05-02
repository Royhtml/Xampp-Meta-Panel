const { spawn } = require('child_process');
const http = require('http');

const XAMPP_PATH = 'C:\\xampp';

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    const runFast = (fileName) => {
        const child = spawn(`${XAMPP_PATH}\\${fileName}`, [], {
            detached: true,
            stdio: 'ignore',
            windowsHide: true 
        });
        child.unref(); 
        return true;
    };

    if (req.url.includes('/api/start-apache')) {
        runFast('apache_start.bat');
        res.end(JSON.stringify({ success: true, message: "Apache Berhasil" }));
    } 
    else if (req.url.includes('/api/stop-apache')) {
        runFast('apache_stop.bat');
        res.end(JSON.stringify({ success: true, message: "Apache Berhenti" }));
    }
    else if (req.url.includes('/api/start-mysql')) {
        runFast('mysql_start.bat');
        res.end(JSON.stringify({ success: true, message: "MySQL Berhasil" }));
    }
    else if (req.url.includes('/api/stop-mysql')) {
        runFast('mysql_stop.bat');
        res.end(JSON.stringify({ success: true, message: "MySQL Berhenti" }));
    }
    else {
        res.end(JSON.stringify({ status: "Meta Panel API Active" }));
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Bridge Ready on port ${PORT}`));