"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Edit, Package, AlertTriangle, TrendingDown } from "lucide-react"

enum StockStatus {
  IN_STOCK = "In Stock",
  LOW_STOCK = "Low Stock",
  OUT_OF_STOCK = "Out of Stock",
  EXPIRED = "Expired",
}

class InventoryItem {
  private itemId: string
  private name: string
  private category: string
  private currentStock: number
  private minStock: number
  private maxStock: number
  private unitPrice: number
  private supplier: string
  private expiryDate: string
  private status: StockStatus

  constructor(
    itemId: string,
    name: string,
    category: string,
    currentStock: number,
    minStock: number,
    maxStock: number,
    unitPrice: number,
    supplier: string,
    expiryDate: string,
  ) {
    this.itemId = itemId
    this.name = name
    this.category = category
    this.currentStock = currentStock
    this.minStock = minStock
    this.maxStock = maxStock
    this.unitPrice = unitPrice
    this.supplier = supplier
    this.expiryDate = expiryDate
    this.status = this.calculateStatus()
  }

  private calculateStatus(): StockStatus {
    const today = new Date()
    const expiry = new Date(this.expiryDate)

    if (expiry < today) return StockStatus.EXPIRED
    if (this.currentStock === 0) return StockStatus.OUT_OF_STOCK
    if (this.currentStock <= this.minStock) return StockStatus.LOW_STOCK
    return StockStatus.IN_STOCK
  }

  public getItemId(): string {
    return this.itemId
  }
  public getName(): string {
    return this.name
  }
  public getCategory(): string {
    return this.category
  }
  public getCurrentStock(): number {
    return this.currentStock
  }
  public getMinStock(): number {
    return this.minStock
  }
  public getMaxStock(): number {
    return this.maxStock
  }
  public getUnitPrice(): number {
    return this.unitPrice
  }
  public getSupplier(): string {
    return this.supplier
  }
  public getExpiryDate(): string {
    return this.expiryDate
  }
  public getStatus(): StockStatus {
    return this.status
  }

  public setCurrentStock(stock: number): void {
    this.currentStock = stock
    this.status = this.calculateStatus()
  }

  public getStockPercentage(): number {
    return (this.currentStock / this.maxStock) * 100
  }
}

class InventoryManager {
  private inventory: Map<string, InventoryItem> = new Map()
  private itemCounter = 6

  constructor() {
    this.initializeSampleData()
  }

  private initializeSampleData(): void {
    this.addItem(new InventoryItem("IT001", "Surgical Masks", "PPE", 50, 100, 1000, 0.5, "MedSupply Co", "2025-12-31"))
    this.addItem(
      new InventoryItem("IT002", "Disposable Gloves", "PPE", 200, 150, 2000, 0.25, "SafetyFirst Ltd", "2025-10-15"),
    )
    this.addItem(
      new InventoryItem("IT003", "Paracetamol 500mg", "Medication", 500, 100, 1000, 0.1, "PharmaCorp", "2026-03-20"),
    )
    this.addItem(
      new InventoryItem(
        "IT004",
        "Syringes 5ml",
        "Medical Supplies",
        300,
        200,
        1500,
        0.15,
        "MedEquip Inc",
        "2027-01-10",
      ),
    )
    this.addItem(
      new InventoryItem("IT005", "Bandages", "Medical Supplies", 75, 50, 500, 2.0, "WoundCare Pro", "2026-08-30"),
    )
  }

  public addItem(item: InventoryItem): void {
    this.inventory.set(item.getItemId(), item)
  }

  public getAllItems(): InventoryItem[] {
    return Array.from(this.inventory.values())
  }

  public getItem(itemId: string): InventoryItem | undefined {
    return this.inventory.get(itemId)
  }

  public updateStock(itemId: string, newStock: number): boolean {
    const item = this.inventory.get(itemId)
    if (item) {
      item.setCurrentStock(newStock)
      return true
    }
    return false
  }

  public getLowStockItems(): InventoryItem[] {
    return this.getAllItems().filter(
      (item) => item.getStatus() === StockStatus.LOW_STOCK || item.getStatus() === StockStatus.OUT_OF_STOCK,
    )
  }

