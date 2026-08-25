let mActiveTab = 'home';
let mSheetOpen = false;

function mobileNav(tab) {
    if (tab === mActiveTab && mSheetOpen && tab !== 'home') {
        closeMSheet();
        setMTab('home');
        return;
    }
    setMTab(tab);
    switch (tab) {
        case 'home':
            closeMSheet();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        case 'server':
            openMSheet('server');
            break;
        case 'menu':
            openMSheet('menu');
            break;
    }
}

function setMTab(tab) {
    mActiveTab = tab;
    document.querySelectorAll('.m-nav-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.mtab === tab)
    );
}

function openMSheet(name) {
    closeMSheet();
    const ov = document.getElementById('m-overlay');
    const sh = document.getElementById('m-sheet-' + name);
    if (ov && sh) {
        ov.classList.add('open');
        sh.classList.add('open');
        mSheetOpen = true;
        document.body.style.overflow = 'hidden';
    }
}

function closeMSheet() {
    const ov = document.getElementById('m-overlay');
    document.querySelectorAll('.m-sheet').forEach(s => s.classList.remove('open'));
    if (ov) ov.classList.remove('open');
    mSheetOpen = false;
    document.body.style.overflow = '';
    setMTab('home');
}

const _ham = document.querySelector('.lg\\:hidden[onclick]');
if (_ham && _ham.getAttribute('onclick')?.includes('mobile-toc')) {
    _ham.setAttribute('onclick', "mobileNav('menu')");
}

function openModal(id) {
    closeMSheet();
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
}

function openModal2(id) {
    closeMSheet();
    const el = document.getElementById(id) || document.getElementById('licenseModal');
    if (el) el.classList.remove('hidden');
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}
