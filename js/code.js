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



window.addEventListener("load", function()
{
    const introScreen =
        document.getElementById("introScreen");

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

        return;
    }


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

    // Katie: adjustments ensure matching between javascript and html files

    // Katie: adjusted contact info ID's for name, email, and phone to match contacts.html, advised by Claude Sonnet v5
    let firstName = document.getElementById("contactFirstName").value.trim(); 
    let lastName = document.getElementById("contactLastName").value.trim(); 
    let email = document.getElementById("contactEmail").value.trim(); 
    let phoneNumber = document.getElementById("contactPhone").value.trim(); 

 
    // Copied strict equality from php  
    // asks for fname+lname and either email/pass 
    if (firstName === "" || lastName === "" || 
        (email === "" && phoneNumber === "") 
    ) 
    { 
        // Katie: adjusted result ID to match contacts.html, advised by Claude Sonnet v5
        document.getElementById("addContactResult").innerHTML = "Enter a first and last name, and either their email or phone number."; 
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


    /*
        BACKEND/PHP GET CONTACT DATA GOES HERE
    */
}



function hideEditContactForm()
{
    const form =
        document.getElementById("editContactForm");


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
