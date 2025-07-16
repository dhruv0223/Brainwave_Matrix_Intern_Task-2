"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, DollarSign, FileText, CreditCard } from "lucide-react"

enum PaymentStatus {
  PENDING = "Pending",
  PAID = "Paid",
  OVERDUE = "Overdue",
  CANCELLED = "Cancelled",
}

class BillingItem {
  private itemId: string
  private description: string
  private quantity: number
  private unitPrice: number
  private total: number

  constructor(itemId: string, description: string, quantity: number, unitPrice: number) {
    this.itemId = itemId
    this.description = description
    this.quantity = quantity
    this.unitPrice = unitPrice
    this.total = quantity * unitPrice
  }

  public getItemId(): string {
    return this.itemId
  }
  public getDescription(): string {
    return this.description
  }
  public getQuantity(): number {
    return this.quantity
  }
  public getUnitPrice(): number {
    return this.unitPrice
  }
  public getTotal(): number {
    return this.total
  }
}

class Invoice {
  private invoiceId: string
  private patientId: string
  private patientName: string
  private date: string
  private dueDate: string
  private items: BillingItem[]
  private subtotal: number
  private tax: number
  private total: number
  private status: PaymentStatus

  constructor(
    invoiceId: string,
    patientId: string,
    patientName: string,
    date: string,
    dueDate: string,
    items: BillingItem[],
  ) {
    this.invoiceId = invoiceId
    this.patientId = patientId
    this.patientName = patientName
    this.date = date
    this.dueDate = dueDate
    this.items = items
    this.subtotal = items.reduce((sum, item) => sum + item.getTotal(), 0)
    this.tax = this.subtotal * 0.08
    this.total = this.subtotal + this.tax
    this.status = PaymentStatus.PENDING
  }

  public getInvoiceId(): string {
    return this.invoiceId
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
  public getDueDate(): string {
    return this.dueDate
  }
  public getItems(): BillingItem[] {
    return this.items
  }
  public getSubtotal(): number {
    return this.subtotal
  }
  public getTax(): number {
    return this.tax
  }
  public getTotal(): number {
    return this.total
  }
  public getStatus(): PaymentStatus {
    return this.status
  }

  public setStatus(status: PaymentStatus): void {
    this.status = status
  }
}

class BillingManager {
  private invoices: Map<string, Invoice> = new Map()
  private invoiceCounter = 4

  constructor() {
    this.initializeSampleData()
  }

  private initializeSampleData(): void {
    const items1 = [
      new BillingItem("I001", "Consultation Fee", 1, 150.0),
      new BillingItem("I002", "Blood Test", 1, 75.0),
      new BillingItem("I003", "X-Ray", 1, 200.0),
    ]
    this.addInvoice(new Invoice("INV001", "P001", "John Doe", "2025-07-10", "2025-08-10", items1))

    const items2 = [
      new BillingItem("I004", "Specialist Consultation", 1, 250.0),
      new BillingItem("I005", "MRI Scan", 1, 800.0),
    ]
    this.addInvoice(new Invoice("INV002", "P002", "Jane Smith", "2025-07-12", "2025-08-12", items2))

    const items3 = [
      new BillingItem("I006", "Physical Therapy Session", 3, 100.0),
      new BillingItem("I007", "Medication", 1, 50.0),
    ]
    this.addInvoice(new Invoice("INV003", "P003", "Robert Johnson", "2025-07-14", "2025-08-14", items3))
  }

  public addInvoice(invoice: Invoice): void {
    this.invoices.set(invoice.getInvoiceId(), invoice)
  }

  public getAllInvoices(): Invoice[] {
    return Array.from(this.invoices.values())
  }

  public getInvoice(invoiceId: string): Invoice | undefined {
    return this.invoices.get(invoiceId)
  }

  public updateInvoiceStatus(invoiceId: string, status: PaymentStatus): boolean {
    const invoice = this.invoices.get(invoiceId)
    if (invoice) {
      invoice.setStatus(status)
      return true
    }
    return false
  }

