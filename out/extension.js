"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const cp = __importStar(require("node:child_process"));
const XAMPP_DIR = "C:\\xampp";
function activate(context) {
    let disposable = vscode.commands.registerCommand('xampp.openPanel', async () => {
        if (!fs.existsSync(XAMPP_DIR)) {
            vscode.window.showWarningMessage(`XAMPP tidak ditemukan di ${XAMPP_DIR}. Pastikan XAMPP sudah terinstal.`);
            return;
        }
        const panel = vscode.window.createWebviewPanel('xamppControl', 'XAMPP Control Panel & SQL Visualizer', vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'resources'))]
        });
        const iconPathOnDisk = vscode.Uri.file(path.join(context.extensionPath, 'resources', 'icon.png'));
        const iconUri = fs.existsSync(iconPathOnDisk.fsPath) ? panel.webview.asWebviewUri(iconPathOnDisk) : '';
        panel.iconPath = iconPathOnDisk;
        panel.webview.html = getWebviewContent(iconUri.toString());
        panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'startService':
                    runXamppCommand(message.service, 'start', panel);
                    return;
                case 'stopService':
                    runXamppCommand(message.service, 'stop', panel);
                    return;
                case 'openShell':
                    openMariaDBShell();
                    return;
                case 'fixBugs':
                    fixXamppBugs(panel);
                    return;
                case 'openAdmin':
                    openAdminPanel(message.service);
                    return;
                case 'openConfig':
                    openConfigFile(message.service);
                    return;
                case 'openLog':
                    openLogFile(message.service);
                    return;
            }
        }, undefined, context.subscriptions);
    });
    context.subscriptions.push(disposable);
}
function openAdminPanel(service) {
    const url = service === 'apache' ? 'http://localhost' : 'http://localhost/phpmyadmin';
    vscode.env.openExternal(vscode.Uri.parse(url));
}
function openConfigFile(service) {
    const configPath = service === 'apache'
        ? path.join(XAMPP_DIR, 'apache', 'conf', 'httpd.conf')
        : path.join(XAMPP_DIR, 'mysql', 'bin', 'my.ini');
    openFileInEditor(configPath);
}
function openLogFile(service) {
    let logPath = '';
    if (service === 'apache') {
        logPath = path.join(XAMPP_DIR, 'apache', 'logs', 'error.log');
    }
    else {
        const dataDir = path.join(XAMPP_DIR, 'mysql', 'data');
        logPath = path.join(dataDir, 'mysql_error.log');
        if (fs.existsSync(dataDir)) {
            const files = fs.readdirSync(dataDir);
            const errFile = files.find(f => f.endsWith('.err'));
            if (errFile)
                logPath = path.join(dataDir, errFile);
        }
    }
    openFileInEditor(logPath);
}
function openFileInEditor(filePath) {
    if (fs.existsSync(filePath)) {
        vscode.workspace.openTextDocument(filePath).then(doc => {
            vscode.window.showTextDocument(doc);
        });
    }
    else {
        vscode.window.showErrorMessage(`File tidak ditemukan: ${filePath}`);
    }
}
function openMariaDBShell() {
    const mysqlBinDir = path.join(XAMPP_DIR, 'mysql', 'bin');
    const mysqlExePath = path.join(mysqlBinDir, 'mysql.exe');
    if (!fs.existsSync(mysqlExePath)) {
        vscode.window.showErrorMessage(`File mysql.exe tidak ditemukan di ${mysqlBinDir}.`);
        return;
    }
    const terminal = vscode.window.createTerminal("MariaDB SQL Shell");
    terminal.show();
    terminal.sendText(`cd "${mysqlBinDir}"`);
    terminal.sendText(`.\\mysql.exe -u root`);
}
function fixXamppBugs(panel) {
    panel.webview.postMessage({ command: 'log', text: '> Membunuh paksa proses httpd.exe dan mysqld.exe...', type: 'log-info' });
    cp.exec('taskkill /F /IM httpd.exe & taskkill /F /IM mysqld.exe', { windowsHide: true }, (error, stdout, stderr) => {
        panel.webview.postMessage({ command: 'log', text: 'Pembersihan selesai. Silakan start ulang.', type: 'log-success' });
    });
}
function runXamppCommand(service, action, panel) {
    if (action === 'stop') {
        const processName = service === 'apache' ? 'httpd.exe' : 'mysqld.exe';
        panel.webview.postMessage({ command: 'log', text: `> Force stopping ${processName}...`, type: 'log-info' });
        cp.exec(`taskkill /F /IM ${processName}`, { windowsHide: true }, (error, stdout, stderr) => {
            if (error && !stdout.includes("SUCCESS")) {
                panel.webview.postMessage({ command: 'log', text: `Gagal atau proses ${processName} tidak berjalan.`, type: 'log-error' });
            }
            else {
                panel.webview.postMessage({ command: 'log', text: `[${service.toUpperCase()}] Force stop berhasil.`, type: 'log-success' });
            }
            panel.webview.postMessage({ command: 'status', service: service, status: 'stopped' });
        });
        return;
    }
    const batFile = `${service}_start.bat`;
    const execPath = path.join(XAMPP_DIR, batFile);
    if (!fs.existsSync(execPath)) {
        panel.webview.postMessage({ command: 'log', text: `ERROR: File ${batFile} tidak ditemukan!`, type: 'log-error' });
        return;
    }
    panel.webview.postMessage({ command: 'log', text: `> Mengeksekusi: ${batFile}...`, type: 'log-info' });
    const processInstance = cp.exec(`"${execPath}"`, { windowsHide: true });
    processInstance.stdout?.on('data', (data) => {
        const text = data.toString().trim();
        if (text)
            panel.webview.postMessage({ command: 'log', text: text, type: 'log-info' });
    });
    processInstance.stderr?.on('data', (data) => {
        const text = data.toString().trim();
        if (text)
            panel.webview.postMessage({ command: 'log', text: text, type: 'log-error' });
    });
    processInstance.on('close', (code) => {
        panel.webview.postMessage({ command: 'log', text: `[${service.toUpperCase()}] Start selesai diproses.`, type: 'log-success' });
        panel.webview.postMessage({ command: 'status', service: service, status: 'running' });
    });
}
function deactivate() { }
// ======================= WEBVIEW CONTENT & UI =======================
function getWebviewContent(iconUri) {
    const imgTag = iconUri ? `<img src="${iconUri}" alt="X" width="32" height="32" style="object-fit: contain;">` : `<div style="width:32px;height:32px;background:#fff;border-radius:4px;color:#f37021;display:flex;align-items:center;justify-content:center;font-weight:bold;">X</div>`;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XAMPP Control Panel</title>
    <style>
        :root {
            --bg-color: #1e1e1e;
            --panel-bg: #252526;
            --text-primary: #cccccc;
            --text-secondary: #808080;
            --border-color: #3e3e42;
            --btn-bg: #333333;
            --btn-hover: #404040;
            --btn-active: #0e639c;
            --btn-active-text: #ffffff;
            --danger: #d16969;
            --success: #6A9955;
            --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            --accent: #f37021;
            --class-bg: #ffeaa7;
            --class-border: #fdcb6e;
            --class-text: #2d3436;
        }

        /* PERBAIKAN: overflow diatur menjadi auto agar webview bisa discroll */
        body, html {
            margin: 0; padding: 0; min-height: 100vh; width: 100%;
            font-family: var(--font-family); background-color: var(--bg-color); color: var(--text-primary);
            box-sizing: border-box; overflow-y: auto; overflow-x: hidden;
        }

        /* PERBAIKAN: height tidak lagi dipaksa 100%, melainkan menyesuaikan isi */
        .container {
            padding: 24px; width: 100%; min-height: 100vh; display: flex; flex-direction: column; gap: 20px; box-sizing: border-box;
        }

        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 16px; flex-shrink: 0;}
        .header-title { display: flex; align-items: center; gap: 12px; }
        .logo { background: var(--accent); padding: 6px; border-radius: 6px; display: flex; }
        .header h2 { margin: 0; font-size: 22px; font-weight: 600; color: #ffffff; }

        .row {
            display: grid; grid-template-columns: 100px 80px 80px auto; align-items: center; padding: 12px 16px;
            background-color: var(--panel-bg); border: 1px solid var(--border-color); border-radius: 6px; margin-bottom: 8px; transition: 0.2s;
        }
        .row:hover { background-color: #2d2d2d; }
        .row.header-row { background: transparent; border: none; font-weight: 600; color: var(--text-secondary); padding: 4px 16px; }

        .col-module { font-size: 16px; font-weight: 600; color: #ffffff; }
        .col-pid, .col-port { font-family: Consolas, monospace; font-size: 14px; color: var(--text-secondary); }
        .col-actions { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
        
        button {
            padding: 6px 12px; border: 1px solid transparent; background-color: var(--btn-bg); color: var(--text-primary);
            border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: 500; transition: 0.2s;
        }
        button:hover { background-color: var(--btn-hover); }
        button.start-btn { background-color: var(--btn-active); color: var(--btn-active-text); min-width: 70px; }
        button.start-btn:hover { background-color: #1177bb; }
        button.running { background-color: var(--danger); color: #fff; }
        button.running:hover { background-color: #e87676; }
        button.tool-btn { background-color: transparent; border: 1px solid var(--border-color); }
        button.tool-btn:hover { background-color: var(--btn-bg); }

        /* SQL Manager UI - PERBAIKAN: Resize vertical aktif dan auto overflow */
        .sql-manager {
            display: flex; flex-direction: column; gap: 12px; background-color: var(--panel-bg); padding: 16px;
            border-radius: 6px; border: 1px solid var(--border-color); flex-grow: 1; min-height: 400px;
            resize: vertical; 
            overflow: auto; 
        }
        
        .sql-header { display: flex; justify-content: space-between; align-items: center; }
        .sql-header h3 { margin: 0; font-size: 16px; color: #ffffff; font-weight: 600; }
        
        .drop-zone {
            border: 2px dashed var(--border-color); border-radius: 6px; padding: 30px; text-align: center; color: var(--text-secondary);
            transition: 0.3s; cursor: pointer; background: var(--bg-color); height: 100%; display: flex; align-items: center; justify-content: center; min-height: 200px;
        }
        .drop-zone.dragover { border-color: var(--btn-active); background-color: rgba(14, 99, 156, 0.1); color: var(--btn-active); }
        
        .editor-container { display: none; flex-direction: column; height: 100%; border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden; min-height: 300px; }
        
        .editor-toolbar {
            display: flex; justify-content: space-between; background: var(--bg-color); padding: 8px 12px; border-bottom: 1px solid var(--border-color); align-items: center; flex-wrap: wrap; gap: 10px;
        }
        .editor-title { font-size: 13px; font-family: Consolas, monospace; color: var(--success); }
        
        textarea#sql-editor {
            flex-grow: 1; width: 100%; padding: 12px; background: #1e1e1e; color: #d4d4d4;
            font-family: Consolas, 'Courier New', monospace; font-size: 14px; border: none; outline: none; resize: none; box-sizing: border-box; min-height: 200px;
        }

        /* --- CLASS DIAGRAM VISUALIZER STYLES --- */
        #diagram-view {
            display: none; position: relative; flex-grow: 1; background: #fafafa; border-radius: 0 0 6px 6px;
            overflow: hidden; background-image: radial-gradient(#e0e0e0 1px, transparent 1px); background-size: 20px 20px; min-height: 300px;
        }
        svg#diagram-lines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
        
        .uml-class {
            position: absolute; width: 180px; background: white; border: 2px solid var(--class-border);
            border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: grab; z-index: 10;
            display: flex; flex-direction: column; overflow: hidden;
        }
        .uml-class:active { cursor: grabbing; box-shadow: 0 6px 12px rgba(0,0,0,0.2); }
        .uml-header { background: var(--class-bg); color: var(--class-text); text-align: center; font-weight: bold; padding: 8px; border-bottom: 1px solid var(--class-border); font-size: 14px;}
        .uml-attrs, .uml-methods { padding: 8px; font-family: Consolas, monospace; font-size: 11px; color: #333; line-height: 1.4; }
        .uml-attrs { border-bottom: 1px solid #eee; }
        .uml-method-item { cursor: pointer; border-radius: 3px; padding: 2px 4px; transition: 0.2s; }
        .uml-method-item:hover { background: #e0f7fa; color: #00838f; font-weight: bold; }

        .logs {
            background: #1e1e1e; border: 1px solid var(--border-color); border-radius: 6px; height: 120px; flex-shrink: 0;
            overflow-y: auto; padding: 12px; font-family: Consolas, monospace; font-size: 12px; line-height: 1.5;
        }

        .log-time { color: var(--text-secondary); margin-right: 8px; }
        .log-info { color: var(--text-primary); }
        .log-success { color: var(--success); }
        .log-error { color: var(--danger); }
        
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg-color); }
        ::-webkit-scrollbar-thumb { background: #424242; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-title">
                <div class="logo">${imgTag}</div>
                <h2>XAMPP Control Panel</h2>
            </div>
            <div class="toolbar">
                <button class="tool-btn" style="color: var(--success); border-color: var(--success);" onclick="startAllServices()">▶ Start All</button>
                <button class="tool-btn" style="color: var(--danger); border-color: var(--danger);" onclick="stopAllServices()">⏹ Stop All</button>
                <button class="tool-btn" onclick="fixBugs()">🛠 Force Cleanup</button>
            </div>
        </div>

        <div style="flex-shrink: 0;">
            <div class="row header-row">
                <div class="col-module">Service</div>
                <div class="col-pid">PID(s)</div>
                <div class="col-port">Port(s)</div>
                <div class="col-actions" style="justify-content: flex-start; padding-left: 20px;">Actions</div>
            </div>
            <div class="row">
                <div class="col-module">Apache</div>
                <div class="col-pid" id="apache-pid">-</div>
                <div class="col-port" id="apache-port">-</div>
                <div class="col-actions">
                    <button class="start-btn" id="btn-apache" onclick="toggleService('apache')">Start</button>
                    <button class="tool-btn" onclick="postCmd('openAdmin', 'apache')">Admin</button>
                    <button class="tool-btn" onclick="postCmd('openConfig', 'apache')">Config</button>
                </div>
            </div>
            <div class="row">
                <div class="col-module">MariaDB</div>
                <div class="col-pid" id="mysql-pid">-</div>
                <div class="col-port" id="mysql-port">-</div>
                <div class="col-actions">
                    <button class="start-btn" id="btn-mysql" onclick="toggleService('mysql')">Start</button>
                    <button class="tool-btn" onclick="postCmd('openAdmin', 'mysql')">Admin</button>
                    <button class="tool-btn" onclick="postCmd('openShell', 'mysql')">>_ Shell</button>
                </div>
            </div>
        </div>

        <div class="sql-manager">
            <div class="sql-header">
                <h3>📂 SQL File Manager & Visualizer</h3>
            </div>
            <div class="drop-zone" id="drop-zone" onclick="document.getElementById('file-input').click()">
                <p>Drag & Drop file .sql (misal: gamerx_db.sql) di sini untuk Visualisasi</p>
                <input type="file" id="file-input" accept=".sql" style="display: none;">
            </div>
            
            <div class="editor-container" id="editor-container">
                <div class="editor-toolbar">
                    <span class="editor-title" id="file-name">query.sql</span>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button class="tool-btn" id="btn-loop" style="display: none; color: #3498db; border-color: #3498db;" onclick="toggleLoopAnimation()">🔁 Loop Animasi</button>
                        <button class="tool-btn" id="btn-toggle-view" style="color: #f1c40f; border-color: #f1c40f;" onclick="toggleViewMode()">📊 Visualisasikan Diagram</button>
                        <button class="tool-btn" onclick="closeEditor()">✖ Tutup</button>
                    </div>
                </div>
                
                <textarea id="sql-editor" spellcheck="false"></textarea>
                
                <div id="diagram-view">
                    <svg id="diagram-lines">
                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill="#b2bec3" />
                            </marker>
                        </defs>
                    </svg>
                    <div id="nodes-container"></div>
                </div>
            </div>
        </div>

        <div class="logs" id="log-window">
            <div><span class="log-time">[System]</span> <span class="log-info">Panel Ready. Fitur Drag & Drop UI + Class Diagram Aktif.</span></div>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();

        function addLog(message, type = 'log-info') {
            const logWindow = document.getElementById('log-window');
            const time = new Date().toLocaleTimeString('en-GB');
            const lines = message.split('\\n').filter(line => line.trim() !== '');
            lines.forEach(line => {
                logWindow.innerHTML += \`<div><span class="log-time">[\${time}]</span> <span class="\${type}">\${line}</span></div>\`;
            });
            logWindow.scrollTop = logWindow.scrollHeight;
        }

        function postCmd(cmd, service) { vscode.postMessage({ command: cmd, service: service }); }

        function toggleService(service, targetState = null) {
            const btn = document.getElementById('btn-' + service);
            const isRunning = btn.innerText === 'Stop';
            
            if (targetState === true && isRunning) return;
            if (targetState === false && !isRunning) return;

            if (isRunning || targetState === false) {
                vscode.postMessage({ command: 'stopService', service: service });
            } else {
                btn.innerText = 'Stop'; btn.classList.add('running');
                document.getElementById(service + '-pid').innerText = Math.floor(Math.random() * 10000);
                document.getElementById(service + '-port').innerText = service === 'apache' ? '80, 443' : '3306';
                vscode.postMessage({ command: 'startService', service: service });
            }
        }

        function startAllServices() {
            toggleService('apache', true);
            toggleService('mysql', true);
        }

        function stopAllServices() {
            toggleService('apache', false);
            toggleService('mysql', false);
        }

        function fixBugs() {
            vscode.postMessage({ command: 'fixBugs' });
            ['apache', 'mysql'].forEach(service => setStatus(service, 'stopped'));
        }

        function setStatus(service, status) {
            const btn = document.getElementById('btn-' + service);
            if (status === 'stopped') {
                btn.innerText = 'Start'; btn.classList.remove('running');
                document.getElementById(service + '-pid').innerText = '-';
                document.getElementById(service + '-port').innerText = '-';
            } else if (status === 'running') {
                btn.innerText = 'Stop'; btn.classList.add('running');
            }
        }

        window.addEventListener('message', event => {
            const msg = event.data;
            if (msg.command === 'log') addLog(msg.text, msg.type);
            else if (msg.command === 'status') setStatus(msg.service, msg.status);
        });

        // ==================== SQL MANAGER & VISUALIZER LOGIC ====================
        const dropZone = document.getElementById('drop-zone');
        const fileInput = document.getElementById('file-input');
        const editorContainer = document.getElementById('editor-container');
        const sqlEditor = document.getElementById('sql-editor');
        const diagramView = document.getElementById('diagram-view');
        const fileNameDisplay = document.getElementById('file-name');
        const btnToggleView = document.getElementById('btn-toggle-view');
        const btnLoop = document.getElementById('btn-loop');
        
        let isDiagramMode = false;

        function loadSqlFile(file) {
            if (!file.name.endsWith('.sql')) {
                addLog('Error: Harap upload file berformat .sql', 'log-error'); return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                fileNameDisplay.innerText = file.name;
                sqlEditor.value = e.target.result;
                dropZone.style.display = 'none';
                editorContainer.style.display = 'flex';
                
                isDiagramMode = false;
                sqlEditor.style.display = 'block';
                diagramView.style.display = 'none';
                btnToggleView.innerText = '📊 Visualisasikan Diagram';
                btnLoop.style.display = 'none'; // Sembunyikan tombol loop di mode teks
                if(isLooping) toggleLoopAnimation(); // Hentikan loop jika sedang jalan
                
                addLog(\`File \${file.name} berhasil dimuat. Klik Visualisasikan untuk melihat strukturnya.\`, 'log-success');
                initDiagramData(); 
            };
            reader.readAsText(file);
        }

        fileInput.addEventListener('change', e => { if (e.target.files.length > 0) loadSqlFile(e.target.files[0]); });
        dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', e => {
            e.preventDefault(); dropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) loadSqlFile(e.dataTransfer.files[0]);
        });

        function closeEditor() {
            editorContainer.style.display = 'none'; dropZone.style.display = 'flex';
            sqlEditor.value = ''; fileInput.value = '';
            if(isLooping) toggleLoopAnimation(); // Hentikan loop saat editor ditutup
        }

        function toggleViewMode() {
            isDiagramMode = !isDiagramMode;
            if(isDiagramMode) {
                sqlEditor.style.display = 'none';
                diagramView.style.display = 'block';
                btnToggleView.innerText = '📝 Tampilkan Kode SQL';
                btnLoop.style.display = 'inline-block'; // Tampilkan tombol loop di mode diagram
                drawLines(); 
            } else {
                sqlEditor.style.display = 'block';
                diagramView.style.display = 'none';
                btnToggleView.innerText = '📊 Visualisasikan Diagram';
                btnLoop.style.display = 'none'; // Sembunyikan tombol loop
                if(isLooping) toggleLoopAnimation(); // Hentikan loop otomatis
            }
        }

        // --- SISTEM LOOP ANIMASI ---
        let isLooping = false;
        let loopTimeout = null;

        function toggleLoopAnimation() {
            isLooping = !isLooping;
            if (isLooping) {
                btnLoop.innerText = '⏹ Stop Loop';
                btnLoop.style.color = 'var(--danger)';
                btnLoop.style.borderColor = 'var(--danger)';
                addLog('> Loop Animasi Diaktifkan', 'log-info');
                runRandomAnimation();
            } else {
                btnLoop.innerText = '🔁 Loop Animasi';
                btnLoop.style.color = '#3498db';
                btnLoop.style.borderColor = '#3498db';
                addLog('> Loop Animasi Dihentikan', 'log-info');
                clearTimeout(loopTimeout);
            }
        }

        function runRandomAnimation() {
            if (!isLooping || !isDiagramMode) return;
            
            // Ambil class yang memiliki method
            const classesWithMethods = classesData.filter(c => c.methods.length > 0);
            if(classesWithMethods.length === 0) return;

            // Pilih class dan method secara acak
            const randomClass = classesWithMethods[Math.floor(Math.random() * classesWithMethods.length)];
            const randomMethod = randomClass.methods[Math.floor(Math.random() * randomClass.methods.length)];

            // Jalankan Trigger
            triggerMethod(randomClass.id, randomMethod);

            // Jadwalkan eksekusi berikutnya setelah 2.5 detik (waktu aman agar animasi sebelumnya selesai)
            loopTimeout = setTimeout(runRandomAnimation, 2500);
        }

        // --- DIAGRAM ENGINE (DOM + SVG) ---
        const classesData = [
            { id: 'Bank', x: 20, y: 20, attrs: ['+BankId: int', '+Name: string', '+Location: string'], methods: [] },
            { id: 'Customer', x: 20, y: 200, attrs: ['+Id: int', '+Name: string', '+Address: string', '+PhoneNo: int', '+AcctNo: int'], 
              methods: ['+GeneralInquiry()', '+DepositMoney()', '+WithdrawMoney()', '+OpenAccount()', '+CloseAccount()', '+ApplyForLoan()'] },
            { id: 'Teller', x: 300, y: 50, attrs: ['+Id: int', '+Name: string'], 
              methods: ['+CollectMoney()', '+OpenAccount()', '+CloseAccount()', '+LoanRequest()', '+ProvideInfo()', '+IssueCard()'] },
            { id: 'Account', x: 300, y: 250, attrs: ['+Id: int', '+CustomerId: int'], methods: [] },
            { id: 'Loan', x: 300, y: 380, attrs: ['+Id: int', '+Type: string', '+AccountId: int', '+CustomerId: int'], methods: [] },
            { id: 'Checking', x: 600, y: 150, attrs: ['+Id: int', '+CustomerId: int'], methods: [] },
            { id: 'Savings', x: 600, y: 350, attrs: ['+Id: int', '+CustomerId: int'], methods: [] }
        ];

        const relations = [
            { from: 'Bank', to: 'Customer', label: '1..*' },
            { from: 'Bank', to: 'Teller', label: '1..*' },
            { from: 'Customer', to: 'Teller', label: '1..*' },
            { from: 'Customer', to: 'Account', label: '1..*' },
            { from: 'Customer', to: 'Loan', label: '0..*' },
            { from: 'Checking', to: 'Account', isInherit: true },
            { from: 'Savings', to: 'Account', isInherit: true }
        ];

        const container = document.getElementById('nodes-container');
        const svgLines = document.getElementById('diagram-lines');
        let draggedNode = null;
        let startX, startY, initialX, initialY;

        function initDiagramData() {
            container.innerHTML = '';
            
            classesData.forEach(cls => {
                const el = document.createElement('div');
                el.className = 'uml-class'; el.id = 'node-' + cls.id;
                el.style.left = cls.x + 'px'; el.style.top = cls.y + 'px';
                
                let attrsHTML = cls.attrs.map(a => \`<div>\${a}</div>\`).join('');
                let methodsHTML = cls.methods.map(m => \`<div class="uml-method-item" onclick="triggerMethod('\${cls.id}', '\${m}')">\${m}</div>\`).join('');
                
                el.innerHTML = \`
                    <div class="uml-header">\${cls.id}</div>
                    <div class="uml-attrs">\${attrsHTML || '&nbsp;'}</div>
                    <div class="uml-methods">\${methodsHTML || '&nbsp;'}</div>
                \`;
                
                el.addEventListener('mousedown', e => {
                    draggedNode = el; startX = e.clientX; startY = e.clientY;
                    initialX = el.offsetLeft; initialY = el.offsetTop;
                    el.style.zIndex = 100;
                });
                container.appendChild(el);
            });
            drawLines();
        }

        document.addEventListener('mousemove', e => {
            if (!draggedNode) return;
            const dx = e.clientX - startX; const dy = e.clientY - startY;
            draggedNode.style.left = (initialX + dx) + 'px';
            draggedNode.style.top = (initialY + dy) + 'px';
            requestAnimationFrame(drawLines);
        });

        document.addEventListener('mouseup', () => {
            if (draggedNode) { draggedNode.style.zIndex = 10; draggedNode = null; }
        });

        function drawLines() {
            svgLines.innerHTML = \`<defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#b2bec3" />
                </marker>
                <marker id="inherit" viewBox="0 0 14 14" refX="14" refY="7" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
                    <polygon points="0,0 14,7 0,14" fill="none" stroke="#2d3436" stroke-width="1.5" />
                </marker>
            </defs>\`;
            
            relations.forEach(rel => {
                const elFrom = document.getElementById('node-' + rel.from);
                const elTo = document.getElementById('node-' + rel.to);
                if(!elFrom || !elTo) return;

                const fromX = elFrom.offsetLeft + (elFrom.offsetWidth / 2);
                const fromY = elFrom.offsetTop + (elFrom.offsetHeight / 2);
                const toX = elTo.offsetLeft + (elTo.offsetWidth / 2);
                const toY = elTo.offsetTop + (elTo.offsetHeight / 2);

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', fromX); line.setAttribute('y1', fromY);
                line.setAttribute('x2', toX); line.setAttribute('y2', toY);
                line.setAttribute('stroke', '#b2bec3'); line.setAttribute('stroke-width', '2');
                
                if(rel.isInherit) {
                    line.setAttribute('marker-end', 'url(#inherit)');
                    line.setAttribute('stroke', '#2d3436');
                } else {
                    line.setAttribute('marker-end', 'url(#arrow)');
                }
                
                svgLines.appendChild(line);
            });
        }

        function triggerMethod(className, methodName) {
            addLog(\`> Menginisiasi request: \${className}.\${methodName} ...\`, 'log-info');
            
            let targetClass = '';
            if(className === 'Customer') targetClass = (methodName.includes('Money') || methodName.includes('Account') || methodName.includes('Loan')) ? 'Teller' : 'Account';
            else if(className === 'Teller') targetClass = 'Bank';

            if(targetClass) {
                animateParticle(className, targetClass, methodName);
            } else {
                addLog(\`\${className}.\${methodName} dieksekusi secara internal.\`, 'log-success');
            }
        }

        function animateParticle(fromId, toId, method) {
            const elFrom = document.getElementById('node-' + fromId);
            const elTo = document.getElementById('node-' + toId);
            if(!elFrom || !elTo) return;

            const fromX = elFrom.offsetLeft + (elFrom.offsetWidth / 2);
            const fromY = elFrom.offsetTop + (elFrom.offsetHeight / 2);
            const toX = elTo.offsetLeft + (elTo.offsetWidth / 2);
            const toY = elTo.offsetTop + (elTo.offsetHeight / 2);

            const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            particle.setAttribute('r', '6');
            particle.setAttribute('fill', '#e74c3c');
            svgLines.appendChild(particle);

            elFrom.style.borderColor = '#e74c3c';
            
            let start = null;
            const duration = 1000; 

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = (timestamp - start) / duration;
                
                if (progress < 1) {
                    const currentX = fromX + (toX - fromX) * progress;
                    const currentY = fromY + (toY - fromY) * progress;
                    particle.setAttribute('cx', currentX);
                    particle.setAttribute('cy', currentY);
                    window.requestAnimationFrame(step);
                } else {
                    particle.remove();
                    elFrom.style.borderColor = 'var(--class-border)';
                    elTo.style.boxShadow = '0 0 15px #27ae60';
                    elTo.style.borderColor = '#27ae60';
                    setTimeout(() => { 
                        if(elTo) {
                            elTo.style.boxShadow = ''; elTo.style.borderColor = 'var(--class-border)';
                        }
                    }, 500);
                    
                    addLog(\`> Request \${method} diterima oleh \${toId}. Transaksi berhasil.\`, 'log-success');
                }
            }
            window.requestAnimationFrame(step);
        }

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(drawLines, 100);
        });
    </script>
</body>
</html>`;
}
//# sourceMappingURL=extension.js.map