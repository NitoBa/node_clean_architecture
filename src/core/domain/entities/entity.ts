import { randomUUID } from 'crypto';

abstract class Entity<T> {
    protected _id: string;
    protected _props?: T;

    constructor(props: T, id?: string) {
        this._props = props;
        this._id = id ?? randomUUID();
    }
}

export { Entity };
