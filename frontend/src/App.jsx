import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, CreditCard, Package,
  ChartNoAxesCombined, Settings, Search, Bell,
  Plus, Download, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, ChevronRight, Menu, X, Sparkles,
  UserRound, LogOut, IndianRupee, Activity,
  CalendarDays, Crown, Clock3, CheckCircle2,
  Pencil, Trash2, Filter, Check, Star,
  TrendingUp, TrendingDown, FileSpreadsheet
} from "lucide-react";

import Customers from "./Customers";
import BrightLoopAI from "./BrightLoopAI";
import "./App.css";
import Billing from "./Billing";

// NAVIGATION
const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Customers", icon: Users, count: "06" },
  { name: "Subscriptions", icon: CreditCard },
  { name: "Plans", icon: Package },
  { name: "Analytics", icon: ChartNoAxesCombined },
  { name: "BrightLoop AI", icon: Sparkles },
  { name: "Settings", icon: Settings },
];

// COMMON STYLES
const actionButton = {
  border: "1px solid #e8e8ee",
  background: "#fff",
  color: "#555",
  borderRadius: 8,
  padding: 8,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(15, 18, 35, 0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 16,
  zIndex: 1000,
  overflowY: "auto"
};

const modalBox = {
  background: "#fff",
  width: "100%",
  maxWidth: 520,
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
};

const labelStyle = {
  display: "grid",
  gap: 7,
  fontSize: 13,
  fontWeight: 600,
  color: "#454555"
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  border: "1px solid #e1e2e9",
  borderRadius: 8,
  fontSize: 14,
  outline: "none",
  background: "#fff"
};

// DASHBOARD TRANSACTIONS
const transactions = [
  { name: "Arun Kumar", email: "arun@gmail.com", initials: "AK", color: "lavender", plan: "Premium", status: "Paid", amount: "₹999", date: "31 Oct 2026" },
  { name: "Priya Sharma", email: "priya@gmail.com", initials: "PS", color: "peach", plan: "Basic", status: "Paid", amount: "₹499", date: "30 Oct 2026" },
  { name: "Rahul Das", email: "rahul@gmail.com", initials: "RD", color: "mint", plan: "Standard", status: "Pending", amount: "₹699", date: "29 Oct 2026" },
  { name: "Sneha R", email: "sneha@gmail.com", initials: "SR", color: "pink", plan: "Premium", status: "Paid", amount: "₹999", date: "28 Oct 2026" },
  { name: "Karthik S", email: "karthik@gmail.com", initials: "KS", color: "blue", plan: "Basic", status: "Failed", amount: "₹499", date: "27 Oct 2026" },
];

// DASHBOARD
function Dashboard() {
  const [period, setPeriod] = useState("Last 7 days");

  const stats = [
    { title: "Total Revenue", value: "₹48,250", change: "+12.8%", icon: IndianRupee, color: "purple", positive: true },
    { title: "Total Customers", value: "1,248", change: "+8.2%", icon: Users, color: "blue", positive: true },
    { title: "Active Subscriptions", value: "856", change: "+5.4%", icon: Activity, color: "green", positive: true },
    { title: "Monthly Revenue", value: "₹12,450", change: "-2.1%", icon: CalendarDays, color: "orange", positive: false },
  ];

  const chartData = [
    { day: "Mon", value: 48 },
    { day: "Tue", value: 68 },
    { day: "Wed", value: 55 },
    { day: "Thu", value: 82 },
    { day: "Fri", value: 62 },
    { day: "Sat", value: 92 },
    { day: "Sun", value: 74 },
  ];

  return (
    <>
      <section className="welcome-section">
        <div>
          <span className="welcome-tag"><Sparkles size={12} /> YOUR BUSINESS OVERVIEW</span>
          <h2>Welcome back, Mageshwaran!</h2>
          <p>Here's what's happening with your business today.</p>
        </div>
        <div className="welcome-actions">
          <button className="secondary-button" onClick={() => window.print()}>
            <Download size={15} /> Report
          </button>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-top">
                <div className={`stat-icon ${stat.color}`}><Icon size={19} /></div>
                <button className="card-more"><MoreHorizontal size={19} /></button>
              </div>
              <p className="stat-label">{stat.title}</p>
              <h3>{stat.value}</h3>
              <div className="stat-footer">
                <span className={`change ${stat.positive ? "positive" : "negative"}`}>
                  {stat.positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {stat.change}
                </span>
                <span>Compared to last month</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="analytics-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">PERFORMANCE</span>
              <h3>Revenue Overview</h3>
              <p>Track your business revenue over time.</p>
            </div>
            <select value={period} onChange={e => setPeriod(e.target.value)}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          <div className="revenue-summary">
            <h2>₹48,250</h2>
            <span className="change positive"><ArrowUpRight size={13} /> 12.8%</span>
            <span className="summary-caption">Revenue this period</span>
          </div>

          <div className="chart">
            <div className="chart-grid">
              <span>₹10k</span><span>₹7.5k</span><span>₹5k</span><span>₹2.5k</span><span>₹0</span>
            </div>
            <div className="chart-bars">
              {chartData.map((item, index) => (
                <div className="chart-column" key={item.day}>
                  <div
                    className={`chart-bar ${index === 5 ? "highlight" : ""}`}
                    style={{ height: `${item.value}%` }}
                  />
                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">SUBSCRIPTIONS</span>
              <h3>Plan Distribution</h3>
              <p>Customers by subscription plan.</p>
            </div>
            <button className="card-more"><MoreHorizontal size={19} /></button>
          </div>

          <div className="donut-wrap">
            <div className="donut-chart">
              <div className="donut-center">
                <strong>1,248</strong>
                <span>Customers</span>
              </div>
            </div>
          </div>

          <div className="plan-legend">
            <div><span className="legend-dot violet" /> Premium <strong>45%</strong></div>
            <div><span className="legend-dot blue" /> Standard <strong>35%</strong></div>
            <div><span className="legend-dot green" /> Basic <strong>20%</strong></div>
          </div>
        </div>
      </section>

      <section className="panel transactions-panel">
        <div className="panel-heading transaction-heading">
          <div>
            <span className="eyebrow">RECENT ACTIVITY</span>
            <h3>Recent Transactions</h3>
            <p>Latest payments from your customers.</p>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr><th>CUSTOMER</th><th>PLAN</th><th>STATUS</th><th>AMOUNT</th><th>DATE</th></tr>
            </thead>
            <tbody>
              {transactions.map(item => (
                <tr key={item.email}>
                  <td>
                    <div className="customer-cell">
                      <div className={`avatar customer-avatar ${item.color}`}>{item.initials}</div>
                      <div><strong>{item.name}</strong><span>{item.email}</span></div>
                    </div>
                  </td>
                  <td><span className={`plan-badge ${item.plan.toLowerCase()}`}>{item.plan}</span></td>
                  <td><span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span></td>
                  <td className="amount-cell">{item.amount}</td>
                  <td className="date-cell">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">Showing 5 recent transactions</div>
      </section>
    </>
  );
}

// SUBSCRIPTIONS PAGE
function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: "Arun Kumar", email: "arun@gmail.com", plan: "Premium", amount: 999, start: "2026-10-01", renewal: "2026-11-01", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@gmail.com", plan: "Basic", amount: 499, start: "2026-10-05", renewal: "2026-11-05", status: "Active" },
    { id: 3, name: "Rahul Das", email: "rahul@gmail.com", plan: "Standard", amount: 699, start: "2026-10-10", renewal: "2026-11-10", status: "Pending" },
    { id: 4, name: "Sneha R", email: "sneha@gmail.com", plan: "Premium", amount: 999, start: "2026-09-01", renewal: "2026-10-01", status: "Expired" },
  ]);

  const emptyForm = {
    name: "", email: "", plan: "Basic", amount: "499",
    start: "", renewal: "", status: "Active"
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const activeCount = subscriptions.filter(s => s.status === "Active").length;
  const pendingCount = subscriptions.filter(s => s.status === "Pending").length;
  const expiredCount = subscriptions.filter(s => s.status === "Expired").length;

  const filtered = subscriptions.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.plan.toLowerCase().includes(search.toLowerCase());

    return matchesSearch && (filter === "All" || s.status === filter);
  });

  function openAdd() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(s) {
    setForm({
      name: s.name, email: s.email, plan: s.plan,
      amount: String(s.amount), start: s.start,
      renewal: s.renewal, status: s.status
    });
    setEditingId(s.id);
    setModalOpen(true);
  }

  function saveSubscription(e) {
    e.preventDefault();

    const updated = {
      ...form,
      amount: Number(form.amount),
      id: editingId || Date.now()
    };

    if (editingId) {
      setSubscriptions(old => old.map(s => s.id === editingId ? updated : s));
    } else {
      setSubscriptions(old => [updated, ...old]);
    }

    setModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  function deleteSubscription(id) {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      setSubscriptions(old => old.filter(s => s.id !== id));
    }
  }

  const money = value => `₹${Number(value).toLocaleString("en-IN")}`;

  return (
    <div style={{ display: "grid", gap: 22 }}>
      <section className="welcome-section">
        <div>
          <span className="welcome-tag"><CreditCard size={13} /> SUBSCRIPTION MANAGEMENT</span>
          <h2>Subscriptions</h2>
          <p>Manage and monitor your customer subscriptions.</p>
        </div>
        <button className="primary-button" onClick={openAdd}>
          <Plus size={16} /> Add Subscription
        </button>
      </section>

      <section className="stats-grid">
        {[
          { title: "Total Subscriptions", value: subscriptions.length, icon: CreditCard, color: "purple" },
          { title: "Active", value: activeCount, icon: CheckCircle2, color: "green" },
          { title: "Pending", value: pendingCount, icon: Clock3, color: "orange" },
          { title: "Expired", value: expiredCount, icon: CalendarDays, color: "blue" }
        ].map(item => {
          const Icon = item.icon;
          return (
            <div className="stat-card" key={item.title}>
              <div className="stat-top"><div className={`stat-icon ${item.color}`}><Icon size={19} /></div></div>
              <p className="stat-label">{item.title}</p>
              <h3>{item.value}</h3>
            </div>
          );
        })}
      </section>

      <section className="panel" style={{ padding: 22 }}>
        <div className="panel-heading" style={{ marginBottom: 20 }}>
          <div><span className="eyebrow">CUSTOMER BILLING</span><h3>All Subscriptions</h3><p>View and manage every customer subscription.</p></div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div className="search-box" style={{ flex: "1 1 220px" }}>
            <Search size={16} />
            <input placeholder="Search customer or plan..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Filter size={16} />
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr><th>CUSTOMER</th><th>PLAN</th><th>AMOUNT</th><th>START DATE</th><th>RENEWAL DATE</th><th>STATUS</th><th>ACTIONS</th></tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="customer-cell">
                      <div className="avatar customer-avatar lavender">{s.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}</div>
                      <div><strong>{s.name}</strong><span>{s.email}</span></div>
                    </div>
                  </td>
                  <td><span className={`plan-badge ${s.plan.toLowerCase()}`}>{s.plan}</span></td>
                  <td className="amount-cell">{money(s.amount)}</td>
                  <td className="date-cell">{s.start}</td>
                  <td className="date-cell">{s.renewal}</td>
                  <td><span className={`status-badge ${s.status.toLowerCase()}`}>{s.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button title="Edit" onClick={() => openEdit(s)} style={actionButton}><Pencil size={15} /></button>
                      <button title="Delete" onClick={() => deleteSubscription(s.id)} style={actionButton}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p style={{ textAlign: "center", padding: 30, color: "#777" }}>No subscriptions found.</p>}
        </div>
        <div className="table-footer">Showing {filtered.length} of {subscriptions.length} subscriptions</div>
      </section>

      {modalOpen && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div><span className="eyebrow">SUBSCRIPTION DETAILS</span><h3>{editingId ? "Edit Subscription" : "Add Subscription"}</h3></div>
              <button onClick={() => setModalOpen(false)} style={actionButton}><X size={18} /></button>
            </div>

            <form onSubmit={saveSubscription} style={{ display: "grid", gap: 14 }}>
              <label style={labelStyle}>Customer Name
                <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </label>
              <label style={labelStyle}>Email Address
                <input style={inputStyle} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label style={labelStyle}>Plan
                  <select style={inputStyle} value={form.plan} onChange={e => {
                    const prices = { Basic: "499", Standard: "699", Premium: "999" };
                    setForm({ ...form, plan: e.target.value, amount: prices[e.target.value] });
                  }}>
                    <option>Basic</option><option>Standard</option><option>Premium</option>
                  </select>
                </label>
                <label style={labelStyle}>Amount (₹)
                  <input style={inputStyle} type="number" min="0" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
                </label>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label style={labelStyle}>Start Date
                  <input style={inputStyle} type="date" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} required />
                </label>
                <label style={labelStyle}>Renewal Date
                  <input style={inputStyle} type="date" value={form.renewal} onChange={e => setForm({ ...form, renewal: e.target.value })} required />
                </label>
              </div>

              <label style={labelStyle}>Status
                <select style={inputStyle} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option>Active</option><option>Pending</option><option>Expired</option>
                </select>
              </label>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="primary-button"><CheckCircle2 size={15} /> {editingId ? "Save Changes" : "Add Subscription"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// PLANS PAGE
function PlansPage() {
  const initialPlans = [
    {
      id: 1, name: "Basic", description: "Perfect for individuals getting started.",
      monthly: 499, yearly: 4999, status: "Active",
      features: ["Basic customer management", "Email support", "Monthly reports"]
    },
    {
      id: 2, name: "Standard", description: "For growing businesses that need more.",
      monthly: 699, yearly: 6999, status: "Active",
      features: ["Everything in Basic", "Advanced analytics", "Priority support", "Custom reports"]
    },
    {
      id: 3, name: "Premium", description: "Complete tools for established businesses.",
      monthly: 999, yearly: 9999, status: "Active",
      features: ["Everything in Standard", "Unlimited customers", "Dedicated support", "Advanced reports"]
    }
  ];

  const [plans, setPlans] = useState(initialPlans);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newFeature, setNewFeature] = useState("");

  const emptyForm = {
    name: "", description: "", monthly: "", yearly: "",
    status: "Active", features: []
  };

  const [form, setForm] = useState(emptyForm);

  const activeCount = plans.filter(p => p.status === "Active").length;
  const inactiveCount = plans.filter(p => p.status === "Inactive").length;

  const filteredPlans = plans.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    return matchesSearch && (filter === "All" || p.status === filter);
  });

  function openAdd() {
    setForm(emptyForm);
    setEditingId(null);
    setNewFeature("");
    setModalOpen(true);
  }

  function openEdit(plan) {
    setForm({
      name: plan.name,
      description: plan.description,
      monthly: String(plan.monthly),
      yearly: String(plan.yearly),
      status: plan.status,
      features: [...plan.features]
    });
    setEditingId(plan.id);
    setNewFeature("");
    setModalOpen(true);
  }

  function addFeature() {
    const feature = newFeature.trim();
    if (!feature) return;
    if (form.features.includes(feature)) {
      alert("This feature is already added.");
      return;
    }
    setForm(old => ({ ...old, features: [...old.features, feature] }));
    setNewFeature("");
  }

  function removeFeature(feature) {
    setForm(old => ({
      ...old,
      features: old.features.filter(item => item !== feature)
    }));
  }

  function savePlan(e) {
    e.preventDefault();

    const updated = {
      ...form,
      monthly: Number(form.monthly),
      yearly: Number(form.yearly),
      id: editingId || Date.now()
    };

    if (editingId) {
      setPlans(old => old.map(p => p.id === editingId ? updated : p));
    } else {
      setPlans(old => [updated, ...old]);
    }

    setModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  function deletePlan(id) {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(old => old.filter(p => p.id !== id));
    }
  }

  function toggleStatus(id) {
    setPlans(old => old.map(p =>
      p.id === id
        ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
        : p
    ));
  }

  const money = value => `₹${Number(value).toLocaleString("en-IN")}`;

  return (
    <div style={{ display: "grid", gap: 22 }}>
      <section className="welcome-section">
        <div>
          <span className="welcome-tag"><Package size={13} /> PLAN MANAGEMENT</span>
          <h2>Subscription Plans</h2>
          <p>Create, organize and manage your subscription pricing.</p>
        </div>
        <button className="primary-button" onClick={openAdd}>
          <Plus size={16} /> Create New Plan
        </button>
      </section>

      <section className="stats-grid">
        {[
          { title: "Total Plans", value: plans.length, icon: Package, color: "purple" },
          { title: "Active Plans", value: activeCount, icon: CheckCircle2, color: "green" },
          { title: "Inactive Plans", value: inactiveCount, icon: Clock3, color: "orange" }
        ].map(item => {
          const Icon = item.icon;
          return (
            <div className="stat-card" key={item.title}>
              <div className="stat-top">
                <div className={`stat-icon ${item.color}`}><Icon size={19} /></div>
              </div>
              <p className="stat-label">{item.title}</p>
              <h3>{item.value}</h3>
            </div>
          );
        })}
      </section>

      <section className="panel" style={{ padding: 22 }}>
        <div className="panel-heading" style={{ marginBottom: 20 }}>
          <div>
            <span className="eyebrow">PRICING MANAGEMENT</span>
            <h3>All Subscription Plans</h3>
            <p>Manage pricing, features and availability.</p>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
          <div className="search-box" style={{ flex: "1 1 220px" }}>
            <Search size={16} />
            <input
              placeholder="Search plans..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Filter size={16} />
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="All">All Plans</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 245px), 1fr))",
          gap: 18
        }}>
          {filteredPlans.map(plan => (
            <div key={plan.id} style={{
              border: "1px solid #e8e8ee",
              borderRadius: 14,
              padding: 20,
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: 15
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: "#f0edff", color: "#7455d9",
                  display: "grid", placeItems: "center"
                }}>
                  {plan.name === "Premium" ? <Crown size={21} /> : <Package size={21} />}
                </div>
                <span className={`status-badge ${plan.status.toLowerCase()}`}>
                  {plan.status}
                </span>
              </div>

              <div>
                <h3 style={{ margin: "0 0 7px", fontSize: 20 }}>{plan.name}</h3>
                <p style={{ color: "#777", fontSize: 13, margin: 0, minHeight: 38 }}>
                  {plan.description}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                <strong style={{ fontSize: 27, color: "#27243c" }}>{money(plan.monthly)}</strong>
                <span style={{ fontSize: 12, color: "#888" }}>/ month</span>
              </div>

              <div style={{ fontSize: 13, color: "#777" }}>
                Yearly: <strong style={{ color: "#333" }}>{money(plan.yearly)}</strong>
              </div>

              <div style={{ borderTop: "1px solid #eee", paddingTop: 14 }}>
                <strong style={{ fontSize: 13 }}>Plan features</strong>
                <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                  {plan.features.map((feature, index) => (
                    <div key={index} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#666" }}>
                      <Check size={15} color="#2caa75" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.features.length === 0 && (
                    <span style={{ fontSize: 13, color: "#999" }}>No features added.</span>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 8 }}>
                <button
                  className="secondary-button"
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => openEdit(plan)}
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  style={actionButton}
                  title={plan.status === "Active" ? "Deactivate plan" : "Activate plan"}
                  onClick={() => toggleStatus(plan.id)}
                >
                  {plan.status === "Active" ? <X size={15} /> : <Check size={15} />}
                </button>
                <button
                  style={actionButton}
                  title="Delete plan"
                  onClick={() => deletePlan(plan.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <p style={{ textAlign: "center", padding: 30, color: "#777" }}>
            No plans found.
          </p>
        )}

        <div className="table-footer">
          Showing {filteredPlans.length} of {plans.length} plans
        </div>
      </section>

      {modalOpen && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <span className="eyebrow">PLAN CONFIGURATION</span>
                <h3 style={{ margin: "6px 0" }}>{editingId ? "Edit Plan" : "Create New Plan"}</h3>
              </div>
              <button onClick={() => setModalOpen(false)} style={actionButton}><X size={18} /></button>
            </div>

            <form onSubmit={savePlan} style={{ display: "grid", gap: 14 }}>
              <label style={labelStyle}>Plan Name
                <input
                  style={inputStyle}
                  placeholder="Example: Enterprise"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>

              <label style={labelStyle}>Description
                <textarea
                  style={{ ...inputStyle, minHeight: 75, resize: "vertical" }}
                  placeholder="Describe what this plan offers..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  required
                />
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label style={labelStyle}>Monthly Price (₹)
                  <input
                    style={inputStyle}
                    type="number"
                    min="0"
                    value={form.monthly}
                    onChange={e => setForm({ ...form, monthly: e.target.value })}
                    required
                  />
                </label>

                <label style={labelStyle}>Yearly Price (₹)
                  <input
                    style={inputStyle}
                    type="number"
                    min="0"
                    value={form.yearly}
                    onChange={e => setForm({ ...form, yearly: e.target.value })}
                    required
                  />
                </label>
              </div>

              <label style={labelStyle}>Status
                <select
                  style={inputStyle}
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </label>

              <div style={labelStyle}>
                Plan Features
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    style={inputStyle}
                    placeholder="Enter a feature"
                    value={newFeature}
                    onChange={e => setNewFeature(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <button type="button" className="primary-button" onClick={addFeature}>
                    <Plus size={16} /> Add
                  </button>
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  {form.features.map((feature, index) => (
                    <div key={index} style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "9px 11px",
                      border: "1px solid #eee",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 400
                    }}>
                      <span><Check size={14} color="#2caa75" /> {feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        style={actionButton}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
                <button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  <CheckCircle2 size={15} /> {editingId ? "Save Changes" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ANALYTICS PAGE
function AnalyticsPage() {
  const [period, setPeriod] = useState("Last 30 days");

  const reports = {
    "Last 7 days": {
      revenue: "₹12,450",
      growth: "+8.5%",
      customers: "86",
      subscriptions: "42",
      data: [
        { label: "Mon", revenue: 35, customers: 30 },
        { label: "Tue", revenue: 55, customers: 45 },
        { label: "Wed", revenue: 45, customers: 40 },
        { label: "Thu", revenue: 70, customers: 55 },
        { label: "Fri", revenue: 60, customers: 50 },
        { label: "Sat", revenue: 90, customers: 75 },
        { label: "Sun", revenue: 75, customers: 65 }
      ]
    },
    "Last 30 days": {
      revenue: "₹48,250",
      growth: "+12.8%",
      customers: "248",
      subscriptions: "156",
      data: [
        { label: "Week 1", revenue: 45, customers: 35 },
        { label: "Week 2", revenue: 65, customers: 55 },
        { label: "Week 3", revenue: 55, customers: 45 },
        { label: "Week 4", revenue: 90, customers: 75 }
      ]
    },
    "Last 90 days": {
      revenue: "₹1,42,800",
      growth: "+18.6%",
      customers: "648",
      subscriptions: "425",
      data: [
        { label: "Aug", revenue: 50, customers: 40 },
        { label: "Sep", revenue: 70, customers: 60 },
        { label: "Oct", revenue: 95, customers: 85 }
      ]
    }
  };

  const current = reports[period];

  const planData = [
    { name: "Premium", count: 562, percentage: 45, color: "#8064e8" },
    { name: "Standard", count: 437, percentage: 35, color: "#4295e8" },
    { name: "Basic", count: 249, percentage: 20, color: "#35b88a" }
  ];

  const subscriptionData = [
    { name: "Active", count: 856, percentage: 69, color: "#25ad7b" },
    { name: "Pending", count: 248, percentage: 20, color: "#e9a23b" },
    { name: "Expired", count: 144, percentage: 11, color: "#e46c76" }
  ];

  function downloadReport() {
    const csvRows = [
      ["BrightLoop Business Analytics Report"],
      ["Report Period", period],
      ["Revenue", current.revenue],
      ["Revenue Growth", current.growth],
      ["New Customers", current.customers],
      ["New Subscriptions", current.subscriptions],
      [],
      ["Plan", "Customers", "Percentage"],
      ...planData.map(p => [p.name, p.count, `${p.percentage}%`]),
      [],
      ["Subscription Status", "Count", "Percentage"],
      ...subscriptionData.map(s => [s.name, s.count, `${s.percentage}%`])
    ];

    const csvContent = csvRows
      .map(row => row.map(value => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "BrightLoop_Analytics_Report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const analyticsCard = {
    background: "#fff",
    border: "1px solid #ececf2",
    borderRadius: 14,
    padding: 20,
    minWidth: 0
  };

  return (
    <div style={{ display: "grid", gap: 22 }}>
      <section className="welcome-section">
        <div>
          <span className="welcome-tag">
            <ChartNoAxesCombined size={13} /> BUSINESS INTELLIGENCE
          </span>
          <h2>Analytics & Reports</h2>
          <p>Explore your business performance and reports.</p>
        </div>

        <button className="primary-button" onClick={downloadReport}>
          <Download size={16} /> Download Report
        </button>
      </section>

      <section style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 17 }}>Business Performance</h3>
          <p style={{ margin: "5px 0 0", color: "#888", fontSize: 13 }}>
            Your business statistics at a glance.
          </p>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          background: "#fff",
          border: "1px solid #e8e8ee",
          borderRadius: 9,
          padding: "5px 10px"
        }}>
          <CalendarDays size={16} color="#777" />
          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              padding: 7,
              background: "transparent",
              color: "#444",
              fontSize: 13,
              cursor: "pointer"
            }}
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </section>

      <section className="stats-grid">
        {[
          { title: "Total Revenue", value: current.revenue, change: current.growth, icon: IndianRupee, color: "purple" },
          { title: "Total Customers", value: "1,248", change: "+8.2%", icon: Users, color: "blue" },
          { title: "New Customers", value: current.customers, change: "+10.4%", icon: UserRound, color: "green" },
          { title: "Subscriptions", value: "856", change: "+5.4%", icon: CreditCard, color: "orange" }
        ].map(item => {
          const Icon = item.icon;

          return (
            <div className="stat-card" key={item.title}>
              <div className="stat-top">
                <div className={`stat-icon ${item.color}`}>
                  <Icon size={19} />
                </div>
                <span className="change positive">
                  <ArrowUpRight size={13} />
                  {item.change}
                </span>
              </div>
              <p className="stat-label">{item.title}</p>
              <h3>{item.value}</h3>
              <div className="stat-footer">
                <span>Compared to previous period</span>
              </div>
            </div>
          );
        })}
      </section>

      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
        gap: 20
      }}>
        <div className="panel" style={{ padding: 22 }}>
          <div className="panel-heading">
            <div>
              <span className="eyebrow">REVENUE ANALYSIS</span>
              <h3>Revenue Trend</h3>
              <p>Revenue performance for {period.toLowerCase()}.</p>
            </div>
            <div className="stat-icon purple"><TrendingUp size={19} /></div>
          </div>

          <div style={{ margin: "24px 0 10px" }}>
            <h2 style={{ fontSize: 29, margin: 0, color: "#28243d" }}>{current.revenue}</h2>
            <span className="change positive"><ArrowUpRight size={14} /> {current.growth} growth</span>
          </div>

          <div style={{
            height: 220, display: "flex", alignItems: "flex-end", gap: 12,
            padding: "15px 5px 0", borderBottom: "1px solid #eee",
            backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 43px, #f0f0f5 44px)"
          }}>
            {current.data.map((item, index) => (
              <div key={item.label} style={{
                flex: 1, height: "100%", display: "flex",
                flexDirection: "column", justifyContent: "flex-end",
                alignItems: "center", gap: 8
              }}>
                <div
                  title={`${item.label}: ${item.revenue}%`}
                  style={{
                    width: "65%", maxWidth: 48, height: `${item.revenue}%`,
                    minHeight: 8, borderRadius: "7px 7px 0 0",
                    background: index === current.data.length - 1 ? "#7656df" : "#b9a9f5",
                    transition: "height .3s ease"
                  }}
                />
                <span style={{ fontSize: 11, color: "#888", whiteSpace: "nowrap", paddingBottom: 8 }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 7, alignItems: "center", marginTop: 16, fontSize: 12, color: "#888" }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: "#7656df" }} />
            Revenue performance
          </div>
        </div>

        <div className="panel" style={{ padding: 22 }}>
          <div className="panel-heading">
            <div>
              <span className="eyebrow">CUSTOMER ANALYSIS</span>
              <h3>Customer Growth</h3>
              <p>New customer registrations over time.</p>
            </div>
            <div className="stat-icon blue"><Users size={19} /></div>
          </div>

          <div style={{ margin: "24px 0 10px" }}>
            <h2 style={{ fontSize: 29, margin: 0, color: "#28243d" }}>{current.customers}</h2>
            <span className="change positive"><ArrowUpRight size={14} /> New customers</span>
          </div>

          <div style={{
            height: 220, display: "flex", alignItems: "flex-end", gap: 12,
            padding: "15px 5px 0", borderBottom: "1px solid #eee",
            backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 43px, #f0f0f5 44px)"
          }}>
            {current.data.map((item, index) => (
              <div key={item.label} style={{
                flex: 1, height: "100%", display: "flex",
                flexDirection: "column", justifyContent: "flex-end",
                alignItems: "center", gap: 8
              }}>
                <div
                  title={`${item.label}: ${item.customers}%`}
                  style={{
                    width: "65%", maxWidth: 48, height: `${item.customers}%`,
                    minHeight: 8, borderRadius: "7px 7px 0 0",
                    background: index === current.data.length - 1 ? "#3996e8" : "#a9d1f6",
                    transition: "height .3s ease"
                  }}
                />
                <span style={{ fontSize: 11, color: "#888", whiteSpace: "nowrap", paddingBottom: 8 }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 7, alignItems: "center", marginTop: 16, fontSize: 12, color: "#888" }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: "#3996e8" }} />
            Customer growth
          </div>
        </div>
      </section>

      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
        gap: 20
      }}>
        <div className="panel" style={{ padding: 22 }}>
          <div className="panel-heading">
            <div>
              <span className="eyebrow">POPULARITY</span>
              <h3>Popular Plans</h3>
              <p>Customer distribution by plan.</p>
            </div>
            <Star size={19} color="#e6a23c" />
          </div>

          <div style={{ display: "grid", gap: 22, marginTop: 26 }}>
            {planData.map(plan => (
              <div key={plan.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: plan.color }} />
                    <strong style={{ fontSize: 13 }}>{plan.name}</strong>
                  </div>
                  <span style={{ fontSize: 13, color: "#777" }}>
                    {plan.count.toLocaleString("en-IN")} customers
                  </span>
                </div>

                <div style={{ height: 9, background: "#f0f0f4", borderRadius: 20, overflow: "hidden" }}>
                  <div style={{ width: `${plan.percentage}%`, height: "100%", background: plan.color, borderRadius: 20 }} />
                </div>

                <p style={{ fontSize: 11, color: "#999", textAlign: "right", margin: "5px 0 0" }}>
                  {plan.percentage}% of customers
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel" style={{ padding: 22 }}>
          <div className="panel-heading">
            <div>
              <span className="eyebrow">SUBSCRIPTION HEALTH</span>
              <h3>Subscription Status</h3>
              <p>Overview of your subscription activity.</p>
            </div>
            <Activity size={19} color="#7656df" />
          </div>

          <div style={{ display: "grid", gap: 23, marginTop: 26 }}>
            {subscriptionData.map(item => (
              <div key={item.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.color }} />
                    <strong style={{ fontSize: 13 }}>{item.name}</strong>
                  </div>
                  <strong style={{ fontSize: 13 }}>{item.count.toLocaleString("en-IN")}</strong>
                </div>

                <div style={{ height: 9, background: "#f0f0f4", borderRadius: 20, overflow: "hidden" }}>
                  <div style={{ width: `${item.percentage}%`, height: "100%", background: item.color, borderRadius: 20 }} />
                </div>

                <p style={{ fontSize: 11, color: "#999", textAlign: "right", margin: "5px 0 0" }}>
                  {item.percentage}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel" style={{ padding: 22 }}>
        <div className="panel-heading">
          <div>
            <span className="eyebrow">BUSINESS INSIGHTS</span>
            <h3>Performance Summary</h3>
            <p>Important highlights from your business data.</p>
          </div>
          <Sparkles size={20} color="#7656df" />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
          gap: 14,
          marginTop: 20
        }}>
          <div style={analyticsCard}>
            <div className="stat-icon green"><TrendingUp size={19} /></div>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 7 }}>Revenue Growth</p>
            <h3 style={{ margin: 0, fontSize: 22 }}>{current.growth}</h3>
            <span style={{ fontSize: 11, color: "#25ad7b" }}>Positive growth</span>
          </div>

          <div style={analyticsCard}>
            <div className="stat-icon blue"><Users size={19} /></div>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 7 }}>Total Customers</p>
            <h3 style={{ margin: 0, fontSize: 22 }}>1,248</h3>
            <span style={{ fontSize: 11, color: "#888" }}>Registered customers</span>
          </div>

          <div style={analyticsCard}>
            <div className="stat-icon purple"><Crown size={19} /></div>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 7 }}>Top Plan</p>
            <h3 style={{ margin: 0, fontSize: 22 }}>Premium</h3>
            <span style={{ fontSize: 11, color: "#888" }}>45% of customers</span>
          </div>

          <div style={analyticsCard}>
            <div className="stat-icon orange"><CreditCard size={19} /></div>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 7 }}>Active Subscriptions</p>
            <h3 style={{ margin: 0, fontSize: 22 }}>856</h3>
            <span style={{ fontSize: 11, color: "#888" }}>Currently active</span>
          </div>
        </div>
      </section>

      <section style={{
        background: "linear-gradient(120deg, #f3efff, #f4f8ff)",
        border: "1px solid #e9e3ff",
        borderRadius: 14,
        padding: 22,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 15
      }}>
        <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
          <div style={{
            width: 45, height: 45, borderRadius: 12, background: "#fff",
            display: "grid", placeItems: "center", color: "#7656df"
          }}>
            <FileSpreadsheet size={22} />
          </div>
          <div>
            <h3 style={{ margin: "0 0 5px", fontSize: 16 }}>Export Business Report</h3>
            <p style={{ margin: 0, color: "#777", fontSize: 12 }}>
              Download your analytics summary as a CSV file.
            </p>
          </div>
        </div>

        <button className="primary-button" onClick={downloadReport}>
          <Download size={15} /> Export CSV
        </button>
      </section>

      <p style={{ color: "#999", fontSize: 11, textAlign: "center" }}>
        Note: Analytics currently displays sample dashboard data. Connect your backend to display live business figures.
      </p>
    </div>
  );
}

