"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Search, Plus, FileText, DollarSign, Download, Eye, Edit } from "lucide-react"

export function BillingInvoicing() {
  // Add these state variables at the top of the component:
  const [editingInvoice, setEditingInvoice] = useState(null)
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      patientId: "P001",
      patient: "John Doe",
      date: "2025-07-10",
      amount: 450.0,
      services: [
        { name: "General Consultation", price: 100.0, quantity: 1 },
        { name: "Blood Test", price: 50.0, quantity: 2 },
        { name: "X-Ray", price: 150.0, quantity: 1 },
      ],
      status: "Paid",
      paymentMethod: "Insurance",
    },
    {
      id: "INV-002",
      patientId: "P002",
      patient: "Jane Smith",
      date: "2025-07-09",
      amount: 275.0,
      services: [
        { name: "General Consultation", price: 100.0, quantity: 1 },
        { name: "ECG", price: 75.0, quantity: 1 },
        { name: "Prescription", price: 25.0, quantity: 4 },
      ],
      status: "Pending",
      paymentMethod: "Cash",
    },
    {
      id: "INV-003",
      patientId: "P003",
      patient: "Robert Johnson",
      date: "2025-07-08",
      amount: 180.0,
      services: [
        { name: "General Consultation", price: 100.0, quantity: 1 },
        { name: "Prescription", price: 25.0, quantity: 1 },
      ],
      status: "Overdue",
      paymentMethod: "Card",
    },
  ])
  const [showInvoiceForm, setShowInvoiceForm] = useState(false)
  const [selectedServices, setSelectedServices] = useState([])

  const services = [
    { id: "S001", name: "General Consultation", price: 100.0, category: "Consultation" },
    { id: "S002", name: "Blood Test", price: 50.0, category: "Laboratory" },
    { id: "S003", name: "X-Ray", price: 150.0, category: "Radiology" },
    { id: "S004", name: "ECG", price: 75.0, category: "Cardiology" },
    { id: "S005", name: "Prescription", price: 25.0, category: "Pharmacy" },
    { id: "S006", name: "Emergency Consultation", price: 200.0, category: "Emergency" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "default"
      case "Pending":
        return "secondary"
      case "Overdue":
        return "destructive"
      default:
        return "outline"
    }
  }

  const calculateTotal = () => {
    return selectedServices.reduce((total, service) => total + service.price * (service.quantity || 1), 0)
  }

  const addService = (service) => {
    setSelectedServices([...selectedServices, { ...service, quantity: 1 }])
  }

  const removeService = (index) => {
    setSelectedServices(selectedServices.filter((_, i) => i !== index))
  }

  // Add these functions:
  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice)
    setSelectedServices(invoice.services)
    setShowInvoiceForm(true)
  }

  const handleUpdateInvoiceStatus = (invoiceId, newStatus) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: newStatus } : inv)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Billing & Invoicing</h3>
          <p className="text-sm text-muted-foreground">Manage patient billing and generate invoices</p>
        </div>
        <Button onClick={() => setShowInvoiceForm(!showInvoiceForm)}>
          <Plus className="w-4 h-4 mr-2" />
          {showInvoiceForm ? "View Invoices" : "Generate Invoice"}
        </Button>
      </div>

      {showInvoiceForm ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Generate New Invoice</CardTitle>
              <CardDescription>Create an invoice for patient services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input id="patientId" placeholder="Enter patient ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceDate">Invoice Date</Label>
                  <Input id="invoiceDate" type="date" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Services</h4>
                  <Select
                    onValueChange={(value) => {
                      const service = services.find((s) => s.id === value)
                      if (service) addService(service)
                    }}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Add service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ${service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedServices.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedServices.map((service, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{service.name}</TableCell>
                          <TableCell>{service.category}</TableCell>
                          <TableCell>${service.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={service.quantity}
                              className="w-16"
                              min="1"
                              onChange={(e) => {
                                const newQuantity = Number.parseInt(e.target.value, 10)
                                setSelectedServices((prevServices) => {
                                  const updatedServices = [...prevServices]
                                  updatedServices[index] = { ...service, quantity: newQuantity }
                                  return updatedServices
                                })
                              }}
                            />
                          </TableCell>
                          <TableCell>${(service.price * (service.quantity || 1)).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => removeService(index)}>
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowInvoiceForm(false)}>
                  Cancel
                </Button>
                <Button>Generate Invoice</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${(calculateTotal() * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium">Payment Information</h5>
                <p className="text-sm text-muted-foreground">Payment due within 30 days of invoice date</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Management</CardTitle>
              <CardDescription>View and manage patient invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search invoices..." className="max-w-sm" />
                <Select>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.patient}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </TableCell>
                      {/* Update the actions column in the invoices table: */}
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditInvoice(invoice)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          {invoice.status === "Pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateInvoiceStatus(invoice.id, "Paid")}
                            >
                              Mark Paid
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,750</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-orange-600">3 invoices</span> pending
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$180</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">1 invoice</span> overdue
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
