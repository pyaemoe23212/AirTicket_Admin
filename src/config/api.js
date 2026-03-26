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
    amount: 850.0,
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
    amount: 1200.0,
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
    status: "Active",
    bookingStats: {
      total: 12,
      totalSpent: 4580,
      cancelled: 2,
      avgBooking: 382,
    },
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@airline.com",
    phone: "+66 81 234 5678",
    registration: "Feb 3, 2024",
    lastActive: "5 minutes ago",
    status: "Active",
    bookingStats: { total: 8, totalSpent: 3120, cancelled: 1, avgBooking: 390 },
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@airline.com",
    phone: "+1 (555) 987-6543",
    registration: "Mar 12, 2024",
    lastActive: "1 day ago",
    status: "Active",
    bookingStats: {
      total: 15,
      totalSpent: 7250,
      cancelled: 3,
      avgBooking: 483,
    },
  },
  {
    id: 4,
    name: "David Park",
    email: "david.park@airline.com",
    phone: "+82 10 1234 5678",
    registration: "Apr 8, 2024",
    lastActive: "3 hours ago",
    status: "Active",
    bookingStats: { total: 5, totalSpent: 2100, cancelled: 0, avgBooking: 420 },
  },
  {
    id: 5,
    name: "Jessica Williams",
    email: "jessica.williams@airline.com",
    phone: "+1 (555) 456-7890",
    registration: "May 20, 2024",
    lastActive: "1 hour ago",
    status: "Active",
    bookingStats: { total: 3, totalSpent: 1200, cancelled: 0, avgBooking: 400 },
  },
  {
    id: 6,
    name: "Robert Taylor",
    email: "robert.taylor@airline.com",
    phone: "+1 (555) 789-0123",
    registration: "Jun 5, 2024",
    lastActive: "2 weeks ago",
    status: "Suspended",
    bookingStats: { total: 7, totalSpent: 3200, cancelled: 1, avgBooking: 457 },
  },
  {
    id: 7,
    name: "Amanda Lee",
    email: "amanda.lee@airline.com",
    phone: "+1 (555) 456-7890",
    registration: "Jul 18, 2024",
    lastActive: "30 minutes ago",
    status: "Active",
    bookingStats: { total: 4, totalSpent: 1800, cancelled: 0, avgBooking: 450 },
  },
  {
    id: 8,
    name: "James Brown",
    email: "james.brown@airline.com",
    phone: "+1 (555) 234-5678",
    registration: "Aug 2, 2024",
    lastActive: "6 hours ago",
    status: "Active",
    bookingStats: { total: 6, totalSpent: 2700, cancelled: 0, avgBooking: 450 },
  },
];

