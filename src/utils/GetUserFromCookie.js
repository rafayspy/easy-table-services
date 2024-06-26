import connectToDB from "@/config/connectDb";

const { default: CONSTANTS } = require("@/assets/constants");
const { cookies } = require("next/headers");
const { default: verifyJWT } = require("./verifyJWT");
const { default: User } = require("@/models/user.model");

const GetUserFromCookie = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get(CONSTANTS.cookieName)?.value;

    try {
        const { id } = await verifyJWT(token, CONSTANTS?.tokenSecret);
        connectToDB()
        const user = await User.findOne({ _id: id }).select('-createdAt -updatedAt -__v -password');
        if (!user || !user._id) {
            throw new Error('Couldn\'t find the user');
        }
        return user ?? {};
    } catch (error) {
        console.log(error);
        // throw new Error(`Failed to get the user!`)
        return {}
    }
}

export default GetUserFromCookie