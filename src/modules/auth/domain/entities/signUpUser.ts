import { User } from "../../../../core/domain/entities/user";

type SignUpUserProps =  {
    email: string;
    username: string;
    password: string;
}

export class SignUpUser extends User {
    private constructor(public readonly userProps: SignUpUserProps, id?: string) {
        super(userProps, id);
    }

    static create(props: SignUpUserProps, id?: string): SignUpUser {
        return new SignUpUser(props, id);
    }
}