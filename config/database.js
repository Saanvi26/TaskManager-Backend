import mongoose from "mongoose";
const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then((con) => console.log(`Database Connected ${con.connection.host}`))
        .catch((err)=>console.log(`Error connecting to the database ${err}`))
}
export default connectDatabase;