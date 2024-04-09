import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
	{
        userId: {
			type: String,
            required: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		status: {
			type: String,
			default: "Active",
		},
		noOfItem: {
			type: Number,
			default: "Active",
		},
		price: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
