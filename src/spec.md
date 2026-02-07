# Specification

## Summary
**Goal:** Build a Live.com-inspired (but clearly demo and non-Microsoft-branded) sign-in landing experience using Internet Identity, with a post-sign-in app launcher and minimal persisted user records.

**Planned changes:**
- Create a responsive, minimal landing page with an input labeled “Email, phone, or Skype” and actions “Next” and “Sign-in options”, including a visible demo disclaimer and no Microsoft branding.
- Implement Internet Identity authentication: “Next” initiates login; on success show signed-in state with principal and a “Sign out” action.
- Add a post-sign-in app launcher page with a top search input and a grid of at least 6 tiles (e.g., Mail, Calendar, People, Files) that navigate to internal placeholder pages.
- Implement a single Motoko actor that stores a minimal user record keyed by principal (createdAt, lastLogin), with methods to fetch the current user and to create/update lastLogin on sign-in.
- Wire frontend to backend using React Query to fetch the signed-in user record and refresh/clear state appropriately after sign-in/sign-out.
- Apply a consistent, modern, airy visual theme across landing, launcher, and placeholder pages (clean typography, subtle depth) without Microsoft brand colors/logos.
- Add and use generated static image assets under `frontend/public/assets/generated` (served as static files, not via backend).

**User-visible outcome:** Users see a clean demo sign-in landing screen; clicking “Next” signs in with Internet Identity. After sign-in, they see an app launcher with searchable tile grid, can open placeholder pages, view their principal and basic user record data (e.g., lastLogin), and sign out to return to the landing page.
