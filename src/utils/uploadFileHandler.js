
import CONSTANTS from "@/assets/constants";
import fs from "fs/promises"; // Import the fs module
import path from "path";

/*
!call this function like this:
const uploadedLink = await uploadFileHandler(avatar,["png","jpg","jpeg",""],"/public/uploads/")
*/

const uploadFileHandler = async (
    file,
    destination_path,
    title
) => {
    try {


        const fileName = file?.name.replaceAll(/[^a-zA-Z0-9._-]+/g, '')

        const publicPath = path.join(
            process.cwd(),
            "public",
            destination_path,
            fileName
        );

        const fileData = await file.arrayBuffer(); // Read file data as ArrayBuffer
        await fs.writeFile(publicPath, Buffer.from(fileData)); // Convert ArrayBuffer to Buffer and write to file

        const imageUrl = `${CONSTANTS?.baseUrl + "/api" + "/" + destination_path+ "food-items/" + fileName
            }`;
        return imageUrl;
    } catch (error) {
        // console.log(error);
        throw new Error("Failed to upload file: " + error.message);
    }
};

export default uploadFileHandler;