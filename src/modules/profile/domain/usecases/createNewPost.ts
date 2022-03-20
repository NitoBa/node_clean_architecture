import { Post } from "../entities/post";
import { IPostsRepository } from "../repositories/postsRepository";
import { IProfileUserRepository } from "../repositories/userProfileRepository";

export type CreatePostRequest = {
    userId: string,
    title: string;
    description: string;
}


export class CreateNewPost {
    constructor(
        private readonly postsRepository: IPostsRepository, 
        private readonly userProfileRepository: IProfileUserRepository
    ) {}

    async execute(input: CreatePostRequest): Promise<Post> {
        const { userId, title, description } = input

        if (!userId || !title || !description) {
            throw new Error('Enable to create a new post without parameters')
        }

        const alreadyExistsPost = await this.postsRepository.existsPost(title);

        if (alreadyExistsPost) {
            throw new Error('Enable to create a new post with the same title')
        }

        const alreadyExistsUser = await this.userProfileRepository.findOne(userId);

        if (!alreadyExistsUser) {
            throw new Error('Enable to create a new post to inexistent user')
        }

        return await this.postsRepository.createPost({ userId, title, description })
    }
    
}