// SETTINGS PAGE
function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Mageshwaran",
    email: "mageshwaran@gmail.com",
    phone: "",
    business: "BrightLoop",
    category: "Technology",
    address: ""
  });

  const [preferences, setPreferences] = useState({
    currency: "INR (₹)",
    language: "English",
    timezone: "Asia/Kolkata"
  });

  const [notifications, setNotifications] = useState({
    email: true,
    payments: true,
    renewals: true,
    updates: false
  });

  const [saved, setSaved] = useState(false);

  function updateProfile(e) {
    const { name, value } = e.target;
    setProfile(old => ({ ...old, [name]: value }));
    setSaved(false);
  }

  function updatePreference(e) {
    const { name, value } = e.target;
    setPreferences(old => ({ ...old, [name]: value }));
    setSaved(false);
  }

  function toggleNotification(key) {
    setNotifications(old => ({ ...old, [key]: !old[key] }));
    setSaved(false);
  }

  function saveSettings(e) {
    e.preventDefault();
    setSaved(true);
  }

  const settingCard = {
    background: "#fff",
    border: "1px solid #ececf2",
    borderRadius: 14,
    padding: 22,
    display: "grid",
    gap: 18
  };

  const sectionHeading = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    paddingBottom: 15,
    borderBottom: "1px solid #eee"
  };

  const iconBox = {
    width: 40,
    height: 40,
    borderRadius: 11,
    background: "#f0edff",
    color: "#7656df",
    display: "grid",
    placeItems: "center",
    flexShrink: 0
  };

  return (
    <div style={{ display: "grid", gap: 22 }}>

      {/* HEADER */}
      <section className="welcome-section">
        <div>
          <span className="welcome-tag">
            <Settings size={13} /> ACCOUNT CONFIGURATION
          </span>
          <h2>Settings</h2>
          <p>Manage your profile, business details and preferences.</p>
        </div>
      </section>

      <form onSubmit={saveSettings} style={{ display: "grid", gap: 20 }}>

        {/* PROFILE SETTINGS */}
        <section style={settingCard}>
          <div style={sectionHeading}>
            <div style={iconBox}><UserRound size={20} /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>Profile Settings</h3>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888" }}>
                Update your personal account information.
              </p>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
            gap: 16
          }}>
            <label style={labelStyle}>
              Full Name
              <input
                style={inputStyle}
                name="name"
                value={profile.name}
                onChange={updateProfile}
                placeholder="Enter your name"
                required
              />
            </label>

            <label style={labelStyle}>
              Email Address
              <input
                style={inputStyle}
                type="email"
                name="email"
                value={profile.email}
                onChange={updateProfile}
                placeholder="Enter your email"
                required
              />
            </label>

            <label style={labelStyle}>
              Phone Number
              <input
                style={inputStyle}
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={updateProfile}
                placeholder="Enter phone number"
              />
            </label>
          </div>
        </section>

        {/* BUSINESS INFORMATION */}
        <section style={settingCard}>
          <div style={sectionHeading}>
            <div style={iconBox}><Package size={20} /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>Business Information</h3>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888" }}>
                Configure your business details.
              </p>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
            gap: 16
          }}>
            <label style={labelStyle}>
              Business Name
              <input
                style={inputStyle}
                name="business"
                value={profile.business}
                onChange={updateProfile}
                placeholder="Enter business name"
                required
              />
            </label>

            <label style={labelStyle}>
              Business Category
              <select
                style={inputStyle}
                name="category"
                value={profile.category}
                onChange={updateProfile}
              >
                <option>Technology</option>
                <option>Retail</option>
                <option>Education</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Other</option>
              </select>
            </label>

            <label style={{ ...labelStyle, gridColumn: "1 / -1" }}>
              Business Address
              <textarea
                style={{ ...inputStyle, minHeight: 75, resize: "vertical" }}
                name="address"
                value={profile.address}
                onChange={updateProfile}
                placeholder="Enter your business address"
              />
            </label>
          </div>
        </section>

        {/* PREFERENCES */}
        <section style={settingCard}>
          <div style={sectionHeading}>
            <div style={iconBox}><CalendarDays size={20} /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>Account Preferences</h3>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888" }}>
                Choose your preferred display settings.
              </p>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            gap: 16
          }}>
            <label style={labelStyle}>
              Currency
              <select
                style={inputStyle}
                name="currency"
                value={preferences.currency}
                onChange={updatePreference}
              >
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </label>

            <label style={labelStyle}>
              Language
              <select
                style={inputStyle}
                name="language"
                value={preferences.language}
                onChange={updatePreference}
              >
                <option>English</option>
                <option>Tamil</option>
                <option>Hindi</option>
              </select>
            </label>

            <label style={labelStyle}>
              Time Zone
              <select
                style={inputStyle}
                name="timezone"
                value={preferences.timezone}
                onChange={updatePreference}
              >
                <option value="Asia/Kolkata">India Standard Time</option>
                <option value="UTC">UTC</option>
                <option value="Europe/London">London</option>
                <option value="America/New_York">New York</option>
              </select>
            </label>
          </div>
        </section>

        {/* NOTIFICATION SETTINGS */}
        <section style={settingCard}>
          <div style={sectionHeading}>
            <div style={iconBox}><Bell size={20} /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>Notification Settings</h3>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888" }}>
                Choose which notifications you want to receive.
              </p>
            </div>
          </div>

          {[
            {
              key: "email",
              title: "Email Notifications",
              description: "Receive important account notifications."
            },
            {
              key: "payments",
              title: "Payment Notifications",
              description: "Get notified when payments are received or fail."
            },
            {
              key: "renewals",
              title: "Subscription Renewals",
              description: "Receive reminders about upcoming renewals."
            },
            {
              key: "updates",
              title: "Product Updates",
              description: "Get updates about new BrightLoop features."
            }
          ].map(item => (
            <div
              key={item.key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 15,
                padding: "12px 0",
                borderBottom: "1px solid #f1f1f4"
              }}
            >
              <div>
                <strong style={{ display: "block", fontSize: 13, color: "#333" }}>
                  {item.title}
                </strong>
                <span style={{ fontSize: 12, color: "#888" }}>
                  {item.description}
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggleNotification(item.key)}
                aria-label={`Toggle ${item.title}`}
                style={{
                  width: 46,
                  height: 25,
                  borderRadius: 20,
                  border: "none",
                  padding: 3,
                  cursor: "pointer",
                  background: notifications[item.key] ? "#7656df" : "#d5d5dc",
                  display: "flex",
                  justifyContent: notifications[item.key] ? "flex-end" : "flex-start",
                  alignItems: "center",
                  flexShrink: 0
                }}
              >
                <span style={{
                  width: 19,
                  height: 19,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,.2)"
                }} />
              </button>
            </div>
          ))}
        </section>

        {/* SAVE SETTINGS */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12
        }}>
          <div style={{ fontSize: 12, color: saved ? "#269b6b" : "#888" }}>
            {saved && (
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CheckCircle2 size={15} />
                Settings saved in this session.
              </span>
            )}
          </div>

          <button type="submit" className="primary-button">
            <CheckCircle2 size={16} /> Save Changes
          </button>
        </div>
      </form>

      {/* SECURITY SECTION */}
      <section style={settingCard}>
        <div style={sectionHeading}>
          <div style={iconBox}><Settings size={20} /></div>
          <div>
            <h3 style={{ margin: 0, fontSize: 16 }}>Security</h3>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888" }}>
              Account security information.
            </p>
          </div>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap"
        }}>
          <div>
            <strong style={{ fontSize: 13 }}>Password Protection</strong>
            <p style={{ fontSize: 12, color: "#888", margin: "5px 0 0" }}>
              Keep your account secure with a strong password.
            </p>
          </div>

          <span className="status-badge active">
            <CheckCircle2 size={12} /> Protected
          </span>
        </div>

        <p style={{
          margin: 0,
          padding: 13,
          borderRadius: 9,
          background: "#f7f6ff",
          color: "#777",
          fontSize: 12,
          lineHeight: 1.6
        }}>
          Password updates and permanent account changes will be available
          after connecting the backend authentication system.
        </p>
      </section>

      <p style={{ textAlign: "center", color: "#999", fontSize: 11 }}>
        BrightLoop Settings · Changes are currently stored only in the page session.
      </p>
    </div>
  );
}

