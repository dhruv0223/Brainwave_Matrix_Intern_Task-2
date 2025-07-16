"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Users, Calendar, UserCheck, Clock } from "lucide-react"

export function StaffManagement() {
  const [showAddForm, setShowAddForm] = useState(false)

  const staff = [
    {
      id: "S001",
      name: "Dr. John Smith",
      role: "Doctor",
      department: "Cardiology",
      phone: "+1-555-0101",
      email: "j.smith@hospital.com",
      status: "Active",
      shift: "Morning",
    },
    {
      id: "S002",
      name: "Dr. Sarah Johnson",
      role: "Doctor",
      department: "Neurology",
      phone: "+1-555-0102",
      email: "s.johnson@hospital.com",
      status: "Active",
      shift: "Evening",
    },
    {
      id: "S003",
      name: "Nurse Mary Brown",
      role: "Nurse",
      department: "Emergency",
      phone: "+1-555-0103",
      email: "m.brown@hospital.com",
      status: "Active",
      shift: "Night",
    },
    {
      id: "S004",
      name: "Admin Lisa Wilson",
      role: "Administrator",
      department: "Administration",
      phone: "+1-555-0104",
      email: "l.wilson@hospital.com",
      status: "Active",
      shift: "Morning",
    },
  ]

  const schedules = [
    {
      staffId: "S001",
      name: "Dr. John Smith",
      monday: "9:00-17:00",
      tuesday: "9:00-17:00",
      wednesday: "Off",
      thursday: "9:00-17:00",
      friday: "9:00-17:00",
      saturday: "Off",
      sunday: "Off",
    },
    {
      staffId: "S002",
      name: "Dr. Sarah Johnson",
      monday: "14:00-22:00",
      tuesday: "14:00-22:00",
      wednesday: "14:00-22:00",
      thursday: "Off",
      friday: "14:00-22:00",
      saturday: "Off",
      sunday: "Off",
    },
    {
      staffId: "S003",
      name: "Nurse Mary Brown",
      monday: "22:00-6:00",
      tuesday: "22:00-6:00",
      wednesday: "22:00-6:00",
      thursday: "22:00-6:00",
      friday: "Off",
      saturday: "Off",
      sunday: "22:00-6:00",
    },
    {
      staffId: "S004",
      name: "Admin Lisa Wilson",
      monday: "8:00-16:00",
      tuesday: "8:00-16:00",
      wednesday: "8:00-16:00",
      thursday: "8:00-16:00",
      friday: "8:00-16:00",
      saturday: "Off",
      sunday: "Off",
    },
  ]

  const departments = ["Cardiology", "Neurology", "Emergency", "Pediatrics", "Orthopedics", "Administration"]
  const roles = ["Doctor", "Nurse", "Administrator", "Technician", "Pharmacist"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Inactive":
        return "secondary"
      case "On Leave":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Staff Management</h3>
          <p className="text-sm text-muted-foreground">Manage hospital staff and schedules</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          {showAddForm ? "View Staff" : "Add Staff Member"}
        </Button>
      </div>

      {showAddForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Staff Member</CardTitle>
            <CardDescription>Register a new staff member in the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="staffName">Full Name</Label>
                <Input id="staffName" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role.toLowerCase()}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase()}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift">Default Shift</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6:00 - 14:00)</SelectItem>
                    <SelectItem value="evening">Evening (14:00 - 22:00)</SelectItem>
                    <SelectItem value="night">Night (22:00 - 6:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">License Number (if applicable)</Label>
                <Input id="license" placeholder="Enter license number" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button>Add Staff Member</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="staff" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="staff" className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Staff Directory
            </TabsTrigger>
            <TabsTrigger value="schedules" className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Schedules
            </TabsTrigger>
          </TabsList>

          <TabsContent value="staff" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{staff.length}</div>
                  <p className="text-xs text-muted-foreground">Active members</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Doctors</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{staff.filter((s) => s.role === "Doctor").length}</div>
                  <p className="text-xs text-muted-foreground">Medical staff</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nurses</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{staff.filter((s) => s.role === "Nurse").length}</div>
                  <p className="text-xs text-muted-foreground">Nursing staff</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">On Duty</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{staff.filter((s) => s.status === "Active").length}</div>
                  <p className="text-xs text-muted-foreground">Currently working</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Staff Directory</CardTitle>
                <CardDescription>Manage hospital staff information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search staff..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.id}</TableCell>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>{member.phone}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.shift}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(member.status)}>{member.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Schedule
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedules</CardTitle>
                <CardDescription>Manage staff work schedules and shifts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff Member</TableHead>
                        <TableHead>Monday</TableHead>
                        <TableHead>Tuesday</TableHead>
                        <TableHead>Wednesday</TableHead>
                        <TableHead>Thursday</TableHead>
                        <TableHead>Friday</TableHead>
                        <TableHead>Saturday</TableHead>
                        <TableHead>Sunday</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedules.map((schedule) => (
                        <TableRow key={schedule.staffId}>
                          <TableCell className="font-medium">{schedule.name}</TableCell>
                          <TableCell>{schedule.monday}</TableCell>
                          <TableCell>{schedule.tuesday}</TableCell>
                          <TableCell>{schedule.wednesday}</TableCell>
                          <TableCell>{schedule.thursday}</TableCell>
                          <TableCell>{schedule.friday}</TableCell>
                          <TableCell>{schedule.saturday}</TableCell>
                          <TableCell>{schedule.sunday}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Edit Schedule
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
