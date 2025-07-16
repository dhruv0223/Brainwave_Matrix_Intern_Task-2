"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, FileText, Activity, Pill, TestTube } from "lucide-react"

export function ElectronicHealthRecords() {
  const [selectedPatient, setSelectedPatient] = useState("P001")

  const patients = [
    { id: "P001", name: "John Doe", age: 35, bloodGroup: "A+" },
    { id: "P002", name: "Jane Smith", age: 28, bloodGroup: "O-" },
    { id: "P003", name: "Robert Johnson", age: 45, bloodGroup: "B+" },
  ]

  const medicalHistory = [
    {
      date: "2025-07-10",
      diagnosis: "Hypertension",
      doctor: "Dr. Smith",
      treatment: "Medication prescribed",
      status: "Ongoing",
    },
    {
      date: "2025-06-15",
      diagnosis: "Annual Check-up",
      doctor: "Dr. Johnson",
      treatment: "Routine examination",
      status: "Completed",
    },
    {
      date: "2025-05-20",
      diagnosis: "Flu",
      doctor: "Dr. Brown",
      treatment: "Rest and medication",
      status: "Recovered",
    },
  ]

  const prescriptions = [
    {
      date: "2025-07-10",
      medication: "Lisinopril 10mg",
      dosage: "Once daily",
      duration: "30 days",
      doctor: "Dr. Smith",
    },
    { date: "2025-07-10", medication: "Aspirin 81mg", dosage: "Once daily", duration: "Ongoing", doctor: "Dr. Smith" },
    {
      date: "2025-05-20",
      medication: "Ibuprofen 400mg",
      dosage: "Twice daily",
      duration: "7 days",
      doctor: "Dr. Brown",
    },
  ]

  const labReports = [
    { date: "2025-07-08", test: "Complete Blood Count", result: "Normal", doctor: "Dr. Smith", status: "Completed" },
    {
      date: "2025-07-08",
      test: "Lipid Panel",
      result: "Cholesterol: 220 mg/dL",
      doctor: "Dr. Smith",
      status: "Completed",
    },
    { date: "2025-06-15", test: "Blood Pressure", result: "140/90 mmHg", doctor: "Dr. Johnson", status: "Completed" },
  ]

  const vitals = [
    { date: "2025-07-10", bp: "140/90", pulse: "72", temp: "98.6°F", weight: "180 lbs", height: "5'10\"" },
    { date: "2025-06-15", bp: "135/85", pulse: "68", temp: "98.4°F", weight: "182 lbs", height: "5'10\"" },
    { date: "2025-05-20", bp: "130/80", pulse: "70", temp: "99.2°F", weight: "178 lbs", height: "5'10\"" },
  ]

  const selectedPatientData = patients.find((p) => p.id === selectedPatient)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Electronic Health Records</h3>
          <p className="text-sm text-muted-foreground">Access and manage patient medical records</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Record
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Patient Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Select Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search patients..." className="text-sm" />
            </div>
            <div className="space-y-2">
              {patients.map((patient) => (
                <Button
                  key={patient.id}
                  variant={selectedPatient === patient.id ? "default" : "outline"}
                  className="w-full justify-start text-sm"
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  <div className="text-left">
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {patient.id} • Age {patient.age}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Records */}
        <div className="lg:col-span-3">
          {selectedPatientData && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedPatientData.name}</CardTitle>
                    <CardDescription>
                      Patient ID: {selectedPatientData.id} • Age: {selectedPatientData.age} • Blood Group:{" "}
                      {selectedPatientData.bloodGroup}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Active Patient</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="history" className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      History
                    </TabsTrigger>
                    <TabsTrigger value="prescriptions" className="flex items-center">
                      <Pill className="w-4 h-4 mr-1" />
                      Prescriptions
                    </TabsTrigger>
                    <TabsTrigger value="labs" className="flex items-center">
                      <TestTube className="w-4 h-4 mr-1" />
                      Lab Reports
                    </TabsTrigger>
                    <TabsTrigger value="vitals" className="flex items-center">
                      <Activity className="w-4 h-4 mr-1" />
                      Vitals
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="history" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Medical History</h4>
                      <Button size="sm">Add Entry</Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Diagnosis</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Treatment</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {medicalHistory.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.date}</TableCell>
                            <TableCell className="font-medium">{record.diagnosis}</TableCell>
                            <TableCell>{record.doctor}</TableCell>
                            <TableCell>{record.treatment}</TableCell>
                            <TableCell>
                              <Badge variant={record.status === "Ongoing" ? "default" : "outline"}>
                                {record.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="prescriptions" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Prescriptions</h4>
                      <Button size="sm">New Prescription</Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Medication</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Doctor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prescriptions.map((prescription, index) => (
                          <TableRow key={index}>
                            <TableCell>{prescription.date}</TableCell>
                            <TableCell className="font-medium">{prescription.medication}</TableCell>
                            <TableCell>{prescription.dosage}</TableCell>
                            <TableCell>{prescription.duration}</TableCell>
                            <TableCell>{prescription.doctor}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="labs" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Laboratory Reports</h4>
                      <Button size="sm">Order Test</Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Test</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {labReports.map((report, index) => (
                          <TableRow key={index}>
                            <TableCell>{report.date}</TableCell>
                            <TableCell className="font-medium">{report.test}</TableCell>
                            <TableCell>{report.result}</TableCell>
                            <TableCell>{report.doctor}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{report.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="vitals" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Vital Signs</h4>
                      <Button size="sm">Record Vitals</Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Blood Pressure</TableHead>
                          <TableHead>Pulse</TableHead>
                          <TableHead>Temperature</TableHead>
                          <TableHead>Weight</TableHead>
                          <TableHead>Height</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vitals.map((vital, index) => (
                          <TableRow key={index}>
                            <TableCell>{vital.date}</TableCell>
                            <TableCell className="font-medium">{vital.bp}</TableCell>
                            <TableCell>{vital.pulse}</TableCell>
                            <TableCell>{vital.temp}</TableCell>
                            <TableCell>{vital.weight}</TableCell>
                            <TableCell>{vital.height}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