  public getExpiredItems(): InventoryItem[] {
    return this.getAllItems().filter((item) => item.getStatus() === StockStatus.EXPIRED)
  }

  public getTotalValue(): number {
    return this.getAllItems().reduce((total, item) => total + item.getCurrentStock() * item.getUnitPrice(), 0)
  }

  public generateItemId(): string {
    return `IT${String(this.itemCounter++).padStart(3, "0")}`
  }
}

export function InventoryManagementModule() {
  const [inventoryManager] = useState(() => new InventoryManager())
  const [showAddItem, setShowAddItem] = useState(false)
  const [items, setItems] = useState(() => inventoryManager.getAllItems())
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: StockStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case StockStatus.IN_STOCK:
        return "secondary"
      case StockStatus.LOW_STOCK:
        return "default"
      case StockStatus.OUT_OF_STOCK:
        return "destructive"
      case StockStatus.EXPIRED:
        return "outline"
      default:
        return "default"
    }
  }

  const getProgressColor = (percentage: number): string => {
    if (percentage > 50) return "bg-green-500"
    if (percentage > 20) return "bg-yellow-500"
    return "bg-red-500"
  }

  const filteredItems = items.filter((item) => {
    const matchesCategory = filterCategory === "all" || item.getCategory() === filterCategory
    const matchesSearch =
      item.getName().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.getItemId().toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleStockUpdate = (itemId: string, newStock: number): void => {
    inventoryManager.updateStock(itemId, newStock)
    setItems(inventoryManager.getAllItems())
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Inventory Management Module</h3>
          <p className="text-sm text-muted-foreground">
            Java Class: InventoryManager | Total Value: ${inventoryManager.getTotalValue().toFixed(2)}
          </p>
        </div>
        <Button onClick={() => setShowAddItem(!showAddItem)}>
          <Plus className="w-4 h-4 mr-2" />
          {showAddItem ? "View Inventory" : "Add New Item"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.length}</div>
            <p className="text-xs text-muted-foreground">In inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryManager.getLowStockItems().length}</div>
            <p className="text-xs text-muted-foreground">Items need reorder</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Items</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryManager.getExpiredItems().length}</div>
            <p className="text-xs text-muted-foreground">Need disposal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${inventoryManager.getTotalValue().toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Inventory worth</p>
          </CardContent>
        </Card>
      </div>

      {showAddItem ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Inventory Item</CardTitle>
            <CardDescription>Creating new InventoryItem object using constructor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input id="itemName" placeholder="Enter item name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PPE">PPE</SelectItem>
                    <SelectItem value="Medication">Medication</SelectItem>
                    <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentStock">Current Stock</Label>
                <Input id="currentStock" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">Minimum Stock</Label>
                <Input id="minStock" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStock">Maximum Stock</Label>
                <Input id="maxStock" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitPrice">Unit Price</Label>
                <Input id="unitPrice" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input id="supplier" placeholder="Enter supplier name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" type="date" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddItem(false)}>
                Cancel
              </Button>
              <Button>Add Item</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>Using InventoryManager.getAllItems() method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="PPE">PPE</SelectItem>
                  <SelectItem value="Medication">Medication</SelectItem>
                  <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.getItemId()}>
                    <TableCell className="font-medium">{item.getItemId()}</TableCell>
                    <TableCell>{item.getName()}</TableCell>
                    <TableCell>{item.getCategory()}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>
                            {item.getCurrentStock()}/{item.getMaxStock()}
                          </span>
                          <span>{item.getStockPercentage().toFixed(0)}%</span>
                        </div>
                        <Progress value={item.getStockPercentage()} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>${item.getUnitPrice().toFixed(2)}</TableCell>
                    <TableCell>{item.getSupplier()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(item.getStatus())}>{item.getStatus()}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          className="w-20 h-8"
                          defaultValue={item.getCurrentStock()}
                          onBlur={(e) => handleStockUpdate(item.getItemId(), Number.parseInt(e.target.value) || 0)}
                        />
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
