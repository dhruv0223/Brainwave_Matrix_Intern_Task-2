"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Users, UserCheck, Clock } from "lucide-react"

enum StaffRole {
  DOCTOR = "Doctor",
  NURSE = "Nurse",
  ADMIN = "Admin",
  TECHNICIAN = "Technician",
  RECEPTIONIST = "Receptionist",
}

enum StaffStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ON_LEAVE = "On Leave",
}

class StaffMember {
  private staffId: string
  private firstName: string
  private lastName: string
  private role: StaffRole
  private department: string
  private phone: string
  private email: string
  private hireDate: string
  private salary: number
  private status: StaffStatus
  private schedule: string[]

  constructor(
    staffId: string,
    firstName: string,
    lastName: string,
    role: StaffRole,
    department: string,
    phone: string,
    email: string,
    hireDate: string,
    salary: number,
  ) {
    this.staffId = staffId
    this.firstName = firstName
    this.lastName = lastName
    this.role = role
    this.department = department
    this.phone = phone
    this.email = email
    this.hireDate = hireDate
    this.salary = salary
    this.status = StaffStatus.ACTIVE
    this.schedule = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  }

  public getStaffId(): string {
    return this.staffId
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
  public getRole(): StaffRole {
    return this.role
  }
  public getDepartment(): string {
    return this.department
  }
  public getPhone(): string {
    return this.phone
  }
  public getEmail(): string {
    return this.email
  }
  public getHireDate(): string {
    return this.hireDate
  }
  public getSalary(): number {
    return this.salary
  }
  public getStatus(): StaffStatus {
    return this.status
  }
  public getSchedule(): string[] {
    return this.schedule
  }

  public setStatus(status: StaffStatus): void {
    this.status = status
  }
  public setSchedule(schedule: string[]): void {
    this.schedule = schedule
  }
  public setSalary(salary: number): void {
    this.salary = salary
  }
}

class StaffManager {
  private staff: Map<string, StaffMember> = new Map()
  private staffCounter = 6

  constructor() {
    this.initializeSampleData()
  }

  private initializeSampleData(): void {
    this.addStaffMember(
      new StaffMember(
        "S001",
        "Dr. John",
        "Smith",
        StaffRole.DOCTOR,
        "Cardiology",
        "+1-555-1001",
        "j.smith@hospital.com",
        "2020-01-15",
        150000,
      ),
    )
    this.addStaffMember(
      new StaffMember(
        "S002",
        "Dr. Sarah",
        "Johnson",
        StaffRole.DOCTOR,
        "Neurology",
        "+1-555-1002",
        "s.johnson@hospital.com",
        "2019-03-20",
        145000,
      ),
    )
    this.addStaffMember(
      new StaffMember(
        "S003",
        "Mary",
        "Brown",
        StaffRole.NURSE,
        "Emergency",
        "+1-555-1003",
        "m.brown@hospital.com",
        "2021-06-10",
        65000,
      ),
    )
    this.addStaffMember(
      new StaffMember(
        "S004",
        "James",
        "Wilson",
        StaffRole.TECHNICIAN,
        "Radiology",
        "+1-555-1004",
        "j.wilson@hospital.com",
        "2022-02-28",
        55000,
      ),
    )
    this.addStaffMember(
      new StaffMember(
        "S005",
        "Lisa",
        "Davis",
        StaffRole.RECEPTIONIST,
        "Front Desk",
        "+1-555-1005",
        "l.davis@hospital.com",
        "2023-01-12",
        35000,
      ),
    )
  }

  public addStaffMember(staff: StaffMember): void {
    this.staff.set(staff.getStaffId(), staff)
  }

  public getAllStaff(): StaffMember[] {
    return Array.from(this.staff.values())
  }

  public getStaffMember(staffId: string): StaffMember | undefined {
    return this.staff.get(staffId)
  }

  public updateStaffStatus(staffId: string, status: StaffStatus): boolean {
    const staff = this.staff.get(staffId)
    if (staff) {
      staff.setStatus(status)
      return true
    }
    return false
  }

  public getStaffByRole(role: StaffRole): StaffMember[] {
    return this.getAllStaff().filter((staff) => staff.getRole() === role)
  }

  public getActiveStaffCount(): number {
    return this.getAllStaff().filter((staff) => staff.getStatus() === StaffStatus.ACTIVE).length
  }

  public getTotalPayroll(): number {
    return this.getAllStaff()
      .filter((staff) => staff.getStatus() === StaffStatus.ACTIVE)
      .reduce((total, staff) => total + staff.getSalary(), 0)
  }

