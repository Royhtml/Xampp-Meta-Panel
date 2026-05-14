const { exec } = require('child_process');
const http = require('http');
const XAMPP_PATH = 'C:\\xampp'; 

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const execute = (command, msg) => {
        exec(`cmd /c "${command}"`, (err) => {
            if (err) {
                res.end(JSON.stringify({ success: false, message: err.message }));
            } else {
                res.end(JSON.stringify({ success: true, message: msg }));
            }
        });
    };

    if (req.url === '/api/start-apache') execute(`${XAMPP_PATH}\\apache_start.bat`, "Apache Started");
    else if (req.url === '/api/stop-apache') execute(`${XAMPP_PATH}\\apache_stop.bat`, "Apache Stopped");
    else if (req.url === '/api/start-mysql') execute(`${XAMPP_PATH}\\mysql_start.bat`, "MySQL Started");
    else if (req.url === '/api/stop-mysql') execute(`${XAMPP_PATH}\\mysql_stop.bat`, "MySQL Stopped");
    else res.end(JSON.stringify({ error: "Not Found" }));
});

const PORT = 8080; 
server.listen(PORT, () => {
    console.log(`\x1b[36m%s\x1b[0m`, `Meta Backend Bridge running on http://localhost:${PORT}`);
    console.log(`\x1b[36m%s\x1b[0m`, "Open Webserver at https://xampp-meta-panel.vercel.app/");
    console.log(`\x1b[36m%s\x1b[0m`, "To start Apache and Mariadb open PhpMyAdmin");
    console.log(`\x1b[36m%s\x1b[0m`, "To stop, press Ctrl+C");
});

// Copy Path web.js
// Running Node Server Website Key "node web.js" open terminal vscode Or create folder ./web/web.js
// Create file Web.js by Dwi Bakti N Dev/Roy