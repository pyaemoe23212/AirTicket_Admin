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

const FlightService = {
  // Fetch all flights (mock)
  getAllFlights: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockFlights);
      }, 500);
    });
  },

  // Fetch a single flight by ID (mock)
  getFlightById: async (flightId) => {
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
  },

  // Create a new flight (mock)
  createFlight: async (flightData) => {
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
  },

  // Update an existing flight (mock)
  updateFlight: async (flightId, flightData) => {
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
  },

  // Delete a flight (mock)
  deleteFlight: async (flightId) => {
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
  },

  // Publish/unpublish a flight (mock)
  publishFlight: async (flightId, isPublished) => {
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
  },

  // Calculate flight duration
  calculateDuration: (departureTime, arrivalTime) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const diffMs = arrival - departure;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  },

  // Calculate available seats
  calculateAvailableSeats: (totalCapacity, bookedSeats) => {
    return Math.max(0, totalCapacity - bookedSeats);
  },
};

export default FlightService;