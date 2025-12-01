import Stats from '../components/stats';
import Pfp from '../assets/Users pfp.png';
import Filters from '../components/Filters'; // ← Reusable Filters
import { useApi } from '../hooks/useApi';
import { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';

interface User {
  id: number;
  image: string;
  title: string;
  email: string;
  plan: "Free" | "Premium";
  lastSeen: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { apiFetch } = useApi();

  // Filter + Search state (same as Quizzes page)
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await apiFetch('/api/admin/users');
      const data = await res.json();
      const mappedUsers = data.data.map((user: any) => ({
        id: user.user_id,
        image: user.avatar || Pfp,
        title: `${user.firstname} ${user.surname}`.trim(),
        email: user.email,
        plan: user.premium === 0 ? "Free" : "Premium",
        lastSeen: user.last_login
          ? new Date(user.last_login).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : 'Never',
        premium : user.premium,
        dept: user.dept,
        level : user.level,
        university: user.university
      }));
      setUsers(mappedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Dynamic filter options from real data
  const planOptions = Array.from(new Set(users.map(u => u.plan))); // ["Free", "Premium"]

  const filterOptions = [
    { label: "Plan", value: "plan", dropdown: true, options: planOptions },
    // You can easily add more later: Status, Last Active, etc.
  ];

  // EXACT same filtering logic as your working Quizzes page
  const filteredData = users.filter((user) => {
    if (activeFilters.length === 0 && searchTerm.trim() === '') return true;

    // Search in name OR email
    const matchesSearch =
      user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply filters
    const matchesFilters = activeFilters.every((filter) => {
      if (filter.type === "plan") return user.plan === filter.value;
      return true;
    });

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="space-y-5">
      <div className="space-y-10">
        <h1 className="text-[#004883] font-[500] text-2xl">Users</h1>

        <div className="flex flex-wrap items-center gap-4">
          <Stats value="3,200,000,000" label="Total Daily Users" />
          <Stats value="3,200,000,000" label="New Sign ups" />
        </div>

        {/* Filter + Search Bar - Same layout as Quizzes */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full sm:w-80 h-10 pl-10 pr-4 bg-[#F2F3FA] border border-[#C3C6CF] rounded-lg text-sm outline-none"
            />
            <svg
              className="absolute left-3 top-3 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Reusable Filters - WORKS 100% */}
          <Filters
            filterOptions={filterOptions}
            onFilterChange={setActiveFilters}
          />
        </div>

        {/* Table with filtered data */}
        <div className="mt-6">
          <UsersTable
          
            data={filteredData}
            tableheads={["User", "Email", "Plan", "Last Seen"]}
            ids={["title", "email", "plan", "lastSeen"]}
            initialRowsPerPage={40}
            renderCell={{
              title: (rowData) => (
                <div className="flex items-center gap-4">
                  {rowData.image && (
                    <img
                      src={rowData.image}
                      alt={rowData.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <span className="font-medium truncate max-w-xs">
                    {rowData.title}
                  </span>
                </div>
              ),
              plan: (rowData) => (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    rowData.plan === "Premium"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {rowData.plan}
                </span>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;