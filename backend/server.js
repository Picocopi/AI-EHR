require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes'); // 
const conditionRoutes = require('./routes/conditionRoutes');
const observationRoutes = require('./routes/observationRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const documentRoutes = require('./routes/documentRoutes');


const app = express();
app.use(cors());
app.use(express.json());

// Use the patient route
app.use('/api/patients', patientRoutes); // 
app.use('/api/conditions', conditionRoutes);
app.use('/api/observations', observationRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/documents', documentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('API Running'));

app.listen(5000, () => console.log('Server started on port 5000'));
