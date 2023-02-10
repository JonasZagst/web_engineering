import express from "express"

const PORT = process.env.port || 3000;

let app = express();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
