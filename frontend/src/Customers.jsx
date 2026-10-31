
import { useState } from "react";
import {
  Search,
  Download,
  Pencil,
  Trash2,
  X,
  Users,
  UserPlus,
  Filter,
  Eye,
  ArrowLeft,
  CreditCard,
  CalendarDays,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  Receipt,
  Activity,
} from "lucide-react";
import "./Customers.css";

const initialCustomers = [
  {
    id: 1,
    name: "Arun Kumar",
    email: "arun@gmail.com",
    phone: "+91 9876543210",
    plan: "Premium",
    status: "Active",
    amount: 999,
    joined: "01 Oct 2026",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "+91 9876543211",
    plan: "Basic",
    status: "Active",
    amount: 499,
    joined: "05 Oct 2026",
  },
  {
    id: 3,
    name: "Rahul Das",
    email: "rahul@gmail.com",
    phone: "+91 9876543212",
    plan: "Standard",
    status: "Inactive",
    amount: 699,
    joined: "10 Oct 2026",
  },
  {
    id: 4,
    name: "Sneha R",
    email: "sneha@gmail.com",
    phone: "+91 9876543213",
    plan: "Premium",
    status: "Active",
    amount: 999,
    joined: "12 Oct 2026",
  },
  {
    id: 5,
    name: "Karthik S",
    email: "karthik@gmail.com",
    phone: "+91 9876543214",
    plan: "Basic",
    status: "Active",
    amount: 499,
    joined: "15 Oct 2026",
  },
  {
    id: 6,
    name: "Divya M",
    email: "divya@gmail.com",
    phone: "+91 9876543215",
    plan: "Standard",
    status: "Inactive",
    amount: 699,
    joined: "18 Oct 2026",
  },
];

