import { IoCheckmarkCircle } from "react-icons/io5";
import {
  MdOutlinePersonalInjury,
  MdOutlineDashboard,
  MdOutlineShowChart,
} from "react-icons/md";
import { FaSearchPlus, FaClinicMedical } from "react-icons/fa";
import { BsPrescription } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { GrSystem } from "react-icons/gr";
import { UserRoundPlus, CalendarPlus2 } from "lucide-react";

// HOMEPAGE DATA
export const NAV_ITEMS = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About Us",
    url: "/#about-us",
  },
  {
    name: "Services",
    url: "/#services",
  },
  {
    name: "Contact Us",
    url: "/contact-us",
  },
];

export const MEDCONNECT_OFFERS = [
  {
    icon: "/assets/icons/access-24-7.svg",
    name: "24/7 Access",
    description:
      "Enables patients to access healthcare services around the clock, breaking the barriers of limited operational hours of physical CHPS compounds.",
  },
  {
    icon: "/assets/icons/improved-health.svg",
    name: "Improved Health",
    description:
      "Quick access to medical advice and early interventions can prevent the worsening of conditions.",
  },
  {
    icon: "/assets/icons/health-policy.svg",
    name: "Health Policy",
    description:
      "Offers educational materials and resources to improve health literacy among rural populations.",
  },
  {
    icon: "/assets/icons/empowerment.svg",
    name: "Empowerment",
    description:
      "Equips community health workers with mobile tools to collect data, track patient progress, and deliver care more effectively.",
  },
];

export const MEDCONNECT_SERVICES = [
  {
    name: "Community Health Outreach",
    image: "/assets/images/community-outreach.jpg",
    description:
      "We conduct regular community health outreach programs to educate and inform residents about preventive healthcare, maternal and child health, nutrition, and sanitation. These initiatives help raise awareness and promote healthier lifestyles within the community.",
  },
  {
    name: "On-Demand Medical Assistance",
    image: "/assets/images/medical-assistance.jpg",
    description:
      "Our application allows community health workers to provide immediate medical assistance and support for emergencies and chronic conditions. With access to up-to-date patient records and resources, they can deliver timely and effective care.",
  },
  {
    name: "Routine Health Monitoring",
    image: "/assets/images/health-monitoring.jpg",
    description:
      "Through our platform, we facilitate regular health check-ups and monitoring for patients with chronic illnesses, pregnant women, and infants. This ensures early detection of potential health issues and consistent follow-up care, improving overall health outcomes in rural areas.",
  },
];

export const MEDCONNECT_OBJECTIVES = [
  {
    name: "Enhance Healthcare Access",
    icon: "/assets/icons/enhance-healthcare.svg",
  },
  {
    name: "Promote Preventive Healthcare",
    icon: "/assets/icons/promote-healthcare.svg",
  },
  {
    name: "Support Community Health Workers",
    icon: "/assets/icons/community-support.svg",
  },
];

export const MEDCONNECT_OBJECTIVES_CHECKS = [
  {
    name: "Compassion",
    icon: IoCheckmarkCircle,
  },
  {
    name: "Integrity",
    icon: IoCheckmarkCircle,
  },
  {
    name: "Innovation",
    icon: IoCheckmarkCircle,
  },
  {
    name: "Collaboration",
    icon: IoCheckmarkCircle,
  },
  {
    name: "Accessibility",
    icon: IoCheckmarkCircle,
  },
  {
    name: "Excellence",
    icon: IoCheckmarkCircle,
  },
];

export const MEDCONNECT_FAQS = [
  {
    question: "What is the purpose of this application?",
    answer:
      "This application aims to improve healthcare accessibility for rural communities by connecting them with healthcare providers, facilitating medical services, and offering health education and resources.",
  },
  {
    question: "How do I add connect a CHPS compound to this platform?",
    answer:
      "You can connect a CHPS compound to this platform for free by visiting the application dashboard's Add Compound page.",
  },
  {
    question: "Are the services provided through this application free?",
    answer: "Yes, the application provides free access to medical services.",
  },
  {
    question: "Can I access my medical records through the application?",
    answer:
      "Yes, you can access your medical records through the application. Your medical records will be stored securely.",
  },
  {
    question: "How can I give feedback on the services I received?",
    answer:
      "You can give feedback on the services you received through the application's Feedback Page. Your feedback will be used to improve the quality of the services provided.",
  },
  {
    question: "What languages are supported by the application?",
    answer:
      "The application supports different languages such as English, French, Twi, Ewe, Ga and many more.",
  },
];

