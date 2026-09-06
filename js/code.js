

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

