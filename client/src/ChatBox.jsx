import {
  useState,
  useRef,
  useEffect,
} from "react";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] =
    useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, loading]);

  useEffect(() => {
    const savedChat =
      localStorage.getItem("chat");

    if (savedChat) {
      setChat(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "chat",
      JSON.stringify(chat)
    );
  }, [chat]);

  const handleSubmit = async () => {
    if (message.trim() === "") return;

    const currentTime =
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    const userMessage = {
      text: message,
      sender: "user",
      time: currentTime,
    };

    setChat((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message: message,
          }),
        }
      );

      const data = await response.json();

      const botReply = {
        text: data.reply,
        sender: "bot",
        time:
          new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
      };

      setChat((prev) => [
        ...prev,
        botReply,
      ]);
    } catch (error) {
      console.log(error);

      const errorMessage = {
        text: "Something went wrong",
        sender: "bot",
        time:
          new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
      };

      setChat((prev) => [
        ...prev,
        errorMessage,
      ]);
    }

    setLoading(false);

    setMessage("");
  };

  const clearChat = () => {
    setChat([]);
    localStorage.removeItem("chat");
  };

  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "30px auto",
        background: darkMode
          ? "#1e1e1e"
          : "#ffffff",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.15)",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "#007bff",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>
          AI Chat App
        </h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={clearChat}
            style={{
              border: "none",
              background: "white",
              color: "#007bff",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Clear
          </button>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            style={{
              border: "none",
              background: "black",
              color: "white",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {darkMode
              ? "Light"
              : "Dark"}
          </button>
        </div>
      </div>

      <div
        style={{
          height: "500px",
          overflowY: "auto",
          background: darkMode
            ? "#2c2c2c"
            : "#f4f4f4",
          padding: "15px",
        }}
      >
        {chat.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "gray",
              marginTop: "120px",
            }}
          >
            Start chatting...
          </div>
        )}

        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user"
                  ? "flex-end"
                  : "flex-start",
              alignItems: "flex-end",
              gap: "8px",
              marginBottom: "15px",
            }}
          >
            {msg.sender === "bot" && (
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  background: "#007bff",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  fontWeight: "bold",
                }}
              >
                AI
              </div>
            )}

            <div
              style={{
                background:
                  msg.sender === "user"
                    ? "#007bff"
                    : darkMode
                    ? "#444"
                    : "#e4e6eb",
                color:
                  msg.sender === "user"
                    ? "white"
                    : darkMode
                    ? "white"
                    : "black",
                padding: "12px 15px",
                borderRadius: "16px",
                maxWidth: "75%",
                wordBreak: "break-word",
              }}
            >
              <div>{msg.text}</div>

              <div
                style={{
                  fontSize: "11px",
                  opacity: 0.7,
                  marginTop: "5px",
                  textAlign: "right",
                }}
              >
                {msg.time}
              </div>
            </div>

            {msg.sender === "user" && (
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  background: "#28a745",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  fontWeight: "bold",
                }}
              >
                U
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div
            style={{
              color: "gray",
              fontStyle: "italic",
            }}
          >
            Typing...
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      <div
        style={{
          display: "flex",
          padding: "15px",
          gap: "10px",
          background: darkMode
            ? "#1e1e1e"
            : "white",
        }}
      >
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
            background: darkMode
              ? "#333"
              : "white",
            color: darkMode
              ? "white"
              : "black",
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            border: "none",
            background: "#007bff",
            color: "white",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;