

# XAMPP Meta Panel For VS Code

<p align="center">
<img src="https://github.com/Royhtml/Xampp-Meta-Panel/raw/main/resources/icon.png?raw=true" alt="XAMPP Manager Logo" width="128" />
</p>

<p align="center">
<strong>🚀 Run Apache, MySQL, and PHP directly from VS Code — No need to manually install XAMPP!</strong>
</p>

<p align="center">
<a href="https://open-vsx.org/extension/Royhtml/xampp-manager"><img src="https://img.shields.io/badge/Install%20on-Open%20VSX%20Registry-blue?logo=visualstudiocode&style=flat-square" alt="Install on Open VSX Registry"></a>
  <a href="https://open-vsx.org/extension/Royhtml/xampp-manager">
    <img src="https://img.shields.io/open-vsx/v/Royhtml/xampp-manager?style=flat-square" alt="Install on Open VSX Registry">
  </a>
  <a href="https://github.com/royhtml">
    <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="mailto:dwibakti76@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=flat-square&logo=gmail&logoColor=white" alt="Gmail">
  </a>
</p>

---

<img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/Roy.gif?raw=true">

## 🎯 Why XAMPP Meta Panel?

<img src ="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/new%20version/vitures.png?raw=true">

Tired of having to open the XAMPP Control Panel repeatedly just to start a local server? Or lazy about downloading and configuring XAMPP on each different computer?

XAMPP Meta Panel provides a portable PHP/MySQL development environment directly within VS Code. This extension detects your XAMPP installation or provides an internal server runtime so you can focus on coding, not server configuration. Plus, it comes with an AI Assistant, WhatsApp Bot remote control, IoT compilation, Android Emulator management, and Native App compilation!

## ✨ Key Features Premium

<img src = "https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/new%20version/premium.png?raw=true">

### ⚡️ **Zero-Download Runtime (Outstanding Feature)**
* **No Need to Reinstall XAMPP:** This extension provides the ability to run an embedded server (PHP built-in server & portable MariaDB) if XAMPP is not detected on your system.
* **One Click, Instant Run:** Right-click on your project folder, select `XAMPP: Serve Project Here`, and your website will open instantly in your browser.

### 🌐 Official Website
*Experience complete control without leaving your code editor.*

<img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/pat/pat%20(2).png?raw=true" alt="Screenshot XAMPP Manager" width="100%" />

### 🎛️ **Unified Control Center**
* An elegant control panel inside the **VS Code Sidebar** that displays the status of:
* 🟢 **Apache** (Port 80/8080)
* 🟢 **MySQL** (Port 3306)
* Quick action buttons: `Start All`, `Stop All`, `Restart`, and `Open phpMyAdmin`.

### 📂 **Smart Workspace Detection**
* Automatically reads the `htdocs` folder from your local XAMPP installation.
* **Virtual Host Creator:** Create `*.test` virtual host configurations directly from VS Code without manually fiddling with the `httpd-vhosts.conf` file.

### 🐳 **Database Manager Integration**
* Quick access to **phpMyAdmin** directly from the Status Bar.
* MySQL Shell: Run SQL queries directly from the Command Palette (Ctrl+Shift+P > XAMPP: Run SQL Query).

### 🔔 Intelligent Notifications
Get real-time notifications when the server is running successfully or encounters a port conflict error.
* Auto-kill Process: If port 80 conflicts, the extension will offer to automatically kill the process.

---

## 🧠 AI Model Integration: Unlimited Token API

Experience the power of AI directly inside VS Code without worrying about token limits or API costs! XAMPP Meta Panel integrates a powerful LLM (Large Language Model) that runs seamlessly for coding assistance, debugging, and chatting.

