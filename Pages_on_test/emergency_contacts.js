document.addEventListener("DOMContentLoaded", loadContacts);

function filterContacts() {
    let input = document.getElementById("search").value.toLowerCase();
    let contacts = document.querySelectorAll(".contact, .user-contact");

    contacts.forEach(contact => {
        let contactName = contact.querySelector("p, span").innerText.toLowerCase();
        contact.style.display = contactName.includes(input) ? "" : "none";
    });
}

function addContact() {
    let name = document.getElementById("contact-name").value.trim();
    let number = document.getElementById("contact-number").value.trim();

    if (name === "" || number === "") {
        alert("Please enter both name and number.");
        return;
    }

    addContactToUI(name, number);
    saveContact(name, number);

    // Clear input fields
    document.getElementById("contact-name").value = "";
    document.getElementById("contact-number").value = "";
}

function addContactToUI(name, number) {
    let contactList = document.getElementById("user-contact-list");

    let contactDiv = document.createElement("div");
    contactDiv.className = "user-contact";

    let contactInfo = document.createElement("span");
    contactInfo.innerHTML = `<b>${name}</b><br>📞 <a href="tel:${number}" style="color:white;">${number}</a>`;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌ Remove";
    deleteBtn.onclick = function () {
        contactList.removeChild(contactDiv);
        removeContact(name);
    };

    contactDiv.appendChild(contactInfo);
    contactDiv.appendChild(deleteBtn);
    contactList.appendChild(contactDiv);
}

// Save contact in localStorage
function saveContact(name, number) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push({ name, number });
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Load contacts from localStorage when the page loads
function loadContacts() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.forEach(contact => addContactToUI(contact.name, contact.number));
}

// Remove contact from localStorage
function removeContact(name) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts = contacts.filter(contact => contact.name !== name);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
