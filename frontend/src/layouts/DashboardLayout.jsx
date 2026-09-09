import { Link, Outlet } from 'react-router-dom';

function DashboardLayout() {
  const user = JSON.parse(localStorage.getItem('user'));

  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : '';
  const menus = {
    Citizen: [
      { label: 'Dashboard', path: '/citizen' },
      { label: 'Register Complaint', path: '/citizen/register' },
      { label: 'My Complaints', path: '/citizen/complaints' },
      { label: 'Feedback & Ratings', path: '/citizen/feedback' },
    ],

    Officer: [
      { label: 'Dashboard', path: '/officer' },
      { label: 'Assigned Complaints', path: '/officer/complaints' },
      { label: 'Completed Complaints', path: '/officer/completed' },
    ],

    Admin: [
      { label: 'Dashboard', path: '/admin' },
      { label: 'Complaint Management', path: '/admin/complaints' },
      { label: 'Citizen Management', path: '/admin/citizens' },
      { label: 'Officer Management', path: '/admin/officers' },
      { label: 'Complaint Verification', path: '/admin/verification' },
      { label: 'Complaint Assignment', path: '/admin/assignment' },
      { label: 'Categories', path: '/admin/categories' },
      { label: 'Feedback Management', path: '/admin/feedback' },
    ],
  };

  return (
    <div>
      <header>
        <h2>Smart Complaint Tracker</h2>
        <span>{role} Dashboard</span>
      </header>

      <div>
        <aside>
          <nav>
            {menus[role].map((menu) => (
              <div key={menu.path}>
                <Link to={menu.path}>{menu.label}</Link>
              </div>
            ))}
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;