// --- Simple Admin Auth ---
const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'admin123';

const loginForm = document.getElementById('adminLoginForm');
const loginInput = document.getElementById('adminLogin');
const passInput = document.getElementById('adminPassword');
const errorBlock = document.getElementById('adminError');
const adminPanel = document.getElementById('adminPanel');
const adminTableBody = document.getElementById('adminTableBody');
const logoutBtn = document.getElementById('adminLogout');

function showPanel() {
    loginForm.style.display = 'none';
    adminPanel.style.display = 'block';
    renderBookings();
}
function hidePanel() {
    loginForm.style.display = 'flex';
    adminPanel.style.display = 'none';
    errorBlock.style.display = 'none';
    loginForm.reset();
}
function renderBookings() {
    const bookings = JSON.parse(localStorage.getItem('lumine_bookings') || '[]');
    adminTableBody.innerHTML = '';
    if (!bookings.length) {
        adminTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#888;">Нет заявок</td></tr>';
        return;
    }
    bookings.forEach(b => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${b.name}</td><td>${b.phone}</td><td>${b.date}</td><td>${b.time}</td>`;
        adminTableBody.appendChild(tr);
    });
}
loginForm.onsubmit = function(e) {
    e.preventDefault();
    if (loginInput.value === ADMIN_LOGIN && passInput.value === ADMIN_PASSWORD) {
        sessionStorage.setItem('lumine_admin', '1');
        showPanel();
    } else {
        errorBlock.style.display = 'block';
    }
};
logoutBtn.onclick = function() {
    sessionStorage.removeItem('lumine_admin');
    hidePanel();
};
// Автовход если сессия есть
if (sessionStorage.getItem('lumine_admin') === '1') {
    showPanel();
} 