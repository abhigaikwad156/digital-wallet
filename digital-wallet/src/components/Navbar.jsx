import { Search } from "lucide-react";
import NotificationCenter from "./NotificationCenter";

export default function Navbar({ user, transactions }) {
  return (
    <header className="topbar">
      <div className="mobile-brand"><span>PayFlow</span></div>
      <div className="search-box">
        <Search size={18} />
        <input placeholder="Search transactions..." />
      </div>
      <div className="topbar-actions">
        <NotificationCenter user={user} transactions={transactions} />
        <div className="user-mini">
          <div className="avatar">
            {user?.name?.slice(0, 2).toUpperCase()}
          </div>

          <div className="user-mini-text">
            <strong>{user?.name}</strong>
            <span>Personal Account</span>
          </div>

        </div>
      </div>
    </header>
  );
}