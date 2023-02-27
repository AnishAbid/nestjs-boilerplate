import { Mongoose } from 'mongoose';
import { PostSchema } from '../schema/post.schema';

export const postProviders = [
    {
        inject: ['DATABASE_CONNECTION'],
        provide: 'POST_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('Post', PostSchema)
    },
];
