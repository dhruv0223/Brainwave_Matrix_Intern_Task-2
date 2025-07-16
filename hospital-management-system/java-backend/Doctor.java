import java.util.List;

/**
 * Doctor Entity Class
 * Represents a doctor in the hospital management system
 */
public class Doctor {
    private String doctorId;
    private String name;
    private String department;
    private List<String> availableSlots;
    
    public Doctor(String doctorId, String name, String department, List<String> availableSlots) {
        this.doctorId = doctorId;
        this.name = name;
        this.department = department;
        this.availableSlots = availableSlots;
    }
    
    // Getters
    public String getDoctorId() {
        return doctorId;
    }
    
    public String getName() {
        return name;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public List<String> getAvailableSlots() {
        return availableSlots;
    }
    
    // Setters
    public void setName(String name) {
        this.name = name;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public void setAvailableSlots(List<String> availableSlots) {
        this.availableSlots = availableSlots;
    }
    
    @Override
    public String toString() {
        return "Doctor{" +
                "doctorId='" + doctorId + '\'' +
                ", name='" + name + '\'' +
                ", department='" + department + '\'' +
                ", availableSlots=" + availableSlots +
                '}';
    }
}