export const MEDCONNECT_RECENT_ARTICLES = [
  {
    url: "/",
    title: "The Future of Remote Healthcare",
    description:
      "Telemedicine has seen significant advancements in recent years, driven by the COVID-19 pandemic. This article explores the latest technologies and innovations that are shaping the future of remote healthcare, including AI-driven ...",
    image: "/assets/images/remote-healthcare.jpg",
    author: "Teany Walter",
    publishedDate: "20th April, 2024",
    avatar: "/assets/avatars/avatar-teany.svg",
  },
  {
    url: "/",
    title: "Breakthrough in Cancer Treatment",
    description:
      "Researchers have developed a new cancer therapy that shows great promise in early clinical trials. This therapy, which involves targeted gene editing, has the potential to revolutionize cancer treatment by specifically...",
    image: "/assets/images/cancer-treatment.jpg",
    author: "Terry Bleu",
    publishedDate: "06th June, 2024",
    avatar: "/assets/avatars/avatar-terry.svg",
  },
  {
    url: "/",
    title: "Mental Health Crisis Among Youth",
    description:
      "The mental health crisis among young people is escalating, with rising rates of anxiety, depression, and suicide. This article examines the contributing factors, including social media, academic pressure, and the impact of the ...",
    image: "/assets/images/healthy-foods.jpg",
    author: "Lily Garret",
    publishedDate: "29th Aug, 2024",
    avatar: "/assets/avatars/avatar-lily.svg",
  },
];

export const MEDCONNECT_TESTIMONIALS = [
  {
    testimony:
      "MedConnect has transformed our healthcare experience. Booking appointments and consulting with specialists has never been easier. The convenience and efficiency of the app are unmatched.",
    author: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    jobTitle: "Teacher",
  },
  {
    testimony:
      "As a busy professional, finding time for doctor visits was always tough. MedConnect's virtual consultations have been a game-changer, allowing me to get medical advice without interrupting my work schedule.",
    author: "John Smith",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    jobTitle: "Software Engineer",
  },
  {
    testimony:
      "MedConnect has provided my elderly parents with the medical support they need right from home. The app is user-friendly, and the virtual visits have reduced the need for frequent trips to the clinic.",
    author: "Sarah Lee",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    jobTitle: "Marketing Manager",
  },
  {
    testimony:
      "Thanks to MedConnect, managing my chronic condition has become much easier. The app's reminders and easy access to my medical history have made a significant difference in my treatment plan.",
    author: "Mike Johnson",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    jobTitle: "Freelance Writer",
  },
  {
    testimony:
      "Living in a rural area, MedConnect has been a blessing. The ability to consult with top doctors without having to travel has improved our family's access to quality healthcare.",
    author: "Emma Brown",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    jobTitle: "Farmer",
  },
];

// DASHBOARD DATA
export const MEDCONNECT_DASHBOARD_LINKS = [
  { name: "Dashboard", path: "/dashboard", icon: MdOutlineDashboard },
  {
    name: "Patients",
    path: "/dashboard/patients",
    icon: MdOutlinePersonalInjury,
  },
  {
    name: "Appointments",
    path: "/dashboard/appointments",
    icon: CalendarPlus2,
  },
  {
    name: "Prescriptions",
    path: "/dashboard/prescriptions",
    icon: BsPrescription,
  },
  {
    name: "Diagnostic Support",
    path: "/dashboard/diagnostic-support",
    icon: FaSearchPlus,
  },
  {
    name: "Health Officials",
    path: "/dashboard/health-officials",
    icon: UserRoundPlus,
  },
  {
    name: "Disease Analysis",
    path: "/dashboard/disease-analysis",
    icon: MdOutlineShowChart,
  },
  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: TbReport,
  },
];

export const MEDCONNECT_SUPER_ADMIN_DASHBOARD_LINKS = [
  { name: "Dashboard", path: "/dashboard", icon: MdOutlineDashboard },
  {
    name: "Compounds",
    path: "/dashboard/compounds",
    icon: FaClinicMedical,
  },
  {
    name: "Health Officials",
    path: "/dashboard/health-officials",
    icon: UserRoundPlus,
  },
  {
    name: "Compound Management",
    path: "/dashboard/compound-management",
    icon: BsPrescription,
  },
  {
    name: "System Analytics",
    path: "/dashboard/system-analytics",
    icon: GrSystem,
  },
  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: TbReport,
  },
];

