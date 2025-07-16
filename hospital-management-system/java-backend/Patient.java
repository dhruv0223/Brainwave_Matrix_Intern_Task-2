import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Patient Entity Class
 * Represents a patient in the hospital management system
 */
public class Patient {
    private String patientId;
    private String firstName;
    private String lastName;
    private int age;
    private String gender;
    private String phone;
    private String email;
    private String bloodGroup;
    private String insurance;
    private String address;
    private String emergencyContact;
    private String status;
    private String registrationDate;
    
    // Constructor
    public Patient(String patientId, String firstName, String lastName, int age, 
                  String gender, String phone, String email, String bloodGroup, 
                  String insurance, String address, String emergencyContact) {
        this.patientId = patientId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.bloodGroup = bloodGroup;
        this.insurance = insurance;
        this.address = address;
        this.emergencyContact = emergencyContact;
        this.status = "Active";
        this.registrationDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }
    
    // Getters
    public String getPatientId() {
        return patientId;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public String getFullName() {
        return firstName + " " + lastName;
    }
    
    public int getAge() {
        return age;
    }
    
    public String getGender() {
        return gender;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getBloodGroup() {
        return bloodGroup;
    }
    
    public String getInsurance() {
        return insurance;
    }
    
    public String getAddress() {
        return address;
    }
    
    public String getEmergencyContact() {
        return emergencyContact;
    }
    
    public String getStatus() {
        return status;
    }
    
    public String getRegistrationDate() {
        return registrationDate;
    }
    
    // Setters
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
    
    public void setGender(String gender) {
        this.gender = gender;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }
    
    public void setInsurance(String insurance) {
        this.insurance = insurance;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    @Override
    public String toString() {
        return "Patient{" +
                "patientId='" + patientId + '\'' +
                ", name='" + getFullName() + '\'' +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", phone='" + phone + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
