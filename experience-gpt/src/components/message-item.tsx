import React from "react";

export type MessageProps = {
  role: "user" | "system" | "function" | "assistant" | "data" | "tool";
  content: React.ReactNode;
};

export const MessageItem = ({ role, content }: MessageProps) => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column-reverse",
    whiteSpace: "pre-wrap",
    alignItems: role === "user" ? "flex-end" : "flex-start",
    justifyContent: role === "user" ? "flex-end" : "flex-start",
  };

  const messageStyle: React.CSSProperties = {
    display: "flex",
    maxWidth: "256px",
    borderRadius: "0.5rem",
    padding: "0.75rem 1.25rem",
    backgroundColor: role === "user" ? "black" : "white",
    color: role === "user" ? "white" : "black",
    textAlign: role === "user" ? "right" : "left",
  };

  const textStyle: React.CSSProperties = {
    fontFamily: "Pretendard",
    fontSize: "1.25rem",
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        <div style={textStyle}>{content}</div>
      </div>
    </div>
  );
};