### 🌐 Cloud AI Dashboard (Unlimited Tokens)
Manage your AI requests, test tokens, and monitor usage through our dedicated AI dashboard.
👉 **[Access AI Dashboard Here](https://xampp-meta-panel-llm-model.vercel.app/)**

<img src = "https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/new%20version/api.png?raw=true">

### 🔌 Local API Endpoint Documentation
For advanced users and developers, XAMPP Meta Panel runs a local inference server. You can send API requests directly to `http://127.0.0.1:8088/completion`.

#### **Endpoint:** `POST http://127.0.0.1:8088/completion`
This endpoint allows you to interact with the AI model locally. It is fully compatible with OpenAI-style API requests.

**Request Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer xampp-meta-panel-free" 
}
```

**Request Body (JSON):**
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `prompt` | `string` | The text input or question for the AI. |
| `max_tokens` | `integer` | Maximum number of tokens to generate (Default: 512, Max: Unlimited). |
| `temperature` | `float` | Controls randomness (0.0 - 1.0). |
| `stream` | `boolean` | If true, streams responses back as SSE. |

**Example cURL Request:**
```bash
curl -X POST http://127.0.0.1:8088/completion \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer xampp-meta-panel-free" \
  -d '{
    "prompt": "Write a PHP script to connect to MySQL database.",
    "max_tokens": 1000,
    "temperature": 0.7
  }'
