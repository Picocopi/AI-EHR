import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

// Mock data - replace with actual API calls
const mockObservations = [
  {
    id: '1',
    subject: { name: 'John Doe', id: 'P001234' },
    code: { text: 'Blood Pressure' },
    valueQuantity: { value: 120, unit: 'mmHg' },
    effectiveDateTime: '2024-06-30T08:30:00',
    interpretation: 'normal'
  },
  {
    id: '2',
    subject: { name: 'Jane Smith', id: 'P001235' },
    code: { text: 'Blood Sugar' },
    valueQuantity: { value: 140, unit: 'mg/dL' },
    effectiveDateTime: '2024-06-30T09:15:00',
    interpretation: 'high'
  },
  {
    id: '3',
    subject: { name: 'Robert Johnson', id: 'P001236' },
    code: { text: 'Heart Rate' },
    valueQuantity: { value: 72, unit: 'bpm' },
    effectiveDateTime: '2024-06-30T10:00:00',
    interpretation: 'normal'
  },
  {
    id: '4',
    subject: { name: 'John Doe', id: 'P001234' },
    code: { text: 'Weight' },
    valueQuantity: { value: 75.5, unit: 'kg' },
    effectiveDateTime: '2024-06-29T14:20:00',
    interpretation: 'normal'
  },
  {
    id: '5',
    subject: { name: 'Jane Smith', id: 'P001235' },
    code: { text: 'Temperature' },
    valueQuantity: { value: 37.2, unit: '°C' },
    effectiveDateTime: '2024-06-29T11:45:00',
    interpretation: 'normal'
  }
]

const ObservationList: React.FC = () => {
  const getInterpretationColor = (interpretation: string) => {
    switch (interpretation.toLowerCase()) {
      case 'normal': return 'outline'
      case 'high': return 'destructive'
      case 'low': return 'secondary'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Observations</h1>
          <p className="text-gray-600">Patient vital signs and measurements</p>
        </div>
        <Button>📊 Record New Observation</Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">125</div>
              <div className="text-sm text-gray-600">Total Today</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98</div>
              <div className="text-sm text-gray-600">Normal</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">15</div>
              <div className="text-sm text-gray-600">High/Critical</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-gray-600">Low</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Observations</CardTitle>
          <CardDescription>Filter by patient, observation type, or date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input placeholder="Search by patient name..." className="flex-1" />
            <Input placeholder="Observation type..." className="flex-1" />
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Clear</Button>
          </div>
        </CardContent>
      </Card>

      {/* Observations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Observations</CardTitle>
          <CardDescription>Latest patient vital signs and measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Observation</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockObservations.map((observation) => (
                <TableRow key={observation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{observation.subject.name}</div>
                      <div className="text-sm text-gray-500">{observation.subject.id}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{observation.code.text}</TableCell>
                  <TableCell className="text-lg font-semibold">
                    {observation.valueQuantity.value}
                  </TableCell>
                  <TableCell>{observation.valueQuantity.unit}</TableCell>
                  <TableCell>
                    <Badge variant={getInterpretationColor(observation.interpretation)}>
                      {observation.interpretation}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{new Date(observation.effectiveDateTime).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(observation.effectiveDateTime).toLocaleTimeString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View</Button>
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

export default ObservationList
