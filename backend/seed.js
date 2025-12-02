import User from "./models/User.model.js";
import connectDB from "./db/connection.js";
import ApiError from "./utils/ApiError.js";

const register = async () =>{
    try {
        connectDB();
        const newUser = new User({
            name: "admin",
            email: "admin@gmail.com",
            password: "admin",
            role: "admin"
        });
       
        const userCreated = await newUser.save();

        if(!userCreated){
            throw new ApiError(500, "Could not create Admin user");
        }

        console.log("Admin user created successfully");

    } catch (error) {
        console.log("could not create user : ", error)
    }
}

register(); // D:\inventory_management_system\backend> node --env-file=.env seed.js