# JOA — repositioning + design overhaul

Working docs for moving joaautomations.com off **AI automation agency** positioning.
Web design leads; CRM and SMB automation are listed services; proof is three Work
cards. Wordmark is `JOA`. Decisions locked 2026-08-19.

| Doc | What it is | Status |
| --- | --- | --- |
| [brief.md](./brief.md) | Constraints: hierarchy, copy rules, reference vs template. | Aligned |
| [design-principles.md](./design-principles.md) | What we extracted from the reference, the rules we adopt, and the three visual directions. | Aligned — build **all three**, don't pick |
| [migration-plan.md](./migration-plan.md) | **Runbook.** Inventory, deletes/rewrites, page order, worktrees, exit loop. | **Locked** |
| [fill-ins.md](./fill-ins.md) | Copy/media facts still needed. None of them block the run. | Open facts only |

If two docs disagree, `migration-plan.md` is the runbook.

## Phases

- **Phase 0 — recon and plan.** Complete. Nested clones of other repos were removed
  from this working tree; only this site plus `docs/` remain.
- **Phase 1 — Task A: shared structure.** Reposition. Delete the automation-agency
  furniture. Build Nav → hero poster → pitch → three Work cards → services → ethos →
  contact → footer.
- **Phase 1 — Task B: three visual forks.** Worktrees `direction-a`, `direction-b`,
  `direction-c` from `design-principles.md` §10. Test/fix per plan §9. Do not merge.
  Do not pick a winner.

Done means the exit conditions in `migration-plan.md` §9.
