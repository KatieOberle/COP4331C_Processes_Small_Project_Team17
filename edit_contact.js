// page elements
const editContactTitle = document.querySelector("#edit_contact_title");

const firstNameInput = document.querySelector("#first_name_interactive");
const lastNameInput = document.querySelector("#last_name_interactive");
const phoneNumberInput = document.querySelector("#phone_number");
const emailInput = document.querySelector("#email");

const saveChangesButton = document.querySelector("#save_changes_button");
const cancelChangesButton = document.querySelector("#cancel_changes_button");

const loadDataButton = document.querySelector("#load_data_button");
const apiOutput = document.querySelector("#api-output");

// Codex generated date updater function (9/6)
const lastUpdated = document.querySelector("#last_updated");

// store original contact information
const originalContact = {
  firstName: firstNameInput.value,
  lastName: lastNameInput.value,
  phoneNumber: phoneNumberInput.value,
  email: emailInput.value,
};

// user editing functions for filled fields
// Codex generated feature to update title as user changes name entered (9/6)
function updateTitle() {
  editContactTitle.textContent =
    `Edit Contact: ${firstNameInput.value} ${lastNameInput.value}`.trim();
}

firstNameInput.addEventListener("input", updateTitle);
lastNameInput.addEventListener("input", updateTitle);

// Codex generated date updater
function showLastUpdated(dateValue) {
  const date = new Date(dateValue);

  lastUpdated.dateTime = date.toISOString();
  lastUpdated.textContent = date.toLocaleString();
}

saveChangesButton.addEventListener("click", async () => {
  const updatedContact = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    phoneNumber: phoneNumberInput.value.trim(),
    email: emailInput.value.trim(),
    // Codex: ISO format is ideal for APIs and databases (9/6)
    updatedAt: new Date().toISOString(),
  };

  // validation before saving
  if (!updatedContact.firstName || !updatedContact.lastName) {
    apiOutput.textContent = "Please enter a first and last name.";
    return;
  }

  // Later: send updatedContact to your SwaggerHub-documented API.
  console.log("Contact ready to save:", updatedContact);
  apiOutput.textContent = "Changes are ready to save.";

  // Once your save works, navigate back to the contact manager:
  // window.location.href = "contact-manager.html";
});

cancelChangesButton.addEventListener("click", () => {
  // Put the original values back into each text box.
  firstNameInput.value = originalContact.firstName;
  lastNameInput.value = originalContact.lastName;
  phoneNumberInput.value = originalContact.phoneNumber;
  emailInput.value = originalContact.email;

  updateTitle();
  apiOutput.textContent = "Your unsaved changes were cancelled.";

  // Optional navigation:
  // window.location.href = "contact-manager.html";
});

// ===== 3. API test request =====
// Use the server URL and endpoint documented in SwaggerHub.
const API_URL = "https://jsonplaceholder.typicode.com/todos/1";

loadDataButton.addEventListener("click", async () => {
  apiOutput.textContent = "Loading…";
  loadDataButton.disabled = true;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    apiOutput.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error(error);
    apiOutput.textContent = `Could not load data. ${error.message}`;
  } finally {
    loadDataButton.disabled = false;
  }
});