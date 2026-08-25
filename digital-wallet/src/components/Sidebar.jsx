import { NavLink } from "react-router-dom";
import { LayoutDashboard, Send, WalletCards, ReceiptText, UserRound, LogOut, CircleDollarSign } from "lucide-react";

export default function Sidebar({ onLogout }) {
  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/send", label: "Send Money", icon: Send },
    { to: "/add-money", label: "Add Money", icon: WalletCards },
    { to: "/transactions", label: "Transactions", icon: ReceiptText },
    { to: "/profile", label: "Profile", icon: UserRound }
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon"><CircleDollarSign size={23} /></div>
        <span>PayFlow</span>
      </div>

      <div className="nav-section">
        <p className="nav-label">MENU</p>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="support-card">
          <div className="support-dot">?</div>
          <div>
            <strong>Need help?</strong>
            <span>Contact support</span>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}