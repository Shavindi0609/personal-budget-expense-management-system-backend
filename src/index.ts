import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
// import categoryRoutes from "./routes/category.routes";
// import expenseRoutes from "./routes/expense.routes";
// import incomeRoutes from "./routes/income.routes";
// import aiRoutes from "./routes/ai.routes";
import { errorHandler } from "./middleware/error.middleware";
import categoryRoutes from "./routes/category.routes";



dotenv.config();

const app = express();
app.use(express.json());

const FRONTEND = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: FRONTEND }));

const PORT = process.env.SERVER_PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI missing in env");
  process.exit(1);
}
connectDB(process.env.MONGO_URI as string);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);

// app.use("/api/v1/categories", categoryRoutes);
// app.use("/api/v1/expenses", expenseRoutes);
// app.use("/api/v1/incomes", incomeRoutes);
// app.use("/api/v1/ai", aiRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

















//************ package.json ***********

// {
//   "name": "personal-budget-expense-management-system-be",
//   "version": "1.0.0",
//   "description": "",
//   "main": "index.js",
//   "scripts": {
//     "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
//     "build": "tsc",
//     "start": "node dist/index.js"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "devDependencies": {
//     "@types/express": "^5.0.5",
//     "@types/mongoose": "^5.11.96",
//     "@types/node": "^24.10.1",
//     "ts-node-dev": "^2.0.0",
//     "typescript": "^5.9.3"
//   },
//   "dependencies": {
//     "express": "^5.1.0",
//     "mongoose": "^9.0.0"
//   }
// }