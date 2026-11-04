# SOFCODTEC Sales Intelligence CRM — Frontend

React.js + Vite + plain CSS3, based on the supplied Google Stitch screenshots. Frontend only, all lead data is sample/mock data.

## Run

```bash
npm install
npm run dev
```

Visit the Vite address (typically `http://localhost:5173`). Build with `npm run build`.

## Folder structure

```text
src/
├── App.jsx                 # Route registration and app shell
├── main.jsx
├── components/
│   ├── layout/             # Shared Sidebar and Topbar
│   └── ui/                 # KPI cards, tables, badges, charts and panels
├── context/ThemeContext.jsx# Local theme persistence and CSS variables
├── data/mock.js            # Hardcoded demo companies and activities
├── screens/
│   ├── Dashboard/components/RevenuePanels.jsx
│   ├── Leads/components/LeadDirectory.jsx
│   ├── LeadGeneration/components/SourceCards.jsx
│   ├── Verification/components/Deliverability.jsx
│   ├── AuditCenter/components/AuditScorecards.jsx
│   ├── Opportunities/components/OpportunityCards.jsx
│   ├── Pipeline/components/KanbanBoard.jsx
│   ├── Activities/components/ActivityFeed.jsx
│   ├── FollowUps/components/FollowUpList.jsx
│   ├── Meetings/components/MeetingAgenda.jsx
│   ├── Proposals/components/ProposalPreview.jsx
│   ├── Analytics/components/AnalyticsPanels.jsx
│   ├── Team/components/TeamDirectory.jsx
│   ├── Settings/components/IntegrationCards.jsx
│   └── Themes/components/ThemeEditor.jsx
└── styles/global.css       # Original palette + responsive layout
```

Each screen folder also contains its own `index.jsx` entrypoint and is registered under a unique route. Common styling uses CSS3 custom properties, with theme changes persisted to `localStorage`.

## Routes

`/`, `/leads`, `/leads/new`, `/leads/:id`, `/workflow/:step`, `/lead-generation`, `/verification`, `/audit-center`, `/opportunities`, `/pipeline`, `/activities`, `/follow-ups`, `/meetings`, `/proposals`, `/analytics`, `/team`, `/settings`, `/themes`.

## Lead flow routing

New Lead → `/leads/new` → saved company detail `/leads/:id` → Verification → Audit Center → Human Review → Opportunity Sheet → Sales Pipeline → Outreach → Meeting / Follow-up / Lost → Proposal → Deal Outcome → Client Onboarding. Conditional branches are available as guided demo pages under `/workflow/:step`. A new lead is saved in browser `localStorage`; real record-level decisions will be implemented with Express in a later phase.

## Backend integration later

Replace `src/data/mock.js` with API service calls (suggested: `src/services/api.js`) after adding the Express backend. Design and visual workflow are frontend demonstrations only. Audit runs, SMTP verification, email sending, API connections, calendar events, RBAC, persistence, and PDF generation are **not connected**. The lead CSV export, theme switching, local activity logging, follow-up checkboxes, and drag-and-drop pipeline interactions are client-side demo interactions.
