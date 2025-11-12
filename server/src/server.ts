import express from "express";
import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:5173"],
};

const app = express();
app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.json({ test: [1, 2, 3, 4, 5] });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
