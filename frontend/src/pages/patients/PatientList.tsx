import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

// Mock data - replace with actual API calls
const mockPatients = [
  {
    id: '1',
    name: { family: 'Doe', given: ['John'] },
    gender: 'male',
    birthDate: '1985-06-15',
    identifier: { value: 'P001234' },
    telecom: [{ system: 'email', value: 'john.doe@email.com' }]
  },
  {
    id: '2',
    name: { family: 'Smith', given: ['Jane'] },
    gender: 'female',
    birthDate: '1990-03-22',
    identifier: { value: 'P001235' },
    telecom: [{ system: 'email', value: 'jane.smith@email.com' }]
  },
  {
    id: '3',
    name: { family: 'Johnson', given: ['Robert'] },
    gender: 'male',
    birthDate: '1978-11-08',
    identifier: { value: 'P001236' },
    telecom: [{ system: 'email', value: 'robert.johnson@email.com' }]
  }
]

const PatientList: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <Button>➕ Add New Patient</Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Patients</CardTitle>
          <CardDescription>Find patients by name, ID, or contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input placeholder="Search by name or ID..." className="flex-1" />
            <Button variant="outline">Search</Button>
            <Button variant="outline">Clear</Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
          <CardDescription>All registered patients in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">
                    {patient.identifier.value}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {patient.name.given.join(' ')} {patient.name.family}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={patient.gender === 'male' ? 'default' : 'secondary'}>
                      {patient.gender}
                    </Badge>
                  </TableCell>
                  <TableCell>{getAge(patient.birthDate)} years</TableCell>
                  <TableCell>
                    {patient.telecom.find(t => t.system === 'email')?.value || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to={`/patients/${patient.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default PatientList
