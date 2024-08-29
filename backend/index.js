const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');


const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://shubshukla2332:Shubham123@cluster0.oa8b5xh.mongodb.net/Yourhr').then(()=>console.log("DB Connected"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    resume: String,
});

const User = mongoose.model('User', UserSchema);

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Endpoint to handle signup
app.post('/api/signup', upload.single('resume'), async (req, res) => {
    const { name, email, phone } = req.body;
    const resume = req.file.filename;

    const newUser = new User({ name, email, phone, resume });
    await newUser.save();

    res.status(201).send('User registered successfully');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