export const MEDCONNECT_DASHBOARD_UPCOMING_APPOINTMENTS = [
  {
    patientName: "David Davis",
    patientID: "PID5683",
    assignedHO: "Dr. Murphy",
    appointmentDate: "2023-05-22",
    appointmentTime: "15:20",
  },
  {
    patientName: "Hank Martinez",
    patientID: "PID1342",
    assignedHO: "Dr. Lee",
    appointmentDate: "2023-09-14",
    appointmentTime: "14:50",
  },
  {
    patientName: "Alice Brown",
    patientID: "PID2487",
    assignedHO: "Dr. Johnson",
    appointmentDate: "2023-11-03",
    appointmentTime: "10:30",
  },
  {
    patientName: "Eve Johnson",
    patientID: "PID0783",
    assignedHO: "Dr. Smith",
    appointmentDate: "2023-03-12",
    appointmentTime: "13:10",
  },
  {
    patientName: "Grace Lee",
    patientID: "PID6854",
    assignedHO: "Dr. Patel",
    appointmentDate: "2023-02-18",
    appointmentTime: "12:40",
  },
  {
    patientName: "Carol Garcia",
    patientID: "PID2197",
    assignedHO: "Dr. Smith",
    appointmentDate: "2023-10-30",
    appointmentTime: "09:20",
  },
  {
    patientName: "John Clark",
    patientID: "PID9512",
    assignedHO: "Dr. Johnson",
    appointmentDate: "2023-01-23",
    appointmentTime: "11:00",
  },
  {
    patientName: "Jane Garcia",
    patientID: "PID3771",
    assignedHO: "Dr. Patel",
    appointmentDate: "2023-08-16",
    appointmentTime: "16:30",
  },
  {
    patientName: "Bob Brown",
    patientID: "PID4329",
    assignedHO: "Dr. Lee",
    appointmentDate: "2023-06-11",
    appointmentTime: "11:50",
  },
  {
    patientName: "Carol White",
    patientID: "PID8457",
    assignedHO: "Dr. Murphy",
    appointmentDate: "2023-07-27",
    appointmentTime: "14:20",
  },
  {
    patientName: "Frank Davis",
    patientID: "PID0913",
    assignedHO: "Dr. Patel",
    appointmentDate: "2023-05-09",
    appointmentTime: "12:10",
  },
  {
    patientName: "Alice Martinez",
    patientID: "PID5281",
    assignedHO: "Dr. Johnson",
    appointmentDate: "2023-04-19",
    appointmentTime: "15:40",
  },
  {
    patientName: "John Lee",
    patientID: "PID7884",
    assignedHO: "Dr. Smith",
    appointmentDate: "2023-03-05",
    appointmentTime: "10:10",
  },
  {
    patientName: "Eve Clark",
    patientID: "PID6378",
    assignedHO: "Dr. Murphy",
    appointmentDate: "2023-09-24",
    appointmentTime: "09:50",
  },
  {
    patientName: "Hank Johnson",
    patientID: "PID2843",
    assignedHO: "Dr. Patel",
    appointmentDate: "2023-01-09",
    appointmentTime: "13:50",
  },
  {
    patientName: "Jane White",
    patientID: "PID9842",
    assignedHO: "Dr. Lee",
    appointmentDate: "2023-12-08",
    appointmentTime: "10:00",
  },
  {
    patientName: "Frank Smith",
    patientID: "PID3124",
    assignedHO: "Dr. Murphy",
    appointmentDate: "2023-11-15",
    appointmentTime: "14:40",
  },
  {
    patientName: "David Clark",
    patientID: "PID4703",
    assignedHO: "Dr. Patel",
    appointmentDate: "2023-02-28",
    appointmentTime: "16:00",
  },
  {
    patientName: "Grace Johnson",
    patientID: "PID1298",
    assignedHO: "Dr. Smith",
    appointmentDate: "2023-10-04",
    appointmentTime: "15:10",
  },
  {
    patientName: "Carol Lee",
    patientID: "PID6832",
    assignedHO: "Dr. Johnson",
    appointmentDate: "2023-07-11",
    appointmentTime: "13:20",
  },
];

export const MEDCONNECT_DASHBOARD_REPORTS = [
  {
    title: "Monthly Patient Visits",
    description: "A summary of patient visits in the last month.",
  },
  {
    title: "Medication Inventory",
    description: "Current stock levels of all medications.",
  },
  {
    title: "Financial Summary",
    description:
      "Overview of financial performance including revenue and expenses.",
  },
  {
    title: "Patient Satisfaction Survey",
    description: "Results from the latest patient satisfaction survey.",
  },
  {
    title: "Staff Performance",
    description: "Assessment of staff performance for the past quarter.",
  },
  {
    title: "Annual Health Outcomes",
    description: "Yearly report on patient health outcomes and improvements.",
  },
  {
    title: "Emergency Room Statistics",
    description: "Detailed statistics on ER visits and outcomes.",
  },
  {
    title: "Outpatient Services Utilization",
    description: "Analysis of outpatient services and their usage.",
  },
  {
    title: "Research and Development",
    description: "Summary of ongoing research projects and developments.",
  },
  {
    title: "Community Outreach",
    description: "Report on community outreach programs and their impact.",
  },
];

