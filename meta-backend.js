// meta-backend.js
const { exec } = require('child_process');
const http = require('http');
const XAMPP_PATH = 'C:\\xampp'; 

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/api/start-apache') {
        exec(`"${XAMPP_PATH}\\apache_start.bat"`, (err) => {
            res.end(JSON.stringify({ success: !err, message: "Apache Started" }));
        });
    } 
    else if (req.url === '/api/stop-apache') {
        exec(`"${XAMPP_PATH}\\apache_stop.bat"`, (err) => {
            res.end(JSON.stringify({ success: !err, message: "Apache Stopped" }));
        });
    }
    else if (req.url === '/api/start-mysql') {
        exec(`"${XAMPP_PATH}\\mysql_start.bat"`, (err) => {
            res.end(JSON.stringify({ success: !err, message: "MySQL Started" }));
        });
    }
    else if (req.url === '/api/stop-mysql') {
        exec(`"${XAMPP_PATH}\\mysql_stop.bat"`, (err) => {
            res.end(JSON.stringify({ success: !err, message: "MySQL Stopped" }));
        });
    }
    else {
        res.end(JSON.stringify({ error: "Not Found" }));
    }
});

const PORT = 8080; 
server.listen(PORT, () => {
    console.log(`Meta Backend Bridge running on http://localhost:${PORT}`);
});