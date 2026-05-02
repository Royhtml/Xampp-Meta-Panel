# XAMPP Meta Panel For VS Code

<p align="center">
<img src="https://github.com/Royhtml/Xampp-Meta-Panel/raw/main/resources/icon.png?raw=true" alt="XAMPP Manager Logo" width="128" />
</p>

<p align="center">
<strong>🚀 Run Apache, MySQL, and PHP directly from VS Code — No need to manually install XAMPP!</strong>
</p>

<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=royhtml.xampp-manager"><img src="https://img.shields.io/visual-studio-marketplace/v/royhtml.xampp-manager?color=fb7a24&label=VS%20Marketplace" alt="Version"></a>
<a href="https://github.com/royhtml/xampp-manager/stargazers">
<a href="https://github.com/Royhtml/Xampp-Meta-Panel/issues"><img src="https://img.shields.io/github/issues/royhtml/xampp-manager" alt="Issues"></a>
</p>

---

<img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/Roy.gif?raw=true">

## 🎯 Why XAMPP Manager?

Tired of having to open the XAMPP Control Panel repeatedly just to start a local server? Or lazy about downloading and configuring XAMPP on each different computer?

XAMPP Manager provides a portable PHP/MySQL development environment directly within VS Code. This extension detects your XAMPP installation or provides an internal server runtime so you can focus on coding, not server configuration.

## ✨ Key Features

### ⚡️ **Zero-Download Runtime (Outstanding Feature)**
* **No Need to Reinstall XAMPP:** This extension provides the ability to run an embedded server (PHP built-in server & portable MariaDB) if XAMPP is not detected on your system.
* **One Click, Instant Run:** Once the extension is active, right-click on your project folder, select `XAMPP: Serve Project Here`, and your website will open instantly in your browser.

## 🌐 Website Official

*Experience complete control without leaving your code editor.*

<img src = "https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/pat/pat%20(2).png?raw=true" alt = "Screenshot XAMPP Manager" width = "100%" />


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
* Auto-kill Process: If port 80 conflicts (for example, with Skype or IIS), the extension will offer to automatically kill the process.

---
## 🛜Feature Whatsaap Bot AI

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(1).jpeg?raw=true" alt="Main Panel" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>Main Control Panel</b></sub>
      </td>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(2).jpeg?raw=true" alt="WhatsApp Bot" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>WhatsApp Bot Control</b></sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(3).jpeg?raw=true" alt="Network Topology" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>Network Topology Simulator</b></sub>
      </td>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(4).jpeg?raw=true" alt="SQL Editor" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>SQL Editor & Visualizer</b></sub>
      </td>
    </tr>
  </table>
</div>
<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(5).jpeg?raw=true" alt="Main Panel" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>Main Control Panel</b></sub>
      </td>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(6).jpeg?raw=true" alt="WhatsApp Bot" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>WhatsApp Bot Control</b></sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(7).jpeg?raw=true" alt="Network Topology" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>Network Topology Simulator</b></sub>
      </td>
      <td align="center" width="50%">
        <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/main/main%20(8).jpeg?raw=true" alt="SQL Editor" width="100%" style="border-radius: 8px;"/>
        <br/><sub><b>SQL Editor & Visualizer</b></sub>
      </td>
    </tr>
  </table>
</div>

## 📸 Interface

*Experience complete control without leaving your code editor.*

<img src = "https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/pat/pat%20(3).png?raw=true" alt = "Screenshot XAMPP Manager" width = "100%" />

## 🛜 Topology Network

*Experience complete control without leaving your code editor.*

<img src = "https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/pat/pat%20(1).png?raw=true" alt = "Screenshot XAMPP Manager" width = "100%" />

## ⚙️ Requirements & Dependencies

**This extension is PORTABLE.** You are not required to have XAMPP installed on your system.

However, for optimal performance, here are the recommendations:

### If you ALREADY have XAMPP installed:
* XAMPP version 7.4.x or 8.x installed in the default directory (`C:\xampp` or `/Applications/XAMPP`).
* The extension will automatically detect it and use the default binary.

### If you have NOT installed XAMPP:
* **Don't worry!** This extension will automatically download and extract the **XAMPP Portable Launcher** (PHP 8.2 + MariaDB 10.11) to the extensions directory on the first run. Please ensure your internet connection is stable.

---

## 🛠️ Extension Settings

Customize the extension's behavior via `Settings.json` (VS Code Settings).

| Setting ID | Description | Default |
| :--- | :--- | :--- |
| `xampp-manager.autoStart` | Automatically start the server when VS Code opens a PHP workspace. | `false` |
| `xampp-manager.apachePort` | Change the default Apache port (useful if port 80 conflicts). | `80` |
| `xampp-manager.mysqlPort` | Change the default MySQL port. | `3306` |
| `xampp-manager.useBuiltInPhp` | **Highlight Feature:** Force the use of VS Code's internal PHP server instead of XAMPP's Apache. | `false` |

Example configuration in `settings.json`:
```json
{
"xampp-manager.autoStart": true,
"xampp-manager.apachePort": 8080,
"xampp-manager.useBuiltInPhp": false
}
```

