const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig.js");

require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", require("./routers/userRoutes.js"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
