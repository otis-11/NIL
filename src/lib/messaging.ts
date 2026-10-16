// ============================================================
// TYPES
// ============================================================

export type MessageSender = "athlete" | "business" | "system";
export type ThreadStatus = "active" | "archived" | "deal_in_progress" | "deal_completed";

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderType: MessageSender;
  body: string;
  createdAt: string;
  read: boolean;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  type: "contract" | "media_kit" | "deliverable" | "invoice";
  name: string;
  url: string;
}

export interface Thread {
  id: string;
  athleteId: string;
  athleteName: string;
  businessId: string;
  businessName: string;
  dealId?: string;
  status: ThreadStatus;
  lastMessageAt: string;
  lastMessagePreview: string;
  unreadCount: number;
  messages: Message[];
  createdAt: string;
}

// ============================================================
// MOCK DATA
// ============================================================

export const mockThreads: Thread[] = [
  {
    id: "thread-1",
    athleteId: "ath-1",
    athleteName: "Maya Chen",
    businessId: "biz-1",
    businessName: "Peak Performance Gym",
    dealId: "deal-1",
    status: "deal_completed",
    lastMessageAt: "2026-03-06T14:30:00Z",
    lastMessagePreview: "Payment has been released! Great work on this campaign.",
    unreadCount: 0,
    createdAt: "2026-02-28T10:00:00Z",
    messages: [
      {
        id: "msg-t1-1",
        threadId: "thread-1",
        senderId: "ath-1",
        senderName: "Maya Chen",
        senderType: "athlete",
        body: "Hi Peak Performance! I'm Maya Chen, a D3 soccer player at Westfield State. I saw your gym is looking for local athlete partners and I'd love to discuss a social media feature.",
        createdAt: "2026-02-28T10:00:00Z",
        read: true,
      },
      {
        id: "msg-t1-2",
        threadId: "thread-1",
        senderId: "biz-1",
        senderName: "Peak Performance Gym",
        senderType: "business",
        body: "Hey Maya! We've seen you around the Westfield community and love your content. We'd be interested in an Instagram story feature. What does that look like?",
        createdAt: "2026-02-28T14:22:00Z",
        read: true,
      },
      {
        id: "msg-t1-3",
        threadId: "thread-1",
        senderId: "ath-1",
        senderName: "Maya Chen",
        senderType: "athlete",
        body: "That sounds perfect! I can do 3 Instagram stories over a week — showing my workout routine at your gym, tagging you in each one. LocalNIL suggests $200-$300 for this type of campaign. Would that work?",
        createdAt: "2026-02-28T15:10:00Z",
        read: true,
      },
      {
        id: "msg-t1-4",
        threadId: "thread-1",
        senderId: "biz-1",
        senderName: "Peak Performance Gym",
        senderType: "business",
        body: "Let's do $250. I'll send the deal through LocalNIL so we have the contract and escrow set up.",
        createdAt: "2026-03-01T09:00:00Z",
        read: true,
      },
      {
        id: "msg-t1-5",
        threadId: "thread-1",
        senderId: "system",
        senderName: "LocalNIL",
        senderType: "system",
        body: "📋 A contract has been generated for this deal. Amount: $250. Both parties please review and sign in the Contracts tab.",
        createdAt: "2026-03-01T09:05:00Z",
        read: true,
      },
      {
        id: "msg-t1-6",
        threadId: "thread-1",
        senderId: "system",
        senderName: "LocalNIL",
        senderType: "system",
        body: "✅ Contract signed by both parties. Escrow funded. Deal is now active!",
        createdAt: "2026-03-01T10:30:00Z",
        read: true,
      },
      {
        id: "msg-t1-7",
        threadId: "thread-1",
        senderId: "ath-1",
        senderName: "Maya Chen",
        senderType: "athlete",
        body: "All 3 stories are posted! Check them out — I tagged @PeakPerformanceGym in each one. Here are the analytics so far: 1,200 views, 85 link clicks.",
        createdAt: "2026-03-05T18:00:00Z",
        read: true,
      },
      {
        id: "msg-t1-8",
        threadId: "thread-1",
        senderId: "biz-1",
        senderName: "Peak Performance Gym",
        senderType: "business",
        body: "These look amazing! We already had 3 people come in mentioning your stories. Approving deliverables now.",
        createdAt: "2026-03-06T10:15:00Z",
        read: true,
      },
      {
        id: "msg-t1-9",
        threadId: "thread-1",
        senderId: "system",
        senderName: "LocalNIL",
        senderType: "system",
        body: "💰 Payment has been released! Great work on this campaign. $225 has been deposited to Maya Chen's account (after 10% platform fee).",
        createdAt: "2026-03-06T14:30:00Z",
        read: true,
      },
    ],
  },
  {
    id: "thread-2",
    athleteId: "ath-1",
    athleteName: "Maya Chen",
    businessId: "biz-7",
    businessName: "Westfield Family Dental",
    status: "active",
    lastMessageAt: "2026-04-02T11:00:00Z",
    lastMessagePreview: "That sounds great! When would work for a quick call?",
    unreadCount: 1,
    createdAt: "2026-04-01T09:00:00Z",
    messages: [
      {
        id: "msg-t2-1",
        threadId: "thread-2",
        senderId: "ath-1",
        senderName: "Maya Chen",
        senderType: "athlete",
        body: "Hi Westfield Family Dental! I'm Maya Chen, a D3 soccer player at Westfield State. I noticed you're a family-focused practice and thought a local athlete partnership could boost your visibility in the community. Would you be interested in a social media feature or community event?",
        createdAt: "2026-04-01T09:00:00Z",
        read: true,
      },
      {
        id: "msg-t2-2",
        threadId: "thread-2",
        senderId: "biz-7",
        senderName: "Westfield Family Dental",
        senderType: "business",
        body: "Hi Maya! Thanks for reaching out. We've been thinking about partnering with local athletes to connect better with the community. A social media feature could be interesting. What kind of content would you create?",
        createdAt: "2026-04-01T14:30:00Z",
        read: true,
      },
      {
        id: "msg-t2-3",
        threadId: "thread-2",
        senderId: "ath-1",
        senderName: "Maya Chen",
        senderType: "athlete",
        body: "I'd create a series of posts about healthy habits for athletes — tying in dental health as part of overall wellness. Think \"game day prep\" content that includes your practice. My audience is 85% local so the reach would be super targeted to your area.",
        createdAt: "2026-04-02T09:15:00Z",
        read: true,
      },
      {
        id: "msg-t2-4",
        threadId: "thread-2",
        senderId: "biz-7",
        senderName: "Westfield Family Dental",
        senderType: "business",
        body: "That sounds great! When would work for a quick call?",
        createdAt: "2026-04-02T11:00:00Z",
        read: false,
      },
    ],
  },
  {
    id: "thread-3",
    athleteId: "ath-3",
    athleteName: "Aiden Brooks",
    businessId: "biz-4",
    businessName: "Riverside Chiropractic",
    dealId: "deal-4",
    status: "deal_in_progress",
    lastMessageAt: "2026-03-22T16:00:00Z",
    lastMessagePreview: "Contract is awaiting parent approval. We'll notify you once it's signed.",
    unreadCount: 1,
    createdAt: "2026-03-18T10:00:00Z",
    messages: [
      {
        id: "msg-t3-1",
        threadId: "thread-3",
        senderId: "biz-4",
        senderName: "Riverside Chiropractic",
        senderType: "business",
        body: "Hi Aiden! We'd love to have you endorse our sports recovery program. Your QB status at Riverside High makes you a perfect fit. Would you be interested in a testimonial video and social campaign?",
        createdAt: "2026-03-18T10:00:00Z",
        read: true,
      },
      {
        id: "msg-t3-2",
        threadId: "thread-3",
        senderId: "ath-3",
        senderName: "Aiden Brooks",
        senderType: "athlete",
        body: "Hey! I've actually been to your clinic before and love it. I'd definitely be down for a testimonial. What's the budget looking like?",
        createdAt: "2026-03-18T14:45:00Z",
        read: true,
      },
      {
        id: "msg-t3-3",
        threadId: "thread-3",
        senderId: "biz-4",
        senderName: "Riverside Chiropractic",
        senderType: "business",
        body: "We're thinking $500 for a testimonial video plus 2 social posts. I'll create the deal on LocalNIL.",
        createdAt: "2026-03-19T09:30:00Z",
        read: true,
      },
      {
        id: "msg-t3-4",
        threadId: "thread-3",
        senderId: "system",
        senderName: "LocalNIL",
        senderType: "system",
        body: "📋 A contract has been generated for this deal. Amount: $500. Note: Aiden is a minor — parent/guardian approval is required before this contract can be activated.",
        createdAt: "2026-03-20T10:00:00Z",
        read: true,
      },
      {
        id: "msg-t3-5",
        threadId: "thread-3",
        senderId: "ath-3",
        senderName: "Aiden Brooks",
        senderType: "athlete",
        body: "I signed the contract! My mom should get the approval request via email.",
        createdAt: "2026-03-20T15:00:00Z",
        read: true,
      },
      {
        id: "msg-t3-6",
        threadId: "thread-3",
        senderId: "system",
        senderName: "LocalNIL",
        senderType: "system",
        body: "⏳ Contract is awaiting parent approval. We'll notify you once it's signed.",
        createdAt: "2026-03-22T16:00:00Z",
        read: false,
      },
    ],
  },
  {
    id: "thread-4",
    athleteId: "ath-2",
    athleteName: "Jordan Williams",
    businessId: "biz-2",
    businessName: "Mountain View Auto",
    dealId: "deal-2",
    status: "deal_in_progress",
    lastMessageAt: "2026-03-16T09:00:00Z",
    lastMessagePreview: "See you Saturday at 10am! Looking forward to a great event.",
    unreadCount: 0,
    createdAt: "2026-03-12T10:00:00Z",
    messages: [
      {
        id: "msg-t4-1",
        threadId: "thread-4",
        senderId: "biz-2",
        senderName: "Mountain View Auto",
        senderType: "business",
        body: "Jordan! We're opening a new showroom and would love to have you do a meet & greet. Your basketball following in Harrogate is exactly what we need for the event.",
        createdAt: "2026-03-12T10:00:00Z",
        read: true,
      },
      {
        id: "msg-t4-2",
        threadId: "thread-4",
        senderId: "ath-2",
        senderName: "Jordan Williams",
        senderType: "athlete",
        body: "That sounds awesome! I've seen the new building going up. What date are you thinking?",
        createdAt: "2026-03-12T12:30:00Z",
        read: true,
      },
      {
        id: "msg-t4-3",
        threadId: "thread-4",
        senderId: "biz-2",
        senderName: "Mountain View Auto",
        senderType: "business",
        body: "March 22nd, 10am-12pm. $750 for the appearance. I'll set it up on LocalNIL.",
        createdAt: "2026-03-13T08:00:00Z",
        read: true,
      },
      {
        id: "msg-t4-4",
        threadId: "thread-4",
        senderId: "system",
        senderName: "LocalNIL",
        senderType: "system",
        body: "📋 Contract generated. Amount: $750. Escrow funded by Mountain View Auto. Both parties have signed. Deal is active!",
        createdAt: "2026-03-14T11:00:00Z",
        read: true,
      },
      {
        id: "msg-t4-5",
        threadId: "thread-4",
        senderId: "ath-2",
        senderName: "Jordan Williams",
        senderType: "athlete",
        body: "See you Saturday at 10am! Looking forward to a great event.",
        createdAt: "2026-03-16T09:00:00Z",
        read: true,
      },
    ],
  },
];

