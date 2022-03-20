import { UserProfile } from "../entities/userProfile";

export interface IProfileUserRepository {
    findOne(userId: string): Promise<UserProfile | null>;
}