import java.util.*;
import java.util.stream.Collectors;

/**
 * Patient Manager Class
 * Handles all patient-related operations and business logic
 */
public class PatientManager {
    private Map<String, Patient> patients;
    private int patientCounter;
    
    public PatientManager() {
        this.patients = new HashMap<>();
        this.patientCounter = 5; // Starting from P005
        initializeSampleData();
    }
    
    /**
     * Initialize sample patient data for demonstration
     */
    private void initializeSampleData() {
        addPatient(new Patient("P001", "John", "Doe", 35, "Male", 
            "+1-555-0123", "john.doe@email.com", "A+", "Blue Cross", 
            "123 Main St, City, State 12345", "Jane Doe - +1-555-0124"));
            
        addPatient(new Patient("P002", "Jane", "Smith", 28, "Female", 
            "+1-555-0124", "jane.smith@email.com", "O-", "Aetna", 
            "456 Oak Ave, City, State 12345", "John Smith - +1-555-0125"));
            
        addPatient(new Patient("P003", "Robert", "Johnson", 45, "Male", 
            "+1-555-0125", "robert.johnson@email.com", "B+", "Medicare", 
            "789 Pine St, City, State 12345", "Mary Johnson - +1-555-0126"));
            
        addPatient(new Patient("P004", "Emily", "Davis", 32, "Female", 
            "+1-555-0126", "emily.davis@email.com", "AB+", "Cigna", 
            "321 Elm St, City, State 12345", "Michael Davis - +1-555-0127"));
    }
    
    /**
     * Add a new patient to the system
     * @param patient Patient object to add
     */
    public void addPatient(Patient patient) {
        patients.put(patient.getPatientId(), patient);
        System.out.println("Patient added: " + patient.getPatientId() + " - " + patient.getFullName());
    }
    
    /**
     * Get all patients in the system
     * @return List of all patients
     */
    public List<Patient> getAllPatients() {
        return new ArrayList<>(patients.values());
    }
    
    /**
     * Get a specific patient by ID
     * @param patientId Patient ID to search for
     * @return Patient object or null if not found
     */
    public Patient getPatient(String patientId) {
        return patients.get(patientId);
    }
    
    /**
     * Update patient information
     * @param patientId Patient ID to update
     * @param updatedPatient Updated patient data
     * @return true if update successful, false otherwise
     */
    public boolean updatePatient(String patientId, Patient updatedPatient) {
        if (patients.containsKey(patientId)) {
            patients.put(patientId, updatedPatient);
            return true;
        }
        return false;
    }
    
    /**
     * Remove a patient from the system
     * @param patientId Patient ID to remove
     * @return true if removal successful, false otherwise
     */
    public boolean removePatient(String patientId) {
        return patients.remove(patientId) != null;
    }
    
    /**
     * Search patients by name or ID
     * @param searchTerm Search term to match against name or ID
     * @return List of matching patients
     */
    public List<Patient> searchPatients(String searchTerm) {
        return patients.values().stream()
                .filter(patient -> 
                    patient.getFullName().toLowerCase().contains(searchTerm.toLowerCase()) ||
                    patient.getPatientId().toLowerCase().contains(searchTerm.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    /**
     * Get patients by status
     * @param status Status to filter by
     * @return List of patients with specified status
     */
    public List<Patient> getPatientsByStatus(String status) {
        return patients.values().stream()
                .filter(patient -> patient.getStatus().equalsIgnoreCase(status))
                .collect(Collectors.toList());
    }
    
    /**
     * Get patients by blood group
     * @param bloodGroup Blood group to filter by
     * @return List of patients with specified blood group
     */
    public List<Patient> getPatientsByBloodGroup(String bloodGroup) {
        return patients.values().stream()
                .filter(patient -> patient.getBloodGroup().equalsIgnoreCase(bloodGroup))
                .collect(Collectors.toList());
    }
    
    /**
     * Generate a new unique patient ID
     * @return New patient ID
     */
    public String generatePatientId() {
        return String.format("P%03d", patientCounter++);
    }
    
    /**
     * Get total number of patients
     * @return Total patient count
     */
    public int getTotalPatients() {
        return patients.size();
    }
    
    /**
     * Get active patients count
     * @return Number of active patients
     */
    public int getActivePatients() {
        return (int) patients.values().stream()
                .filter(patient -> "Active".equalsIgnoreCase(patient.getStatus()))
                .count();
    }
    
    /**
     * Get patient statistics by age group
     * @return Map of age groups and their counts
     */
    public Map<String, Integer> getPatientsByAgeGroup() {
        Map<String, Integer> ageGroups = new HashMap<>();
        ageGroups.put("0-18", 0);
        ageGroups.put("19-35", 0);
        ageGroups.put("36-50", 0);
        ageGroups.put("51-65", 0);
        ageGroups.put("65+", 0);
        
        for (Patient patient : patients.values()) {
            int age = patient.getAge();
            if (age <= 18) {
                ageGroups.put("0-18", ageGroups.get("0-18") + 1);
            } else if (age <= 35) {
                ageGroups.put("19-35", ageGroups.get("19-35") + 1);
            } else if (age <= 50) {
                ageGroups.put("36-50", ageGroups.get("36-50") + 1);
            } else if (age <= 65) {
                ageGroups.put("51-65", ageGroups.get("51-65") + 1);
            } else {
                ageGroups.put("65+", ageGroups.get("65+") + 1);
            }
        }
        
        return ageGroups;
    }
    
    /**
     * Validate patient data
     * @param patient Patient to validate
     * @return true if valid, false otherwise
     */
    public boolean validatePatient(Patient patient) {
        return patient != null &&
               patient.getFirstName() != null && !patient.getFirstName().trim().isEmpty() &&
               patient.getLastName() != null && !patient.getLastName().trim().isEmpty() &&
               patient.getAge() > 0 &&
               patient.getPhone() != null && !patient.getPhone().trim().isEmpty();
    }
    
    /**
     * Display patient summary
     */
    public void displayPatientSummary() {
        System.out.println("\n=== PATIENT SUMMARY ===");
        System.out.println("Total Patients: " + getTotalPatients());
        System.out.println("Active Patients: " + getActivePatients());
        
        Map<String, Integer> ageGroups = getPatientsByAgeGroup();
        System.out.println("\nAge Distribution:");
        for (Map.Entry<String, Integer> entry : ageGroups.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
