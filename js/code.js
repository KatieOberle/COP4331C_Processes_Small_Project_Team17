/*
    Backend URL will be added when the PHP
    endpoints are connected.

*/
const API_BASE = "BACKEND/PHP";


/*
    Shared helper for PHP API requests.

*/
async function sendRequest(endpoint, data)
{
    const response = await fetch(
        API_BASE + "/" + endpoint,
        {
            method: "POST",

            headers:
            {
                "Content-Type": "application/json"
            },

            credentials: "include",

            body: JSON.stringify(data)
        }
    );

    return response;
}


// Disclosure: Improvements, debugging, refactoring, etc. contributed by AI tools
// (All AI usage is cited in line comments and in the README

const API_BASE = "../api"; // droplet API directory

async function sendRequest(endpoint, data)
{
    const response = await fetch(API_BASE + "/" + endpoint,
        {
            // JSON request
            method: "POST",

    const mainContent =
        document.getElementById("mainContent");

    if (introScreen && mainContent)
    {
        setTimeout(function()
        {
            introScreen.style.display = "none";

            mainContent.classList.remove("hidden");

        }, 3000);
    }
});



function doLogin()
{
    const loginInput =
        document.getElementById("loginName");

    const passwordInput =
        document.getElementById("loginPassword");

    const result =
        document.getElementById("loginResult");

    const password = document.getElementById("loginPassword")?.value; // Katie: password check ?.value

    if (!loginInput || !passwordInput || !result)
    {
        return;
    }


    const login =
        loginInput.value.trim();

    const password =
        passwordInput.value;


    result.innerHTML = "";


    if (login === "" || password === "")
    {
        result.innerHTML =
            "Please enter your username and password.";

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
        return;
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

    const loginData =
    {
        login: login,
        password: password
    };


    /*
        BACKEND/PHP LOGIN CONNECTION GOES HERE

        Example future call:

        sendRequest("Login.php", loginData);

        Session cookie will be included automatically
        by sendRequest().
    */
}



function doRegister()
{
    const firstNameInput =
        document.getElementById("firstName");

    const lastNameInput =
        document.getElementById("lastName");

    const loginInput =
        document.getElementById("registerLogin");

    const passwordInput =
        document.getElementById("registerPassword");

    const result =
        document.getElementById("registerResult");


    if (
        !firstNameInput ||
        !lastNameInput ||
        !loginInput ||
        !passwordInput ||
        !result
    )
    {
        return;
    }


    const firstName =
        firstNameInput.value.trim();

    const lastName =
        lastNameInput.value.trim();

    const login =
        loginInput.value.trim();

    const password =
        passwordInput.value;


    result.innerHTML = "";


    if (
        firstName === "" ||
        lastName === "" ||
        login === "" ||
        password === ""
    )
    {
        result.innerHTML =
            "Please fill in all fields.";

        return;
    }


    const registerData =
    {
        firstName: firstName,
        lastName: lastName,
        login: login,
        password: password
    };


    /*
        BACKEND/PHP REGISTER CONNECTION GOES HERE
    */
}
async function addContact() 
{ 
    // html and js must have matching id="references", cannot have mismatches for fname/last/email/phone
    //pull needeed contact data name,email,phone 
    let firstName = document.getElementById("firstName").value.trim(); 
    let lastName = document.getElementById("lastName").value.trim(); 
    let email = document.getElementById("email").value.trim(); 
    let phoneNumber = document.getElementById("phoneNumber").value.trim(); 

 
    // Copied strict equality from php  
    // asks for fname+lname and either email/pass 
    if (firstName === "" || lastName === "" || 
        (email === "" && phoneNumber === "") 
    ) 
    { 
        document.getElementById("result").innerHTML = "Enter a first and last name, and either their email or phone number."; 
        return; 
    } 
   
    try 
    { 
        // send json contact to addcontact.php endpoint 
        const response = await fetch("AddContact.php", 
        { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ 
                firstName: firstName, 
                lastName: lastName, 
                email: email, 
                phone: phoneNumber 
            })
        }); 
 

        const data = await response.json(); 
        // Ensure there are no php/html errors
        if (!response.ok || data.error) 
        { 
            document.getElementById("result").innerHTML = data.error || "Unable to add contact, error."; 
            return; 
        } 

        document.getElementById("result").innerHTML = "Contact added successfully."; 
        console.log("New contact:", data); 
    } 

    //fallback error code 
    catch (error) 
    { 
        document.getElementById("result").innerHTML = "Error, Failed to add contact."; 
    } 
}

async function deleteContact(contactId)
{
    // HTML & javascript must have matching references for id, currently "contactDelete"
    const result = document.getElementById("contactDelete");

    if (!result)
    {
        return;
    }

    let contact =
    {
        id: contactId
    };

    try
    {
        const response = await fetch("DeleteContact.php",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        });

        // Json from the php
        let jsonObject = await response.json();

        // Ensure there are no php/html errors
        if (!response.ok || jsonObject.error)
        {
            result.innerHTML = jsonObject.error || "Failed to delete contact, error.";
            return;
        }

        // an edgecase check if php isnt returning a deleted id
        if (jsonObject.id != contactId)
        {
            result.innerHTML = "Failed to delete contact, error.";
            return;
        }

        result.innerHTML = "Contact deleted.";
        searchContacts();
    }
    catch (error)
    {
        result.innerHTML = "Error, failed to delete contact.";
    }
}



