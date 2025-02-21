const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.get("/", (req, res) => {
  res.send("Hii...");
});

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }
    
    const numbers = data.filter(item => /^\d+$/.test(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const highestAlphabet = alphabets.length ? [alphabets.sort().slice(-1)[0]] : [];

    const response = {
      is_success: true,
      user_id: "anvi_24022004", 
      email: "22bcs10019@cuchd.in", 
      roll_number: "22BCS10019",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
