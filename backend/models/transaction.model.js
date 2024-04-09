import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
	{
		orderId: {
			type: String,
            required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		
	},
	{ timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
