import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Appointment Entity Class
 * Represents an appointment in the hospital management system
 */
public class Appointment {
    private String appointmentId;
    private String patientId;
    private String patientName;
    private String doctorId;
    private String doctorName;
    private String department;
    private String date;
    private String time;
    private String type;
    private String notes;
    private AppointmentStatus status;
    private String createdDate;
    
    // Constructor
    public Appointment(String appointmentId, String patientId, String patientName,
                      String doctorId, String doctorName, String department,
                      String date, String time, String type, String notes) {
        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.patientName = patientName;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.department = department;
        this.date = date;
        this.time = time;
        this.type = type;
        this.notes = notes;
        this.status = AppointmentStatus.SCHEDULED;
        this.createdDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }
    
    // Getters
    public String getAppointmentId() {
        return appointmentId;
    }
    
    public String getPatientId() {
        return patientId;
    }
    
    public String getPatientName() {
        return patientName;
    }
    
    public String getDoctorId() {
        return doctorId;
    }
    
    public String getDoctorName() {
        return doctorName;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public String getDate() {
        return date;
    }
    
    public String getTime() {
        return time;
    }
    
    public String getType() {
        return type;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public AppointmentStatus getStatus() {
        return status;
    }
    
    public String getCreatedDate() {
        return createdDate;
    }
    
    // Setters
    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }
    
    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public void setDate(String date) {
        this.date = date;
    }
    
    public void setTime(String time) {
        this.time = time;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }
    
    /**
     * Check if appointment is today
     * @return true if appointment is today
     */
    public boolean isToday() {
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        return today.equals(this.date);
    }
    
    /**
     * Check if appointment is upcoming
     * @return true if appointment is in the future
     */
    public boolean isUpcoming() {
        LocalDate appointmentDate = LocalDate.parse(this.date);
        return appointmentDate.isAfter(LocalDate.now());
    }
    
    /**
     * Check if appointment is past
     * @return true if appointment is in the past
     */
    public boolean isPast() {
        LocalDate appointmentDate = LocalDate.parse(this.date);
        return appointmentDate.isBefore(LocalDate.now());
    }
    
    /**
     * Get appointment duration in minutes (default 30 minutes)
     * @return duration in minutes
     */
    public int getDurationMinutes() {
        switch (type.toLowerCase()) {
            case "consultation":
                return 30;
            case "follow-up":
                return 15;
            case "emergency":
                return 60;
            case "routine":
                return 20;
            default:
                return 30;
        }
    }
    
    @Override
    public String toString() {
        return "Appointment{" +
                "appointmentId='" + appointmentId + '\'' +
                ", patientName='" + patientName + '\'' +
                ", doctorName='" + doctorName + '\'' +
                ", date='" + date + '\'' +
                ", time='" + time + '\'' +
                ", status=" + status +
                '}';
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Appointment that = (Appointment) obj;
        return appointmentId.equals(that.appointmentId);
    }
    
    @Override
    public int hashCode() {
        return appointmentId.hashCode();
    }
}
