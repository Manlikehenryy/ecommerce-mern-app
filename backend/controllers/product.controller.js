import Product from "../models/product.model.js";

export const addProduct = async (req,res)=>{
    try {
	
        if (!req.file) {
			return res.status(400).json({status: "failed", error: "No file uploaded" });
		}

		const { name, price, description} = req.body;
		const fileName = req.file.originalname;

		const newProduct = new Product({
			name,
            price,
			description,
            userId: req.user._id,
			filePath:`uploads/${fileName}`
		});

		if (newProduct) {
			await newProduct.save();

			res.status(201).json({status: "success", data: newProduct});
		} else {
			res.status(400).json({status: "failed", error: "Invalid product data" });
		}
	} catch (error) {
		console.log("Error in addProduct controller", error.message);
		res.status(500).json({status: "failed", error: "Internal Server Error" });
	}
}

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find().sort({ createdAt: -1 });

        if (!products) {
            res.status(404).json({status: "success", message: "No products were found"});    
        }

		res.status(200).json({status: "success", data: products});
	} catch (error) {
		console.error("Error in getAllProducts: ", error.message);
		res.status(500).json({status: "failed", error: "Internal server error" });
	}
};

export const getProductById = async (req, res) => {
	try {
        const {id} = req.params;

		const product = await Product.findOne({_id: id});

        if (!product) {
            res.status(404).json({status: "success", message: "No product was found"});    
        }

		res.status(200).json({status: "success", data: product});
	} catch (error) {
		console.error("Error in getAllProducts: ", error.message);
		res.status(500).json({status: "failed", error: "Internal server error" });
	}
};

export const updateProduct = async (req, res) => {
	try {
        const {id} = req.params;
        const updatedData = req.body;

		const updatedProduct = null;
		if (req.file) {
			 updatedProduct = await Product.findOneAndUpdate({_id: id}, {...updatedData, filePath:`uploads/${req.file.originalname}`}, { new: true });
		}
		else{
	         updatedProduct = await Product.findOneAndUpdate({_id: id}, updatedData, { new: true });
		}

		

        if (!updatedProduct) {
            res.status(404).json({status: "success", message: "No product was found"});    
        }

		res.status(200).json({status: "success", data: updatedProduct});
	} catch (error) {
		console.error("Error in updateProduct: ", error.message);
		res.status(500).json({status: "failed", error: "Internal server error" });
	}
};

export const deleteProduct = async (req, res) => {
	try {
        const {id} = req.params;

		const deletedProduct = await Product.findOneAndDelete({_id: id});

        if (!deletedProduct) {
            res.status(404).json({status: "success", message: "No product was found"});    
        }

		res.status(200).json({status: "success", data: deletedProduct});
	} catch (error) {
		console.error("Error in deleteProduct: ", error.message);
		res.status(500).json({status: "failed", error: "Internal server error" });
	}
};