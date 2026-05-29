import express from "express";
import cors from "cors";


import investorRoutes from "./routes/investorRoute";
import userLoginRoutes from "./routes/userLoginRoute";
import roleRoutes from "./routes/roleRoutes";
import userRoleRoutes from "./routes/userRoleRoute";
import mfCustomerFundsRoutes from "./routes/mfCustomerFundsRoute";

const app = express();

app.use(cors());
app.use(express.json());

/*
  Routes
*/
app.use("/api/investors", investorRoutes);

app.use("/api/auth", userLoginRoutes);

app.use("/api/roles", roleRoutes);

app.use("/api/user-roles", userRoleRoutes);

app.use("/api/customer-funds", mfCustomerFundsRoutes);


/*
  Server
*/
const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