async function searchContacts()  
{  
    // where html and js must match 
    const searchBox = document.getElementById("searchText");  
 
    // where html and js must match 
    const result = document.getElementById("searchResult");  

    //safety handling to prevent unexpected values from running  
    if (!searchBox || !result) 
    {  
        return;  
    }  
  
    let search = searchBox.value.trim();  
    let jsonObject;  

    // wiping previous values
    result.innerHTML = "";

    // stops an empty search from going through
    if (search === "")
    {
        result.innerHTML = "Please enter a search term.";
        return;
    }

    const searchData =
    {
        search: search
    };
  
    try  
    {  
        //api connection, fetch()  
        let response = await fetch("SearchContacts.php",  
        {  
            method: "POST",  
            headers:  
            {  
                "Content-Type": "application/json"  
            },  
            body: JSON.stringify(searchData)  
        });  
  
        if (!response.ok)  
        {  
            result.textContent = "Search failed.";  
            return;  
        }  
  
        jsonObject = await response.json();  
    }  
    catch (error)  
    {  
        result.textContent = "Search failed.";  
        return;  
    }  

    // error field provided in php files
    if (jsonObject.error && jsonObject.error != 200)
    {
        result.textContent = "Error, search failed.";
        return;
    }
  
    // wiping previous values   
    result.innerHTML = "";  
  
    // case for when there are no contacts to be found  
    if (!Array.isArray(jsonObject.results) ||  
        jsonObject.results.length === 0)  
    {  
        result.textContent = "No contacts found.";  
        return;  
    }  
  
    // output and display the contacts  
    for (let contact of jsonObject.results)  
    {  
        let entry = document.createElement("p");  
  
        entry.textContent = contact.firstName + " " + contact.lastName + " - " + contact.email + " - " + contact.phone;  
        result.appendChild(entry);  
    }  
}


function showAddContactForm()
{
    const form =
        document.getElementById("addContactForm");


    if (form)
    {
        form.classList.remove("hidden");
    }
}



function hideAddContactForm()
{
    const form =
        document.getElementById("addContactForm");


    if (form)
    {
        form.classList.add("hidden");
    }
}


function editContact(contactId)
{
    const form =
        document.getElementById("editContactForm");

    const idInput =
        document.getElementById("editContactId");


    if (!form || !idInput)
    {
        return;
    }


    idInput.value = contactId;

    form.classList.remove("hidden");

    result.innerHTML = "";

    /*
        BACKEND/PHP GET CONTACT DATA GOES HERE
    */
}



function hideEditContactForm()
{
    const form =
        document.getElementById("editContactForm");

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
        searchContacts(); // list refresh instead of render (render blanks list)
        setResult("searchResult", "Contact deleted. Search to refresh list.");
    }
    catch (error)
    {
        setResult("deleteContactResult", error.message); // error detected and reported
    }
}

    if (form)
    {
        form.classList.add("hidden");
    }
}



function saveEditedContact()
{
    const idInput =
        document.getElementById("editContactId");

    const firstNameInput =
        document.getElementById("editFirstName");

    const lastNameInput =
        document.getElementById("editLastName");

    const phoneInput =
        document.getElementById("editPhone");

    const emailInput =
        document.getElementById("editEmail");

    const result =
        document.getElementById("editContactResult");


    if (
        !idInput ||
        !firstNameInput ||
        !lastNameInput ||
        !phoneInput ||
        !emailInput ||
        !result
    )
    {
        return;
    }


    const contactId =
        idInput.value;

    const firstName =
        firstNameInput.value.trim();

    const lastName =
        lastNameInput.value.trim();

    const phone =
        phoneInput.value.trim();

    const email =
        emailInput.value.trim();


    result.innerHTML = "";


    if (
        contactId === "" ||
        firstName === "" ||
        lastName === "" ||
        phone === "" ||
        email === ""
    )
    {
        result.innerHTML =
            "Please fill in all contact fields.";

        return;
    }


    const editedContactData =
    {
        id: contactId,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email
    };


    /*
        BACKEND/PHP EDIT CONTACT CONNECTION GOES HERE
    */
}



function deleteContact(contactId)
{
    const form =
        document.getElementById("deleteContactForm");

    const idInput =
        document.getElementById("deleteContactId");

    const result =
        document.getElementById("deleteContactResult");


    if (!form || !idInput || !result)
    {
        return;
    }


    idInput.value = contactId;

    result.innerHTML = "";

    form.classList.remove("hidden");
}



function hideDeleteContactForm()
{
    const form =
        document.getElementById("deleteContactForm");

    const idInput =
        document.getElementById("deleteContactId");


    if (form)
    {
        form.classList.add("hidden");
    }


    if (idInput)
    {
        idInput.value = "";
    }
}



function confirmDeleteContact()
{
    const idInput =
        document.getElementById("deleteContactId");

    const result =
        document.getElementById("deleteContactResult");


    if (!idInput || !result)
    {
        return;
    }


    const contactId =
        idInput.value;


    if (contactId === "")
    {
        result.innerHTML =
            "No contact selected.";

        return;
    }


    const deleteData =
    {
        id: contactId
    };


    /*
        BACKEND/PHP DELETE CONTACT CONNECTION GOES HERE
    */
}



function logout()
{
    /*
        BACKEND/PHP LOGOUT ENDPOINT GOES HERE.

    */

    window.location.href = "index.html";
}
