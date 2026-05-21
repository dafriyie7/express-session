import express, { NextFunction, Request, Response } from "express";
import "dotenv/config"
import session from "./config/sessionConfig";
import userRouter from "./modules/user/user.routes";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";

const app = express();

const allowedOrigins = ["http://localhost:5173"];

// cors config
const corsOptions = {
	origin: (origin: any, callback: any) => {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

// middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(session);

// log incoming request and outgoing responses
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method} ${req.url}`);

	if (req.body && Object.keys(req.body).length > 0) {
		console.log("Body:", req.body);
	}

	res.on("finish", () => {
		console.log(`Status: ${res.statusCode} \n`);
	});

	next();
});

// check health
app.get("/health", (_req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: "Server: ok!",
	});
});

// routes
app.use("/api/users", userRouter)

// not found handler
app.use((_req: Request, res: Response) => { 
	res.status(404).json({
		success: false,
		message: "Route not found",
	});
})

// error handler
app.use(errorHandler)

// server
app.listen(3000, () => {
	console.log("server is running on localhost:3000");
});
