import { NextResponse } from "next/server"
import { cookies } from 'next/headers'
import CONSTANTS from "@/assets/constants"

export const POST = async (req, res) => {
    try {
        cookies().delete(CONSTANTS.cookieName)

        return NextResponse.json({
            success: true,
            message: "Log out Successfully !"
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,

        })
    }
}