export const MEDCONNECT_DASHBOARD_RECENT_ACTIVITIES = [
  {
    title: "New Patient Registered",
    description: "John Doe has registered as a new patient.",
    timeAgo: "9 min ago",
  },
  {
    title: "Appointment Scheduled",
    description: "Jane Smith scheduled an appointment with Dr. Johnson.",
    timeAgo: "20 min ago",
  },
  {
    title: "Medication Restocked",
    description: "Paracetamol has been restocked in the pharmacy.",
    timeAgo: "45 min ago",
  },
  {
    title: "Lab Results Available",
    description: "Lab results for patient Alice Brown are now available.",
    timeAgo: "1 hour ago",
  },
  {
    title: "New Staff Member",
    description: "Dr. Emily White has joined the cardiology department.",
    timeAgo: "2 hours ago",
  },
  {
    title: "System Maintenance Completed",
    description:
      "The scheduled system maintenance has been completed successfully.",
    timeAgo: "3 hours ago",
  },
  {
    title: "Health Seminar",
    description: "A health seminar on diabetes management was conducted.",
    timeAgo: "5 hours ago",
  },
  {
    title: "Emergency Surgery",
    description: "Emergency surgery was performed on patient Bob Green.",
    timeAgo: "7 hours ago",
  },
  {
    title: "Vaccination Drive",
    description: "A vaccination drive was held in the community center.",
    timeAgo: "9 hours ago",
  },
  {
    title: "Medical Records Updated",
    description: "Medical records for patient Carol Davis have been updated.",
    timeAgo: "10 hours ago",
  },
];

