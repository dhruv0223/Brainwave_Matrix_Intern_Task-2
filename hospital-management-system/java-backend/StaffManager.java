import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Staff Manager Class
 * Handles all staff management operations
 */
public class StaffManager {
    private Map<String, StaffMember> staff;
    private int staffCounter;
    
    public StaffManager() {
        this.staff = new HashMap<>();
        this.staffCounter = 6; // Starting from S006
        initializeSampleData();
    }
    
    /**
     * Initialize sample staff data
     */
    private void initializeSampleData() {
        addStaffMember(new StaffMember("S001", "Dr. John", "Smith", StaffRole.DOCTOR, 
            "Cardiology", "+1-555-1001", "j.smith@hospital.com", "2020-01-15", 150000));
        addStaffMember(new StaffMember("S002", "Dr. Sarah", "Johnson", StaffRole.DOCTOR, 
            "Neurology", "+1-555-1002", "s.johnson@hospital.com", "2019-03-20", 145000));
        addStaffMember(new StaffMember("S003", "Mary", "Brown", StaffRole.NURSE, 
            "Emergency", "+1-555-1003", "m.brown@hospital.com", "2021-06-10", 65000));
        addStaffMember(new StaffMember("S004", "James", "Wilson", StaffRole.TECHNICIAN, 
            "Radiology", "+1-555-1004", "j.wilson@hospital.com", "2022-02-28", 55000));
        addStaffMember(new StaffMember("S005", "Lisa", "Davis", StaffRole.RECEPTIONIST, 
            "Front Desk", "+1-555-1005", "l.davis@hospital.com", "2023-01-12", 35000));
    }
    
    /**
     * Add new staff member
     * @param staffMember Staff member to add
     */
    public void addStaffMember(StaffMember staffMember) {
        staff.put(staffMember.getStaffId(), staffMember);
        System.out.println("Staff member added: " + staffMember.getStaffId() + 
            " - " + staffMember.getFullName());
    }
    
    /**
     * Get all staff members
     * @return List of all staff
     */
    public List<StaffMember> getAllStaff() {
        return new ArrayList<>(staff.values());
    }
    
    /**
     * Get specific staff member by ID
     * @param staffId Staff ID
     * @return StaffMember object or null
     */
    public StaffMember getStaffMember(String staffId) {
        return staff.get(staffId);
    }
    
    /**
     * Update staff status
     * @param staffId Staff ID
     * @param status New status
     * @return true if successful
     */
    public boolean updateStaffStatus(String staffId, StaffStatus status) {
        StaffMember staffMember = staff.get(staffId);
        if (staffMember != null) {
            staffMember.setStatus(status);
            System.out.println("Staff " + staffId + " status updated to " + status);
            return true;
        }
        return false;
    }
    
    /**
     * Get staff by role
     * @param role Staff role
     * @return List of staff with the role
     */
    public List<StaffMember> getStaffByRole(StaffRole role) {
        return staff.values().stream()
                .filter(member -> member.getRole() == role)
                .collect(Collectors.toList());
    }
    
    /**
     * Get staff by department
     * @param department Department name
     * @return List of staff in the department
     */
    public List<StaffMember> getStaffByDepartment(String department) {
        return staff.values().stream()
                .filter(member -> member.getDepartment().equalsIgnoreCase(department))
                .collect(Collectors.toList());
    }
    
    /**
     * Get active staff count
     * @return Number of active staff
     */
    public int getActiveStaffCount() {
        return (int) staff.values().stream()
                .filter(member -> member.getStatus() == StaffStatus.ACTIVE)
                .count();
    }
    
    /**
     * Get total payroll
     * @return Total annual payroll for active staff
     */
    public double getTotalPayroll() {
        return staff.values().stream()
                .filter(member -> member.getStatus() == StaffStatus.ACTIVE)
                .mapToDouble(StaffMember::getSalary)
                .sum();
    }
    
    /**
     * Generate new staff ID
     * @return New staff ID
     */
    public String generateStaffId() {
        return String.format("S%03d", staffCounter++);
    }
    
    /**
     * Search staff by name
     * @param searchTerm Search term
     * @return List of matching staff
     */
    public List<StaffMember> searchStaff(String searchTerm) {
        return staff.values().stream()
                .filter(member -> member.getFullName().toLowerCase().contains(searchTerm.toLowerCase()) ||
                                 member.getStaffId().toLowerCase().contains(searchTerm.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    /**
     * Get staff statistics
     * @return Map of staff statistics
     */
    public Map<String, Object> getStaffStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("Total Staff", staff.size());
        stats.put("Active Staff", getActiveStaffCount());
        stats.put("Total Payroll", getTotalPayroll());
        stats.put("Monthly Payroll", getTotalPayroll() / 12);
        
        for (StaffRole role : StaffRole.values()) {
            stats.put(role.getDisplayName() + "s", getStaffByRole(role).size());
        }
        
        for (StaffStatus status : StaffStatus.values()) {
            long count = staff.values().stream()
                    .filter(member -> member.getStatus() == status)
                    .count();
            stats.put(status.getDisplayName() + " Staff", count);
        }
        
        return stats;
    }
    
    /**
     * Display staff summary
     */
    public void displayStaffSummary() {
        System.out.println("\n=== STAFF SUMMARY ===");
        Map<String, Object> stats = getStaffStatistics();
        
        for (Map.Entry<String, Object> entry : stats.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}

/**
 * Staff Member Class
 */
class StaffMember {
    private String staffId;
    private String firstName;
    private String lastName;
    private StaffRole role;
    private String department;
    private String phone;
    private String email;
    private String hireDate;
    private double salary;
    private StaffStatus status;
    private List<String> schedule;
    
    public StaffMember(String staffId, String firstName, String lastName, StaffRole role,
                      String department, String phone, String email, String hireDate, double salary) {
        this.staffId = staffId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.department = department;
        this.phone = phone;
        this.email = email;
        this.hireDate = hireDate;
        this.salary = salary;
        this.status = StaffStatus.ACTIVE;
        this.schedule = Arrays.asList("Monday", "Tuesday", "Wednesday", "Thursday", "Friday");
    }
    
    // Getters
    public String getStaffId() { return staffId; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getFullName() { return firstName + " " + lastName; }
    public StaffRole getRole() { return role; }
    public String getDepartment() { return department; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getHireDate() { return hireDate; }
    public double getSalary() { return salary; }
    public StaffStatus getStatus() { return status; }
    public List<String> getSchedule() { return schedule; }
    
    // Setters
    public void setStatus(StaffStatus status) { this.status = status; }
    public void setSchedule(List<String> schedule) { this.schedule = schedule; }
    public void setSalary(double salary) { this.salary = salary; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setEmail(String email) { this.email = email; }
    public void setDepartment(String department) { this.department = department; }
}

/**
 * Staff Role Enumeration
 */
enum StaffRole {
    DOCTOR("Doctor"),
    NURSE("Nurse"),
    ADMIN("Admin"),
    TECHNICIAN("Technician"),
    RECEPTIONIST("Receptionist");
    
    private final String displayName;
    
    StaffRole(String displayName) {
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

/**
 * Staff Status Enumeration
 */
enum StaffStatus {
    ACTIVE("Active"),
    INACTIVE("Inactive"),
    ON_LEAVE("On Leave");
    
    private final String displayName;
    
    StaffStatus(String displayName) {
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
