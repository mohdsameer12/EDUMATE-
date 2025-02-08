const skillButtons = document.querySelectorAll('.skill-button');
        const continueButton = document.querySelector('.continue-btn');
        const otherSkillButton = document.getElementById('other-skill');
        const customSkillInput = document.querySelector('.custom-skill-input');
        const newSkillInput = document.getElementById('new-skill-input');
        const addSkillBtn = document.getElementById('add-skill-btn');
        const skillOptions = document.querySelector('.skill-options');
        const selectedSkills = new Set();

        // Handle skill button clicks
        skillButtons.forEach(button => {
            if (button.id !== 'other-skill') {
                button.addEventListener('click', (event) => {
                    toggleSkillSelection(button);
                    createRipple(event, button);
                });
            }
        });

        // Toggle skill selection
        function toggleSkillSelection(button) {
            if (button.id !== 'other-skill') {
                button.classList.toggle('selected');
                const skill = button.dataset.skill;
                
                if (button.classList.contains('selected')) {
                    selectedSkills.add(skill);
                } else {
                    selectedSkills.delete(skill);
                }
                
                updateContinueButton();
            }
        }

        // Handle "Other" button click
        otherSkillButton.addEventListener('click', (event) => {
            createRipple(event, otherSkillButton);
            customSkillInput.style.display = 
                customSkillInput.style.display === 'none' || 
                customSkillInput.style.display === '' ? 'block' : 'none';
        });

        function addNewSkill() {
            const skillName = newSkillInput.value.trim();
            if (skillName) {
                const newButton = document.createElement('button');
                newButton.className = 'skill-button selected';
                newButton.dataset.skill = skillName.toLowerCase();
                
                newButton.innerHTML = `
                    <span class="nav-icon material-symbols-rounded">star</span>
                    ${skillName}
                `;

                // Insert before the "Other" button
                skillOptions.insertBefore(newButton, otherSkillButton);
                
                newButton.addEventListener('click', (event) => {
                    toggleSkillSelection(newButton);
                    createRipple(event, newButton);
                });

                selectedSkills.add(skillName.toLowerCase());
                
                newSkillInput.value = '';
                customSkillInput.style.display = 'none';
                
                updateContinueButton();
            }
        }

        addSkillBtn.addEventListener('click', addNewSkill);
        newSkillInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addNewSkill();
            }
        });

        function updateContinueButton() {
            continueButton.disabled = selectedSkills.size === 0;
        }

        continueButton.addEventListener('click', () => {
            if (selectedSkills.size > 0) {
                localStorage.setItem('userSkills', JSON.stringify([...selectedSkills]));
                window.location.href = 'profile3.html';
            }
        });

        function createRipple(event, button) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        }

        // Initialize the page
        window.addEventListener('load', () => {
            // Ensure no buttons are pre-selected
            skillButtons.forEach(button => {
                button.classList.remove('selected');
            });
            
            // Make sure custom input is hidden initially
            customSkillInput.style.display = 'none';
            
            // Disable continue button initially
            updateContinueButton();
        });