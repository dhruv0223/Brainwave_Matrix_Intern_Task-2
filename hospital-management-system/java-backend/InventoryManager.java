import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Inventory Manager Class
 * Handles all inventory management operations
 */
public class InventoryManager {
    private Map<String, InventoryItem> inventory;
    private int itemCounter;
    
    public InventoryManager() {
        this.inventory = new HashMap<>();
        this.itemCounter = 6; // Starting from IT006
        initializeSampleData();
    }
    
    /**
     * Initialize sample inventory data
     */
    private void initializeSampleData() {
        addItem(new InventoryItem("IT001", "Surgical Masks", "PPE", 50, 100, 1000, 
            0.50, "MedSupply Co", "2025-12-31"));
        addItem(new InventoryItem("IT002", "Disposable Gloves", "PPE", 200, 150, 2000, 
            0.25, "SafetyFirst Ltd", "2025-10-15"));
        addItem(new InventoryItem("IT003", "Paracetamol 500mg", "Medication", 500, 100, 1000, 
            0.10, "PharmaCorp", "2026-03-20"));
        addItem(new InventoryItem("IT004", "Syringes 5ml", "Medical Supplies", 300, 200, 1500, 
            0.15, "MedEquip Inc", "2027-01-10"));
        addItem(new InventoryItem("IT005", "Bandages", "Medical Supplies", 75, 50, 500, 
            2.00, "WoundCare Pro", "2026-08-30"));
    }
    
    /**
     * Add new inventory item
     * @param item Inventory item to add
     */
    public void addItem(InventoryItem item) {
        inventory.put(item.getItemId(), item);
        System.out.println("Inventory item added: " + item.getItemId() + " - " + item.getName());
    }
    
    /**
     * Get all inventory items
     * @return List of all items
     */
    public List<InventoryItem> getAllItems() {
        return new ArrayList<>(inventory.values());
    }
    
    /**
     * Get specific item by ID
     * @param itemId Item ID
     * @return InventoryItem object or null
     */
    public InventoryItem getItem(String itemId) {
        return inventory.get(itemId);
    }
    
    /**
     * Update stock quantity
     * @param itemId Item ID
     * @param newStock New stock quantity
     * @return true if successful
     */
    public boolean updateStock(String itemId, int newStock) {
        InventoryItem item = inventory.get(itemId);
        if (item != null) {
            item.setCurrentStock(newStock);
            System.out.println("Stock updated for " + item.getName() + ": " + newStock);
            return true;
        }
        return false;
    }
    
    /**
     * Get low stock items
     * @return List of items with low stock
     */
    public List<InventoryItem> getLowStockItems() {
        return inventory.values().stream()
                .filter(item -> item.getStatus() == StockStatus.LOW_STOCK || 
                               item.getStatus() == StockStatus.OUT_OF_STOCK)
                .collect(Collectors.toList());
    }
    
    /**
     * Get expired items
     * @return List of expired items
     */
    public List<InventoryItem> getExpiredItems() {
        return inventory.values().stream()
                .filter(item -> item.getStatus() == StockStatus.EXPIRED)
                .collect(Collectors.toList());
    }
    