  public generateStaffId(): string {
    return `S${String(this.staffCounter++).padStart(3, "0")}`
  }
}

export function StaffManagementModule() {
  const [staffManager] = useState(() => new StaffManager())
  const [showAddStaff, setShowAddStaff] = useState(false)
  const [staff, setStaff] = useState(() => staffManager.getAllStaff())
  const [filterRole, setFilterRole] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: StaffStatus): "default" | "secondary" | "outline" => {
    switch (status) {
      case StaffStatus.ACTIVE:
        return "secondary"
      case StaffStatus.INACTIVE:
        return "outline"
      case StaffStatus.ON_LEAVE:
        return "default"
      default:
        return "default"
    }
  }

  const getRoleColor = (role: StaffRole): string => {
    switch (role) {
      case StaffRole.DOCTOR:
        return "text-blue-600"
      case StaffRole.NURSE:
        return "text-green-600"
      case StaffRole.ADMIN:
        return "text-purple-600"
      case StaffRole.TECHNICIAN:
        return "text-orange-600"
      case StaffRole.RECEPTIONIST:
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredStaff = staff.filter((member) => {
    const matchesRole = filterRole === "all" || member.getRole() === filterRole
    const matchesSearch =
      member.getFullName().toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.getStaffId().toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRole && matchesSearch
  })

  const handleStatusUpdate = (staffId: string, status: StaffStatus): void => {
    staffManager.updateStaffStatus(staffId, status)
    setStaff(staffManager.getAllStaff())
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Staff Management Module</h3>
          <p className="text-sm text-muted-foreground">
            Java Class: StaffManager | Active Staff: {staffManager.getActiveStaffCount()}
          </p>
        </div>
        <Button onClick={() => setShowAddStaff(!showAddStaff)}>
          <Plus className="w-4 h-4 mr-2" />
          {showAddStaff ? "View Staff" : "Add New Staff"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
            <p className="text-xs text-muted-foreground">All employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffManager.getActiveStaffCount()}</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doctors</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffManager.getStaffByRole(StaffRole.DOCTOR).length}</div>
            <p className="text-xs text-muted-foreground">Medical doctors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(staffManager.getTotalPayroll() / 12).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per month</p>
          </CardContent>
        </Card>
      </div>

      {showAddStaff ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Staff Member</CardTitle>
            <CardDescription>Creating new StaffMember object using constructor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={StaffRole.DOCTOR}>Doctor</SelectItem>
                    <SelectItem value={StaffRole.NURSE}>Nurse</SelectItem>
                    <SelectItem value={StaffRole.ADMIN}>Admin</SelectItem>
                    <SelectItem value={StaffRole.TECHNICIAN}>Technician</SelectItem>
                    <SelectItem value={StaffRole.RECEPTIONIST}>Receptionist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="Enter department" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input id="hireDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Annual Salary</Label>
                <Input id="salary" type="number" placeholder="Enter salary" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddStaff(false)}>
                Cancel
              </Button>
              <Button>Add Staff Member</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Staff Directory</CardTitle>
            <CardDescription>Using StaffManager.getAllStaff() method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value={StaffRole.DOCTOR}>Doctor</SelectItem>
                  <SelectItem value={StaffRole.NURSE}>Nurse</SelectItem>
                  <SelectItem value={StaffRole.ADMIN}>Admin</SelectItem>
                  <SelectItem value={StaffRole.TECHNICIAN}>Technician</SelectItem>
                  <SelectItem value={StaffRole.RECEPTIONIST}>Receptionist</SelectItem>
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
                  <TableHead>Hire Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => (
                  <TableRow key={member.getStaffId()}>
                    <TableCell className="font-medium">{member.getStaffId()}</TableCell>
                    <TableCell>{member.getFullName()}</TableCell>
                    <TableCell>
                      <span className={getRoleColor(member.getRole())}>{member.getRole()}</span>
                    </TableCell>
                    <TableCell>{member.getDepartment()}</TableCell>
                    <TableCell>{member.getPhone()}</TableCell>
                    <TableCell>{member.getHireDate()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(member.getStatus())}>{member.getStatus()}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Select
                          onValueChange={(value) => handleStatusUpdate(member.getStaffId(), value as StaffStatus)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={StaffStatus.ACTIVE}>Active</SelectItem>
                            <SelectItem value={StaffStatus.INACTIVE}>Inactive</SelectItem>
                            <SelectItem value={StaffStatus.ON_LEAVE}>On Leave</SelectItem>
                          </SelectContent>
                        </Select>
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
