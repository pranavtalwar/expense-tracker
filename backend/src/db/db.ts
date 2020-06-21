import mongoose from 'mongoose'

const mongodbUrl: string = 'mongodb://localhost:27017/expense-tracker'

mongoose.connect(mongodbUrl, 
    { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
)
.then(() => console.log('db connected'))