    /**
     * Get items by category
     * @param category Category to filter by
     * @return List of items in the category
     */
    public List<InventoryItem> getItemsByCategory(String category) {
        return inventory.values().stream()
                .filter(item -> item.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }
    
    /**
     * Get total inventory value
     * @return Total value of all items
     */
    public double getTotalValue() {
        return inventory.values().stream()
                .mapToDouble(item -> item.getCurrentStock() * item.getUnitPrice())
                .sum();
    }
    
    /**
     * Generate new item ID
     * @return New item ID
     */
    public String generateItemId() {
        return String.format("IT%03d", itemCounter++);
    }
    
    /**
     * Search items by name
     * @param searchTerm Search term
     * @return List of matching items
     */
    public List<InventoryItem> searchItems(String searchTerm) {
        return inventory.values().stream()
                .filter(item -> item.getName().toLowerCase().contains(searchTerm.toLowerCase()) ||
                               item.getItemId().toLowerCase().contains(searchTerm.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    /**
     * Get inventory statistics
     * @return Map of inventory statistics
     */
    public Map<String, Object> getInventoryStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("Total Items", inventory.size());
        stats.put("Total Value", getTotalValue());
        stats.put("Low Stock Items", getLowStockItems().size());
        stats.put("Expired Items", getExpiredItems().size());
        
        for (StockStatus status : StockStatus.values()) {
            long count = inventory.values().stream()
                    .filter(item -> item.getStatus() == status)
                    .count();
            stats.put(status.getDisplayName() + " Items", count);
        }
        
        return stats;
    }
    
    /**
     * Display inventory summary
     */
    public void displayInventorySummary() {
        System.out.println("\n=== INVENTORY SUMMARY ===");
        Map<String, Object> stats = getInventoryStatistics();
        
        for (Map.Entry<String, Object> entry : stats.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        System.out.println("\nLow Stock Alerts:");
        for (InventoryItem item : getLowStockItems()) {
            System.out.println("- " + item.getName() + ": " + item.getCurrentStock() + 
                " (Min: " + item.getMinStock() + ")");
        }
    }
}

/**
 * Inventory Item Class
 */
class InventoryItem {
    private String itemId;
    private String name;
    private String category;
    private int currentStock;
    private int minStock;
    private int maxStock;
    private double unitPrice;
    private String supplier;
    private String expiryDate;
    private StockStatus status;
    
    public InventoryItem(String itemId, String name, String category, int currentStock,
                        int minStock, int maxStock, double unitPrice, String supplier, String expiryDate) {
        this.itemId = itemId;
        this.name = name;
        this.category = category;
        this.currentStock = currentStock;
        this.minStock = minStock;
        this.maxStock = maxStock;
        this.unitPrice = unitPrice;
        this.supplier = supplier;
        this.expiryDate = expiryDate;
        this.status = calculateStatus();
    }
    
    private StockStatus calculateStatus() {
        LocalDate today = LocalDate.now();
        LocalDate expiry = LocalDate.parse(this.expiryDate);
        
        if (expiry.isBefore(today)) return StockStatus.EXPIRED;
        if (this.currentStock == 0) return StockStatus.OUT_OF_STOCK;
        if (this.currentStock <= this.minStock) return StockStatus.LOW_STOCK;
        return StockStatus.IN_STOCK;
    }
    
    // Getters
    public String getItemId() { return itemId; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public int getCurrentStock() { return currentStock; }
    public int getMinStock() { return minStock; }
    public int getMaxStock() { return maxStock; }
    public double getUnitPrice() { return unitPrice; }
    public String getSupplier() { return supplier; }
    public String getExpiryDate() { return expiryDate; }
    public StockStatus getStatus() { return status; }
    
    public double getStockPercentage() {
        return (double) currentStock / maxStock * 100;
    }
    
    // Setters
    public void setCurrentStock(int currentStock) {
        this.currentStock = currentStock;
        this.status = calculateStatus();
    }
    
    public void setMinStock(int minStock) { this.minStock = minStock; }
    public void setMaxStock(int maxStock) { this.maxStock = maxStock; }
    public void setUnitPrice(double unitPrice) { this.unitPrice = unitPrice; }
    public void setSupplier(String supplier) { this.supplier = supplier; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
}

/**
 * Stock Status Enumeration
 */
enum StockStatus {
    IN_STOCK("In Stock"),
    LOW_STOCK("Low Stock"),
    OUT_OF_STOCK("Out of Stock"),
    EXPIRED("Expired");
    
    private final String displayName;
    
    StockStatus(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    @Override
    public String toString() {
        return displayName;
    }
}
