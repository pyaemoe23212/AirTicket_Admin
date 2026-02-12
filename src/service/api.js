const mockBookings = [
  {
    id: "BK-10245",
    bookingId: "BK-10245",
    customer: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    route: "JFK → LHR",
    flightNumber: "AA 101",
    travelDate: "2026-01-15",
    departureTime: "09:30",
    arrivalTime: "21:45",
    passengers: 1,
    seat: "12A",
    travelClass: "Economy",
    amount: 850.00,
    currency: "USD",
    status: "Confirmed",
    paymentStatus: "Paid",
    bookedAt: "2025-12-20",
  },
  {
    id: "BK-10246",
    bookingId: "BK-10246",
    customer: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+44 20 7946 0958",
    route: "LAX → NRT",
    flightNumber: "UA 875",
    travelDate: "2026-01-16",
    departureTime: "11:00",
    arrivalTime: "15:15",
    passengers: 2,
    seat: "14C, 14D",
    travelClass: "Premium Economy",
    amount: 1200.00,
    currency: "USD",
    status: "Pending",
    paymentStatus: "Pending",
    bookedAt: "2025-12-22",
  },
];

const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@airline.com",
    phone: "+1 (555) 123-4567",
    registration: "Jan 15, 2024",
    lastActive: "2 hours ago",
    bookingStats: { total: 12, totalSpent: 4580, cancelled: 2, avgBooking: 382 },
    recentBookings: [
      { id: "BK-101", date: "Jan 05, 2024", route: "NYC → LAX", amount: 420 },
      { id: "BK-102", date: "Dec 28, 2023", route: "LAX → SEA", amount: 260 },
      { id: "BK-103", date: "Dec 10, 2023", route: "SEA → MIA", amount: 390 },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@airline.com",
    phone: "+66 81 234 5678",
    registration: "Feb 3, 2024",
    lastActive: "5 minutes ago",
    bookingStats: { total: 8, totalSpent: 3120, cancelled: 1, avgBooking: 390 },
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@airline.com",
    phone: "+1 (555) 987-6543",
    registration: "Mar 12, 2024",
    lastActive: "1 day ago",
    bookingStats: { total: 15, totalSpent: 7250, cancelled: 3, avgBooking: 483 },
  },
  {
    id: 4,
    name: "David Park",
    email: "david.park@airline.com",
    phone: "+82 10 1234 5678",
    registration: "Apr 8, 2024",
    lastActive: "3 hours ago",
    bookingStats: { total: 5, totalSpent: 2100, cancelled: 0, avgBooking: 420 },
  },
  {
    id: 5,
    name: "Jessica Williams",
    email: "jessica.williams@airline.com",
    phone: "+1 (555) 456-7890",
    registration: "May 10, 2024",
    lastActive: "1 hour ago",
    bookingStats: { total: 3, totalSpent: 1200, cancelled: 0, avgBooking: 400 },
  },
  
];

const mockRoles = [
  { id: 1, title: "Super Admin", desc: "Full Access", count: 3, color: "bg-purple-100 text-purple-800" },
  { id: 2, title: "Admin", desc: "High-level Access", count: 8, color: "bg-blue-100 text-blue-800" },
  { id: 3, title: "Agent", desc: "Operational Access", count: 15, color: "bg-green-100 text-green-800" },
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
    phone: "+1 (555) 123-4567",
    avatar: "https://i.pravatar.cc/150?img=68",
    activity: {
      totalLogins: 342,
      actionsThisMonth: 1287,
      accountAge: 156,
       },
     },
  
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@airline.com",
    role: "Super Admin",
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
    role: "Agent",
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

export const createBooking = async (bookingData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBooking = {
        id: `BK-${100000 + mockBookings.length + 1}`,
        bookingId: `BK-${100000 + mockBookings.length + 1}`,
        bookedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: bookingData.status || "Pending",
        paymentStatus: bookingData.paymentStatus || "Pending",
        ...bookingData,
      };

      mockBookings.push(newBooking);
      resolve(newBooking);
    }, 400); // fake network delay
  });
};

export const getAllBookings = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockBookings]), 400);
  });
};

export const getBookingById = (bookingId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const booking = mockBookings.find(b => b.bookingId === bookingId);
      if (booking) resolve(booking);
      else reject(new Error("Booking not found"));
    }, 300);
  });
};

export const deleteBookingById = (bookingId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockBookings.findIndex(b => b.bookingId === bookingId);
      if (index !== -1) {
        mockBookings.splice(index, 1);
        resolve({ success: true, message: "Booking deleted" });
      } else {
        reject(new Error("Booking not found"));
      }
    }, 400);
  });
};

export const updateBooking = (bookingId, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockBookings.findIndex(b => b.bookingId === bookingId);
      if (index !== -1) {
        mockBookings[index] = { ...mockBookings[index], ...updates };
        resolve(mockBookings[index]);
      } else {
        reject(new Error("Booking not found"));
      }
    }, 400);
  });
};

// ────────────────────────────────────────────────
// User CRUD (promise-based, fake delay)
// ────────────────────────────────────────────────

export const getAllUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockUsers]), 400);
  });
};

export const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === Number(userId));
      if (user) resolve(user);
      else reject(new Error("User not found"));
    }, 300);
  });
};

export const updateUser = (userId, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockUsers.findIndex((u) => u.id === Number(userId));
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...updates };
        resolve(mockUsers[index]);
      } else {
        reject(new Error("User not found"));
      }
    }, 400);
  });
};

export const deleteUserById = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockUsers.findIndex((u) => u.id === Number(userId));
      if (index !== -1) {
        mockUsers.splice(index, 1);
        resolve({ success: true, message: "User deleted" });
      } else {
        reject(new Error("User not found"));
      }
    }, 400);
  });
};

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

export { mockRoles, mockStaff, mockFlights, mockBookings, mockUsers };