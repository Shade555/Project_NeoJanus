// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const AMBEE_API_KEY = "3af190634193483e05a1184b217590d0bdac0122a04aff61e87a4948a025659d"; 

app.get("/aqi", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(`https://api.ambeedata.com/latest/by-lat-lng?lat=${lat}&lng=${lng}`, {
      headers: {
        "x-api-key": AMBEE_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("AQI fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch AQI" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Proxy server running at http://localhost:${PORT}`));
