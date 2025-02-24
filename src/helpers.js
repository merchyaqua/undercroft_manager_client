// Loop through the form to check that all required entries are filled
export function checkFormRequiredFilled(requiredFields, formData) {
    for (const field of requiredFields) {
      if (formData[field] === null || formData[field] === "") {
        return false;
      }
    }
    return true;
  }