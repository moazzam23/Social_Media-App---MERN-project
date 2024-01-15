 const app = require("./app")
 const {connectDatabase } =require("./Config/database")
const cloudinary = require("cloudinary")
 connectDatabase();

 cloudinary.config({
   cloud_name: "dmeo8x516",
   api_key: "428639828469285",
   api_secret: "tlpA2-qvN65gDCstoVitwxUWd7c",
 });

 app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
 })