import { useState } from "react";
import {
  Plus,
  CreditCard,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import api from "../api/api";

export default function AddMoney({
  userId,
  setBalance,
  fetchWallet
}) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // =========================
  // SUBMIT
  // =========================

  const submit = async (e) => {
    e.preventDefault();

    const amountValue = Number(amount);

    if (!amountValue || amountValue <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      console.log("User ID:", userId);
      console.log("Amount:", amountValue);

      // IMPORTANT:
      // api.js already contains /api
      //
      // baseURL:
      // http://localhost:8080/api
      //
      // Therefore use:
      // /wallet/...
      //
      // NOT:
      // /api/wallet/...

      const response = await api.post(
        `/wallet/${userId}/add`,
        {
          amount: amountValue
        }
      );

      console.log(
        "Add money response:",
        response.data
      );

      // Update balance immediately
      setBalance(
        Number(response.data.balance)
      );

      // Optional extra refresh from backend
      await fetchWallet();

      // Show success screen
      setSuccess(true);

    } catch (error) {
      console.error(
        "Add money failed:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to add money"
      );
    }
  };

  // =========================
  // SUCCESS SCREEN
  // =========================

  if (success) {
    return (
      <div className="center-page">

        <div className="success-card">

          <div className="success-icon">
            <CheckCircle2 size={44} />
          </div>

          <h1>
            Money added!
          </h1>

          <p>
            ₹
            {Number(amount).toLocaleString(
              "en-IN"
            )}
            {" "}was added using {method}.
          </p>

          <button
            className="btn primary-btn"
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  // =========================
  // ADD MONEY FORM
  // =========================

  return (
    <div className="form-page">

      <Link
        to="/"
        className="back-link"
      >
        <ArrowLeft size={17} />
        Back to dashboard
      </Link>

      <div className="form-header">

        <div className="large-icon green">
          <Plus size={27} />
        </div>

        <div>
          <h1>
            Add Money
          </h1>

          <p>
            Top up your PayFlow wallet.
          </p>
        </div>

      </div>

      <form
        className="form-card narrow"
        onSubmit={submit}
      >

        {/* AMOUNT */}

        <label>
          Amount
        </label>

        <div className="amount-input">

          <span>
            ₹
          </span>

          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            placeholder="0.00"
            required
          />

        </div>

        {/* PRESETS */}

        <div className="amount-presets">

          {[500, 1000, 2000, 5000].map(
            (v) => (
              <button
                type="button"
                key={v}
                onClick={() =>
                  setAmount(String(v))
                }
              >
                ₹
                {v.toLocaleString("en-IN")}
              </button>
            )
          )}

        </div>

        {/* PAYMENT METHOD */}

        <label>
          Payment method
        </label>

        <div className="method-options">

          {[
            "UPI",
            "Debit Card",
            "Bank Transfer"
          ].map((m) => (

            <button
              type="button"
              key={m}
              className={
                method === m
                  ? "method active"
                  : "method"
              }
              onClick={() =>
                setMethod(m)
              }
            >

              <CreditCard size={18} />

              {m}

            </button>

          ))}

        </div>

        {/* SUBMIT */}

        <button
          type="submit"
          className="btn primary-btn full-btn"
        >

          <Plus size={18} />

          Add ₹{amount || "0"}

        </button>

      </form>

    </div>
  );
}