"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, FileText, CreditCard, Package, UserCheck, Activity, AlertTriangle, Clock } from "lucide-react"
import { PatientRegistrationModule } from "@/components/PatientRegistrationModule"
import { AppointmentSchedulingModule } from "@/components/AppointmentSchedulingModule"
import { ElectronicHealthRecordsModule } from "@/components/ElectronicHealthRecordsModule"
import { BillingInvoicingModule } from "@/components/BillingInvoicingModule"
import { InventoryManagementModule } from "@/components/InventoryManagementModule"
import { StaffManagementModule } from "@/components/StaffManagementModule"

// Java-like class structure for Hospital Management System
class HospitalManagementSystem {
  private activeModule = "dashboard"

  constructor() {
    this.initializeSystem()
  }

  private initializeSystem(): void {
    console.log("Hospital Management System initialized")
  }

  public setActiveModule(module: string): void {
    this.activeModule = module
  }

  public getActiveModule(): string {
    return this.activeModule
  }
}

// Dashboard Statistics Class
class DashboardStatistics {
  public static getDashboardStats() {
    return [
      { title: "Total Patients", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600" },
      { title: "Today's Appointments", value: "156", change: "+8%", icon: Calendar, color: "text-green-600" },
      { title: "Pending Bills", value: "$45,230", change: "-3%", icon: CreditCard, color: "text-orange-600" },
      { title: "Low Stock Items", value: "23", change: "+5%", icon: AlertTriangle, color: "text-red-600" },
    ]
  }

  public static getRecentActivities() {
    return [
      { type: "appointment", message: "New appointment scheduled for Dr. Smith", time: "2 minutes ago" },
      { type: "patient", message: "Patient John Doe registered", time: "15 minutes ago" },
      { type: "billing", message: "Invoice #INV-001 generated", time: "1 hour ago" },
      { type: "inventory", message: "Low stock alert: Surgical masks", time: "2 hours ago" },
    ]
  }
}

// Main Application Component
export default function HospitalManagementSystemApp() {
  const [hms] = useState(() => new HospitalManagementSystem())
  const [activeModule, setActiveModule] = useState("dashboard")

  const systemModules = [
    { id: "dashboard", name: "Dashboard", icon: Activity, className: "HospitalDashboard" },
    { id: "patients", name: "Patient Registration", icon: Users, className: "PatientRegistrationModule" },
    { id: "appointments", name: "Appointments", icon: Calendar, className: "AppointmentSchedulingModule" },
    { id: "ehr", name: "Health Records", icon: FileText, className: "ElectronicHealthRecordsModule" },
    { id: "billing", name: "Billing", icon: CreditCard, className: "BillingInvoicingModule" },
    { id: "inventory", name: "Inventory", icon: Package, className: "InventoryManagementModule" },
    { id: "staff", name: "Staff Management", icon: UserCheck, className: "StaffManagementModule" },
  ]

  const dashboardStats = DashboardStatistics.getDashboardStats()
  const recentActivities = DashboardStatistics.getRecentActivities()

  const handleModuleChange = (moduleId: string): void => {
    hms.setActiveModule(moduleId)
    setActiveModule(moduleId)
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case "patients":
        return <PatientRegistrationModule />
      case "appointments":
        return <AppointmentSchedulingModule />
      case "ehr":
        return <ElectronicHealthRecordsModule />
      case "billing":
        return <BillingInvoicingModule />
      case "inventory":
        return <InventoryManagementModule />
      case "staff":
        return <StaffManagementModule />
      default:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {dashboardStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {stat.change}
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest system activities and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used functions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleModuleChange("patients")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Register New Patient
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleModuleChange("appointments")}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleModuleChange("billing")}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Generate Invoice
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleModuleChange("inventory")}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Check Inventory
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">HMS</h1>
          <p className="text-sm text-gray-500">Hospital Management System</p>
          <p className="text-xs text-gray-400 mt-1">Java Architecture Pattern</p>
        </div>
        <nav className="mt-6">
          {systemModules.map((module) => {
            const Icon = module.icon
            return (
              <button
                key={module.id}
                onClick={() => handleModuleChange(module.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeModule === module.id ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" : "text-gray-700"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <div>
                  <div>{module.name}</div>
                  <div className="text-xs text-gray-400">{module.className}</div>
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {systemModules.find((m) => m.id === activeModule)?.name || "Dashboard"}
              </h2>
              <p className="text-sm text-gray-500">
                Class: {systemModules.find((m) => m.id === activeModule)?.className || "HospitalDashboard"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                System Online
              </Badge>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{renderActiveModule()}</main>
      </div>
    </div>
  )
}
