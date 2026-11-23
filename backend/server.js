require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/Database/db");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB(); // Connect to the database

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});