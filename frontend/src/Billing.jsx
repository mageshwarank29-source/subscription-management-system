
import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Eye,
  X,
  Receipt,
  IndianRupee,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  FileText,
} from "lucide-react";
import "./Billing.css";

const initialInvoices = [
  {
    id: "BL-2026-003",
    customer: "Arun Kumar",
    email: "arun@gmail.com",
    plan: "Premium",
    amount: 999,
    date: "31 Oct 2026",
    due: "05 Nov 2026",
    status: "Paid",
  },
  {
    id: "BL-2026-002",
    customer: "Priya Sharma",
    email: "priya@gmail.com",
    plan: "Basic",
    amount: 499,
    date: "28 Oct 2026",
    due: "03 Nov 2026",
    status: "Pending",
  },
  {
    id: "BL-2026-001",
    customer: "Rahul Das",
    email: "rahul@gmail.com",
    plan: "Standard",
    amount: 699,
    date: "20 Oct 2026",
    due: "25 Oct 2026",
    status: "Overdue",
  },
  {
    id: "BL-2026-004",
    customer: "Sneha R",
    email: "sneha@gmail.com",
    plan: "Premium",
    amount: 999,
    date: "25 Oct 2026",
    due: "01 Nov 2026",
    status: "Paid",
  },
  {
    id: "BL-2026-005",
    customer: "Karthik S",
    email: "karthik@gmail.com",
    plan: "Basic",
    amount: 499,
    date: "29 Oct 2026",
    due: "06 Nov 2026",
    status: "Pending",
  },
];

function Billing() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    customer: "",
    email: "",
    plan: "Basic",
    amount: "",
    due: "",
  });

  const paidInvoices = invoices.filter((i) => i.status === "Paid");
  const pendingInvoices = invoices.filter((i) => i.status === "Pending");
  const overdueInvoices = invoices.filter((i) => i.status === "Overdue");

  const totalRevenue = paidInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.amount),
    0
  );

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      `${invoice.id} ${invoice.customer} ${invoice.email}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const generateInvoice = (e) => {
    e.preventDefault();

    const invoice = {
      id: `BL-${Date.now()}`,
      customer: form.customer,
      email: form.email,
      plan: form.plan,
      amount: Number(form.amount),
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      due: new Date(form.due).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
    };

    setInvoices((prev) => [invoice, ...prev]);
    setShowModal(false);
    setForm({
      customer: "",
      email: "",
      plan: "Basic",
      amount: "",
      due: "",
    });
  };

  const downloadInvoice = (invoice) => {
    const content = `
BRIGHTLOOP
INVOICE

Invoice ID: ${invoice.id}
Customer: ${invoice.customer}
Email: ${invoice.email}

Plan: ${invoice.plan}
Invoice Date: ${invoice.date}
Due Date: ${invoice.due}

Total Amount: Rs. ${invoice.amount}
Payment Status: ${invoice.status}

