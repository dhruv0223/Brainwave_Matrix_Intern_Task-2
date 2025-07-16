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

enum AppointmentStatus {
  SCHEDULED = "Scheduled",
  CONFIRMED = "Confirmed",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

class Appointment {
  private appointmentId: string
  private patientId: string
  private patientName: string
  private doctorId: string
  private doctorName: string
  private department: string
  private date: string
  private time: string
  private type: string
  private notes: string
  private status: AppointmentStatus

  constructor(
    appointmentId: string,
    patientId: string,
    patientName: string,
    doctorId: string,
    doctorName: string,
    department: string,
    date: string,
    time: string,
    type: string,
    notes: string,
  ) {
    this.appointmentId = appointmentId
    this.patientId = patientId
    this.patientName = patientName
    this.doctorId = doctorId
    this.doctorName = doctorName
    this.department = department
    this.date = date
    this.time = time
    this.type = type
    this.notes = notes
    this.status = AppointmentStatus.SCHEDULED
  }

  public getAppointmentId(): string {
    return this.appointmentId
  }
  public getPatientId(): string {
    return this.patientId
  }
  public getPatientName(): string {
    return this.patientName
  }
  public getDoctorId(): string {
    return this.doctorId
  }
  public getDoctorName(): string {
    return this.doctorName
  }
  public getDepartment(): string {
    return this.department
  }
  public getDate(): string {
    return this.date
  }
  public getTime(): string {
    return this.time
  }
  public getType(): string {
    return this.type
  }
  public getNotes(): string {
    return this.notes
  }
  public getStatus(): AppointmentStatus {
    return this.status
  }

  public setDate(date: string): void {
    this.date = date
  }
  public setTime(time: string): void {
    this.time = time
  }
  public setType(type: string): void {
    this.type = type
  }
  public setNotes(notes: string): void {
    this.notes = notes
  }
  public setStatus(status: AppointmentStatus): void {
    this.status = status
  }
}

class Doctor {
  private doctorId: string
  private name: string
  private department: string
  private availableSlots: string[]

  constructor(doctorId: string, name: string, department: string, availableSlots: string[]) {
    this.doctorId = doctorId
    this.name = name
    this.department = department
    this.availableSlots = availableSlots
  }

  public getDoctorId(): string {
    return this.doctorId
  }
  public getName(): string {
    return this.name
  }
  public getDepartment(): string {
    return this.department
  }
  public getAvailableSlots(): string[] {
    return this.availableSlots
  }
}

class AppointmentManager {
  private appointments: Map<string, Appointment> = new Map()
  private doctors: Map<string, Doctor> = new Map()
  private appointmentCounter = 5

  constructor() {
    this.initializeDoctors()
    this.initializeSampleAppointments()
  }

  private initializeDoctors(): void {
    this.doctors.set(
      "D001",
      new Doctor("D001", "Dr. Smith", "Cardiology", ["09:00", "10:00", "11:00", "14:00", "15:00"]),
    )
    this.doctors.set(
      "D002",
      new Doctor("D002", "Dr. Johnson", "Neurology", ["10:00", "11:00", "13:00", "14:00", "16:00"]),
    )
    this.doctors.set(
      "D003",
      new Doctor("D003", "Dr. Brown", "Orthopedics", ["09:00", "10:30", "13:30", "15:00", "16:30"]),
    )
    this.doctors.set(
      "D004",
      new Doctor("D004", "Dr. Wilson", "Pediatrics", ["08:00", "09:30", "11:00", "13:00", "14:30"]),
    )
  }

  private initializeSampleAppointments(): void {
    this.addAppointment(
      new Appointment(
        "A001",
        "P001",
        "John Doe",
        "D001",
        "Dr. Smith",
        "Cardiology",
        "2025-07-15",
        "09:00",
        "Consultation",
        "Regular checkup",
      ),
    )
    this.addAppointment(
      new Appointment(
        "A002",
        "P002",
        "Jane Smith",
        "D002",
        "Dr. Johnson",
        "Neurology",
        "2025-07-15",
        "10:30",
        "Follow-up",
        "Follow-up for headaches",
      ),
    )
    this.addAppointment(
      new Appointment(
        "A003",
        "P003",
        "Robert Johnson",
        "D003",
        "Dr. Brown",
        "Orthopedics",
        "2025-07-15",
        "14:00",
        "Consultation",
        "Knee pain evaluation",
      ),
    )
    this.addAppointment(
      new Appointment(
        "A004",
        "P004",
        "Emily Davis",
        "D004",
        "Dr. Wilson",
        "Pediatrics",
        "2025-07-16",
        "11:00",
        "Routine",
        "Annual checkup",
      ),
    )
  }

