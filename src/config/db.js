import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const dbURI = process.env.MONGODB_URI;

        mongoose.connect(dbURI);
        console.log("MongoDB conectado correctamente");
    } catch (error) {
        console.log("Error al conectar a MongoDB", error);
        process.exit(1);
    }
}