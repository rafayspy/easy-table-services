import CONSTANTS from "@/assets/constants"
import connectToDB from "@/config/connectDb"
import User from "@/models/user.model"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken";

connectToDB()

export const POST = async (req, res) => {
    try {
        const { username, password } = await req.json();
        // console.log(username, password);

        const user = await User.find({
            $or: [
                { number: username },
                { email: username }
            ]
        })
        if(user?.length< 1){
            return NextResponse.json({
                status: 401,
                message: "No user found !",
            })
        }
        // check password :
        const isValidPassword = await user[0].password === password;

        if (!isValidPassword) {
            return NextResponse.json({
                status: 401,
                message: "Invalid password",
            })
        }

        const token = jwt.sign(
            {
                id: user[0]?._id,
                email: user[0]?.email,
                name: user[0]?.fullName,
                role: user[0]?.role,
            },
            CONSTANTS.tokenSecret
        );

        //   send Response to client::
        const response = NextResponse.json(
            {
                success: true,
                id: user[0]._id, // user ID
                role: user[0].role, // USER'S ROLE
                token: token
            },
            {
                status: 200,
            }
        );

        response.cookies.set(CONSTANTS.cookieName, token, {
            httpOnly: true,
            signed: true,
        });

        return response;
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message,
        })
    }
}