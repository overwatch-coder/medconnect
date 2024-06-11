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