Thank you for choosing BrightLoop.
`;

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${invoice.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      count: `${paidInvoices.length} paid invoices`,
      icon: IndianRupee,
      color: "purple",
    },
    {
      title: "Paid Invoices",
      value: paidInvoices.length,
      count: "Successfully paid",
      icon: CheckCircle2,
      color: "green",
    },
    {
      title: "Pending Invoices",
      value: pendingInvoices.length,
      count: "Awaiting payment",
      icon: Clock,
      color: "orange",
    },
    {
      title: "Overdue Invoices",
      value: overdueInvoices.length,
      count: "Payment overdue",
      icon: AlertCircle,
      color: "red",
    },
  ];

  if (selectedInvoice) {
    const invoice = selectedInvoice;

    return (
      <div className="billing-page">
        <button
          className="billing-back"
          onClick={() => setSelectedInvoice(null)}
        >
          <ArrowLeft size={16} />
          Back to Billing
        </button>

        <div className="billing-heading">
          <div>
            <span className="billing-eyebrow">BILLING / INVOICE DETAILS</span>
            <h2>Invoice Details</h2>
            <p>View complete invoice and payment information.</p>
          </div>

          <button
            className="billing-primary"
            onClick={() => downloadInvoice(invoice)}
          >
            <Download size={16} />
            Download Invoice
          </button>
        </div>

        <div className="billing-invoice-card">
          <div className="billing-invoice-top">
            <div>
              <h2>BRIGHTLOOP</h2>
              <span>Subscription Management</span>
            </div>

            <span className={`billing-status ${invoice.status.toLowerCase()}`}>
              {invoice.status}
            </span>
          </div>

          <div className="billing-invoice-number">
            <span>INVOICE NUMBER</span>
            <strong>{invoice.id}</strong>
          </div>

          <div className="billing-detail-grid">
            <div>
              <span>Customer Name</span>
              <strong>{invoice.customer}</strong>
            </div>

            <div>
              <span>Email Address</span>
              <strong>{invoice.email}</strong>
            </div>

            <div>
              <span>Invoice Date</span>
              <strong>{invoice.date}</strong>
            </div>

            <div>
              <span>Due Date</span>
              <strong>{invoice.due}</strong>
            </div>
          </div>

          <div className="billing-item">
            <div>
              <strong>{invoice.plan} Subscription</strong>
              <span>Subscription billing</span>
            </div>
            <strong>₹{invoice.amount.toLocaleString("en-IN")}</strong>
          </div>

          <div className="billing-total">
            <span>Total Amount</span>
            <strong>₹{invoice.amount.toLocaleString("en-IN")}</strong>
          </div>

          <div className="billing-thankyou">
            Thank you for choosing BrightLoop.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="billing-page">
      <div className="billing-heading">
        <div>
          <span className="billing-eyebrow">FINANCE MANAGEMENT</span>
          <h2>Billing & Invoices</h2>
          <p>Manage customer invoices, payments and billing records.</p>
        </div>

        <button
          className="billing-primary"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} />
          Generate Invoice
        </button>
      </div>

      <div className="billing-stats">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div className="billing-stat" key={item.title}>
              <div className={`billing-stat-icon ${item.color}`}>
                <Icon size={20} />
              </div>

              <span>{item.title}</span>
              <strong>{item.value}</strong>
              <small>{item.count}</small>
            </div>
          );
        })}
      </div>

      <div className="billing-panel">
        <div className="billing-panel-heading">
          <div>
            <h3>All Invoices</h3>
            <p>View and manage customer billing records.</p>
          </div>

          <span className="billing-count">
            {filteredInvoices.length} Invoices
          </span>
        </div>

        <div className="billing-toolbar">
          <div className="billing-search">
            <Search size={17} />
            <input
              placeholder="Search invoices or customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={15} />
              </button>
            )}
          </div>

          <select
            className="billing-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className="billing-table-scroll">
          <table className="billing-table">
            <thead>
              <tr>
                <th>INVOICE ID</th>
                <th>CUSTOMER</th>
                <th>PLAN</th>
                <th>AMOUNT</th>
                <th>INVOICE DATE</th>
                <th>DUE DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <strong>{invoice.id}</strong>
                  </td>

                  <td>
                    <div className="billing-customer">
                      <strong>{invoice.customer}</strong>
                      <span>{invoice.email}</span>
                    </div>
                  </td>

                  <td>{invoice.plan}</td>

                  <td>
                    <strong>₹{invoice.amount.toLocaleString("en-IN")}</strong>
                  </td>

                  <td>{invoice.date}</td>
                  <td>{invoice.due}</td>

                  <td>
                    <span className={`billing-status ${invoice.status.toLowerCase()}`}>
                      {invoice.status}
                    </span>
                  </td>

                  <td>
                    <div className="billing-actions">
                      <button
                        title="View invoice"
                        onClick={() => setSelectedInvoice(invoice)}
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        title="Download invoice"
                        onClick={() => downloadInvoice(invoice)}
                      >
                        <Download size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan="8" className="billing-empty">
                    <Receipt size={28} />
                    <strong>No invoices found</strong>
                    <span>Try another search or filter.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="billing-footer">
          Showing {filteredInvoices.length} of {invoices.length} invoices
        </div>
      </div>

      {showModal && (
        <div
          className="billing-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="billing-modal">
            <div className="billing-modal-heading">
              <div>
                <div className="billing-modal-icon">
                  <FileText size={20} />
                </div>
                <h3>Generate New Invoice</h3>
                <p>Enter customer and billing information.</p>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={19} />
              </button>
            </div>

            <form onSubmit={generateInvoice}>
              <label>
                Customer Name *
                <input
                  value={form.customer}
                  onChange={(e) =>
                    setForm({ ...form, customer: e.target.value })
                  }
                  placeholder="Enter customer name"
                  required
                />
              </label>

              <label>
                Email Address *
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="example@gmail.com"
                  required
                />
              </label>

              <div className="billing-form-row">
                <label>
                  Subscription Plan
                  <select
                    value={form.plan}
                    onChange={(e) =>
                      setForm({ ...form, plan: e.target.value })
                    }
                  >
                    <option>Basic</option>
                    <option>Standard</option>
                    <option>Premium</option>
                  </select>
                </label>

                <label>
                  Amount (₹) *
                  <input
                    type="number"
                    min="1"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    placeholder="999"
                    required
                  />
                </label>
              </div>

              <label>
                Due Date *
                <input
                  type="date"
                  value={form.due}
                  onChange={(e) =>
                    setForm({ ...form, due: e.target.value })
                  }
                  required
                />
              </label>

              <div className="billing-modal-actions">
                <button
                  type="button"
                  className="billing-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="billing-primary">
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Billing;
