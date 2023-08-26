//  https://cdn.socket.io/4.5.4/socket.io.min.js

var url = "https://yqs9mn-3000.csb.app/";

var socket = io(url, {
  transports: ["websocket"], // Use WebSocket for better performance
  withCredentials: true, // If cookies are involved
});

socket.on("chat message", (msg) => {
  const { payload } = msg;
  if (payload.policyId === "9008") {
    action_.video.approve(payload.language);
  } else if (payload.policyId.startsWith("30")) {
    const { policyId, contentType } = payload;
    action_.video.strike(policyId, contentType);
  }
});

socket.on("save", () => {
  dom_.videoDecisionPanel.onSave();
});

socket.on("submit", () => {
  dom_.videoDecisionPanel.onSubmit();
});
