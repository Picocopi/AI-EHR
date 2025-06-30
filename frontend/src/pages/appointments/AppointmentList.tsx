import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Mock data - replace with actual API calls
const mockAppointments = [
  {
    id: '1',
    start: '2024-06-30T09:00:00',
    end: '2024-06-30T09:30:00',
    status: 'booked',
    description: 'Regular checkup',
    participant: [{ actor: { name: 'John Doe' } }]
  },
  {
    id: '2',
    start: '2024-06-30T10:00:00',
    end: '2024-06-30T10:30:00',
    status: 'arrived',
    description: 'Follow-up consultation',
    participant: [{ actor: { name: 'Jane Smith' } }]
  },
  {
    id: '3',
    start: '2024-06-30T14:00:00',
    end: '2024-06-30T14:30:00',
    status: 'fulfilled',
    description: 'Blood test results review',
    participant: [{ actor: { name: 'Robert Johnson' } }]
  }
]

const AppointmentList: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'default'
      case 'arrived': return 'secondary'
      case 'fulfilled': return 'outline'
      case 'cancelled': return 'destructive'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage patient appointments and scheduling</p>
        </div>
        <Button>📅 Schedule New Appointment</Button>
      </div>

      {/* Appointment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Today's Total</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">4</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
          <CardDescription>All scheduled appointments for today</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    {new Date(appointment.start).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })} - {new Date(appointment.end).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </TableCell>
                  <TableCell>{appointment.participant[0]?.actor.name}</TableCell>
                  <TableCell>{appointment.description}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                      {appointment.status === 'booked' && (
                        <Button variant="outline" size="sm">Check In</Button>
                      )}
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

export default AppointmentList
