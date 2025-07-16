import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Billing Manager Class
 * Handles all billing and invoicing operations
 */
public class BillingManager {
    private Map<String, Invoice> invoices;
    private int invoiceCounter;
    
    public BillingManager() {
        this.invoices = new HashMap<>();
        this.invoiceCounter = 4; // Starting from INV004
        initializeSampleData();
    }
    
    /**
     * Initialize sample billing data
     */
    private void initializeSampleData() {
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String dueDate = LocalDate.now().plusDays(30).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        
        List<BillingItem> items1 = Arrays.asList(
            new BillingItem("I001", "Consultation Fee", 1, 150.00),
            new BillingItem("I002", "Blood Test", 1, 75.00),
            new BillingItem("I003", "X-Ray", 1, 200.00)
        );
        addInvoice(new Invoice("INV001", "P001", "John Doe", today, dueDate, items1));
        
        List<BillingItem> items2 = Arrays.asList(
            new BillingItem("I004", "Specialist Consultation", 1, 250.00),
            new BillingItem("I005", "MRI Scan", 1, 800.00)
        );
        addInvoice(new Invoice("INV002", "P002", "Jane Smith", today, dueDate, items2));
        
        List<BillingItem> items3 = Arrays.asList(
            new BillingItem("I006", "Physical Therapy Session", 3, 100.00),
            new BillingItem("I007", "Medication", 1, 50.00)
        );
        addInvoice(new Invoice("INV003", "P003", "Robert Johnson", today, dueDate, items3));
    }
    
    /**
     * Add new invoice
     * @param invoice Invoice to add
     */
    public void addInvoice(Invoice invoice) {
        invoices.put(invoice.getInvoiceId(), invoice);
        System.out.println("Invoice created: " + invoice.getInvoiceId() + 
            " for " + invoice.getPatientName() + " - $" + invoice.getTotal());
    }
    
    /**
     * Get all invoices
     * @return List of all invoices
     */
    public List<Invoice> getAllInvoices() {
        return new ArrayList<>(invoices.values());
    }
    
    /**
     * Get specific invoice by ID
     * @param invoiceId Invoice ID
     * @return Invoice object or null
     */
    public Invoice getInvoice(String invoiceId) {
        return invoices.get(invoiceId);
    }
    
    /**
     * Update invoice status
     * @param invoiceId Invoice ID
     * @param status New payment status
     * @return true if successful
     */
    public boolean updateInvoiceStatus(String invoiceId, PaymentStatus status) {
        Invoice invoice = invoices.get(invoiceId);
        if (invoice != null) {
            invoice.setStatus(status);
            System.out.println("Invoice " + invoiceId + " status updated to " + status);
            return true;
        }
        return false;
    }
    
    /**
     * Get invoices by patient ID
     * @param patientId Patient ID
     * @return List of invoices for the patient
     */
    public List<Invoice> getInvoicesByPatient(String patientId) {
        return invoices.values().stream()
                .filter(invoice -> invoice.getPatientId().equals(patientId))
                .collect(Collectors.toList());
    }
    
    /**
     * Get invoices by status
     * @param status Payment status
     * @return List of invoices with the status
     */
    public List<Invoice> getInvoicesByStatus(PaymentStatus status) {
        return invoices.values().stream()
                .filter(invoice -> invoice.getStatus() == status)
                .collect(Collectors.toList());
    }
    
    /**
     * Get total revenue from paid invoices
     * @return Total revenue
     */
    public double getTotalRevenue() {
        return invoices.values().stream()
                .filter(invoice -> invoice.getStatus() == PaymentStatus.PAID)
                .mapToDouble(Invoice::getTotal)
                .sum();
    }
    
    /**
     * Get pending amount from unpaid invoices
     * @return Pending amount
     */
    public double getPendingAmount() {
        return invoices.values().stream()
                .filter(invoice -> invoice.getStatus() == PaymentStatus.PENDING)
                .mapToDouble(Invoice::getTotal)
                .sum();
    }
    
