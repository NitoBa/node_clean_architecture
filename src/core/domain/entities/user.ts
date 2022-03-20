import { Entity } from "./entity";

type UserProps = {
    username: string
    email: string
}

export abstract class User extends Entity<UserProps> {
    constructor(props: UserProps, id?: string) {
       super(props, id);
    }
}