export const MEDCONNECT_DASHBOARD_NOTIFICATIONS = [
  {
    type: "Appointment Scheduled",
    title: "Appointment has been scheduled",
    description:
      "An appointment has been scheduled for Jane Smith with Dr. Johnson on 12th June at 3 PM.",
    timeAgo: "9 min ago",
    typeColor: "#00ff00",
  },
  {
    type: "New Patient Added",
    title: "New Patient has been added successfully",
    description:
      "A new patient, John Doe, has been registered into the system. Please ensure all details are verified and updated.",
    timeAgo: "30 min ago",
    typeColor: "#ff0000",
  },
  {
    type: "System Maintenance",
    title: "Scheduled System Maintenance",
    description:
      "The system will undergo maintenance on 15th June from 1 AM to 3 AM. Please save your work to avoid data loss.",
    timeAgo: "1 hour ago",
    typeColor: "#0000ff",
  },
  {
    type: "Training Session",
    title: "CPR Training Session",
    description:
      "A CPR training session will be held on 20th June at 10 AM in the training room. All staff are encouraged to attend.",
    timeAgo: "2 hours ago",
    typeColor: "#ffa500",
  },
  {
    type: "Patient Discharged",
    title: "Patient Discharge Notice",
    description:
      "Patient Carol White has been successfully discharged. Ensure all discharge paperwork is completed.",
    timeAgo: "3 hours ago",
    typeColor: "#ff0000",
  },
  {
    type: "System Update",
    title: "System Update Completed",
    description:
      "The system update has been completed successfully. Please restart your devices to apply the changes.",
    timeAgo: "4 hours ago",
    typeColor: "#0000ff",
  },
  {
    type: "Community Event",
    title: "Health Fair Participation",
    description:
      "Our hospital will be participating in the community health fair on 30th June. Volunteers are needed. Sign up at the front desk.",
    timeAgo: "5 hours ago",
    typeColor: "#ffa500",
  },
  {
    type: "Emergency Alert",
    title: "Emergency Surgery Required",
    description:
      "Patient Bob Brown requires emergency surgery. Dr. Patel has been notified and is preparing for the procedure.",
    timeAgo: "6 hours ago",
    typeColor: "#ff0000",
  },
  {
    type: "Appointment Reminder",
    title: "Appointment Reminder",
    description:
      "Reminder: Patient Michael Davis has an appointment with Dr. Patel tomorrow at 2 PM.",
    timeAgo: "7 hours ago",
    typeColor: "#00ff00",
  },
  {
    type: "Security Alert",
    title: "Security Update",
    description:
      "A security update has been applied to the hospital network. Please restart your devices to ensure the update is applied.",
    timeAgo: "8 hours ago",
    typeColor: "#0000ff",
  },
  {
    type: "Patient Feedback Received",
    title: "Positive Patient Feedback",
    description:
      "We have received positive feedback from patient Emily Brown. Great job team! Keep up the excellent work.",
    timeAgo: "9 hours ago",
    typeColor: "#ff0000",
  },
  {
    type: "Follow-up Scheduled",
    title: "Follow-up Appointment Scheduled",
    description:
      "A follow-up appointment has been scheduled for patient David Brown with Dr. Murphy on 20th June.",
    timeAgo: "10 hours ago",
    typeColor: "#00ff00",
  },
  {
    type: "Staff Meeting Reminder",
    title: "Staff Meeting at 5 PM",
    description:
      "Reminder: There is a staff meeting scheduled today at 5 PM in the conference room. Attendance is mandatory.",
    timeAgo: "11 hours ago",
    typeColor: "#ffa500",
  },
  {
    type: "System Downtime Alert",
    title: "System Downtime Alert",
    description:
      "The system will be down for an update on 18th June from 12 AM to 2 AM. Please plan your tasks accordingly.",
    timeAgo: "12 hours ago",
    typeColor: "#0000ff",
  },
  {
    type: "Appointment Rescheduled",
    title: "Appointment has been rescheduled",
    description:
      "The appointment for patient Alice Johnson with Dr. Lee has been rescheduled to 15th June at 10 AM.",
    timeAgo: "13 hours ago",
    typeColor: "#00ff00",
  },
  {
    type: "New Equipment Arrived",
    title: "New MRI Machine Installed",
    description:
      "A new MRI machine has been installed in the radiology department. Training sessions will be conducted next week.",
    timeAgo: "14 hours ago",
    typeColor: "#ffa500",
  },
  {
    type: "Patient Transfer",
    title: "Patient Transfer Notice",
    description:
      "Patient Sarah Davis has been transferred to another facility for specialized care. Ensure all records are updated.",
    timeAgo: "15 hours ago",
    typeColor: "#ff0000",
  },
  {
    type: "Appointment Canceled",
    title: "Appointment Canceled",
    description:
      "The appointment for patient Sarah Williams with Dr. Smith on 10th June has been canceled.",
    timeAgo: "16 hours ago",
    typeColor: "#00ff00",
  },
  {
    type: "System Backup Completed",
    title: "System Backup Completed",
    description:
      "The scheduled system backup has been completed successfully. All data is secure.",
    timeAgo: "17 hours ago",
    typeColor: "#0000ff",
  },
  {
    type: "Fundraising Event",
    title: "Charity Gala Announcement",
    description:
      "Join us for the annual charity gala on 5th July. All proceeds will go towards hospital improvements.",
    timeAgo: "18 hours ago",
    typeColor: "#ffa500",
  },
];

