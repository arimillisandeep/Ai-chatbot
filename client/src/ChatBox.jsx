import { useState } from "react";
import axios from "axios";

function ChatBox() {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [layout, setLayout] =
    useState({
      nodes: {
        headline: {
          x: 150,
          y: 170,
          width: 700,
          height: 120,

          data: {
            content:
              "Luxury Comfort, Surprisingly Attainable",
          },

          style: {
            visual: {
              fontSize: 64,
              color: "black",
            },
          },
        },
      },
    });

  async function sendMessage() {

    if (!message.trim()) return;

    try {

      const userMessage = {
        sender: "user",
        text: message,
      };

      const updatedMessages = [
        ...messages,
        userMessage,
      ];

      setMessages(updatedMessages);

      const response =
        await axios.post(
          "http://localhost:5000/api/chat",
          {
            message,
          }
        );

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };

      setMessages([
        ...updatedMessages,
        botMessage,
      ]);

      /* IMPORTANT */

      setLayout(
        response.data.layout
      );

      setMessage("");

    } catch (error) {

      console.log(error);

    }

  }

  const headline =
    layout.nodes.headline;

  return (

    <div className="app">

      <div className="main-layout">

        {/* LEFT */}

        <div className="preview-area">

          <div className="topbar">

            <div className="logo">
              AI Chat App
            </div>

          </div>

          <div
            className="headline"
            style={{
              left: headline.x,
              top: headline.y,
              width:
                headline.width,

              fontSize:
                headline.style.visual
                  .fontSize,

              color:
                headline.style.visual
                  .color,
            }}
          >
            {
              headline.data
                .content
            }
          </div>

        </div>

        {/* RIGHT */}

        <div className="side-panel">

          <div className="messages">

            {messages.map(
              (msg, index) => (

                <div
                  key={index}
                  className={
                    msg.sender ===
                    "user"
                      ? "user-message"
                      : "bot-message"
                  }
                >
                  {msg.text}
                </div>

              )
            )}

            <div className="json-box">

              <pre>
                {JSON.stringify(
                  layout,
                  null,
                  2
                )}
              </pre>

            </div>

          </div>

          <div className="input-area">

            <input
              type="text"
              placeholder="Type message..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
            />

            <button
              onClick={
                sendMessage
              }
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ChatBox;