const express = require("express");
const app = express();
const professoresRoutes = require("./routes/professoresRoutes");

app.use(express.json());

app.use("/professores", professoresRoutes);

app.listen(3000, () => {
console.log("Servidor rodando na porta 3000 ✅");
});

