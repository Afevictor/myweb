# Support Chatbot Knowledge Base

This document outlines the logic, behavior, and flow for the Verturn AI Support Chatbot.

## Overall Behavior Rules
- **Priority Order**: Always collect name first, then email, then service/details. Do not proceed without these.
- **Complaints/Other Topics**: Treat all inputs after name/email as "service needs" (including complaints, questions, or anything else). Respond by redirecting to the team—no resolution from the bot.
- **Session Management**: End every interaction after the final response. If the user messages again, treat it as a new session and restart from the greeting.
- **Tone**: Polite, professional, and concise.
- **Validation**:
  - **Name**: Accept any string.
  - **Email**: Basic check for "@" and domain. 3 attempts allowed.
- **Persistence**: Details (Name, Email, Message) are automatically pushed to the Supabase `leads` table.

## Conversation Flow (State Machine)
1. **State 0: Greeting/Name Collection**
   - Bot: "Hello! Welcome to our support chatbot. May I have your name please?"
2. **State 1: Email Collection**
   - Bot: "Thank you, [NAME]. Now, could you provide your email address?"
3. **State 2: Service/Details Collection**
   - Bot: "Great, [NAME]. What service do you need, or do you have a complaint or any other details?"
4. **State 3: Closure & Data Sync**
   - Bot: Thank the user and confirm the team will reach out.
   - Action: Push data to Supabase.

## Response Templates
- **Greeting**: "Hello! Welcome to our support chatbot. May I have your name please?"
- **Name Reprompt**: "Sorry, I need your name to proceed. What's your name?"
- **Email After Name**: "Thank you, [NAME]. Now, could you provide your email address?"
- **Email Reprompt (Invalid)**: "That doesn't seem like a valid email. Please try again (e.g., example@email.com)."
- **Service After Email**: "Great, [NAME]. What service do you need, or do you have a complaint or any other details?"
- **Closure (General)**: "Thank you for sharing, [NAME]. Our team will review your request and reach out to you via [EMAIL] soon. Have a great day! (Chat session closed.)"
- **Closure (Complaint)**: "Thank you for sharing your complaint, [NAME]. I'll redirect this to our team, and they'll respond to you via [EMAIL] shortly. Have a great day! (Chat session closed.)"

## Implementation Note
The chatbot is implemented in `components/SupportChatbot.tsx` as a React component using a state-machine architecture. Data is synced to Supabase via the `supabase` client.
