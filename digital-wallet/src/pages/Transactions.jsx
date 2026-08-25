import { useMemo, useState } from "react";
import { Search, ArrowDownUp } from "lucide-react";
import TransactionItem from "../components/TransactionItem";

export default function Transactions({ transactions }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => transactions.filter(t => (filter === "All" || t.type === filter) && t.name.toLowerCase().includes(query.toLowerCase())), [transactions, query, filter]);

  return (
    <>
      <div className="page-heading"><div><h1>Transactions</h1><p>View and manage all your wallet activity.</p></div></div>
      <div className="panel">
        <div className="transaction-toolbar">
          <div className="search-box table-search"><Search size={17}/><input placeholder="Search by name..." value={query} onChange={e => setQuery(e.target.value)} /></div>
          <div className="filter-tabs">{["All","Sent","Received"].map(x => <button className={filter===x?"selected":""} onClick={() => setFilter(x)} key={x}>{x}</button>)}</div>
        </div>
        <div className="transaction-list">{filtered.length ? filtered.map(t => <TransactionItem key={t.id} transaction={t}/>) : <div className="empty">No transactions found.</div>}</div>
      </div>
    </>
  );
}