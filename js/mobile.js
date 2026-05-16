
let mActiveTab = 'home';
let mSheetOpen = false;

function mobileNav(tab) {
    if (tab === mActiveTab && mSheetOpen && tab !== 'home' && tab !== 'issues') {
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
        case 'issues':
            closeMSheet();
            document.getElementById('btn-open-drawer').click();
            break;
        case 'account':
            openMSheet('account');
            syncMAccount();
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
function syncMAccount() {
    const prof = document.getElementById('user-profile');
    const logged = prof && !prof.classList.contains('hidden');
    const guest = document.getElementById('m-acc-guest');
    const user = document.getElementById('m-acc-user');
    if (logged) {
        guest.style.display = 'none';
        user.style.display = 'block';
        document.getElementById('m-av').src = document.getElementById('user-avatar').src;
        document.getElementById('m-nm').textContent = document.getElementById('user-name').textContent;
    } else {
        guest.style.display = 'block';
        user.style.display = 'none';
    }
}
syncMAccount();
const _ham = document.querySelector('.lg\\:hidden[onclick]');
if (_ham && _ham.getAttribute('onclick')?.includes('mobile-toc')) {
    _ham.setAttribute('onclick', "mobileNav('menu')");
}
const _pcObs = new MutationObserver(() => {
    const cards = document.querySelectorAll('#posts-container > div:not(.col-span-full)');
    updateMBadge(cards.length);
});
const _pc = document.getElementById('posts-container');
if (_pc) _pcObs.observe(_pc, { childList: true });