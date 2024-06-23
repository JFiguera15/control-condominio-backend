import express, { json } from 'express';
import cors from 'cors';
import userRouter from "./routes/userRoutes.js"
import houseRouter from "./routes/houseRoutes.js"
import paymentRouter from "./routes/paymentRoutes.js"
import expenseRouter from "./routes/expenseRoutes.js"

const app = express();
const port = process.env.PORT ?? 8000;

app.use(cors());
app.use(json());

app.use("/api/users", userRouter);
app.use("/api/houses", houseRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/expenses", expenseRouter)



app.listen(port, () => {
    console.log(`Server is running on port:`, port);
});