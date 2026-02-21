// Fleet Flow - Auth, Navigation & Modals
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  initNavigation();
  initModalClose();
});

function checkAuth() {
  const user = localStorage.getItem('fleetflow_user');
  const authScreen = document.getElementById('auth-screen');
  const appWrapper = document.getElementById('app-wrapper');

  if (user) {
    const u = JSON.parse(user);
    document.getElementById('user-info').textContent = `${u.email} (${u.role})`;
    authScreen.classList.add('hidden');
    appWrapper.classList.remove('hidden');
  } else {
    authScreen.classList.remove('hidden');
    appWrapper.classList.add('hidden');
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const role = document.getElementById('login-role').value;
  const roleLabel = document.getElementById('login-role').selectedOptions[0].text;

  localStorage.setItem('fleetflow_user', JSON.stringify({ email, role, roleLabel }));
  document.getElementById('user-info').textContent = `${email} (${roleLabel})`;
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app-wrapper').classList.remove('hidden');
}

function handleRegister(e) {
  e.preventDefault();
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;

  if (password !== confirm) {
    alert('Passwords do not match.');
    return;
  }
  if (password.length < 8) {
    alert('Password must be at least 8 characters.');
    return;
  }

  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const role = document.getElementById('reg-role').value;
  const roleLabel = document.getElementById('reg-role').selectedOptions[0].text;

  localStorage.setItem('fleetflow_user', JSON.stringify({ name, email, role, roleLabel }));
  document.getElementById('user-info').textContent = `${email} (${roleLabel})`;
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app-wrapper').classList.remove('hidden');
}

function showLogin(e) {
  e.preventDefault();
  document.getElementById('login-form').classList.add('active');
  document.getElementById('register-form').classList.remove('active');
}

function showRegister(e) {
  e.preventDefault();
  document.getElementById('register-form').classList.add('active');
  document.getElementById('login-form').classList.remove('active');
}

function handleLogout() {
  localStorage.removeItem('fleetflow_user');
  document.getElementById('auth-screen').classList.remove('hidden');
  document.getElementById('app-wrapper').classList.add('hidden');
  document.getElementById('login-form').classList.add('active');
  document.getElementById('register-form').classList.remove('active');
}

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = item.dataset.page;

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      pages.forEach(p => {
        p.classList.remove('active');
        if (p.id === `page-${pageId}`) p.classList.add('active');
      });
    });
  });
}

function initModalClose() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal.id);
    });
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}
