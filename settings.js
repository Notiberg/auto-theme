document.addEventListener('DOMContentLoaded', function() {
    // User data storage
    let userData = {
        firstName: 'Ярослав',
        lastName: 'Панарин',
        email: 'PAN.buisnes@yandex.ru',
        role: 'Клиент',
        avatar: 'pan.jpeg',
        isAdmin: false
    };

    // Initialize page
    function initializePage() {
        updateUserDisplay();
        initializeEventListeners();
    }

    // Update user display
    function updateUserDisplay() {
        document.getElementById('userName').textContent = `${userData.firstName} ${userData.lastName}`;
        document.getElementById('userEmail').textContent = userData.email;
        document.getElementById('userRole').textContent = userData.role;
        document.getElementById('userAvatarImg').src = userData.avatar;
    }

    // Initialize event listeners
    function initializeEventListeners() {
        // Back button
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                window.location.href = 'profile.html';
            });
        }

        // Settings items
        const changeNameBtn = document.getElementById('changeNameBtn');
        const changeAvatarBtn = document.getElementById('changeAvatarBtn');
        const changePasswordBtn = document.getElementById('changePasswordBtn');
        const avatarEditBtn = document.getElementById('avatarEditBtn');

        if (changeNameBtn) {
            changeNameBtn.addEventListener('click', () => openNameModal());
        }

        if (changeAvatarBtn || avatarEditBtn) {
            if (changeAvatarBtn) changeAvatarBtn.addEventListener('click', () => openAvatarModal());
            if (avatarEditBtn) avatarEditBtn.addEventListener('click', () => openAvatarModal());
        }

        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', () => openPasswordModal());
        }

        // Additional settings (placeholder functionality)
        const notificationsBtn = document.getElementById('notificationsBtn');
        const privacyBtn = document.getElementById('privacyBtn');
        const helpBtn = document.getElementById('helpBtn');
        const switchAdminBtn = document.getElementById('switchAdminBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', () => {
                alert('Настройки уведомлений (функционал будет добавлен позже)');
            });
        }

        if (privacyBtn) {
            privacyBtn.addEventListener('click', () => {
                alert('Настройки конфиденциальности (функционал будет добавлен позже)');
            });
        }

        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                alert('Помощь и поддержка (функционал будет добавлен позже)');
            });
        }

        if (switchAdminBtn) {
            switchAdminBtn.addEventListener('click', () => {
                openAdminLoginModal();
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Вы уверены, что хотите выйти из аккаунта?')) {
                    // Reset to client role
                    userData.role = 'Клиент';
                    userData.isAdmin = false;
                    
                    // Clear admin session
                    sessionStorage.removeItem('adminLoginSuccess');
                    
                    updateUserDisplay();
                    saveUserData();
                    
                    showNotification('Вы вышли из аккаунта', 'info');
                }
            });
        }

        // Modal event listeners
        initializeModalListeners();
    }

    // Modal functionality
    function initializeModalListeners() {
        // Name modal
        const nameModal = document.getElementById('nameModal');
        const closeNameModal = document.getElementById('closeNameModal');
        const cancelNameBtn = document.getElementById('cancelNameBtn');
        const nameForm = document.getElementById('nameForm');

        if (closeNameModal) {
            closeNameModal.addEventListener('click', () => closeModal('nameModal'));
        }

        if (cancelNameBtn) {
            cancelNameBtn.addEventListener('click', () => closeModal('nameModal'));
        }

        if (nameForm) {
            nameForm.addEventListener('submit', handleNameSubmit);
        }

        // Avatar modal
        const avatarModal = document.getElementById('avatarModal');
        const closeAvatarModal = document.getElementById('closeAvatarModal');
        const cancelAvatarBtn = document.getElementById('cancelAvatarBtn');
        const selectAvatarBtn = document.getElementById('selectAvatarBtn');
        const avatarFileInput = document.getElementById('avatarFileInput');
        const saveAvatarBtn = document.getElementById('saveAvatarBtn');

        if (closeAvatarModal) {
            closeAvatarModal.addEventListener('click', () => closeModal('avatarModal'));
        }

        if (cancelAvatarBtn) {
            cancelAvatarBtn.addEventListener('click', () => closeModal('avatarModal'));
        }

        if (selectAvatarBtn) {
            selectAvatarBtn.addEventListener('click', () => {
                avatarFileInput.click();
            });
        }

        if (avatarFileInput) {
            avatarFileInput.addEventListener('change', handleAvatarSelect);
        }

        if (saveAvatarBtn) {
            saveAvatarBtn.addEventListener('click', handleAvatarSave);
        }

        // Password modal
        const passwordModal = document.getElementById('passwordModal');
        const closePasswordModal = document.getElementById('closePasswordModal');
        const cancelPasswordBtn = document.getElementById('cancelPasswordBtn');
        const passwordForm = document.getElementById('passwordForm');
        const newPasswordInput = document.getElementById('newPasswordInput');

        if (closePasswordModal) {
            closePasswordModal.addEventListener('click', () => closeModal('passwordModal'));
        }

        if (cancelPasswordBtn) {
            cancelPasswordBtn.addEventListener('click', () => closeModal('passwordModal'));
        }

        if (passwordForm) {
            passwordForm.addEventListener('submit', handlePasswordSubmit);
        }

        if (newPasswordInput) {
            newPasswordInput.addEventListener('input', checkPasswordStrength);
        }

        // Password toggle functionality
        const passwordToggles = document.querySelectorAll('.password-toggle');
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetInput = document.getElementById(targetId);
                const icon = this.querySelector('i');

                if (targetInput.type === 'password') {
                    targetInput.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    targetInput.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });

        // Click outside modal to close
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        });
    }

    // Modal functions
    function openNameModal() {
        const firstNameInput = document.getElementById('firstNameInput');
        const lastNameInput = document.getElementById('lastNameInput');

        firstNameInput.value = userData.firstName;
        lastNameInput.value = userData.lastName;

        showModal('nameModal');
    }

    function openAvatarModal() {
        const currentAvatarPreview = document.getElementById('currentAvatarPreview');
        currentAvatarPreview.src = userData.avatar;
        
        // Reset file input and save button
        const avatarFileInput = document.getElementById('avatarFileInput');
        const saveAvatarBtn = document.getElementById('saveAvatarBtn');
        avatarFileInput.value = '';
        saveAvatarBtn.disabled = true;

        showModal('avatarModal');
    }

    function openPasswordModal() {
        // Reset form
        const passwordForm = document.getElementById('passwordForm');
        passwordForm.reset();
        
        // Reset password strength indicator
        const strengthFill = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        strengthFill.className = 'strength-fill';
        strengthFill.style.width = '0%';
        strengthText.textContent = 'Слабый пароль';

        // Reset requirements
        const requirements = document.querySelectorAll('.password-requirements li');
        requirements.forEach(req => req.classList.remove('valid'));

        showModal('passwordModal');
    }

    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Form handlers
    function handleNameSubmit(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstNameInput').value.trim();
        const lastName = document.getElementById('lastNameInput').value.trim();

        if (!firstName || !lastName) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        // Update user data
        userData.firstName = firstName;
        userData.lastName = lastName;

        // Update display
        updateUserDisplay();

        // Close modal
        closeModal('nameModal');

        // Show success message
        showSuccessMessage('Имя и фамилия успешно обновлены');
    }

    let selectedAvatarFile = null;

    function handleAvatarSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Пожалуйста, выберите изображение');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Размер файла не должен превышать 5MB');
            return;
        }

        selectedAvatarFile = file;

        // Preview the image
        const reader = new FileReader();
        reader.onload = function(e) {
            const currentAvatarPreview = document.getElementById('currentAvatarPreview');
            currentAvatarPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Enable save button
        const saveAvatarBtn = document.getElementById('saveAvatarBtn');
        saveAvatarBtn.disabled = false;
    }

    function handleAvatarSave() {
        if (!selectedAvatarFile) {
            alert('Пожалуйста, выберите изображение');
            return;
        }

        // In a real app, you would upload the file to a server
        // For now, we'll create a local URL
        const reader = new FileReader();
        reader.onload = function(e) {
            userData.avatar = e.target.result;
            updateUserDisplay();
            closeModal('avatarModal');
            showSuccessMessage('Аватар успешно обновлен');
        };
        reader.readAsDataURL(selectedAvatarFile);
    }

    function handlePasswordSubmit(e) {
        e.preventDefault();

        const currentPassword = document.getElementById('currentPasswordInput').value;
        const newPassword = document.getElementById('newPasswordInput').value;
        const confirmPassword = document.getElementById('confirmPasswordInput').value;

        // Validate current password (in real app, this would be verified on server)
        if (!currentPassword) {
            alert('Введите текущий пароль');
            return;
        }

        // Validate new password
        if (!validatePassword(newPassword)) {
            alert('Новый пароль не соответствует требованиям');
            return;
        }

        // Check password confirmation
        if (newPassword !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        // In a real app, you would send this to the server
        closeModal('passwordModal');
        showSuccessMessage('Пароль успешно изменен');
    }

    // Password validation
    function validatePassword(password) {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password)
        };

        return Object.values(requirements).every(req => req);
    }

    function checkPasswordStrength() {
        const password = document.getElementById('newPasswordInput').value;
        const strengthFill = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');

        // Check requirements
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password)
        };

        // Update requirement indicators
        document.getElementById('req-length').classList.toggle('valid', requirements.length);
        document.getElementById('req-uppercase').classList.toggle('valid', requirements.uppercase);
        document.getElementById('req-lowercase').classList.toggle('valid', requirements.lowercase);
        document.getElementById('req-number').classList.toggle('valid', requirements.number);

        // Calculate strength
        const validCount = Object.values(requirements).filter(req => req).length;
        let strength = 'weak';
        let strengthClass = 'weak';

        if (validCount === 4) {
            strength = 'Надежный пароль';
            strengthClass = 'strong';
        } else if (validCount === 3) {
            strength = 'Хороший пароль';
            strengthClass = 'good';
        } else if (validCount === 2) {
            strength = 'Средний пароль';
            strengthClass = 'fair';
        } else {
            strength = 'Слабый пароль';
            strengthClass = 'weak';
        }

        strengthFill.className = `strength-fill ${strengthClass}`;
        strengthText.textContent = strength;
    }

    // Success message
    function showSuccessMessage(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00aa00;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
            z-index: 10001;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 16px rgba(0, 170, 0, 0.3);
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 300);
        }, 3000);
    }

    // Admin login functionality
    function openAdminLoginModal() {
        showModal('adminLoginModal');
    }

    function initializeAdminLoginListeners() {
        // Admin login modal
        const adminLoginModal = document.getElementById('adminLoginModal');
        const closeAdminLoginModal = document.getElementById('closeAdminLoginModal');
        const cancelAdminLogin = document.getElementById('cancelAdminLogin');
        const adminLoginForm = document.getElementById('adminLoginForm');
        const toggleAdminPassword = document.getElementById('toggleAdminPassword');

        if (closeAdminLoginModal) {
            closeAdminLoginModal.addEventListener('click', () => closeModal('adminLoginModal'));
        }

        if (cancelAdminLogin) {
            cancelAdminLogin.addEventListener('click', () => closeModal('adminLoginModal'));
        }

        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', handleAdminLogin);
        }

        if (toggleAdminPassword) {
            toggleAdminPassword.addEventListener('click', () => {
                const passwordInput = document.getElementById('adminPassword');
                const icon = toggleAdminPassword.querySelector('i');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    passwordInput.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            });
        }
    }

    function handleAdminLogin(e) {
        e.preventDefault();
        
        const login = document.getElementById('adminLogin').value;
        const password = document.getElementById('adminPassword').value;
        
        // Check credentials
        if (login === '12345' && password === '54321') {
            // Set admin role and flag
            userData.role = 'Администратор';
            userData.isAdmin = true;
            
            // Set session flag to maintain admin status
            sessionStorage.setItem('adminLoginSuccess', 'true');
            
            // Update display and save data
            updateUserDisplay();
            saveUserData();
            
            closeModal('adminLoginModal');
            
            // Show success message
            showNotification('Вы успешно вошли как администратор!', 'success');
            
            // Redirect to admin panel after a short delay
            setTimeout(() => {
                window.location.href = 'admin-panel.html';
            }, 1500);
        } else {
            alert('Неверный логин или пароль!');
        }
    }

    // Save user data to localStorage (for persistence between sessions)
    function saveUserData() {
        localStorage.setItem('userData', JSON.stringify(userData));
    }
    
    function loadUserData() {
        const saved = localStorage.getItem('userData');
        if (saved) {
            const savedData = JSON.parse(saved);
            userData = { ...userData, ...savedData };
            
            // Always reset admin status on page load unless coming from admin login
            // This ensures admin role is only active during the session
            if (!sessionStorage.getItem('adminLoginSuccess')) {
                userData.role = 'Клиент';
                userData.isAdmin = false;
            }
        }
    }

    // Load saved data on page load
    loadUserData();

    // Initialize page
    initializePage();
    initializeAdminLoginListeners();
});
