"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, Edit, Eye, X, Save } from "lucide-react"

// Java-like Patient Entity Class
class Patient {
  private patientId: string
  private firstName: string
  private lastName: string
  private age: number
  private gender: string
  private phone: string
  private email: string
  private bloodGroup: string
  private insurance: string
  private address: string
  private emergencyContact: string
  private status: string
  private registrationDate: string

  constructor(
    patientId: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    phone: string,
    email: string,
    bloodGroup: string,
    insurance: string,
    address: string,
    emergencyContact: string,
  ) {
    this.patientId = patientId
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.gender = gender
    this.phone = phone
    this.email = email
    this.bloodGroup = bloodGroup
    this.insurance = insurance
    this.address = address
    this.emergencyContact = emergencyContact
    this.status = "Active"
    this.registrationDate = new Date().toISOString().split("T")[0]
  }

  // Getters
  public getPatientId(): string {
    return this.patientId
  }
  public getFirstName(): string {
    return this.firstName
  }
  public getLastName(): string {
    return this.lastName
  }
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
  public getAge(): number {
    return this.age
  }
  public getGender(): string {
    return this.gender
  }
  public getPhone(): string {
    return this.phone
  }
  public getEmail(): string {
    return this.email
  }
  public getBloodGroup(): string {
    return this.bloodGroup
  }
  public getInsurance(): string {
    return this.insurance
  }
  public getAddress(): string {
    return this.address
  }
  public getEmergencyContact(): string {
    return this.emergencyContact
  }
  public getStatus(): string {
    return this.status
  }
  public getRegistrationDate(): string {
    return this.registrationDate
  }

  // Setters
  public setFirstName(firstName: string): void {
    this.firstName = firstName
  }
  public setLastName(lastName: string): void {
    this.lastName = lastName
  }
  public setAge(age: number): void {
    this.age = age
  }
  public setGender(gender: string): void {
    this.gender = gender
  }
  public setPhone(phone: string): void {
    this.phone = phone
  }
  public setEmail(email: string): void {
    this.email = email
  }
  public setBloodGroup(bloodGroup: string): void {
    this.bloodGroup = bloodGroup
  }
  public setInsurance(insurance: string): void {
    this.insurance = insurance
  }
  public setAddress(address: string): void {
    this.address = address
  }
  public setEmergencyContact(emergencyContact: string): void {
    this.emergencyContact = emergencyContact
  }
  public setStatus(status: string): void {
    this.status = status
  }
}

// Java-like Patient Manager Class
class PatientManager {
  private patients: Map<string, Patient> = new Map()
  private patientCounter = 5

  constructor() {
    this.initializeSampleData()
  }

  private initializeSampleData(): void {
    this.addPatient(
      new Patient(
        "P001",
        "John",
        "Doe",
        35,
        "Male",
        "+1-555-0123",
        "john.doe@email.com",
        "A+",
        "Blue Cross",
        "123 Main St, City, State 12345",
        "Jane Doe - +1-555-0124",
      ),
    )
    this.addPatient(
      new Patient(
        "P002",
        "Jane",
        "Smith",
        28,
        "Female",
        "+1-555-0124",
        "jane.smith@email.com",
        "O-",
        "Aetna",
        "456 Oak Ave, City, State 12345",
        "John Smith - +1-555-0125",
      ),
    )
    this.addPatient(
      new Patient(
        "P003",
        "Robert",
        "Johnson",
        45,
        "Male",
        "+1-555-0125",
        "robert.johnson@email.com",
        "B+",
        "Medicare",
        "789 Pine St, City, State 12345",
        "Mary Johnson - +1-555-0126",
      ),
    )
    this.addPatient(
      new Patient(
        "P004",
        "Emily",
        "Davis",
        32,
        "Female",
        "+1-555-0126",
        "emily.davis@email.com",
        "AB+",
        "Cigna",
        "321 Elm St, City, State 12345",
        "Michael Davis - +1-555-0127",
      ),
    )
  }

  public addPatient(patient: Patient): void {
    this.patients.set(patient.getPatientId(), patient)
  }

  public getAllPatients(): Patient[] {
    return Array.from(this.patients.values())
  }

  public getPatient(patientId: string): Patient | undefined {
    return this.patients.get(patientId)
  }

  public updatePatient(patientId: string, updatedData: any): boolean {
    const patient = this.patients.get(patientId)
    if (patient) {
      patient.setFirstName(updatedData.firstName)
      patient.setLastName(updatedData.lastName)
      patient.setAge(updatedData.age)
      patient.setGender(updatedData.gender)
      patient.setPhone(updatedData.phone)
      patient.setEmail(updatedData.email)
      patient.setBloodGroup(updatedData.bloodGroup)
      patient.setInsurance(updatedData.insurance)
      patient.setAddress(updatedData.address)
      patient.setEmergencyContact(updatedData.emergency)
      return true
    }
    return false
  }

  public generatePatientId(): string {
    return `P${String(this.patientCounter++).padStart(3, "0")}`
  }

  public getTotalPatients(): number {
    return this.patients.size
  }

  public searchPatients(searchTerm: string): Patient[] {
    return this.getAllPatients().filter(
      (patient) =>
        patient.getFullName().toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.getPatientId().toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }
}

export function PatientRegistrationModule() {
  const [patientManager] = useState(() => new PatientManager())
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [patients, setPatients] = useState(() => patientManager.getAllPatients())

  const [patientForm, setPatientForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    bloodGroup: "",
    insurance: "",
    address: "",
    emergency: "",
  })

