
const mockRoles = [
  { id: 1, title: "Super Admin", desc: "Full Access", count: 3, color: "bg-purple-100 text-purple-800" },
  { id: 2, title: "Admin", desc: "High-level Access", count: 8, color: "bg-blue-100 text-blue-800" },
  { id: 3, title: "Manager", desc: "Operational Access", count: 15, color: "bg-green-100 text-green-800" },
  { id: 4, title: "Supervisor", desc: "Store Access", count: 22, color: "bg-yellow-100 text-yellow-800" },
  { id: 5, title: "Agent", desc: "Limited Access", count: 78, color: "bg-gray-100 text-gray-700" },
  { id: 6, title: "Support", desc: "Customer Support", count: 21, color: "bg-indigo-100 text-indigo-800" },
];

const mockStaff = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@airline.com",
    role: "Admin",
    roleId: 2,
    registration: "Jan 15, 2024",
    lastActive: "2 hours ago",
    status: "Active",
    phone: "+66 92 345 6789",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@airline.com",
    role: "Manager",
    roleId: 3,
    registration: "Feb 3, 2024",
    lastActive: "5 minutes ago",
    status: "Active",
    phone: "+66 81 234 5678",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@airline.com",
    role: "Admin",
    roleId: 2,
    registration: "Mar 12, 2024",
    lastActive: "1 day ago",
    status: "Active",
    phone: "+66 89 876 5432",
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    id: 4,
    name: "James Patel",
    email: "james.p@airline.com",
    role: "Agent",
    roleId: 5,
    registration: "Jun 20, 2025",
    lastActive: "3 days ago",
    status: "Active",
    phone: "+66 95 123 4567",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: 5,
    name: "Anna Kowalski",
    email: "anna.k@airline.com",
    role: "Support",
    roleId: 6,
    registration: "Sep 08, 2025",
    lastActive: "Never",
    status: "Inactive",
    phone: "+66 93 987 6543",
    avatar: "https://i.pravatar.cc/150?img=22",
  },
];

const mockFlights = [
  {
    id: "1",
    flightNumber: "AA101",
    airline: "American Airlines",
    status: "Scheduled",
    originAirport: "JFK",
    destinationAirport: "LHR",
    departureDate: "2026-01-15",
    departureTime: "09:30",
    arrivalDate: "2026-01-15",
    arrivalTime: "21:45",
    duration: "7h 15m",
    aircraftType: "Boeing 777-300ER",
    totalCapacity: 180,
    availableSeats: 142,
    bookedSeats: 38,
    basePrice: 850.00,
    currency: "USD",
    classType: "Economy",
    gate: "B12",
    terminal: "Terminal 4",
    notes: "Standard international flight. Check-in opens 3 hours before departure.",
    createdDate: "2025-12-10",
    lastModified: "2026-01-20",
    modifiedBy: "Admin User",
  },
  {
    id: "2",
    flightNumber: "BA202",
    airline: "British Airways",
    status: "Delayed",
    originAirport: "LHR",
    destinationAirport: "CDG",
    departureDate: "2026-01-16",
    departureTime: "14:00",
    arrivalDate: "2026-01-16",
    arrivalTime: "15:30",
    duration: "1h 30m",
    aircraftType: "Airbus A320",
    totalCapacity: 150,
    availableSeats: 45,
    bookedSeats: 105,
    basePrice: 250.00,
    currency: "GBP",
    classType: "Premium Economy",
    gate: "A5",
    terminal: "Terminal 3",
    notes: "Short haul European flight.",
    createdDate: "2025-12-05",
    lastModified: "2026-01-21",
    modifiedBy: "Admin User",
  },
  {
    id: "3",
    flightNumber: "TG303",
    airline: "Thai Airways",
    status: "In Progress",
    originAirport: "BKK",
    destinationAirport: "SIN",
    departureDate: "2026-01-17",
    departureTime: "10:15",
    arrivalDate: "2026-01-17",
    arrivalTime: "12:00",
    duration: "1h 45m",
    aircraftType: "Boeing 787-9",
    totalCapacity: 242,
    availableSeats: 98,
    bookedSeats: 144,
    basePrice: 180.00,
    currency: "THB",
    classType: "Business",
    gate: "C8",
    terminal: "Terminal 1",
    notes: "Regional flight with premium service.",
    createdDate: "2025-12-01",
    lastModified: "2026-01-19",
    modifiedBy: "Admin User",
  },
];

