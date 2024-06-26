'use server'
import path from 'path';
import fs from "fs";
import connectToDB from "@/config/connectDb"
import Category from "@/models/category.model"
import MenuItems from "@/models/menuItems.model"
import Order from "@/models/order.model"
import User from "@/models/user.model"
import uploadFileHandler from "@/utils/uploadFileHandler"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

connectToDB()

export const addCategory = async (formData) => {
    
    try {
        const { categoryName } = Object.fromEntries(formData)
        await Category.create({ categoryName })
        revalidatePath(`/dashboard/category`)
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
    redirect('/dashboard/category')
}


export const deleteCategory = async (id) => {
    
    try {
        await Category.findByIdAndDelete(id)
        revalidatePath(`/dashboard/category`)
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}


export const addMenu = async (formData) => {
    
    try {
        const { title, price, description, itemCode, img, category } = Object.fromEntries(formData)
        // Img upload
        // Save File to DB::
        const fileURL = await uploadFileHandler(
            img,
            "uploads/",
            title,
        );
        console.log(fileURL)

        const res = await MenuItems.create({ title, price, description, itemCode, category, image: fileURL })

        revalidatePath(`/dashboard/menu-items`)

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
    redirect('/dashboard/menu-items')
}

//* Delete Img From Server::
export const deleteFile = async (imageUrl ,folderPath ) => {
    const imgPath = path.basename(imageUrl);
    const fullPath = `${folderPath}${imgPath}`;
    try {
        // Check if the file exists 
        if (fs.existsSync(fullPath)) {
            // File exists, proceed with deletion
            fs.unlinkSync(fullPath);
            console.log("File deleted successfully");
        } else {
            console.log("File does not exist, nothing to delete");
        }
    } catch (unlinkError) {
        console.error(`Error deleting file ${imgPath}:`, unlinkError);
    }
}

export const deleteMenuItem = async (id) => {
    try {
        const res = await MenuItems.findByIdAndDelete(id)
        await deleteFile(res.image, 'public/uploads/')
        revalidatePath(`/dashboard/menu-items`)
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
export const deleteUser = async (id) => {
    try {
        const res = await User.findByIdAndDelete(id)
        revalidatePath(`/dashboard/users`)
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
export const makeAdmin = async (id) => {
    try {
        const res = await User.findByIdAndUpdate(id, {
            $set: {
                'role': 'admin'
            }
        })
        revalidatePath(`/dashboard/users`)

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
export const makeCustomer = async (id) => {
    try {
        const res = await User.findByIdAndUpdate(id, {
            $set: {
                'role': 'customer'
            }
        })
        revalidatePath(`/dashboard/users`)
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const changeOrderStatus = async (id, status) => {
    try {
        await Order.findByIdAndUpdate(id, {
            $set: {
                orderStatus: status
            }
        })
        revalidatePath(`/dashboard/orders/details/${id}`)
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}