"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, Plus, Search, Edit, X } from "lucide-react"

export function AppointmentScheduling() {
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")

  const [appointments, setAppointments] = useState([
    {
      id: "A001",
      patientId: "P001",
      patient: "John Doe",
      doctorId: "D001",
      doctor: "Dr. Smith",
      department: "Cardiology",
      date: "2025-07-15",
      time: "09:00",
      type: "Consultation",
      notes: "Regular checkup",
      status: "Scheduled",
    },
    {
      id: "A002",
      patientId: "P002",
      patient: "Jane Smith",
      doctorId: "D002",
      doctor: "Dr. Johnson",
      department: "Neurology",
      date: "2025-07-15",
      time: "10:30",
      type: "Follow-up",
      notes: "Follow-up for headaches",
      status: "Confirmed",
    },
    {
      id: "A003",
      patientId: "P003",
      patient: "Robert Johnson",
      doctorId: "D003",
      doctor: "Dr. Brown",
      department: "Orthopedics",
      date: "2025-07-15",
      time: "14:00",
      type: "Consultation",
      notes: "Knee pain evaluation",
      status: "Completed",
    },
    {
      id: "A004",
      patientId: "P004",
      patient: "Emily Davis",
      doctorId: "D004",
      doctor: "Dr. Wilson",
      department: "Pediatrics",
      date: "2025-07-16",
      time: "11:00",
      type: "Routine",
      notes: "Annual checkup",
      status: "Scheduled",
    },
  ])

  const [editingAppointment, setEditingAppointment] = useState(null)
  const [appointmentForm, setAppointmentForm] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    type: "",
    notes: "",
  })

  const doctors = [
    {
      id: "D001",
      name: "Dr. Smith",
      department: "Cardiology",
      available: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    },
    {
      id: "D002",
      name: "Dr. Johnson",
      department: "Neurology",
      available: ["10:00", "11:00", "13:00", "14:00", "16:00"],
    },
    {
      id: "D003",
      name: "Dr. Brown",
      department: "Orthopedics",
      available: ["09:00", "10:30", "13:30", "15:00", "16:30"],
    },
    {
      id: "D004",
      name: "Dr. Wilson",
      department: "Pediatrics",
      available: ["08:00", "09:30", "11:00", "13:00", "14:30"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "default"
      case "Confirmed":
        return "secondary"
      case "Completed":
        return "outline"
      case "Cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment)
    setAppointmentForm({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      notes: appointment.notes,
    })
    setShowForm(true)
  }

  const handleCancelAppointment = (appointmentId) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: "Cancelled" } : apt)))
  }

  const handleSaveAppointment = () => {
    if (editingAppointment) {
      // Update existing appointment
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === editingAppointment.id
            ? {
                ...apt,
                ...appointmentForm,
                patient: "Updated Patient", // You'd get this from patient lookup
                doctor: doctors.find((d) => d.id === appointmentForm.doctorId)?.name || apt.doctor,
                department: doctors.find((d) => d.id === appointmentForm.doctorId)?.department || apt.department,
              }
            : apt,
        ),
      )
      setEditingAppointment(null)
    } else {
      // Add new appointment
      const newAppointment = {
        id: `A${String(appointments.length + 1).padStart(3, "0")}`,
        ...appointmentForm,
        patient: "New Patient", // You'd get this from patient lookup
        doctor: doctors.find((d) => d.id === appointmentForm.doctorId)?.name || "",
        department: doctors.find((d) => d.id === appointmentForm.doctorId)?.department || "",
        status: "Scheduled",
      }
      setAppointments((prev) => [...prev, newAppointment])
    }
    setAppointmentForm({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      type: "",
      notes: "",
    })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Appointment Scheduling</h3>
          <p className="text-sm text-muted-foreground">Manage patient appointments and doctor schedules</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? "View Appointments" : "Schedule Appointment"}
        </Button>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Appointment</CardTitle>
            <CardDescription>Book an appointment for a patient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input id="patientId" placeholder="Enter patient ID or search" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="general">General Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="routine">Routine Check-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Additional notes or symptoms" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAppointment}>Schedule Appointment</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>Manage scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search appointments..." className="max-w-sm" />
                <Input type="date" className="max-w-xs" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.id}</TableCell>
                      <TableCell>{appointment.patient}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {appointment.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {appointment.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditAppointment(appointment)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelAppointment(appointment.id)}
                            disabled={appointment.status === "Cancelled"}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Doctor Availability</CardTitle>
              <CardDescription>Current doctor schedules and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {doctors.map((doctor) => (
                  <Card key={doctor.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{doctor.name}</CardTitle>
                      <CardDescription className="text-xs">{doctor.department}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Available Times:</p>
                        <div className="flex flex-wrap gap-1">
                          {doctor.available.map((time) => (
                            <Badge key={time} variant="outline" className="text-xs">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
