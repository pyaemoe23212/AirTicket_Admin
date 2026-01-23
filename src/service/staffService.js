
export const mockRoles = [
  { id: 1, title: "Super Admin", desc: "Full Access", count: 3, color: "bg-purple-100 text-purple-800" },
  { id: 2, title: "Admin",       desc: "High-level Access", count: 8, color: "bg-blue-100 text-blue-800" },
  { id: 3, title: "Manager",     desc: "Operational Access", count: 15, color: "bg-green-100 text-green-800" },
  { id: 4, title: "Supervisor",  desc: "Store Access", count: 22, color: "bg-yellow-100 text-yellow-800" },
  { id: 5, title: "Agent",       desc: "Limited Access", count: 78, color: "bg-gray-100 text-gray-700" },
  { id: 6, title: "Support",     desc: "Customer Support", count: 21, color: "bg-indigo-100 text-indigo-800" },
];

export const mockStaff = [
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

// ---------------------
// Helper functions (simulate async API)
// ---------------------

export const getAllStaff = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockStaff), 300); 
  });
};

export const getStaffById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const staff = mockStaff.find(s => s.id === Number(id));
      if (staff) resolve(staff);
      else reject(new Error("Staff member not found"));
    }, 250);
  });
};

export const deleteStaffById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockStaff.findIndex(s => s.id === Number(id));
      if (index !== -1) {
        mockStaff.splice(index, 1);
        resolve({ success: true, message: "Staff member removed" });
      } else {
        reject(new Error("Staff member not found"));
      }
    }, 400);
  });
};