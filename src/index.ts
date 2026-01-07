import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
// import categoryRoutes from "./routes/category.routes";
// import expenseRoutes from "./routes/expense.routes";
// import aiRoutes from "./routes/ai.routes";
import { errorHandler } from "./middleware/error.middleware";
import categoryRoutes from "./routes/category.routes";
import expenseRoutes from "./routes/expense.routes";
import incomeRoutes from "./routes/income.routes";
import savingRoutes from "./routes/saving.routes";
import adminRoutes from "./routes/admin.routes";
import aiRoutes from "./routes/ai.routes"
import adminUsersRoutes from "./routes/admin.users.routes"
import profileRoutes from "./routes/profile.routes"
import googleAuthRoures from "./routes/google.auth.routes"



dotenv.config();

const app = express();
app.use(express.json());

const FRONTEND = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
// app.use(cors({ origin: FRONTEND }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://jolly-frangipane-074582.netlify.app",
    ],
    credentials: true,
  })
);

const PORT = process.env.SERVER_PORT || 5001;

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI missing in env");
  process.exit(1);
}
connectDB(process.env.MONGO_URI as string);

app.get("/", (_req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/expenses", expenseRoutes);
app.use("/api/v1/incomes", incomeRoutes);
app.use("/api/v1/savings", savingRoutes);
app.use("/api/v1/admin", adminRoutes);
// ✅ AI routes
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/admin/users", adminUsersRoutes);
app.use("/api/v1/profile", profileRoutes);
// server.ts
app.use("/api/v1/auth", googleAuthRoures);







// app.use("/api/v1/categories", categoryRoutes);
// app.use("/api/v1/expenses", expenseRoutes);
// app.use("/api/v1/incomes", incomeRoutes);
// app.use("/api/v1/ai", aiRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


