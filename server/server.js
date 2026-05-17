const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );

    const data = await response.json();

    res.json({
      reply: `${data.setup} ${data.punchline}`,
    });

  } catch (error) {
    console.log(error);

    res.json({
      reply: "API Error",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});