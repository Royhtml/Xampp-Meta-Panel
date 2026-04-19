# XAMPP Meta Panel For Vscode

<p align="center">
  <img src="https://github.com/Royhtml/Xampp-Meta-Panel/raw/main/resources/icon.png?raw=true" alt="XAMPP Manager Logo" width="128" />
</p>

<p align="center">
  <strong>🚀 Jalankan Apache, MySQL, dan PHP langsung dari VS Code — Tanpa perlu install XAMPP secara manual!</strong>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=royhtml.xampp-manager"><img src="https://img.shields.io/visual-studio-marketplace/v/royhtml.xampp-manager?color=fb7a24&label=VS%20Marketplace" alt="Version"></a>
  <a href="https://github.com/royhtml/xampp-manager/stargazers">
  <a href="https://github.com/Royhtml/Xampp-Meta-Panel/issues"><img src="https://img.shields.io/github/issues/royhtml/xampp-manager" alt="Issues"></a>
</p>

---

<img src = "https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/Roy.gif?raw=true">

## 🎯 Kenapa Harus XAMPP Manager?

Bosan harus bolak-balik membuka **XAMPP Control Panel** hanya untuk menyalakan server lokal? Atau malas mengunduh dan mengkonfigurasi XAMPP di setiap komputer yang berbeda?

**XAMPP Manager** menghadirkan lingkungan pengembangan PHP/MySQL **portabel** langsung di dalam VS Code. Ekstensi ini mendeteksi instalasi XAMPP Anda atau **menyediakan runtime server internal** sehingga Anda bisa fokus ngoding, bukan konfigurasi server.

## ✨ Fitur Utama

### ⚡️ **Zero-Download Runtime (Fitur Unggulan)**
*   **Tidak Perlu Install XAMPP Ulang:** Ekstensi ini dibekali kemampuan untuk menjalankan *embedded server* (PHP built-in server & MariaDB portable) jika XAMPP tidak terdeteksi di sistem Anda.
*   **Satu Klik, Langsung Jalan:** Setelah ekstensi aktif, klik kanan pada folder project Anda, pilih `XAMPP: Serve Project Here`, dan website Anda langsung terbuka di browser.

### 🎛️ **Unified Control Center**
*   Panel kontrol elegan di dalam **Sidebar VS Code** yang menampilkan status:
    *   🟢 **Apache** (Port 80/8080)
    *   🟢 **MySQL** (Port 3306)
*   Tombol aksi cepat: `Start All`, `Stop All`, `Restart`, dan `Open phpMyAdmin`.

### 📂 **Smart Workspace Detection**
*   Secara otomatis membaca folder `htdocs` dari instalasi XAMPP lokal Anda.
*   **Virtual Host Creator:** Buat konfigurasi virtual host `*.test` langsung dari VS Code tanpa perlu mengutak-atik file `httpd-vhosts.conf` secara manual.

### 🐳 **Database Manager Integration**
*   Akses cepat ke **phpMyAdmin** langsung dari Status Bar.
*   **MySQL Shell:** Jalankan query SQL langsung dari Command Palette (`Ctrl+Shift+P` > `XAMPP: Run SQL Query`).

### 🔔 **Intelligent Notifications**
*   Mendapatkan notifikasi real-time ketika server berhasil berjalan atau mengalami error port conflict.
*   **Auto-kill Process:** Jika port 80 bentrok (misalnya dengan Skype atau IIS), ekstensi akan menawarkan untuk menghentikan proses tersebut secara otomatis.

---

## 📸 Tampilan Antarmuka

*Rasakan kontrol penuh tanpa meninggalkan editor kode Anda.*

<img src = "https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/meta.png?raw=true" alt = "Screenshot XAMPP Manager" width = "100%" />


## ⚙️ Persyaratan & Dependensi

**Ekstensi ini bersifat PORTABLE.** Anda tidak wajib memiliki XAMPP terinstall di sistem.

