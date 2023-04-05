let jwt=require('jsonwebtoken')

function jwttoken(id,email)
{
    
    const token = jwt.sign(
        { userId:id.toString(), emailId:email },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: process.env.JWT_ACCESS_EXPIRE  }
      );
      const refreshToken=jwt.sign(
        { userId:id.toString(), emailId:email },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: process.env.JWT_REFRESH_EXPIRE  }
      );
      return {token,refreshToken}

}
module.exports={jwttoken}