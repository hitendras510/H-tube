 import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

 const registerUser = asyncHandler( async (req,res)=> {
    const {fullName,username,email,password} = req.body

    //validation
    if(
        [fullName,username,email,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All Fields are required")
    }

     const existedUser = await username.findOne({
        $or: [{username}, {email}]
     })
 if (existedUser) {
   throw new ApiError(401, "User already exists")
 }
 
 const avatarLocalPath = req.files?.avatar[0]?.path
 const coverLocalPath = req.files?.coverImage[0]?.path

 if (!avatarLocalPath) {
      throw new ApiError(402, "avatar file is missing")
 }

const avatar = await uploadOnCloudinary(avatarLocalPath)
let coverImage= ""
if (coverImage) {
    
coverImage = await uploadOnCloudinary(coverImage)
}

const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

await User.finById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user")
}

return res
.status(201)
.json( new ApiResponse(200, createdUser,"User registration successfull"))


})




 export {
    registerUser
 }