"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Edit, Heart, Thermometer, Activity } from "lucide-react"

class MedicalRecord {
  private recordId: string
  private patientId: string
  private patientName: string
  private date: string
  private diagnosis: string
  private treatment: string
  private prescription: string
  private notes: string
  private doctorName: string

  constructor(
    recordId: string,
    patientId: string,
    patientName: string,
    date: string,
    diagnosis: string,
    treatment: string,
    prescription: string,
    notes: string,
    doctorName: string,
  ) {
    this.recordId = recordId
    this.patientId = patientId
    this.patientName = patientName
    this.date = date
    this.diagnosis = diagnosis
    this.treatment = treatment
    this.prescription = prescription
    this.notes = notes
    this.doctorName = doctorName
  }

  public getRecordId(): string {
    return this.recordId
  }
  public getPatientId(): string {
    return this.patientId
  }
  public getPatientName(): string {
    return this.patientName
  }
  public getDate(): string {
    return this.date
  }
  public getDiagnosis(): string {
    return this.diagnosis
  }
  public getTreatment(): string {
    return this.treatment
  }
  public getPrescription(): string {
    return this.prescription
  }
  public getNotes(): string {
    return this.notes
  }
  public getDoctorName(): string {
    return this.doctorName
  }
}

class VitalSigns {
  private vitalId: string
  private patientId: string
  private date: string
  private bloodPressure: string
  private heartRate: number
  private temperature: number
  private weight: number
  private height: number

  constructor(
    vitalId: string,
    patientId: string,
    date: string,
    bloodPressure: string,
    heartRate: number,
    temperature: number,
    weight: number,
    height: number,
  ) {
    this.vitalId = vitalId
    this.patientId = patientId
    this.date = date
    this.bloodPressure = bloodPressure
    this.heartRate = heartRate
    this.temperature = temperature
    this.weight = weight
    this.height = height
  }

  public getVitalId(): string {
    return this.vitalId
  }
  public getPatientId(): string {
    return this.patientId
  }
  public getDate(): string {
    return this.date
  }
  public getBloodPressure(): string {
    return this.bloodPressure
  }
  public getHeartRate(): number {
    return this.heartRate
  }
  public getTemperature(): number {
    return this.temperature
  }
  public getWeight(): number {
    return this.weight
  }
  public getHeight(): number {
    return this.height
  }
}

class HealthRecordManager {
  private medicalRecords: Map<string, MedicalRecord> = new Map()
  private vitalSigns: Map<string, VitalSigns> = new Map()
  private recordCounter = 4
  private vitalCounter = 4

  constructor() {
    this.initializeSampleData()
  }

  private initializeSampleData(): void {
    this.addMedicalRecord(
      new MedicalRecord(
        "R001",
        "P001",
        "John Doe",
        "2025-07-10",
        "Hypertension",
        "Lifestyle changes, medication",
        "Lisinopril 10mg daily",
        "Patient advised to reduce salt intake",
        "Dr. Smith",
      ),
    )
    this.addMedicalRecord(
      new MedicalRecord(
        "R002",
        "P002",
        "Jane Smith",
        "2025-07-12",
        "Migraine",
        "Pain management",
        "Sumatriptan 50mg as needed",
        "Trigger identification recommended",
        "Dr. Johnson",
      ),
    )
    this.addMedicalRecord(
      new MedicalRecord(
        "R003",
        "P003",
        "Robert Johnson",
        "2025-07-14",
        "Knee Osteoarthritis",
        "Physical therapy",
        "Ibuprofen 400mg twice daily",
        "Continue exercises at home",
        "Dr. Brown",
      ),
    )

    this.addVitalSigns(new VitalSigns("V001", "P001", "2025-07-10", "140/90", 78, 98.6, 180, 70))
    this.addVitalSigns(new VitalSigns("V002", "P002", "2025-07-12", "120/80", 72, 99.1, 135, 65))
    this.addVitalSigns(new VitalSigns("V003", "P003", "2025-07-14", "130/85", 68, 98.4, 200, 72))
  }

  public addMedicalRecord(record: MedicalRecord): void {
    this.medicalRecords.set(record.getRecordId(), record)
  }

  public addVitalSigns(vital: VitalSigns): void {
    this.vitalSigns.set(vital.getVitalId(), vital)
  }

  public getAllMedicalRecords(): MedicalRecord[] {
    return Array.from(this.medicalRecords.values())
  }

  public getAllVitalSigns(): VitalSigns[] {
    return Array.from(this.vitalSigns.values())
  }

  public getPatientRecords(patientId: string): MedicalRecord[] {
    return this.getAllMedicalRecords().filter((record) => record.getPatientId() === patientId)
  }

