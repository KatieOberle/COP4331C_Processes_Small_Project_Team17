// File purpose: update frontend based on API/database and implement required functions for
//                adding contacts, deleting contacts, editing contacts, and searching contacts
// Authors: Wilkenson Pierre, Sylus Perez, Katherine (Katie) Oberle

// Disclosure: Improvements, debugging, refactoring, etc. contributed by AI tools
// (All AI usage is cited in line comments and in the README

const API_BASE = "../api"; // droplet API directory

async function sendRequest(endpoint, data)
{
    const response = await fetch(API_BASE + "/" + endpoint,
        {
            // JSON request
            method: "POST",

            headers:
            {
                "Content-Type": "application/json"
            },

            credentials: "include",

            body: JSON.stringify(data)
        }
    );

    // Katie: 9/21 Codex suggested addition, use session cookies and indicate API errors consistently
    const payload = await response.json();

    if(!response.ok || payload.error) // issue with response or payload when loading page
    {
        throw new Error(payload.error || "Request failed."); // indicate error
    }
    return payload; // return response
}

// Katie: 9/21, setResult function to safely show API status messages
function setResult(id, message) // customize id desired and message
{
    const result = document.getElementById(id); // fetch element
    if (result) // if element exists
    {
        result.textContent = message; // include message
    }
}

// Katie: 9/21, add method to have edit/delete buttons attached to new contacts listed in manager, Codex assisted v5.6 Terra
function renderContacts(contacts)
{
    const contactList = document.getElementById("contactList"); // connect existing contacts
    if(!contactList) // if no list
    {
        return; // exit
    }
    contactList.replaceChildren(...contacts.map(function(contact)
                                                {
                                                    const card = document.createElement("div"); // create new card space
                                                    const details = document.createElement("div"); // details to hold name and info
                                                    const name = document.createElement("h3"); // name is header
                                                    const info = document.createElement("div"); // contact information
                                                    const actions = document.createElement("div"); // actions to hold buttons
                                                    const editButton = document.createElement("button"); // edit contact
                                                    const deleteButton = document.createElement("button"); // delete contact

                                                    // html name assignments, assisted by Codex search 9/21
                                                    card.className = "contact-card";
                                                    actions.className = "contact-actions";
                                                    editButton.className = "edit-button";
                                                    deleteButton.className = "delete-button";
                                                    name.textContent = contact.firstName + " " + contact.lastName; // format name string
                                                    info.textContent = [contact.email, contact.phone].filter(Boolean).join(" . "); // include respective info
                                                    editButton.textContent = "Edit";
                                                    deleteButton.textContent = "Delete";
                                                    editButton.addEventListener("click", function() { editContact(contact); }); // listen for user to edit
                                                    deleteButton.addEventListener("click", function() { deleteContact(contact.id); }); // listen for user to delete
                                                    details.append(name, info); // name and info included under details within card
                                                    actions.append(editButton, deleteButton); // actions hold interactive buttons
                                                    card.append(details, actions);

                                                    return card; // return completed card
                                                })
                                );
}

window.addEventListener("load", function() // login page
{
    const introScreen = document.getElementById("introScreen");

    const mainContent = document.getElementById("mainContent");

    if (introScreen && mainContent) // both elements present
    {
        setTimeout(function()
        {
            introScreen.style.display = "none";

            mainContent.classList.remove("hidden");

        }, 3000); // timer for login page
    }
});

async function doLogin() // action to submit login info, Katie: 9/22 added async for "await"
{
    const login = document.getElementById("loginName").value.trim(); // Katie: trimmed entry

    const password = document.getElementById("loginPassword")?.value; // Katie: password check ?.value

    // Katie: Codex suggested method to compact and anticipate errors, 9/21
    if(!login || !password) // ensures if nothing is entered that user told exactly what to do
    {
        setResult("loginResult", "Please enter your username and password.");
        return;
    }
    try // continue attempt
    {
        await sendRequest("Login.php", { login: login, password: password });
        window.location.href = "contacts.html"; 
    }
    catch(error) // error checkpoint
    {
        setResult("loginResult", error.message); // send message in event of error
    }    
}

async function doRegister() // Katie: updated register action using Codex debugging/recommendations, similar to doLogin improvements, 9/21
{
    const firstName = document.getElementById("firstName")?.value.trim();
    const lastName = document.getElementById("lastName")?.value.trim();
    // credentials
    const login = document.getElementById("registerLogin")?.value.trim();
    const password = document.getElementById("registerPassword")?.value; // test password



    if (!firstName || !lastName || !login || !password)
    {
        setResult("registerResult","Please fill in all fields."); // feedback
        return; // exit
    }
    try // continue
    {
        await sendRequest("Register.php", {firstName, lastName: lastName, login: login, password: password }); // add user to register PHP
        setResult("registerResult", "Account created. Log in now."); // feedback
    }
    catch(error) // error check recommended by Codex v5.6 Terra, 9/21
    {
        setResult("registerResult", error.message);
    }
}

// Katie: moved add contact form functions here
function showAddContactForm()
{
    const form = document.getElementById("addContactForm");
    if (form)
    {
        form.classList.remove("hidden");
    }
}

