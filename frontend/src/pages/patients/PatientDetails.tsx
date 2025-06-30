import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Mock data - replace with actual API calls
const mockPatient = {
  id: '1',
  name: { family: 'Doe', given: ['John'] },
  gender: 'male',
  birthDate: '1985-06-15',
  identifier: { value: 'P001234' },
  telecom: [
    { system: 'email', value: 'john.doe@email.com', use: 'home' },
    { system: 'phone', value: '+1-555-0123', use: 'mobile' }
  ],
  address: [{
    line: ['123 Main St'],
    city: 'Springfield',
    state: 'IL',
    country: 'USA'
  }]
}

const mockConditions = [
  { id: '1', code: { text: 'Diabetes Mellitus Type 2' }, clinicalStatus: 'active', onsetDateTime: '2020-03-15' },
  { id: '2', code: { text: 'Hypertension' }, clinicalStatus: 'active', onsetDateTime: '2019-11-20' }
]

const mockObservations = [
  { id: '1', code: { text: 'Blood Pressure' }, valueQuantity: { value: 120, unit: 'mmHg' }, effectiveDateTime: '2024-06-25' },
  { id: '2', code: { text: 'Blood Sugar' }, valueQuantity: { value: 95, unit: 'mg/dL' }, effectiveDateTime: '2024-06-25' },
  { id: '3', code: { text: 'Weight' }, valueQuantity: { value: 75, unit: 'kg' }, effectiveDateTime: '2024-06-20' }
]

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  
  const getAge = (birthDate: string) => {
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/patients" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Back to Patients
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            {mockPatient.name.given.join(' ')} {mockPatient.name.family}
          </h1>
          <p className="text-gray-600">Patient ID: {mockPatient.identifier.value}</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">Edit Patient</Button>
          <Button>Schedule Appointment</Button>
        </div>
      </div>

      {/* Patient Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-lg">{mockPatient.name.given.join(' ')} {mockPatient.name.family}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Patient ID</label>
                <p className="text-lg">{mockPatient.identifier.value}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Gender</label>
                <p className="text-lg capitalize">{mockPatient.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Age</label>
                <p className="text-lg">{getAge(mockPatient.birthDate)} years</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                <p className="text-lg">{new Date(mockPatient.birthDate).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPatient.telecom.map((contact, index) => (
              <div key={index}>
                <label className="text-sm font-medium text-gray-500 capitalize">{contact.system} ({contact.use})</label>
                <p>{contact.value}</p>
              </div>
            ))}
            <div>
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p>
                {mockPatient.address[0].line.join(', ')}<br />
                {mockPatient.address[0].city}, {mockPatient.address[0].state}<br />
                {mockPatient.address[0].country}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Conditions</CardTitle>
          <CardDescription>Active and resolved medical conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Onset Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockConditions.map((condition) => (
                <TableRow key={condition.id}>
                  <TableCell className="font-medium">{condition.code.text}</TableCell>
                  <TableCell>
                    <Badge variant={condition.clinicalStatus === 'active' ? 'destructive' : 'secondary'}>
                      {condition.clinicalStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(condition.onsetDateTime).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Observations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Observations</CardTitle>
          <CardDescription>Latest vital signs and measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Observation</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockObservations.map((observation) => (
                <TableRow key={observation.id}>
                  <TableCell className="font-medium">{observation.code.text}</TableCell>
                  <TableCell>{observation.valueQuantity.value}</TableCell>
                  <TableCell>{observation.valueQuantity.unit}</TableCell>
                  <TableCell>{new Date(observation.effectiveDateTime).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default PatientDetails
