"use client";

import { useEffect } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";

export default function N8nChat() {
  useEffect(() => {
    createChat({
      webhookUrl: "/api/n8n-chat",
      mode: "window",
      showWindowCloseButton: true,
      loadPreviousSession: false,
      initialMessages: [
        "Hi there! ☕",
        "Welcome to Crew & Co. Ask me about our menu, reservations, hours, or anything else.",
      ],
      i18n: {
        en: {
          title: "Crew & Co.",
          subtitle: "We're here to help — 24/7.",
          footer: "",
          getStarted: "Start a Conversation",
          inputPlaceholder: "Ask me anything...",
          closeButtonTooltip: "Close chat",
        },
      },
    });

    // Widget bug: close button emits an internal "close" event that ChatWindow
    // never subscribes to, so clicking it does nothing. We intercept the click
    // and trigger the toggle button, which is what actually controls visibility.
    const handleClick = (e: MouseEvent) => {
      if ((e.target as Element).closest(".chat-close-button")) {
        (document.querySelector(".chat-window-toggle") as HTMLElement)?.click();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
