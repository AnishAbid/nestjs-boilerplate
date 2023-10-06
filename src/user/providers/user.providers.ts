import { Mongoose } from 'mongoose';
import { UserSchema } from '../schema/user.schema';

export const userProviders = [
    {
        inject: ['DATABASE_CONNECTION'],
        provide: 'USER_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('USER', UserSchema)
    },
];