import connectToDB from "@/config/connectDb"
import User from "@/models/user.model"
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    connectToDB()
    try {
        const body = await req.json()
        const response = await User.create(body)
        return NextResponse.json({
            status: 201,
            message: "ok",
            data: response
        })
    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            const duplicateValue = error.keyValue[duplicateField];
            // console.error(`Duplicate key error: ${duplicateField} "${duplicateValue}" already exists.`);
            return NextResponse.json({
                status: 500,
                message: `'${duplicateValue}' already exists.\n\nPlease use a different ${duplicateField}.`,
            })
        } else {
            return NextResponse.json({
                status: 500,
                message: error?.message,
            })
        }

    }
}