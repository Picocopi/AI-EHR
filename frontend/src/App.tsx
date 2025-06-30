import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PatientList from './pages/patients/PatientList'
import PatientDetails from './pages/patients/PatientDetails'
import AppointmentList from './pages/appointments/AppointmentList'
import ObservationList from './pages/records/ObservationList'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/records/observations" element={<ObservationList />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