Namun, untuk fitur optimal, berikut rekomendasinya:

### Jika Anda SUDAH menginstall XAMPP:
*   XAMPP versi 7.4.x atau 8.x terinstall di direktori default (`C:\xampp` atau `/Applications/XAMPP`).
*   Ekstensi akan otomatis mendeteksinya dan menggunakan binary bawaan.

### Jika Anda BELUM/TIDAK menginstall XAMPP:
*   **Tidak perlu khawatir!** Ekstensi ini akan mengunduh dan mengekstrak **XAMPP Portable Launcher** (PHP 8.2 + MariaDB 10.11) secara otomatis ke direktori ekstensi pada *first run*. Pastikan koneksi internet Anda stabil.

---

## 🛠️ Pengaturan Ekstensi

Kustomisasi perilaku ekstensi melalui `Settings.json` (VS Code Settings).

| Setting ID | Deskripsi | Default |
| :--- | :--- | :--- |
| `xampp-manager.autoStart` | Otomatis jalankan server saat VS Code membuka workspace PHP. | `false` |
| `xampp-manager.apachePort` | Ubah port default Apache (berguna jika port 80 bentrok). | `80` |
| `xampp-manager.mysqlPort` | Ubah port default MySQL. | `3306` |
| `xampp-manager.useBuiltInPhp` | **Fitur Unggulan:** Paksa penggunaan PHP server internal VS Code daripada Apache XAMPP. | `false` |

Contoh konfigurasi di `settings.json`:
```json
{
    "xampp-manager.autoStart": true,
    "xampp-manager.apachePort": 8080,
    "xampp-manager.useBuiltInPhp": false
}
```

---

## ⌨️ Perintah (Commands)

Buka **Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`) dan ketik `XAMPP`:

*   `XAMPP: Start Servers` - Menyalakan Apache & MySQL.
*   `XAMPP: Stop Servers` - Mematikan semua layanan.
*   `XAMPP: Open htdocs Folder` - Buka folder root document di File Explorer.
*   `XAMPP: Open phpMyAdmin` - Buka panel database di browser default.
*   `XAMPP: Create New Virtual Host` - Wizard pembuatan domain lokal.

---

## 🐛 Masalah yang Diketahui

*   **Windows Defender:** Saat pertama kali menjalankan *embedded server* (mode tanpa instalasi), Windows Defender mungkin meminta izin akses *Private Network*. Harap pilih **Allow** agar server dapat diakses via `localhost`.
*   **macOS Permission:** Jika folder proyek berada di luar `~/Documents`, pastikan VS Code memiliki izin **Full Disk Access** di System Preferences > Security & Privacy.

---

## 📝 Catatan Rilis

### **Version 2.0.0** *(Latest)*
*   ✨ **MAJOR:** Penambahan fitur **XAMPP Portable Runtime**. Kini XAMPP Manager bisa menjalankan server PHP/MySQL MESKIPUN XAMPP TIDAK TERINSTAL di komputer.
*   🎨 UI Sidebar didesain ulang agar lebih intuitif.
*   ⚡ Peningkatan performa deteksi port conflict.

### **Version 1.2.1**
*   🐛 Perbaikan bug: Virtual Host tidak muncul di hosts file pada macOS Sonoma.
*   💡 Penambahan ikon status di Activity Bar.

### **Version 1.0.0**
*   🎉 Rilis perdana: Start/Stop Apache & MySQL dari VS Code.

---

## 👨‍💻 Dibuat dengan ❤️ oleh

**Dwi Bakti N Dev**

*Portfolio & Support:*
*   GitHub: [github.com/royhtml](https://github.com/Royhtml)
*   Sponsor Project: [Buy me a Coffee](https://ko-fi.com/DwiBaktiNDev)

**[⬆ Kembali ke Atas](#xampp-manager-for-vs-code)**

**Selamat ngoding! Jangan lupa kasih ⭐ di Marketplace jika ekstensi ini bermanfaat!**
