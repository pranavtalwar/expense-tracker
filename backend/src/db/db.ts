import mongoose from 'mongoose'
const mongodbUrl: string = process.env.MONGODB_URL as string

mongoose.connect(mongodbUrl, 
    { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
)
.then(() => console.log('db connected'))