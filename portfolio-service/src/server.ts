import express from "express";
import cors from "cors";

import mfTransactionRoutes from "./routes/mfTransactionRoute";
import stockTransactionRoutes from "./routes/stockTransactionRoute";
import stockHoldingRoutes from "./routes/stockHoldingRoute";
import mfSipRoutes from "./routes/mfSipRoute";
import mfNavHistoryRoutes from "./routes/mfNavHistoryRoute";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/mf-transactions", mfTransactionRoutes);
app.use("/api/stock-transactions", stockTransactionRoutes);
app.use("/api/stock-holdings", stockHoldingRoutes);
app.use("/api/mf-sips", mfSipRoutes);
app.use("/api/mf-nav-history", mfNavHistoryRoutes);
/*
  Server
*/
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
