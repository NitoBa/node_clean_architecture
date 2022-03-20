import { ISignUpUserRepository } from "../repositories/signUpUserRepository";
import { SignUpNewUser } from "./signUpNewUser";

class SignUpUserRepositoryMock implements ISignUpUserRepository {
    createUser(email: string, username: string, password: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async userExists(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

let signUpUserRepository: ISignUpUserRepository;

describe('Sing Up a New User', () => {
    beforeEach(() => {
        signUpUserRepository = new SignUpUserRepositoryMock()
    });


    it('should not be able to create a new user without parameters', async () => {
        const sut = new SignUpNewUser(signUpUserRepository);

        const response = async () => sut.execute({
            email: "",
            username: "",
            password: "",
        });

        expect(response).rejects.toThrow(new Error('Please inform the parameters to create a new user'))
    })


    it('should not be able to create a new user with invalid email', async () => {
        const sut = new SignUpNewUser(signUpUserRepository);

        const response = async () => sut.execute({
            email: "invalid_email",
            username: "username",
            password: "password",
        });

        expect(response).rejects.toThrow(new Error('Please inform an email valid'))
    })

    it('should not be able to create a new user if already exists', async () => {

        signUpUserRepository.userExists = jest.fn(async () => true);

        const sut = new SignUpNewUser(signUpUserRepository);

        const response = async () => sut.execute({
            email: "email@gmail.com",
            username: "username",
            password: "password",
        });

        expect(response).rejects.toThrow(new Error('User already exists'))
    })

    it('should be returned an error if user not created', async () => {

        signUpUserRepository.userExists = jest.fn(async () => false);
        signUpUserRepository.createUser = jest.fn(async () => false);

        const sut = new SignUpNewUser(signUpUserRepository);

        const response = async () => sut.execute({
            email: "email@gmail.com",
            username: "username",
            password: "password",
        });

        expect(response).rejects.toThrow(new Error('Error to create a new user, please try again'))
    })

    it('should be able to create a new user', async () => {

        signUpUserRepository.userExists = jest.fn(async () => false);
        signUpUserRepository.createUser = jest.fn(async () => true);

        const sut = new SignUpNewUser(signUpUserRepository);

        const response = await sut.execute({
            email: "email@gmail.com",
            username: "username",
            password: "password",
        });

        expect(response).not.toBe(new Error())
        expect(response).toBe(undefined)
    })
})