/**
 * Appointment Status Enumeration
 * Defines the possible states of an appointment
 */
public enum AppointmentStatus {
    SCHEDULED("Scheduled"),
    CONFIRMED("Confirmed"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled"),
    NO_SHOW("No Show"),
    RESCHEDULED("Rescheduled");
    
    private final String displayName;
    
    AppointmentStatus(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    @Override
    public String toString() {
        return displayName;
    }
    
    /**
     * Get AppointmentStatus from string
     * @param status String representation of status
     * @return AppointmentStatus enum value
     */
    public static AppointmentStatus fromString(String status) {
        for (AppointmentStatus appointmentStatus : AppointmentStatus.values()) {
            if (appointmentStatus.displayName.equalsIgnoreCase(status) || 
                appointmentStatus.name().equalsIgnoreCase(status)) {
                return appointmentStatus;
            }
        }
        return SCHEDULED; // default
    }
    
    /**
     * Check if status indicates appointment is active
     * @return true if appointment is active
     */
    public boolean isActive() {
        return this == SCHEDULED || this == CONFIRMED;
    }
    
    /**
     * Check if status indicates appointment is completed
     * @return true if appointment is completed
     */
    public boolean isCompleted() {
        return this == COMPLETED;
    }
    
    /**
     * Check if status indicates appointment is cancelled
     * @return true if appointment is cancelled
     */
    public boolean isCancelled() {
        return this == CANCELLED || this == NO_SHOW;
    }
}
