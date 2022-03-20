import { Validators } from "../../../../core/utils/validators";
import { ISignUpUserRepository } from "../repositories/signUpUserRepository";

type SignUpNewUserRequest = {
    username: string;
    email: string;
    password: string;
}
export class SignUpNewUser {

    constructor(private readonly signUpUserRepository: ISignUpUserRepository) {}

    async execute(input: SignUpNewUserRequest): Promise<void> {
        const { username, email, password } = input;
        if (!username || !email || !password) {
            throw new Error('Please inform the parameters to create a new user')
        }

        if (!Validators.isEmail(email)) {
            throw new Error('Please inform an email valid')
        }

        const userAlreadyExists = await this.signUpUserRepository.userExists(email);

        if (userAlreadyExists) {
            throw new Error('User already exists')
        }

        const isCreated = await this.signUpUserRepository.createUser(email, username, password);

        if (!isCreated) {
            throw new Error('Error to create a new user, please try again')
        }
    }
}