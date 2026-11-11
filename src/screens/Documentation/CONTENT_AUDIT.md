# Documentation content audit

No Documentation screen or route existed. The user approved a limited exception to add /documentation and wire the existing Sidebar Documentation placeholder. All other changes stay in this folder. Documentation uses static content and never reads/writes CRM LocalStorage.

Sources inspected: App routes, Sidebar, Dashboard/index/components, Leads/LeadDirectory/filters/bulk/data, LeadForm/LeadFields, LeadDetail/Journey, LeadGeneration/index/components/data, Verification/index/data/actions, AuditCenter/index/data/scorecards, Opportunities/index/cards/data, Pipeline/index/editor/list/board/data, Activities/index/QuickLog/feed/data, FollowUps/index/form/list/calendar/data, Meetings/index/form/agenda/actions/data, Proposals/index/editor/preview/data, Analytics/index/panels/aggregation/demo, Team/index/details/permissions/data, Settings/index/fields/schemas/security, Themes/index/ThemeEditor/context and generic Workflow/index.

Evidence affecting documentation:
- Dashboard statistics and dates are demo snapshots; Export Report downloads JSON, not actual telemetry.
- Manual leads save locally. All Leads Import CSV is a workflow link, not an uploader. Assign SDR and the lead-profile Stage selector are session-only. Bulk audit/cadence destinations do not consume selection automatically.
- Lead Generation has fictional prospects and saved targeting searches; selected imports save Pending leads. Duplicate review is local. Verification staging is not consumed by the current Verification screen. Auto-Harvest does not run.
- Verification processes only eligible fixtures with manual demo steps. Saved contacts do not become verified by SMTP. Handoff dialog does not transfer; Audit Center can separately discover eligible decisions.
- Audit Center queues URLs/CSV targets, runs simulated steps, displays sample scorecards, HTML/CSV/print reports and pitch summaries. No real crawler, AI or revenue-impact measurement. Push to Pipeline is unavailable.
- Opportunity Sheets receives eligible completed audit findings explicitly. Statuses and HTML decks are local/sample. Its Push to Sales Pipeline button is unavailable; Pipeline has its own Receive Opportunities intake.
- Pipeline supports Kanban/list, creation/editing/stage moves, authored close dates/reasons, probability modes and forecasts. Values are estimates, not ARR. Intake starts at Qualified.
- Activities logs communications without sending them. Original undated samples are read-only. Task drafts stay in Activities until Follow-ups imports them.
- Follow-ups supports reviewed creation, completion, rescheduling, reassigning, bulk operations and calendar cadence. Missing deadlines are unscheduled; date-only deadlines end that day. No reminders sent.
- Meetings supports reviewed local scheduling, overlap checks, agenda/calendar, edit/notes/outcomes, follow-up intake and CSV/ICS. No external invitations. Supplied valid conference links may be opened.
- Proposals supports templates, explicit source intake, reviewed versions, pricing/milestones, manual lifecycle evidence, previews and CSV/HTML/print. Revisions reset to Draft. No delivery tracking or secure signature service.
- Analytics separates Actual CRM Data from Demo Preview. Dates/linkage/coverage affect counts. Actual ARR/targets are unavailable; Sidebar lead badge is static.
- Team preserves labelled sample identities and manages local invitations/policies/quotas/rule previews/history. Operator/RBAC is not backend authorization. Rules never reassign sources.
- Settings has 13 local planning categories with validated drafts, conflicts/reset/reload and value-free history CSV. Credential controls and unsupported operations are disabled. Team is read-only.
- Theme presets, four color inputs, dark mode and Reset to Original apply immediately and persist automatically; no Save button.
- Workflow pages are navigation placeholders, including human approval, DNC, onboarding/projects and closure. There is no operational onboarding/project workspace or suppression system.

The supplied Stitch link was inaccessible through web retrieval. There is no separate Documentation design. Use existing CSS tokens/Lucide icons and intentionally schematic React/CSS diagrams, not fake application screenshots. Business flow is not proof of automation; future nodes have no invented module route.