  const filteredPatients = searchTerm ? patientManager.searchPatients(searchTerm) : patients

  const resetForm = (): void => {
    setPatientForm({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      bloodGroup: "",
      insurance: "",
      address: "",
      emergency: "",
    })
  }

  const handleInputChange = (field: string, value: string): void => {
    setPatientForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitPatient = (): void => {
    if (editingPatient) {
      patientManager.updatePatient(editingPatient.getPatientId(), patientForm)
      setEditingPatient(null)
    } else {
      const newPatient = new Patient(
        patientManager.generatePatientId(),
        patientForm.firstName,
        patientForm.lastName,
        Number.parseInt(patientForm.age),
        patientForm.gender,
        patientForm.phone,
        patientForm.email,
        patientForm.bloodGroup,
        patientForm.insurance,
        patientForm.address,
        patientForm.emergency,
      )
      patientManager.addPatient(newPatient)
    }
    setPatients(patientManager.getAllPatients())
    resetForm()
    setShowRegistrationForm(false)
  }

  const handleEditPatient = (patient: Patient): void => {
    setEditingPatient(patient)
    setPatientForm({
      firstName: patient.getFirstName(),
      lastName: patient.getLastName(),
      age: patient.getAge().toString(),
      gender: patient.getGender(),
      phone: patient.getPhone(),
      email: patient.getEmail(),
      bloodGroup: patient.getBloodGroup(),
      insurance: patient.getInsurance(),
      address: patient.getAddress(),
      emergency: patient.getEmergencyContact(),
    })
    setShowRegistrationForm(true)
  }

  const handleCancelForm = (): void => {
    resetForm()
    setEditingPatient(null)
    setShowRegistrationForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Patient Registration Module</h3>
          <p className="text-sm text-muted-foreground">
            Java Class: PatientManager | Total Patients: {patientManager.getTotalPatients()}
          </p>
        </div>
        <Button onClick={() => setShowRegistrationForm(!showRegistrationForm)}>
          <Plus className="w-4 h-4 mr-2" />
          {showRegistrationForm ? "View Patients" : "Register New Patient"}
        </Button>
      </div>

      {showRegistrationForm ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingPatient ? `Edit Patient - ${editingPatient.getPatientId()}` : "New Patient Registration"}
            </CardTitle>
            <CardDescription>
              {editingPatient
                ? "Updating patient using PatientManager.updatePatient()"
                : "Creating new Patient object using constructor"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  value={patientForm.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  value={patientForm.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={patientForm.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={patientForm.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={patientForm.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={patientForm.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select
                  value={patientForm.bloodGroup}
                  onValueChange={(value) => handleInputChange("bloodGroup", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance">Insurance Provider</Label>
                <Input
                  id="insurance"
                  placeholder="Enter insurance provider"
                  value={patientForm.insurance}
                  onChange={(e) => handleInputChange("insurance", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter full address"
                value={patientForm.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency">Emergency Contact</Label>
              <Input
                id="emergency"
                placeholder="Emergency contact name and phone"
                value={patientForm.emergency}
                onChange={(e) => handleInputChange("emergency", e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancelForm}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSubmitPatient}>
                <Save className="w-4 h-4 mr-2" />
                {editingPatient ? "Update Patient" : "Register Patient"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Patient Directory</CardTitle>
            <CardDescription>Using PatientManager.getAllPatients() and PatientManager.searchPatients()</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Badge variant="outline" className="ml-auto">
                Total: {patientManager.getTotalPatients()} patients
              </Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.getPatientId()}>
                    <TableCell className="font-medium">{patient.getPatientId()}</TableCell>
                    <TableCell>{patient.getFullName()}</TableCell>
                    <TableCell>{patient.getAge()}</TableCell>
                    <TableCell>{patient.getGender()}</TableCell>
                    <TableCell>{patient.getPhone()}</TableCell>
                    <TableCell>{patient.getRegistrationDate()}</TableCell>
                    <TableCell>
                      <Badge variant={patient.getStatus() === "Active" ? "default" : "secondary"}>
                        {patient.getStatus()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Patient Details - {patient.getPatientId()}</DialogTitle>
                              <DialogDescription>Complete patient information using getter methods</DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                              <div className="space-y-2">
                                <Label className="font-medium">Full Name:</Label>
                                <p>{patient.getFullName()}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Age:</Label>
                                <p>{patient.getAge()} years</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Gender:</Label>
                                <p>{patient.getGender()}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Blood Group:</Label>
                                <p>{patient.getBloodGroup()}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Phone:</Label>
                                <p>{patient.getPhone()}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Email:</Label>
                                <p>{patient.getEmail()}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Insurance:</Label>
                                <p>{patient.getInsurance()}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Registration Date:</Label>
                                <p>{patient.getRegistrationDate()}</p>
                              </div>
                              <div className="space-y-2 col-span-2">
                                <Label className="font-medium">Address:</Label>
                                <p>{patient.getAddress()}</p>
                              </div>
                              <div className="space-y-2 col-span-2">
                                <Label className="font-medium">Emergency Contact:</Label>
                                <p>{patient.getEmergencyContact()}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Status:</Label>
                                <Badge variant={patient.getStatus() === "Active" ? "default" : "secondary"}>
                                  {patient.getStatus()}
                                </Badge>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" onClick={() => handleEditPatient(patient)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
