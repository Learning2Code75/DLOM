import Order from '../models/order.js'


export const getOrders = async(req,res)=>{

  try{
    const orders = await Order.find();
    console.log(orders)
    res.status(200).json(orders)
  }catch(err){
    res.status(404).json({message:error.message})
  }


}

export const createOrder = async(req,res)=>{
  const order = req.body;

  const newOrder = new Order(order);


  try{
    await newOrder.save();
    res.status(201).json(newOrder);
  }catch(err){
    res.status(409).json({message:error.message})
  }
}
