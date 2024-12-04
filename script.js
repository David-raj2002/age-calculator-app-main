// Input fields
const dayIn = document.getElementById("day");
const monthIn = document.getElementById("month");
const yearIn = document.getElementById("year");

// Output fields
const dayOut = document.getElementById("DD");
const monthOut = document.getElementById("MM");
const yearOut = document.getElementById("YYYY");

// Form element
const form = document.querySelector("form");

// Adding submit event listener to the form
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission

    // Clear previous errors
    clearErrors();

    const inputDay = parseInt(dayIn.value, 10);
    const inputMonth = parseInt(monthIn.value, 10);
    const inputYear = parseInt(yearIn.value, 10);

    let isValid = true;

    // Validate day
    if (isNaN(inputDay) || inputDay < 1 || inputDay > 31) {
        showError(dayIn, "Please enter a valid day");
        isValid = false;
    }

    // Validate month
    if (isNaN(inputMonth) || inputMonth < 1 || inputMonth > 12) {
        showError(monthIn, "Please enter a valid month");
        isValid = false;
    }

    // Validate year
    if (isNaN(inputYear) || inputYear > new Date().getFullYear() || inputYear < 1) {
        showError(yearIn, "Please enter a valid year");
        isValid = false;
    }

    // Validate complete date
    if (isValid && !isValidDate(inputDay, inputMonth, inputYear)) {
        showError(dayIn, "Enter a valid date");
        isValid = false;
    }

    if (!isValid) return;

    // Calculate age if inputs are valid
    const today = new Date();
    const birthDate = new Date(inputYear, inputMonth - 1, inputDay);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust for negative months or days
    if (ageDays < 0) {
        ageMonths -= 1;
        ageDays += new Date(inputYear, inputMonth - 1, 0).getDate();
    }
    if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
    }

    // Display the results
    yearOut.textContent = ageYears;
    monthOut.textContent = ageMonths;
    dayOut.textContent = ageDays;
}

// Helper function to validate date
function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
}

// Helper function to clear errors
function clearErrors() {
    document.querySelectorAll(".block small").forEach((small) => {
        small.textContent = ""; // Clear the error messages
    });
}

// Helper function to show error
function showError(inputElement, message) {
    const small = inputElement.nextElementSibling; // Get the corresponding <small> tag
    small.textContent = message; // Set the error message
}
