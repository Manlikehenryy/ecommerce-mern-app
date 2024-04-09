const isAdmin = async (req, res, next) => {
	try {

		if (req.user.role != "admin") {
			return res.status(401).json({ status:"failed", error: "You dont have permission to add a product" });
		}

		next();
	} catch (error) {
		console.log("Error in isAdmin middleware: ", error.message);
		res.status(500).json({status:"failed", error: "Internal server error" });
	}
};

export default isAdmin;