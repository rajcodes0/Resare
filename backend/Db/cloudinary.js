import { v2 as cloudinary } from 'cloudinary';
import fs from fs
import dotenv from'dotenv'
dotenv.config()

     cloudinary.config({ 
        cloud_name: 'process.env.CLOUD_NAME', 
        api_key: 'process.env.CLOUDINARY_API_KEY', 
        api_secret: 'CLOUDINARY_API_SECRET' // Click 'View API Keys' above to copy your API secret
        
    });


    const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null;
        const response = await(cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        }))
        console.log("file Upload",response)
        return response.url
    } catch (error) {
        fs.unlinksync(localFilePath)
        return null;
        
    }

}


export {uploadOnCloudinary}

   
    
   