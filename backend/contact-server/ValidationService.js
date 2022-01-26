// Validate form input elements
const validateLib = require('./ValidationLib');

/**
 * Validate form data
 * @param data
 * @returns {boolean|{msg: string, isNotValid: boolean}|{isNotValid}|*}
 */
function validateFormData(data) {
    // Check required fields
    let result = validateLib.checkRequired("firstname", data.firstname);
    if (result.isNotValid) { return result; }

    result = validateLib.checkLength("lastname", data.lastname, 2, 25);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("username", data.username);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("birthday", data.birthday);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("email", data.email);
    if (result.isNotValid) { return result; }

    //check length
    result = validateLib.checkLength("firstname", data.firstname, 3, 25);
    if (result.isNotValid) { return result; }

    result = validateLib.checkLength("lastname", data.lastname, 3, 25);
    if (result.isNotValid) { return result; }

    result = validateLib.checkLength("username", data.username, 3, 25);
    if (result.isNotValid) { return result; }

    //check email syntax
    result = validateLib.checkEmail("email", data.email);
    if (result.isNotValid) { return result; }

    //all inputs are valid and isNotValid=false
    return false;
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT beackets!
 */
module.exports = {
    validateContact: validateFormData
}
