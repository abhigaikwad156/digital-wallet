import { UserRound, Mail, Phone, ShieldCheck, Edit3 } from "lucide-react";

export default function Profile({ user }) {
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  const firstName = user?.name?.split(' ')[0] || 'User';
  const email = user?.email || 'Not provided';
  const phone = user?.phone || '+91 98••• •••42';

  return (
    <>
      <div className="page-heading"><div><h1>Profile</h1><p>Manage your personal and security details.</p></div><button className="btn outline-btn"><Edit3 size={16}/> Edit profile</button></div>
      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-cover"></div>
          <div className="profile-main"><div className="profile-avatar">{initials}</div><h2>{user?.name || 'User'}</h2><p>Personal Account</p><div className="verified"><ShieldCheck size={15}/> Verified account</div></div>
        </div>
        <div className="panel details-panel"><h2>Personal information</h2><div className="detail"><UserRound/><div><span>Full name</span><strong>{user?.name || 'Not provided'}</strong></div></div><div className="detail"><Mail/><div><span>Email</span><strong>{email}</strong></div></div><div className="detail"><Phone/><div><span>Phone</span><strong>{phone}</strong></div></div></div>
      </div>
    </>
  );
}