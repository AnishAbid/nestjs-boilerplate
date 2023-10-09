import * as mongoose from 'mongoose';
import { UserSchema } from 'src/schemas/user.schema';
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
    await mongoose.connect(process.env.MONGO_SERVER_LOCAL, {
      autoIndex:true,
      autoCreate:true
    })
  },
  /* {
    inject: ['DATABASE_CONNECTION'],
    provide: 'USER_MODEL',
    useFactory: (mongoose: mongoose.Mongoose) => mongoose.model('User', UserSchema)
}, */
];
