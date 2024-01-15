const express = require("express");
const { createpost, likepostandunlike, deletepost, getpostoffollowers, updatepost, createcomment, deletecomment } = require("../Controllers/post");
const { isAuthenticated } = require("../Middleware/Auth");
const router = express.Router();


router.route("/createpost").post( isAuthenticated  , createpost);
router.route("/createpost/:id").get( isAuthenticated,likepostandunlike)
.put(isAuthenticated,updatepost)
.delete(isAuthenticated,deletepost)

router.route("/posts").get(isAuthenticated, getpostoffollowers)
router.route("/posts/comment/:id").put(isAuthenticated, createcomment).delete(isAuthenticated, deletecomment)



module.exports =router;