export const MEDCONNECT_DASHBOARD_HELP_TICKETS = [
  {
    ticketId: "T001",
    subject: "System Update Required",
    dateInitiated: "2024-05-01",
    status: "Completed",
    statusColor: "#00ff00",
    dateCompleted: "2024-05-05",
  },
  {
    ticketId: "T002",
    subject: "Network Issue in Block A",
    dateInitiated: "2024-05-03",
    status: "In Progress",
    statusColor: "#ff0000",
    dateCompleted: "",
  },
  {
    ticketId: "T003",
    subject: "New User Account Setup",
    dateInitiated: "2024-05-05",
    status: "On Hold",
    statusColor: "#ffa500",
    dateCompleted: "",
  },
  {
    ticketId: "T004",
    subject: "Printer Not Working",
    dateInitiated: "2024-05-07",
    status: "Completed",
    statusColor: "#00ff00",
    dateCompleted: "2024-05-10",
  },
  {
    ticketId: "T005",
    subject: "Email Configuration Issue",
    dateInitiated: "2024-05-09",
    status: "In Progress",
    statusColor: "#ff0000",
    dateCompleted: "",
  },
  {
    ticketId: "T006",
    subject: "Software Installation Request",
    dateInitiated: "2024-05-11",
    status: "Completed",
    statusColor: "#00ff00",
    dateCompleted: "2024-05-14",
  },
  {
    ticketId: "T007",
    subject: "Server Maintenance",
    dateInitiated: "2024-05-13",
    status: "On Hold",
    statusColor: "#ffa500",
    dateCompleted: "",
  },
  {
    ticketId: "T008",
    subject: "Data Backup Failure",
    dateInitiated: "2024-05-15",
    status: "In Progress",
    statusColor: "#ff0000",
    dateCompleted: "",
  },
  {
    ticketId: "T009",
    subject: "Firewall Configuration",
    dateInitiated: "2024-05-17",
    status: "Completed",
    statusColor: "#00ff00",
    dateCompleted: "2024-05-20",
  },
  {
    ticketId: "T010",
    subject: "VPN Connectivity Issue",
    dateInitiated: "2024-05-19",
    status: "In Progress",
    statusColor: "#ff0000",
    dateCompleted: "",
  },
  {
    ticketId: "T011",
    subject: "Password Reset",
    dateInitiated: "2024-05-21",
    status: "Completed",
    statusColor: "#00ff00",
    dateCompleted: "2024-05-21",
  },
  {
    ticketId: "T012",
    subject: "Laptop Repair",
    dateInitiated: "2024-05-23",
    status: "On Hold",
    statusColor: "#ffa500",
    dateCompleted: "",
  },
  {
    ticketId: "T013",
    subject: "Database Migration",
    dateInitiated: "2024-05-25",
    status: "In Progress",
    statusColor: "#ff0000",
    dateCompleted: "",
  },
  {
    ticketId: "T014",
    subject: "User Training Session",
    dateInitiated: "2024-05-27",
    status: "Completed",
    statusColor: "#00ff00",
    dateCompleted: "2024-05-28",
  },
  {
    ticketId: "T015",
    subject: "Application Crash Issue",
    dateInitiated: "2024-05-29",
    status: "In Progress",
    statusColor: "#ff0000",
    dateCompleted: "",
  },
  {
    ticketId: "T016",
    subject: "Office Move Support",
    dateInitiated: "2024-05-31",
    status: "On Hold",
    statusColor: "#ffa500",
    dateCompleted: "",
  },
  {
    ticketId: "T017",
    subject: "Network Upgrade",
    dateInitiated: "2024-06-02",
    status: "In Progress",
    statusColor: "#ff0000",
    dateCompleted: "",
  },
  {
    ticketId: "T018",
    subject: "Email Spam Filtering",
    dateInitiated: "2024-06-04",
    status: "Completed",
    statusColor: "#00ff00",
    dateCompleted: "2024-06-05",
  },
  {
    ticketId: "T019",
    subject: "New Hardware Procurement",
    dateInitiated: "2024-06-06",
    status: "In Progress",
    statusColor: "#ff0000",
    dateCompleted: "",
  },
  {
    ticketId: "T020",
    subject: "Security Patch Update",
    dateInitiated: "2024-06-08",
    status: "Completed",
    statusColor: "#00ff00",
    dateCompleted: "2024-06-09",
  },
];

