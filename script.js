document.addEventListener('DOMContentLoaded', () => {

    const userForm = document.getElementById('userForm');
    const userTableBody = document.getElementById('userTable');
    const cookieAlert = document.getElementById('cookieAlert');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    
    // 1. Element Setup
    const dynamicAlerts = document.getElementById('dynamicAlerts');
    
    // 2. Helper: Toast Notification
    function showNotification(message, type = 'success') {
        const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show fixed-top w-75 mx-auto mt-3 shadow-lg" role="alert" style="z-index: 2001;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    
        if(dynamicAlerts) {
            dynamicAlerts.insertAdjacentHTML('afterbegin', alertHTML);
            setTimeout(() => {
                const addedAlert = dynamicAlerts.querySelector('.alert');
                if (addedAlert) addedAlert.classList.remove('show');
                setTimeout(() => addedAlert?.remove(), 500);
            }, 4000);
        }
    }
    
    // 3. Registration Form Handler (Only runs if userForm exists on the page)
    if (userForm) {
        userForm.addEventListener("submit", function (e) {
            e.preventDefault();
        
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const plan = document.getElementById('plan').value;
        
            if (!name || !email || !phone || plan === '' || plan === 'Select Plan') {
                showNotification('Please fill out all required fields and select a plan.', 'danger');
                return;
            }
        
            if (userTableBody) {
                const row = userTableBody.insertRow();
                row.innerHTML = `<td>${name}</td><td>${email}</td><td>${phone}</td><td>${plan}</td>`;
            }
        
            this.reset();
        
            const successModalElement = document.getElementById('successModal');
            if(successModalElement) {
                const successModal = new bootstrap.Modal(successModalElement);
                const userNameDisplay = document.getElementById('successUserName');
                if(userNameDisplay) userNameDisplay.textContent = name;
                successModal.show();
            }
        });
    }
    
    // 4. Apply Button 
    document.querySelectorAll(".apply-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const modalElement = document.getElementById("applyModal");
            if(modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }
        });
    });
    
    // 5. Alert Handler
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener("click", () => {
            const alertBox = document.getElementById("cookieAlert");
            if(alertBox) {
                alertBox.classList.remove("show");
                setTimeout(() => alertBox.remove(), 500);
            }
        });
    }
});