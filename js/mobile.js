
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
function syncMServer() {
    const ai = document.getElementById('icon-apache');
    const mi = document.getElementById('icon-mysql');
    const aOn = ai && ai.classList.contains('text-green-500');
    const mOn = mi && mi.classList.contains('text-green-500');
    const aSt = document.getElementById('m-st-apache');
    const aTb = document.getElementById('m-tb-apache');
    if (aOn) {
        aSt.className = 'm-srv-st on';
        aSt.innerHTML = '<i class="fas fa-circle" style="font-size:6px"></i> Aktif';
        aTb.className = 'm-srv-tb no'; aTb.textContent = 'Stop';
    } else {
        aSt.className = 'm-srv-st off';
        aSt.innerHTML = '<i class="fas fa-circle" style="font-size:6px"></i> Tidak Aktif';
        aTb.className = 'm-srv-tb go'; aTb.textContent = 'Start';
    }
    const mSt = document.getElementById('m-st-mysql');
    const mTb = document.getElementById('m-tb-mysql');
    if (mOn) {
        mSt.className = 'm-srv-st on';
        mSt.innerHTML = '<i class="fas fa-circle" style="font-size:6px"></i> Aktif';
        mTb.className = 'm-srv-tb no'; mTb.textContent = 'Stop';
    } else {
        mSt.className = 'm-srv-st off';
        mSt.innerHTML = '<i class="fas fa-circle" style="font-size:6px"></i> Tidak Aktif';
        mTb.className = 'm-srv-tb go'; mTb.textContent = 'Start';
    }
    const dot = document.getElementById('m-dot-srv');
    if (dot) dot.classList.toggle('on', aOn || mOn);
}
const mObs = new MutationObserver(syncMServer);
const _ai = document.getElementById('icon-apache');
const _mi = document.getElementById('icon-mysql');
if (_ai) mObs.observe(_ai, { attributes: true, attributeFilter: ['class'] });
if (_mi) mObs.observe(_mi, { attributes: true, attributeFilter: ['class'] });
const _prObs = new MutationObserver(syncMAccount);
const _pr = document.getElementById('user-profile');
if (_pr) _prObs.observe(_pr, { attributes: true, attributeFilter: ['class'] });
const _drObs = new MutationObserver(() => {
    const dr = document.getElementById('issue-drawer');
    if (dr && !dr.classList.contains('translate-x-full')) closeMSheet();
});
const _dr = document.getElementById('issue-drawer');
if (_dr) _drObs.observe(_dr, { attributes: true, attributeFilter: ['class'] });
function updateMBadge(count) {
    const b = document.getElementById('m-badge-issue');
    if (b) { b.textContent = count; b.style.display = count > 0 ? 'flex' : 'none'; }
}
syncMServer();
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