// =====================
// Staff CRUD Operations
// =====================

export const getAllStaff = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockStaff), 300);
  });
};

export const getStaffById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const staff = mockStaff.find((s) => s.id === Number(id));
      if (staff) resolve(staff);
      else reject(new Error("Staff member not found"));
    }, 250);
  });
};

export const createStaff = (staffData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newStaff = {
        id: mockStaff.length + 1,
        ...staffData,
        registration: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        lastActive: "Just now",
        status: "Active",
      };
      mockStaff.push(newStaff);
      resolve(newStaff);
    }, 300);
  });
};

export const updateStaff = (id, staffData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockStaff.findIndex((s) => s.id === Number(id));
      if (index !== -1) {
        mockStaff[index] = { ...mockStaff[index], ...staffData };
        resolve(mockStaff[index]);
      } else {
        reject(new Error("Staff member not found"));
      }
    }, 300);
  });
};

export const deleteStaffById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockStaff.findIndex((s) => s.id === Number(id));
      if (index !== -1) {
        mockStaff.splice(index, 1);
        resolve({ success: true, message: "Staff member removed" });
      } else {
        reject(new Error("Staff member not found"));
      }
    }, 400);
  });
};

// =====================
// Flight CRUD Operations
// =====================

export const getAllFlights = async (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFlights);
    }, 500);
  });
};

export const getFlightById = async (flightId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const flight = mockFlights.find((f) => f.id === flightId);
      if (flight) {
        resolve(flight);
      } else {
        reject(new Error("Flight not found"));
      }
    }, 300);
  });
};

export const createFlight = async (flightData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newFlight = {
        id: String(mockFlights.length + 1),
        ...flightData,
        createdDate: new Date().toISOString().split("T")[0],
        lastModified: new Date().toISOString().split("T")[0],
        modifiedBy: "Admin User",
      };
      mockFlights.push(newFlight);
      resolve(newFlight);
    }, 400);
  });
};

export const updateFlight = async (flightId, flightData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockFlights.findIndex((f) => f.id === flightId);
      if (index !== -1) {
        mockFlights[index] = {
          ...mockFlights[index],
          ...flightData,
          lastModified: new Date().toISOString().split("T")[0],
          modifiedBy: "Admin User",
        };
        resolve(mockFlights[index]);
      } else {
        reject(new Error("Flight not found"));
      }
    }, 400);
  });
};

export const deleteFlight = async (flightId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockFlights.findIndex((f) => f.id === flightId);
      if (index !== -1) {
        mockFlights.splice(index, 1);
        resolve({ success: true, message: "Flight deleted" });
      } else {
        reject(new Error("Flight not found"));
      }
    }, 300);
  });
};

export const publishFlight = async (flightId, isPublished) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const flight = mockFlights.find((f) => f.id === flightId);
      if (flight) {
        flight.isPublished = isPublished;
        resolve(flight);
      } else {
        reject(new Error("Flight not found"));
      }
    }, 300);
  });
};

// =====================
// Helper Functions
// =====================

export const calculateDuration = (departureTime, arrivalTime) => {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);
  const diffMs = arrival - departure;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

export const calculateAvailableSeats = (totalCapacity, bookedSeats) => {
  return Math.max(0, totalCapacity - bookedSeats);
};

// =====================
// Export Mock Data
// =====================

export { mockRoles, mockStaff, mockFlights };