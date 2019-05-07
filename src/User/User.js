export class User {
  constructor(age, email, firstname, lastname) {
    this.age = age;
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;

  }

  isValid() {
    const { age, email, lastname, firstname } = this;
    const regexEmail = new RegExp(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/);

    if (email == null || !regexEmail.test(email)) {
      return false;
    }

    if (lastname == null || firstname == null) {
      return false;
    }

    if (age <= 13) {
      return false;
    }

    return true;
  }
}
