document.addEventListener("DOMContentLoaded", () => {
    const sectionsContainer = document.getElementById("sectionsContainer");
    const sectionDetails = document.getElementById("sectionDetails");
    const addSectionBtn = document.getElementById("addSectionBtn");
    const submitAllBtn = document.getElementById("submitAllBtn");
    const generalInfoForm = document.getElementById("generalInfoForm");

    function showSectionDetails(sectionName) {
        sectionDetails.innerHTML = `
            <div class="content">
                <h2>${sectionName}</h2>
                <form id="${sectionName}Form">
                    <label for="${sectionName}Details">Details:</label>
                    <textarea id="${sectionName}Details" name="${sectionName}Details" required></textarea>
                    <button type="submit">Save</button>
                </form>
                <button onclick="closeSectionDetails()">Close</button>
            </div>
        `;
        sectionDetails.style.display = "flex";

        document.getElementById(`${sectionName}Form`).addEventListener("submit", function(event) {
            event.preventDefault();
            const sectionDetailsValue = document.getElementById(`${sectionName}Details`).value;
            localStorage.setItem(sectionName, sectionDetailsValue);
            closeSectionDetails();
        });
    }

    function closeSectionDetails() {
        sectionDetails.style.display = "none";
    }

    function handleSubmitAll(event) {
        event.preventDefault();
        const generalInfo = {
            profilePicture: document.getElementById("profilePicture").files[0],
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            contact: document.getElementById("contact").value,
            city: document.getElementById("city").value,
            summary: document.getElementById("summary").value
        };

        localStorage.setItem("generalInfo", JSON.stringify(generalInfo));

        const sectionsData = [];
        const sections = sectionsContainer.querySelectorAll(".section");
        sections.forEach(section => {
            const sectionName = section.getAttribute("data-section");
            const sectionDetails = localStorage.getItem(sectionName) || '';
            sectionsData.push({
                section: sectionName,
                details: sectionDetails
            });
        });

        localStorage.setItem("sections", JSON.stringify(sectionsData));

        window.location.href = "template.html";
    }

    sectionsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".section")) {
            const section = event.target.closest(".section");
            const sectionName = section.getAttribute("data-section");
            showSectionDetails(sectionName);
        }
    });

    addSectionBtn.addEventListener("click", () => {
        const newSectionName = prompt("Enter the name of the new section:");
        if (newSectionName) {
            const newSection = document.createElement("button");
            newSection.classList.add("section");
            newSection.setAttribute("data-section", newSectionName.toLowerCase().replace(/\s/g, ""));
            newSection.textContent = newSectionName;
            sectionsContainer.appendChild(newSection);
        }
    });

    submitAllBtn.addEventListener("click", handleSubmitAll);

    window.closeSectionDetails = closeSectionDetails;
});
