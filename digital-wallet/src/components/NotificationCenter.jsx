import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CheckCheck,
  X,
} from "lucide-react";

const getStorageKey = (user) => `payflow-read-notifications-${user?.id || "guest"}`;

function formatNotification(transaction) {
  const isReceived = transaction.type === "Received";
  const amount = `₹${transaction.amount.toLocaleString("en-IN")}`;

  return {
    id: `transaction-${transaction.id}`,
    title: isReceived ? "Money received" : "Payment sent",
    message: isReceived
      ? `${amount} received from ${transaction.name || "a contact"}.`
      : `${amount} sent to ${transaction.name || "a contact"}.`,
    date: transaction.date,
    type: isReceived ? "received" : "sent",
    icon: isReceived ? ArrowDownLeft : ArrowUpRight,
  };
}

export default function NotificationCenter({ user, transactions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [readIds, setReadIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(getStorageKey(user)) || "[]");
    } catch {
      return [];
    }
  });
  const containerRef = useRef(null);

  const notifications = useMemo(() => {
    const transactionNotifications = transactions
      .slice(0, 6)
      .map(formatNotification);

    return [
      {
        id: "welcome",
        title: "Welcome to PayFlow",
        message: "Your wallet is ready for secure payments.",
        date: "Just now",
        type: "welcome",
        icon: Bell,
      },
      ...transactionNotifications,
    ];
  }, [transactions]);

  const unreadCount = notifications.filter(({ id }) => !readIds.includes(id)).length;

  useEffect(() => {
    localStorage.setItem(getStorageKey(user), JSON.stringify(readIds));
  }, [readIds, user]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const markAllAsRead = () => setReadIds(notifications.map(({ id }) => id));

  const markAsRead = (id) => {
    setReadIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  return (
    <div className="notification-center" ref={containerRef}>
      <button
        className="icon-btn notification"
        type="button"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <Bell size={19} />
        {unreadCount > 0 && <i aria-hidden="true" />}
      </button>

      {isOpen && (
        <section className="notification-panel" aria-label="Notifications">
          <div className="notification-panel-header">
            <div>
              <h2>Notifications</h2>
              <span>
                {unreadCount ? `${unreadCount} unread` : "You're all caught up"}
              </span>
            </div>
            <div className="notification-panel-actions">
              <button
                type="button"
                className="notification-action"
                onClick={markAllAsRead}
                disabled={!unreadCount}
              >
                <CheckCheck size={14} />
                Mark all read
              </button>
              <button
                type="button"
                className="notification-close"
                aria-label="Close notifications"
                onClick={() => setIsOpen(false)}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          <div className="notification-list">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              const isUnread = !readIds.includes(notification.id);

              return (
                <button
                  type="button"
                  className={`notification-item${isUnread ? " unread" : ""}`}
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                >
                  <span className={`notification-item-icon ${notification.type}`}>
                    <Icon size={16} />
                  </span>
                  <span className="notification-item-content">
                    <strong>{notification.title}</strong>
                    <span>{notification.message}</span>
                    <small>{notification.date}</small>
                  </span>
                  {isUnread && <span className="notification-unread-dot" aria-label="Unread" />}
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
