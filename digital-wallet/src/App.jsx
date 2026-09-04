import { useEffect, useState } from "react";
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

import api from "./api/api";

function App() {
  // =========================
  // USER
  // =========================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // =========================
  // AUTHENTICATION
  // =========================

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") !== null;
  });

  // =========================
  // WALLET
  // =========================

  const [balance, setBalance] = useState(0);

  // =========================
  // TRANSACTIONS
  // =========================

  const [transactions, setTransactions] = useState([]);

  // =========================
  // USER ID
  // =========================

  const userId = user?.id;

  // =========================
  // LOAD USER DATA
  // =========================

  useEffect(() => {
    if (userId) {
      fetchWallet();
      fetchTransactions();
    }
  }, [userId]);

  // =========================
  // FETCH WALLET
  // =========================

  const fetchWallet = async () => {
    try {
      const response = await api.get(`/wallet/${userId}`);

      console.log("Wallet response:", response.data);

      setBalance(Number(response.data.balance));
    } catch (error) {
      console.error("Failed to fetch wallet:", error);
    }
  };

  // =========================
  // FETCH TRANSACTIONS
  // =========================

  const fetchTransactions = async () => {
  try {
    const response = await api.get(
      `/transactions/user/${userId}`
    );

    const formattedTransactions = response.data.map((t) => {
      const received = t.receiverId === userId;

      return {
        id: t.id,

        name: received
          ? t.senderName
          : t.receiverName,

        type: received
          ? "Received"
          : "Sent",

        amount: Number(t.amount),

        date: new Date(t.createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),

        status: "Completed",
      };
    });

    console.log("Formatted transactions:", formattedTransactions);

    setTransactions(formattedTransactions);

  } catch (error) {
    console.error(
      "Failed to fetch transactions:",
      error
    );
  }
};

  // =========================
  // LOGIN / REGISTER
  // =========================

  if (!isAuthenticated) {
    return (
      <Routes>
        {/* LOGIN */}

        <Route
          path="/login"
          element={
            <Login
              onLogin={(userData) => {
                setUser(userData);
                setIsAuthenticated(true);

                localStorage.setItem(
                  "user",
                  JSON.stringify(userData)
                );
              }}
            />
          }
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={
            <Register
              onRegister={async (userData) => {
                try {
                  const response = await api.post(
                    "/auth/register",
                    userData
                  );

                  console.log(
                    "Registration successful:",
                    response.data
                  );

                  alert(
                    "Account created successfully!"
                  );

                  window.location.href = "/login";
                } catch (error) {
                  console.error(
                    "Registration failed:",
                    error
                  );

                  alert(
                    error.response?.data?.message ||
                    "Registration failed. Please try again."
                  );
                }
              }}
            />
          }
        />

        {/* DEFAULT */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    );
  }

  // =========================
  // MAIN APPLICATION
  // =========================

  return (
    <div className="app-shell">

      {/* SIDEBAR */}

      <Sidebar
        onLogout={() => {
          setUser(null);
          setIsAuthenticated(false);
          setBalance(0);
          setTransactions([]);

          localStorage.removeItem("user");
        }}
      />

      {/* MAIN AREA */}

      <div className="main-area">

        <Navbar user={user} />

        <main className="page-content">

          <Routes>

            {/* DASHBOARD */}

            <Route
              path="/"
              element={
                <Dashboard
                  balance={balance}
                  transactions={transactions}
                  user={user}
                />
              }
            />

            {/* SEND MONEY */}

            <Route
              path="/send"
              element={
                <SendMoney
                  balance={balance}
                  setBalance={setBalance}
                  userId={userId}
                  fetchWallet={fetchWallet}
                  fetchTransactions={
                    fetchTransactions
                  }
                />
              }
            />

            {/* ADD MONEY */}

            <Route
              path="/add-money"
              element={
                <AddMoney
                  userId={userId}
                  setBalance={setBalance}
                  fetchWallet={fetchWallet}
                />
              }
            />

            {/* TRANSACTIONS */}

            <Route
              path="/transactions"
              element={
                <Transactions
                  transactions={transactions}
                />
              }
            />

            {/* PROFILE */}

            <Route
              path="/profile"
              element={<Profile user={user} />}
            />

            {/* FALLBACK */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>

        </main>
      </div>
    </div>
  );
}

export default App;