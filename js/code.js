window.addEventListener("load", function()
{
    const introScreen = document.getElementById("introScreen");
    const mainContent = document.getElementById("mainContent");

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
    const loginInput = document.getElementById("loginName");
    const passwordInput = document.getElementById("loginPassword");
    const result = document.getElementById("loginResult");

    if (!loginInput || !passwordInput || !result)
    {
        return;
    }

    const login = loginInput.value.trim();
    const password = passwordInput.value;

    result.innerHTML = "";

    if (login === "" || password === "")
    {
        result.innerHTML = "Please enter your username and password.";
        return;
    }

    const loginData =
    {
        login: login,
        password: password
    };

    /*
        BACKEND/PHP LOGIN CONNECTION GOES HERE

    */

    console.log("Login request ready:", loginData);
}


function doRegister()
{
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const loginInput = document.getElementById("registerLogin");
    const passwordInput = document.getElementById("registerPassword");
    const result = document.getElementById("registerResult");

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

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const login = loginInput.value.trim();
    const password = passwordInput.value;

    result.innerHTML = "";

    if (
        firstName === "" ||
        lastName === "" ||
        login === "" ||
        password === ""
    )
    {
        result.innerHTML = "Please fill in all fields.";
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
\
    */

    console.log("Registration request ready:", registerData);
}


function searchContacts()
{
    const searchInput = document.getElementById("searchText");

    if (!searchInput)
    {
        return;
    }

    const search = searchInput.value.trim();

    const searchData =
    {
        search: search
    };

    /*
        BACKEND/PHP SEARCH CONNECTION GOES HERE

        
    */

    console.log("Search request ready:", searchData);
}


function addContact()
{
    /*
        BACKEND/PHP ADD CONTACT CONNECTION GOES HERE

    
    */

    console.log("Add contact ready for backend connection.");
}


function editContact(contactId)
{
    /*
        BACKEND/PHP EDIT CONTACT CONNECTION GOES HERE

        
    */

    console.log("Edit contact ID:", contactId);
}


function deleteContact(contactId)
{
    /*
        BACKEND/PHP DELETE CONTACT CONNECTION GOES HERE

        
    */

    console.log("Delete contact ID:", contactId);
}


function logout()
{
    /*
        BACKEND/PHP LOGOUT
       
    */

    window.location.href = "index.html";
}
