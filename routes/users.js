const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config()

router.post("/", async (req, res) => {
	try {

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully", user: newUser});
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
