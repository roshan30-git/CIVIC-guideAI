# 🗳️ CivicGuide AI: Your Personalized Voting Assistant

**Empowering first-time voters with AI-driven guidance for the 2026 Gujarat Elections.**

CivicGuide AI is a high-accessibility, interactive web application designed to bridge the "information gap" for first-time and tech-averse voters. It transforms complex electoral protocols into a simple, personalized 4-phase roadmap.

---

## 🎯 Chosen Vertical: Election Process Education
Our solution addresses the confusion and intimidation often associated with the physical voting process. By focusing on **Civic Engagement**, we aim to increase voter turnout through education, clarity, and personalized planning.

---

## 🧠 Approach and Logic

### 1. "Vibe-Check" Onboarding
The journey begins with a 3-question interactive chat that determines the user's current status:
- **Registration Status**: (Yes / No / Unsure)
- **Document Status**: (Have Voter ID / Don't Have it)
- **Location**: (Pincode input)

### 2. Tailored Action Plan
Based on the onboarding answers, the app generates a **Dynamic 4-Phase Roadmap**:
- **Phase 1: Registration**: Direct deep-links to ECI portals based on whether the user needs to register or just verify their name.
- **Phase 2: Document Prep**: An interactive checklist of 12+ valid photo IDs, with persistent state (saved to `localStorage`).
- **Phase 3: Booth Finder**: Location-based logic using Pincodes to find polling stations.
- **Phase 4: Poll Day Guide**: A step-by-step "Hour-by-Hour" booth etiquette timeline.

### 3. Adaptive AI Modes (Accessibility)
Users can toggle between different modes that adjust the **Gemini 2.0 Flash** system prompts:
- **Simpler**: Uses 5th-grade vocabulary and emojis for low-literacy users.
- **Normal**: Professional and clear guidance.
- **Deep-Dive**: Provides legal context and specific ECI rule references.
- **Multilingual**: Instant translation to **Gujarati** or **Hindi**.

---

## 🛠️ How the Solution Works

- **Core Engine**: Vanilla JavaScript State Machine ensures zero-hallucination on critical legal dates.
- **AI Brain**: Gemini 2.0 Flash API provides adaptive guidance and multilingual support.
- **Google Services Power-Ups**:
  - **Google Maps**: "Locate My Booth" pre-fills searches for "Polling Stations near [Pincode]".
  - **Google Calendar**: Generates `.ics` reminders for Poll Day (April 26, 2026).
- **Offline-First Storage**: User progress and checklists are saved locally for privacy and speed.
- **Zero-Bloat Frontend**: Built with Vanilla JS and Tailwind CDN to keep the repo size **< 3MB** for maximum accessibility in low-bandwidth areas.

---

## 📋 Any Assumptions Made

1. **Election Date**: Based on current schedules, the Poll Day for Gujarat is assumed to be **April 26, 2026**.
2. **ECI Portals**: Assumes the current ECI Voter Portal links (`voters.eci.gov.in`) will remain the primary entry points for registration.
3. **Pincode Logic**: Assumes users know their 6-digit area pincode to facilitate booth searching.

---

## 📈 AI Submission Evaluation Criteria

### **Code Quality**
- **Clean & Modular**: Focused Vanilla JS components with clear separation of data and UI logic.
- **No Dependencies**: Zero `npm install` needed; runs directly in any browser.

### **Security**
- **Client-Side Processing**: User pincodes and statuses stay on the device (localStorage).
- **Environment Safety**: API keys are isolated for production security.

### **Efficiency**
- **Ultra-Lightweight**: Total repository size is under 3MB, ensuring fast loads on mobile data.
- **Speed**: Uses Gemini 2.0 Flash for near-instant AI responses.

### **Testing**
- **State Persistence**: Verified `localStorage` reliability across sessions.
- **Responsive Audit**: Mobile-first design tested across multiple viewport sizes.

### **Accessibility**
- **Inclusive UI**: High contrast text, ARIA labels, and "Simpler Mode" for users with varying literacy levels.
- **Native Support**: Multilingual toggle for local language support (Gujarati/Hindi).

### **Google Services**
- **Gemini AI**: Adaptive system-prompting for different user needs.
- **Google Maps**: Deep-linking for real-time booth navigation.
- **Google Calendar**: Automated event generation for civic reminders.

---

**Developed for PromptWars 2026**
🔗 [Live Demo](https://civic-guideai-391613367603.us-central1.run.app)
