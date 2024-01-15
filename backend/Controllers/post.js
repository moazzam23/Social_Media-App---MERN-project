const post = require("../Models/Post")
const User = require("../Models/user")
const cloudinary = require ("cloudinary")
exports.createpost = async (req,res)=>{

    try {

const cloud = await cloudinary.v2.uploader.upload(req.body.image,{folder:"posts"})

   const postdata={
    caption: req.body.caption,
    image:{
        public_id:cloud.public_id,
        url:cloud.secure_url,
    },
    users:req.user._id

   };
   const newpostdata = await post.create(postdata)
   const user = await User.findById(req.user._id) 
user.posts.unshift(newpostdata._id);

await user.save();

   res.status(201).json({
    success:true,
   message:"Post Created",
   })   
   
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}

exports.likepostandunlike = async (req,res)=>{
    try {
        const newpost = await post.findById(req.params.id)
 
        if(!newpost){
            return res.status(404).json({
                success:false,
                message:"Not Found"
            })
        }

        if(newpost.likes.includes(req.user._id)){
            const index = newpost.likes.indexOf(req.user._id);
            newpost.likes.splice(index,1);

            await newpost.save();
        return res.status(200).json({
            success:true,
            message:"Post Unlike"
        })
        }
else{

    newpost.likes.push(req.user._id)
    await newpost.save();
        return res.status(200).json({
            success:true,
            message:"Post liked"
        })
}


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deletepost= async (req,res)=>{

    try {
        const findpost = await post.findById(req.params.id);
        console.log('Post ID:', req.params.id);
        if(!findpost){
            return res.status(404).json({
                success:false,
                message:"Post Not Found"
            })
        }

        if(findpost.users._id.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }

        await cloudinary.v2.uploader.destroy(findpost.image.public_id)


await findpost.deleteOne();

const user = await User.findById(req.user._id);
const index = await user.posts.indexOf(req.user._id)
user.posts.splice(index, 1);

await user.save();
res.status(200).json({
    success:true,
    message:"Post deleted Successfully"
})


    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}


exports.getpostoffollowers= async (req,res)=>{

    try {

        const usernew = await User.findById(req.user._id);
  
        const postnew = await post.find({
            users:{ $in: usernew.following}

        }).populate("users likes comments.user")

      res.status(200).json({
        success:true,
        postnew:postnew.reverse(),
      })  
        

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updatepost= async (req,res)=>{
    try {

        const findpost = await post.findById(req.params.id);
        if(!findpost){
            return res.status(404).json({
                success:false,
                message:"Post Not Found"
            })
        }

        if(findpost.users.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }

        findpost.caption=req.body.caption,
        await findpost.save();
        res.status(200).json({
            success:true,
            message:"Post Caption Updated Successfully"
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.createcomment= async (req,res)=>{
    try {

        const postc = await post.findById(req.params.id);

        if(!postc){
            return res.status(404).json({
                success:false,
                message:"Post Not Found"
            });
        }

        let commentindex= -1;
        

        postc.comments.forEach((item,index)=>{
            if(item.user.toString() == req.user._id.toString()){
                commentindex=index;
            }
        })

        if (commentindex !== -1) {

            postc.comments[commentindex].comment=req.body.comment;

            await postc.save();
          return  res.status(200).json({
                success:true,
                message:"Comment Updated"
            })
            
        } else {
         postc.comments.push({
               user:req.user._id,
                comment:req.body.comment,
    
            })
        await postc.save();
        return  res.status(200).json({
                success:true,
                message:"Commented Successfully"
            })

        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.deletecomment = async (req,res)=>{
    try {

        const posts = await post.findById(req.params.id);

        if(!posts){
            return res.status(404).json({
                success:false,
                message:"Post Not found",
            })
        }
        

        if (posts.users.toString()== req.user._id.toString()) {

 if(req.body.commentId === undefined){
    return res.status(400).json({
        success:false,
        message: "Comment Id is Required"
    })
 }

            posts.comments.forEach((item,index)=>{
                if (item._id.toString()== req.body.commentId.toString()) {
return posts.comments.splice(index,1)
                }
            })
await posts.save();
return res.status(200).json({
    success:true,
    message:"selected Comments has Deleted Successfully"
})
            
        } else {
             
            posts.comments.forEach((item,index)=>{
                if (item.user.toString()== req.user._id.toString()) {
return posts.comments.splice(index,1)
                }
            })
await posts.save();
return res.status(200).json({
    success:true,
    message:"Your Comment Deleted Successfully"
})

        }


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}