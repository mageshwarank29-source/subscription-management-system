import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Bot,
  Send,
  UserRound,
  Plus,
  MessageSquare,
  TrendingUp,
  Users,
  CreditCard,
  CalendarDays,
  Trash2,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import "./BrightLoopAI.css";

const suggestions = [
  {
    icon: TrendingUp,
    title: "Revenue insights",
    prompt: "Give me insights about monthly revenue.",
  },
  {
    icon: Users,
    title: "Customer analysis",
    prompt: "How can I analyze my customers?",
  },
  {
    icon: CreditCard,
    title: "Payment insights",
    prompt: "How can I track pending payments?",
  },
  {
    icon: CalendarDays,
    title: "Renewal reminders",
    prompt: "How can I manage upcoming renewals?",
  },
];

function getDemoReply(question) {
  const q = question.toLowerCase();

  if (q.includes("revenue") || q.includes("sales")) {
    return "Revenue Insights\n\nTo understand your business revenue, review these metrics:\n\n1. Monthly recurring revenue (MRR)\n2. Revenue from new subscriptions\n3. Revenue from renewals\n4. Cancelled subscription revenue\n\nOnce BrightLoop AI is connected to your backend, I can analyze your actual revenue figures.";
  }

  if (q.includes("customer")) {
    return "Customer Analysis\n\nYou can understand your customers by tracking:\n\n1. Total active customers\n2. New customers this month\n3. Customer retention\n4. Most popular subscription plans\n5. Customer activity history\n\nActual customer insights will be available after connecting your customer API.";
  }

  if (q.includes("payment")) {
    return "Payment Insights\n\nUseful payment metrics include:\n\n1. Successful payments\n2. Pending payments\n3. Failed transactions\n4. Monthly payment totals\n5. Payment history by customer\n\nYour backend payment data can be connected to generate real reports.";
  }

  if (
    q.includes("renewal") ||
    q.includes("expire") ||
    q.includes("expiry")
  ) {
    return "Subscription Renewal Insights\n\nFor better renewal management:\n\n1. Track upcoming expiry dates.\n2. Identify subscriptions expiring within 7 days.\n3. Send renewal reminders.\n4. Monitor renewed and cancelled subscriptions.\n\nReal renewal predictions require your subscription data.";
  }

  return "Thanks for your question!\n\nI'm currently running in frontend demo mode. I can demonstrate the BrightLoop AI chat interface, but I don't have access to your actual business data yet.\n\nAfter connecting an AI service through Dharshan's backend, I'll be able to provide intelligent answers based on your real customers, payments and subscriptions.";
}

export default function BrightLoopAI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I'm BrightLoop AI. ✨\n\nI can help you explore subscription management, customer insights, payments and business performance.\n\nWhat would you like to know?",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = (text = question) => {
    const message = text.trim();

    if (!message || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text: message },
    ]);

    setQuestion("");
    setLoading(true);

    // Frontend demo response.
    // Replace this with your real AI backend API later.
    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: getDemoReply(message),
        },
      ]);

      setLoading(false);
    }, 700);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "New conversation started! How can I help you today?",
      },
    ]);
  };

  return (
    <div className="bright-ai-page">
      <div className="bright-ai-heading">
        <div>
          <div className="bright-ai-label">
            <Sparkles size={15} />
            AI BUSINESS ASSISTANT
          </div>

          <h1>BrightLoop AI</h1>

          <p>
            Your intelligent assistant for smarter subscription management.
          </p>
        </div>

        <div className="bright-ai-status">
          <span className="bright-ai-status-dot"></span>
          Demo Mode
        </div>
      </div>

      <div className="bright-ai-layout">
        <aside className="bright-ai-sidebar">
          <button
            className="bright-ai-new-chat"
            onClick={clearChat}
          >
            <Plus size={18} />
            New conversation
          </button>

          <div className="bright-ai-side-title">
            EXPLORE
          </div>

          {suggestions.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                className="bright-ai-suggestion"
                key={index}
                onClick={() => sendMessage(item.prompt)}
              >
                <Icon size={18} />
                <span>{item.title}</span>
                <ArrowUpRight size={14} />
              </button>
            );
          })}

          <div className="bright-ai-info">
            <Zap size={18} />
            <strong>BrightLoop AI</strong>
            <p>
              Get useful business insights from your subscription data.
            </p>
          </div>
        </aside>

        <main className="bright-ai-chat">
          <div className="bright-ai-chat-header">
            <div className="bright-ai-chat-title">
              <div className="bright-ai-bot-icon">
                <Bot size={21} />
              </div>

              <div>
                <strong>AI Assistant</strong>
                <span>Here to help with your business</span>
              </div>
            </div>

            <button
              className="bright-ai-clear"
              onClick={clearChat}
              title="Clear conversation"
            >
              <Trash2 size={17} />
              Clear
            </button>
          </div>

          <div className="bright-ai-messages">
            {messages.map((message, index) => (
              <div
                className={`bright-ai-message ${
                  message.role === "user"
                    ? "bright-ai-user"
                    : "bright-ai-assistant"
                }`}
                key={index}
              >
                <div className="bright-ai-avatar">
                  {message.role === "user" ? (
                    <UserRound size={18} />
                  ) : (
                    <Sparkles size={18} />
                  )}
                </div>

                <div className="bright-ai-message-content">
                  <strong>
                    {message.role === "user"
                      ? "You"
                      : "BrightLoop AI"}
                  </strong>

                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="bright-ai-message bright-ai-assistant">
                <div className="bright-ai-avatar">
                  <Sparkles size={18} />
                </div>

                <div className="bright-ai-message-content">
                  <strong>BrightLoop AI</strong>
                  <p className="bright-ai-typing">
                    Thinking...
                  </p>
                </div>
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          <div className="bright-ai-input-area">
            <div className="bright-ai-input-box">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask BrightLoop AI anything..."
                rows={2}
              />

              <button
                onClick={() => sendMessage()}
                disabled={!question.trim() || loading}
                title="Send message"
              >
                <Send size={19} />
              </button>
            </div>

            <p className="bright-ai-disclaimer">
              <MessageSquare size={12} />
              Frontend demo responses · Connect an AI API for real answers
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}