export const MEDCONNECT_SUPER_ADMIN_DASHBOARD_COMPOUNDS = [
  {
    compoundName: "Korle Bu Teaching Hospital",
    lastLoggedIn: "2024-05-10",
    address: "Guggisberg Ave, Accra",
    district: "Ablekuma South",
    region: "Greater Accra",
  },
  {
    compoundName: "Komfo Anokye Teaching Hospital",
    lastLoggedIn: "2024-06-12",
    address: "Okomfo Anokye Rd, Kumasi",
    district: "Subin",
    region: "Ashanti",
  },
  {
    compoundName: "Tamale Teaching Hospital",
    lastLoggedIn: "2024-05-15",
    address: "Off Hospital Rd, Tamale",
    district: "Tamale Central",
    region: "Northern",
  },
  {
    compoundName: "Cape Coast Teaching Hospital",
    lastLoggedIn: "2024-06-05",
    address: "Cape Coast",
    district: "Cape Coast",
    region: "Central",
  },
  {
    compoundName: "Ho Teaching Hospital",
    lastLoggedIn: "2024-04-25",
    address: "Ho",
    district: "Ho Municipal",
    region: "Volta",
  },
  {
    compoundName: "Bolgatanga Regional Hospital",
    lastLoggedIn: "2024-05-20",
    address: "Bolgatanga",
    district: "Bolgatanga Municipal",
    region: "Upper East",
  },
  {
    compoundName: "Wa Regional Hospital",
    lastLoggedIn: "2024-06-01",
    address: "Wa",
    district: "Wa Municipal",
    region: "Upper West",
  },
  {
    compoundName: "Koforidua Regional Hospital",
    lastLoggedIn: "2024-05-28",
    address: "Koforidua",
    district: "New Juaben South",
    region: "Eastern",
  },
  {
    compoundName: "Effia Nkwanta Regional Hospital",
    lastLoggedIn: "2024-05-10",
    address: "Sekondi-Takoradi",
    district: "Sekondi-Takoradi",
    region: "Western",
  },
  {
    compoundName: "Ridge Hospital",
    lastLoggedIn: "2024-06-10",
    address: "Ridge, Accra",
    district: "Osu Klottey",
    region: "Greater Accra",
  },
  {
    compoundName: "37 Military Hospital",
    lastLoggedIn: "2024-05-18",
    address: "Accra",
    district: "Ayawaso West",
    region: "Greater Accra",
  },
  {
    compoundName: "Sunyani Regional Hospital",
    lastLoggedIn: "2024-06-07",
    address: "Sunyani",
    district: "Sunyani Municipal",
    region: "Bono",
  },
  {
    compoundName: "Tema General Hospital",
    lastLoggedIn: "2024-05-22",
    address: "Tema",
    district: "Tema Metropolitan",
    region: "Greater Accra",
  },
  {
    compoundName: "Axim Government Hospital",
    lastLoggedIn: "2024-05-25",
    address: "Axim",
    district: "Nzema East",
    region: "Western",
  },
  {
    compoundName: "Holy Family Hospital",
    lastLoggedIn: "2024-06-03",
    address: "Techiman",
    district: "Techiman Municipal",
    region: "Bono East",
  },
  {
    compoundName: "St. Theresa's Hospital",
    lastLoggedIn: "2024-05-30",
    address: "Nandom",
    district: "Nandom",
    region: "Upper West",
  },
  {
    compoundName: "St. John's Hospital and Fertility Centre",
    lastLoggedIn: "2024-06-06",
    address: "Sekondi",
    district: "Sekondi-Takoradi",
    region: "Western",
  },
  {
    compoundName: "Agogo Presbyterian Hospital",
    lastLoggedIn: "2024-05-12",
    address: "Agogo",
    district: "Asante Akim North",
    region: "Ashanti",
  },
  {
    compoundName: "Ankaful Psychiatric Hospital",
    lastLoggedIn: "2024-06-04",
    address: "Ankaful",
    district: "Komenda/Edina/Eguafo/Abirem",
    region: "Central",
  },
  {
    compoundName: "St. Dominic's Hospital",
    lastLoggedIn: "2024-05-16",
    address: "Akwatia",
    district: "Denkyembuor",
    region: "Eastern",
  },
];

export const MEDCONNECT_SUPER_ADMIN_DASHBOARD_COMPOUNDS_WITH_ACTIONS = [
  {
    compoundName: "Korle Bu Teaching Hospital",
    compoundId: "GH001",
    location: "Guggisberg Ave, Accra",
    region: "Greater Accra",
  },
  {
    compoundName: "Komfo Anokye Teaching Hospital",
    compoundId: "GH002",
    location: "Okomfo Anokye Rd, Kumasi",
    region: "Ashanti",
  },
  {
    compoundName: "Tamale Teaching Hospital",
    compoundId: "GH003",
    location: "Off Hospital Rd, Tamale",
    region: "Northern",
  },
  {
    compoundName: "Cape Coast Teaching Hospital",
    compoundId: "GH004",
    location: "Cape Coast",
    region: "Central",
  },
  {
    compoundName: "Ho Teaching Hospital",
    compoundId: "GH005",
    location: "Ho",
    region: "Volta",
  },
  {
    compoundName: "Bolgatanga Regional Hospital",
    compoundId: "GH006",
    location: "Bolgatanga",
    region: "Upper East",
  },
  {
    compoundName: "Wa Regional Hospital",
    compoundId: "GH007",
    location: "Wa",
    region: "Upper West",
  },
  {
    compoundName: "Koforidua Regional Hospital",
    compoundId: "GH008",
    location: "Koforidua",
    region: "Eastern",
  },
  {
    compoundName: "Effia Nkwanta Regional Hospital",
    compoundId: "GH009",
    location: "Sekondi-Takoradi",
    region: "Western",
  },
  {
    compoundName: "Ridge Hospital",
    compoundId: "GH010",
    location: "Ridge, Accra",
    region: "Greater Accra",
  },
  {
    compoundName: "37 Military Hospital",
    compoundId: "GH011",
    location: "Accra",
    region: "Greater Accra",
  },
  {
    compoundName: "Sunyani Regional Hospital",
    compoundId: "GH012",
    location: "Sunyani",
    region: "Bono",
  },
  {
    compoundName: "Tema General Hospital",
    compoundId: "GH013",
    location: "Tema",
    region: "Greater Accra",
  },
  {
    compoundName: "Axim Government Hospital",
    compoundId: "GH014",
    location: "Axim",
    region: "Western",
  },
  {
    compoundName: "Holy Family Hospital",
    compoundId: "GH015",
    location: "Techiman",
    region: "Bono East",
  },
];

