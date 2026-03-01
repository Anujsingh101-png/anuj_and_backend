import { v2 as cloudinary } from 'cloudinary';
   
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD-NAMES, 
        api_key:process.env.CLOUDINARY_API_KEYS, 
        api_secret:process.env.CLOUDINARY_API_SECREAT
    });

const uploadonCloudinary = async(localfilepath) => {
    try {
        if(!localfilepath)
            return null
        // uploading
       const response = cloudinary.uploading.upload(localfilepath,{
            resource_type : "auto"
        })
        console.log("file had been uploaded successfully",response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localfilepath)  // if any error is created in file during uploadtion it automatically deleated that file from our local server
    }
}

export {cloudinary}