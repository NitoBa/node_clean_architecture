const regexToValidateEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

export class Validators {
    static isEmail = (email: string): boolean => regexToValidateEmail.test(email)
}