import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Appointment Manager Class
 * Handles all appointment-related operations and business logic
 */
public class AppointmentManager {
    private Map<String, Appointment> appointments;
    private Map<String, Doctor> doctors;
    private int appointmentCounter;
    
    public AppointmentManager() {
        this.appointments = new HashMap<>();
        this.doctors = new HashMap<>();
        this.appointmentCounter = 5; // Starting from A005
        initializeDoctors();
        initializeSampleAppointments();
    }
    
    /**
     * Initialize sample doctor data
     */
    private void initializeDoctors() {
        doctors.put("D001", new Doctor("D001", "Dr. Smith", "Cardiology", 
            Arrays.asList("09:00", "10:00", "11:00", "14:00", "15:00")));
        doctors.put("D002", new Doctor("D002", "Dr. Johnson", "Neurology", 
            Arrays.asList("10:00", "11:00", "13:00", "14:00", "16:00")));
        doctors.put("D003", new Doctor("D003", "Dr. Brown", "Orthopedics", 
            Arrays.asList("09:00", "10:30", "13:30", "15:00", "16:30")));
        doctors.put("D004", new Doctor("D004", "Dr. Wilson", "Pediatrics", 
            Arrays.asList("08:00", "09:30", "11:00", "13:00", "14:30")));
    }
    
