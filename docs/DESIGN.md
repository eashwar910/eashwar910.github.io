# DESIGN: Experience, Visuals and Content

This file describes what the site should feel like and say. `ROADMAP.md` says in what order to build it; `METHOD.md` says how. Treat the copy and layouts here as strong drafts. Improve them where you can, but keep the ground rules in `ROADMAP.md`.

## 1. Experience principles

- The camera is the narrator. One fixed full-screen globe sits behind everything; scroll position drives where it is.
- One idea per screen. Captions are short, large and unhurried.
- The zoom is continuous. Even the sideways glides should feel like part of one descent.
- It must feel like my work: reading change from above.

## 2. The descent (chapters)

Total scroll length is roughly 1100vh, but tune it so pacing feels right. Coordinates are approximate; verify and refine them.

- Orbit start: lon 80, lat 10, ~25,000 km
- Chennai: 13.0827 N, 80.2707 E
- UNM Semenyih campus, Malaysia: ~2.945 N, 101.875 E
- Bolangir, Odisha: ~20.72 N, 83.49 E
- Baleswar (Balasore), Odisha: ~21.49 N, 86.93 E

The path descends steadily with two short sideways glides (Malaysia, then Odisha) and a final settle over Chennai. This deliberately bends a pure straight zoom because the story visits those places before returning home. A `STRAIGHT_ZOOM` flag switches it off for comparison.

| # | Chapter | Camera feel | Caption draft |
|---|---------|-------------|---------------|
| 0 | Orbit | Full globe, slow rotation, atmosphere glow, stars | "From up here, a farm is just a colour." / "I've spent the last few years learning to read what changes." / "Scroll to land." |
| 1 | Age 12 | Descend toward South Asia | "I was twelve when I walked into an agrobotics workshop." / "Machines that could work a field. That's where robotics and agriculture first got to me." |
| 2 | The detour | India scale, then toward Chennai coast | "The plan was an Agri-tech degree." / "Then high school handed me code. I chose Computer Science and AI, and kept the fields." |
| 3 | Age 16 | Hold over Chennai region, slight tilt | "At sixteen I started my first AI project, working remotely with a retired Oxford lecturer, Dr Ken Kahn." / "A rotten fruit detector built on VGG16 and transfer learning." |
| 4 | Malaysia | Glide east across the Bay of Bengal to Semenyih | "In 2024 I moved to Malaysia for Computer Science with AI at the University of Nottingham." / "First Class Honours in years one and two." |
| 5 | Seeds | Close on campus area | "My first summer, I helped a lecturer measure germinating soybean seeds." / "A U-Net that finds the radicle in a microscope image, pixel by pixel." |
| 6 | Farmer Buddy | Hold, pins appear | "Then Agritix, an ag-tech company. The brief: keep farm workers safe using bodycam footage." / "It grew into one app for the whole farm: an agronomist chatbot, AI-suggested irrigation timers, leaf disease detection, and IoT sensor data explained with XAI." |
| 7 | Back for more | Same | "The next summer I returned as an AI engineer. Three months of software and ML work, built for farmers and forest officers." |
| 8 | Community | Pull back slightly | "Off the clock, I'm Head of Tech for the Computer Science Society: infrastructure, events, workshops." |
| 9 | Now: Odisha | Glide northwest to Bolangir then Baleswar, radar-style overlay | "Now, my final-year project. About 11.65 million hectares of India's rice land sits fallow after harvest." / "I'm using Sentinel-1 radar time series to forecast harvest dates, so farmers and farmer groups in Odisha know when a winter pulse can go in." / "Early days. No results yet." |
| 10 | Home | Long smooth descent into Chennai, tilt ~55 degrees, ~3 km | "And this is where it started." / "Welcome to Chennai. Look around." Hub fades in. |

Copy guidance:
- Keep captions to one to three short lines. Warm, plain, a little understated.
- Do not invent scene details or feelings I have not given. Where a line would be stronger with a personal memory, leave a `// ADD MEMORY` comment.
- Tag every personal claim with `// FACT-CHECK` in the content file.

Persistent UI during the descent: an altitude readout in km, chapter dots, an always-visible "Skip to explore" button. Sound is off by default; offer an ambient toggle only if I supply audio.

