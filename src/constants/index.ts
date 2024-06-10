import { IoCheckmarkCircle } from "react-icons/io5";
import {
  MdOutlinePersonalInjury,
  MdOutlineDashboard,
  MdOutlineShowChart,
} from "react-icons/md";
import { FaSearchPlus } from "react-icons/fa";
import { BsPrescription } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
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
