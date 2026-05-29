import express from "express";
import cors from "cors";
import mfSchemeRoutes from "./routes/mfSchemesRoute";
import stockInfoRoutes from "./routes/stockInfoRoute";
import stockPriceHistoryRoutes from "./routes/stockPriceHistoryRoute";
const app = express()
app.use(cors());
app.use(express.json());
app.use("/api/mf-schemes", mfSchemeRoutes);
app.use("/api/stock-info", stockInfoRoutes);
app.use("/api/stock-price-history", stockPriceHistoryRoutes);

const PORT = 3002;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
