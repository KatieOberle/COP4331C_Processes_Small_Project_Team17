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
    */

    console.log(
        "Login request ready:",
        loginData
    );
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

    console.log(
        "Registration request ready:",
        registerData
    );
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

    console.log(
        "Search request ready:",
        searchData
    );
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

    console.log(
        "Add contact request ready:",
        contactData
    );
}



function editContact(contactId)
{
    /*
        BACKEND/PHP EDIT CONTACT CONNECTION GOES HERE
    */

    console.log(
        "Edit contact ID:",
        contactId
    );
}



function deleteContact(contactId)
{
    /*
        BACKEND/PHP DELETE CONTACT CONNECTION GOES HERE
    */

    console.log(
        "Delete contact ID:",
        contactId
    );
}



function logout()
{
    /*
        BACKEND/PHP LOGOUT OR SESSION CLEAR

    */

    window.location.href = "index.html";
}
