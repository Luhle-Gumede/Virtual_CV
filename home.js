document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signupBtn");
    const loginBtn = document.getElementById("loginBtn");
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
    const popupContent = document.getElementById("popupContent");

    function showPopup(content) {
        popupContent.innerHTML = content;
        overlay.style.display = "flex";
    }

    function hidePopup() {
        overlay.style.display = "none";
    }

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) {
            return "Good Morning";
        } else if (hour < 18) {
            return "Good Day";
        } else {
            return "Good Evening";
        }
    }

    // Show initial popup message
    showPopup(`
        <h2>${getGreeting()}</h2>
        <p>This website was created to showcase the benefits of a virtual CV. It provides a convenient way for employees to showcase their skills and experience, while employers can easily access and evaluate potential candidates.</p>
        <p>As I am currently a student, there are some sections I am still studying and have not fully grasped, such as PHP. The website you will be browsing is not yet linked to a database, so your information will not be saved. This website showcases my skills, created with the assistance of AI.</p>
        <button id="exploreBtn">Explore Website</button>
    `);

    document.getElementById("exploreBtn").addEventListener("click", hidePopup);

    signupBtn.addEventListener("click", (event) => {
        event.preventDefault();
        showPopup(`
            <h2>Sign Up</h2>
            <form id="signupForm">
                <label for="role">I am an:</label>
                <select id="role" name="role" required>
                    <option value="" disabled selected>Choose an option</option>
                    <option value="employee">Employee</option>
                    <option value="employer">Employer</option>
                </select>
                <div id="additionalFields"></div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="E.g example@gmail.com" required>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Please provide strong password" required>
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Please make sure it is the same"  required>
                <a href="cv.html"><button type="button">Sign Up</button></a>
            </form>
        `);

        const roleSelect = document.getElementById("role");
        const additionalFields = document.getElementById("additionalFields");

        roleSelect.addEventListener("change", () => {
            if (roleSelect.value === "employee") {
                additionalFields.innerHTML = `
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                `;
            } else if (roleSelect.value === "employer") {
                additionalFields.innerHTML = `
                    <label for="companyName">Company Name:</label>
                    <input type="text" id="companyName" name="companyName" required>
                `;
            } else {
                additionalFields.innerHTML = "";
            }
        });
    });

    loginBtn.addEventListener("click", (event) => {
        event.preventDefault();
        showPopup(`
            <h2>Login</h2>
            <form id="loginForm">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="E.g example@gmail.com" required>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Please enter your password" required>
                <a href="cv.html"><button type="button">Login</button></a>
                <a href="forgot_password.html">Forgot Password?</a>
            </form>
        `);
    });

    closePopup.addEventListener("click", hidePopup);
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            hidePopup();
        }
    });
});

