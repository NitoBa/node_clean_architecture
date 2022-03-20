import { Post } from "../entities/post"
import { CreatePostRequest } from "../usecases/createNewPost"

export interface IPostsRepository {
    existsPost(title: string): Promise<boolean>
    createPost(input: CreatePostRequest): Promise<Post>
}