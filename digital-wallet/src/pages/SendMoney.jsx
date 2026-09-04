import { useState } from "react";
import {
  Send,
  UserRound,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function SendMoney({
  balance,
  fetchWallet,
  fetchTransactions,
  userId,
}) {
  const [form, setForm] = useState({
    recipient: "",
    amount: "",
    note: "",
  });

  const [review, setReview] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const amount = Number(form.amount);
  const receiverEmail = form.recipient.trim();

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // --------------------------------
  // VALIDATE PAYMENT
  // --------------------------------

  const validateForm = () => {
    if (!receiverEmail) {
      alert("Please enter the recipient's email.");
      return false;
    }

    if (!receiverEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return false;
    }

    if (amount > balance) {
      alert("Insufficient wallet balance.");
      return false;
    }

    return true;
  };

  // --------------------------------
  // CONTINUE TO REVIEW
  // --------------------------------

  const handleContinue = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setReview(true);
  };

  // --------------------------------
  // SEND MONEY
  // --------------------------------

  const handleSend = async () => {
    setLoading(true);

    try {
      console.log("Sending payment:", {
        senderId: userId,
        receiverEmail: receiverEmail,
        amount: amount,
      });

      await api.post("/transactions/send", {
        senderId: userId,
        receiverEmail: receiverEmail,
        amount: amount,
      });

      // Get latest balance from backend
      await fetchWallet();

      // Get latest transactions from backend
      await fetchTransactions();

      setSuccess(true);
    } catch (error) {
      console.error("Transfer failed:", error);

      console.error(
        "Backend response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // SUCCESS SCREEN
  // ========================================

  if (success) {
    return (
      <div className="center-page">
        <div className="success-card">

          <div className="success-icon">
            <CheckCircle2 size={48} />
          </div>

          <h1>Payment Successful</h1>

          <p>
            ₹
            {amount.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}{" "}
            has been sent successfully.
          </p>

          <div className="payment-summary">

            <div>
              <span>Recipient</span>
              <strong>{receiverEmail}</strong>
            </div>

            <div>
              <span>Amount</span>
              <strong>
                ₹
                {amount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </strong>
            </div>

            {form.note && (
              <div>
                <span>Note</span>
                <strong>{form.note}</strong>
              </div>
            )}

            <div>
              <span>Status</span>
              <strong className="green-text">
                Completed
              </strong>
            </div>

          </div>

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

  // ========================================
  // REVIEW SCREEN
  // ========================================

  if (review) {
    return (
      <div className="form-page">

        <button
          className="back-link"
          onClick={() => setReview(false)}
        >
          <ArrowLeft size={17} />
          Edit payment
        </button>

        <div className="form-header">

          <div className="large-icon purple">
            <ShieldCheck size={25} />
          </div>

          <div>
            <h1>Review Payment</h1>
            <p>
              Please check the details before sending.
            </p>
          </div>

        </div>

        <div className="review-card">

          <div className="review-amount">
            <span>You're sending</span>

            <h2>
              ₹
              {amount.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </h2>
          </div>

          <div className="review-row">
            <span>Recipient</span>
            <strong>{receiverEmail}</strong>
          </div>

          <div className="review-row">
            <span>Current balance</span>

            <strong>
              ₹
              {balance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </strong>
          </div>

          <div className="review-row">
            <span>Balance after payment</span>

            <strong>
              ₹
              {(balance - amount).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </strong>
          </div>

          {form.note && (
            <div className="review-row">
              <span>Note</span>
              <strong>{form.note}</strong>
            </div>
          )}

          <button
            className="btn primary-btn full-btn"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <ShieldCheck size={18} />
                Confirm & Send ₹
                {amount.toLocaleString("en-IN")}
              </>
            )}
          </button>

        </div>
      </div>
    );
  }

  // ========================================
  // SEND MONEY SCREEN
  // ========================================

  return (
    <div className="form-page">

      <Link to="/" className="back-link">
        <ArrowLeft size={17} />
        Back to dashboard
      </Link>

      <div className="form-header">

        <div className="large-icon purple">
          <Send size={25} />
        </div>

        <div>
          <h1>Send Money</h1>

          <p>
            Send money securely from your PayFlow wallet.
          </p>
        </div>

      </div>

      <div className="form-layout">

        {/* =========================
            PAYMENT FORM
           ========================= */}

        <form
          className="form-card"
          onSubmit={handleContinue}
        >

          {/* RECIPIENT */}

          <label>Recipient</label>

          <div className="input-icon">

            <UserRound size={18} />

            <input
              type="email"
              value={form.recipient}
              onChange={(e) =>
                updateForm(
                  "recipient",
                  e.target.value
                )
              }
              placeholder="Enter recipient email"
              required
            />

          </div>

          <p className="input-help">
            Enter the email address of the person
            you want to pay.
          </p>

          {/* AMOUNT */}

          <label>Amount</label>

          <div className="amount-input">

            <span>₹</span>

            <input
              type="number"
              value={form.amount}
              onChange={(e) =>
                updateForm(
                  "amount",
                  e.target.value
                )
              }
              placeholder="0.00"
              min="1"
              max={balance}
              required
            />

          </div>

          {/* AVAILABLE BALANCE */}

          <div className="available">

            Available balance:

            <strong>
              ₹
              {balance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </strong>

          </div>

          {/* QUICK AMOUNTS */}

          <div className="quick-amounts">

            {[100, 500, 1000, 2000].map(
              (value) => (
                <button
                  type="button"
                  key={value}
                  disabled={value > balance}
                  onClick={() =>
                    updateForm(
                      "amount",
                      value.toString()
                    )
                  }
                >
                  ₹{value}
                </button>
              )
            )}

          </div>

          {/* NOTE */}

          <label>
            Note{" "}
            <span className="optional">
              Optional
            </span>
          </label>

          <textarea
            rows="3"
            value={form.note}
            onChange={(e) =>
              updateForm(
                "note",
                e.target.value
              )
            }
            placeholder="What's this payment for?"
            maxLength={100}
          />

          {/* CONTINUE */}

          <button
            className="btn primary-btn full-btn"
            type="submit"
          >
            Continue
            <ArrowRight size={18} />
          </button>

        </form>

        {/* =========================
            INFORMATION CARD
           ========================= */}

        <div className="info-card">

          <div className="info-icon">
            <ShieldCheck size={22} />
          </div>

          <h3>Secure transfer</h3>

          <p>
            Review your payment details before
            the money is transferred.
          </p>

          <div className="info-line">

            <span>Wallet balance</span>

            <strong>
              ₹
              {balance.toLocaleString("en-IN")}
            </strong>

          </div>

          <div className="info-line">

            <span>Payment mode</span>

            <strong className="green-text">
              PayFlow Wallet
            </strong>

          </div>

          <div className="info-line">

            <span>Processing</span>

            <strong>
              Instant
            </strong>

          </div>

        </div>

      </div>
    </div>
  );
}