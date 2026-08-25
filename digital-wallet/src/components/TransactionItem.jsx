import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function TransactionItem({ transaction }) {
  const received = transaction.type === "Received";
  return (
    <div className="transaction-row">
      <div className={`transaction-icon ${received ? "received" : "sent"}`}>
        {received ? <ArrowDownLeft size={18}/> : <ArrowUpRight size={18}/>}
      </div>
      <div className="transaction-info">
        <strong>{transaction.name}</strong>
        <span>{transaction.date}</span>
      </div>
      <div className={`transaction-amount ${received ? "positive" : ""}`}>
        {received ? "+" : "-"}₹{transaction.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        <small>{transaction.status}</small>
      </div>
    </div>
  );
}