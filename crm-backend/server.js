const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

// --- MIDDLEWARE ---
// This allows your React app to make requests to this server safely
app.use(cors()); 
// This allows the server to read JSON data sent from React's forms
app.use(express.json()); 

// --- ROUTES ---
app.post('/api/leads', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save(); // This sends it to the cloud!
    res.status(201).json({ message: "Lead saved to database!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET route to fetch all leads from MongoDB
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leads', error });
  }
});
// DELETE a lead by ID
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lead", error });
  }
});

// UPDATE a lead by ID
app.put('/api/leads/:id', async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // This returns the updated version of the lead
    );
    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: "Error updating lead", error });
  }
});
// --- START THE SERVER ---
const PORT = 5001; // Change from 5000 to 5001
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
// Add this error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke on the server!');
});


// Define what a Lead looks like in our database
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  source: String,
  status: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
const Lead = mongoose.model('Lead', leadSchema);

// The URL is now properly wrapped in quotes ('')
const dbURI = 'mongodb+srv://ameenzuberi:ananyapandey07@cluster0.gqmcc8m.mongodb.net/crm-db?appName=Cluster0';

mongoose.connect(dbURI, { 
  family: 4 
})
  .then(() => console.log('📡 Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ Connection error:', err));

