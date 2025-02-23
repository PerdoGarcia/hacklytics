"use client"
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "../app/utils/helpers";

export default function Analyst() {
  const chatContainerRef = useRef(null);
  const [chatLog, setChatLog] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const sendPrompt = async (prompt) => {
    const userMessage = { role: "user", content: prompt };
    // Add the user's message to the chat log.
    setChatLog((prev) => [...prev, userMessage]);
    setChatLoading(true);

    try {
      // Use our streaming helper so we can process SSE events.
      const response = await api.postStream("/api/grok", { messages: [userMessage] });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        setChatLoading(false);
        return;
      }

      const reader = response.body && response.body.getReader();
      if (!reader) {
        console.error("No reader available.");
        setChatLoading(false);
        return;
      }

      const decoder = new TextDecoder();
      let assistantMessage = "";
      // Append an empty assistant message to show a placeholder while waiting.
      setChatLog((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        console.log("Read chunk:", { done, value });
        if (done) break;
        const chunk = decoder.decode(value);
        console.log("Received chunk:", chunk);
        // SSE events are separated by double newlines.
        const events = chunk.split("\n\n");
        for (const event of events) {
          if (event.startsWith("data: ")) {
            const dataStr = event.replace("data: ", "").trim();
            // When the stream ends, we break out.
            if (dataStr === "[DONE]") break;
            try {
              // Assume your backend sends a simplified payload like: { "content": "sentence text" }
              const parsed = JSON.parse(dataStr);
              const delta = parsed.content; // using our simplified payload
              if (delta) {
                assistantMessage += delta;
                // Update the last message in the chat log.
                setChatLog((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantMessage,
                  };
                  return updated;
                });
                if (chatContainerRef.current) {
                  chatContainerRef.current.scrollTo({
                    top: chatContainerRef.current.scrollHeight,
                    behavior: "smooth",
                  });
                }
              }
            } catch (error) {
              console.error("Error parsing SSE data:", error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSend = async () => {
    if (!chatInput.trim()) return;
    await sendPrompt(chatInput.trim());
    setChatInput("");
  };

  return (
    <div className=" md:w-1/3">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#408830]">AI Financial Analyst</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={chatContainerRef}
            className="chat-container p-4 bg-white shadow-lg rounded"
            // style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {chatLog.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role} my-2`}>
                {msg.content}
              </div>
            ))}
            {/* Optionally, show a "loading" indicator while waiting */}
            {chatLoading && <div className="text-gray-500">Loading...</div>}
          </div>
          <div className="chat-input flex gap-2 mt-4">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={chatLoading}
              className="bg-[#408830] text-white px-4 py-2 rounded"
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
