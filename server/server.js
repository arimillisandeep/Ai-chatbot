const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let layout = {
  nodes: {
    headline: {
      x: 150,
      y: 170,
      width: 700,
      height: 120,
      type: "text",

      data: {
        content:
          "Luxury Comfort, Surprisingly Attainable",
      },

      style: {
        visual: {
          fontSize: 64,
          color: "black",
        },
      },
    },
  },
};

app.post("/api/chat", (req, res) => {
  try {
    const { message } = req.body;

    const lower = message.toLowerCase();

    const headline =
      layout.nodes.headline;

    /* MOVE */

    if (
      lower.includes("move right")
    ) {
      headline.x += 50;
    }

    if (
      lower.includes("move left")
    ) {
      headline.x -= 50;
    }

    if (
      lower.includes("move down")
    ) {
      headline.y += 40;
    }

    if (
      lower.includes("move up")
    ) {
      headline.y -= 40;
    }

    /* SIZE */

    if (
      lower.includes("bigger")
    ) {
      headline.style.visual.fontSize += 10;
      headline.width += 50;
    }

    if (
      lower.includes("smaller")
    ) {
      headline.style.visual.fontSize -= 10;
      headline.width -= 50;
    }

    /* COLORS */

    if (
      lower.includes("red")
    ) {
      headline.style.visual.color =
        "red";
    }

    if (
      lower.includes("blue")
    ) {
      headline.style.visual.color =
        "blue";
    }

    if (
      lower.includes("green")
    ) {
      headline.style.visual.color =
        "green";
    }

    if (
      lower.includes("black")
    ) {
      headline.style.visual.color =
        "black";
    }

    /* 9:16 */

    if (
      lower.includes("9:16")
    ) {
      headline.x = 80;
      headline.y = 250;
      headline.width = 400;

      headline.style.visual.fontSize = 52;
    }

    /* LARGE PRODUCT */

    if (
      lower.includes("large")
    ) {
      headline.style.visual.fontSize = 80;
      headline.width = 900;
    }

    res.json({
      reply:
        "Layout updated successfully",

      layout,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error:
        "Something went wrong",
    });
  }
});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});