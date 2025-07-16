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
import { Search, Plus, Package, AlertTriangle, TrendingDown, Edit } from "lucide-react"

export function InventoryManagement() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [filterCategory, setFilterCategory] = useState("all")

  // Add these state variables:
  const [editingItem, setEditingItem] = useState(null)
  const [inventory, setInventory] = useState([
    {
      id: "I001",
      name: "Surgical Masks",
      category: "PPE",
      currentStock: 150,
      minStock: 200,
      maxStock: 1000,
      unit: "pieces",
      supplier: "MedSupply Co",
      expiryDate: "2025-12-31",
      status: "Low Stock",
    },
    {
      id: "I002",
      name: "Disposable Gloves",
      category: "PPE",
      currentStock: 800,
      minStock: 500,
      maxStock: 2000,
      unit: "pairs",
      supplier: "HealthCare Inc",
      expiryDate: "2026-06-30",
      status: "In Stock",
    },
    {
      id: "I003",
      name: "Paracetamol 500mg",
      category: "Medication",
      currentStock: 50,
      minStock: 100,
      maxStock: 500,
      unit: "tablets",
      supplier: "PharmaCorp",
      expiryDate: "2025-08-15",
      status: "Low Stock",
    },
    {
      id: "I004",
      name: "Syringes 5ml",
      category: "Medical Supplies",
      currentStock: 300,
      minStock: 200,
      maxStock: 1000,
      unit: "pieces",
      supplier: "MedEquip Ltd",
      expiryDate: "2027-01-31",
      status: "In Stock",
    },
    {
      id: "I005",
      name: "Bandages",
      category: "Medical Supplies",
      currentStock: 25,
      minStock: 50,
      maxStock: 200,
      unit: "rolls",
      supplier: "MedSupply Co",
      expiryDate: "2026-03-15",
      status: "Critical",
    },
  ])

  const [itemForm, setItemForm] = useState({
    name: "",
    category: "",
    currentStock: "",
    minStock: "",
    maxStock: "",
    unit: "",
    supplier: "",
    expiryDate: "",
  })

  const categories = ["PPE", "Medication", "Medical Supplies", "Equipment"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "default"
      case "Low Stock":
        return "secondary"
      case "Critical":
        return "destructive"
      case "Out of Stock":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStockPercentage = (current: number, max: number) => {
    return (current / max) * 100
  }

  const filteredInventory =
    filterCategory === "all" ? inventory : inventory.filter((item) => item.category === filterCategory)

  const lowStockItems = inventory.filter((item) => item.currentStock <= item.minStock)
  const criticalItems = inventory.filter((item) => item.status === "Critical")

  // Add these functions:
  const handleEditItem = (item) => {
    setEditingItem(item)
    setItemForm({
      name: item.name,
      category: item.category,
      currentStock: item.currentStock.toString(),
      minStock: item.minStock.toString(),
      maxStock: item.maxStock.toString(),
      unit: item.unit,
      supplier: item.supplier,
      expiryDate: item.expiryDate,
    })
    setShowAddForm(true)
  }

  const handleSaveItem = () => {
    const itemData = {
      ...itemForm,
      currentStock: Number.parseInt(itemForm.currentStock),
      minStock: Number.parseInt(itemForm.minStock),
      maxStock: Number.parseInt(itemForm.maxStock),
      status: Number.parseInt(itemForm.currentStock) <= Number.parseInt(itemForm.minStock) ? "Low Stock" : "In Stock",
    }

    if (editingItem) {
      setInventory((prev) => prev.map((item) => (item.id === editingItem.id ? { ...item, ...itemData } : item)))
      setEditingItem(null)
    } else {
      const newItem = {
        id: `I${String(inventory.length + 1).padStart(3, "0")}`,
        ...itemData,
      }
      setInventory((prev) => [...prev, newItem])
    }

    setItemForm({
      name: "",
      category: "",
      currentStock: "",
      minStock: "",
      maxStock: "",
      unit: "",
      supplier: "",
      expiryDate: "",
    })
    setShowAddForm(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setItemForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Inventory Management</h3>
          <p className="text-sm text-muted-foreground">Track and manage medical supplies and equipment</p>
        </div>
        <Button
          onClick={() => {
            setShowAddForm(!showAddForm)
            setEditingItem(null)
            setItemForm({
              name: "",
              category: "",
              currentStock: "",
              minStock: "",
              maxStock: "",
              unit: "",
              supplier: "",
              expiryDate: "",
            })
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          {showAddForm ? "View Inventory" : "Add Item"}
        </Button>
      </div>

      {showAddForm ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? "Edit Inventory Item" : "Add New Inventory Item"}</CardTitle>
            <CardDescription>
              {editingItem ? "Edit the selected item" : "Add a new item to the inventory system"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  name="name"
                  placeholder="Enter item name"
                  value={itemForm.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={itemForm.category}
                  onValueChange={(value) => setItemForm((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentStock">Current Stock</Label>
                <Input
                  id="currentStock"
                  name="currentStock"
                  type="number"
                  placeholder="Enter current stock"
                  value={itemForm.currentStock}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">Minimum Stock</Label>
                <Input
                  id="minStock"
                  name="minStock"
                  type="number"
                  placeholder="Enter minimum stock level"
                  value={itemForm.minStock}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStock">Maximum Stock</Label>
                <Input
                  id="maxStock"
                  name="maxStock"
                  type="number"
                  placeholder="Enter maximum stock level"
                  value={itemForm.maxStock}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select
                  value={itemForm.unit}
                  onValueChange={(value) => setItemForm((prev) => ({ ...prev, unit: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pieces">Pieces</SelectItem>
                    <SelectItem value="pairs">Pairs</SelectItem>
                    <SelectItem value="tablets">Tablets</SelectItem>
                    <SelectItem value="rolls">Rolls</SelectItem>
                    <SelectItem value="bottles">Bottles</SelectItem>
                    <SelectItem value="boxes">Boxes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  name="supplier"
                  placeholder="Enter supplier name"
                  value={itemForm.supplier}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={itemForm.expiryDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingItem(null)
                  setItemForm({
                    name: "",
                    category: "",
                    currentStock: "",
                    minStock: "",
                    maxStock: "",
                    unit: "",
                    supplier: "",
                    expiryDate: "",
                  })
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveItem}>{editingItem ? "Save Item" : "Add Item"}</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Alert Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventory.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2</span> new items this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                <TrendingDown className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{lowStockItems.length}</div>
                <p className="text-xs text-muted-foreground">Require restocking</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{criticalItems.length}</div>
                <p className="text-xs text-muted-foreground">Immediate attention needed</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Manage medical supplies and equipment stock levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search inventory..." className="max-w-sm" />
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
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
                    <TableHead>Unit</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>
                              {item.currentStock}/{item.maxStock}
                            </span>
                            <span>{Math.round(getStockPercentage(item.currentStock, item.maxStock))}%</span>
                          </div>
                          <Progress value={getStockPercentage(item.currentStock, item.maxStock)} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditItem(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
