import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
        userId: {
			type: String,
            required: true,
		},
		cartId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Cart",
				required: true,
			},
		status: {
			type: String,
			default: "Pending Payment",
		},
		transactionReference: {
			type: String,
			default: "",
			required: true,
		}
		
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
