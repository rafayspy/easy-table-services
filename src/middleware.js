import { NextResponse } from "next/server";
import CONSTANTS from "./assets/constants";
import verifyJWT from "./utils/verifyJWT";

export async function middleware(request) {
    const path = request.nextUrl.pathname;

    // Protected Path Array::
    const protectedPaths = [
        "/dashboard/home",
        "/dashboard/category",
        "/dashboard/category/create",
        "/dashboard/menu-items",
        "/dashboard/menu-items/create",
        "/dashboard/users",
        "/pos",
        "/dashboard/orders",
        "/dashboard/orders/details",
        "/customer-dashboard"
    ];

    const adminPath = [""];

    const loginOrSignUpPath = [
        "/login",
        "/register",
    ];

    const isProtectedPath = protectedPaths.some(protectedPath => path.startsWith(protectedPath));

    const isLoginOrSignUpPath = loginOrSignUpPath.includes(path);

    const isAdminPath = path.startsWith("/dashboard");
    const isCustomerPath = path.startsWith("/customer-dashboard/home");

    //console.log("PATH : ", path);
    //console.log("isProtectedPath : ", isProtectedPath);
    //console.log("isLoginOrSignUpPath : ", isLoginOrSignUpPath);

    try {
        const token =
            request.cookies.get(CONSTANTS?.cookieName)?.value || "";
        // is token authenticated::
        const verifiedToken = await verifyJWT(
            token,
            CONSTANTS?.tokenSecret
        );

        if (isProtectedPath) {
            if (!token || !verifiedToken) {
                //console.log("it s a protected path...+");
                return NextResponse.redirect(new URL("/login", request.nextUrl));
            }
        }

        if (verifiedToken?.role === 'customer' && isAdminPath) {
            return NextResponse.redirect(
                new URL("/customer-dashboard/home", request.nextUrl)
            );
        }

        if (
            verifiedToken?.role ===
            ('admin' || 'manager') &&
            isCustomerPath
        ) {
            return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl));
        }

        if (isLoginOrSignUpPath && verifiedToken) {
            return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl));
        }
    } catch (error) {
        //console.log("ERROR :", error);
        return NextResponse.redirect(new URL("/not-found", request.nextUrl));
    }
}

export const config = {
    matcher: [
        "/dashboard",
        "/login",
        "/dashboard/:path*",
        "/register",
        "/customer-dashboard/:path*",
    ],
};