// ============================================================
// THREAD OPERATIONS
// ============================================================

export function getThreadsForAthlete(athleteId: string): Thread[] {
  return mockThreads
    .filter((t) => t.athleteId === athleteId)
    .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
}

export function getThreadsForBusiness(businessId: string): Thread[] {
  return mockThreads
    .filter((t) => t.businessId === businessId)
    .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
}

export function getThread(threadId: string): Thread | undefined {
  return mockThreads.find((t) => t.id === threadId);
}

export function getUnreadCount(threads: Thread[]): number {
  return threads.reduce((sum, t) => sum + t.unreadCount, 0);
}

export function createMessage(
  threadId: string,
  senderId: string,
  senderName: string,
  senderType: MessageSender,
  body: string
): Message {
  return {
    id: `msg-${Date.now()}`,
    threadId,
    senderId,
    senderName,
    senderType,
    body,
    createdAt: new Date().toISOString(),
    read: false,
  };
}

export function createSystemMessage(threadId: string, body: string): Message {
  return createMessage(threadId, "system", "LocalNIL", "system", body);
}

export function getThreadStatusLabel(status: ThreadStatus): string {
  switch (status) {
    case "active": return "Active";
    case "archived": return "Archived";
    case "deal_in_progress": return "Deal in Progress";
    case "deal_completed": return "Deal Completed";
  }
}

export function getThreadStatusColor(status: ThreadStatus): string {
  switch (status) {
    case "active": return "bg-blue-100 text-blue-700";
    case "archived": return "bg-gray-100 text-gray-600";
    case "deal_in_progress": return "bg-amber-100 text-amber-700";
    case "deal_completed": return "bg-emerald-100 text-emerald-700";
  }
}

export function formatMessageTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return date.toLocaleDateString("en-US", { weekday: "short" });
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
