document.addEventListener("DOMContentLoaded", () => {
    const generalInfo = JSON.parse(localStorage.getItem("generalInfo")) || {};
    const sections = JSON.parse(localStorage.getItem("sections")) || [];

    function getGeneralInfo(key, defaultText) {
        return generalInfo[key] || defaultText;
    }

    function getProfilePicture() {
        if (generalInfo.profilePicture) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("profilePicture").innerHTML = `<img src="${e.target.result}" alt="Profile Picture" style="width:100px; height:100px;">`;
            }
            reader.readAsDataURL(generalInfo.profilePicture);
        } else {
            document.getElementById("profilePicture").textContent = "No picture uploaded";
        }
    }

    function getSections() {
        let sectionsHTML = "";
        sections.forEach(section => {
            sectionsHTML += `<div class="section"><strong>${section.section}:</strong> ${section.details}</div>`;
        });
        document.getElementById("sectionsContainer").innerHTML = sectionsHTML || "No sections added";
    }

    document.getElementById("name").textContent = getGeneralInfo("name", "Name not provided");
    document.getElementById("email").textContent = getGeneralInfo("email", "Email not provided");
    document.getElementById("contact").textContent = getGeneralInfo("contact", "Contact not provided");
    document.getElementById("city").textContent = getGeneralInfo("city", "City not provided");
    document.getElementById("summary").textContent = getGeneralInfo("summary", "Summary not provided");

    getProfilePicture();
    getSections();

    // Show popup with future features
    showFeaturePopup();
});

function showFeaturePopup() {
    const overlay = document.createElement('div');
    overlay.id = "featureOverlay";
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const popup = document.createElement('div');
    popup.id = "featurePopup";
    popup.classList.add("popup");
    overlay.appendChild(popup);

    popup.innerHTML = `
        <button id="closeFeaturePopup" class="close-popup">&times;</button>
        <div id="featurePopupContent">
            <p>This Page Can Be Sent to Your Potential Employers</p>
            <p>For security reasons, they will require your permission to access it. If you update it at any point, it will be updated on their end too.</p>
            <h3>Exciting Future Features!</h3>
            <h4>Benefits for Employees</h4>
            <ul>
                <li>Interactive Templates: Create dynamic and engaging CVs with ease.</li>
                <li>Real-time Updates: Instantly update your CV and keep it current.</li>
                <li>Shareable Links: Easily share your CV with potential employers.</li>
                <li>Secure Storage: Keep your personal information safe and secure.</li>
            </ul>
            <h4>Benefits for Employers</h4>
            <ul>
                <li>Advanced Search: Quickly find candidates that meet your criteria.</li>
                <li>Applicant Tracking: Manage and track applications efficiently.</li>
                <li>Customizable Filters: Use filters to narrow down the best candidates.</li>
                <li>Enhanced Communication: Communicate directly with potential hires through the platform.</li>
            </ul>
            <p><strong>Transforming the way you present yourself. Thank you for visiting my startup site!</strong></p>
            <button id="exploreBtn">Close</button>
        </div>
    `;

    document.getElementById("exploreBtn").addEventListener("click", () => {
        overlay.style.display = "none";
    });

    document.getElementById("closeFeaturePopup").addEventListener("click", () => {
        overlay.style.display = "none";
    });

    setTimeout(() => {
        overlay.style.display = "flex";
    }, 500); // Delay before showing the popup
}