function hideAddContactForm()
{
    const form = document.getElementById("addContactForm");
    if (form)
    {
        form.classList.add("hidden");
    }
}

async function addContact() 
{ 
    // html and js must have matching id="references", cannot have mismatches for fname/last/email/phone
    //pull needeed contact data name,email,phone 

    // Katie: adjustments ensure matching between javascript and html files

    // Katie: adjusted contact info ID's for name, email, and phone to match contacts.html, advised by Claude Sonnet v5
    let firstName = document.getElementById("contactFirstName").value.trim(); 
    let lastName = document.getElementById("contactLastName").value.trim(); 
    let email = document.getElementById("contactEmail").value.trim(); 
    let phone = document.getElementById("contactPhone").value.trim(); 

 
    // Copied strict equality from php  
    // asks for fname+lname and either email/pass 
    // Katie: 9/22, removed "=== """ and replaced with "!"
    if (!firstName || !lastName || !email || !phone ) 
    { 
        // Katie: adjusted result ID to match contacts.html, advised by Claude Sonnet v5
        setResult("addContactResult", "Enter a first and last name, email, and phone number");
        return; 
    } 
    try 
    { 
        // send json contact to addcontact.php endpoint
        // Katie: 9/22 improved version using new functions, Codex v5.6 Terra
        await sendRequest("AddContact.php", { firstName: firstName, lastName: lastName, email: email, phone: phone });
        hideAddContactForm();
        setResult("searchResult", "Contact added. Search to view contacts.");
    }
    catch (error)
    {
        setResult("addContactResult", error.message); // error message output
    }
}

// Katie: improved search contacts query/render, referenced Codex v5.6 Terra
async function searchContacts()
{
    const search = document.getElementById("searchText")?.value.trim();
    if (!search) // no search entered
    {
        setResult("searchResult", "Please enter a search term.");
    }
    try
    {
        const payload = await sendRequest("SearchContacts.php", { search: search }); // API request
        const contacts = Array.isArray(payload.results) ? payload.results : []; // set search array
        renderContacts(contacts); // render available contacts
        setResult("searchResult", contacts.length ? "" : "No contacts found."); // term does not match any contacts
    }
    catch (error) // error catch and message
    {
        setResult("searchResult", error.message);
    }
}

function editContact(contact)
{
    const form = document.getElementById("editContactForm");
    // removed editContactId here since populated later
    if (!form )
    {
        return;
    }

    // Katie: populating form with API payload
    document.getElementById("editContactId").value = contact.id;
    document.getElementById("editFirstName").value = contact.firstName;
    document.getElementById("editLastName").value = contact.lastName;
    document.getElementById("editPhone").value = contact.phone;
    document.getElementById("editEmail").value = contact.email;

    form.classList.remove("hidden");
}



function hideEditContactForm()
{
    const form = document.getElementById("editContactForm");

    if (form) // if form is shown then change to hidden
    {
        form.classList.add("hidden");
    }
}

async function saveEditedContact() // Katie: async for "await"
{
    // Katie: added ?.value() for validation
    const id = document.getElementById("editContactId")?.value; // ID of the edit contact

    const firstName = document.getElementById("editFirstName")?.value.trim();

    const lastName = document.getElementById("editLastName")?.value.trim();

    const phone = document.getElementById("editPhone")?.value.trim();

    const email = document.getElementById("editEmail")?.value.trim();

    if ( !id || !firstName || !lastName || !phone || !email || !result)
    {
        setResult("editContactResult", "Please fill in all fields."); // feedback
        return; // leave unedited fields unedited
    }
    try
    {
        await sendRequest("EditContact.php", { id: id, firstName: firstName, lastName: lastName, phone: phone, email: email });
        hideEditContactForm();
        setResult("searchResult", "Contact updated. Search to refresh list"); // feedback
    }
    catch (error)
    {
        setResult("editContactResult", error.message);
    }
}

function deleteContact(contactId)
{
    const form = document.getElementById("deleteContactForm");

    const id = document.getElementById("deleteContactId");

    const result = document.getElementById("deleteContactResult");


    if (!form || !id || !result)
    {
        return;
    }


    id.value = contactId;

    result.innerHTML = "";

    form.classList.remove("hidden");
}



function hideDeleteContactForm()
{
    const form = document.getElementById("deleteContactForm");

    const id = document.getElementById("deleteContactId");


    if (form)
    {
        form.classList.add("hidden");
    }


    if (id)
    {
        id.value = "";
    }
}


// Katie: 9/22 connect confirmDeleteContact() to API DeleteContact.php payload
async function confirmDeleteContact()
{
    const id = document.getElementById("deleteContactId")?.value;

    if (!id ) // handle result in new function setResult
    {
        setResult("deleteContactResult", "No contact selected.");
        return;
    }
    try
    {
        await sendRequest("DeleteContact.php", { id: id }); // connect to API
        hideDeleteContactForm();
        renderContacts([]); // render remaining contacts
        setResult("searchResult", "Contact deleted. Search to refresh list.");
    }
    catch (error)
    {
        setResult("deleteContactResult", error.message); // error detected and reported
    }
}



function logout()
{
    window.location.href = "index.html";
}
