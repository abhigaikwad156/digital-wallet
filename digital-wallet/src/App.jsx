import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import AddMoney from "./pages/AddMoney";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const transactionsSeed = [
  { id: 1, name: "Aarav Mehta", type: "Sent", amount: 1250, date: "Today, 10:42 AM", status: "Completed", initials: "AM" },
  { id: 2, name: "Salary Credit", type: "Received", amount: 42000, date: "Yesterday, 9:15 AM", status: "Completed", initials: "SC" },
  { id: 3, name: "Swiggy", type: "Sent", amount: 485, date: "Aug 23, 8:30 PM", status: "Completed", initials: "S" },
  { id: 4, name: "Riya Sharma", type: "Received", amount: 2200, date: "Aug 22, 6:12 PM", status: "Completed", initials: "RS" },
  { id: 5, name: "Amazon", type: "Sent", amount: 1899, date: "Aug 21, 2:44 PM", status: "Completed", initials: "A" }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [balance, setBalance] = useState(58420.75);
  const [transactions, setTransactions] = useState(transactionsSeed);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [{ ...transaction, id: Date.now() }, ...prev]);
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar onLogout={() => setIsAuthenticated(false)} />
      <div className="main-area">
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard balance={balance} transactions={transactions} />} />
            <Route path="/send" element={<SendMoney balance={balance} setBalance={setBalance} addTransaction={addTransaction} />} />
            <Route path="/add-money" element={<AddMoney setBalance={setBalance} addTransaction={addTransaction} />} />
            <Route path="/transactions" element={<Transactions transactions={transactions} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;