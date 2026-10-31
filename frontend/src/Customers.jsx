
import { useEffect, useState } from "react";
import {
  Search,
  Download,
  X,
  Users,
  UserPlus,
  Filter,
  Eye,
  ArrowLeft,
  CalendarDays,
  Mail,
  Phone,
  Activity,
  Pencil,
  Trash2,
  CreditCard,
  Receipt,
} from "lucide-react";
import "./Customers.css";
import { getCustomers, createCustomer } from "./api";

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function mapCustomer(customer) {
  return {
    id: customer.id,
    name: customer.name || "",
    email: customer.email || "",
    phone: customer.phone || "",
    joined: formatDate(customer.created_at),
    plan: "Not assigned",
    status: "Not available",
    amount: null,
  };
}

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
  };

  const [form, setForm] = useState(emptyForm);

  // Load customers from backend
  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCustomers();
      const mappedCustomers = data.map(mapCustomer);

      setCustomers(mappedCustomers);

      if (selectedCustomer) {
        const updated = mappedCustomers.find(
          (customer) => customer.id === selectedCustomer.id
        );

        setSelectedCustomer(updated || null);
      }
    } catch (err) {
      setError(err.message || "Unable to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      `${customer.name} ${customer.email} ${customer.phone}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All";

    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  // Add customer through backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await createCustomer(form);

      setShowModal(false);
      setForm(emptyForm);

      await loadCustomers();
    } catch (err) {
      setError(err.message || "Unable to add customer.");
    } finally {
      setSaving(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Joined"];

    const rows = customers.map((customer) => [
      customer.name,
      customer.email,
      customer.phone,
      customer.joined,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) =>
          `"${String(value ?? "").replace(/"/g, '""')}"`
        ).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "brightloop-customers.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const profileCardStyle = {
    background: "var(--card-bg, #ffffff)",
    border: "1px solid var(--border-color, #e8eaf0)",
    borderRadius: "14px",
    padding: "20px",
  };

  const profileLabelStyle = {
    color: "#8991a5",
    fontSize: "12px",
    marginBottom: "7px",
    display: "block",
  };

  const profileValueStyle = {
    color: "var(--text-primary, #202437)",
    fontSize: "15px",
    fontWeight: 600,
  };

  const initials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  function renderCustomerModal() {
    return (
      <div
        className="customer-modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowModal(false);
            setError("");
          }
        }}
      >
        <div className="customer-modal">
          <div className="customer-modal-heading">
            <div>
              <div className="modal-icon">
                <UserPlus size={20} />
              </div>

              <h3>Add New Customer</h3>
              <p>Enter customer information below.</p>
            </div>

            <button
              className="modal-close"
              type="button"
              onClick={() => {
                setShowModal(false);
                setError("");
              }}
            >
              <X size={19} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Customer Name *
              <input
                type="text"
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </label>

            <label>
              Email Address *
              <input
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </label>

            <label>
              Phone Number *
              <input
                type="tel"
                placeholder="+91 9876543210"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                required
              />
            </label>

            {error && (
              <p style={{ color: "#dc3545", fontSize: "13px" }}>
                {error}
              </p>
            )}

            <div className="customer-modal-actions">
              <button
                type="button"
                className="modal-cancel"
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="customer-add"
                disabled={saving}
              >
                {saving ? "Saving..." : "Add Customer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Customer 360 profile
  if (selectedCustomer) {
    const customer = selectedCustomer;

    return (
      <div className="customers-page">
        <button
          onClick={() => setSelectedCustomer(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "none",
            background: "transparent",
            color: "#7773e8",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: "22px",
            padding: "5px 0",
            fontSize: "14px",
          }}
        >
          <ArrowLeft size={17} />
          Back to Customers
        </button>

        <div className="customers-heading">
          <div>
            <span className="customers-eyebrow">
              CUSTOMER MANAGEMENT / PROFILE
            </span>
            <h2>Customer Profile</h2>
            <p>Customer information from BrightLoop backend.</p>
          </div>
        </div>

        <div
          style={{
            ...profileCardStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                background: "#eeedff",
                color: "#7773e8",
                display: "grid",
                placeItems: "center",
                fontSize: "21px",
                fontWeight: 700,
              }}
            >
              {initials(customer.name)}
            </div>

            <div>
              <h2 style={{ margin: "0 0 6px", fontSize: "22px" }}>
                {customer.name}
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  color: "#8991a5",
                  fontSize: "13px",
                }}
              >
                <Mail size={14} />
                {customer.email}
              </div>
            </div>
          </div>

          <div>
            <span style={profileLabelStyle}>Customer ID</span>
            <strong style={profileValueStyle}>{customer.id}</strong>
            <br />
            <span style={profileLabelStyle}>Joined Date</span>
            <strong style={profileValueStyle}>{customer.joined}</strong>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div style={profileCardStyle}>
            <CreditCard size={20} color="#7773e8" />
            <span style={{ ...profileLabelStyle, marginTop: "13px" }}>
              Current Plan
            </span>
            <strong style={profileValueStyle}>Not assigned</strong>
          </div>

          <div style={profileCardStyle}>
            <Receipt size={20} color="#16a36a" />
            <span style={{ ...profileLabelStyle, marginTop: "13px" }}>
              Subscription Amount
            </span>
            <strong style={profileValueStyle}>Not available</strong>
          </div>

          <div style={profileCardStyle}>
            <CheckCircle2Placeholder />
            <span style={{ ...profileLabelStyle, marginTop: "13px" }}>
              Customer Status
            </span>
            <strong style={profileValueStyle}>Not available</strong>
          </div>

          <div style={profileCardStyle}>
            <CalendarDays size={20} color="#e69a35" />
            <span style={{ ...profileLabelStyle, marginTop: "13px" }}>
              Payment Records
            </span>
            <strong style={profileValueStyle}>Not loaded</strong>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
            marginBottom: "20px",
          }}
        >
          <div style={profileCardStyle}>
            <h3 style={{ margin: "0 0 20px", fontSize: "16px" }}>
              Personal Information
            </h3>

            <div style={{ marginBottom: "18px" }}>
              <span style={profileLabelStyle}>Full Name</span>
              <strong style={profileValueStyle}>{customer.name}</strong>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <span style={profileLabelStyle}>Email Address</span>
              <strong style={profileValueStyle}>{customer.email}</strong>
            </div>

            <div>
              <span style={profileLabelStyle}>Phone Number</span>
              <strong style={profileValueStyle}>{customer.phone}</strong>
            </div>
          </div>

          <div style={profileCardStyle}>
            <h3 style={{ margin: "0 0 20px", fontSize: "16px" }}>
              Subscription Details
            </h3>

            <div style={{ marginBottom: "18px" }}>
              <span style={profileLabelStyle}>Subscription Plan</span>
              <strong style={profileValueStyle}>Not assigned</strong>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <span style={profileLabelStyle}>Subscription Amount</span>
              <strong style={profileValueStyle}>Not available</strong>
            </div>

            <div>
              <span style={profileLabelStyle}>Subscription Status</span>
              <strong style={profileValueStyle}>Not available</strong>
            </div>
          </div>
        </div>

        <div style={{ ...profileCardStyle, marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>
            Payment History
          </h3>
          <p style={{ color: "#8991a5", fontSize: "13px" }}>
            Payment records will appear here when connected to the payments API.
          </p>
          <p style={{ color: "#8991a5", fontSize: "13px" }}>
            No payment records loaded yet.
          </p>
        </div>

        <div style={profileCardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Activity size={20} color="#7773e8" />
            <h3 style={{ margin: 0, fontSize: "16px" }}>
              Customer Activity
            </h3>
          </div>

          <p style={{ color: "#8991a5", fontSize: "13px", marginTop: "16px" }}>
            Customer account created on {customer.joined}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="customers-page">
      <div className="customers-heading">
        <div>
          <span className="customers-eyebrow">
            CUSTOMER MANAGEMENT
          </span>
          <h2>Customers</h2>
          <p>Manage your customers and build lasting relationships.</p>
        </div>

        <div className="customer-actions">
          <button className="customer-export" onClick={exportCSV}>
            <Download size={15} />
            Export
          </button>

          <button className="customer-add" onClick={openAddModal}>
            <UserPlus size={15} />
            Add Customer
          </button>
        </div>
      </div>

      <div className="customer-stats">
        <div className="customer-stat">
          <div className="customer-stat-icon purple-bg">
            <Users size={20} />
          </div>
          <span>Total Customers</span>
          <strong>{customers.length}</strong>
        </div>

        <div className="customer-stat">
          <div className="customer-stat-icon green-bg">
            <Users size={20} />
          </div>
          <span>Active Customers</span>
          <strong>—</strong>
        </div>

        <div className="customer-stat">
          <div className="customer-stat-icon orange-bg">
            <Users size={20} />
          </div>
          <span>Inactive Customers</span>
          <strong>—</strong>
        </div>
      </div>

      <div className="customer-table-panel">
        <div className="customer-table-heading">
          <div>
            <h3>All Customers</h3>
            <p>Live customer information from backend.</p>
          </div>

          <span className="customer-count">
            {filteredCustomers.length} Customers
          </span>
        </div>

        <div className="customer-toolbar">
          <div className="customer-search">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <X size={15} />
              </button>
            )}
          </div>

          <div className="customer-filter">
            <Filter size={15} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Customers</option>
            </select>
          </div>
        </div>

        {error && !showModal && (
          <div style={{ color: "#dc3545", padding: "15px" }}>
            {error}
            <button
              onClick={loadCustomers}
              style={{ marginLeft: "12px", cursor: "pointer" }}
            >
              Retry
            </button>
          </div>
        )}

        <div className="customer-table-scroll">
          <table className="customer-table">
            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>PHONE NUMBER</th>
                <th>PLAN</th>
                <th>STATUS</th>
                <th>AMOUNT</th>
                <th>JOINED DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="customer-empty">
                    Loading customers...
                  </td>
                </tr>
              ) : filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-person">
                      <div className="customer-initials">
                        {initials(customer.name)}
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() => setSelectedCustomer(customer)}
                          style={{
                            border: "none",
                            padding: 0,
                            background: "transparent",
                            color: "inherit",
                            fontWeight: 600,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          {customer.name}
                        </button>
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="customer-phone">{customer.phone}</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td className="customer-date">{customer.joined}</td>

                  <td>
                    <div className="customer-row-actions">
                      <button
                        title="View customer profile"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        title="Edit is not supported by the current API"
                        onClick={() =>
                          alert("Customer editing is not yet supported by the backend.")
                        }
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="delete-action"
                        title="Delete is not supported by the current API"
                        onClick={() =>
                          alert("Customer deletion is not yet supported by the backend.")
                        }
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && filteredCustomers.length === 0 && !error && (
                <tr>
                  <td colSpan="7" className="customer-empty">
                    <Users size={28} />
                    <strong>No customers found</strong>
                    <span>Try another search or add a customer.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="customer-table-footer">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>

      {showModal && renderCustomerModal()}
    </div>
  );
}

function CheckCircle2Placeholder() {
  return <Users size={20} color="#16a36a" />;
}

export default Customers;
