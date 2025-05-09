const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Flower = require('./models/Flower');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/flower-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API endpoint to get all flowers
app.get('/api/flowers', async (req, res) => {
  const flowers = await Flower.find();
  res.json(flowers);
});

// API endpoint to add a new flower
app.post('/api/flowers', async (req, res) => {
  const newFlower = new Flower(req.body);
  await newFlower.save();
  res.status(201).json(newFlower);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});