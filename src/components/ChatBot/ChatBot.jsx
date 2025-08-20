import { useState, useEffect, useRef } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [open, setOpen] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const audioRef = useRef(null);

  const role = localStorage.getItem("role") || "USER";

  const sendMessage = async () => {
    if (!input.trim()) return;
    addMessage("user", input);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, role }),
      });
      const data = await res.json();
      addMessage("bot", data.reply);
      audioRef.current?.play();
    } catch {
      addMessage("bot", "Error talking to server.");
    } finally {
      setTyping(false);
    }
  };

  const addMessage = (from, text) => {
    const msg = {
      from,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, msg]);
    // If chat window is closed, count as unread
    if (!open && from === "bot") setUnreadCount((c) => c + 1);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Minimized */}
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            setUnreadCount(0);
          }}
          className="relative bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Open Chat
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-80 h-96 bg-white border rounded-xl shadow-lg flex flex-col overflow-hidden animate-slide-in">
          <div className="bg-emerald-600 text-white flex justify-between items-center px-4 py-2">
            <span className="font-semibold">Chat Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-sm bg-white/30 px-2 py-1 rounded hover:bg-white/50"
            >
              –
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.from === "bot" && (
                  <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm">
                    B
                  </div>
                )}
                <div
                  className={`p-2 rounded-xl text-sm max-w-[75%] relative ${
                    m.from === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {m.text}
                  <span className="block mt-1 text-[10px] text-right opacity-70">
                    {m.time}
                  </span>
                </div>
                {m.from === "user" && (
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                    U
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="bg-gray-200 text-gray-700 px-3 py-2 rounded-xl inline-block text-sm animate-pulse">
                Bot Typing...
              </div>
            )}
          </div>

          <div className="flex p-2 gap-2 border-t">
            <input
              className="flex-1 border rounded-lg px-3 py-1 text-sm focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* notification sound */}
      <audio ref={audioRef} src="https://freesound.org/data/previews/522/522546_11514840-lq.mp3" />
      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease;
        }
      `}</style>
    </div>
  );
}