---

## ⌨️ Commands

Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and type `XAMPP`:

* `XAMPP: Start Servers` - Starts Apache & MySQL.
* `XAMPP: Stop Servers` - Stops all services.
* `XAMPP: Open htdocs Folder` - Opens the document root folder in File Explorer.
* `XAMPP: Open phpMyAdmin` - Opens the database panel in the default browser.
* `XAMPP: Create New Virtual Host` - Local domain creation wizard.

---

## 🆕 What's New in Version 4.2.2

### 🤖 **WhatsApp Bot Control Center**
* **Persistent Session:** Scan the QR code once, and the bot will remember your session permanently (no need to re-scan after VS Code restarts).
* **Remote Server Management:** Start/Stop Apache and MariaDB directly via WhatsApp commands:
  - `!start apache` / `!stop apache`
  - `!start mariadb` / `!stop mariadb`
* **Laravel & PHP Server Control:** Launch your local development servers from anywhere:
  - `!start laravel <foldername>` / `!stop laravel`
  - `!start php <foldername>` / `!stop php`
* **Database Queries via Chat:** Execute SQL queries directly from WhatsApp:
  - `!query <SQL statement>` (global query)
  - `!db <database_name> <SQL statement>` (targeted query)
* **Vercel Cloud Deployment:** Deploy projects directly to Vercel from WhatsApp:
  - Set up: `!setvercel <API_KEY_ANDA>`
  - Deploy: `!deploy <project-name>` (attach .zip or .html file to your message)
* **System Commands:**
  - `!cleanup` - Force kill all XAMPP processes remotely
  - `!admin apache` - Get Apache mobile preview URL
  - `!admin mariadb` - Get phpMyAdmin mobile access URL
  - `!status` - Get full command list

### 🔬 **Network Topology Simulator (SQL to Cisco Visualizer)**
* **Drag & Drop SQL Import:** Upload your `.sql` files to automatically parse table schemas and visualize them as interactive network nodes (Router, Switch, PC Client, Server DB).
* **Live Packet Animation:** Click on node methods like "📡 Ping Packet" or "📦 Send Traffic" to see animated packet transfers between nodes with visual effects.
* **Auto Traffic Mode:** Toggle "Auto Ping/Traffic" to simulate continuous network communication between all detected entities.
* **Draggable UML Nodes:** Rearrange network topology nodes freely by dragging them around the canvas. All connection lines update in real-time.
* **Toggle Views:** Switch seamlessly between raw SQL editor and visual network topology mode without losing your file context.
* **Real-Time Line Drawing:** The SVG-based connection lines dynamically adjust their endpoints as you move nodes, using marker arrows to indicate data flow direction.

### 🌐 **Expanded System Tools**
* **WSL Terminal Launcher:** Quick access to Windows Subsystem for Linux terminal from the panel toolbar.
* **Website Server Quick Start:** Dedicated button to launch your custom Node.js web server (`web.js`) from the `web` directory.
* **Netstat Network Scanner:** Built-in terminal command to detect all active listening ports on your system for debugging port conflicts.
* **Enhanced Mobile Access Fixer:** One-click solution to fix "403 Forbidden" errors when accessing phpMyAdmin or XAMPP dashboard from mobile devices on the same Wi-Fi network.

### 🎨 **UI/UX Enhancements**
* **Background Music Player:** Enjoy a built-in audio track with play/pause controls directly in the panel.
* **Embedded Video Guide:** Access the official video tutorial via a modal popup without leaving the VS Code environment.
* **Updated Help Modal:** Comprehensive command reference including all WhatsApp bot commands and new features.
* **Live Status Indicators:** Real-time PID and Port display for each service (Laravel, PHP Server, Apache, MariaDB, FileZilla, Mercury, Tomcat).
* **Official Website Link:** Direct access to the XAMPP Meta Panel web documentation from the toolbar.

---

## 🐛 Known Issues

* **Windows Defender:** When you first start the extension, Windows SmartScreen may flag the portable binaries. Allow the process in your security settings.
* **WhatsApp Session Reset:** If the Puppeteer browser cache becomes corrupted, you may need to re-scan the QR code. The session files are stored in `%USERPROFILE%\.xampp_wa_session`.
* **Port Conflicts:** If ports 80, 443, 3306, or 8000 are already in use, the services will fail to start. Use the Netstat Scanner to identify conflicting processes.

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
| `!start php <folder>` | Start PHP built-in server on port 8081 |
| `!stop php` | Kill PHP built-in server process |
| `!cleanup` | Force kill all XAMPP processes |
| `!admin apache` | Get Apache mobile access URL |
| `!admin mariadb` | Get phpMyAdmin mobile access URL |
| `!query <SQL>` | Execute global SQL query |
| `!db <name> <SQL>` | Execute SQL on specific database |
| `!setvercel <key>` | Save Vercel API deployment key |
| `!deploy <project>` | Deploy project to Vercel (attach file) |
| `!status` | Show full bot command list |

---

## 👨‍💻 Developer

**Dwi Bakti N Dev / Roy** - Creator & Maintainer of XAMPP Meta Panel.
