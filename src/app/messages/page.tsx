"use client";

import { useState, useMemo, useRef, useEffect, startTransition } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Send,
  ArrowLeft,
  MessageSquare,
  Search,
  FileText,
  User,
  Building2,
} from "lucide-react";
import {
  getThreadsForAthlete,
  getUnreadCount,
  createMessage,
  getThreadStatusLabel,
  getThreadStatusColor,
  formatMessageTime,
  type Thread,
} from "@/lib/messaging";

const currentUserId = "ath-1"; // Maya Chen as demo
const currentUserName = "Maya Chen";

export default function MessagesPage() {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [localThreads, setLocalThreads] = useState<Thread[]>(() =>
    getThreadsForAthlete(currentUserId)
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedThread = localThreads.find((t) => t.id === selectedThreadId);
  const unreadTotal = useMemo(() => getUnreadCount(localThreads), [localThreads]);

  const filteredThreads = localThreads.filter(
    (t) =>
      searchQuery === "" ||
      t.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.lastMessagePreview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedThread?.messages.length]);

  // Mark messages as read when opening a thread
  useEffect(() => {
    if (!selectedThreadId) return;
    startTransition(() => {
      setLocalThreads((prev) =>
        prev.map((t) =>
          t.id === selectedThreadId
            ? {
                ...t,
                unreadCount: 0,
                messages: t.messages.map((m) => ({ ...m, read: true })),
              }
            : t
        )
      );
    });
  }, [selectedThreadId]);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedThreadId) return;
    const msg = createMessage(
      selectedThreadId,
      currentUserId,
      currentUserName,
      "athlete",
      newMessage.trim()
    );
    setLocalThreads((prev) =>
      prev.map((t) =>
        t.id === selectedThreadId
          ? {
              ...t,
              messages: [...t.messages, msg],
              lastMessageAt: msg.createdAt,
              lastMessagePreview: msg.body.slice(0, 80),
            }
          : t
      )
    );
    setNewMessage("");
  };

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 65px)" }}>
        {/* Thread List */}
        <div
          className={`flex w-full flex-col border-r border-border bg-white md:w-96 ${
            selectedThreadId ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Header */}
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h1 className="flex items-center gap-2 text-xl font-extrabold">
                <MessageSquare className="h-5 w-5 text-brand" />
                Messages
                {unreadTotal > 0 && (
                  <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-white">
                    {unreadTotal}
                  </span>
                )}
              </h1>
            </div>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                placeholder="Search conversations..."
              />
            </div>
          </div>

          {/* Thread List */}
          <div className="flex-1 overflow-y-auto">
            {filteredThreads.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="mx-auto h-10 w-10 text-muted/40" />
                <p className="mt-2 text-sm text-muted">No conversations yet</p>
                <Link
                  href="/athlete/deals"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                >
                  Find businesses to connect with
                </Link>
              </div>
            ) : (
              filteredThreads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`flex w-full items-start gap-3 border-b border-border p-4 text-left transition-colors hover:bg-surface ${
                    selectedThreadId === thread.id ? "bg-brand/5" : ""
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand/10 to-violet-100 text-sm font-bold text-brand">
                    {thread.businessName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="truncate text-sm font-semibold">
                        {thread.businessName}
                      </h3>
                      <span className="shrink-0 text-xs text-muted">
                        {formatMessageTime(thread.lastMessageAt)}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {thread.lastMessagePreview}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getThreadStatusColor(thread.status)}`}
                      >
                        {getThreadStatusLabel(thread.status)}
                      </span>
                      {thread.unreadCount > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Area */}
        {selectedThread ? (
          <div className="flex flex-1 flex-col bg-surface">
            {/* Thread Header */}
            <div className="flex items-center gap-3 border-b border-border bg-white px-4 py-3">
              <button
                onClick={() => setSelectedThreadId(null)}
                className="rounded-lg p-1.5 text-muted hover:bg-surface md:hidden"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand/10 to-violet-100 text-sm font-bold text-brand">
                {selectedThread.businessName.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-bold">
                  {selectedThread.businessName}
                </h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getThreadStatusColor(selectedThread.status)}`}
                  >
                    {getThreadStatusLabel(selectedThread.status)}
                  </span>
                  {selectedThread.dealId && (
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <FileText className="h-3 w-3" />
                      Deal linked
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mx-auto max-w-2xl space-y-4">
                {selectedThread.messages.map((msg) => {
                  const isMe = msg.senderId === currentUserId;
                  const isSystem = msg.senderType === "system";

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="flex justify-center">
                        <div className="rounded-lg bg-brand/5 px-4 py-2 text-center text-xs text-muted">
                          {msg.body}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[75%] ${isMe ? "order-2" : ""}`}>
                        {!isMe && (
                          <div className="mb-1 flex items-center gap-1.5">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-600">
                              {msg.senderType === "business" ? (
                                <Building2 className="h-3 w-3" />
                              ) : (
                                <User className="h-3 w-3" />
                              )}
                            </div>
                            <span className="text-xs font-semibold text-muted">
                              {msg.senderName}
                            </span>
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            isMe
                              ? "bg-brand text-white"
                              : "border border-border bg-white text-foreground"
                          }`}
                        >
                          {msg.body}
                        </div>
                        <div
                          className={`mt-1 text-[10px] text-muted ${isMe ? "text-right" : ""}`}
                        >
                          {formatMessageTime(msg.createdAt)}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Compose */}
            <div className="border-t border-border bg-white p-4">
              <div className="mx-auto flex max-w-2xl gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  className="h-11 flex-1 rounded-lg border border-border bg-surface px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="Type a message..."
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-white transition-colors hover:bg-brand-dark disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden flex-1 items-center justify-center bg-surface md:flex">
            <div className="text-center">
              <MessageSquare className="mx-auto h-16 w-16 text-muted/20" />
              <h2 className="mt-4 text-lg font-bold text-muted">
                Select a conversation
              </h2>
              <p className="mt-1 text-sm text-muted">
                Choose a thread from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
