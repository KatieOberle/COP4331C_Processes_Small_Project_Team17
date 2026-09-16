

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

async function addContact()
{
  //pull needeed contact data name,email,phone
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email =  document.getElementById("email").value.trim();
    let phoneNumber =  document.getElementById("phoneNumber").value.trim();


    // Copied strict equality from php 
   // asks for fname+lname and either email/pass
    if (  firstName === "" ||    lastName === "" ||
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
            phoneNumber: phoneNumber
          });
      
        const data = await response.json();
      //Will check and send specific http server side errors like 500 internal error ect
        if (!response.ok)
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