function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    plan: "Basic",
    status: "Active",
    amount: "",
  };

  const [form, setForm] = useState(emptyForm);

  const activeCount = customers.filter(
    (c) => c.status === "Active"
  ).length;

  const inactiveCount = customers.filter(
    (c) => c.status === "Inactive"
  ).length;

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      `${customer.name} ${customer.email} ${customer.phone}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingCustomer(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setForm({ ...customer });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCustomer) {
      const updatedCustomer = {
        ...form,
        id: editingCustomer.id,
        amount: Number(form.amount),
      };

      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === editingCustomer.id
            ? updatedCustomer
            : customer
        )
      );

      if (selectedCustomer?.id === editingCustomer.id) {
        setSelectedCustomer(updatedCustomer);
      }
    } else {
      setCustomers((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          amount: Number(form.amount),
          joined: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        },
      ]);
    }

    setShowModal(false);
    setForm(emptyForm);
  };

  const deleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));

      if (selectedCustomer?.id === id) {
        setSelectedCustomer(null);
      }
    }
  };

  const exportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Plan",
      "Status",
      "Amount",
      "Joined",
    ];

    const rows = customers.map((c) => [
      c.name,
      c.email,
      c.phone,
      c.plan,
      c.status,
      c.amount,
      c.joined,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
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

  // Customer 360 degree profile
  if (selectedCustomer) {
    const customer = selectedCustomer;

    // DEMO DATA: Replace these entries with real backend payment records.
    const demoPayments = [
      {
        id: "BL-2026-003",
        date: "31 Oct 2026",
        amount: customer.amount,
        status: customer.status === "Active" ? "Paid" : "Pending",
      },
      {
        id: "BL-2026-002",
        date: "01 Oct 2026",
        amount: customer.amount,
        status: "Paid",
      },
      {
        id: "BL-2026-001",
        date: "01 Sep 2026",
        amount: customer.amount,
        status: "Paid",
      },
    ];

    const totalPaid = demoPayments
      .filter((payment) => payment.status === "Paid")
      .reduce((total, payment) => total + payment.amount, 0);

    const initials = customer.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

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
            <p>Complete customer information and subscription activity.</p>
          </div>

          <div className="customer-actions">
            <button
              className="customer-export"
              onClick={() => openEditModal(customer)}
            >
              <Pencil size={15} />
              Edit Customer
            </button>
          </div>
        </div>

        {/* Customer information */}
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
              {initials}
            </div>

            <div>
              <h2
                style={{
                  margin: "0 0 6px",
                  fontSize: "22px",
                  color: "var(--text-primary, #202437)",
                }}
              >
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

              <span
                className={`customer-status ${customer.status.toLowerCase()}`}
                style={{ marginTop: "10px", display: "inline-flex" }}
              >
                <span />
                {customer.status}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <div>
              <span style={profileLabelStyle}>Customer ID</span>
              <strong style={profileValueStyle}>BL-CUS-{customer.id}</strong>
            </div>

            <div>
              <span style={profileLabelStyle}>Joined Date</span>
              <strong style={profileValueStyle}>{customer.joined}</strong>
            </div>
          </div>
        </div>

        {/* Overview cards */}
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
            <strong style={{ fontSize: "19px", color: "var(--text-primary, #202437)" }}>
              {customer.plan}
            </strong>
          </div>

          <div style={profileCardStyle}>
            <Receipt size={20} color="#16a36a" />
            <span style={{ ...profileLabelStyle, marginTop: "13px" }}>
              Subscription Amount
            </span>
            <strong style={{ fontSize: "19px", color: "var(--text-primary, #202437)" }}>
              ₹{Number(customer.amount).toLocaleString("en-IN")}
            </strong>
          </div>

          <div style={profileCardStyle}>
            <CheckCircle2 size={20} color="#16a36a" />
            <span style={{ ...profileLabelStyle, marginTop: "13px" }}>
              Total Paid (Demo)
            </span>
            <strong style={{ fontSize: "19px", color: "var(--text-primary, #202437)" }}>
              ₹{totalPaid.toLocaleString("en-IN")}
            </strong>
          </div>

          <div style={profileCardStyle}>
            <CalendarDays size={20} color="#e69a35" />
            <span style={{ ...profileLabelStyle, marginTop: "13px" }}>
              Payment Records
            </span>
            <strong style={{ fontSize: "19px", color: "var(--text-primary, #202437)" }}>
              {demoPayments.length}
            </strong>
          </div>
        </div>

        {/* Personal and subscription details */}
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
              <strong style={profileValueStyle}>{customer.plan}</strong>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <span style={profileLabelStyle}>Subscription Amount</span>
              <strong style={profileValueStyle}>
                ₹{Number(customer.amount).toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span style={profileLabelStyle}>Subscription Status</span>
              <span
                className={`customer-status ${customer.status.toLowerCase()}`}
              >
                <span />
                {customer.status}
              </span>
            </div>
          </div>
        </div>

        {/* Payment history */}
        <div style={{ ...profileCardStyle, marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 5px", fontSize: "16px" }}>
                Payment History
              </h3>
              <p style={{ margin: 0, color: "#8991a5", fontSize: "13px" }}>
                Demo payment records for this customer.
              </p>
            </div>

            <Receipt size={20} color="#7773e8" />
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="customer-table">
              <thead>
                <tr>
                  <th>INVOICE ID</th>
                  <th>PAYMENT DATE</th>
                  <th>AMOUNT</th>
                  <th>PAYMENT STATUS</th>
                </tr>
              </thead>

              <tbody>
                {demoPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <strong>{payment.id}</strong>
                    </td>
                    <td>{payment.date}</td>
                    <td>
                      ₹{Number(payment.amount).toLocaleString("en-IN")}
                    </td>
                    <td>
                      <span
                        className={`customer-status ${
                          payment.status === "Paid" ? "active" : "inactive"
                        }`}
                      >
                        <span />
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity timeline */}
        <div style={profileCardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Activity size={20} color="#7773e8" />
            <h3 style={{ margin: 0, fontSize: "16px" }}>
              Customer Activity
            </h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "13px" }}>
              <CheckCircle2 size={19} color="#16a36a" />
              <div>
                <strong style={{ fontSize: "14px" }}>Customer account created</strong>
                <p style={{ color: "#8991a5", fontSize: "12px", margin: "5px 0 0" }}>
                  Joined BrightLoop on {customer.joined}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "13px" }}>
              <CreditCard size={19} color="#7773e8" />
              <div>
                <strong style={{ fontSize: "14px" }}>Subscription plan assigned</strong>
                <p style={{ color: "#8991a5", fontSize: "12px", margin: "5px 0 0" }}>
                  {customer.plan} plan · ₹{customer.amount}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "13px" }}>
              <Clock size={19} color="#e69a35" />
              <div>
                <strong style={{ fontSize: "14px" }}>Current account status</strong>
                <p style={{ color: "#8991a5", fontSize: "12px", margin: "5px 0 0" }}>
                  Customer is currently {customer.status.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit modal can also be opened from profile */}
        {showModal && renderCustomerModal()}

      </div>
    );
  }

  function renderCustomerModal() {
    return (
      <div
        className="customer-modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowModal(false);
          }
        }}
      >
        <div className="customer-modal">
          <div className="customer-modal-heading">
            <div>
              <div className="modal-icon">
                <UserPlus size={20} />
              </div>

              <h3>
                {editingCustomer ? "Edit Customer" : "Add New Customer"}
              </h3>

              <p>Enter customer information below.</p>
            </div>

            <button
              className="modal-close"
              type="button"
              onClick={() => setShowModal(false)}
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

            <div className="customer-form-row">
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
                Customer Status
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </label>
            </div>

            <label>
              Subscription Amount (₹) *
              <input
                type="number"
                min="0"
                placeholder="Enter amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
                required
              />
            </label>

            <div className="customer-modal-actions">
              <button
                type="button"
                className="modal-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button type="submit" className="customer-add">
                {editingCustomer ? "Save Changes" : "Add Customer"}
              </button>
            </div>
          </form>
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
          <strong>{activeCount}</strong>
        </div>

        <div className="customer-stat">
          <div className="customer-stat-icon orange-bg">
            <Users size={20} />
          </div>
          <span>Inactive Customers</span>
          <strong>{inactiveCount}</strong>
        </div>
      </div>

      <div className="customer-table-panel">
        <div className="customer-table-heading">
          <div>
            <h3>All Customers</h3>
            <p>View and manage your customer information.</p>
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
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

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
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-person">
                      <div className="customer-initials">
                        {customer.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
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
                          title="View customer profile"
                        >
                          {customer.name}
                        </button>
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="customer-phone">
                    {customer.phone}
                  </td>

                  <td>
                    <span className={`customer-plan ${customer.plan.toLowerCase()}`}>
                      {customer.plan}
                    </span>
                  </td>

                  <td>
                    <span className={`customer-status ${customer.status.toLowerCase()}`}>
                      <span />
                      {customer.status}
                    </span>
                  </td>

                  <td>
                    ₹{Number(customer.amount).toLocaleString("en-IN")}
                  </td>

                  <td className="customer-date">
                    {customer.joined}
                  </td>

                  <td>
                    <div className="customer-row-actions">
                      <button
                        title="View customer profile"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        title="Edit customer"
                        onClick={() => openEditModal(customer)}
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        className="delete-action"
                        title="Delete customer"
                        onClick={() => deleteCustomer(customer.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="7" className="customer-empty">
                    <Users size={28} />
                    <strong>No customers found</strong>
                    <span>Try another search or filter.</span>
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

export default Customers;
