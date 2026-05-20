<?php
$host = 'localhost';
$user = 'root'; 
$pass = '';
$conn = new mysqli($host, $user, $pass);
$db_status = "";

if (!$conn->connect_error) {
    $conn->query("CREATE DATABASE IF NOT EXISTS Meta_language_indonesia");
    $conn->select_db("Meta_language_indonesia");
    $conn->query("CREATE TABLE IF NOT EXISTS meta_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        kategori VARCHAR(100) NOT NULL,
        nilai VARCHAR(255) NOT NULL,
        tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    
    $db_status = "Terhubung";
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action']) && $_POST['action'] == 'insert') {
        $nama = $conn->real_escape_string($_POST['nama']);
        $kategori = $conn->real_escape_string($_POST['kategori']);
        $nilai = $conn->real_escape_string($_POST['nilai']);

        if (!empty($nama) && !empty($kategori)) {
            $conn->query("INSERT INTO meta_data (nama, kategori, nilai) VALUES ('$nama', '$kategori', '$nilai')");
        }
        header("Location: " . $_SERVER['PHP_SELF']);
        exit;
    }
} else {
    $db_status = "Koneksi Gagal: " . $conn->connect_error;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Xampp Meta Panel UI - Dark Mode</title>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
    <style>
        :root {
            --bg: #202124;
            --card: #292a2d;
            --card-hover: #303134;
            --text: #e8eaed;
            --muted: #9aa0a6;
            --accent: #8ab4f8;
            --accent-hover: #aecbfa;
            --border: #3c4043;
            --excel-header: #303134;
            --excel-border: #5f6368;
            --shadow: 0 12px 32px rgba(0,0,0,0.4);
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            min-height: 100vh;
            background: var(--bg);
            color: var(--text);
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 40px 20px;
        }
        
        .panel {
            width: min(1100px, 100%);
            background: var(--card);
            border-radius: 16px;
            box-shadow: var(--shadow);
            border: 1px solid var(--border);
            overflow: hidden;
        }
        .hero {
            padding: 48px 40px 32px;
            text-align: center;
            border-bottom: 1px solid var(--border);
        }
        .hero-icon {
            font-size: 56px;
            color: var(--accent);
            margin-bottom: 16px;
        }
        .hero h1 {
            font-size: clamp(2rem, 3vw, 2.8rem);
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
        }
        .hero p {
            color: var(--muted);
            font-size: 1.05rem;
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.6;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 16px;
            padding: 32px 40px;
            background: #252628;
        }
        .feature-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 20px;
            transition: background 0.2s ease;
        }
        .feature-card:hover {
            background: var(--card-hover);
        }
        .feature-card .material-symbols-outlined {
            color: var(--accent);
            font-size: 28px;
            margin-bottom: 12px;
        }
        .feature-card h3 {
            margin-bottom: 8px;
            font-size: 1.05rem;
            font-weight: 500;
        }
        .feature-card p {
            color: var(--muted);
            font-size: 0.9rem;
            line-height: 1.5;
        }
        .database-section {
            padding: 0 40px 40px;
        }
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            margin-top: 32px;
        }
        .section-header h2 {
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .status-badge {
            background: rgba(138, 180, 248, 0.1);
            color: var(--accent);
            padding: 4px 12px;
            border-radius: 99px;
            font-size: 0.85rem;
            font-weight: 500;
            border: 1px solid rgba(138, 180, 248, 0.2);
        }
        .excel-container {
            border: 1px solid var(--excel-border);
            border-radius: 8px;
            overflow-x: auto;
            background: var(--card);
        }
        .excel-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.95rem;
        }
        .excel-table th, .excel-table td {
            border: 1px solid var(--excel-border);
            padding: 10px 14px;
            text-align: left;
        }
        .excel-table th {
            background: var(--excel-header);
            color: var(--muted);
            font-weight: 500;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .excel-table tbody tr:hover {
            background: var(--card-hover);
        }
        .input-row {
            background: rgba(138, 180, 248, 0.05);
        }
        .input-row td {
            padding: 0;
        }
        .input-row input {
            width: 100%;
            padding: 12px 14px;
            background: transparent;
            border: none;
            color: var(--text);
            font-family: inherit;
            font-size: 0.95rem;
            outline: none;
        }
        .input-row input::placeholder {
            color: var(--muted);
        }
        .input-row input:focus {
            background: rgba(255,255,255,0.05);
        }
        
        .btn-save {
            width: 100%;
            padding: 10px;
            background: var(--accent);
            color: #202124;
            border: none;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: background 0.2s;
            height: 100%;
        }
        .btn-save:hover {
            background: var(--accent-hover);
        }
        .btn-save .material-symbols-outlined {
            font-size: 18px;
        }
        .footer {
            padding: 24px 40px;
            font-size: 0.9rem;
            color: var(--muted);
            border-top: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            background: var(--bg);
        }
    </style>
</head>
<body>
    <div class="panel">
        <section class="hero">
            <span class="material-symbols-outlined hero-icon">waving_hand</span>
            <h1>Selamat Datang di Meta Panel</h1>
            <p>Tampilan profesional dengan nuansa Dark Mode Google. Kelola proyek lokal dan input data langsung ke database Anda dengan antarmuka bergaya spreadsheet.</p>
        </section>

        <section class="features">
            <div class="feature-card">
                <span class="material-symbols-outlined">speed</span>
                <h3>Dashboard Cepat</h3>
                <p>Status server dan database dalam satu pandangan modern.</p>
            </div>
            <div class="feature-card">
                <span class="material-symbols-outlined">settings_power</span>
                <h3>Kontrol Layanan</h3>
                <p>Kelola modul Apache dan MySQL dengan responsif.</p>
            </div>
            <div class="feature-card">
                <span class="material-symbols-outlined">folder_managed</span>
                <h3>Manajemen Proyek</h3>
                <p>Tata folder kerja dan host virtual secara terstruktur.</p>
            </div>
            <div class="feature-card">
                <span class="material-symbols-outlined">database</span>
                <h3>Auto Database</h3>
                <p>Database dibuat otomatis saat halaman dijalankan.</p>
            </div>
        </section>

        <section class="database-section">
            <div class="section-header">
                <h2>
                    <span class="material-symbols-outlined">table_view</span>
                    Data Proyek (Meta_language_indonesia)
                </h2>
                <span class="status-badge">Status DB: <?= $db_status ?></span>
            </div>

            <div class="excel-container">
                <form method="POST">
                    <input type="hidden" name="action" value="insert">
                    <table class="excel-table">
                        <thead>
                            <tr>
                                <th style="width: 60px; text-align: center;">ID</th>
                                <th>Nama Entitas</th>
                                <th>Kategori</th>
                                <th>Nilai / Parameter</th>
                                <th style="width: 120px;">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if ($db_status == 'Terhubung'): ?>
                                <?php
                                $result = $conn->query("SELECT * FROM meta_data ORDER BY id ASC");
                                if ($result->num_rows > 0):
                                    while($row = $result->fetch_assoc()):
                                ?>
                                <tr>
                                    <td style="text-align: center; color: var(--muted);"><?= $row['id'] ?></td>
                                    <td><?= htmlspecialchars($row['nama']) ?></td>
                                    <td><?= htmlspecialchars($row['kategori']) ?></td>
                                    <td><?= htmlspecialchars($row['nilai']) ?></td>
                                    <td style="text-align: center; color: var(--muted); font-size: 0.85rem;">Tersimpan</td>
                                </tr>
                                <?php 
                                    endwhile;
                                else:
                                ?>
                                <tr>
                                    <td colspan="5" style="text-align: center; color: var(--muted); padding: 24px;">
                                        Belum ada data. Silakan input pada baris di bawah.
                                    </td>
                                </tr>
                                <?php endif; ?>
                            <?php endif; ?>
                            
                            <tr class="input-row">
                                <td style="text-align: center; color: var(--muted);">+</td>
                                <td><input type="text" name="nama" placeholder="Ketik nama..." required autocomplete="off"></td>
                                <td><input type="text" name="kategori" placeholder="Ketik kategori..." required autocomplete="off"></td>
                                <td><input type="text" name="nilai" placeholder="Ketik nilai..." autocomplete="off"></td>
                                <td>
                                    <button type="submit" class="btn-save">
                                        <span class="material-symbols-outlined">save</span> Simpan
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </section>

        <div class="footer">
            <span>Xampp Meta Panel UI &copy; 2026</span>
            <span>Mode Gelap Aktif</span>
        </div>
    </div>
</body>
</html>