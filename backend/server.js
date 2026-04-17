const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
