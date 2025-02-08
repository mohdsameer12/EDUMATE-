
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const errorMessage = document.getElementById('password-error');
    const form = document.querySelector('form');

    // Password requirements
    const requirements = {
        length: /.{8,}/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /[0-9]/,
        special: /[^A-Za-z0-9]/
    };

    password.addEventListener('input', function() {
        const value = this.value;
        
        // Check each requirement
        for(let requirement in requirements) {
            const element = document.getElementById(requirement);
            if(requirements[requirement].test(value)) {
                element.classList.add('valid');
            } else {
                element.classList.remove('valid');
            }
        }
    });

    // Real-time validation for password match
    confirmPassword.addEventListener('input', validatePasswords);
    password.addEventListener('input', validatePasswords);

    function validatePasswords() {
        const passwordValue = password.value;
        const confirmValue = confirmPassword.value;
        
        if(confirmValue !== '') {
            if(passwordValue !== confirmValue) {
                confirmPassword.parentElement.classList.add('error');
                confirmPassword.parentElement.classList.remove('valid');
                errorMessage.textContent = 'Passwords do not match';
                errorMessage.style.display = 'block';
                return false;
            } else {
                confirmPassword.parentElement.classList.remove('error');
                confirmPassword.parentElement.classList.add('valid');
                errorMessage.style.display = 'none';
                return true;
            }
        }
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check all requirements
        let valid = true;
        for(let requirement in requirements) {
            if(!requirements[requirement].test(password.value)) {
                valid = false;
                break;
            }
        }
        
        // Check passwords match
        if(!validatePasswords()) {
            valid = false;
        }
        
        if(valid) {
            // Form is valid, you can submit it
            this.submit();
        }
        if(validatePasswords()) {
            // Store user data if needed
            localStorage.setItem('userEmail', document.querySelector('input[type="text"]').value);
            
            // Redirect to profile1.html
            window.location.href = 'profile1.html';
        }
        
    });
