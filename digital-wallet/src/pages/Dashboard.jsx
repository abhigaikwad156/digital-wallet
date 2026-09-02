import { Link } from "react-router-dom";
import { Send, Plus, ArrowUpRight, ArrowDownLeft, TrendingUp, Wallet } from "lucide-react";
import BalanceCard from "../components/BalanceCard";
import TransactionList from "../components/TransactionList";

export default function Dashboard({ balance, transactions, user }) {
  const sent = transactions.filter(t => t.type === "Sent").reduce((a, t) => a + t.amount, 0);
  const received = transactions.filter(t => t.type === "Received").reduce((a, t) => a + t.amount, 0);

  const userName = user?.name?.split(' ')[0] || 'User';

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="greeting">Good evening, {userName} 👋</p>
          <h1>Dashboard</h1>
          <p>Here's what's happening with your wallet today.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <BalanceCard balance={balance} />
        <div className="quick-actions">
          <Link to="/send" className="quick-card primary"><div className="quick-icon"><Send size={20}/></div><div><strong>Send Money</strong><span>Transfer to anyone</span></div><ArrowUpRight size={20}/></Link>
          <Link to="/add-money" className="quick-card"><div className="quick-icon"><Plus size={21}/></div><div><strong>Add Money</strong><span>Top up your wallet</span></div><ArrowUpRight size={20}/></Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon green"><ArrowDownLeft size={19}/></div><div><span>Total received</span><strong>₹{received.toLocaleString("en-IN")}</strong><small><TrendingUp size={13}/> 12.5% this month</small></div></div>
        <div className="stat-card"><div className="stat-icon red"><ArrowUpRight size={19}/></div><div><span>Total spent</span><strong>₹{sent.toLocaleString("en-IN")}</strong><small>Across {transactions.filter(t => t.type === "Sent").length} transactions</small></div></div>
        <div className="stat-card"><div className="stat-icon blue"><Wallet size={19}/></div><div><span>Wallet status</span><strong>Active</strong><small>Fully verified account</small></div></div>
      </div>

      <TransactionList transactions={transactions} />
    </>
  );
}