## 3. The explore hub (Chennai)

The Chennai satellite view stays as a slowly drifting backdrop. Frosted-glass panels sit on top. A dock (bottom on mobile, side on desktop) switches sections with animated transitions.

1. **Timeline:** milestones from section 6, each a card with date, place, one-line summary, and an expandable detail. Optional: selecting an item flies the backdrop to its location where one exists.
2. **Projects:** cards with problem, what I built, stack, links. Rice Fallow Radar and Farmer Buddy are featured. Filter tags such as Computer vision, Mobile, Research, Satellite.
3. **Lab:** the minigames.
4. **About:** short bio, languages, interests (music and guitar, web and app development, community volunteering, hiking and camping), photo slot.
5. **Skills and awards:** skills grouped by area (no percentage bars) and the awards list.
6. **Contact:** email, GitHub, LinkedIn, resume download. A form only if it is easy; otherwise `mailto:`.

Each section gets a deep link such as `#/projects`.

## 4. Minigames (the Lab)

Small, under two minutes each, no external assets (draw with SVG or canvas), each tied to real work. Label them as playful demos; never present simulated scores as real model performance.

1. **Measure the Radicle** (soybean seed work). A procedurally drawn seedling appears. Click the root tip and the base; score by closeness to true length. A closing line compares with the U-Net doing it in milliseconds. Five rounds.
2. **Ripe or Rotten?** (rotten fruit detector). Swipe or use arrow keys through ten illustrated fruit cards. A clearly labelled simulated bot plays alongside, and both scores are shown.
3. **Fallow Finder** (final-year project). A grid of fields on a radar-style map. Each field cycles through too wet, workable and too dry. Tap fields while they are workable before time runs out, with combos for chains.

Stretch ideas (optional): a five-question "How well do you know Eashwar?" quiz (a nod to the TCS InQuizitive semi-final) and a hidden Konami-code easter egg. Better game ideas are welcome.

## 5. Visual direction

