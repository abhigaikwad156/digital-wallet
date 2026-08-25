import { useState } from "react";
import { Plus, CreditCard, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AddMoney({ setBalance, addTransaction }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0) return;
    setBalance(b => b + value);
    addTransaction({ name: `${method} Top Up`, type: "Received", amount: value, date: "Just now", status: "Completed", initials: "IN" });
    setSuccess(true);
  };

  if (success) return <div className="center-page"><div className="success-card"><div className="success-icon"><CheckCircle2 size={44}/></div><h1>Money added!</h1><p>₹{Number(amount).toLocaleString("en-IN")} was added using {method}.</p><button className="btn primary-btn" onClick={() => navigate("/")}>Back to Dashboard</button></div></div>;

  return (
    <div className="form-page">
      <Link to="/" className="back-link"><ArrowLeft size={17}/> Back to dashboard</Link>
      <div className="form-header"><div className="large-icon green"><Plus size={27}/></div><div><h1>Add Money</h1><p>Top up your PayFlow wallet.</p></div></div>
      <form className="form-card narrow" onSubmit={submit}>
        <label>Amount</label>
        <div className="amount-input"><span>₹</span><input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" required /></div>
        <div className="amount-presets">{[500,1000,2000,5000].map(v => <button type="button" key={v} onClick={() => setAmount(String(v))}>₹{v.toLocaleString("en-IN")}</button>)}</div>
        <label>Payment method</label>
        <div className="method-options">
          {["UPI", "Debit Card", "Bank Transfer"].map(m => <button type="button" key={m} className={method === m ? "method active" : "method"} onClick={() => setMethod(m)}><CreditCard size={18}/>{m}</button>)}
        </div>
        <button className="btn primary-btn full-btn"><Plus size={18}/> Add ₹{amount || "0"}</button>
      </form>
    </div>
  );
}