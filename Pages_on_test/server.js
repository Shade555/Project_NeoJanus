const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Ambee API key (replace with your actual API key)
const AMBEE_API_KEY = '3af190634193483e05a1184b217590d0bdac0122a04aff61e87a4948a025659d';

// Endpoint to fetch AQI data
app.get('/aqi', async (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://api.ambeedata.com/latest/by-lat-lng?lat=${lat}&lng=${lng}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AMBEE_API_KEY
      }
    });
    
    const data = await response.json();
    
    // If you don't have the actual API, return mock data
    if (!AMBEE_API_KEY || AMBEE_API_KEY === 'YOUR_AMBEE_API_KEY') {
      return res.json({
        data: [{
          name: "New Delhi Central",
          city: "New Delhi",
          state: "Delhi",
          country: "India",
          aqi: "156",
          updatedAt: "2025-04-29T08:30:00Z"
        }]
      });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching AQI data:', error);
    res.status(500).json({ error: 'Failed to fetch AQI data' });
  }
});

// Endpoint to fetch real-time disaster data
app.get('/disasters', async (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://api.ambeedata.com/disasters/latest/by-lat-lng?lat=${lat}&lng=${lng}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AMBEE_API_KEY
      }
    });
    
    const data = await response.json();

    // If you don't have the actual API, return mock data
    if (!AMBEE_API_KEY || AMBEE_API_KEY === '3af190634193483e05a1184b217590d0bdac0122a04aff61e87a4948a025659d') {
      return res.json({
        disasters: [
          {
            latitude: 28.5,
            longitude: 77.3,
            type: "Flood",
            title: "Delhi Flood",
            description: "Flooding in East Delhi area",
            date: "2025-01-15T10:00:00Z"
          },
          {
            latitude: 28.7,
            longitude: 77.1,
            type: "Fire",
            title: "Industrial Fire",
            description: "Fire at industrial complex in North Delhi",
            date: "2025-02-20T14:30:00Z"
          },
          {
            latitude: 28.4,
            longitude: 77.0,
            type: "Storm",
            title: "Dust Storm",
            description: "Severe dust storm with high winds",
            date: "2025-03-05T18:15:00Z"
          },
          {
            latitude: 28.6,
            longitude: 77.2,
            type: "Earthquake",
            title: "Minor Earthquake",
            description: "4.2 magnitude earthquake felt across Delhi NCR",
            date: "2025-04-10T02:45:00Z"
          },
          {
            latitude: 28.55,
            longitude: 77.25,
            type: "Flood",
            title: "Yamuna Overflow",
            description: "River Yamuna crossed danger mark causing flooding",
            date: "2025-05-01T09:20:00Z"
          }
        ]
      });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching disaster data:', error);
    res.status(500).json({ error: 'Failed to fetch disaster data' });
  }
});

// Added missing earthquakes endpoint
app.get('/earthquakes', async (req, res) => {
  try {
    // If using a real API, you would fetch data here
    
    // For now, return mock earthquake data
    res.json({
      earthquakes: [
        {
          magnitude: 5.8,
          location: "Northern India",
          time: "2025-04-20T15:30:00Z"
        },
        {
          magnitude: 4.2,
          location: "Delhi NCR",
          time: "2025-04-10T02:45:00Z"
        },
        {
          magnitude: 3.6,
          location: "Haryana",
          time: "2025-03-25T11:20:00Z"
        },
        {
          magnitude: 4.9,
          location: "Uttarakhand",
          time: "2025-02-15T09:10:00Z"
        },
        {
          magnitude: 3.2,
          location: "Western UP",
          time: "2025-01-05T22:40:00Z"
        }
      ]
    });
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    res.status(500).json({ error: 'Failed to fetch earthquake data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});