const userCustomerSchema =  require("../Models/customerUser")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

const JWTSECRET = "HGRrwEJYTGU75hg346htfFDG657nbnfewgfjhLkiutygu?jgdj}P"

const storage = new  multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./uploads")
    },
    filename: (req, file, cb)=>{
        cb(null, "image-"+ Date.now() + path.extname(file.originalname))
    }
})

const uploads = multer({
    storage: storage,
}).single("imageurl");

exports.customerUserRegister = async(req, res)=>{
    uploads(req, res, async (err) =>{
        if(err) {
            res.status(500).json({message: err.message});
        }
        try {
            const {name, email, phone, password} = req.body;

            const imageurl = req.file ? req.file.path : "/uploads/default.jpg";
    
            const hashedPassword = await bcrypt.hash(password,10)
            const insertCustomer = new userCustomerSchema({name, email, phone, password: hashedPassword, imageurl});
            await insertCustomer.save();
    
            res.status(200).json({message: "Success to register customer User✅", customer: insertCustomer})
        }catch(error){
            res.status(500).json({message: error.message});
        }
    })
    

};

exports.userCustomerLogin = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const {email, password} = req.body;
        console.log("email: " + email + " password: " + password);
    
        const checkUser = await userCustomerSchema.findOne({email});
        if(!checkUser) {
            return res.status(404).json({message: "emial or password not incorrect 😭"});
        }
        const isMatch = await bcrypt.compare(password, checkUser.password);
        if(!isMatch) {
            return res.status(404).json({message: "Your credentials are incorrect 😭"});
        }

        const token = jwt.sign({user_id: checkUser._id}, JWTSECRET,{expiresIn: "2d"});
        return res.status(200).json({message: "Success Login✅", token, checkUser});
    }catch(error) {
        return res.status(500).json({message: error.message});
    }

};