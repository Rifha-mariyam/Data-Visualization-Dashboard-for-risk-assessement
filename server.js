const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://rahiman4059:rahimanPassword@cluster0.6rnwq29.mongodb.net/dashboardDB?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define the schema explicitly
const DataSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,
  country: String,
  topics: [String],
  region: String,
  city: String,
  end_year: String,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  pestle: String,
  source: String,
  title: String
}, { collection: 'data' });

const Data = mongoose.model('Data', DataSchema);

// API route
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    console.log('Retrieved data:', data); // Log the data
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
