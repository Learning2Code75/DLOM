import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'


import orderRoutes from './routes/orders.js'


const app = express();

app.use('/orders',orderRoutes)


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

const MONGO_URL = "mongodb://localhost:27017/dlom"
const PORT = process.env.PORT || 5000
mongoose.connect(MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
  console.log("Connected to mongodb")
  app.listen(PORT,()=>{
    console.log(`Server running on port : ${PORT}`)
  })
}).catch((err)=>console.log(err));
