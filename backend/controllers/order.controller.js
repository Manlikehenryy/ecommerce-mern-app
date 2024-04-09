import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

export const addOrder = async (req,res)=>{
    try {
    
		const { cartItems, transactionReference} = req.body;

		for (const cartItem of cartItems) {
            const newOrder = new Order({
                cartId: cartItem._id,
                transactionReference: transactionReference,
                userId: req.user._id
            });

			await Cart.findOneAndUpdate({_id:cartItem._id, userId: req.user._id, status: "Active"},{status: "Inactive"})

            await newOrder.save();
        }

		const newOrders = await Order.find({transactionReference:transactionReference,userId: req.user._id})
		

		

		if (newOrders) {

			res.status(201).json({status: "success", data: newOrders});
		} else {
			res.status(400).json({status: "failed", error: "Invalid Order data" });
		}
	} catch (error) {
		console.log("Error in addOrder controller", error.message);
		res.status(500).json({status: "failed", error: "Internal Server Error" });
	}
}

export const getAllOrders = async (req, res) => {
	try {
		const allUserOrders = await Order.find({userId: req.user._id}).populate("cartId").sort({ createdAt: -1 });

		
        if (!allUserOrders) {
          return  res.status(404).json({status: "success", message: "No orders were found"});    
        }

		for (const order of allUserOrders) {
			await  order.cartId.populate("productId");
        }

	    return res.status(200).json({status: "success", data: allUserOrders});
	} catch (error) {
		console.error("Error in getAllOrders: ", error.message);
		res.status(500).json({status: "failed", error: "Internal server error" });
	}
};

export const updateOrder = async (req, res) => {
	try {
		const { transactionReference } = req.body;
       
	    const orders = await Order.find({userId: req.user._id, status: "Pending Payment", transactionReference})

		for (const order of orders) {
            order.status = 'Purchased';
			await order.save();
        }

		res.status(200).json({status: "success", data: orders});
	} catch (error) {
		console.error("Error in updateOrder: ", error.message);
		res.status(500).json({status: "failed", error: "Internal server error" });
	}
};
