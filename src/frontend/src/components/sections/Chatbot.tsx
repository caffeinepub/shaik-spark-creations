import { ArrowRight, MessageCircle, X, Zap } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

const INITIAL_MESSAGE: Message = {
  id: 1,
  from: "bot",
  text: "Hi 👋 Welcome to Shaik Spark Creations! How can we help you today?",
};

const QUICK_REPLIES = [
  {
    id: "start_project",
    label: "🚀 Start a project",
    response:
      "Great choice! Let's bring your vision to life. I'll take you to our contact form where you can share your project details. Our team typically responds within 24 hours! ✨",
    action: "#contact",
    ocid: "chatbot.start_project_button",
  },
  {
    id: "view_services",
    label: "🎨 View services",
    response:
      "We offer 6 core services: Web Development, UI/UX Design, Branding, Graphic Design, Video Editing, and Digital Marketing. Check out our full services section for details! 💡",
    action: "#services",
    ocid: "chatbot.view_services_button",
  },
  {
    id: "contact_team",
    label: "💬 Contact team",
    response:
      "Our team would love to chat! You can reach us at hello@shaikspark.com or fill out the contact form below. We're based in the Innovation District. 🌟",
    action: "#contact",
    ocid: "chatbot.contact_team_button",
  },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const handleQuickReply = (reply: (typeof QUICK_REPLIES)[0]) => {
    const userMsg: Message = {
      id: Date.now(),
      from: "user",
      text: reply.label,
    };

    const botMsg: Message = {
      id: Date.now() + 1,
      from: "bot",
      text: reply.response,
    };

    setMessages((prev) => [...prev, userMsg]);
    setShowQuickReplies(false);

    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);

      // Navigate to section after showing response
      setTimeout(() => {
        const el = document.querySelector(reply.action);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    }, 500);
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setShowQuickReplies(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Chat Window */}
      {isOpen && (
        <div
          data-ocid="chatbot.dialog"
          className="glass rounded-2xl w-80 sm:w-96 shadow-2xl shadow-black/50 overflow-hidden animate-fade-in-up border border-white/10"
          style={{ maxHeight: "500px" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 border-b border-white/10"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.22 35 / 0.2) 0%, oklch(0.65 0.25 330 / 0.15) 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-spark flex items-center justify-center shadow-spark">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <div>
                <div className="font-bold text-foreground font-display text-sm">
                  Spark Assistant
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-foreground/50 text-xs">Online</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              data-ocid="chatbot.close_button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg glass flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="p-4 space-y-3 overflow-y-auto"
            style={{ maxHeight: "280px" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.from === "bot" && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-spark flex items-center justify-center mr-2 mt-0.5 shrink-0">
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-gradient-spark text-white rounded-br-sm shadow-spark"
                      : "glass border border-white/10 text-foreground/90 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick Reply Buttons */}
            {showQuickReplies && messages.length === 1 && (
              <div className="space-y-2 pt-1">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    type="button"
                    key={reply.id}
                    data-ocid={reply.ocid}
                    onClick={() => handleQuickReply(reply)}
                    className="w-full text-left px-4 py-2.5 rounded-xl glass border border-primary/20 text-foreground/80 text-sm hover:border-primary/50 hover:text-foreground transition-all duration-200 flex items-center justify-between group"
                  >
                    {reply.label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            )}

            {/* Reset option after replies */}
            {messages.length > 1 && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-foreground/40 hover:text-spark-orange transition-colors"
                >
                  ↩ Start over
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-white/10">
            <p className="text-center text-foreground/30 text-xs">
              ⚡ Powered by Shaik Spark Creations
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        type="button"
        data-ocid="chatbot.open_modal_button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl shadow-spark-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? "btn-glass" : "bg-gradient-spark"
        }`}
        style={{
          boxShadow: isOpen
            ? undefined
            : "0 0 30px oklch(0.68 0.22 35 / 0.5), 0 8px 20px oklch(0 0 0 / 0.3)",
        }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-spark-gold flex items-center justify-center">
              <span className="text-[8px] font-bold text-black">1</span>
            </div>
          </>
        )}
      </button>
    </div>
  );
}
