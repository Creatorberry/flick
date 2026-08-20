# Saved animations

Read this catalog before building a scene. Reuse an asset only when its visual pattern is a strong match for the requested scene. If no entry clearly fits, create a new scene. Templates may reference original images or frame sequences that are not bundled; replace them with allowed current assets when adapting a template.

## ocr-model-card-over-page
**File:** `ocr-model-card-over-page/UnlimitedOcrScene1Hook.tsx`
**Pattern:** A vertically scrolling full-page website sits behind a large tilted image card. A short title appears above the card, then the card slides away.
**Use for:** Introducing one model, product, result, or visual example over its supporting website/page.
**Avoid for:** A scene without a page background or without one central visual card.

## token-waste-terminal
**File:** `token-waste-terminal/ClaudeTokenWasteHook.tsx`
**Pattern:** A dark coding terminal comes into focus. A simple prompt is entered, a long response fills the terminal, and an animated token count grows as the view zooms toward it.
**Use for:** Showing excessive AI output, token growth, slow reasoning, or a simple task becoming unnecessarily expensive.
**Avoid for:** Showing a successful workflow, multiple tools, or a non-terminal product reveal.

## tool-constellation-merge
**File:** `tool-constellation-merge/DesignSystemsSkillsScenes.tsx` — `DesignSystemsScene1Constellation`
**Pattern:** A central branded tile appears on an orange grid. Three surrounding logo tiles pop in, orbit toward the center, and disappear into it as the center tile glows.
**Use for:** Showing several tools, skills, integrations, or sources combining into one central product or capability.
**Avoid for:** A sequential workflow, detailed UI demonstration, or a scene that needs readable multi-step information.

## agent-role-showcase
**File:** `agent-role-showcase/AgentsBuiltInScene.tsx`
**Pattern:** A swarm of small agent terminals appears beneath a large “100 Agents” title. The swarm fades back and four large terminals take focus one at a time: planning, design review, release, and QA.
**Use for:** Showing a product with many built-in agents or clearly separated specialist roles.
**Avoid for:** A single-agent task, a short linear workflow, or a scene without distinct roles.

## source-to-authority-to-install
**File:** `source-to-authority-to-install/GstackRevealCeoInstall.tsx`
**Pattern:** A scrolling source/repository page with a featured card appears first. It cuts to a person/authority card, then to a terminal where one installation command is typed and completes.
**Use for:** Introducing a tool through its source, creator/authority, and installation moment.
**Avoid for:** A generic product overview, a page without an install action, or a scene that should not feature a person.

## connected-workflow-terminals
**File:** `connected-workflow-terminals/WorkflowStartToFinishScene.tsx`
**Pattern:** Three terminal cards appear diagonally on a light canvas. Dotted, animated connector paths move from planning to design review to release, while each terminal types its own task and result.
**Use for:** Showing a clear handoff workflow across planning, design, development, review, testing, or release stages.
**Avoid for:** A role swarm, one isolated task, or a workflow that is not sequential.

## fast-page-scroll
**File:** `fast-page-scroll/FlickGithubDarkFastScroll.tsx`
**Pattern:** A framed dark page rapidly scrolls through a captured screenshot sequence. The same short scroll repeats four times.
**Use for:** Creating fast momentum around a real captured website, repository, dashboard, or long page.
**Avoid for:** Explaining specific page details, because the scroll is intentionally too fast to read.

## page-card-to-header-zoom
**File:** `page-card-to-header-zoom/BragScene1Hook.tsx`
**Pattern:** A full-page website screenshot sits behind a large floating promotional card. The card exits, then the camera pushes into the page header while a progress bar advances.
**Use for:** Moving from a visual product/promo card into a destination page or website header.
**Avoid for:** A scene without a page capture, promotional card, or destination-page reveal.

## two-tools-to-video-frames
**File:** `two-tools-to-video-frames/ClaudeVideoSkillsScenes.tsx` — `ClaudeVideoScene2TwoSkills`
**Pattern:** Two separate tool cards appear, converge toward a central input-video card, then three extracted video-frame thumbnails appear underneath.
**Use for:** Showing two tools or capabilities working together to turn a video into usable frames or visual material.
**Avoid for:** A single-tool process, document processing, or a workflow with more than two primary inputs.

## video-to-frames
**File:** `video-to-frames/ClaudeVideoSkillsScenes.tsx` — `ClaudeVideoScene4RipFrames`
**Pattern:** A vertical video card is scanned, shrinks into a central processing block, and produces four individual frame thumbnails.
**Use for:** Showing video inspection, frame extraction, visual analysis, or turning one video into multiple stills.
**Avoid for:** Document conversion, website browsing, or a workflow that does not begin with video.

## pdf-token-limit
**File:** `pdf-token-limit/MarkitdownScene1Hook.tsx`
**Pattern:** A cursor selects a PDF in a terminal, types a request to summarize it, then the terminal shows document processing and a large token count. The view blurs into a “USAGE LIMIT REACHED” message before cutting to a source-page/card reveal.
**Use for:** Showing an oversized document, expensive PDF processing, token exhaustion, or a document workflow hitting a limit.
**Avoid for:** A positive document-processing result, a video workflow, or a scene without a document/input-file problem.

## content-carousel
**File:** `content-carousel/SceneCanvaContentCarousel.tsx`
**Pattern:** Five tall content cards move horizontally through a 3D carousel. The active card is enlarged in front, its blurred image fills the background, and progress indicators move below.
**Use for:** Showing a sequence of carousel slides, content designs, post concepts, or multiple visual examples.
**Avoid for:** One static image, a terminal workflow, or a scene requiring readable small details on every slide.

## website-resource-reveal
**File:** `website-resource-reveal/SceneKarpathyGithubRepoHighlight.tsx`
**Pattern:** A dark editorial page reveal: title is highlighted, then brief context, two callouts, and a short structured list appear.
**Use for:** Introducing one website, resource, tool, guide, framework, or product page.
**Avoid for:** Real screen recordings, product comparisons, workflows, or abstract visual concepts.

## page-scroll-and-title-focus
**File:** `page-scroll-and-title-focus/GraphifyApprovedScenes.tsx` — `GraphifyScene1`
**Pattern:** A captured page appears inside a framed screen with a blurred matching background. A large circular logo enters and exits while the page scrolls, then the camera zooms into the page header and highlights one title area.
**Use for:** Introducing a captured product, website, repository, or page and ending on one important heading or label.
**Avoid for:** A scene without a captured page, a workflow demonstration, or a page where no single heading needs emphasis.
