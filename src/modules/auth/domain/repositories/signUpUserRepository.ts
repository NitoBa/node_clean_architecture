
export interface ISignUpUserRepository {
    userExists(email: string): Promise<boolean>;
    createUser(email: string, username: string, password: string): Promise<boolean>;
}