import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) {
        return console.log('MONGODB_URL NOT FOUND');
    }
    if(isConnected) {
        return console.log("Already connected to MongoDB");
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName: "Threads",
        });

        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Connection to MongoDB failed: ${error}`);
    }
}
