import { NextResponse } from "next/server";
import fs from "fs/promises";


export const dynamic = 'force-dynamic';


export const GET = async (req, {params:{id}}) => {
  try {
    const file = await fs.readFile(`./public/uploads/${id}`);
    return new NextResponse(file)
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/404', req.url))
  }
};

// ./public/uploads/food-items/food001.jpeg