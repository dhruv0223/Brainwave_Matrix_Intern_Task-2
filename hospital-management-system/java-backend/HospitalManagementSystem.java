import java.util.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Main Hospital Management System Class
 * Entry point for the hospital management application
 */
public class HospitalManagementSystem {
    private PatientManager patientManager;
    private AppointmentManager appointmentManager;
    private BillingManager billingManager;
    private InventoryManager inventoryManager;
    private StaffManager staffManager;
    private Scanner scanner;
    
    public HospitalManagementSystem() {
        this.patientManager = new PatientManager();
        this.appointmentManager = new AppointmentManager();
        this.billingManager = new BillingManager();
        this.inventoryManager = new InventoryManager();
        this.staffManager = new StaffManager();
        this.scanner = new Scanner(System.in);
        
        System.out.println("Hospital Management System initialized successfully!");
    }
    
    public void displayMainMenu() {
        System.out.println("\n=== HOSPITAL MANAGEMENT SYSTEM ===");
        System.out.println("1. Patient Registration");
        System.out.println("2. Appointment Scheduling");
        System.out.println("3. Electronic Health Records");
        System.out.println("4. Billing & Invoicing");
        System.out.println("5. Inventory Management");
        System.out.println("6. Staff Management");
        System.out.println("7. Dashboard Statistics");
        System.out.println("8. Exit");
        System.out.print("Select an option: ");
    }
    
