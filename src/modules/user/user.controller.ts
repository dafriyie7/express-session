import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { sendResponse } from "../../utils/response";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcryptjs";

// signup
const userSignup = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		throw new AppError("All fields are required", 400);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			username,
			email,
			password: hashedPassword,
		},
	});

	sendResponse(res, user, "User created", 201);
};

// login a user
const userLogin = async (req: Request, res: Response) => {
	const { identifier, password } = req.body ||{ };

	if (!identifier || !password) {
		throw new AppError("All fields are required", 400);
	}

	const user = await prisma.user.findFirst({
		where: {
			OR: [
				{ username: identifier },
				{ email: identifier },
			],
		},
	});

	if (!user) {
		throw new AppError("User not found", 404);
	}

	// check password match
	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		throw new AppError("Invalid password", 401);
	}

	// create session
	req.session.userId = user.id;
	sendResponse(res, user, "User logged in", 200);
};

// get user account
const getUserAccount = async (req: Request, res: Response) => { 
	const { userId } = req.session;

	if (!userId) {
		throw new AppError("User not logged in", 401);
	}

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		throw new AppError("User not found", 404);
	}

	sendResponse(res, user, "success", 200);
}

// logout user
const userLogout = async (req: Request, res: Response) => { 
	req.session.destroy((err) => {
		if (err) {
			throw new AppError("Error logging out", 500);
		}
	});

	res.clearCookie("connect.sid");
	sendResponse(res, null, "User logged out", 200);
}

export { userSignup, userLogin, getUserAccount, userLogout};
