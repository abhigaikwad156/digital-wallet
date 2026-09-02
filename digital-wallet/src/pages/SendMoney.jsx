import { useState } from "react";
import { Send, UserRound, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function SendMoney({ balance, setBalance, fetchWallet, fetchTransactions, userId }) {
  const [form, setForm] = useState({ recipient: "", amount: "", note: "" });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const submit = async (e) => {
  e.preventDefault();

  const amount = Number(form.amount);

  if (!form.recipient || !amount || amount <= 0 || amount > balance) {
    alert("Please enter valid recipient ID and amount");
    return;
  }

  try {
    await api.post("transactions/send", {
      senderId: userId,
      receiverId: Number(form.recipient),
      amount: amount
    });

    setBalance(balance - amount);

    await fetchWallet();
    await fetchTransactions();

    setSuccess(true);

  } catch (error) {
    console.error("Transfer failed:", error);

    alert(
      error.response?.data?.message ||
      "Transfer failed"
    );
  }
};

  if (success) return (
    <div className="center-page">
      <div className="success-card">
        <div className="success-icon"><CheckCircle2 size={44}/></div>
        <h1>Money sent!</h1>
        <p>₹{Number(form.amount).toLocaleString("en-IN")} has been sent to <strong>{form.recipient}</strong>.</p>
        <button className="btn primary-btn" onClick={() => navigate("/")}>Back to Dashboard</button>
      </div>
    </div>
  );

  return (
    <div className="form-page">
      <Link to="/" className="back-link"><ArrowLeft size={17}/> Back to dashboard</Link>
      <div className="form-header"><div className="large-icon purple"><Send size={25}/></div><div><h1>Send Money</h1><p>Transfer money securely from your wallet.</p></div></div>
      <div className="form-layout">
        <form className="form-card" onSubmit={submit}>
          <label>Recipient</label>
          <div className="input-icon"><UserRound size={18}/><input value={form.recipient} onChange={e => setForm({...form, recipient:e.target.value})} placeholder="Enter recipient user ID" required /></div>
          <label>Amount</label>
          <div className="amount-input"><span>₹</span><input type="number" min="1" max={balance} value={form.amount} onChange={e => setForm({...form, amount:e.target.value})} placeholder="0.00" required /></div>
          <div className="available">Available balance: <strong>₹{balance.toLocaleString("en-IN", {minimumFractionDigits:2})}</strong></div>
          <label>Note <span className="optional">Optional</span></label>
          <textarea rows="3" value={form.note} onChange={e => setForm({...form, note:e.target.value})} placeholder="What's this payment for?" />
          <button className="btn primary-btn full-btn"><Send size={18}/> Send ₹{form.amount || "0"}</button>
        </form>
        <div className="info-card"><h3>Transfer securely</h3><p>Your payment is processed securely. Never share your wallet password or OTP with anyone.</p><div className="info-line"><span>Wallet balance</span><strong>₹{balance.toLocaleString("en-IN")}</strong></div><div className="info-line"><span>Demo mode</span><strong className="green-text">Enabled</strong></div></div>
      </div>
    </div>
  );
}