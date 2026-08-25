import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="mobile-brand"><span>PayFlow</span></div>
      <div className="search-box">
        <Search size={18} />
        <input placeholder="Search transactions..." />
      </div>
      <div className="topbar-actions">
        <button className="icon-btn notification"><Bell size={19} /><i /></button>
        <div className="user-mini">
          <div className="avatar">AS</div>
          <div className="user-mini-text">
            <strong>Abhimanyu</strong>
            <span>Personal Account</span>
          </div>
        </div>
      </div>
    </header>
  );
}