- **Mood:** clean, cinematic, "mission control" restraint. Deep space navy at the top, giving way to real daylight imagery. The UI palette warms and gets earthier as altitude drops.
- **Accent:** a green near `#16a34a` (my current site's theme colour) and a warm secondary for the hub.
- **Type:** one distinctive display face and one readable text face. Avoid a default system look.
- **Captions:** large type, generous spacing, high contrast over imagery (add a soft scrim if needed).
- **Hub panels:** frosted glass, high-contrast text, consistent spacing and radii.
- **Details:** thin orbit-line motif, subtle grain, an altitude counter, tidy imagery attribution.
- **Illustration:** original only, simple geometric style that fits the radar and satellite feel.

You have room here. If you find a more striking direction that still reads as satellite storytelling, propose it with a short rationale.

## 6. Content (source of truth)

**Identity.** Eashwar Siddha. Tagline: "AI & Computer Science Undergraduate | Machine Learning Engineer | Ag-Tech Enthusiast". From Chennai, Tamil Nadu; studying in Malaysia. Public email: eashwarsiddha@gmail.com. GitHub: github.com/eashwar910. LinkedIn: linkedin.com/in/eash123. Languages: English (fluent), Tamil (native), Saurashtra (native).

**Principle (from my GitHub profile, usable as a pull-quote):** I prefer fixing data quality to adding model layers.

**Availability line:** open to research assistant roles, internships and agtech projects.

**Timeline**
- Age 12 (year to confirm): agrobotics workshop; sparked interest in robotics and agriculture.
- June 2022 to May 2024: The Velammal International School, Chennai. High school diploma, Mathematics and Computer Science, 93.2% weighted average. Chose computer science and AI over Agri-tech after discovering coding.
- Aug to Oct 2023: Student intern, remote, with Dr Ken Kahn (retired lecturer, University of Oxford). VGG16-based real-time rotten fruit detector (CNN, transfer learning). Project: Pocket Farmer.
- Sept 2024 to present: University of Nottingham Malaysia, BSc (Hons) Computer Science with Artificial Intelligence. First Class Honours in Year 1 and Year 2. Now Year 3.
- July to Sept 2025: Student Research Intern, University of Nottingham Malaysia. U-Net semantic segmentation pipeline to measure radicle and plumule in germinating soybean seeds for seed quality assurance. Project: Seed Germination Analyzer.
- Oct 2025: Publicity Officer, CS Tech Fest (Computer Science Society Publicity Team).
- Agritix Sdn Bhd (Malaysia): built Farmer Buddy, then returned the following summer as a freelance AI engineer for three months on software and AI engineering work. See open item 1 in `ROADMAP.md` on dates.
- May 2026 to present: Head of Technology, Computer Science Society, University of Nottingham Malaysia (digital initiatives, technical infrastructure, tech events and workshops).
- 2026/27: Final year project, Rice Fallow Radar (COMP3025).

**Projects**
1. **Rice Fallow Radar** (final year project, early development): forecasts when fields in India's rice fallows can be sown with a winter pulse such as lentil or black gram. Four parts: M1 harvest-date forecaster (7, 14, 21 days ahead, with calibrated intervals) from Sentinel-1 radar and weather data; M2 cross-region transfer from labelled Tamil Nadu plots (SICKLE dataset) to Odisha; M3 sowing-window classifier (too wet, workable, too dry) using a soil-water balance; M4 winter-crop success ranking using positive-unlabelled learning with checkable reason codes. Also weekly Odia and English alert text (generated, not sent) and a Streamlit dashboard for district farm-advice centres. Study districts: Bolangir and Baleswar, Odisha. About 11.65 million hectares (29% of India's monsoon rice land) lie fallow through winter. Stack: Python 3.12, uv, Google Earth Engine, earthaccess, Streamlit. Repo: github.com/eashwar910/rice-fallow-radar. **No results yet; show none.**
2. **Farmer Buddy** (with Agritix Sdn Bhd): all-in-one precision agriculture mobile app. Began as an employee safety app using bodycam footage and grew into a utility app for farm owners and workers: AI agronomist chatbot, irrigation timer with AI suggestions and alerts, leaf and plant disease detection, IoT sensor data visualisation with an explainable-AI tool, and bodycam employee monitoring. Award: First Place, Best School Project Category.
3. **Seed Germination Analyzer:** U-Net semantic segmentation to quantify radicle and plumule emergence for soybean seed quality assurance.
4. **Pocket Farmer:** VGG16 transfer-learning rotten fruit detector, real-time and image-based.
5. **PMY Segmentation Pipeline:** end-to-end classical and deep-learning pipeline to segment and quantify PMY cells in microscope slide images. (Resume expands PMY as "Polymorphonuclear Yeast"; confirm the wording before showing it.)
6. **OCR Handwriting Recognition:** replicated the keras_ocr library with a custom CNN-CRNN trained on the IAM Handwriting Dataset; 76% accuracy.
7. **Metaheuristic Benchmarking for IDS Classification:** compared GA, PSO, ACO, Hybrid GA-PSO and NSGA-II for feature selection on an intrusion detection classifier, analysing accuracy, feature reduction and computational efficiency.

**Skills (group, do not rate)**
- Languages: Python, C, Java, Haskell, ARM Assembly, TypeScript, JavaScript, PHP, HTML, CSS, React.js
- AI/ML: TensorFlow, PyTorch, Keras, OpenCV, MediaPipe, YOLO, U-Net, Mask R-CNN, CRNN, scikit-learn, NumPy, pandas
- Research and algorithms: GA, PSO, ACO, NSGA-II, Hybrid GA-PSO, feature selection, multi-objective optimisation
- Interfaces and cloud: React Native, Expo, Tailwind, Node.js, JavaFX, LibGDX, PostgreSQL, Supabase, Firebase, GCP, DigitalOcean, AWS, Vercel, Netlify
- Tools: Git, GitHub Actions, Caddy, LiveKit, NeMo Guardrails, Verilog simulation
- Competencies: machine learning, deep learning, computer vision, NLP, image segmentation, transfer learning, full-stack development, agile

**Awards**
- First Place, Best School Project Category, Farmer Buddy (Agritix collaboration)
- SAT India Top Performer Award, 2023
- India Top 96 Semi-Finalist, TCS InQuizitive National Quiz Competition
