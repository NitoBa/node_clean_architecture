import { Post } from "../entities/post";
import { UserProfile } from "../entities/userProfile";
import { IPostsRepository } from "../repositories/postsRepository";
import { IProfileUserRepository } from "../repositories/userProfileRepository";
import { CreateNewPost, CreatePostRequest } from "./createNewPost";

class PostsRepositoryMock implements IPostsRepository {
    createPost(input: CreatePostRequest): Promise<Post> {
        throw new Error("Method not implemented.");
    }
    existsPost(title: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

class ProfileUserRepositoryMock implements IProfileUserRepository {
    findOne(userId: string): Promise<UserProfile> {
        throw new Error("Method not implemented.");
    }
    
}

let postRepository: IPostsRepository;
let profileUserRepository: IProfileUserRepository;
let sut: CreateNewPost;

describe('Create A New Post', () => {

    beforeEach (() => {
        profileUserRepository = new ProfileUserRepositoryMock();
        postRepository = new PostsRepositoryMock();
        sut = new CreateNewPost(postRepository, profileUserRepository);
    })

    it('should not be able to create a new post without parameters', () => {

       const response = async () => sut.execute({
           userId: '',
           title: '',
           description: '',
       });

       expect(response).rejects.toThrow('Enable to create a new post without parameters');
    })

    it('should not be able to create a new post with the same title', () => {
        
        postRepository.existsPost = jest.fn(async () => true);
 
        const response = async () => sut.execute({
            userId: 'random_id',
            title: 'my title',
            description: 'my post description',
        });
 
        expect(response).rejects.toThrow(new Error('Enable to create a new post with the same title'));
    })

    it('should not be able to create a new post to inexistent user', () => {
        postRepository.existsPost = jest.fn(async () => false);
        profileUserRepository.findOne = jest.fn(async () => null);
        
        const response = async () => sut.execute({
            userId: 'inexistent_user_id',
            title: 'my title',
            description: 'my post description',
        });
 
        expect(response).rejects.toThrow(new Error('Enable to create a new post to inexistent user'));
    })

    it('should be able to create a new post', async () => {

        const newPost = Post.create({
            title: 'my title',
            description: 'my post description',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        postRepository.existsPost = jest.fn(async () => false);
        postRepository.createPost = jest.fn(async () => newPost);
        profileUserRepository.findOne = jest.fn(async () => UserProfile.create(null));
        
        const response = await sut.execute({
            userId: 'existent_user_id',
            title: 'my title',
            description: 'my post description',
        });
 
        expect(response).toBeInstanceOf(Post)
        expect(response).toHaveProperty('id')
    })
})