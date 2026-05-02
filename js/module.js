    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
    import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
    import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, increment, arrayUnion, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyDN947aMLtXP-bjAvvAwnkpQqJpdDmdnOs",
      authDomain: "bangroy.firebaseapp.com",
      projectId: "bangroy",
      storageBucket: "bangroy.firebasestorage.app",
      messagingSenderId: "31976139879",
      appId: "1:31976139879:web:1295cd563201c5f52238c2",
      measurementId: "G-XM5VMXN9ZD"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    let currentUser = null;
    let allPostsData = [];
    let currentDetailId = null;

    /* =========================================
       XAMPP LOCAL CONTROL LOGIC (INSTAN & OPTIMISTIC)
       ========================================= */
    const btnApache = document.getElementById('ctrl-apache');
    const iconApache = document.getElementById('icon-apache');
    let apacheRunning = false;

    const btnMysql = document.getElementById('ctrl-mysql');
    const iconMysql = document.getElementById('icon-mysql');
    let mysqlRunning = false;

    const btnPma = document.getElementById('ctrl-pma');
    const LOCAL_API_URL = 'http://localhost:8080/api';

    async function toggleLocalService(service) {
      const isApache = service === 'apache';
      const icon = isApache ? iconApache : iconMysql;
      const btn = isApache ? btnApache : btnMysql;
      const isCurrentlyRunning = isApache ? apacheRunning : mysqlRunning;

      // 1. Visual Feedback Instan
      icon.className = 'fas fa-spinner fa-spin text-blue-500';

      const action = isCurrentlyRunning
        ? (isApache ? 'stop-apache' : 'stop-mysql')
        : (isApache ? 'start-apache' : 'start-mysql');

      try {
        // 2. Kirim perintah ke Backend
        const response = await fetch(`${LOCAL_API_URL}/${action}`);
        const data = await response.json();

        if (data.success) {
          // 3. Update Status Secara Instan
          if (isApache) {
            apacheRunning = !apacheRunning;
            updateButtonUI(btn, icon, apacheRunning);
          } else {
            mysqlRunning = !mysqlRunning;
            updateButtonUI(btn, icon, mysqlRunning);
          }
        }
      } catch (error) {
        console.error("Gagal koneksi ke local server");
        showToast("Gagal! Pastikan 'node meta-backend.js' sudah berjalan di terminal VSCode.");
        // Kembalikan UI ke status lama jika gagal
        updateButtonUI(btn, icon, isCurrentlyRunning);
      }
    }

    // Fungsi serbaguna untuk update tampilan tombol
    function updateButtonUI(btn, icon, running) {
      if (running) {
        icon.className = 'fas fa-power-off text-green-500';
        btn.classList.add('bg-green-50', 'text-green-800', 'border-green-200');
      } else {
        icon.className = 'fas fa-power-off text-red-500';
        btn.classList.remove('bg-green-50', 'text-green-800', 'border-green-200');
      }
    }

    // Event Listeners
    btnApache.addEventListener('click', () => toggleLocalService('apache'));
    btnMysql.addEventListener('click', () => toggleLocalService('mysql'));
    btnPma.addEventListener('click', () => {
      window.open('http://localhost/phpmyadmin', '_blank');
    });

    /* =========================================
       DRAWER & AUTH LOGIC (EKSISTING)
       ========================================= */
    const btnOpenDrawer = document.getElementById('btn-open-drawer');
    const btnCloseDrawer = document.getElementById('btn-close-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const issueDrawer = document.getElementById('issue-drawer');
    const drawerLoginOverlay = document.getElementById('drawer-login-overlay');

    const btnLogin = document.getElementById('btn-login');
    const btnLoginDrawer = document.getElementById('btn-login-drawer');
    const btnLogout = document.getElementById('btn-logout');
    const userProfile = document.getElementById('user-profile');

    const viewGrid = document.getElementById('view-grid');
    const viewForm = document.getElementById('view-form');
    const viewDetail = document.getElementById('view-detail');
    const tabAll = document.getElementById('tab-all');
    const tabMine = document.getElementById('tab-mine');
    const btnNewPost = document.getElementById('btn-new-post');
    const btnBackDetail = document.getElementById('btn-back-detail');
    const btnCancelForm = document.getElementById('btn-cancel-form');

    const openDrawer = () => {
      drawerOverlay.classList.remove('hidden');
      setTimeout(() => issueDrawer.classList.remove('translate-x-full'), 10);
      document.body.style.overflow = 'hidden';
    };
    const closeDrawer = () => {
      issueDrawer.classList.add('translate-x-full');
      setTimeout(() => { drawerOverlay.classList.add('hidden'); document.body.style.overflow = 'auto'; }, 300);
    };

    btnOpenDrawer.addEventListener('click', openDrawer);
    btnCloseDrawer.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    const doLogin = () => signInWithPopup(auth, new GoogleAuthProvider()).catch(err => showToast("Login gagal: " + err.message));
    btnLogin.addEventListener('click', doLogin);
    btnLoginDrawer.addEventListener('click', doLogin);
    btnLogout.addEventListener('click', () => signOut(auth));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser = user;
        btnLogin.classList.add('hidden');
        userProfile.classList.remove('hidden');
        document.getElementById('user-name').textContent = user.displayName;
        document.getElementById('user-avatar').src = user.photoURL;
        drawerLoginOverlay.classList.add('hidden');
        renderGrid();
      } else {
        currentUser = null;
        btnLogin.classList.remove('hidden');
        userProfile.classList.add('hidden');
        drawerLoginOverlay.classList.remove('hidden');
      }
    });

    /* =========================================
       SISTEM RENDER MEDIA (YOUTUBE, IG, FB, TIKTOK)
       ========================================= */
    function renderMediaLink(link) {
      if (!link) return '';

      // Deteksi YouTube
      if (link.match(/youtube\.com|youtu\.be/i)) {
        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const match = link.match(ytRegex);
        if (match) return `<iframe class="w-full aspect-video rounded mt-3 border shadow-sm" src="https://www.youtube.com/embed/${match[1]}" frameborder="0" allowfullscreen></iframe>`;
      }

      // Deteksi Instagram (Post/Reel)
      if (link.match(/instagram\.com\/(p|reel)\//i)) {
        const cleanLink = link.split('?')[0]; // Hapus parameter query agar aman
        return `<iframe class="w-full rounded mt-3 border shadow-sm max-w-sm mx-auto" height="480" src="${cleanLink}embed" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
      }

      // Deteksi TikTok
      if (link.match(/tiktok\.com/i)) {
        const videoIdMatch = link.match(/video\/(\d+)/);
        if (videoIdMatch) {
          return `<iframe class="w-full rounded mt-3 border shadow-sm max-w-sm mx-auto aspect-[9/16]" src="https://www.tiktok.com/embed/v2/${videoIdMatch[1]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
      }

      // Deteksi Facebook Video
      if (link.match(/facebook\.com.*(video|watch)/i)) {
        return `<iframe class="w-full aspect-video rounded mt-3 border shadow-sm" src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(link)}&show_text=false" frameborder="0" scrolling="no" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`;
      }

      // Deteksi Gambar Biasa
      if (link.match(/\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i)) {
        return `<img src="${link}" class="w-full rounded mt-3 object-cover max-h-60 border shadow-sm" alt="Media Isu">`;
      }

      return `<a href="${link}" target="_blank" class="block mt-3 text-blue-500 hover:underline text-sm"><i class="fas fa-external-link-alt"></i> Buka Tautan Media</a>`;
    }

    function detectLinksInText(text) {
      const escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return escaped.replace(urlRegex, '<a href="$1" target="_blank" class="text-blue-500 hover:underline break-all"><i class="fas fa-link text-xs"></i> $1</a>').replace(/\n/g, '<br>');
    }

    /* =========================================
       VIEW MANAGER & FORM LOGIC
       ========================================= */
    function showView(view) {
      viewGrid.classList.add('hidden');
      viewForm.classList.add('hidden');
      viewDetail.classList.add('hidden');

      tabAll.classList.replace('text-blue-600', 'text-gray-500');
      tabAll.classList.replace('border-blue-600', 'border-transparent');
      tabAll.classList.remove('font-bold', 'border-b-2');

      tabMine.classList.replace('text-blue-600', 'text-gray-500');
      tabMine.classList.replace('border-blue-600', 'border-transparent');
      tabMine.classList.remove('font-bold', 'border-b-2');

      if (view === 'grid-all' || view === 'grid-mine') {
        viewGrid.classList.remove('hidden');
        if (view === 'grid-all') {
          tabAll.classList.add('text-blue-600', 'font-bold', 'border-b-2', 'border-blue-600');
          tabAll.classList.remove('text-gray-500', 'border-transparent');
          renderGrid(false);
        } else {
          tabMine.classList.add('text-blue-600', 'font-bold', 'border-b-2', 'border-blue-600');
          tabMine.classList.remove('text-gray-500', 'border-transparent');
          renderGrid(true);
        }
      } else if (view === 'form') {
        viewForm.classList.remove('hidden');
      } else if (view === 'detail') {
        viewDetail.classList.remove('hidden');
      }
    }

    tabAll.addEventListener('click', () => showView('grid-all'));
    tabMine.addEventListener('click', () => showView('grid-mine'));
    btnBackDetail.addEventListener('click', () => showView('grid-all'));
    btnCancelForm.addEventListener('click', () => {
      document.getElementById('form-post-id').value = '';
      document.getElementById('input-title').value = '';
      document.getElementById('input-media').value = '';
      document.getElementById('input-body').value = '';
      showView('grid-all');
    });

    btnNewPost.addEventListener('click', () => {
      document.getElementById('form-title').innerText = "Buat Laporan / Diskusi Baru";
      document.getElementById('btn-submit-form').innerText = "Upload Postingan";
      document.getElementById('form-post-id').value = '';
      document.getElementById('input-title').value = '';
      document.getElementById('input-media').value = '';
      document.getElementById('input-body').value = '';
      showView('form');
    });

    document.getElementById('btn-submit-form').addEventListener('click', async () => {
      const postId = document.getElementById('form-post-id').value;
      const title = document.getElementById('input-title').value;
      const media = document.getElementById('input-media').value;
      const body = document.getElementById('input-body').value;

      if (!title || !body) return showToast("Judul dan Deskripsi harus diisi.");

      const payload = {
        title: title,
        mediaLink: media || null,
        body: body,
      };

      try {
        if (postId) {
          await updateDoc(doc(db, "posts", postId), payload);
          showToast("Isu berhasil diperbarui!");
        } else {
          payload.author = currentUser.displayName;
          payload.authorPic = currentUser.photoURL;
          payload.authorId = currentUser.uid;
          payload.likes = 0;
          payload.dislikes = 0;
          payload.comments = [];
          payload.timestamp = serverTimestamp();
          await addDoc(collection(db, "posts"), payload);
          showToast("Isu berhasil diupload!");
        }
        showView('grid-mine');
      } catch (e) { showToast("Error: " + e.message); }
    });

    onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
      allPostsData = [];
      snapshot.forEach(docSnap => allPostsData.push({ id: docSnap.id, ...docSnap.data() }));

      if (!viewGrid.classList.contains('hidden')) {
        renderGrid(tabMine.classList.contains('border-blue-600'));
      }
      if (!viewDetail.classList.contains('hidden') && currentDetailId) {
        renderDetailView(currentDetailId);
      }
    });

    function renderGrid(onlyMine = false) {
      const container = document.getElementById('posts-container');
      container.innerHTML = '';

      let posts = allPostsData;
      if (onlyMine && currentUser) posts = posts.filter(p => p.authorId === currentUser.uid);

      if (posts.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">Belum ada data isu.</div>`;
        return;
      }

      posts.forEach(post => {
        const time = post.timestamp ? new Date(post.timestamp.toDate()).toLocaleDateString('id-ID') : '';
        const bodySnippet = post.body.substring(0, 80) + (post.body.length > 80 ? '...' : '');

        let actionsHtml = '';
        if (currentUser && currentUser.uid === post.authorId) {
          actionsHtml = `
            <div class="flex gap-2 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
              <button onclick="window.editPost('${post.id}')" class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex justify-center items-center hover:bg-blue-200" title="Edit"><i class="fas fa-pen text-xs"></i></button>
              <button onclick="window.deletePost('${post.id}')" class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex justify-center items-center hover:bg-red-200" title="Hapus"><i class="fas fa-trash text-xs"></i></button>
            </div>
          `;
        }

        const el = document.createElement('div');
        el.className = "bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition group relative flex flex-col h-full";
        el.innerHTML = `
          ${actionsHtml}
          <div onclick="window.openPostDetail('${post.id}')" class="flex-1">
            <h4 class="font-bold text-gray-800 leading-tight pr-16">${post.title}</h4>
            <p class="text-xs text-gray-400 mt-1 mb-2">${post.author} &bull; ${time}</p>
            <p class="text-sm text-gray-600 line-clamp-3">${bodySnippet}</p>
          </div>
          <div class="flex justify-between items-center mt-4 border-t border-gray-100 pt-3 text-xs text-gray-500 font-medium">
            <div class="flex gap-3">
              <span class="text-green-600"><i class="fas fa-thumbs-up"></i> ${post.likes}</span>
              <span class="text-red-500"><i class="fas fa-thumbs-down"></i> ${post.dislikes}</span>
            </div>
            <span><i class="fas fa-comment"></i> ${post.comments.length}</span>
          </div>
        `;
        container.appendChild(el);
      });
    }

    window.openPostDetail = (id) => {
      currentDetailId = id;
      renderDetailView(id);
      showView('detail');
    };

    function renderDetailView(id) {
      const post = allPostsData.find(p => p.id === id);
      if (!post) return;

      const area = document.getElementById('detail-content-area');
      const time = post.timestamp ? new Date(post.timestamp.toDate()).toLocaleString('id-ID') : '';
      const content = detectLinksInText(post.body);
      const media = renderMediaLink(post.mediaLink);

      area.innerHTML = `
        <div class="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
          <img src="${post.authorPic}" class="w-10 h-10 rounded-full border">
          <div>
            <h3 class="font-bold text-lg text-gray-800 leading-tight">${post.title}</h3>
            <p class="text-xs text-gray-500">${post.author} &bull; ${time}</p>
          </div>
        </div>
        <div class="text-sm text-gray-700 leading-relaxed">${content}</div>
        ${media}
        <div class="flex gap-4 mt-6">
          <button onclick="window.votePost('${id}', 'likes')" class="flex-1 py-2 border rounded hover:bg-gray-50 text-green-600 flex items-center justify-center gap-2 font-bold transition"><i class="fas fa-thumbs-up"></i> Dukung (${post.likes})</button>
          <button onclick="window.votePost('${id}', 'dislikes')" class="flex-1 py-2 border rounded hover:bg-gray-50 text-red-500 flex items-center justify-center gap-2 font-bold transition"><i class="fas fa-thumbs-down"></i> (${post.dislikes})</button>
        </div>
      `;

      const commentsDiv = document.getElementById('comments-container');
      commentsDiv.innerHTML = post.comments.length === 0 ? '<p class="text-xs text-gray-400 italic">Belum ada komentar.</p>' : '';
      post.comments.forEach(c => {
        commentsDiv.innerHTML += `
          <div class="bg-gray-50 p-3 rounded border border-gray-100">
            <div class="text-[11px] font-bold text-gray-500 mb-1">${c.name}</div>
            <div class="text-sm text-gray-800">${c.text}</div>
          </div>
        `;
      });

      const btnSend = document.getElementById('btn-send-comment');
      const clone = btnSend.cloneNode(true);
      btnSend.parentNode.replaceChild(clone, btnSend);
      clone.addEventListener('click', async () => {
        const input = document.getElementById('input-comment');
        if (!input.value.trim()) return;
        await updateDoc(doc(db, "posts", id), {
          comments: arrayUnion({ name: currentUser.displayName, text: input.value, uid: currentUser.uid })
        });
        input.value = '';
      });
    }

    window.editPost = (id) => {
      const post = allPostsData.find(p => p.id === id);
      document.getElementById('form-title').innerText = "Edit Isu";
      document.getElementById('btn-submit-form').innerText = "Simpan Perubahan";
      document.getElementById('form-post-id').value = id;
      document.getElementById('input-title').value = post.title;
      document.getElementById('input-media').value = post.mediaLink || '';
      document.getElementById('input-body').value = post.body;
      showView('form');
    };

    window.deletePost = async (id) => {
      if (confirm) {
        await deleteDoc(doc(db, "posts", id));
        showToast("Terhapus!");
      }
    };

    window.votePost = async (id, type) => {
      if (!currentUser) return showToast("Harap login dulu!");
      await updateDoc(doc(db, "posts", id), { [type]: increment(1) });
    };