    public void run() {
        boolean running = true;
        
        while (running) {
            displayMainMenu();
            int choice = scanner.nextInt();
            scanner.nextLine(); // consume newline
            
            switch (choice) {
                case 1:
                    handlePatientManagement();
                    break;
                case 2:
                    handleAppointmentManagement();
                    break;
                case 3:
                    handleHealthRecords();
                    break;
                case 4:
                    handleBillingManagement();
                    break;
                case 5:
                    handleInventoryManagement();
                    break;
                case 6:
                    handleStaffManagement();
                    break;
                case 7:
                    displayDashboard();
                    break;
                case 8:
                    running = false;
                    System.out.println("Thank you for using Hospital Management System!");
                    break;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }
    }
    
    private void handlePatientManagement() {
        System.out.println("\n=== PATIENT MANAGEMENT ===");
        System.out.println("1. Register New Patient");
        System.out.println("2. View All Patients");
        System.out.println("3. Search Patient");
        System.out.println("4. Update Patient");
        System.out.print("Select option: ");
        
        int choice = scanner.nextInt();
        scanner.nextLine();
        
        switch (choice) {
            case 1:
                registerNewPatient();
                break;
            case 2:
                displayAllPatients();
                break;
            case 3:
                searchPatient();
                break;
            case 4:
                updatePatient();
                break;
        }
    }
    
    private void registerNewPatient() {
        System.out.println("\n--- Register New Patient ---");
        System.out.print("First Name: ");
        String firstName = scanner.nextLine();
        System.out.print("Last Name: ");
        String lastName = scanner.nextLine();
        System.out.print("Age: ");
        int age = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Gender: ");
        String gender = scanner.nextLine();
        System.out.print("Phone: ");
        String phone = scanner.nextLine();
        System.out.print("Email: ");
        String email = scanner.nextLine();
        System.out.print("Blood Group: ");
        String bloodGroup = scanner.nextLine();
        System.out.print("Insurance: ");
        String insurance = scanner.nextLine();
        System.out.print("Address: ");
        String address = scanner.nextLine();
        System.out.print("Emergency Contact: ");
        String emergencyContact = scanner.nextLine();
        
        Patient patient = new Patient(
            patientManager.generatePatientId(),
            firstName, lastName, age, gender, phone, email,
            bloodGroup, insurance, address, emergencyContact
        );
        
        patientManager.addPatient(patient);
        System.out.println("Patient registered successfully! ID: " + patient.getPatientId());
    }
    
    private void displayAllPatients() {
        System.out.println("\n--- All Patients ---");
        List<Patient> patients = patientManager.getAllPatients();
        
        if (patients.isEmpty()) {
            System.out.println("No patients found.");
            return;
        }
        
        System.out.printf("%-8s %-20s %-5s %-10s %-15s %-10s%n", 
            "ID", "Name", "Age", "Gender", "Phone", "Status");
        System.out.println("-----------------------------------------------------------------------");
        
        for (Patient patient : patients) {
            System.out.printf("%-8s %-20s %-5d %-10s %-15s %-10s%n",
                patient.getPatientId(),
                patient.getFullName(),
                patient.getAge(),
                patient.getGender(),
                patient.getPhone(),
                patient.getStatus()
            );
        }
    }
    
    private void searchPatient() {
        System.out.print("Enter patient name or ID to search: ");
        String searchTerm = scanner.nextLine();
        List<Patient> results = patientManager.searchPatients(searchTerm);
        
        if (results.isEmpty()) {
            System.out.println("No patients found matching: " + searchTerm);
        } else {
            System.out.println("Search Results:");
            for (Patient patient : results) {
                System.out.println(patient.getPatientId() + " - " + patient.getFullName());
            }
        }
    }
    
    private void updatePatient() {
        System.out.print("Enter Patient ID to update: ");
        String patientId = scanner.nextLine();
        Patient patient = patientManager.getPatient(patientId);
        
        if (patient == null) {
            System.out.println("Patient not found!");
            return;
        }
        
        System.out.println("Current patient: " + patient.getFullName());
        System.out.print("New phone number (current: " + patient.getPhone() + "): ");
        String newPhone = scanner.nextLine();
        
        if (!newPhone.trim().isEmpty()) {
            patient.setPhone(newPhone);
            System.out.println("Patient updated successfully!");
        }
    }
    
    private void handleAppointmentManagement() {
        System.out.println("\n=== APPOINTMENT MANAGEMENT ===");
        System.out.println("1. Schedule New Appointment");
        System.out.println("2. View All Appointments");
        System.out.println("3. Update Appointment Status");
        System.out.print("Select option: ");
        
        int choice = scanner.nextInt();
        scanner.nextLine();
        
        switch (choice) {
            case 1:
                scheduleAppointment();
                break;
            case 2:
                displayAllAppointments();
                break;
            case 3:
                updateAppointmentStatus();
                break;
        }
    }
    
    private void scheduleAppointment() {
        System.out.println("\n--- Schedule New Appointment ---");
        System.out.print("Patient ID: ");
        String patientId = scanner.nextLine();
        
        Patient patient = patientManager.getPatient(patientId);
        if (patient == null) {
            System.out.println("Patient not found!");
            return;
        }
        
        System.out.print("Doctor ID: ");
        String doctorId = scanner.nextLine();
        System.out.print("Doctor Name: ");
        String doctorName = scanner.nextLine();
        System.out.print("Department: ");
        String department = scanner.nextLine();
        System.out.print("Date (YYYY-MM-DD): ");
        String date = scanner.nextLine();
        System.out.print("Time (HH:MM): ");
        String time = scanner.nextLine();
        System.out.print("Appointment Type: ");
        String type = scanner.nextLine();
        System.out.print("Notes: ");
        String notes = scanner.nextLine();
        
        Appointment appointment = new Appointment(
            appointmentManager.generateAppointmentId(),
            patientId, patient.getFullName(), doctorId, doctorName,
            department, date, time, type, notes
        );
        
        appointmentManager.addAppointment(appointment);
        System.out.println("Appointment scheduled successfully! ID: " + appointment.getAppointmentId());
    }
    
    private void displayAllAppointments() {
        System.out.println("\n--- All Appointments ---");
        List<Appointment> appointments = appointmentManager.getAllAppointments();
        
        if (appointments.isEmpty()) {
            System.out.println("No appointments found.");
            return;
        }
        
        System.out.printf("%-8s %-15s %-15s %-12s %-8s %-12s%n", 
            "ID", "Patient", "Doctor", "Date", "Time", "Status");
        System.out.println("------------------------------------------------------------------------");
        
        for (Appointment appointment : appointments) {
            System.out.printf("%-8s %-15s %-15s %-12s %-8s %-12s%n",
                appointment.getAppointmentId(),
                appointment.getPatientName(),
                appointment.getDoctorName(),
                appointment.getDate(),
                appointment.getTime(),
                appointment.getStatus()
            );
        }
    }
    
    private void updateAppointmentStatus() {
        System.out.print("Enter Appointment ID: ");
        String appointmentId = scanner.nextLine();
        System.out.println("Select new status:");
        System.out.println("1. SCHEDULED");
        System.out.println("2. CONFIRMED");
        System.out.println("3. COMPLETED");
        System.out.println("4. CANCELLED");
        System.out.print("Choice: ");
        
        int choice = scanner.nextInt();
        AppointmentStatus status;
        
        switch (choice) {
            case 1: status = AppointmentStatus.SCHEDULED; break;
            case 2: status = AppointmentStatus.CONFIRMED; break;
            case 3: status = AppointmentStatus.COMPLETED; break;
            case 4: status = AppointmentStatus.CANCELLED; break;
            default:
                System.out.println("Invalid choice!");
                return;
        }
        
        if (appointmentManager.updateAppointmentStatus(appointmentId, status)) {
            System.out.println("Appointment status updated successfully!");
        } else {
            System.out.println("Appointment not found!");
        }
    }
    
    private void handleHealthRecords() {
        System.out.println("\n=== ELECTRONIC HEALTH RECORDS ===");
        System.out.println("Feature coming soon...");
    }
    
    private void handleBillingManagement() {
        System.out.println("\n=== BILLING MANAGEMENT ===");
        System.out.println("1. Generate Invoice");
        System.out.println("2. View All Invoices");
        System.out.println("3. Update Payment Status");
        System.out.print("Select option: ");
        
        int choice = scanner.nextInt();
        scanner.nextLine();
        
        switch (choice) {
            case 2:
                displayAllInvoices();
                break;
            default:
                System.out.println("Feature coming soon...");
        }
    }
    
    private void displayAllInvoices() {
        System.out.println("\n--- All Invoices ---");
        List<Invoice> invoices = billingManager.getAllInvoices();
        
        System.out.printf("%-10s %-15s %-12s %-10s %-12s%n", 
            "ID", "Patient", "Date", "Amount", "Status");
        System.out.println("-----------------------------------------------------------");
        
        for (Invoice invoice : invoices) {
            System.out.printf("%-10s %-15s %-12s $%-9.2f %-12s%n",
                invoice.getInvoiceId(),
                invoice.getPatientName(),
                invoice.getDate(),
                invoice.getTotal(),
                invoice.getStatus()
            );
        }
    }
    
    private void handleInventoryManagement() {
        System.out.println("\n=== INVENTORY MANAGEMENT ===");
        System.out.println("1. View All Items");
        System.out.println("2. Low Stock Alert");
        System.out.print("Select option: ");
        
        int choice = scanner.nextInt();
        
        switch (choice) {
            case 1:
                displayAllInventoryItems();
                break;
            case 2:
                displayLowStockItems();
                break;
        }
    }
    
    private void displayAllInventoryItems() {
        System.out.println("\n--- Inventory Items ---");
        List<InventoryItem> items = inventoryManager.getAllItems();
        
        System.out.printf("%-8s %-20s %-15s %-8s %-8s %-12s%n", 
            "ID", "Name", "Category", "Stock", "Min", "Status");
        System.out.println("-----------------------------------------------------------------------");
        
        for (InventoryItem item : items) {
            System.out.printf("%-8s %-20s %-15s %-8d %-8d %-12s%n",
                item.getItemId(),
                item.getName(),
                item.getCategory(),
                item.getCurrentStock(),
                item.getMinStock(),
                item.getStatus()
            );
        }
    }
    
    private void displayLowStockItems() {
        System.out.println("\n--- Low Stock Alert ---");
        List<InventoryItem> lowStockItems = inventoryManager.getLowStockItems();
        
        if (lowStockItems.isEmpty()) {
            System.out.println("No low stock items found.");
        } else {
            for (InventoryItem item : lowStockItems) {
                System.out.println("ALERT: " + item.getName() + " - Current: " + 
                    item.getCurrentStock() + ", Min: " + item.getMinStock());
            }
        }
    }
    
    private void handleStaffManagement() {
        System.out.println("\n=== STAFF MANAGEMENT ===");
        System.out.println("1. View All Staff");
        System.out.println("2. View Staff by Role");
        System.out.print("Select option: ");
        
        int choice = scanner.nextInt();
        
        switch (choice) {
            case 1:
                displayAllStaff();
                break;
            case 2:
                displayStaffByRole();
                break;
        }
    }
    
    private void displayAllStaff() {
        System.out.println("\n--- All Staff Members ---");
        List<StaffMember> staff = staffManager.getAllStaff();
        
        System.out.printf("%-8s %-20s %-15s %-15s %-12s%n", 
            "ID", "Name", "Role", "Department", "Status");
        System.out.println("-----------------------------------------------------------------------");
        
        for (StaffMember member : staff) {
            System.out.printf("%-8s %-20s %-15s %-15s %-12s%n",
                member.getStaffId(),
                member.getFullName(),
                member.getRole(),
                member.getDepartment(),
                member.getStatus()
            );
        }
    }
    
    private void displayStaffByRole() {
        System.out.println("Select role:");
        System.out.println("1. DOCTOR");
        System.out.println("2. NURSE");
        System.out.println("3. ADMIN");
        System.out.println("4. TECHNICIAN");
        System.out.println("5. RECEPTIONIST");
        System.out.print("Choice: ");
        
        int choice = scanner.nextInt();
        StaffRole role;
        
        switch (choice) {
            case 1: role = StaffRole.DOCTOR; break;
            case 2: role = StaffRole.NURSE; break;
            case 3: role = StaffRole.ADMIN; break;
            case 4: role = StaffRole.TECHNICIAN; break;
            case 5: role = StaffRole.RECEPTIONIST; break;
            default:
                System.out.println("Invalid choice!");
                return;
        }
        
        List<StaffMember> staffByRole = staffManager.getStaffByRole(role);
        System.out.println("\n--- " + role + " Staff ---");
        
        for (StaffMember member : staffByRole) {
            System.out.println(member.getStaffId() + " - " + member.getFullName() + 
                " (" + member.getDepartment() + ")");
        }
    }
    
    private void displayDashboard() {
        System.out.println("\n=== DASHBOARD STATISTICS ===");
        System.out.println("Total Patients: " + patientManager.getTotalPatients());
        System.out.println("Today's Appointments: " + appointmentManager.getTodaysAppointmentCount());
        System.out.println("Active Staff: " + staffManager.getActiveStaffCount());
        System.out.println("Low Stock Items: " + inventoryManager.getLowStockItems().size());
        System.out.println("Total Revenue: $" + String.format("%.2f", billingManager.getTotalRevenue()));
        System.out.println("Pending Bills: $" + String.format("%.2f", billingManager.getPendingAmount()));
    }
    
    public static void main(String[] args) {
        HospitalManagementSystem hms = new HospitalManagementSystem();
        hms.run();
    }
}
