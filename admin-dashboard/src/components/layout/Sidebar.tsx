import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Sidebar.css';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/users', label: 'Users', icon: '👥' },
  { path: '/listings', label: 'Listings', icon: '🏠' },
  { path: '/reports', label: 'Reports', icon: '⚠️' },
  { path: '/reviews', label: 'Reviews', icon: '⭐' },
  { path: '/settings', label: 'Settings', icon: '⚙️' }
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <h1>Rentify Admin</h1>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar__nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="sidebar__nav-icon">{item.icon}</span>
            <span className="sidebar__nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar__footer">
        <button className="sidebar__logout">
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
