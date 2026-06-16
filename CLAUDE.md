---
project: med-atlas
category: nextjs-r3f-3d
deploy: vercel
lifecycle: active
last_verified: 2026-05-27
deployment_url: https://medterms.worker-bee.app
---

# Med Atlas — 3D Medical Terminology Study App

## Identity

3D flashcard study app for MA/CMA/CPC certification prep. 1,200+ medical terms rendered with React Three Fiber — each card has a procedural 3D anatomy model (no GLTF files) that floats on the card face.

- GitHub: https://github.com/adobetoby-maker/med-atlas
- Vercel project: prj_nlyAL87I4lFrjhXwg4a10kzdwQHw
- Team: team_WPMJl6w7aYPU9xP3sr8Xx3uN
- Dev server: `npm run dev -H 0.0.0.0 -p 3008` → http://100.117.143.57:3008

## Decision Defaults

| User says / context | Default action |
|---|---|
| "add terms" | Edit `data/terms.ts` — all 100 sample terms live there |
| "full curriculum" | Copy `medTermsData.ts` from language-threshold into `data/terms.ts` |
| "new category" | Add to `CATEGORIES` in `data/terms.ts` + add model key to `CONFIGS` in `components/BodyPart.tsx` |
| "new 3D model" | Add to `CONFIGS` in `components/BodyPart.tsx` using primitive Three.js geometries |
| "animation" | Use `record.js` not `screenshot.js` — R3F scene is animated |
| "deploy" | `vercel --prod` — GitHub auto-deploy also wired to main branch |
| "achievement" | Edit `lib/gamification.ts` → `ACHIEVEMENTS` array |

## Commands

```bash
# Dev
npm run dev -- -H 0.0.0.0 -p 3008

# Build gate
npx tsc --noEmit && npm run build

# Deploy
vercel --prod

# Verify live
curl -sI https://medterms.worker-bee.app | head -1
```

## Architecture

```
app/
  layout.tsx          root layout: Inter font, #080c14 bg, GA4 script
  globals.css         CSS vars: --bg-deep, --accent (#4fffb0), --gold (#f0c060)
  page.tsx            landing page (hero, category pills, feature grid)
  study/page.tsx      server page → imports StudyLoader (client boundary)

components/
  StudyLoader.tsx     'use client' — wraps dynamic(StudyClient, {ssr:false})
  StudyClient.tsx     'use client' — orchestrates scene + gamification state
  StudyScene.tsx      Canvas with Stars, Environment, CardFlip, OrbitControls, HUD
  CardFlip.tsx        spring-physics card flip (tension:280/friction:28)
  BodyPart.tsx        procedural 3D anatomy models (12 types, no GLTF)
  XPBar.tsx           XP progress bar with level display
  AchievementToast.tsx toast notification for earned achievements

data/
  terms.ts            MedTerm[] + CATEGORIES config (color/model/emoji per category)

lib/
  gamification.ts     XP, streaks, achievements — all persisted to localStorage
```

## Key Patterns

**SSR pattern** — R3F cannot run server-side:
- `study/page.tsx` (server) → `StudyLoader.tsx` (`'use client'`) → `dynamic(StudyClient, {ssr:false})`
- Never move `dynamic({ssr:false})` into a server component

**3D card** — `CardFlip.tsx`:
- Spring: `rotation-y` 0→π on flip, `cardScale` 1.0→1.03 on hover
- Front: `RoundedBox` + `BodyPart` at `position={[0, 0.7, 0.5]}` + `Text` from drei
- Back: same `RoundedBox` rotated `[0, Math.PI, 0]`, definition/etymology/example

**3D models** — `BodyPart.tsx`:
- All procedural: `sphereGeometry`, `capsuleGeometry`, `torusGeometry`, `cylinderGeometry`, `coneGeometry`
- `Float` wrapper + `useFrame` idle rotation + hover lift
- `ReactNode` return type (NOT `JSX.Element` — causes TS namespace error)

**Gamification** — `lib/gamification.ts`:
- XP: base 10 + streak bonus `5 × floor(streak/3)`
- 10 achievements keyed to specific milestones
- All state in `localStorage` key `'medatlas_progress'`

## Env Vars

```
NEXT_PUBLIC_GA_ID     # G-XXXXXXXX measurement ID (public)
GA_PROPERTY_ID        # numeric property ID (Data API, server-only)
```

## Failure Patterns

- `dynamic({ssr:false})` in a Server Component → Next.js build error: move to `'use client'` wrapper
- `style={{cursor:'pointer'}}` on `animated.group` → invalid (Three.js objects have no CSS style)
- `() => JSX.Element` as geometry return type → TS error "Cannot find namespace JSX" → use `() => ReactNode`
- `<ellipse>` in R3F → treated as SVG element, not Three.js geometry — remove it
- `npm run dev` without `-H 0.0.0.0` → Tailscale preview breaks silently
- `<Environment preset="night">` in Canvas → loads HDR texture → exhausts headless GPU sandbox → context lost → white canvas; removed in favor of explicit lights
- `font="/fonts/Inter-Bold.woff2"` in drei `<Text>` → troika-three-text doesn't support WOFF2 → Suspense fires → entire card disappears; use WOFF1 from `@fontsource/inter`
- `font="/fonts/SomeMissing.ttf"` (404) in drei `<Text>` → same Suspense blank as above; always verify file exists in `public/fonts/`
- `shadows` + PCFSoftShadowMap on Canvas → deprecated in Three.js 0.170+ and adds GPU overhead; removed
- `useState(undefined)` for category in StudyClient → `?cat=` URL param silently ignored; fix with `useSearchParams().get('cat')` initialized into state
- Cone color mismatch with sphere lobes → visible dark seam at junction; fix with a bridge sphere matching intermediate tone + narrowing cone base radius
- Three.js primitive color discontinuity: adjacent meshes with different `emissiveIntensity` show hard seam — always add a transition mesh between contrasting pieces

## Pending

- [ ] Load full 1,222-card curriculum from `language-threshold/src/data/medTermsData.ts`
- [ ] Expand to full 31 categories (currently 21)
- [ ] Add `/browse` route for term browsing by category
- [ ] Add module-gating (unlock modules as XP increases)
