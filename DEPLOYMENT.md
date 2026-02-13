# Deployment Runbook

## Vercel Deployment

1. In Vercel, click **Add New Project**.
2. Import `disruptivealchemist/exquisite-corpse`.
3. In **Project Settings > Environment Variables**, add:
   - `GEMINI_API_KEY` = your Gemini API key
4. Deploy.

## Post-Deploy Smoke Test

1. Open the deployed URL homepage.
2. Click **Start Creating**.
3. Complete head, body, and legs generation in `/play`.
4. Confirm `/api/generate-image` calls succeed (no 500s in network tab).
5. Confirm reveal + share panel render.

## Rollback

1. In Vercel, open **Deployments**.
2. Promote a previous successful deployment.

## Ongoing Workflow

- Pushes to `main` trigger CI (`.github/workflows/ci.yml`).
- PRs run lint + build before merge.
