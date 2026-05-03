# CivicGuide AI 🗳️
### *Your Personal AI Voting Assistant for Gujarat 2026*

**CivicGuide AI** is a smart, dynamic assistant designed to turn the overwhelming process of voting into a clear, personalized, 4-phase journey. Specifically built for first-time voters in Gujarat, it bridges the gap between complex election rules and practical action.

---

## 🎯 Chosen Vertical: Civic Engagement & Voter Awareness
We chose this vertical because first-time voters often feel intimidated by bureaucracy. Our solution humanizes the process using Gemini AI and Google’s ecosystem to provide a "GPS for Voting."

---

## 🚀 How it Works (Logic & Approach)
The application uses a **Deterministic State Machine** coupled with **Generative AI** to provide high-reliability guidance.

1.  **Vibe Check (Onboarding)**: Instead of long forms, we ask 3 context-setting questions (Registration status, ID status, Pincode).
2.  **Adaptive Roadmap**: Based on answers, the app dynamically locks/unlocks content across 4 phases:
    *   **Phase 1: Registration**: Direct links to ECI Form 6 or verification portal.
    *   **Phase 2: Documents**: A smart checklist of valid IDs based on the user's availability.
    *   **Phase 3: Booth Finder**: Geographic discovery using Google Maps deep-links.
    *   **Phase 4: Poll Day Guide**: A chronological "Inside the Booth" walkthrough.
3.  **Multimodal AI Assistant**: Gemini 2.0 Flash provides context-aware tips in **Normal, Simpler (5th Grade), Deep-Dive, Gujarati, or Hindi** modes.

---

## 🛠️ Google Services Integration
-   **Gemini 2.0 Flash**: Powers the context-aware guidance with custom system instructions for each user persona.
-   **Google Maps**: Integrated deep-linking for Booth Discovery based on user-provided pincodes.
-   **Google Calendar**: Automatic `.ics` generation for the April 26, 2026, election date.
-   **Google Fonts**: Optimized typography using the 'Inter' family for maximum readability.

---

## ⚖️ Evaluation Criteria Alignment

### 1. Code Quality & Structure
-   **Modular Logic**: Clean separation of concerns between `index.html` (UI), `app.js` (Logic), and `voter-tests.js` (Validation).
-   **Bento Grid UI**: A premium, state-of-the-art interface built with Vanilla Tailwind CSS.

### 2. Security
-   **Sanitized Data**: No user data is sent to external servers except the anonymous context for Gemini prompts.
-   **Safe Storage**: Uses `sessionStorage` for temporary state to prevent persistent data leaks on shared devices.

### 3. Efficiency
-   **AI Caching**: Responses are cached per phase/mode in `sessionStorage` to minimize API calls and save tokens.
-   **Zero-Dependency**: Built with Vanilla JS to ensure lightning-fast load times and a repository size of <100KB.

### 4. Testing
-   **Built-in Audit**: Includes `voter-tests.js`, a custom automated test suite that validates the voter journey logic and data integrity.

### 5. Accessibility (A11y)
-   **Screen Reader Ready**: Full ARIA landmark support (`aria-live`, `role="progressbar"`, `sr-only`).
-   **Inclusive Design**: Contrast-aware color palettes and simplified language modes for users with lower literacy.

---

## 🏗️ Technical Setup & Running
1.  **Clone**: `git clone https://github.com/roshan30-git/CIVIC-guideAI`
2.  **Open**: Simply open `index.html` in any modern browser.
3.  **Dev Mode**: Open the browser console to see the **CivicGuide AI Quality Audit** run automatically.

---

## 📌 Assumptions Made
-   **Election Date**: Assumed to be April 26, 2026, for the Gujarat State Elections (based on current 5-year cycles).
-   **Static Hosting**: Designed to be hosted on Google Cloud Run or any static provider without needing a heavy backend.
