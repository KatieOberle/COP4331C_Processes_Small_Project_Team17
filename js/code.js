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


async function doLogin()
{
    // grab login, user/password
    const loginInput =
        document.getElementById("loginName");

    const passwordInput =
        document.getElementById("loginPassword");

    const result =
        document.getElementById("loginResult");


    // verify html elements
    if (!loginInput || !passwordInput || !result)
    {
        return;
    }


    const login =
        loginInput.value.trim();

    const password =
        passwordInput.value;


    result.innerHTML = "";


    // verify login and password 
    if (login === "" || password === "")
    {
        result.innerHTML =
            "Please enter your username and password.";

        return;
    }


    // Prepare login (pass/user) for the PHP backend
    const loginData =
    {
        login: login,
        password: password
    };


    try
    {
        // Send login info to phpbackend, -> Login.php
        const response = await fetch("Login.php",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            credentials: "same-origin",
            body: JSON.stringify(loginData)
        });


        // verify http
        if (!response.ok)
        {
            result.innerHTML = "Login request has failed.";
            return;
        }


        // json connection from php
        const data = await response.json();


        // this just outputs errors as a HTML result we can display
        if (data.error !== "")
        {
            result.innerHTML = data.error;
            return;
        }


        // redirect to contacts page after succesful login
        window.location.href = "contacts.html";
    }
    catch (error)
    {
        result.innerHTML = "Server error, login failed.";
    }
}

async function doRegister()
{
    // grab all login fields
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


    // Verify infomation is filled out
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


    // Prepare for PHP
    const registerData =
    {
        firstName: firstName,
        lastName: lastName,
        login: login,
        password: password
    };


    try
    {
        // Send registration info Register.php
        const response = await fetch("Register.php",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            credentials: "same-origin",
            body: JSON.stringify(registerData)
        });


        // verify HTTP request hasnt failed, output to HTML-display
        if (!response.ok)
        {
            result.innerHTML = "Registration request has failed.";
            return;
        }


        const data = await response.json();


        // check and display any PHP errors to HTML
        if (data.error !== "")
        {
            result.innerHTML = data.error;
            return;
        }



        result.innerHTML = "Registration successful! You can now log in.";
    }
    catch (error)
    {
        result.innerHTML = "Server error, registration failed.";
    }
}


function searchContacts()
{
    const searchInput =
        document.getElementById("searchText");

    const result =
        document.getElementById("searchResult");


    if (!searchInput || !result)
    {
        return;
    }


    const search =
        searchInput.value.trim();


    result.innerHTML = "";


    if (search === "")
    {
        result.innerHTML =
            "Please enter a search term.";

        return;
    }


    const searchData =
    {
        search: search
    };


    /*
        BACKEND/PHP SEARCH CONNECTION GOES HERE

    */
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



function addContact()
{
    const firstNameInput =
        document.getElementById("contactFirstName");

    const lastNameInput =
        document.getElementById("contactLastName");

    const phoneInput =
        document.getElementById("contactPhone");

    const emailInput =
        document.getElementById("contactEmail");

    const result =
        document.getElementById("addContactResult");


    if (
        !firstNameInput ||
        !lastNameInput ||
        !phoneInput ||
        !emailInput ||
        !result
    )
    {
        return;
    }


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


    const contactData =
    {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email
    };


    /*
        BACKEND/PHP ADD CONTACT CONNECTION GOES HERE
    */
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