const mockRoles = [
  {
    id: 1,
    title: "Super Admin",
    desc: "Full Access",
    count: 3,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 2,
    title: "Admin",
    desc: "High-level Access",
    count: 8,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    title: "Agent",
    desc: "Operational Access",
    count: 15,
    color: "bg-green-100 text-green-800",
  },
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
    role: "Agent",
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

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_AUTH_PREFIX =
  import.meta.env.VITE_API_AUTH_PREFIX || `${API_BASE_URL}/auth/admin`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const response = await apiClient.post(`${API_AUTH_PREFIX}/token`, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return {
    token: response.data.access_token || response.data.token,
    user: response.data.admin || response.data.user,
  };
};


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

export const getAllBookings = async (params = {}) => {
  const response = await apiClient.get("/admin/bookings", { params });
  return response.data?.data ?? response.data;
};

export const getBookingById = async (bookingId) => {
  const response = await apiClient.get(`/admin/bookings/${bookingId}`);
  return response.data?.data ?? response.data;
};

export const deleteBooking = async (bookingId) => {
  const response = await apiClient.delete(`/admin/bookings/${bookingId}`);
  return response.data?.data ?? response.data;
};

export const updateBookingStatus = async (bookingId, newStatus, updatedBy) => {
  const response = await apiClient.put(`/admin/bookings/${bookingId}`, {
    booking_id: bookingId,
    status: newStatus, 
    updated_by: updatedBy,
  });
  return response.data?.data ?? response.data;
};

export const updateBookingPaymentStatus = async (
  bookingId,
  paymentStatus,
  updatedBy
) => {
  const response = await apiClient.put(
    `/admin/bookings/${bookingId}/payment-status`,
    {
      booking_id: bookingId,
      payment_status: paymentStatus,
      updated_by: updatedBy,
    }
  );
  return response.data?.data ?? response.data;
};

export const uploadBookingTicket = async (
  bookingId,
  ticketUrl,
  uploadedBy,
  status = "CONFIRMED"
) => {
  const response = await apiClient.put(
    `/admin/bookings/${bookingId}/upload-ticket`,
    {
      booking_id: bookingId,
      ticket_file_url: ticketUrl,
      ticket_uploaded_at: new Date().toISOString(),
      status,
      uploaded_by: uploadedBy,
    }
  );
  return response.data?.data ?? response.data;
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

export const createStaffUser = async (name, email, password) => {
  const response = await apiClient.post(`${API_AUTH_PREFIX}/signup`, {
    name,
    email,
    password,
    role: "STAFF",
  });

  return {
    token: response.data.access_token || response.data.token,
    user: response.data.admin || response.data.user,
  };
};
export default API_BASE_URL;

export const getAllStaff = async (params = {}) => {
  const response = await apiClient.get("/admin/staff", { params });
  return response.data?.data ?? response.data;
};

export const getStaffById = async (staffId) => {
  const response = await apiClient.get("/admin/staff/" + staffId);
  return response.data?.data ?? response.data;
};

export const updateStaff = async (staffId, staffData) => {
  const response = await apiClient.patch("/admin/staff/" + staffId, staffData);
  return response.data?.data ?? response.data;
};

export const deleteStaffById = async (staffId) => {
  const response = await apiClient.delete("/admin/staff/" + staffId);
  return response.data?.data ?? response.data;
};

export const deactivateStaff = async (staffId) => {
  const response = await apiClient.patch("/admin/staff/" + staffId + "/deactivate");
  return response.data?.data ?? response.data;
};

export const activateStaff = async (staffId) => {
  const response = await apiClient.patch("/admin/staff/" + staffId + "/activate");
  return response.data?.data ?? response.data;
};

// =====================
// Flight CRUD Operations
// =====================

// Create a new flight override
export const createFlightOverride = async (flightData) => {
  const snapshot = flightData.flight_snapshot || {};
  const isRoundTrip = flightData.type === "ROUND_TRIP";
  
  // Extract from the correct location based on flight type
  const leg = isRoundTrip ? snapshot.outbound : snapshot;
  
  const departureDate = leg?.departure_time?.split('T')[0] || '';
  
  const payload = {
    airline_code: leg?.airline_code,
    flight_number: leg?.flight_number,
    departure_date: departureDate,
    override_price_usd: flightData.base_price_usd,
  };
   
  const response = await apiClient.post("/admin/overrides", payload);
  const result = response.data?.data ?? response.data;

   console.log("Backend Response:", result); // Check what's returned
};

export const updateFlightOverride = async (overrideId, overrideData) => {
  // For UPDATE, the override object already has the required fields
  const payload = {
    airline_code: overrideData.airline_code,
    flight_number: overrideData.flight_number,
    departure_date: overrideData.departure_date,
    override_price_usd: parseFloat(overrideData.override_price_usd),
  };

  console.log("Update Payload:", payload); // Debug

  const response = await apiClient.put(`/admin/overrides/${overrideId}`, payload);
  return response.data?.data ?? response.data;
};


// Get a specific flight override
export const getFlightOverrideById = async (overrideId) => {
  const response = await apiClient.get(`/admin/overrides/${overrideId}`);
  return response.data?.data ?? response.data;
};

// List all flight overrides
export const getAllFlightOverrides = async () => {
  const response = await apiClient.get("/admin/overrides");
  return response.data?.data ?? response.data;
};

export const deleteFlightOverride = async (overrideId) => {
  const response = await apiClient.delete(`/admin/overrides/${overrideId}`);
  return response.data?.data ?? response.data;
};

// =====================
// Flight Search Operations
// =====================

export const searchFlights = async (origin, destination, departureDate) => {
  try {
    const response = await apiClient.get("/flights/search", {
      params: {
        origin,
        destination,
        departure_date: departureDate,
      },
    });
    return response.data?.data ?? response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to search flights"
    );
  }
};

export const searchRoundTripFlights = async (
  origin,
  destination,
  departureDate,
  returnDate
) => {
  try {
    const response = await apiClient.get("/flights/search-round-trip", {
      params: {
        origin,
        destination,
        departure_date: departureDate,
        return_date: returnDate,
      },
    });
    return response.data?.data ?? response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to search round-trip flights"
    );
  }
};

// Get current exchange rate
export const getExchangeRate = async () => {
  const response = await apiClient.get("/admin/exchange-rate");
  const data = response.data?.data ?? response.data;
  return data;
};

// Update exchange rate
export const updateExchangeRate = async (usdToMmkRate) => {
  const response = await apiClient.put("/admin/exchange-rate", {
    usd_to_mmk: String(usdToMmkRate)
  });
  return response.data?.data ?? response.data;
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

export {  mockBookings, mockUsers };