    /**
     * Initialize sample appointment data
     */
    private void initializeSampleAppointments() {
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String tomorrow = LocalDate.now().plusDays(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        
        addAppointment(new Appointment("A001", "P001", "John Doe", "D001", "Dr. Smith", 
            "Cardiology", today, "09:00", "Consultation", "Regular checkup"));
        addAppointment(new Appointment("A002", "P002", "Jane Smith", "D002", "Dr. Johnson", 
            "Neurology", today, "10:30", "Follow-up", "Follow-up for headaches"));
        addAppointment(new Appointment("A003", "P003", "Robert Johnson", "D003", "Dr. Brown", 
            "Orthopedics", today, "14:00", "Consultation", "Knee pain evaluation"));
        addAppointment(new Appointment("A004", "P004", "Emily Davis", "D004", "Dr. Wilson", 
            "Pediatrics", tomorrow, "11:00", "Routine", "Annual checkup"));
    }
    
    /**
     * Add a new appointment
     * @param appointment Appointment to add
     */
    public void addAppointment(Appointment appointment) {
        appointments.put(appointment.getAppointmentId(), appointment);
        System.out.println("Appointment added: " + appointment.getAppointmentId() + 
            " for " + appointment.getPatientName());
    }
    
    /**
     * Get all appointments
     * @return List of all appointments
     */
    public List<Appointment> getAllAppointments() {
        return new ArrayList<>(appointments.values());
    }
    
    /**
     * Get all doctors
     * @return List of all doctors
     */
    public List<Doctor> getAllDoctors() {
        return new ArrayList<>(doctors.values());
    }
    
    /**
     * Get specific appointment by ID
     * @param appointmentId Appointment ID
     * @return Appointment object or null
     */
    public Appointment getAppointment(String appointmentId) {
        return appointments.get(appointmentId);
    }
    
    /**
     * Update appointment status
     * @param appointmentId Appointment ID
     * @param status New status
     * @return true if successful
     */
    public boolean updateAppointmentStatus(String appointmentId, AppointmentStatus status) {
        Appointment appointment = appointments.get(appointmentId);
        if (appointment != null) {
            appointment.setStatus(status);
            System.out.println("Appointment " + appointmentId + " status updated to " + status);
            return true;
        }
        return false;
    }
    
    /**
     * Cancel appointment
     * @param appointmentId Appointment ID
     * @return true if successful
     */
    public boolean cancelAppointment(String appointmentId) {
        return updateAppointmentStatus(appointmentId, AppointmentStatus.CANCELLED);
    }
    
    /**
     * Reschedule appointment
     * @param appointmentId Appointment ID
     * @param newDate New date
     * @param newTime New time
     * @return true if successful
     */
    public boolean rescheduleAppointment(String appointmentId, String newDate, String newTime) {
        Appointment appointment = appointments.get(appointmentId);
        if (appointment != null) {
            appointment.setDate(newDate);
            appointment.setTime(newTime);
            appointment.setStatus(AppointmentStatus.RESCHEDULED);
            return true;
        }
        return false;
    }
    
    /**
     * Get appointments by patient ID
     * @param patientId Patient ID
     * @return List of appointments for the patient
     */
    public List<Appointment> getAppointmentsByPatient(String patientId) {
        return appointments.values().stream()
                .filter(appointment -> appointment.getPatientId().equals(patientId))
                .collect(Collectors.toList());
    }
    
    /**
     * Get appointments by doctor ID
     * @param doctorId Doctor ID
     * @return List of appointments for the doctor
     */
    public List<Appointment> getAppointmentsByDoctor(String doctorId) {
        return appointments.values().stream()
                .filter(appointment -> appointment.getDoctorId().equals(doctorId))
                .collect(Collectors.toList());
    }
    
    /**
     * Get appointments by date
     * @param date Date in yyyy-MM-dd format
     * @return List of appointments for the date
     */
    public List<Appointment> getAppointmentsByDate(String date) {
        return appointments.values().stream()
                .filter(appointment -> appointment.getDate().equals(date))
                .collect(Collectors.toList());
    }
    
    /**
     * Get today's appointments
     * @return List of today's appointments
     */
    public List<Appointment> getTodaysAppointments() {
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        return getAppointmentsByDate(today);
    }
    
    /**
     * Get today's appointment count
     * @return Number of appointments today
     */
    public int getTodaysAppointmentCount() {
        return getTodaysAppointments().size();
    }
    
    /**
     * Get upcoming appointments
     * @return List of upcoming appointments
     */
    public List<Appointment> getUpcomingAppointments() {
        return appointments.values().stream()
                .filter(Appointment::isUpcoming)
                .sorted((a1, a2) -> a1.getDate().compareTo(a2.getDate()))
                .collect(Collectors.toList());
    }
    
    /**
     * Get appointments by status
     * @param status Appointment status
     * @return List of appointments with the status
     */
    public List<Appointment> getAppointmentsByStatus(AppointmentStatus status) {
        return appointments.values().stream()
                .filter(appointment -> appointment.getStatus() == status)
                .collect(Collectors.toList());
    }
    
    /**
     * Check if time slot is available
     * @param doctorId Doctor ID
     * @param date Date
     * @param time Time
     * @return true if available
     */
    public boolean isTimeSlotAvailable(String doctorId, String date, String time) {
        return appointments.values().stream()
                .noneMatch(appointment -> 
                    appointment.getDoctorId().equals(doctorId) &&
                    appointment.getDate().equals(date) &&
                    appointment.getTime().equals(time) &&
                    appointment.getStatus().isActive());
    }
    
    /**
     * Get available time slots for a doctor on a date
     * @param doctorId Doctor ID
     * @param date Date
     * @return List of available time slots
     */
    public List<String> getAvailableTimeSlots(String doctorId, String date) {
        Doctor doctor = doctors.get(doctorId);
        if (doctor == null) {
            return new ArrayList<>();
        }
        
        return doctor.getAvailableSlots().stream()
                .filter(time -> isTimeSlotAvailable(doctorId, date, time))
                .collect(Collectors.toList());
    }
    
    /**
     * Generate new appointment ID
     * @return New appointment ID
     */
    public String generateAppointmentId() {
        return String.format("A%03d", appointmentCounter++);
    }
    
    /**
     * Get appointment statistics
     * @return Map of statistics
     */
    public Map<String, Integer> getAppointmentStatistics() {
        Map<String, Integer> stats = new HashMap<>();
        
        for (AppointmentStatus status : AppointmentStatus.values()) {
            stats.put(status.getDisplayName(), getAppointmentsByStatus(status).size());
        }
        
        stats.put("Today's Appointments", getTodaysAppointmentCount());
        stats.put("Upcoming Appointments", getUpcomingAppointments().size());
        
        return stats;
    }
    
    /**
     * Display appointment summary
     */
    public void displayAppointmentSummary() {
        System.out.println("\n=== APPOINTMENT SUMMARY ===");
        Map<String, Integer> stats = getAppointmentStatistics();
        
        for (Map.Entry<String, Integer> entry : stats.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
