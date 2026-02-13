# Exquisite Corpse

A Surrealist-inspired AI collage game built with Next.js. Players generate a head, body, and legs in sequence, then reveal a stitched creature.

## Stack

- Next.js App Router
- TypeScript + Tailwind CSS
- Gemini image generation via server route (`/api/generate-image`)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create local environment file:

```bash
cp .env.example .env.local
```

3. Add your Gemini key in `.env.local`:

```bash
GEMINI_API_KEY=your_real_key
```

4. Run locally:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Backend

Image generation runs on server at:

- `src/app/api/generate-image/route.ts`

The frontend calls this route; the Gemini key stays server-side.

## GitHub + Deployment

### 1) Initialize/commit

```bash
git init
git add .
git commit -m "Initial Exquisite Corpse app"
```

### 2) Create GitHub repo and push

```bash
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### 3) Deploy on Vercel

1. Import the GitHub repo into Vercel.
2. In Vercel project settings, add environment variable:
   - `GEMINI_API_KEY`
3. Deploy.

No separate backend service is required; Next.js route handlers deploy with the app.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deployment Runbook

See `DEPLOYMENT.md` for production deployment and smoke-test steps.