// MAIN APP
function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Activity size={23} /></div>
          <div><h1>BrightLoop</h1><span>BUSINESS MANAGEMENT</span></div>
          <button className="mobile-close" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>

        <p className="nav-label">MAIN MENU</p>

        <nav className="sidebar-nav">
          {navigation.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`nav-item ${activePage === item.name ? "active" : ""}`}
                onClick={() => {
                  setActivePage(item.name);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={18} />
                {item.name}
                {item.count && <span className="nav-count">{item.count}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-upgrade">
            <div className="upgrade-icon"><Crown size={21} /></div>
            <h4>Upgrade your plan</h4>
            <p>Unlock more features and grow your business faster.</p>
            <button onClick={() => setActivePage("Plans")}>
              Explore plans <ChevronRight size={14} />
            </button>
          </div>

          <div className="profile">
            <div className="avatar">MK</div>
            <div className="profile-info"><strong>Mageshwaran</strong><span>Administrator</span></div>
            <button className="card-more" title="Profile"><LogOut size={17} /></button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu" onClick={() => setSidebarOpen(true)}><Menu size={21} /></button>
            <div className="breadcrumb">Pages <span>/</span> <strong>{activePage}</strong></div>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <Search size={16} />
              <input type="text" placeholder="Search anything..." />
              <kbd>⌘ K</kbd>
            </div>

            <div className="notification-wrap">
              <button className="icon-button" onClick={() => setNotificationsOpen(!notificationsOpen)}>
                <Bell size={17} /><span className="notification-dot" />
              </button>

              {notificationsOpen && (
                <div className="notification-popover">
                  <strong>Notifications</strong>
                  <p><CheckCircle2 size={15} /> Your dashboard is ready.</p>
                  <p><Clock3 size={15} /> Check your latest transactions.</p>
                </div>
              )}
            </div>

            <div className="top-profile">
              <div className="avatar">MK</div>
              <div className="top-profile-name"><strong>Mageshwaran</strong><span>Admin</span></div>
              <UserRound size={16} />
            </div>
          </div>
        </header>

        <div className="page-content">
  {activePage === "Dashboard" && <Dashboard />}
  {activePage === "Customers" && <Customers />}
  {activePage === "Subscriptions" && <SubscriptionsPage />}
  {activePage === "Plans" && <PlansPage />}
  {activePage === "Analytics" && <AnalyticsPage />}
  {activePage === "BrightLoop AI" && <BrightLoopAI />}
  {activePage === "Settings" && <SettingsPage />}

  <footer className="footer">
    <span>© 2026 BrightLoop. All rights reserved.</span>
    <span>Made with <span className="footer-heart">♥</span> for your business</span>
  </footer>
</div>
      </main>
    </div>
  );
}

export default App;