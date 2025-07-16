# Hospital Management System - Java Backend

This is the complete Java backend implementation that mirrors the React frontend interface. The system follows professional Java design patterns and object-oriented programming principles.

## Project Structure

\`\`\`
java-backend/
├── HospitalManagementSystem.java    # Main application class
├── Patient.java                     # Patient entity
├── PatientManager.java             # Patient management operations
├── Appointment.java                # Appointment entity
├── AppointmentStatus.java          # Appointment status enum
├── AppointmentManager.java         # Appointment management operations
├── Doctor.java                     # Doctor entity
├── BillingManager.java             # Billing and invoicing operations
├── InventoryManager.java           # Inventory management operations
├── StaffManager.java               # Staff management operations
└── README.md                       # This file
\`\`\`

## Features

### 1. Patient Management
- **Patient.java**: Entity class with encapsulation (private fields, public getters/setters)
- **PatientManager.java**: CRUD operations, search functionality, statistics
- Sample data initialization with 4 patients
- Patient registration, updates, and search capabilities

### 2. Appointment Scheduling
- **Appointment.java**: Appointment entity with business logic methods
- **AppointmentStatus.java**: Enum for appointment states
- **AppointmentManager.java**: Scheduling, status updates, availability checking
- **Doctor.java**: Doctor entity with available time slots
- Sample appointments with different statuses

### 3. Billing & Invoicing
- **BillingManager.java**: Complete billing system
- Invoice generation with line items
- Payment status tracking
- Revenue calculations and reporting
- Tax calculations (8% default)

### 4. Inventory Management
- **InventoryManager.java**: Stock management system
- Low stock alerts and expiry tracking
- Category-based organization
- Stock level monitoring with percentage calculations
- Supplier information tracking

### 5. Staff Management
- **StaffManager.java**: Employee management system
- Role-based staff organization
- Payroll calculations
- Status tracking (Active, Inactive, On Leave)
- Department-wise staff distribution

## Key Java Concepts Demonstrated

### Object-Oriented Programming
- **Encapsulation**: Private fields with public getters/setters
- **Inheritance**: Enum classes extending base functionality
- **Polymorphism**: Method overriding (toString, equals, hashCode)
- **Abstraction**: Manager classes abstracting business logic

### Design Patterns
- **Singleton Pattern**: Manager classes as single instances
- **Factory Pattern**: ID generation methods
- **Builder Pattern**: Object construction with multiple parameters
- **Strategy Pattern**: Different calculation methods based on types

### Java Features
- **Collections**: HashMap, ArrayList, List interfaces
- **Streams API**: Filtering, mapping, and collecting data
- **Enums**: Type-safe constants with methods
- **Date/Time API**: LocalDate for date handling
- **Exception Handling**: Null checks and validation

## How to Run

1. **Compile all Java files:**
   \`\`\`bash
   javac *.java
   \`\`\`

2. **Run the main application:**
   \`\`\`bash
   java HospitalManagementSystem
   \`\`\`

3. **Follow the menu prompts:**
   - Navigate through different modules
   - Perform CRUD operations
   - View statistics and reports

## Sample Data

The system comes pre-loaded with sample data:
- 4 Patients (P001-P004)
- 4 Appointments (A001-A004)
- 4 Doctors (D001-D004)
- 3 Invoices (INV001-INV003)
- 5 Inventory Items (IT001-IT005)
- 5 Staff Members (S001-S005)

## Business Logic Examples

### Patient Registration
\`\`\`java
Patient patient = new Patient(
    patientManager.generatePatientId(),
    "John", "Doe", 35, "Male",
    "+1-555-0123", "john.doe@email.com",
    "A+", "Blue Cross", "123 Main St",
    "Jane Doe - +1-555-0124"
);
patientManager.addPatient(patient);
\`\`\`

### Appointment Scheduling
\`\`\`java
Appointment appointment = new Appointment(
    appointmentManager.generateAppointmentId(),
    "P001", "John Doe", "D001", "Dr. Smith",
    "Cardiology", "2025-07-15", "09:00",
    "Consultation", "Regular checkup"
);
appointmentManager.addAppointment(appointment);
\`\`\`

### Inventory Management
\`\`\`java
InventoryItem item = new InventoryItem(
    "IT001", "Surgical Masks", "PPE",
    50, 100, 1000, 0.50,
    "MedSupply Co", "2025-12-31"
);
inventoryManager.addItem(item);
\`\`\`

## Statistics and Reporting

Each manager class provides comprehensive statistics:
- **Patient Statistics**: Age groups, blood type distribution
- **Appointment Statistics**: Status breakdown, daily counts
- **Billing Statistics**: Revenue, pending amounts, payment status
- **Inventory Statistics**: Stock levels, low stock alerts
- **Staff Statistics**: Role distribution, payroll calculations

## Integration with React Frontend

This Java backend is designed to mirror the exact functionality shown in the React frontend:
- Same class names and method signatures
- Identical business logic and calculations
- Matching data structures and relationships
- Compatible with REST API implementation

## Next Steps

To integrate with the React frontend:
1. Add Spring Boot framework
2. Create REST API endpoints
3. Add database connectivity (JPA/Hibernate)
4. Implement authentication and authorization
5. Add logging and monitoring

This Java implementation provides a solid foundation for a production-ready hospital management system with professional coding standards and best practices.
