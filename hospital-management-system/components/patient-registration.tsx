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

export function PatientRegistration() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingPatient, setEditingPatient] = useState(null)
  const [viewingPatient, setViewingPatient] = useState(null)
  const [formData, setFormData] = useState({
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

  const [patients, setPatients] = useState([
    {
      id: "P001",
      firstName: "John",
      lastName: "Doe",
      age: 35,
      gender: "Male",
      phone: "+1-555-0123",
      email: "john.doe@email.com",
      bloodGroup: "A+",
      insurance: "Blue Cross",
      address: "123 Main St, City, State 12345",
      emergency: "Jane Doe - +1-555-0124",
      status: "Active",
      registrationDate: "2025-01-15",
    },
    {
      id: "P002",
      firstName: "Jane",
      lastName: "Smith",
      age: 28,
      gender: "Female",
      phone: "+1-555-0124",
      email: "jane.smith@email.com",
      bloodGroup: "O-",
      insurance: "Aetna",
      address: "456 Oak Ave, City, State 12345",
      emergency: "John Smith - +1-555-0125",
      status: "Active",
      registrationDate: "2025-02-10",
    },
    {
      id: "P003",
      firstName: "Robert",
      lastName: "Johnson",
      age: 45,
      gender: "Male",
      phone: "+1-555-0125",
      email: "robert.johnson@email.com",
      bloodGroup: "B+",
      insurance: "Medicare",
      address: "789 Pine St, City, State 12345",
      emergency: "Mary Johnson - +1-555-0126",
      status: "Inactive",
      registrationDate: "2024-12-05",
    },
    {
      id: "P004",
      firstName: "Emily",
      lastName: "Davis",
      age: 32,
      gender: "Female",
      phone: "+1-555-0126",
      email: "emily.davis@email.com",
      bloodGroup: "AB+",
      insurance: "Cigna",
      address: "321 Elm St, City, State 12345",
      emergency: "Michael Davis - +1-555-0127",
      status: "Active",
      registrationDate: "2025-03-01",
    },
  ])

  const filteredPatients = patients.filter(
    (patient) =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const resetForm = () => {
    setFormData({
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    if (editingPatient) {
      // Update existing patient
      setPatients((prev) =>
        prev.map((patient) => (patient.id === editingPatient.id ? { ...patient, ...formData } : patient)),
      )
      setEditingPatient(null)
    } else {
      // Add new patient
      const newPatient = {
        id: `P${String(patients.length + 1).padStart(3, "0")}`,
        ...formData,
        age: Number.parseInt(formData.age),
        status: "Active",
        registrationDate: new Date().toISOString().split("T")[0],
      }
      setPatients((prev) => [...prev, newPatient])
    }
    resetForm()
    setShowForm(false)
  }

  const handleEdit = (patient) => {
    setEditingPatient(patient)
    setFormData({
      firstName: patient.firstName,
      lastName: patient.lastName,
      age: patient.age.toString(),
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      bloodGroup: patient.bloodGroup,
      insurance: patient.insurance,
      address: patient.address,
      emergency: patient.emergency,
    })
    setShowForm(true)
  }

  const handleCancel = () => {
    resetForm()
    setEditingPatient(null)
    setShowForm(false)
  }

  const handleView = (patient) => {
    setViewingPatient(patient)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Patient Registration</h3>
          <p className="text-sm text-muted-foreground">Manage patient profiles and registration</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? "View Patients" : "Register New Patient"}
        </Button>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingPatient ? `Edit Patient - ${editingPatient.id}` : "New Patient Registration"}</CardTitle>
            <CardDescription>
              {editingPatient ? "Update patient information" : "Enter patient information to create a new profile"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
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
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
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
                  value={formData.insurance}
                  onChange={(e) => handleInputChange("insurance", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter full address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency">Emergency Contact</Label>
              <Input
                id="emergency"
                placeholder="Emergency contact name and phone"
                value={formData.emergency}
                onChange={(e) => handleInputChange("emergency", e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
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
            <CardDescription>Search and manage existing patients</CardDescription>
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
                Total: {patients.length} patients
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
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{`${patient.firstName} ${patient.lastName}`}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.registrationDate}</TableCell>
                    <TableCell>
                      <Badge variant={patient.status === "Active" ? "default" : "secondary"}>{patient.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleView(patient)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Patient Details - {patient.id}</DialogTitle>
                              <DialogDescription>Complete patient information</DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                              <div className="space-y-2">
                                <Label className="font-medium">Full Name:</Label>
                                <p>{`${patient.firstName} ${patient.lastName}`}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Age:</Label>
                                <p>{patient.age} years</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Gender:</Label>
                                <p>{patient.gender}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Blood Group:</Label>
                                <p>{patient.bloodGroup}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Phone:</Label>
                                <p>{patient.phone}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Email:</Label>
                                <p>{patient.email}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Insurance:</Label>
                                <p>{patient.insurance}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Registration Date:</Label>
                                <p>{patient.registrationDate}</p>
                              </div>
                              <div className="space-y-2 col-span-2">
                                <Label className="font-medium">Address:</Label>
                                <p>{patient.address}</p>
                              </div>
                              <div className="space-y-2 col-span-2">
                                <Label className="font-medium">Emergency Contact:</Label>
                                <p>{patient.emergency}</p>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Status:</Label>
                                <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                                  {patient.status}
                                </Badge>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(patient)}>
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