```

**Example Response:**
```json
{
  "id": "cmp_12345",
  "object": "text_completion",
  "created": 1698765432,
  "model": "xampp-meta-llm",
  "choices": [
    {
      "text": "<?php\n$servername = 'localhost';\n$username = 'root';\n...",
      "index": 0,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 85,
    "total_tokens": 97
  }
}
```

### 🗝️ API Key Dashboard Test Token Request
Test your API token requests directly from the dashboard.

<img src = "https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/new%20version/apidash.png?raw=true">

---

## 🖥️ XAMPP Meta Panel: HTML to EXE Compiler

Turn your static HTML, CSS, and JavaScript projects into standalone Desktop Applications (`.exe`, `.app`, `.deb`) directly from VS Code!

### How it Works:
The extension uses an integrated packaging engine (based on Node.js/Nativefier concepts) to wrap your web application into a lightweight Chromium-based desktop window without the browser UI.

### Features:
* **One-Click Build:** Press `Shift + C` to compile your current HTML project.
* **Custom App Icon:** Add your own `.ico` file to personalize your application.
* **Offline Ready:** The generated EXE runs entirely offline on Windows, Mac, and Linux.
* **No Dependencies:** End-users do not need to install Python, Node, or XAMPP to run the compiled app.

### Steps to Compile:
1. Open your HTML project folder in VS Code.
2. Open Command Palette (`Ctrl+Shift+P`) -> `XAMPP: Compile HTML to EXE`.
3. Input your App Name and select your main `index.html` file.
4. The extension will generate a `/dist` folder containing your standalone `.exe` file.

---

## 🔄 Swap Version Tutorial Xampp Meta Panel
Change Version Php and PhpMyAdmin Easy Patch V4.9 Not Otomation

<img src = "https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/new%20version/version.png?raw=true">

---

## 🤖 WhatsApp Bot AI & Remote Control

Control your entire local server and development environment from anywhere using WhatsApp!

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(1).jpeg?raw=true" alt="Main Panel" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>WhatsApp Bot Control</b></sub>
      </td>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(2).jpeg?raw=true" alt="WhatsApp Bot" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>WhatsApp Bot Control</b></sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(3).jpeg?raw=true" alt="Network Topology" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>WhatsApp Bot Control</b></sub>
      </td>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(4).jpeg?raw=true" alt="SQL Editor" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>WhatsApp Bot Control</b></sub>
      </td>
    </tr>
  </table>
</div>

## 📸 Interface & Topology

*Experience complete control without leaving your code editor.*

<img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/pat/pat%20(3).png?raw=true" alt="Screenshot XAMPP Manager" width="100%" />

### 🛜 Topology Network Simulator

<img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/pat/pat%20(1).png?raw=true" alt="Screenshot XAMPP Manager" width="100%" />

---

## 🔄 How It Works (Architecture & Flowcharts)

XAMPP Meta Panel integrates deeply with your system to provide a seamless development experience. Below are the core operational flowcharts.

### 1. 🚀 General System Initialization & Service Management
When you open the panel or trigger a command, the extension automatically detects your environment and executes the corresponding processes.

```mermaid
flowchart TD
    A[Start VS Code] --> B{XAMPP Installed?}
    B -- Yes --> C[Read xamppPath Setting]
    B -- No --> D[Prompt: Use Built-in Portable Server]
    D --> E[Auto-Download/Extract Portable Binaries]
    C --> F[Open XAMPP Meta Panel Webview]
    E --> F
    F --> G[User Clicks: Start Apache/MySQL]
    G --> H{Check Port Availability}
    H -- Port Free --> I[Spawn Child Process httpd.exe/mysqld.exe]
    H -- Port Conflict --> J[Auto-Kill Conflicting PID / Prompt User]
    J --> I
    I --> K[Update Status UI to 🟢 Running]
    K --> L[Play TTS Notification 'Service Started']
```

### 2. 🧠 AI Unlimited Token API Flow
How the AI integration processes your requests locally and via the cloud dashboard.

```mermaid
flowchart TD
    A[User Requests AI Completion] --> B{Route Request}
    B -- Local API --> C[Send POST to 127.0.0.1:8088/completion]
    B -- Cloud Dashboard --> D[Send POST to Vercel API]
    C --> E[Process Prompt in Local LLM Engine]
    D --> F[Process Prompt in Cloud LLM Engine]
    E --> G[Stream/Return JSON Response]
    F --> G
    G --> H[Inject Code/Text into VS Code Editor]
```

### 3. 🖥️ HTML to EXE Compilation Flow
```mermaid
flowchart TD
    A[User Clicks: Compile HTML to EXE] --> B[Select index.html File]
    B --> C[Initialize Packaging Engine]
    C --> D[Inject HTML/CSS/JS Assets]
    D --> E[Wrap in Chromium Webview]
    E --> F[Compile to Target OS Executable]
    F --> G[Output standalone .exe/.app to /dist folder]
```

### 4. 🤖 WhatsApp Bot AI Control Flow
The WhatsApp integration uses `whatsapp-web.js` and Puppeteer to maintain a persistent session. You can control services remotely via chat commands.

```mermaid
flowchart TD
    A[User Clicks 'Start WA Bot'] --> B[Initialize Puppeteer Headless Browser]
    B --> C{Session Exists in ~/.xampp_wa_session?}
    C -- Yes --> D[Restore Session Automatically]
    C -- No --> E[Generate QR Code]
    E --> F[Display QR in VS Code Webview]
    F --> G[User Scans with WhatsApp Mobile]
    G --> H[Session Authenticated]
    D --> H
    H --> I[Bot Status: CONNECTED]
    I --> J[Receive Message: '!start apache']
    J --> K{Parse Command}
    K --> L[Execute: runXamppCommand 'apache' 'start']
    L --> M[Get Local Network IP]
    M --> N[Reply to WhatsApp: 'http://IP/phpmyadmin']
```

---

## ⚙️ Extension Settings

Customize the extension's behavior via VS Code Settings (`Settings.json`).

| Setting ID | Description | Default |
| :--- | :--- | :--- |
| `xampp.enableTTS` | Enable or disable Text-to-Speech (TTS) voice announcements. | `true` |
| `xampp.showSplashScreen` | Show or hide the splash screen when opening XAMPP Meta Panel. | `true` |
| `xampp.ggufPath` | Path to the local GGUF AI model file for offline AI chat. | `""` |
| `xampp.aiModels` | Catalog of saved GGUF AI model paths. | `[]` |
| `xampp.aiApiEndpoint` | Custom endpoint for AI Completion API. | `http://127.0.0.1:8088/completion` |
| `xampp.xamppPath` | Custom path to your XAMPP installation directory. | `C:\xampp` |
| `xampp.autoBackupOnStop` | Automatically backup MySQL databases when stopping the server. | `false` |
| `xampp.androidEmulatorPath` | Cached path to Android emulator executable (auto-detected). | `""` |
| `xampp.androidQuickBoot` | Enable Quick Boot for faster Android Emulator startup. | `true` |
| `xampp.androidCpuCores` | Number of CPU cores allocated to Android Emulator (1-8). | `2` |
| `xampp.androidRamSize` | RAM size for Android Emulator in MB (512-8192). | `2048` |
| `xampp.androidUseHostGpu` | Use host GPU acceleration (recommended for better performance). | `true` |
| `xampp.androidNoAudio` | Disable audio in emulator to save resources (recommended). | `true` |
| `xampp.androidNoBootAnim` | Skip boot animation for faster startup. | `false` |
| `xampp.androidNoSnapshot` | Disable snapshot feature (use for troubleshooting). | `false` |

Example configuration in `settings.json`:
```json
{
  "xampp.enableTTS": true,
  "xampp.xamppPath": "D:\\my_xampp",
  "xampp.aiApiEndpoint": "http://127.0.0.1:8088/completion",
  "xampp.androidCpuCores": 4,
  "xampp.androidRamSize": 4096
}
```

---

## ⌨️ Keyboard Shortcuts & Commands

Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and type `XAMPP`, or use the following shortcuts:

| Shortcut | Command ID | Description |
| :--- | :--- | :--- |
| `Shift + Z` | `xampp.openPanel` | Opens the XAMPP Meta Panel Webview. |
| `Shift + C` | `xampp.compileHtmlToExe` | Compile current HTML project to Desktop App (.exe). |
| `Shift + X` | `xampp.pioCreateProject` | Create new PlatformIO/Wokwi IoT Project. |
| `Shift + T` | `xampp.openCliTerminal` | Open the dedicated XAMPP CLI Terminal. |
| `Shift + Alt` | `xampp.pioCompile` | Compile PlatformIO Firmware. |
| `Shift + Q` | `xampp.switchVersions` | Switch XAMPP PHP Version. |
| `Shift + H` | `xampp.compileLaravelApk` | Compile Laravel project to Android APK. |
| `Shift + A` | `xampp.openAiChat` | Start AI Chat with Unlimited Token Model. |
| `Shift + E` | `xampp.startEmulator` | Start Android Emulator. |

---

## 📦 Full WhatsApp Bot Command Reference

| Command | Description |
| :--- | :--- |
| `!start apache` | Start Apache server remotely |
| `!stop apache` | Stop Apache server remotely |
| `!start mariadb` | Start MariaDB service remotely |
| `!stop mariadb` | Stop MariaDB service remotely |
| `!start laravel <folder>` | Start Laravel dev server on port 8000 |
| `!stop laravel` | Kill Laravel server process |
| `!start python <folder>` | Start python dev server |
| `!stop python` | Kill python server process |
| `!start php <folder>` | Start PHP built-in server on port 8081 |
| `!stop php` | Kill PHP built-in server process |
| `!start flutter <folder>` | Start Flutter web server on port 8080 |
| `!stop flutter` | Kill Flutter web process |
| `!build flutter` | Build Apk Flutter |
| `!build app` | Build Android |
| `!build ios` | Build IOS |
| `!build exe` | Compile HTML/URL to Windows EXE |
| `!system` | System check |
| `!preview` | Preview monitor |
| `!stop preview` | Stop Preview monitor |
| `!ai on` | Ai Ready |
| `!ai off` | Ai Stop |
| `!ai <question>` | Ask AI a question (Unlimited Tokens) |
| `!htdocs` | htdocs files |
| `!start ngrok <port>` | ngrok running port |
| `!stop ngrok <port>` | ngrok stop running port |
| `!cleanup` | Force kill all XAMPP processes |
| `!query <SQL>` | Execute global SQL query |
| `!db <name> <SQL>` | Execute SQL on specific database |
| `!setvercel <key>` | Save Vercel API deployment key |
| `!deploy <project>` | Deploy project to Vercel (attach file) |
| `!web2exe <url><appname>` | Compile URL/HTML to EXE remotely |
| `!status` | Show full bot command list |

---

## 🆕 What's New in Version 5.0.0

### 🧠 **Unlimited Token AI Model Integration**
* **Local API Server:** Run AI completions locally via `http://127.0.0.1:8088/completion`.
* **Cloud Dashboard:** Monitor and test tokens at [xampp-meta-panel-llm-model.vercel.app](https://xampp-meta-panel-llm-model.vercel.app/).
* **No Hidden Fees:** Completely free and unlimited token usage for developers.

### 🖥️ **HTML to EXE Native Compiler**
* Compile static HTML/JS/CSS projects into standalone Desktop Applications directly from the command palette or WhatsApp Bot.

### 🤖 **WhatsApp Bot Control Center**
* **Persistent Session:** Scan the QR code once, and the bot will remember your session permanently.
* **Remote Server Management:** Start/Stop Apache, MariaDB, Laravel, Flutter, and PHP directly via WhatsApp.
* **Database Queries via Chat:** Execute SQL queries directly from WhatsApp (`!query`, `!db`).
* **Vercel Cloud Deployment:** Deploy projects directly to Vercel from WhatsApp.

### 🎙️ **Alisa Voice Assistant**
* **Hands-Free Coding:** Toggle the global mic to issue voice commands (e.g., "Alisa start apache").
* **Windows Speech API:** Natively integrated for ultra-low latency voice recognition.

### 📱 **Android Emulator & Cross-Platform Compilation**
* **Emulator Management:** Start/Stop Android AVDs directly from the panel with optimization settings.
* **Native Desktop Apps:** Compile any web project to a standalone Desktop app (Windows/Mac/Linux).
* **Laravel to APK:** Turn your Laravel project into an Android APK using Capacitor.

### 🔬 **Network Topology Simulator (SQL to Cisco Visualizer)**
* **Drag & Drop SQL Import:** Upload your `.sql` files to automatically parse table schemas and visualize them as interactive network nodes.
* **Live Packet Animation:** Simulate network communication between nodes.

### 🌐 **Expanded System Tools**
* **WSL Terminal Launcher:** Quick access to Windows Subsystem for Linux.
* **Netstat Network Scanner:** Detect all active listening ports on your system.
* **Enhanced Mobile Access Fixer:** One-click solution to fix "403 Forbidden" errors on phpMyAdmin.

---

## 🐛 Known Issues

* **Windows Defender:** When you first start the extension or compile an EXE, Windows SmartScreen may flag the portable binaries. Allow the process in your security settings.
* **WhatsApp Session Reset:** If the Puppeteer browser cache becomes corrupted, you may need to re-scan the QR code. The session files are stored in `%USERPROFILE%\.xampp_wa_session`.
* **Port Conflicts:** If ports 80, 443, 3306, 8088, or 8000 are already in use, the services will fail to start. Use the Netstat Scanner to identify conflicting processes.
* **TTS Limitation:** Text-to-Speech and Voice Recognition currently rely on Windows PowerShell and .NET System.Speech, meaning they are Windows-only features.

---

## 🛠️ Installation

Install this extension directly from the **Open VSX Registry**:

👉 [**Install XAMPP Meta Panel on Open VSX**](https://open-vsx.org/extension/Royhtml/xampp-manager)

Or search for `XAMPP Meta Panel` in the VS Code Extensions marketplace.

---

## 👨‍💻 Developer

**Dwi Bakti N Dev / Roy** - Creator & Maintainer of XAMPP Meta Panel.

* [GitHub](https://github.com/royhtml)
* [Email](mailto:Dwibakti76@gmail.com)