export const MEDCONNECT_DASHBOARD_PATIENTS = [
  {
    patientName: "Kwame Mensah",
    age: 45,
    gender: "Male",
    bloodGroup: "A+",
    phoneNumber: "+233 24 123 4567",
    dateAdded: "2023-06-14",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    patientName: "Akua Nyamekye",
    age: 30,
    gender: "Female",
    bloodGroup: "B-",
    phoneNumber: "+233 24 234 5678",
    dateAdded: "2023-05-20",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    patientName: "Yaw Boateng",
    age: 60,
    gender: "Male",
    bloodGroup: "O+",
    phoneNumber: "+233 24 345 6789",
    dateAdded: "2023-04-25",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    patientName: "Ama Serwaa",
    age: 27,
    gender: "Female",
    bloodGroup: "AB-",
    phoneNumber: "+233 24 456 7890",
    dateAdded: "2023-03-18",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    patientName: "Kofi Owusu",
    age: 50,
    gender: "Male",
    bloodGroup: "B+",
    phoneNumber: "+233 24 567 8901",
    dateAdded: "2023-02-22",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    patientName: "Abena Osei",
    age: 34,
    gender: "Female",
    bloodGroup: "O-",
    phoneNumber: "+233 24 678 9012",
    dateAdded: "2023-01-30",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    patientName: "Kojo Agyeman",
    age: 41,
    gender: "Male",
    bloodGroup: "A-",
    phoneNumber: "+233 24 789 0123",
    dateAdded: "2023-06-01",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    patientName: "Efua Adjei",
    age: 29,
    gender: "Female",
    bloodGroup: "AB+",
    phoneNumber: "+233 24 890 1234",
    dateAdded: "2023-05-15",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    patientName: "Yaw Kyei",
    age: 53,
    gender: "Male",
    bloodGroup: "A+",
    phoneNumber: "+233 24 901 2345",
    dateAdded: "2023-04-10",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    patientName: "Esi Gyamfi",
    age: 40,
    gender: "Female",
    bloodGroup: "B-",
    phoneNumber: "+233 24 012 3456",
    dateAdded: "2023-03-28",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    patientName: "Kwesi Nkrumah",
    age: 37,
    gender: "Male",
    bloodGroup: "O+",
    phoneNumber: "+233 24 123 4568",
    dateAdded: "2023-02-14",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    patientName: "Akosua Yeboah",
    age: 33,
    gender: "Female",
    bloodGroup: "AB-",
    phoneNumber: "+233 24 234 5679",
    dateAdded: "2023-01-05",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    patientName: "Yaw Amankwa",
    age: 52,
    gender: "Male",
    bloodGroup: "B+",
    phoneNumber: "+233 24 345 6780",
    dateAdded: "2023-06-10",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    patientName: "Ama Obeng",
    age: 26,
    gender: "Female",
    bloodGroup: "O-",
    phoneNumber: "+233 24 456 7891",
    dateAdded: "2023-05-07",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    patientName: "Kofi Darko",
    age: 48,
    gender: "Male",
    bloodGroup: "A-",
    phoneNumber: "+233 24 567 8902",
    dateAdded: "2023-04-15",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    patientName: "Abena Kumi",
    age: 39,
    gender: "Female",
    bloodGroup: "AB+",
    phoneNumber: "+233 24 678 9013",
    dateAdded: "2023-03-11",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    patientName: "Kwame Anane",
    age: 55,
    gender: "Male",
    bloodGroup: "A+",
    phoneNumber: "+233 24 789 0124",
    dateAdded: "2023-02-20",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    patientName: "Akua Agyapong",
    age: 42,
    gender: "Female",
    bloodGroup: "B-",
    phoneNumber: "+233 24 890 1235",
    dateAdded: "2023-01-09",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    patientName: "Yaw Opoku",
    age: 31,
    gender: "Male",
    bloodGroup: "O+",
    phoneNumber: "+233 24 901 2346",
    dateAdded: "2023-06-08",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    patientName: "Efua Owusu",
    age: 36,
    gender: "Female",
    bloodGroup: "AB-",
    phoneNumber: "+233 24 012 3457",
    dateAdded: "2023-05-18",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];
