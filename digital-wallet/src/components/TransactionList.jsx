import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>Recent transactions</h2>
          <p>Your latest wallet activity</p>
        </div>
        <Link to="/transactions" className="view-all">View all <ArrowRight size={16}/></Link>
      </div>
      <div className="transaction-list">
        {transactions.slice(0, 5).map((t) => <TransactionItem key={t.id} transaction={t} />)}
      </div>
    </section>
  );
}