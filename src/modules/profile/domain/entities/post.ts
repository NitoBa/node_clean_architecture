import { Entity } from "../../../../core/domain/entities/entity";

type PostProps = {
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Post extends Entity<PostProps> {
    private constructor(public postsProps: PostProps, public id?: string) {
        super(postsProps, id);
    }

    static create(props: PostProps, id?: string): Post {
        return new Post(props, id);
    }
}