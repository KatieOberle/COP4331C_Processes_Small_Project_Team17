

window.addEventListener("load", function()
{
    const introScreen =
        document.getElementById("introScreen");


    const mainContent =
        document.getElementById("mainContent");


    /*
        This code only runs on index.html

    */

    if (introScreen && mainContent)
    {
        setTimeout(function()
        {
            /*
                Remove the meme screen
            */

            introScreen.style.display = "none";


            /*
                Reveal the login screen
            */

            mainContent.classList.remove("hidden");


        }, 3000);
    }
});






function doLogin()
{
    let login =
        document.getElementById("loginName").value;


    let password =
        document.getElementById("loginPassword").value;



    if (login === "" || password === "")
    {
        document.getElementById("loginResult").innerHTML =
            "Please enter your username and password.";

        return;
    }



    /*
        Temporary frontend test.

    */

    document.getElementById("loginResult").innerHTML =
        "Login page works! Backend connection coming soon.";
}






function doRegister()
{
    let firstName =
        document.getElementById("firstName").value;


    let lastName =
        document.getElementById("lastName").value;


    let login =
        document.getElementById("registerLogin").value;


    let password =
        document.getElementById("registerPassword").value;



    if (
        firstName === "" ||
        lastName === "" ||
        login === "" ||
        password === ""
    )
    {
        document.getElementById("registerResult").innerHTML =
            "Please fill in all fields.";

        return;
    }



    /*
        Temporary frontend test.

    */

    document.getElementById("registerResult").innerHTML =
        "Registration page works! Backend connection coming soon.";
}







function searchContacts()
{
    const searchBox =
        document.getElementById("searchText");


    if (!searchBox)
    {
        return;
    }


    let search =
        searchBox.value;


    console.log(
        "Search request: " + search
    );
}







function logout()
{
    window.location.href = "index.html";
}

// Katie: edit contact functionality
// AI transparency: utilized Codex template and modified accordingly
const editContactTitle = document.querySelector("#edit_contact_title"); //page title

if(editContactTitle) //if page is open
{
    // User entered information
    const firstNameInput = document.querySelector("#first_name_interactive"); // First Name
    const lastNameInput = document.querySelector("#last_name_interactive"); // Last Name
    const phoneNumberInput = document.querySelector("#phone_number"); // Phone Number
    const emailInput = document.querySelector("#email"); // Email

    // Save/Cancel feature buttons
    const saveChangesButton = document.querySelector("#save_changes_button");
    const cancelChangesButton = document.querySelector("#cancel_changes_button");
    
    // starter contact information to be edited
    const originalContact =
    {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        phoneNumber: phoneNumberInput.value,
        email: emailInput.value,
    };

    function updateTitle()
    {
        // changes title to reflect new page and contact chosen to edit
        editContactTitle.textContent = `Edit Contact: ${firstNameInput.value} ${lastNameInput.value}`.trim();
    }

    // event listeners for name inputs
    firstNameInput.addEventListener("input",updateTitle);
    lastNameInput.addEventListener("input", updateTitle);

    // Katie: last updated function, assumption that we remain in same time zone
    function showLastUpdated(dateValue)
    {
        // Recommended function body by Claude Sonnet 5 Medium
        const date = new Date(dateValue);
        showLastUpdated.dateTime = date.toISOString();
        showLastUpdated.textContent = date.toLocaleString();
    }

    // Katie: save edits made, trim() for entry
    saveChangesButton.addEventListener("click", async() => 
        {
            const updatedContact = // user entered changes
            {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                phoneNumber: phoneNumberInput.value.trim(),
                email: emailInput.value.trim(),
                updatedAt: new Date().toISOString(), // record new date
            };

            // Katie: todo - implement fetch call to API endpoint
        });
    cancelChangesButton.addEventListener("click", () =>
    {
        firstNameInput.value = originalContact.firstName;
        lastNameInput.value = originalContact.lastName;
        phoneNumberInput.value = originalContact.phoneNumber;
        emailInput.value = originalContact.email;

        updateTitle(); // restore contact information
    })
}