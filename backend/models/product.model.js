import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
        userId: {
			type: String,
            required: true,
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
        filePath: {
			type: String,
			// required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
