export const firstNameValidator = function (firstName) {
  if (!firstName) {
    return 'First Name is required';
  } else if (firstName.length > 100) {
    return 'First Name must be less then 100 chars';
  }
  return '';
};

export const lastNameValidator = (lastName) => {
  if (!lastName) {
    return 'Last Name is required';
  } else if (lastName.length > 100) {
    return 'Last Name must be less then 100 chars';
  }
  return '';
};

export const addressValidator = (address) => {
  if (!address) {
    return 'Address is required';
  } else if (address.length > 250) {
    return 'Address must be less then 250 chars';
  }
  return '';
};

export const phoneValidator = (telephoneNumber) => {
  if (!telephoneNumber) {
    return 'Telephone Number is required';
  } else if (
    !new RegExp(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm
    ).test(telephoneNumber)
  ) {
    return 'Telephone number should be 000-000-0000';
  }
  return '';
};

export const emailValidator = (email) => {
  if (!email) {
    return 'Email is required';
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return 'Incorrect email format';
  } else if (email.length > 100) {
    return 'Email must be less then 100 chars';
  }
  return '';
};

export const passwordValidator = (password) => {
  if (!password) {
    return 'Password is required';
  } else if (password.length > 100) {
    return 'Password must be less then 100 chars';
  }
  return '';
};

export const titleValidator = function (title) {
  if (!title) {
    return 'Title is required';
  } else if (title.length > 100) {
    return 'Title must be less then 100 chars';
  }
  return '';
};

export const locationValidator = (location) => {
  if (!location) {
    return 'Location is required';
  }
  return '';
};

export const availabilityValidator = (availability) => {
  if (!availability) {
    return 'End Date is required';
  } else {
    const selectedDate = new Date(availability);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return 'End Date cannot be in the past';
    }
  }

  return '';
};

export const tagsValidator = (tags) => {
  if (!tags || tags.length == 0) {
    return 'Tags required';
  } else {
    let hasError = false;
    tags.forEach((element) => {
      if (element.length < 2) {
        hasError = true;
      }
    });
    if (hasError) {
      return 'Tags must be more than 1 chars';
    }
  }
  return '';
};

export const bodyValidator = (body) => {
  if (!body) {
    return 'Description is required';
  }
  return '';
};

export const peopleNeededValidator = (people_needed) => {
  if (!people_needed) {
    return 'People needed is required';
  } else if (people_needed < 1) {
    return 'People needed cannot be 0';
  }
  return '';
};

export const descriptionValidator = (des) => {
  if (des.length > 280) {
    return 'Description must be less than 280 chars';
  }
  return '';
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
