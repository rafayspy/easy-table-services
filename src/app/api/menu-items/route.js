import connectToDB from "@/config/connectDb"
import Category from "@/models/category.model";
import MenuItems from "@/models/menuItems.model"
import { getAllMenuItems } from "@/query/query";
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export const GET = async (req, res) => {

    try {
        const menuItems = await getAllMenuItems()
        return NextResponse.json({
            status: true,
            statusCode: 200,
            data: menuItems
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            statusCode: 500,
            message: error.message
        })
    }
}