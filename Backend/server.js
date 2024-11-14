const express = require('express');
const cors = require('cors');

const dotenv = require("dotenv");
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const docRoutes = require('./src/routes/docRoutes');

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());

connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/doc', docRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})
