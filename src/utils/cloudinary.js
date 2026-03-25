import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// config
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadonCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null;

        console.log("Uploading file:", localfilepath);

        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        });

        console.log("Uploaded successfully:", response.url);

        // delete local file after upload
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }

        return response;

    } catch (error) {
        console.log("Cloudinary error:", error);

        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }

        return null;
    }
};

export { uploadonCloudinary };