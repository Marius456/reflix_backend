import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://root:6tZvkrHivlVPKdaA@moviedb.k5nwilw.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err: any) => {
        console.log(err);
    })