    /**
     * Get overdue amount
     * @return Overdue amount
     */
    public double getOverdueAmount() {
        return invoices.values().stream()
                .filter(invoice -> invoice.getStatus() == PaymentStatus.OVERDUE)
                .mapToDouble(Invoice::getTotal)
                .sum();
    }
    
    /**
     * Generate new invoice ID
     * @return New invoice ID
     */
    public String generateInvoiceId() {
        return String.format("INV%03d", invoiceCounter++);
    }
    
    /**
     * Calculate monthly revenue
     * @param month Month (1-12)
     * @param year Year
     * @return Monthly revenue
     */
    public double getMonthlyRevenue(int month, int year) {
        return invoices.values().stream()
                .filter(invoice -> {
                    String[] dateParts = invoice.getDate().split("-");
                    int invoiceYear = Integer.parseInt(dateParts[0]);
                    int invoiceMonth = Integer.parseInt(dateParts[1]);
                    return invoiceYear == year && invoiceMonth == month && 
                           invoice.getStatus() == PaymentStatus.PAID;
                })
                .mapToDouble(Invoice::getTotal)
                .sum();
    }
    
    /**
     * Get billing statistics
     * @return Map of billing statistics
     */
    public Map<String, Object> getBillingStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("Total Invoices", invoices.size());
        stats.put("Total Revenue", getTotalRevenue());
        stats.put("Pending Amount", getPendingAmount());
        stats.put("Overdue Amount", getOverdueAmount());
        
        for (PaymentStatus status : PaymentStatus.values()) {
            stats.put(status.getDisplayName() + " Invoices", getInvoicesByStatus(status).size());
        }
        
        return stats;
    }
    
    /**
     * Display billing summary
     */
    public void displayBillingSummary() {
        System.out.println("\n=== BILLING SUMMARY ===");
        Map<String, Object> stats = getBillingStatistics();
        
        for (Map.Entry<String, Object> entry : stats.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}

/**
 * Billing Item Class
 */
class BillingItem {
    private String itemId;
    private String description;
    private int quantity;
    private double unitPrice;
    private double total;
    
    public BillingItem(String itemId, String description, int quantity, double unitPrice) {
        this.itemId = itemId;
        this.description = description;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.total = quantity * unitPrice;
    }
    
    // Getters
    public String getItemId() { return itemId; }
    public String getDescription() { return description; }
    public int getQuantity() { return quantity; }
    public double getUnitPrice() { return unitPrice; }
    public double getTotal() { return total; }
}

/**
 * Invoice Class
 */
class Invoice {
    private String invoiceId;
    private String patientId;
    private String patientName;
    private String date;
    private String dueDate;
    private List<BillingItem> items;
    private double subtotal;
    private double tax;
    private double total;
    private PaymentStatus status;
    
    public Invoice(String invoiceId, String patientId, String patientName,
                  String date, String dueDate, List<BillingItem> items) {
        this.invoiceId = invoiceId;
        this.patientId = patientId;
        this.patientName = patientName;
        this.date = date;
        this.dueDate = dueDate;
        this.items = items;
        this.subtotal = items.stream().mapToDouble(BillingItem::getTotal).sum();
        this.tax = this.subtotal * 0.08; // 8% tax
        this.total = this.subtotal + this.tax;
        this.status = PaymentStatus.PENDING;
    }
    
    // Getters
    public String getInvoiceId() { return invoiceId; }
    public String getPatientId() { return patientId; }
    public String getPatientName() { return patientName; }
    public String getDate() { return date; }
    public String getDueDate() { return dueDate; }
    public List<BillingItem> getItems() { return items; }
    public double getSubtotal() { return subtotal; }
    public double getTax() { return tax; }
    public double getTotal() { return total; }
    public PaymentStatus getStatus() { return status; }
    
    // Setters
    public void setStatus(PaymentStatus status) { this.status = status; }
}

/**
 * Payment Status Enumeration
 */
enum PaymentStatus {
    PENDING("Pending"),
    PAID("Paid"),
    OVERDUE("Overdue"),
    CANCELLED("Cancelled");
    
    private final String displayName;
    
    PaymentStatus(String displayName) {
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
