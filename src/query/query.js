import connectToDB from "@/config/connectDb"
import Category from "@/models/category.model"
import MenuItems from "@/models/menuItems.model"
import Order from "@/models/order.model"
import User from "@/models/user.model"
import { cache } from 'react'

connectToDB()

export const getAllCategories = cache(async () => {
    try {
        const res = await Category.find()
        return res
    } catch (error) {
        throw new Error(error.message)
    }
})

export const getAllMenuItems = cache(async () => {
    try {

        const res = await MenuItems.find({})
            .populate({
                path: "category",
                model: Category,
                select: "-createdAt -updatedAt -__V -_id"
            })

        return res
    } catch (error) {
        console.error(error)
        throw new Error(error.message)
    }
})

export const getAllOrders = cache(async () => {
    try {
        const orders = await Order.find()
        return orders
    } catch (error) {
        throw new Error(error?.message)
    }
})

export const getOrdersByUserId = cache(async (userID) => {
    try {
        const orders = await Order.find({
            OrderedBy: userID
        })
        return orders
    } catch (error) {
        throw new Error(error?.message)
    }
})

export const getOrderById = cache(async (id) => {
    try {
        const orders = await Order.findOne({ _id: id })
        return orders
    } catch (error) {
        throw new Error(error?.message)
    }
})

// Users ::
export const getAllUsers = cache(async () => {
    try {
        const allUsers = await User.find()
        return allUsers
    } catch (error) {
        throw new Error(error.message)
    }
})