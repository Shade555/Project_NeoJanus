const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Ambee API key (replace with your own)
const AMBEE_API_KEY = 'your_api_key';

// Endpoint to fetch AQI data
app.get('/aqi', async (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://api.ambeedata.com/aqi/v1/feed/geo?lat=${lat}&lng=${lng}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AMBEE_API_KEY
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching AQI data:', error);
    res.status(500).json({ error: 'Failed to fetch AQI data' });
  }
});

// Endpoint to fetch disaster data
app.get('/disasters', async (req, res) => {
  const { lat, lng } = req.query;
  const disasterData = [
    // Example disaster data (you can replace this with a real API endpoint)
    {
      latitude: 28.7041,
      longitude: 77.1025,
      type: 'Flood',
      description: 'Flooding in the area causing significant damage.'
    },
    {
      latitude: 19.0760,
      longitude: 72.8777,
      type: 'Earthquake',
      description: 'An earthquake with a magnitude of 6.5 struck the region.'
    }
  ];

  res.json({ disasters: disasterData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
