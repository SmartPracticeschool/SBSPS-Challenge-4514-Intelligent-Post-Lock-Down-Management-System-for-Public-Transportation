const express = require("express");
const globalErrorController = require("./controllers/globalErrorController");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/booking", bookingRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl}`));
});

app.use(globalErrorController);

module.exports = app;
