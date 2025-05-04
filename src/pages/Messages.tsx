
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ConversationList } from "@/components/chat/ConversationList";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatArea } from "@/components/chat/ChatArea";
import { ChatInfo } from "@/components/chat/ChatInfo";
import { EmptyState } from "@/components/chat/EmptyState";
import { mockUsers, mockMessages, User, Message } from "@/components/chat/types";

export default function Messages() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);
  
  const currentMessages = selectedUser 
    ? mockMessages[selectedUser.id] || []
    : [];
  
  const handleSendMessage = (messageContent: string) => {
    if (!selectedUser) return;
    
    // In a real app, we would send the message to the backend
    console.log(`Sending message to ${selectedUser.name}: ${messageContent}`);
  };
  
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsMobileView(window.innerWidth < 768);
  };
  
  const handleBackToList = () => {
    setSelectedUser(null);
  };
  
  const toggleChatInfo = () => {
    setShowChatInfo(!showChatInfo);
  };
  
  const handleNewConversation = () => {
    console.log("Creating new conversation");
    // In a real app, we would show a modal or navigate to a new conversation screen
  };
  
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Sidebar with conversations (hidden on mobile when a conversation is selected) */}
        <div className={`
          border-r border-border w-full md:w-80 lg:w-96 flex-shrink-0
          ${(isMobileView && selectedUser) ? 'hidden' : 'flex flex-col'}
        `}>
          <ConversationList 
            users={mockUsers}
            selectedUser={selectedUser}
            onSelectUser={handleSelectUser}
          />
        </div>
        
        {/* Chat area */}
        <div className={`
          flex-1 flex flex-col
          ${(!isMobileView || selectedUser) ? 'flex' : 'hidden'}
        `}>
          {selectedUser ? (
            <>
              {/* Chat header */}
              <ChatHeader 
                user={selectedUser} 
                isMobileView={isMobileView}
                onBack={handleBackToList}
                onInfoToggle={toggleChatInfo}
              />
              
              {/* Main chat and info sidebar */}
              <div className="flex-1 flex overflow-hidden">
                {/* Messages area */}
                <ChatArea 
                  messages={currentMessages}
                  onSendMessage={handleSendMessage}
                />
                
                {/* Chat info sidebar */}
                {showChatInfo && (
                  <ChatInfo 
                    user={selectedUser}
                    onClose={() => setShowChatInfo(false)}
                  />
                )}
              </div>
            </>
          ) : (
            <EmptyState onNewConversation={handleNewConversation} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