  public getPatientVitals(patientId: string): VitalSigns[] {
    return this.getAllVitalSigns().filter((vital) => vital.getPatientId() === patientId)
  }

  public generateRecordId(): string {
    return `R${String(this.recordCounter++).padStart(3, "0")}`
  }

  public generateVitalId(): string {
    return `V${String(this.vitalCounter++).padStart(3, "0")}`
  }
}

export function ElectronicHealthRecordsModule() {
  const [healthRecordManager] = useState(() => new HealthRecordManager())
  const [selectedPatientId, setSelectedPatientId] = useState("P001")
  const [showAddRecord, setShowAddRecord] = useState(false)
  const [activeTab, setActiveTab] = useState("records")

  const medicalRecords = healthRecordManager.getPatientRecords(selectedPatientId)
  const vitalSigns = healthRecordManager.getPatientVitals(selectedPatientId)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Electronic Health Records Module</h3>
          <p className="text-sm text-muted-foreground">Java Class: HealthRecordManager | Patient Records Management</p>
        </div>
        <Button onClick={() => setShowAddRecord(!showAddRecord)}>
          <Plus className="w-4 h-4 mr-2" />
          {showAddRecord ? "View Records" : "Add New Record"}
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <Label htmlFor="patientSelect">Select Patient:</Label>
        <select
          id="patientSelect"
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="P001">P001 - John Doe</option>
          <option value="P002">P002 - Jane Smith</option>
          <option value="P003">P003 - Robert Johnson</option>
          <option value="P004">P004 - Emily Davis</option>
        </select>
      </div>

      {showAddRecord ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Medical Record</CardTitle>
            <CardDescription>Creating new MedicalRecord object using constructor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Input id="diagnosis" placeholder="Enter diagnosis" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Input id="doctor" placeholder="Enter doctor name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="treatment">Treatment</Label>
              <Textarea id="treatment" placeholder="Enter treatment details" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prescription">Prescription</Label>
              <Textarea id="prescription" placeholder="Enter prescription details" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional notes" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddRecord(false)}>
                Cancel
              </Button>
              <Button>Save Record</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="summary">Patient Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription>Using HealthRecordManager.getPatientRecords() method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search records..." className="max-w-sm" />
                  <Badge variant="outline" className="ml-auto">
                    Total: {medicalRecords.length} records
                  </Badge>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Record ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Treatment</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicalRecords.map((record) => (
                      <TableRow key={record.getRecordId()}>
                        <TableCell className="font-medium">{record.getRecordId()}</TableCell>
                        <TableCell>{record.getDate()}</TableCell>
                        <TableCell>{record.getDiagnosis()}</TableCell>
                        <TableCell className="max-w-xs truncate">{record.getTreatment()}</TableCell>
                        <TableCell>{record.getDoctorName()}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs</CardTitle>
                <CardDescription>Using HealthRecordManager.getPatientVitals() method</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Blood Pressure</TableHead>
                      <TableHead>Heart Rate</TableHead>
                      <TableHead>Temperature</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Height</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vitalSigns.map((vital) => (
                      <TableRow key={vital.getVitalId()}>
                        <TableCell>{vital.getDate()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1 text-red-500" />
                            {vital.getBloodPressure()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Activity className="w-4 h-4 mr-1 text-blue-500" />
                            {vital.getHeartRate()} bpm
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Thermometer className="w-4 h-4 mr-1 text-orange-500" />
                            {vital.getTemperature()}°F
                          </div>
                        </TableCell>
                        <TableCell>{vital.getWeight()} lbs</TableCell>
                        <TableCell>{vital.getHeight()} in</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Recent Diagnosis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">
                    {medicalRecords.length > 0
                      ? medicalRecords[medicalRecords.length - 1].getDiagnosis()
                      : "No records"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {medicalRecords.length > 0 ? medicalRecords[medicalRecords.length - 1].getDate() : ""}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Latest Vitals</CardTitle>
                </CardHeader>
                <CardContent>
                  {vitalSigns.length > 0 ? (
                    <div className="space-y-1">
                      <p className="text-sm">BP: {vitalSigns[vitalSigns.length - 1].getBloodPressure()}</p>
                      <p className="text-sm">HR: {vitalSigns[vitalSigns.length - 1].getHeartRate()} bpm</p>
                      <p className="text-sm">Temp: {vitalSigns[vitalSigns.length - 1].getTemperature()}°F</p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No vitals recorded</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{medicalRecords.length}</p>
                  <p className="text-xs text-muted-foreground">Medical records</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
