    const firebaseConfig = {
      apiKey: "AIzaSyAQ-wPItIElylj5XAz49XmtHAsZ-iNvXl8",
      authDomain: "finan-f8f87.firebaseapp.com",
      projectId: "finan-f8f87",
      storageBucket: "finan-f8f87.firebasestorage.app",
      messagingSenderId: "201699720660",
      appId: "1:201699720660:web:4298bd7af96f4db664ea41",
      measurementId: "G-2W972FM9QJ"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();
    let serviceStates = { apache: 'idle', mysql: 'idle' };
    let totalActions = 0;
    let mysqlHistory = [];
    let mysqlHistoryIdx = -1;
    let currentDb = '';
    let runners = {};
    let savedLinks = [];
    let currentUser = null;
    let currentLinkFilter = 'all';
    let chatUnread = false;
    let chatListener = null;
    let userApiKeys = [];
    let activeApiKey = null;

    const sectionMeta = {
      'dashboard': { title: 'Dashboard', subtitle: 'Monitor & control your XAMPP services' },
      'mysql-terminal': { title: 'MySQL Terminal', subtitle: 'Execute SQL queries — FIXED: auto USE prefix' },
      'services': { title: 'Service Control', subtitle: 'Start/Stop Apache & MariaDB' },
      'runners': { title: 'Project Runner', subtitle: 'Run Laravel & PHP projects — persisted' },
      'linker': { title: 'Link Notifier', subtitle: 'Save links & paths — synced to Database' },
      'apikeys': { title: 'API Keys', subtitle: 'Generate & manage API keys for web.js' },
      'chat': { title: 'Public Chat', subtitle: 'Global chat room via Databases Meta Panel' },
      'doc-install': { title: 'Installation', subtitle: 'Environment setup steps' },
      'doc-source': { title: 'Source Code', subtitle: 'Complete web.js code' },
      'doc-run': { title: 'How to Run', subtitle: 'Server operational guide' },
      'doc-endpoints': { title: 'API Endpoints', subtitle: 'Complete endpoint reference' },
      'doc-fetch': { title: 'Fetch Examples', subtitle: 'JavaScript implementation' },
      'doc-troubleshoot': { title: 'Troubleshooting', subtitle: 'Common issues & solutions' },
    };
    function escHtml(s) { if (!s) return ''; const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
    function ts() { return new Date().toLocaleTimeString('en-US', { hour12: false }); }
    function showToast(msg, type = 'info') {
      const c = document.getElementById('toast-container'), t = document.createElement('div'); t.className = 'toast';
      const ic = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-circle' };
      const cl = { success: 'var(--accent-green)', error: 'var(--accent-red)', info: 'var(--accent-blue)', warning: 'var(--accent-yellow)' };
      t.innerHTML = `<i class="fas ${ic[type] || ic.info}" style="color:${cl[type] || cl.info}"></i><span>${msg}</span>`;
      c.appendChild(t); requestAnimationFrame(() => t.classList.add('show'));
      setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
    }
    function copyCode(btn) { navigator.clipboard.writeText(btn.nextElementSibling.innerText).then(() => showToast('Code copied!', 'success')); }
    function apiFetch(url, options = {}) {
      const headers = options.headers || {};
      if (activeApiKey) {
        headers['X-API-Key'] = activeApiKey;
      }
      return fetch(url, { ...options, headers });
    }
    function genKey() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const seg = () => Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      return `${seg()}-${seg()}-${seg()}-${seg()}`;
    }
    function switchSection(id) {
      if (!currentUser) return;
      document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.nav-item[data-section]').forEach(n => n.classList.remove('active'));
      const panel = document.getElementById('section-' + id); if (panel) panel.classList.add('active');
      const nav = document.querySelector(`.nav-item[data-section="${id}"]`); if (nav) nav.classList.add('active');
      const m = sectionMeta[id]; if (m) { document.getElementById('topbar-title').textContent = m.title; document.getElementById('topbar-subtitle').textContent = m.subtitle; }
      document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('active');
      if (id === 'mysql-terminal') setTimeout(() => document.getElementById('mysql-input').focus(), 100);
      if (id === 'linker') renderLinks();
      if (id === 'runners') renderRunners();
      if (id === 'apikeys') renderApiKeys();
      if (id === 'chat') { chatUnread = false; document.getElementById('chat-unread-dot').style.display = 'none'; updateChatUI(); }
    }
    function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); document.getElementById('sidebarOverlay').classList.toggle('active'); }
    auth.onAuthStateChanged(user => {
      currentUser = user;
      updateAuthUI();
      if (user) {
        document.getElementById('login-wall').style.display = 'none';
        loadLinksFromFirebase();
        loadRunnersFromFirebase();
        loadApiKeysFromFirebase();
        setupChatListener();
        document.getElementById('fb-dot').style.background = 'var(--accent-green)';
        document.getElementById('fb-dot').style.boxShadow = '0 0 6px rgba(129,201,149,0.6)';
        document.getElementById('fb-text').textContent = 'Database: OK';
        document.getElementById('fb-text').style.color = 'var(--accent-green)';
      } else {
        document.getElementById('login-wall').style.display = '';
        savedLinks = []; runners = {}; userApiKeys = []; activeApiKey = null;
        renderLinks(); renderRunners(); renderApiKeys();
        if (chatListener) { chatListener(); chatListener = null; }
        document.getElementById('fb-dot').style.background = 'var(--text-muted)';
        document.getElementById('fb-dot').style.boxShadow = 'none';
        document.getElementById('fb-text').textContent = 'Database: --';
        document.getElementById('fb-text').style.color = 'var(--text-muted)';
      }
    });

    function doGoogleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(r => { showToast(`Welcome, ${r.user.displayName}!`, 'success'); }).catch(e => {
        if (e.code !== 'auth/popup-closed-by-user') {
          const errEl = document.getElementById('login-error');
          if (errEl) { errEl.textContent = 'Login failed: ' + e.message; errEl.style.display = ''; }
          showToast('Login failed: ' + e.message, 'error');
        }
      });
    }
    function doLogout() {
      auth.signOut().then(() => showToast('Logged out successfully', 'info')).catch(() => showToast('Logout failed', 'error'));
    }

    function updateAuthUI() {
      const avatar = document.getElementById('sidebar-avatar');
      const uname = document.getElementById('sidebar-username');
      const btnLogin = document.getElementById('btn-login-sidebar');
      const btnLogout = document.getElementById('btn-logout-sidebar');
      if (currentUser) {
        const initials = currentUser.displayName ? currentUser.displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '?';
        avatar.innerHTML = initials;
        avatar.style.background = 'var(--accent-blue-bg)';
        avatar.style.color = 'var(--accent-blue)';
        avatar.style.border = '1px solid rgba(138,180,248,0.3)';
        uname.textContent = currentUser.displayName || currentUser.email;
        uname.style.color = 'var(--text-primary)';
        btnLogin.style.display = 'none';
        btnLogout.style.display = '';
      } else {
        avatar.innerHTML = '<i class="fas fa-user"></i>';
        avatar.style.background = 'var(--bg-tertiary)';
        avatar.style.color = 'var(--text-muted)';
        avatar.style.border = 'none';
        uname.textContent = 'Not signed in';
        uname.style.color = 'var(--text-muted)';
        btnLogin.style.display = '';
        btnLogout.style.display = 'none';
      }
      updateChatUI();
    }
    function updateStatusUI(svc, state) {
      serviceStates[svc] = state; totalActions++;
      document.getElementById('dash-total-actions').textContent = totalActions;
      const run = state === 'running', bc = run ? 'status-running' : 'status-stopped', bt = run ? 'Running' : 'Stopped', bh = `<span class="status-dot"></span>${bt}`;
      ['dash', 'svc'].forEach(p => { const el = document.getElementById(`${p}-badge-${svc}`); if (el) { el.className = `status-badge ${bc}`; el.innerHTML = bh; } });
      const ds = document.getElementById(`dash-${svc}-status`); if (ds) { ds.className = `status-badge ${bc}`; ds.innerHTML = bh; }
      ['dash-card', 'svc-card'].forEach(p => { const c = document.getElementById(`${p}-${svc}`); if (c) { c.classList.remove('glow-green', 'glow-red'); c.classList.add(run ? 'glow-green' : 'glow-red'); } });
      ['dash-icon', 'svc-icon'].forEach(p => { const ic = document.getElementById(`${p}-${svc}`); if (ic) { ic.style.background = run ? 'rgba(129,201,149,0.12)' : 'rgba(242,139,130,0.1)'; ic.style.color = run ? 'var(--accent-green)' : 'var(--accent-red)'; } });
    }
    function setApiConnected(ok) {
      const el = document.getElementById('dash-api-status'), dot = document.getElementById('conn-dot'), txt = document.getElementById('conn-text');
      if (ok) { el.className = 'status-badge status-running'; el.innerHTML = '<span class="status-dot"></span>Connected'; dot.style.background = 'var(--accent-green)'; dot.style.boxShadow = '0 0 6px rgba(129,201,149,0.6)'; txt.textContent = 'Connected'; txt.style.color = 'var(--accent-green)'; }
      else { el.className = 'status-badge status-stopped'; el.innerHTML = '<span class="status-dot"></span>Offline'; dot.style.background = 'var(--accent-red)'; dot.style.boxShadow = 'none'; txt.textContent = 'Not connected'; txt.style.color = 'var(--accent-red)'; }
    }
    function controlService(endpoint, svc, action) {
      const t = ts(), dl = document.getElementById('dash-log-body'), sl = document.getElementById('svc-log-body');
      const lm = `<div><span style="color:var(--accent-blue)">[${t}]</span> <span style="color:var(--text-secondary)">${action} ${svc}...</span></div>`;
      dl.innerHTML += lm; sl.innerHTML += lm; dl.scrollTop = dl.scrollHeight; sl.scrollTop = sl.scrollHeight;
      apiFetch(`http://localhost:8080${endpoint}`).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => {
        if (d.success) { updateStatusUI(svc, action === 'start' ? 'running' : 'stopped'); const om = `<div><span style="color:var(--accent-blue)">[${t}]</span> <span style="color:var(--accent-green);font-weight:600">OK: ${d.message}</span></div>`; dl.innerHTML += om; sl.innerHTML += om; showToast(`${svc}: ${d.message}`, 'success'); setApiConnected(true); }
        else { const wm = `<div><span style="color:var(--accent-blue)">[${t}]</span> <span style="color:var(--accent-yellow);font-weight:600">WARN: ${d.message}</span></div>`; dl.innerHTML += wm; sl.innerHTML += wm; showToast(d.message, 'warning'); }
        dl.scrollTop = dl.scrollHeight; sl.scrollTop = sl.scrollHeight;
      }).catch(() => { const em = `<div><span style="color:var(--accent-blue)">[${t}]</span> <span style="color:var(--accent-red);font-weight:600">ERROR: Failed to connect to API.</span></div>`; dl.innerHTML += em; sl.innerHTML += em; dl.scrollTop = dl.scrollHeight; sl.scrollTop = sl.scrollHeight; showToast('Failed to connect to API!', 'error'); setApiConnected(false); });
    }
    function clearLog(id) { document.getElementById(id).innerHTML = '<div style="color:var(--text-muted)">[ System ] Log cleared.</div>'; }
    function clearTermBody(id) { document.getElementById(id).innerHTML = '<div style="color:var(--accent-green)">-- Terminal cleared.</div><div style="color:var(--text-muted)">-----------------------------------------------------------</div>'; }

    // ===== MYSQL TERMINAL (FIXED) =====
    const mysqlInput = document.getElementById('mysql-input'), mysqlBody = document.getElementById('mysql-term-body'), mysqlPrompt = document.getElementById('mysql-prompt');

    function updatePrompt() { mysqlPrompt.textContent = currentDb ? `MariaDB [${currentDb}]>` : 'MariaDB [(none)]>'; }

    function buildMysqlQuery(rawQuery) {
      const trimmed = rawQuery.trim();
      const upper = trimmed.toUpperCase();
      if (upper === 'USE NONE' || upper.startsWith('USE ') || upper.startsWith('USE\t')) return null;
      if (upper.startsWith('USE ')) return trimmed;
      if (currentDb) return `USE \`${currentDb}\`; ${trimmed}`;
      return trimmed;
    }

    mysqlInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = mysqlInput.value.trim();
        if (!q) return;
        const ql = q.toLowerCase();
        if (ql === 'clear') { clearTermBody('mysql-term-body'); mysqlInput.value = ''; return; }
        if (ql === 'help') {
          mysqlBody.innerHTML += `<div style="color:var(--accent-yellow)">Internal commands: clear, help, exit, use &lt;database&gt;, use none</div>`;
          mysqlBody.innerHTML += `<div style="color:var(--accent-yellow)">FIX: Queries auto-prefixed with "USE db;" if database selected</div>`;
          mysqlBody.innerHTML += `<div style="color:var(--text-muted)">-----------------------------------------------------------</div>`;
          mysqlBody.scrollTop = mysqlBody.scrollHeight; mysqlInput.value = ''; return;
        }
        if (ql === 'exit') {
          mysqlBody.innerHTML += '<div style="color:var(--text-muted)">Bye</div>';
          mysqlBody.scrollTop = mysqlBody.scrollHeight; mysqlInput.value = ''; return;
        }
        if (ql.startsWith('use ')) {
          const dbName = q.substring(4).trim().replace(/;$/, '').replace(/`/g, '');
          mysqlBody.innerHTML += `<div><span style="color:var(--accent-green)">${escHtml(mysqlPrompt.textContent)}</span> <span style="color:var(--text-primary)">${escHtml(q)}</span></div>`;
          mysqlInput.value = ''; mysqlInput.disabled = true;
          if (dbName.toLowerCase() === 'none') {
            currentDb = ''; updatePrompt();
            mysqlBody.innerHTML += '<div style="color:var(--accent-green)">Database reset. Now without database.</div>';
            mysqlBody.innerHTML += '<div style="color:var(--text-muted)">-----------------------------------------------------------</div>';
            mysqlBody.scrollTop = mysqlBody.scrollHeight; mysqlInput.disabled = false; mysqlInput.focus();
            mysqlHistory.push(q); mysqlHistoryIdx = mysqlHistory.length; updateMysqlHistoryUI();
            return;
          }
          apiFetch(`http://localhost:8080/api/mysql-query?query=${encodeURIComponent('USE `' + dbName + '`')}`).then(r => r.json()).then(d => {
            if (d.success) { currentDb = dbName; updatePrompt(); mysqlBody.innerHTML += `<div style="color:var(--accent-green)">Database changed to \`${escHtml(dbName)}\`</div>`; }
            else { mysqlBody.innerHTML += `<div style="color:var(--accent-red)">${escHtml(d.message)}</div>`; }
            mysqlBody.innerHTML += '<div style="color:var(--text-muted)">-----------------------------------------------------------</div>';
            mysqlBody.scrollTop = mysqlBody.scrollHeight; mysqlInput.disabled = false; mysqlInput.focus();
          }).catch(() => { mysqlBody.innerHTML += '<div style="color:var(--accent-red)">ERROR: Not connected to API.</div><div style="color:var(--text-muted)">-----------------------------------------------------------</div>'; mysqlBody.scrollTop = mysqlBody.scrollHeight; mysqlInput.disabled = false; mysqlInput.focus(); });
          mysqlHistory.push(q); mysqlHistoryIdx = mysqlHistory.length; updateMysqlHistoryUI();
          return;
        }
        const finalQuery = buildMysqlQuery(q);
        mysqlHistory.push(q); mysqlHistoryIdx = mysqlHistory.length; updateMysqlHistoryUI();
        mysqlBody.innerHTML += `<div><span style="color:var(--accent-green)">${escHtml(mysqlPrompt.textContent)}</span> <span style="color:var(--text-primary)">${escHtml(q)}</span></div>`;
        if (currentDb && finalQuery !== q.trim()) { mysqlBody.innerHTML += `<div style="color:var(--text-muted);font-size:11px">[auto-prefix: USE \`${escHtml(currentDb)}\`]</div>`; }
        mysqlInput.value = ''; mysqlInput.disabled = true;
        apiFetch(`http://localhost:8080/api/mysql-query?query=${encodeURIComponent(finalQuery)}`).then(r => r.json()).then(d => {
          if (d.success) { if (d.result) { d.result.split('\n').forEach(l => { mysqlBody.innerHTML += `<div style="color:#c9d1d9">${escHtml(l)}</div>`; }); } else { mysqlBody.innerHTML += '<div style="color:var(--text-muted)">Query OK, 0 rows affected</div>'; } }
          else { mysqlBody.innerHTML += `<div style="color:var(--accent-red)">${escHtml(d.message)}</div>`; }
          mysqlBody.innerHTML += '<div style="color:var(--text-muted)">-----------------------------------------------------------</div>';
          mysqlBody.scrollTop = mysqlBody.scrollHeight; mysqlInput.disabled = false; mysqlInput.focus();
        }).catch(() => { mysqlBody.innerHTML += '<div style="color:var(--accent-red)">ERROR: Not connected to API.</div><div style="color:var(--text-muted)">-----------------------------------------------------------</div>'; mysqlBody.scrollTop = mysqlBody.scrollHeight; mysqlInput.disabled = false; mysqlInput.focus(); });
        mysqlBody.scrollTop = mysqlBody.scrollHeight;
      }
      if (e.key === 'ArrowUp') { e.preventDefault(); if (mysqlHistoryIdx > 0) { mysqlHistoryIdx--; mysqlInput.value = mysqlHistory[mysqlHistoryIdx]; } }
      if (e.key === 'ArrowDown') { e.preventDefault(); if (mysqlHistoryIdx < mysqlHistory.length - 1) { mysqlHistoryIdx++; mysqlInput.value = mysqlHistory[mysqlHistoryIdx]; } else { mysqlHistoryIdx = mysqlHistory.length; mysqlInput.value = ''; } }
    });

    function execQuick(q) { mysqlInput.value = q; mysqlInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })); }
    function updateMysqlHistoryUI() {
      const el = document.getElementById('mysql-history');
      if (!mysqlHistory.length) { el.innerHTML = '<div class="opacity-50">No queries yet...</div>'; return; }
      el.innerHTML = mysqlHistory.slice(-20).reverse().map(q => `<div class="py-0.5 px-1.5 rounded hover:bg-[var(--bg-hover)] cursor-pointer truncate" onclick="execQuick('${q.replace(/'/g, "\\'")}')" title="${escHtml(q)}"><span class="text-[var(--accent-blue)] mr-0.5">&gt;</span>${escHtml(q)}</div>`).join('');
    }

    // ===== PROJECT RUNNER (FIREBASE PERSISTED — Laravel & PHP only) =====
    const runnerTypes = {
      laravel: { label: 'Laravel', icon: 'fa-brands fa-laravel', color: 'var(--accent-red)', defaultCmd: 'php artisan serve', placeholder: 'C:\\project\\my-laravel-app', killCmd: 'taskkill /F /IM php.exe /T' },
      php: { label: 'PHP Public', icon: 'fa-brands fa-php', color: 'var(--accent-purple)', defaultCmd: 'php -S localhost:8081', placeholder: 'C:\\project\\my-php-app\\public', killCmd: 'taskkill /F /IM php.exe /T' },
    };

    function getKillCommands(type) {
      const info = runnerTypes[type];
      return info ? info.killCmd : '';
    }

    function loadRunnersFromFirebase() {
      if (!currentUser) return;
      db.collection('users').doc(currentUser.uid).collection('runners').orderBy('createdAt', 'desc').get().then(snap => {
        runners = {};
        snap.docs.forEach(d => {
          const data = d.data();
          runners[d.id] = { ...data, id: d.id, controller: null, _output: data.output || '' };
        });
        renderRunners();
        Object.values(runners).forEach(r => {
          if (r.status === 'running') {
            runStreamRunner(r.id, true);
          }
        });
      }).catch(e => { console.error('Load runners error:', e); });
    }

    function saveRunnerToFirebase(id) {
      if (!currentUser || !runners[id]) return;
      const r = runners[id];
      db.collection('users').doc(currentUser.uid).collection('runners').doc(id).set({
        name: r.name,
        type: r.type,
        path: r.path,
        cmd: r.cmd,
        port: r.port || '',
        status: r.status,
        output: (r._output || '').slice(-5000),
        createdAt: r.createdAt || firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true }).catch(e => console.error('Save runner error:', e));
    }

    function openRunnerModal() {
      if (!currentUser) { showToast('Please sign in first!', 'warning'); return; }
      const root = document.getElementById('modal-root');
      root.innerHTML = `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
        <div class="modal-box p-6">
          <div class="flex items-center justify-between mb-5"><h3 class="font-bold text-[16px] flex items-center gap-2"><i class="fas fa-rocket text-[var(--accent-orange)]"></i>New Project</h3><button onclick="closeModal()" class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-hover)] text-[var(--text-muted)]"><i class="fas fa-times"></i></button></div>
          <div class="space-y-4">
            <div><label class="form-label">Project Type</label><select id="runner-type" class="input-field select-field" onchange="onRunnerTypeChange()"><option value="laravel">Laravel (php artisan serve)</option><option value="php">PHP Public (php -S)</option></select></div>
            <div><label class="form-label">Project Name</label><input type="text" id="runner-name" class="input-field" placeholder="My Project"></div>
            <div><label class="form-label">Project Folder Path</label><input type="text" id="runner-path" class="input-field input-mono" placeholder="C:\\project\\my-laravel-app"></div>
            <div><label class="form-label">Execution Command</label><input type="text" id="runner-cmd" class="input-field input-mono" placeholder="php artisan serve"></div>
            <div><label class="form-label">Custom Port (optional)</label><input type="text" id="runner-port" class="input-field input-mono" placeholder="Leave empty for default"></div>
            <div class="flex gap-3 pt-2"><button onclick="closeModal()" class="btn btn-ghost flex-1 justify-center">Cancel</button><button onclick="startRunner()" class="btn btn-blue flex-1 justify-center"><i class="fas fa-play"></i>Run</button></div>
          </div>
        </div>
      </div>`;
      onRunnerTypeChange();
    }

    function onRunnerTypeChange() {
      const type = document.getElementById('runner-type').value, info = runnerTypes[type];
      document.getElementById('runner-path').placeholder = info.placeholder;
      document.getElementById('runner-cmd').value = info.defaultCmd;
      document.getElementById('runner-name').placeholder = info.label + ' Project';
    }

    function startRunner() {
      const type = document.getElementById('runner-type').value;
      const name = document.getElementById('runner-name').value.trim() || runnerTypes[type].label + ' Project';
      const path = document.getElementById('runner-path').value.trim();
      const cmd = document.getElementById('runner-cmd').value.trim();
      const port = document.getElementById('runner-port').value.trim();
      if (!path) { showToast('Project path is required!', 'warning'); return; }
      if (!cmd) { showToast('Command is required!', 'warning'); return; }
      let finalCmd = `cmd /c "cd /d "${path}" && ${cmd}"`;
      if (port && type === 'laravel') finalCmd = `cmd /c "cd /d "${path}" && php artisan serve --port=${port}"`;
      else if (port && type === 'php') finalCmd = `cmd /c "cd /d "${path}" && php -S localhost:${port}"`;

      const newRef = db.collection('users').doc(currentUser.uid).collection('runners').doc();
      const id = newRef.id;
      runners[id] = {
        id, name, type, path, cmd: finalCmd, port,
        status: 'starting', controller: null, _output: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      closeModal(); switchSection('runners');
      runStreamRunner(id, false);
    }

    async function runStreamRunner(id, isRestart) {
      const runner = runners[id]; if (!runner) return;
      runner.status = 'running';
      runner._output = isRestart ? (runner._output || '') + `\n[${ts()}] [Auto-restart after refresh]\n` : runner._output || '';
      renderRunners();
      saveRunnerToFirebase(id);
      try {
        const resp = await apiFetch(`http://localhost:8080/api/run-stream?cmd=${encodeURIComponent(runner.cmd)}`);
        if (!resp.ok) throw new Error('Status: ' + resp.status);
        const reader = resp.body.getReader(), decoder = new TextDecoder();
        runner.controller = { abort: () => reader.cancel() };
        runner.status = 'running';
        let saveTimer = null;
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            runner.status = 'stopped'; runner.controller = null;
            renderRunners(); saveRunnerToFirebase(id); break;
          }
          const text = decoder.decode(value, { stream: true });
          runner._output += text;
          const termEl = document.getElementById(`runner-term-${id}`);
          if (termEl) { termEl.innerHTML += escHtml(text); termEl.scrollTop = termEl.scrollHeight; }
          if (!saveTimer) {
            saveTimer = setInterval(() => { if (runners[id]) saveRunnerToFirebase(id); }, 3000);
          }
        }
        if (saveTimer) clearInterval(saveTimer);
      } catch (err) {
        if (err.name !== 'AbortError') { runner.status = 'error'; runner._output += '\n[Error] ' + err.message; }
        else runner.status = 'stopped';
        runner.controller = null; renderRunners(); saveRunnerToFirebase(id);
        showToast(`${runner.name}: ${runner.status === 'error' ? 'Error' : 'Stopped'}`, runner.status === 'error' ? 'error' : 'info');
      }
      updateRunnerCount();
    }

    async function stopRunner(id) {
      const r = runners[id]; if (!r) return;
      if (r.controller) r.controller.abort();
      const killCmd = getKillCommands(r.type);
      if (killCmd) {
        r._output += `\n[${ts()}] Stopping process: ${killCmd}\n`;
        try {
          await apiFetch(`http://localhost:8080/api/run?cmd=${encodeURIComponent(killCmd)}`).then(r => r.json());
        } catch (e) { }
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      r.status = 'stopped';
      renderRunners(); updateRunnerCount();
      saveRunnerToFirebase(id);
      showToast(`${r.name}: Stopped & process killed`, 'info');
    }

    function removeRunner(id) {
      const r = runners[id]; if (!r) return;
      if (r.controller) r.controller.abort();
      const killCmd = getKillCommands(r.type);
      if (killCmd) {
        apiFetch(`http://localhost:8080/api/run?cmd=${encodeURIComponent(killCmd)}`).catch(() => { });
      }
      delete runners[id];
      db.collection('users').doc(currentUser.uid).collection('runners').doc(id).delete().catch(() => { });
      renderRunners(); updateRunnerCount();
      showToast('Project removed', 'info');
    }

    function updateRunnerCount() { document.getElementById('dash-runners-count').textContent = Object.values(runners).filter(r => r.status === 'running').length; }

    function renderRunners() {
      const list = document.getElementById('runners-list'), entries = Object.values(runners);
      if (!entries.length) { list.innerHTML = '<div class="card p-8 text-center"><i class="fas fa-rocket text-3xl text-[var(--text-muted)] mb-3"></i><p class="text-[var(--text-muted)] text-[14px]">No projects running yet</p></div>'; return; }
      list.innerHTML = entries.map(r => {
        const info = runnerTypes[r.type];
        const sb = r.status === 'running' ? '<span class="status-badge status-running"><span class="status-dot"></span>Running</span>' : r.status === 'starting' ? '<span class="status-badge status-idle"><span class="status-dot"></span>Starting...</span>' : r.status === 'error' ? '<span class="status-badge status-stopped"><span class="status-dot"></span>Error</span>' : '<span class="status-badge status-stopped"><span class="status-dot"></span>Stopped</span>';
        const gc = r.status === 'running' ? 'glow-orange' : r.status === 'error' ? 'glow-red' : '';
        return `<div class="card ${gc} overflow-hidden">
          <div class="p-4 flex items-center justify-between border-b border-[var(--border-color)]">
            <div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:${info.color}15;color:${info.color}"><i class="${info.icon}"></i></div><div><div class="font-semibold text-[14px]">${escHtml(r.name)}</div><div class="text-[11px] text-[var(--text-muted)] font-mono">${escHtml(r.path)}</div></div></div>
            <div class="flex items-center gap-2">${sb}<button onclick="stopRunner('${r.id}')" class="btn btn-red btn-sm" title="Stop & Kill"><i class="fas fa-skull-crossbones text-[9px]"></i></button><button onclick="removeRunner('${r.id}')" class="btn btn-ghost btn-sm"><i class="fas fa-trash-alt text-[9px]"></i></button></div>
          </div>
          <div class="terminal" style="border:none;border-radius:0"><div class="terminal-body" id="runner-term-${r.id}" style="min-height:150px;max-height:300px;font-size:11.5px">${escHtml(r._output || '')}</div></div>
          <div class="px-4 py-2 border-t border-[var(--border-color)] flex items-center justify-between"><code class="text-[10px] text-[var(--text-muted)]">${escHtml(r.cmd)}</code><div class="flex gap-2"><button onclick="restartRunner('${r.id}')" class="btn btn-green btn-sm text-[10px]"><i class="fas fa-redo text-[8px]"></i>Restart</button><button onclick="clearTermBody('runner-term-${r.id}');runners['${r.id}']._output='';saveRunnerToFirebase('${r.id}');" class="btn btn-ghost btn-sm text-[10px]"><i class="fas fa-eraser"></i>Clear</button></div></div>
        </div>`;
      }).join('');
      entries.forEach(r => { const el = document.getElementById(`runner-term-${r.id}`); if (el) el.scrollTop = el.scrollHeight; });
      updateRunnerCount();
    }

    function restartRunner(id) {
      const r = runners[id]; if (!r) return;
      if (r.controller) r.controller.abort();
      const killCmd = getKillCommands(r.type);
      if (killCmd) {
        apiFetch(`http://localhost:8080/api/run?cmd=${encodeURIComponent(killCmd)}`).catch(() => { });
      }
      r.status = 'stopped'; r._output += `\n[${ts()}] Restarting...\n`;
      setTimeout(() => { runStreamRunner(id, false); }, 1000);
      showToast(`${r.name}: Restarting...`, 'info');
    }

    // ===== LINK NOTIFIER (FIREBASE SYNC) =====
    const linkCategories = {
      project: { label: 'Project', icon: 'fa-folder', color: 'var(--accent-blue)' },
      api: { label: 'API', icon: 'fa-plug', color: 'var(--accent-green)' },
      docs: { label: 'Docs', icon: 'fa-book', color: 'var(--accent-yellow)' },
      tool: { label: 'Tools', icon: 'fa-wrench', color: 'var(--accent-orange)' },
      other: { label: 'Other', icon: 'fa-ellipsis-h', color: 'var(--accent-purple)' },
    };

    function loadLinksFromFirebase() {
      if (!currentUser) return;
      db.collection('users').doc(currentUser.uid).collection('links').orderBy('createdAt', 'desc').get().then(snap => {
        savedLinks = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        renderLinks();
      }).catch(e => { console.error('Load links error:', e); });
    }

    function openLinkerModal() {
      if (!currentUser) { showToast('Please sign in with Google first!', 'warning'); return; }
      const root = document.getElementById('modal-root');
      const catOpts = Object.entries(linkCategories).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
      root.innerHTML = `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
        <div class="modal-box p-6">
          <div class="flex items-center justify-between mb-5"><h3 class="font-bold text-[16px] flex items-center gap-2"><i class="fas fa-link text-[var(--accent-blue)]"></i>Add Link</h3><button onclick="closeModal()" class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-hover)] text-[var(--text-muted)]"><i class="fas fa-times"></i></button></div>
          <div class="space-y-4">
            <div><label class="form-label">Name</label><input type="text" id="link-name" class="input-field" placeholder="phpMyAdmin"></div>
            <div><label class="form-label">Link / URL</label><input type="text" id="link-url" class="input-field input-mono" placeholder="http://localhost/phpmyadmin"><p class="text-[10px] text-[var(--text-muted)] mt-1">URL or local path (C:\\folder\\file)</p></div>
            <div><label class="form-label">Category</label><select id="link-cat" class="input-field select-field">${catOpts}</select></div>
            <div><label class="form-label">Click Action</label><select id="link-action" class="input-field select-field"><option value="open">Open in new tab</option><option value="copy">Copy to clipboard</option><option value="navigate">Open in this tab</option></select></div>
            <div class="flex gap-3 pt-2"><button onclick="closeModal()" class="btn btn-ghost flex-1 justify-center">Cancel</button><button onclick="saveLink()" class="btn btn-blue flex-1 justify-center"><i class="fas fa-save"></i>Save</button></div>
          </div>
        </div>
      </div>`;
    }

    function saveLink() {
      const name = document.getElementById('link-name').value.trim();
      const url = document.getElementById('link-url').value.trim();
      const cat = document.getElementById('link-cat').value;
      const action = document.getElementById('link-action').value;
      if (!name) { showToast('Name is required!', 'warning'); return; }
      if (!url) { showToast('Link/Path is required!', 'warning'); return; }
      db.collection('users').doc(currentUser.uid).collection('links').add({
        name, url, cat, action, createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => { closeModal(); showToast('Link saved to Database!', 'success'); loadLinksFromFirebase(); }).catch(e => { showToast('Failed to save: ' + e.message, 'error'); });
    }

    function deleteLink(id) {
      db.collection('users').doc(currentUser.uid).collection('links').doc(id).delete().then(() => { savedLinks = savedLinks.filter(l => l.id !== id); renderLinks(); showToast('Link deleted', 'info'); }).catch(e => showToast('Failed to delete', 'error'));
    }

    function handleLinkClick(link) {
      if (link.action === 'copy') { navigator.clipboard.writeText(link.url).then(() => showToast(`"${link.name}" copied!`, 'success')); }
      else if (link.action === 'navigate') { if (link.url.match(/^[A-Za-z]:\\/)) showToast('Local path cannot be opened in browser. Use "Copy".', 'warning'); else window.location.href = link.url; }
      else { if (link.url.match(/^[A-Za-z]:\\/)) navigator.clipboard.writeText(link.url).then(() => showToast(`Path copied (local paths cannot be opened in browser)`, 'info')); else window.open(link.url, '_blank'); }
    }

    function filterLinks(cat, btn) { currentLinkFilter = cat; document.querySelectorAll('#section-linker .tab-btn').forEach(b => b.classList.remove('active')); if (btn) btn.classList.add('active'); renderLinks(); }

    function renderLinks() {
      const grid = document.getElementById('links-grid');
      const filtered = currentLinkFilter === 'all' ? savedLinks : savedLinks.filter(l => l.cat === currentLinkFilter);
      if (!filtered.length) { grid.innerHTML = `<div class="card p-6 text-center col-span-full"><i class="fas fa-link text-3xl text-[var(--text-muted)] mb-3"></i><p class="text-[var(--text-muted)] text-[14px]">${currentLinkFilter === 'all' ? 'No links saved yet' : 'No links in this category'}</p></div>`; return; }
      grid.innerHTML = filtered.map(l => {
        const ci = linkCategories[l.cat] || linkCategories.other;
        const isPath = l.url.match(/^[A-Za-z]:\\/);
        const ai = l.action === 'copy' ? 'fa-copy' : l.action === 'navigate' ? 'fa-arrow-right' : 'fa-external-link-alt';
        const al = l.action === 'copy' ? 'Copy' : l.action === 'navigate' ? 'Open' : 'New Tab';
        return `<div class="card p-4 group cursor-pointer" onclick='handleLinkClick(JSON.parse(this.dataset.link))' data-link='${JSON.stringify(l).replace(/'/g, "&#39;")}'>
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:${ci.color}15;color:${ci.color}"><i class="fas ${ci.icon} text-xs"></i></div>
              <div><div class="font-semibold text-[13px] group-hover:text-[var(--accent-blue)] transition-colors">${escHtml(l.name)}</div><div class="text-[10px] font-medium px-1.5 py-0.5 rounded mt-0.5 rounded inline-block" style="background:${ci.color}12;color:${ci.color}">${ci.label}</div></div></div>
            <button onclick="event.stopPropagation();deleteLink('${l.id}')" class="w-7 h-7 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[var(--accent-red-bg)] text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-all"><i class="fas fa-trash-alt text-[10px]"></i></button>
          </div>
          <div class="text-[11px] text-[var(--text-muted)] font-mono truncate mb-2.5" title="${escHtml(l.url)}"><i class="fas ${isPath ? 'fa-folder-open' : 'fa-globe'} mr-1 text-[9px]"></i>${escHtml(l.url)}</div>
          <div class="flex items-center justify-between"><span class="text-[10px] text-[var(--text-muted)] flex items-center gap-1"><i class="fas ${ai} text-[8px]"></i>${al}</span>${isPath ? '<span class="text-[9px] text-[var(--accent-yellow)] bg-[var(--accent-yellow-bg)] px-1.5 py-0.5 rounded">PATH</span>' : '<span class="text-[9px] text-[var(--accent-green)] bg-[var(--accent-green-bg)] px-1.5 py-0.5 rounded">URL</span>'}</div>
        </div>`;
      }).join('');
    }

    // ===== API KEY MANAGEMENT =====
    function loadApiKeysFromFirebase() {
      if (!currentUser) return;
      db.collection('users').doc(currentUser.uid).collection('api_keys').orderBy('createdAt', 'desc').get().then(snap => {
        userApiKeys = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (!activeApiKey) {
          const active = userApiKeys.find(k => k.isActive);
          if (active) activeApiKey = active.key;
        }
        renderApiKeys();
        updateWebjsCodeKeys();
      }).catch(e => console.error('Load API keys error:', e));
    }

    function generateApiKey() {
      if (!currentUser) return;
      const key = genKey();
      const label = prompt('Label for this API key (e.g. Office Laptop, Home PC):');
      if (label === null) return;

      const batch = db.batch();
      userApiKeys.forEach(k => {
        if (k.isActive) {
          batch.update(db.collection('users').doc(currentUser.uid).collection('api_keys').doc(k.id), { isActive: false });
          k.isActive = false;
        }
      });

      const newRef = db.collection('users').doc(currentUser.uid).collection('api_keys').doc();
      batch.set(newRef, {
        key: key,
        label: label.trim() || 'Unnamed',
        isActive: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      batch.commit().then(() => {
        activeApiKey = key;
        showToast('New API key generated!', 'success');
        loadApiKeysFromFirebase();
      }).catch(e => showToast('Failed to generate key: ' + e.message, 'error'));
    }

    function setActiveApiKey(id) {
      if (!currentUser) return;
      const keyDoc = userApiKeys.find(k => k.id === id);
      if (!keyDoc) return;

      const batch = db.batch();
      userApiKeys.forEach(k => {
        batch.update(db.collection('users').doc(currentUser.uid).collection('api_keys').doc(k.id), { isActive: false });
        k.isActive = false;
      });
      batch.update(db.collection('users').doc(currentUser.uid).collection('api_keys').doc(id), { isActive: true });
      keyDoc.isActive = true;
      activeApiKey = keyDoc.key;

      batch.commit().then(() => {
        showToast('API key activated!', 'success');
        renderApiKeys();
        updateWebjsCodeKeys();
      }).catch(e => showToast('Failed to activate key', 'error'));
    }

    function deleteApiKey(id) {
      if (!currentUser) return;
      const keyDoc = userApiKeys.find(k => k.id === id);
      db.collection('users').doc(currentUser.uid).collection('api_keys').doc(id).delete().then(() => {
        if (keyDoc && keyDoc.key === activeApiKey) {
          activeApiKey = null;
          const other = userApiKeys.find(k => k.id !== id);
          if (other) { setActiveApiKey(other.id); }
        }
        userApiKeys = userApiKeys.filter(k => k.id !== id);
        renderApiKeys();
        updateWebjsCodeKeys();
        showToast('API key deleted', 'info');
      }).catch(e => showToast('Failed to delete', 'error'));
    }

    function copyApiKey(key) {
      navigator.clipboard.writeText(key).then(() => showToast('API key copied to clipboard!', 'success'));
    }

    function updateWebjsCodeKeys() {
      const el = document.getElementById('webjs-code-keys');
      if (!el) return;
      if (userApiKeys.length > 0) {
        const keysStr = userApiKeys.map(k => `  '${k.key}'${k.isActive ? ' // <-- ACTIVE' : ''}`).join(',\n');
        el.innerHTML = escHtml(keysStr);
      } else {
        el.innerHTML = escHtml('/* generate API key from the API Keys page */');
      }
    }

    function renderApiKeys() {
      const list = document.getElementById('apikeys-list');
      if (!userApiKeys.length) {
        list.innerHTML = '<div class="card p-8 text-center"><i class="fas fa-key text-3xl text-[var(--text-muted)] mb-3"></i><p class="text-[var(--text-muted)] text-[14px]">No API keys yet</p><p class="text-[var(--text-muted)] text-[12px] mt-1">Click "Generate New Key" to create one</p></div>';
        return;
      }
      list.innerHTML = userApiKeys.map(k => {
        const isActive = k.isActive;
        const created = k.createdAt ? new Date(k.createdAt.seconds * 1000).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';
        return `<div class="card p-4 ${isActive ? 'glow-green' : ''}">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:${isActive ? 'rgba(129,201,149,0.12)' : 'rgba(95,99,104,0.1)'};color:${isActive ? 'var(--accent-green)' : 'var(--text-muted)'}"><i class="fas fa-key text-xs"></i></div>
              <div>
                <div class="font-semibold text-[13px] flex items-center gap-2">${escHtml(k.label)} ${isActive ? '<span class="key-badge bg-[var(--accent-green-bg)] text-[var(--accent-green)] border border-[rgba(129,201,149,0.2)]">ACTIVE</span>' : '<span class="key-badge" style="background:rgba(95,99,104,0.1);color:var(--text-muted);border:1px solid rgba(95,99,104,0.15)">INACTIVE</span>'}</div>
                <div class="text-[10px] text-[var(--text-muted)]">${created}</div>
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              ${!isActive ? `<button onclick="setActiveApiKey('${k.id}')" class="btn btn-green btn-xs"><i class="fas fa-check text-[8px]"></i>Activate</button>` : ''}
              <button onclick="copyApiKey('${k.key}')" class="btn btn-ghost btn-xs"><i class="far fa-copy text-[9px]"></i></button>
              <button onclick="deleteApiKey('${k.id}')" class="btn btn-ghost btn-xs hover:!text-[var(--accent-red)]"><i class="fas fa-trash-alt text-[9px]"></i></button>
            </div>
          </div>
          <div class="api-key-display text-[12px]">${escHtml(k.key)}</div>
        </div>`;
      }).join('');
      updateWebjsCodeKeys();
    }

    // ===== PUBLIC CHAT (FIREBASE) =====
    function updateChatUI() {
      const main = document.getElementById('chat-main');
      if (currentUser) { main.style.display = ''; }
      else { main.style.display = 'none'; }
    }

    function setupChatListener() {
      if (chatListener) chatListener();
      chatListener = db.collection('public_messages').orderBy('timestamp', 'desc').limit(100).onSnapshot(snap => {
        const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() })).reverse();
        renderChatMessages(msgs);
        const chatPanel = document.getElementById('section-chat');
        if (!chatPanel.classList.contains('active') && msgs.length > 0) {
          chatUnread = true;
          document.getElementById('chat-unread-dot').style.display = '';
        }
      }, err => { console.error('Chat listener error:', err); });
    }

    function renderChatMessages(msgs) {
      const el = document.getElementById('chat-messages');
      if (!msgs.length) { el.innerHTML = '<div class="text-center text-[12px] text-[var(--text-muted)] py-8">No messages yet. Be the first!</div>'; return; }
      el.innerHTML = msgs.map(m => {
        const isSelf = currentUser && m.uid === currentUser.uid;
        const initial = (m.displayName || '?')[0].toUpperCase();
        const colors = ['#8ab4f8', '#81c995', '#f28b82', '#fdd663', '#c58af9', '#78d9ec', '#f4a261'];
        const color = colors[(m.uid || '').charCodeAt(0) % colors.length] || colors[0];
        const time = m.timestamp ? new Date(m.timestamp.seconds * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '';
        return `<div class="flex gap-2.5 ${isSelf ? 'flex-row-reverse' : ''}">
          <div class="user-avatar" style="background:${color}20;color:${color};border:1px solid ${color}40">${initial}</div>
          <div class="${isSelf ? 'text-right' : ''}" style="flex:1;min-width:0">
            <div class="flex items-center gap-2 mb-1 ${isSelf ? 'justify-end' : ''}">
              <span class="text-[12px] font-semibold" style="color:${color}">${escHtml(m.displayName || 'Anonymous')}</span>
              <span class="text-[10px] text-[var(--text-muted)]">${time}</span>
            </div>
            <div class="msg-bubble ${isSelf ? 'msg-self' : 'msg-other'}">${escHtml(m.text)}</div>
          </div>
        </div>`;
      }).join('');
      el.scrollTop = el.scrollHeight;
    }

    function sendChat() {
      if (!currentUser) { showToast('Please sign in first!', 'warning'); return; }
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      db.collection('public_messages').add({
        uid: currentUser.uid,
        displayName: currentUser.displayName || currentUser.email,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(e => showToast('Failed to send: ' + e.message, 'error'));
    }
    function closeModal() { document.getElementById('modal-root').innerHTML = ''; }
    setTimeout(() => {
      apiFetch('http://localhost:8080/api/start-apache', { method: 'HEAD', mode: 'cors' }).then(() => setApiConnected(true)).catch(() => setApiConnected(false));
    }, 1200);