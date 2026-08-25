import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useState } from "react";

export default function BalanceCard({ balance }) {
  const [visible, setVisible] = useState(true);
  return (
    <div className="balance-card">
      <div className="balance-top">
        <div>
          <span className="eyebrow">AVAILABLE BALANCE</span>
          <div className="balance-value">
            {visible ? `₹${balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "₹••••••"}
            <button onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
          </div>
        </div>
        <div className="card-chip">PAYFLOW</div>
      </div>
      <div className="balance-bottom">
        <span>Wallet ID&nbsp; •••• 4829</span>
        <span>Updated just now</span>
      </div>
    </div>
  );
}