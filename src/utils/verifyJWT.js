import { jwtVerify } from "jose";

async function verifyJWT(token, secretKey) {
  const secret = new TextEncoder().encode(secretKey);
  try {
    // Verify the JWT using the provided secret key
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    // If verification fails, an error will be thrown
    if (error.code === "ERR_JWT_EXPIRED") {
      // console.log("Token Expired!")
    }
    return null;
  }
}

export default verifyJWT;