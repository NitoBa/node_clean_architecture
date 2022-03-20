import { User } from "../../../../core/domain/entities/user";
import { Post } from "./post";

type UserProfileProps = {
    username: string;
    email: string;
    posts: Post[];
}

export class UserProfile extends User {
    private constructor(public userProfileProps: UserProfileProps, id?: string) {
        super(userProfileProps, id);
    }

    static create(userProfileProps: UserProfileProps, id?: string): UserProfile {
        return new UserProfile(userProfileProps, id);
    }

}