  public addAppointment(appointment: Appointment): void {
    this.appointments.set(appointment.getAppointmentId(), appointment)
  }

  public getAllAppointments(): Appointment[] {
    return Array.from(this.appointments.values())
  }

  public getAllDoctors(): Doctor[] {
    return Array.from(this.doctors.values())
  }

  public getAppointment(appointmentId: string): Appointment | undefined {
    return this.appointments.get(appointmentId)
  }

  public updateAppointmentStatus(appointmentId: string, status: AppointmentStatus): boolean {
    const appointment = this.appointments.get(appointmentId)
    if (appointment) {
      appointment.setStatus(status)
      return true
    }
    return false
  }

  public generateAppointmentId(): string {
    return `A${String(this.appointmentCounter++).padStart(3, "0")}`
  }

  public getTodaysAppointmentCount(): number {
    const today = new Date().toISOString().split("T")[0]
    return this.getAllAppointments().filter((apt) => apt.getDate() === today).length
  }
}

export function AppointmentSchedulingModule() {
  const [appointmentManager] = useState(() => new AppointmentManager())
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [appointments, setAppointments] = useState(() => appointmentManager.getAllAppointments())
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)

  const doctors = appointmentManager.getAllDoctors()

  const getStatusColor = (status: AppointmentStatus): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case AppointmentStatus.SCHEDULED:
        return "default"
      case AppointmentStatus.CONFIRMED:
        return "secondary"
      case AppointmentStatus.COMPLETED:
        return "outline"
      case AppointmentStatus.CANCELLED:
        return "destructive"
      default:
        return "default"
    }
  }

  const handleCancelAppointment = (appointmentId: string): void => {
    appointmentManager.updateAppointmentStatus(appointmentId, AppointmentStatus.CANCELLED)
    setAppointments(appointmentManager.getAllAppointments())
  }

  const handleEditAppointment = (appointment: Appointment): void => {
    setEditingAppointment(appointment)
    setShowScheduleForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Appointment Scheduling Module</h3>
          <p className="text-sm text-muted-foreground">
            Java Class: AppointmentManager | Today's Appointments: {appointmentManager.getTodaysAppointmentCount()}
          </p>
        </div>
        <Button onClick={() => setShowScheduleForm(!showScheduleForm)}>
          <Plus className="w-4 h-4 mr-2" />
          {showScheduleForm ? "View Appointments" : "Schedule Appointment"}
        </Button>
      </div>

      {showScheduleForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Appointment</CardTitle>
            <CardDescription>
              {editingAppointment
                ? "Editing appointment using Appointment.setters()"
                : "Creating new Appointment object using constructor"}
            </CardDescription>
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
                      <SelectItem key={doctor.getDoctorId()} value={doctor.getDoctorId()}>
                        {doctor.getName()} - {doctor.getDepartment()}
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
              <Button variant="outline" onClick={() => setShowScheduleForm(false)}>
                Cancel
              </Button>
              <Button>Schedule Appointment</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>Using AppointmentManager.getAllAppointments() method</CardDescription>
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
                    <TableRow key={appointment.getAppointmentId()}>
                      <TableCell className="font-medium">{appointment.getAppointmentId()}</TableCell>
                      <TableCell>{appointment.getPatientName()}</TableCell>
                      <TableCell>{appointment.getDoctorName()}</TableCell>
                      <TableCell>{appointment.getDepartment()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {appointment.getDate()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {appointment.getTime()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(appointment.getStatus())}>{appointment.getStatus()}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditAppointment(appointment)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelAppointment(appointment.getAppointmentId())}
                            disabled={appointment.getStatus() === AppointmentStatus.CANCELLED}
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
              <CardDescription>Using Doctor.getAvailableSlots() method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {doctors.map((doctor) => (
                  <Card key={doctor.getDoctorId()}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{doctor.getName()}</CardTitle>
                      <CardDescription className="text-xs">{doctor.getDepartment()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Available Times:</p>
                        <div className="flex flex-wrap gap-1">
                          {doctor.getAvailableSlots().map((time) => (
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