  public generateInvoiceId(): string {
    return `INV${String(this.invoiceCounter++).padStart(3, "0")}`
  }

  public getTotalRevenue(): number {
    return this.getAllInvoices()
      .filter((invoice) => invoice.getStatus() === PaymentStatus.PAID)
      .reduce((sum, invoice) => sum + invoice.getTotal(), 0)
  }

  public getPendingAmount(): number {
    return this.getAllInvoices()
      .filter((invoice) => invoice.getStatus() === PaymentStatus.PENDING)
      .reduce((sum, invoice) => sum + invoice.getTotal(), 0)
  }
}

export function BillingInvoicingModule() {
  const [billingManager] = useState(() => new BillingManager())
  const [showCreateInvoice, setShowCreateInvoice] = useState(false)
  const [invoices, setInvoices] = useState(() => billingManager.getAllInvoices())
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const getStatusColor = (status: PaymentStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case PaymentStatus.PENDING:
        return "default"
      case PaymentStatus.PAID:
        return "secondary"
      case PaymentStatus.OVERDUE:
        return "destructive"
      case PaymentStatus.CANCELLED:
        return "outline"
      default:
        return "default"
    }
  }

  const handleStatusUpdate = (invoiceId: string, status: PaymentStatus): void => {
    billingManager.updateInvoiceStatus(invoiceId, status)
    setInvoices(billingManager.getAllInvoices())
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Billing & Invoicing Module</h3>
          <p className="text-sm text-muted-foreground">
            Java Class: BillingManager | Revenue: ${billingManager.getTotalRevenue().toFixed(2)}
          </p>
        </div>
        <Button onClick={() => setShowCreateInvoice(!showCreateInvoice)}>
          <Plus className="w-4 h-4 mr-2" />
          {showCreateInvoice ? "View Invoices" : "Create Invoice"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${billingManager.getTotalRevenue().toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From paid invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${billingManager.getPendingAmount().toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
            <p className="text-xs text-muted-foreground">Generated invoices</p>
          </CardContent>
        </Card>
      </div>

      {showCreateInvoice ? (
        <Card>
          <CardHeader>
            <CardTitle>Create New Invoice</CardTitle>
            <CardDescription>Creating new Invoice object using constructor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input id="patientId" placeholder="Enter patient ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Billing Items</h4>
              <div className="grid grid-cols-4 gap-2">
                <Label>Description</Label>
                <Label>Quantity</Label>
                <Label>Unit Price</Label>
                <Label>Total</Label>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <Input placeholder="Service description" />
                <Input type="number" placeholder="1" />
                <Input type="number" placeholder="0.00" />
                <Input placeholder="0.00" disabled />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateInvoice(false)}>
                Cancel
              </Button>
              <Button>Generate Invoice</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Invoice Management</CardTitle>
            <CardDescription>Using BillingManager.getAllInvoices() method</CardDescription>
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
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
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.getInvoiceId()}>
                    <TableCell className="font-medium">{invoice.getInvoiceId()}</TableCell>
                    <TableCell>{invoice.getPatientName()}</TableCell>
                    <TableCell>{invoice.getDate()}</TableCell>
                    <TableCell>{invoice.getDueDate()}</TableCell>
                    <TableCell>${invoice.getTotal().toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(invoice.getStatus())}>{invoice.getStatus()}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Select
                          onValueChange={(value) => handleStatusUpdate(invoice.getInvoiceId(), value as PaymentStatus)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={PaymentStatus.PENDING}>Pending</SelectItem>
                            <SelectItem value={PaymentStatus.PAID}>Paid</SelectItem>
                            <SelectItem value={PaymentStatus.OVERDUE}>Overdue</SelectItem>
                            <SelectItem value={PaymentStatus.CANCELLED}>Cancelled</SelectItem>
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
