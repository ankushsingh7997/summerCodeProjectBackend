const services = require("../../services/userServices/userservice");
const {isValidName,passwordVal,checkFormat, isValidImage,
} = require("../../utils/validation/validation");
const bcrypt = require("bcrypt");
const uploadFile = require("../../aws/aws");




const userUpdate=async (req,res)=>{

    try{
    let{name,password,confirmPassword}=req.body;
    console.log(req.body)
    let user = {};
    name=checkFormat(name)
    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "please check your name" })

    if (!isValidName(name))
        return res
          .status(400)
          .send({ status: false, message: "pass valid name" });
      user.name = name.toLowerCase();


      // password section
       if(password&&!confirmPassword) return res.status(400).send({status:false,message:'confirm password is required'})
       if(!password&&confirmPassword) return res.status(400).send({status:false,message:'password is required'})
       if(password&&confirmPassword){
      password=checkFormat(password)
      if (!password)return res.status(400).send({ status: false, message: "please check your password" })
      confirmPassword=checkFormat(confirmPassword)
      if (!confirmPassword)return res.status(400).send({ status: false, message: "please check your confirm password" })

      if(password!=confirmPassword) return res.status(400).send({status:false,message:"confirm password does not match with password"})

      if (!passwordVal(password))
      return res
      .status(400)
      .send({ status: false, message: "pass valid password" });
  
      //hash user entered password
      user.password =  await bcrypt.hash(password, password.length);
       }


      // image update
      if (req.files.length > 0) 
      {
        user.files = req.files;
  
        if(user.files[0]&&!isValidImage(user.files[0].originalname))
        {
          return res.status(400).send({status: false,message:"Image format is Invalid please provide .jpg or .png or .jpeg format",});
        }
        else
        {
          let uploadImageUrl=await uploadFile(user.files[0]);
          user.profileImage=uploadImageUrl;
        }
  
      }
console.log(req.params.userId)
      const updateUser=await services.updateData(req.params.userId,user)
      console.log(updateUser)
      return res.status(200).send({status:true,data:updateUser})
    }
    catch(err)
    {
        return res.status(500).send({status:false,message:err.message})
    }

}
module.exports={userUpdate}