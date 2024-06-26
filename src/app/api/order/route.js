import CONSTANTS from "@/assets/constants";
import connectToDB from "@/config/connectDb"
import Order from "@/models/order.model";
import { calculateSubtotal } from "@/utils/helpers";
import verifyJWT from "@/utils/verifyJWT";
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    connectToDB()
    try {

        const { cartData, cvv, cardExpire, cardNumber, customerNumber, customerName } = await req.json();

        if (cartData.length <= 0) {
            throw new Error("Please Select Items to place an order!")
        }
        // Verify Token From cookies::
        const loginToken =
            req.cookies.get(CONSTANTS?.cookieName)?.value || "";

        const verifiedToken = await verifyJWT(
            loginToken,
            CONSTANTS?.tokenSecret
        );
        // console.log(verifiedToken);

        // If user is not authenticated return error::
        if (!verifiedToken || !verifiedToken.id || !verifiedToken.role) {
            return NextResponse.json(
                {
                    message: "User is not authenticated!!!",
                },
                {
                    status: 401,
                }
            );
        }

        const subTotalPrice = calculateSubtotal(cartData);
        const vat = subTotalPrice * 10 / 100;
        const payableAmount = Math.ceil(vat + subTotalPrice);

        const response = await Order.create({
            orderItems: cartData,
            cvv,
            cardExpire,
            cardNumber,
            customerNumber,
            customerName,
            subTotalPrice,
            vat,
            payableAmount,
            OrderedBy: verifiedToken?.id
        })

        // console.log(response)

        return NextResponse.json({
            success: true,
            statusCode: 200,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            statusCode: 500,
            message: error.message
        })
    }

}