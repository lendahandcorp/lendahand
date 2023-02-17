export const firstNameValidator = firstName => {
    if (!firstName) {
      return "First Name is required";
    } else if (firstName.length > 100) {
      return "First Name must be less then 100 chars";
    }
    return "";
  };

  export const lastNameValidator = lastName => {
    if (!lastName) {
      return "Last Name is required";
    } else if (lastName.length > 100) {
      return "Last Name must be less then 100 chars";
    }
    return "";
  };

  export const addressValidator = address => {
    if (!address) {
      return "Address is required";
    } else if (address.length > 250) {
      return "Address must be less then 250 chars";
    }
    return "";
  };

  export const telephoneNumberValidator = telephoneNumber => {
    if (!telephoneNumber) {
      return "Telephone Number is required";
    } else if (!new RegExp(/^(\(\+[0-9]{2}\))?([0-9]{3}-?)?([0-9]{3})\-?([0-9]{4})(\/[0-9]{4})?$/gm).test(telephoneNumber)) {
      return "Only Canada numbers are allowed, insert the code area before the number, the field only accept numbers.";
    }
    return "";
  };

export const emailValidator = email => {
    if (!email) {
      return "Email is required";
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
      return "Incorrect email format";
    } else if (email.length > 100) {
        return "Email must be less then 100 chars";
      }
    return "";
  };
  
  export const passwordValidator = password => {
    if (!password) {
      return "Password is required";
    } else if (password.length > 100) {
        return "Password must be less then 100 chars";
      }
    return "";
  };

  // Sample of form fields validation

  // export const idValidator = id => {
  //   if (!id) {
  //     return "ID is required";
  //   } else if (id.length > 100) {
  //     return "ID must be less then 100 chars";
  //   }
  //   return "";
  // };

  // export const numberValidator = number => {
  //   if (!number) {
  //     return "Number is required";
  //   } else if (number.length > 100) {
  //     return "Number must be less then 100 chars";
  //   }
  //   return "";
  // };

  // export const nameValidator = name => {
  //   if (!name) {
  //     return "Name is required";
  //   } else if (name.length > 100) {
  //     return "Name must be less then 100 chars";
  //   }
  //   return "";
  // };

  // export const linkValidator = link => {
  //   if (!link) {
  //     return "Link is required";
  //   } else if (link.length > 255) {
  //     return "Link must be less then 255 chars";
  //   }
  //   return "";
  // };
  
