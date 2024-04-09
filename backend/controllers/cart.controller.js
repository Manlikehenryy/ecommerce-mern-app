import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req,res)=>{
    try {
    
		const { productId, updatedNoOfItems} = req.body;

		const product = await Product.findOne({ _id: productId });

		if (!product) {
			return res.status(400).json({status: "failed", error: "Invalid product id" });
		}

		const existingCartItem = await Cart.findOne({productId: productId,userId: req.user._id,status:"Active"});

		
		if (updatedNoOfItems && existingCartItem) {
			//if it's more than max 
			if (updatedNoOfItems > 10) {
			    return res.status(400).json({status: "failed", error: "Maximum no per item is 10" });
			}
			else{
				existingCartItem.noOfItem = updatedNoOfItems;
				existingCartItem.price = existingCartItem.noOfItem * Number(product.price);
				existingCartItem.save();	
			}

			    return res.status(201).json({status: "success", data: existingCartItem});  
        }


        if (existingCartItem) {
			//if it's equal to max == 10
			if (existingCartItem.noOfItem > 9) {
			    return res.status(400).json({status: "failed", error: "Maximum no per item is 10" });
			}
			else{
				existingCartItem.noOfItem += 1;
				existingCartItem.price = existingCartItem.noOfItem * Number(product.price);
				existingCartItem.save();			
			}

			    return res.status(201).json({status: "success", data: existingCartItem});  
        }

		const newCartItem = new Cart({
            productId,
            userId: req.user._id,
			noOfItem: 1
		});

		if (newCartItem) {
			newCartItem.price = newCartItem.noOfItem * Number(product.price);
			await newCartItem.save();

			res.status(201).json({status: "success", data: newCartItem});
		} else {
			res.status(400).json({status: "failed", error: "Invalid cart item data" });
		}
	} catch (error) {
		console.log("Error in addToCart controller", error.message);
		res.status(500).json({status: "failed", error: "Internal Server Error" });
	}
}

export const getAllCartItemDetails = async (req, res) => {
	try {   
		var cartItems = await Cart.find({userId: req.user._id, status: "Active"}).populate("productId").sort({ createdAt: -1 });

        if (!cartItems) {
          return  res.status(404).json({status: "success", message: "No cart items were found"});    
        }

		
		
		res.status(200).json({status: "success", data: cartItems});

		
	} catch (error) {
		console.error("Error in getAllCartItems: ", error.message);
		res.status(500).json({status: "failed", error: "Internal server error" });
	}
};

export const getAllCartItems = async (req, res) => {
	try {   
		var cartItems = await Cart.find({userId: req.user._id, status: "Active"}).sort({ createdAt: -1 });

        if (!cartItems) {
          return  res.status(404).json({status: "success", message: "No cart items were found"});    
        }

		

		const fetchProducts = async (cartItems) => {
			// Use Promise.all to await all fetch operations concurrently
			cartItems = await Promise.all(cartItems.map(async (cartItem) => {
			  const product = await Product.findOne({ _id: cartItem.productId });

			  if (product) {
				cartItem.price = cartItem.noOfItem * Number(product.price);
			  }
			  
			 
			  return cartItem; // Return the updated cartItem
			}));
		  
			return cartItems; // Return the updated cartItems array
		  };
		  
		    fetchProducts(cartItems)
			.then(updatedCartItems => {
			  return res.status(200).json({status: "success", data: updatedCartItems});
			})
			.catch(error => {
			  return res.status(500).json({status: "failed", error: "Internal server error" });
			   
			});
		  
		

		
	} catch (error) {
		console.error("Error in getAllCartItems: ", error.message);
		res.status(500).json({status: "failed", error: "Internal server error" });
	}
};


export const deleteItemFromCart = async (req, res) => {
	try {
        const {id} = req.params;

		const deletedCartItem = await Cart.findOneAndDelete({_id: id});

        if (!deletedCartItem) {
			return  res.status(404).json({status: "success", message: "No cart item was found"});    
        }

		res.status(200).json({status: "success", data: deletedCartItem});
	} catch (error) {
		console.error("Error in deleteItemFromCart: ", error.message);
		res.status(500).json({status: "failed", error: "Internal server error" });
	}
};