// read form element
let ALL_INPUT_VALID;

const form = document.getElementById('form');
const email = document.getElementById('email');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const birthday = document.getElementById('birthday');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Please enter a valid Email address');
        ALL_INPUT_VALID = false;
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
            ALL_INPUT_VALID = false;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
        ALL_INPUT_VALID = false;
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
        ALL_INPUT_VALID = false;
    } else {
        showSuccess(input);
    }
}

// Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate form input elements
function validateForm() {
    if (!checkRequired([email, firstname, lastname, username, birthday])) {
        checkLength(lastname, 3, 20);
        checkLength(firstname, 3, 20);
        checkLength(username, 3, 50)
        checkEmail(email);
    }
}

/**
 * Make a testcall after the page is loaded
 */
window.onload = () => {
    console.log(`Make test call to the server ...`);
    getWelcome().then(
        result => {
            console.log(`Response from server: ${result}`);
        },
        error => {
            console.log(error)
        });
}


// Event listeners
form.addEventListener('submit', function (e) {
    ALL_INPUT_VALID = true;
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
    //Send data
    if (ALL_INPUT_VALID) {
        let formData = {
            email: email.value,
            firstname: firstname.value,
            lastname: lastname.value,
            username: username.value,
            birthday: birthday.value,
        }
        console.log(`All input is valid. Send data to server: 
      ${JSON.stringify(formData)}`);

       /* //Variant 1
        sendForm1(formData); */
        //Variant 2
        sendForm2(formData).then(
            result => {
                console.log(`Response from server: ${result}`);
                window.location.href = './confirm.html';
            }).catch(err => {
            console.log(`Error occurred: ${err}`)
        });
    } else {
        console.log("At least one validation failed. No data sent to contact-server.");
    }

});
