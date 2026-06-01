# A One-Year Hobbyist Curriculum in Mechanism and Automaton Design

*For an electrical engineer with a Bambu A1 Mini Combo (AMS Lite), PLA, 4 hours/week, and a Cabaret-Mechanical-Theatre-style automaton as a year-end goal.*

*Version 2 — switched primary CAD to Onshape Free and printer to the Bambu A1 Mini Combo with AMS Lite. Changes from v1 are concentrated in the TL;DR, software paragraph, learning philosophy, Wks 1/2/18/35/50, the toolchain table, budget, recommendations, and caveats; the core week-by-week mechanism progression is unchanged.*

## TL;DR

- **A four-hour-per-week curriculum is genuinely sufficient** to take an EE from "knows no formal mechanism theory" to "can design and build a multi-mechanism CMT-style automaton" within 52 weeks, provided the three axes (a weekly buildable print, an aligned theory block, and a progressively learned CAD/CAE tool) reinforce each other. The lynchpin is the weekly Bambu A1 Mini print, which functions as a "kinematics oscilloscope" for the math — and the AMS Lite's 4-color capability serves as a visual decoder for the kinematics, with a consistent color convention (ground / crank / coupler / rocker / output) running through all 52 prints.
- **Anchor reading is Norton's *Design of Machinery* 6th ed.** (kinematics, cams Ch. 8, gears Ch. 9, dynamics, balancing) paired with **Onn & Alexander's *Cabaret Mechanical Movement*, 2nd rev. ed. 2014** (ISBN 9780952872931, 120 pp.; chapters on Levers, Shafts, Cranks, Cams, Springs, Linkages, Ratchets, Drives & Gearing) and **Peppé's *Automata and Mechanical Toys*** (Crowood 2002, ISBN 9781861265104, 160 pp., with scale patterns for ten fundamental automata mechanisms).
- **Toolchain (verified May 2026):** **Onshape Free** (browser-based, cross-platform, public-only, FeatureScript for parametric gears/cams) as the primary CAD; **Autodesk Fusion Personal Use** (free, 3-year renewable, <$1,000 USD/yr revenue) as a secondary/offline option with built-in basic FEA; **OrcaSlicer** (recommended Bambu Studio fork) for slicing and AMS color setup; GIM 2026.1 from UPV/EHU (free educational, Windows) for instantaneous-center and Burmester visualization; SAM Mechanism Designer free trial from Artas; David Rector's Linkage (Windows, free) for 2D linkage prototyping; OpenSCAD/Python for parametric gears and cams; FreeCAD FEM workbench (CalculiX backend) for the one FEA week. Quarter-end builds are a coupler-curve drawing automaton → Geneva-indexed cam turret → Klann/Jansen walker → a personal CMT-style automaton with three coordinated motions on one crankshaft.

## Key Findings

**Norton's *Design of Machinery* is the right backbone** because its chapter sequence (Kinematics Fundamentals; Graphical Linkage Synthesis; Position Analysis; Analytical Linkage Synthesis; Velocity Analysis; Acceleration Analysis; Cam Design; Gear Trains; Dynamics Fundamentals; Dynamic Force Analysis; Balancing) maps almost one-for-one onto the natural progression of a mechanism curriculum, and the 6th edition adds compliant mechanisms in Ch. 2 and an enhanced "Some Useful Mechanisms" in Ch. 3 — exactly the topics CMT-style automata depend on.

**The CMT aesthetic is a specific design discipline, not a vague "art" goal.** Cabaret Mechanical Theatre artists (Paul Spooner, Peter Markey, Keith Newstead, Ron Fuller, Sam Smith, Tim Hunkin) share four signatures: whimsical narrative, visible/exposed mechanism, hand-cranked operation, and mantelpiece scale. Paul Spooner himself states the design ethos in his Exploratorium "Tinkering Tinkerer" feature: *"My work as an artist / mechanic amounts to a constant pursuit of elegance and simplicity. I haven't caught up with either yet because I don't know how to finish things. Except sometimes. And even then I'm not sure."* Following this is what distinguishes a "CMT automaton" from a generic kinetic sculpture.

**Free hobbyist software for mechanism work is mature and current in 2026** but partially Windows-skewed. **Onshape Free** is the recommended primary CAD: fully parametric, cross-platform browser-based, includes **FeatureScript** (a real programming language for custom features) on the free tier, and its six assembly mate types map cleanly onto kinematic pairs from Norton Ch. 2 — the catch is that all documents are public, with a 10-document / 100 MB private cap and a non-commercial restriction. **Autodesk Fusion Personal Use** remains a strong alternative when offline access or built-in linear FEA matters; the Autodesk Fusion comparison page (autodesk.com/products/fusion-360/personal, fetched May 2026) confirms: *"Autodesk Fusion for personal use is free online CAD for 3 years for qualifying non-commercial users. A hobbyist user must generate less than $1,000 USD in annual revenue."* GIM 2026.1 from the UPV/EHU COMPMECH group is current and free for education; David Rector's Linkage (latest 3.16, Nov 2024) is free; SAM Mechanism Designer offers a 30-day free trial obtainable from inside the app. Linux/macOS users will need a Windows VM for GIM, Linkage, and SAM — but with Onshape as primary CAD, the daily driver stays cross-platform.

**Three educators/makers should be heavily leveraged on YouTube.** Nguyen Duc Thang's *thang010146* channel reportedly hosts 4,027 mechanism animations and 378,000 subscribers as of July 31, 2025 (per the channel's published mediafire index referenced in SPEAKRJ analytics); it functions as a visual mechanism dictionary. Greg Zumwalt's catalog on Instructables (instructables.com/member/gzumwalt/instructables/, fetched May 2026: "248 Instructables · 1,999,620 Views · 1,735 Followers") is the most directly transferable resource for *3D-printed PLA* automata in the world. Henry Segerman's channel (youtube.com/@henryseg) connects mathematical structure to physically printed mechanisms — screw/screw gearing, scissor mechanisms — and is the right complement for an EE who wants the math to feel inevitable.

**Disney Research's "Computational Design of Mechanical Characters"** (Coros, Thomaszewski, Noris, Sueda, Forberg, Sumner, Matusik, Bickel; ACM Trans. Graphics 32(4), SIGGRAPH 2013; DOI 10.1145/2461912.2461953; PDF at ri.cmu.edu/pub_files/2013/0/CDMC_final.pdf) is the canonical academic statement of the very synthesis problem this hobby targets. **No official code is publicly released**; a community Python reimplementation exists at github.com/ofirbartal100/Mechanical_Characters and should be treated as a study aid only.

## Details

### Learning philosophy

This plan treats mechanism design the way a good lab course treats circuit design: every theoretical idea must show up in something you can hold, turn, and watch fail or succeed on your bench. Three parallel axes — a weekly **buildable 3D-printed project**, a **theory block** (textbook + lecture + a few hand-worked problems), and a **CAD/CAE tool skill** — converge each week so that the math you just learned is exactly the math needed to size the part you're printing. Because you already command calculus, linear algebra, and ODEs, the curriculum skips the usual "vector basics" review and goes directly to vector-loop equations, Freudenstein's equation, screw coordinates, and Burmester theory, treating the four-bar as the "transistor" of the mechanical world.

The Bambu A1 Mini Combo in PLA can produce nearly every classical planar mechanism if you respect a few rules (modulus-appropriate gears, ~0.3–0.4 mm running clearance on revolute joints, chamfered lead-ins, vertical hole axes). The 180×170×170 mm usable build volume covers all weekly projects natively; the Klann/Jansen walker (Wks 37–39) and the CMT capstone box (Wks 50–51) are designed from the outset as printable panels or sub-assemblies rather than monolithic prints. The AMS Lite enables a **standing color convention** that runs through the whole year — by default, **ground = light gray, crank = red, coupler = blue, rocker/follower = green, output/character = yellow** — and unlocks PLA + TPU multi-material flexures for the compliant-mechanism week. Quarter-end capstones become progressively ambitious; the final 6 weeks deliver a CMT-style automaton in which cams, linkages, and (optionally) an escapement coordinate multiple character motions, with mechanism in one palette and character in another, co-printed in a single job.

### Quarter-by-quarter milestones

| Quarter | Theme | Mathematical core | Capstone at quarter end |
|---|---|---|---|
| **Q1 (Wk 1–13)** | Planar kinematics, the four-bar | Mobility (Gruebler/Kutzbach), Grashof, vector-loop position/velocity/acceleration, instantaneous centers | **Coupler-curve drawing automaton:** a Grashof four-bar whose coupler point traces a figure-8 in pen |
| **Q2 (Wk 14–26)** | Cams, gears, intermittent motion | SVAJ, cycloidal/polynomial cams, involute geometry, planetary trains, Geneva | **3-station automated turret:** Geneva indexer + cam-driven tool head + spur reduction, all hand-cranked |
| **Q3 (Wk 27–39)** | Synthesis, dynamics, compliant + walking | Freudenstein, Burmester 3-position, virtual work, pseudo-rigid-body model, Klann/Jansen | **3D-printed walker** with Klann or Jansen legs, hand-cranked, with smoothing flywheel |
| **Q4 (Wk 40–52)** | Escapements, screw-theory survey, CMT capstone | Recoil/deadbeat escapements, screw/twist primer, system integration | **Personal CMT-style automaton** — whimsical hand-cranked sculpture with 3+ coordinated motions on a shared crankshaft |

### Week-by-week schedule

Reading abbreviations:
**Norton** = Norton, *Design of Machinery*, 6th ed. **U&P** = Uicker/Pennock/Shigley, *Theory of Machines and Mechanisms*. **McCarthy** = McCarthy & Soh, *Geometric Design of Linkages*, 2nd ed. (Springer IAM 11). **CMM** = Onn & Alexander, *Cabaret Mechanical Movement*, 2nd rev. ed. 2014 (ISBN 9780952872931). **Howell-HB** = Howell/Magleby/Olsen, *Handbook of Compliant Mechanisms* (Wiley). **Brown** = H. T. Brown, *507 Mechanical Movements*.

#### Quarter 1 — Planar Kinematics and the Four-Bar

**Wk 1 — Orientation, calibration, "mechanism mindset."** *Project:* tolerance gauge (hole/peg from 0.1–0.6 mm clearance) + a pivot test, to characterize your A1 Mini + PLA running fit (start from the rule: ~1× extrusion width for sliding, 2× for free-running). Print a 4-color AMS Lite test cube to characterize purge volumes for your filament set, and adopt the **standing color convention** (ground gray / crank red / coupler blue / rocker green / output yellow) for the rest of the year. *Theory:* pair types (R, P, C, G, H), kinematic chains, mobility intuition. *Reading:* Norton Ch. 1–2; CMM "Some Principles"; browse 507movements.com; one thang010146 video. *Tool:* install **OrcaSlicer** (recommended) or Bambu Studio for the A1 Mini; sign up for **Onshape Free** and complete the "Onshape Primer" learning path; install Linkage by David Rector (blog.rectorsquid.com). *Breakdown:* 1 h calibration + AMS test prints / 1 h Onshape intro / 1 h Norton / 1 h measurement + notebook setup. *Grounding:* the clearance number you derive IS the boundary condition for every revolute joint of the year.

**Wk 2 — Mobility: Gruebler/Kutzbach.** *Project:* three DOF puzzles (four-bar F=1, five-bar F=2, parallelogram as the textbook "exception"); print each in your color convention. *Theory:* F = 3(n−1) − 2j₁ − j₂; overconstraint. *Reading:* Norton §2.5–2.10; NPTEL noc20_me21 (Dasgupta) Week 1. *Tool:* Onshape Assembly mates (revolute, slider, planar, pin-slot, cylindrical, ball) — learn the full set in one sitting. *Grounding:* you *see* the Gruebler paradox in PLA.

**Wk 3 — Grashof and four-bar inversions.** *Project:* one base, swappable coupler/rocker sets for crank-rocker, double-crank, double-rocker. *Theory:* s + l ≤ p + q; transmission angle. *Reading:* Norton §2.13–2.14; CMM "Linkages"; thang010146 four-bar inversion playlist. *Tool:* Linkage Rector.

**Wk 4 — Position analysis: vector-loop and Freudenstein.** *Project:* crank-rocker with printed protractor; record θ₂→θ₃,θ₄ vs. closed form. *Theory:* r₂e^(iθ₂)+r₃e^(iθ₃)−r₄e^(iθ₄)−r₁=0; Freudenstein K-form. *Reading:* Norton Ch. 4; NPTEL noc20_me21 Week 2. *Tool:* Onshape parametric variables + driven dimensions.

**Wk 5 — Velocity I: instantaneous centers.** *Project:* four-bar with printed overlay marking the six I-centers; verify Kennedy collinearity. *Reading:* Norton Ch. 6 §6.1–6.5. *Tool:* GIM 2026.1 (ehu.eus/compmech/software — free educational, Windows) — live ICR and centrode display.

**Wk 6 — Velocity II: analytic.** *Project:* drive crank with marked hand wheel; measure ω₃, ω₄. *Reading:* Norton §6.6–6.10. *Tool:* SAM Mechanism Designer (artas.nl) — request trial license from inside the app. Plot ω₄/ω₂ vs. θ₂ in Python.

**Wk 7 — Acceleration and Coriolis.** *Project:* Scotch yoke with pen-on-slider + paper-strip "chart recorder" → sinusoidal trace. *Reading:* Norton Ch. 7.

**Wk 8 — Crank-slider; offset and quick-return.** *Project:* centric vs. offset slider-crank; measure time-ratio. *Reading:* Norton §2.11, §4.7; CMM "Cranks".

**Wk 9 — Whitworth quick-return.** *Project:* Whitworth demonstrator with output-ram scale. *Reading:* Norton "Some Useful Mechanisms".

**Wk 10 — Straight-line linkages I: Watt and Chebyshev.** *Project:* print both with coupler pens; overlay traces with theory. *Reading:* Norton Ch. 3; McCarthy Ch. 2.

**Wk 11 — Straight-line II: Peaucellier–Lipkin (exact).** *Project:* print 8-bar inversor (size each link to fit on a single 170×170 mm bed); verify truly straight pen trace. *Reading:* McCarthy Ch. 3; SolveSpace `ex-peaucellier.slvs` example (solvespace.com).

**Wk 12 — Coupler curves; Roberts–Chebyshev cognates.** *Project:* design a figure-8 coupler four-bar; pen-trace. *Reading:* Norton coupler atlas; McCarthy Ch. 5. *Tool:* Linkage Rector trace mode.

**Wk 13 — Q1 Capstone: Coupler-curve drawing automaton.** Mount Wk 12's figure-8 four-bar on a hand-cranked base with pen lift and paper holder; integrate Grashof check, position/velocity verification, transmission-angle ≥ 40°. Co-print frame and coupler in the standing color convention so the kinematics are legible across the room.

#### Quarter 2 — Cams, Gears, Intermittent Motion

**Wk 14 — Cam fundamentals; SVAJ.** *Project:* plate cam + roller follower with simple harmonic motion (SHM). *Reading:* Norton Ch. 8 §8.1–8.4; CMM "Cams"; thang010146 cam playlist. *Grounding:* the jerk discontinuity at the boundary is *audible*.

**Wk 15 — Polynomial/cycloidal cams; fundamental law.** *Project:* same rise specification printed three ways — SHM, cycloidal, 4-5-6-7 polynomial; tap-test for bounce. *Reading:* Norton §8.5–8.9; Norton *Cam Design and Manufacturing Handbook* 3rd ed. *Tool:* write your own Python cam DXF generator (recommended for an EE) or use Camnetics CamTrax trial.

**Wk 16 — Automaton cams: snail, heart, eccentric, pin.** *Project:* four cams on one shaft. *Reading:* CMM "Cams"; Peppé *Automata and Mechanical Toys* (Crowood 2002, ISBN 9781861265104, 160 pp.) section on scale patterns for ten fundamental mechanisms (cams, gears, pin-wheels, ratchets, Geneva). *Tool:* OpenSCAD. *Grounding:* the snail cam's sudden drop is the CMT trick for startle/comedic timing (Spooner uses it constantly).

**Wk 17 — Cam dynamics & "automaton scale."** *Project:* drive the cam stack with a flywheel; observe bounce reduction. *Reading:* Norton Ch. 16 overview; Bill Hammack engineerguy "Toy music box" video at engineerguy.com/videos.htm. *Tool:* Python RK4 mass-spring follower.

**Wk 18 — Spur gears; involute.** *Project:* module-2 spur pair (20–40 teeth) + rack; verify center distance +0.15–0.2 mm beyond nominal. Use the AMS Lite to print **PETG tooth crowns on PLA hubs** in one job — durability where it matters, stiffness elsewhere; spin-test 1000 cycles and inspect tooth flanks against an all-PLA control. *Reading:* Norton Ch. 9 §9.1–9.6. *Tool:* Onshape FeatureScript (community involute-gear scripts) or hessmer.org involute gear generator.

**Wk 19 — Gear trains.** *Project:* 3-stage compound spur reduction (~16:1) on a single back-plate driving a fan. *Reading:* Norton §9.7–9.10; thang010146 gear-train playlist. *Tool:* OpenSCAD MCAD `gears.scad`.

**Wk 20 — Planetary trains.** *Project:* 3-planet planetary; demonstrate ring/carrier/sun-fixed modes. *Theory:* Willis equation. *Reading:* Norton §9.11–9.13; Bill Hammack engineerguy "Quartz wristwatch" video.

**Wk 21 — Helical/herringbone.** *Project:* herringbone pair vs. Wk 18 spur pair. *Tool:* OpenSCAD `herringbone_gear()`.

**Wk 22 — Geneva mechanism.** *Project:* external 4-slot Geneva drive. *Theory:* β = (n−2)π/n; entry/exit at right angles. *Reading:* Norton "Some Useful Mechanisms"; Peppé Geneva scale-pattern section.

**Wk 23 — Ratchet and pawl.** *Project:* ratchet wheel + pivoted pawl + PLA-cantilever flexure spring. *Reading:* CMM "Ratchets"; Norton "Some Useful Mechanisms". *Grounding:* this is your only one-way energy gate — useful for windup capstones.

**Wk 24 — Drum/pin-cam ("mechanical ROM").** *Project:* 6-pin barrel-organ-style drum. *Reading:* CMM; Hammack "Toy music box" video. *Tool:* OpenSCAD. *Grounding:* for the EE — the drum is your ROM, the followers your latches.

**Wk 25 — Coordinated motion.** *Project:* 2-cam shaft phased for "look-up + nod". *Reading:* Peppé character-animation chapters; Dug North "Building the Boxes for Wood Automata" (cabaret.co.uk/building-the-boxes-for-wood-automata-dugs-tips-7/).

**Wk 26 — Q2 Capstone: Geneva-indexed cam turret.** Single hand crank → gear reduction → Geneva indexer → cam-driven plunger at each station. Three independent kinematic chains on one input.

#### Quarter 3 — Synthesis, Dynamics, Compliant + Walking

**Wk 27 — Graphical 2-position synthesis.** *Project:* four-bar by pole-and-perpendicular-bisector. *Reading:* Norton Ch. 3; McCarthy Ch. 3. *Tool:* Onshape sketch constraints.

**Wk 28 — Burmester 3-position synthesis.** *Project:* four-bar through three coupler "tray" positions. *Theory:* Burmester point pairs; center-point and circle-point curves; pole triangle. *Reading:* McCarthy Ch. 4–5; Norton §5.2–5.4. *Tool:* GIM dimensional-synthesis module — draws Burmester curves live. *Grounding:* Burmester feels inevitable once you've dragged a circle-point curve into a feasible region in GIM.

**Wk 29 — Analytical synthesis: Freudenstein.** *Project:* function-generator four-bar approximating y = log(x); Chebyshev-spaced precision points. *Reading:* Norton Ch. 5; NPTEL *Kinematics of Machines* (Mallik, 112104121) Module 6 on Chebyshev spacing. *Tool:* Python — solve 3 equations in K₁,K₂,K₃.

**Wk 30 — Coupler-curve synthesis.** *Project:* Hrones–Nelson atlas or GIM path-synthesis → "fish" coupler. *Reading:* Norton Ch. 5; McCarthy Ch. 6. *Tool:* GIM or MotionGen (motiongen.io free web).

**Wk 31 — Static force analysis.** *Project:* four-bar with printed spring scale; measure input torque. *Reading:* Norton Ch. 11 §11.1–11.6. *Tool:* SAM kinetostatic solver.

**Wk 32 — Virtual work.** *Project:* predict input torque via δW=0; bench-verify. *Reading:* MIT OCW 2.003SC (ocw.mit.edu/courses/2-003sc-engineering-dynamics-fall-2011/) virtual-work lecture; Norton §11.7. *Tool:* SymPy.

**Wk 33 — Dynamic force analysis.** *Project:* known printed mass on coupler; spin crank at increasing rates; observe torque amplification. *Reading:* Norton §11.8–11.12. *Tool:* Onshape mass properties; SAM dynamic mode. *Grounding:* PLA density (~1.24 g/cm³) is low enough that, for hand-cranked automata, inertial torques are typically ≈10× lower than static.

**Wk 34 — Balancing.** *Project:* counterweighted crank shaft; phone-accelerometer FFT of base vibration before/after. *Reading:* Norton Ch. 12 (moment-balancing of linkages, added in 2nd ed.). *Tool:* Phyphox + Python FFT.

**Wk 35 — Compliant mechanisms: PRBM + multi-material.** *Project:* **PLA-rigid + TPU-hinge gripper** printed in one shot on the AMS Lite (rigid jaws, soft pivot); compare actuation force and durability against an all-PLA living-hinge control printed the same week. *Theory:* pseudo-rigid-body model; flexure stiffness; how the Young's-modulus ratio between materials localizes the dominant rotation axis. *Reading:* Howell *Compliant Mechanisms* (Wiley 2001) Ch. 1–4; Howell-HB. *Tool:* FreeCAD FEM workbench (CalculiX backend) for stress comparison between the two designs, or hand-compute stiffness via PRBM equations. *Grounding:* this is the one week where Onshape's lack of free-tier FEA matters; FreeCAD's FEM workbench fills the gap.

**Wk 36 — Bistable compliant click.** *Project:* printed snap-action bistable. *Theory:* energy wells; over-center geometry. *Grounding:* the energy-well picture is your Schmitt-trigger plot.

**Wk 37 — Klann walking linkage.** *Project:* one Klann leg (size each link so the assembled leg fits in 170×170 mm; print framework as sub-assembly if needed); verify foot trajectory. *Reading:* Klann patent US 6,260,862; thang010146 walking playlist. *Tool:* Linkage Rector for the trajectory before printing.

**Wk 38 — Theo Jansen / Strandbeest.** *Project:* one Jansen leg (8 links/leg, sized to bed; using your Wk-1 clearance number). *Reading:* strandbeest.com leg-system page; Wright4TheJob desktop Strandbeest on printables.com/model/194176. *Tool:* OpenSCAD Jansen leg library. *Grounding:* Jansen's "holy numbers" came from a genetic algorithm — an early example of computational mechanism design.

**Wk 39 — Q3 Capstone: hand-cranked walker.** 4-leg Klann or Jansen on a single crankshaft with smoothing flywheel; phased legs (alternating tripod or diagonal pairs). Print the body as 2–3 sub-assemblies on the A1 Mini and bolt together. First build where robustness over many cycles matters as much as kinematic correctness.

#### Quarter 4 — Escapements, Screw Theory, CMT Capstone

**Wk 40 — Pendulum and timekeeping intro.** *Project:* compound pendulum on knife-edge pivot; measure T(amplitude). *Reading:* Norton dynamics review; Bill Hammack, *Albert Michelson's Harmonic Analyzer* (Articulate Noise Books) — described on engineerguy.com/books.htm as celebrating *"a nineteenth century mechanical calculator that performed Fourier analysis by using gears, springs and levers to calculate with sines and cosines."*

**Wk 41 — Verge + foliot escapement.** *Project:* crown wheel + verge staff + foliot weights. *Theory:* recoil escapement; impulse and locking phases; non-isochronous foliot. *Reading:* Jacques Favre YouTube (youtube.com/@jacquesfavre999) — strong reference on 3D-printed clock escapements.

**Wk 42 — Graham deadbeat escapement.** *Project:* deadbeat escape wheel + pallets integrated with Wk 40 pendulum. *Theory:* recoil vs. deadbeat; drop angle. *Reading:* watchmaking refs; thang010146 escapement playlist.

**Wk 43 — Runaway escapement / governor (optional).** *Project:* a Greg Zumwalt "runaway escapement" speed regulator from his Instructables catalog (instructables.com/member/gzumwalt/instructables/ — 248 Instructables, 1,999,620 views, 1,735 followers per the profile header as of May 2026). *Grounding:* many CMT automata use these to run long sequences at predictable speed from one wound spring.

**Wk 44 — Screw theory: one-week survey.** *Project:* print a 3-DOF universal joint toy. *Theory:* twists and wrenches; reciprocal screws; instantaneous-screw axis as 3D generalization of the I-center. *Reading:* McCarthy & Soh Ch. 7+ on spatial chains; arXiv 2501.06217 (Tuomela, Jan 2025) — skim only for flavor. *Tool:* GIM spatial module.

**Wk 45 — Capstone storyboard.** Pick one character, three coordinated motions, one punchline. Study Cabaret artist pages (cabaret.co.uk/artists): Paul Spooner, Peter Markey, Keith Newstead, Ron Fuller. *Reading:* Peppé storytelling chapters; **Coros, Thomaszewski, Noris, Sueda, Forberg, Sumner, Matusik & Bickel, "Computational Design of Mechanical Characters," ACM Trans. Graphics 32(4), SIGGRAPH 2013, DOI 10.1145/2461912.2461953** (PDF at ri.cmu.edu/pub_files/2013/0/CDMC_final.pdf). Disney did not release official code; community Python reimplementation: github.com/ofirbartal100/Mechanical_Characters. Plan the character/mechanism color split — mechanism in muted grays, character in 2–3 accent colors via AMS Lite.

**Wk 46–48 — Subsystem prototypes #1, #2, #3.** Build each motion standalone first (e.g., head nod via eccentric cam; arm wave via four-bar; turntable rotation via worm). Linkage Rector to confirm phase relationships. Each subsystem must fit on the A1 Mini bed as either a single print or a 2-part assembly.

**Wk 49 — Integration on a common crankshaft.** All three phased; hand crank with gear reduction (target: 1 rev = 1 full story cycle, output ~30–60 RPM). SAM kinetostatic verifies crank torque is comfortable (target <0.5 N·m).

**Wk 50 — Box and mounting.** Choose one: (a) Dug North's plywood-and-PLA hybrid box (recommended for "warm" CMT aesthetic), or (b) a **fully printed panelized box** — design each face as a separate ≤170×170 mm panel joined by printed corner brackets, co-printed in light gray frame + accent trim via AMS Lite for a more contemporary look. Either way, the back must stay open or removable to expose the mechanism (CMT signature).

**Wk 51 — Finishing and debugging.** CMT aesthetic: mechanism raw (or in the color convention), character painted on top of the multi-color print where finer detail is wanted. Tune crank effort.

**Wk 52 — Show, film, retrospect.** Film at 1× and 0.25×; write a 1-page retrospective and a "next year" list (spatial mechanisms, harmonic drive, clockwork, servo hybrids).

### Resource appendix

#### A. Books in priority order

1. **Norton, *Design of Machinery*, 6th ed.** (McGraw-Hill) — lynchpin textbook Q1–Q3.
2. **Onn & Alexander, *Cabaret Mechanical Movement: Understanding Movement and Making Automata*, 2nd rev. ed.** (Cabaret Mechanical Publishing, 2014; ISBN 9780952872931; 120 pp.). Chapters: Some Principles, Levers, Shafts, Cranks, Cams, Springs, Linkages, Ratchets, Drives & Gearing, Control, The Checklist.
3. **Peppé, *Automata and Mechanical Toys*** (Crowood, 2002; ISBN 9781861265104; 160 pp.) — 20+ artist profiles, scale patterns for ten fundamental mechanisms.
4. **Uicker/Pennock/Shigley, *Theory of Machines and Mechanisms*, 5th ed.** (Oxford) — second opinion on every Norton topic.
5. **McCarthy & Soh, *Geometric Design of Linkages*, 2nd ed.** (Springer IAM 11) — heavy mathematical synthesis; Q3 reference.
6. **Howell, *Compliant Mechanisms*** (Wiley, 2001) + **Howell/Magleby/Olsen, *Handbook of Compliant Mechanisms*** (Wiley) — Q3 Wks 35–36.
7. **Brown, *507 Mechanical Movements*** (Dover reprint of 1868) — idea browser; animated companion at 507movements.com.
8. **Norton, *Cam Design and Manufacturing Handbook*, 3rd ed.** — Q2.
9. **Erdman/Sandor/Kota, *Mechanism Design: Analysis and Synthesis*, 4th ed.** — alternative synthesis textbook.
10. **Hartenberg & Denavit, *Kinematic Synthesis of Linkages*** — origin of the DH convention.
11. **Roberts, *Mechanisms and Mechanical Devices Sourcebook*, 5th ed.** (McGraw-Hill) — encyclopedic.
12. **Reuleaux, *The Kinematics of Machinery*** (Dover) — historical foundation of modern mechanism theory.
13. **Spooner, *Spooner's Moving Animals*** (Virgin/Abrams, 1986, ISBN 0-86369-175-7) and **Spooner, *The Museum of the Mind*** — CMT aesthetic.
14. **Ives, *Making Paper Automata*** (Crowood) — gentle paper-automata intro before re-implementing in PLA.
15. **Hammack, *Albert Michelson's Harmonic Analyzer*** (Articulate Noise Books) — gear-spring-lever mechanical computing.

#### B. YouTube channels and lecture series

| Channel / Course | URL | Use for |
|---|---|---|
| **thang010146 (Nguyen Duc Thang)** | youtube.com/user/thang010146 — channel's own index lists 4,027 mechanism animations and 378,000 subscribers as of July 31, 2025 (per SPEAKRJ analytics indexing the mediafire 4000AMM.zip catalog) | Visual mechanism dictionary; browse for variants every week |
| **Henry Segerman** | youtube.com/@henryseg | Mathematically motivated 3D-printed mechanisms (screw/screw gearing, scissor mechanisms) |
| **Bill Hammack (engineerguy)** | youtube.com/@engineerguyvideo and engineerguy.com/videos.htm | Music box, quartz watch, IBM Selectric, harmonic analyzer, Apollo optical telescope, film projector |
| **Greg Zumwalt** | instructables.com/member/gzumwalt/instructables/ — "248 Instructables · 1,999,620 Views · 1,735 Followers" (profile header May 2026); video playlist youtube.com/playlist?list=PLlsggjgRAuDvCx1B2xF6zImJ-ZAr2qgkT | Most directly transferable PLA-automata resource in the world |
| **Maker's Muse (Angus Deveson)** | youtube.com/c/MakersMuse; makersmuse.com | Print-in-place mechanisms, technique |
| **Jacques Favre** | youtube.com/@jacquesfavre999 | 3D-printed clock escapements and tourbillons |
| **Wintergatan (Martin Molin)** | youtube.com/@Wintergatan | "Marble Machine" build-along; design thinking |
| **Matthias Wandel** | youtube.com/@matthiaswandel | Wood-mechanism focus; gear-train intuition |
| **Cabaret Mechanical Theatre** | cabaret.co.uk (artist pages + Dug North column) | CMT aesthetic; Dug North's woodworking tips translatable to PLA+plywood hybrids |
| **Dug North** | blog.dugnorth.com + his CMT column | Automaton workshop technique |
| **MIT OCW 2.72 *Elements of Mechanical Design*** | ocw.mit.edu/courses/2-72-elements-of-mechanical-design-spring-2009/ | Bearings, springs, gears, cams, mechanisms |
| **MIT OCW 2.003SC *Engineering Dynamics*** | ocw.mit.edu/courses/2-003sc-engineering-dynamics-fall-2011/ | Kinematics of rigid bodies; virtual work |
| **NPTEL *Kinematics of Mechanisms and Machines*** (Dasgupta) | onlinecourses.nptel.ac.in/noc20_me21 | 8-week course aligned to Q1–Q2 |
| **NPTEL *Kinematics of Machines*** (Mallik, 112104121) | nptel.ac.in/courses/112104121 | 15 modules incl. Chebyshev spacing, cam profiles, gear trains |
| **NPTEL *Mechanism and Robot Kinematics*** (noc20_me53) | onlinecourses.nptel.ac.in/noc20_me53 | Bridge to robotics in Q4 |
| **507movements.com** | 507movements.com | Animated companion to Brown's 1868 book |

#### C. Software toolchain (verified current as of May 2026)

| Tool | License | Source | Use |
|---|---|---|---|
| **Onshape Free** | Free; all documents public; 10-document / 100 MB private cap; non-commercial only | onshape.com | **Primary CAD**; assemblies/mates that map onto kinematic pairs; FeatureScript for parametric gears/cams; mass properties; cross-platform (browser) |
| **Autodesk Fusion (Personal Use)** | Free, 3-year renewable; per autodesk.com/products/fusion-360/personal: *"Autodesk Fusion for personal use is free online CAD for 3 years for qualifying non-commercial users. A hobbyist user must generate less than $1,000 USD in annual revenue."* A 10-active-editable-document cap was introduced October 2020 — verify the current cap. | autodesk.com/products/fusion-360/personal | Secondary CAD; **built-in basic FEA** for Wk 35; offline capability |
| **OrcaSlicer** (recommended) / **Bambu Studio** | Free / open source (OrcaSlicer is the open-source Bambu Studio fork) | github.com/SoftFever/OrcaSlicer / bambulab.com/en/download/studio | Slicing + AMS Lite color/material setup for the A1 Mini |
| **FreeCAD 1.x** | LGPL open source | freecad.org | Offline parametric; long-term STEP archive; **FEM workbench (CalculiX) for Wk 35** |
| **OpenSCAD** | Open source | openscad.org | Programmatic CAD; parametric cams/gears |
| **SolveSpace** | Open source | solvespace.com | Constraint-driven 2D/3D (Peaucellier) |
| **Linkage by David Rector** | Free Windows; latest 3.16 (Nov 2024) | blog.rectorsquid.com/linkage-mechanism-designer-and-simulator | 2D linkage simulator with coupler-curve trace |
| **GIM (UPV/EHU COMPMECH)** | Free educational; current 2026.1; Windows | ehu.eus/compmech/software | Planar/spatial kinematics; Burmester; ICRs; centrodes |
| **SAM Mechanism Designer (Artas)** | Trial requestable from inside the app | artas.nl/en/downloads | Motion + kinetostatic + optimization |
| **Camnetics CamTrax** | Free trial | camnetics.com | Cam-profile generator (alt. to Python) |
| **MotionGen** | Free web | motiongen.io | Quick four-bar synthesis in a browser |

#### D. Online communities

- **r/3Dprinting**, **r/functionalprint**, **r/mechanism**, **r/BambuLab** (Reddit).
- **Hackaday.io** projects; **hackaday.com/tag/automata**.
- **Printables.com**, **MakerWorld** (Bambu's first-party model platform — natively supports AMS Lite color profiles), and **MyMiniFactory** — large mechanism collections.
- **Cabaret Mechanical Theatre** Facebook page — header reads "32,946 likes · 383 talking about this. Mechanical is our middle name!" (facebook.com/CabaretMechanicalTheatre, May 2026 index).
- **Adafruit Discord** for general 3D-printed mechanism help.
- **IFToMM** open papers (iftomm.net) for the academically curious.

### Capstone project guidance (Weeks 45–52)

A CMT automaton has four signatures:

1. **Whimsy and narrative.** A character does something silly, tragic, or absurd. One-sentence story before any mechanism.
2. **Mechanism visible.** Box open at the back; crankshaft exposed. Spooner (Exploratorium feature): *"My work as an artist / mechanic amounts to a constant pursuit of elegance and simplicity. I haven't caught up with either yet because I don't know how to finish things. Except sometimes. And even then I'm not sure."*
3. **Hand-cranked.** A motor demystifies; a crank requires the viewer to invest energy.
4. **Small.** Mantelpiece scale fits the A1 Mini envelope natively (Spooner's pieces are typically small enough to fit on a mantelpiece, which is exactly what 180 mm of build volume produces).

Design sequence:

- **Wk 45 — Story:** one character, one situation, one punchline.
- **Specify motions:** three is the sweet spot. Each gets a *type* (rotary/translating/oscillating/intermittent) and a *period* in fractions of a crank cycle. Build a timing diagram.
- **Mechanism shortlist from your year's vocabulary:**
  - Slow nod/wave → eccentric cam
  - Sudden surprise → snail cam
  - Continuous slow turn → worm or high-ratio spur
  - Periodic step → Geneva
  - Repeated reach → four-bar (Burmester synthesis)
  - Walking → Klann/Jansen leg
  - One-shot/windup → ratchet + spring + escapement
- **Wks 46–48:** build each motion standalone first; SAM-verify peak torque; size every part to fit in a single A1 Mini job.
- **Wk 49:** integrate on one crankshaft; phase; add a flywheel only if necessary.
- **Wk 50:** Dug North plywood-and-PLA hybrid box, or printed panelized box (≤170×170 mm per panel) with AMS-coloured trim.
- **Wk 51:** mechanism raw or in standing color convention; character painted on top of multi-color base print.
- **Wk 52:** show, film, retrospect.

Failure modes (lessons from CMT artists):
- **Friction creep.** PLA-on-PLA bushings squeak under hundreds of cycles — a small dab of PTFE/silicone grease; brass bushings (M3-bore brass tube) at the highest-load joints.
- **Phase drift.** Friction-fit cams walk on shafts — use a flat or printed key/keyway.
- **Climbing crank effort.** Usually one joint went tight — diagnose link by link with the crank disconnected.

### Budget (USD, 2026)

| Category | Item | Cost |
|---|---|---|
| Filament | PLA assortment (4–5 colours) + 1 spool TPU for Wk 35 + AMS Lite purge allowance (~20%), ~4 kg total | $80–$130 |
| Hardware | Assorted M3 hardware starter set | $15 |
|  | M3 brass tube + 3 mm steel rod, 1 m each | $10 |
|  | Music wire (0.7 mm, 1.0 mm) | $10 |
|  | Springs assortment | $15 |
| Bearings (optional) | 608ZZ × 10 | $10 |
|  | MR105ZZ × 10 | $12 |
| Marbles | 16 mm steel × 50 | $15 |
| Hand tools | **Digital caliper (essential)** | $20 |
|  | Needle file set | $15 |
|  | Pin vise + 0.5–3 mm drill bits | $20 |
|  | Hobby knife + blades | $10 |
| Finishing | Acrylic paint set | $20 |
|  | Sandpaper assortment | $10 |
| Capstone box | 6 mm plywood, ~0.5 m² (if going hybrid; skip if going fully printed panelized) | $0–$20 |
| Optional | DC gearmotor + Arduino (motorized walker) | $25 |
| **Total** | | **$260–$340** |

Highest-value purchase: a **good digital caliper**. Every clearance decision in this curriculum depends on measuring at 0.05 mm resolution.

## Recommendations

1. **Start Week 1 by buying the caliper and Norton's *Design of Machinery* 6th ed., signing up for Onshape Free, and downloading OrcaSlicer, Linkage, and GIM 2026.1 the same day.** Do not start Week 1's project until you have these in hand; the project is precisely to measure your own printer's behavior, and you need both the caliper and Norton's Ch. 1–2 vocabulary first. **Threshold to change this:** if you cannot consistently achieve a ±0.1 mm dimensional accuracy on a 20 mm calibration cube on your A1 Mini by end of Week 1, defer Week 2 and re-run the A1 Mini's full auto-calibration suite (vibration compensation, flow rate, pressure advance) — every clearance decision afterward depends on this baseline.
2. **Buy *Cabaret Mechanical Movement* (Onn & Alexander, 2nd ed., £-priced through cabaret.co.uk) before Week 14**, when cams start. Order Peppé's *Automata and Mechanical Toys* (ISBN 9781861265104) before Week 16.
3. **Spend the first half hour of every weekly session on the timing diagram and SAM/Linkage simulation, not on CAD.** EEs naturally jump to detailed CAD; the consistent failure mode of self-taught mechanism designers is realizing during print that the mechanism *can't* move as intended. Treat SAM/Linkage as your "SPICE for mechanisms."
4. **At the end of each quarter, post the capstone video to one community (r/mechanism, Hackaday.io, MakerWorld, or Printables) and ask one specific question.** Onshape's public-by-default policy is a feature here: link to the live Onshape document alongside the printed result, and the community can poke at the assembly directly. Cheapest mechanism education available.
5. **Reserve four weeks of "slack" outside the schedule** for slipped weeks. Realistic completion is ~48 weeks of the planned 52 plus 4 weeks of catch-up. **Threshold to change the plan:** if you are more than two weeks behind by the end of Q2, drop Wks 21 (helical) and 24 (drum cam) — both are enrichment, not load-bearing, and the capstone does not depend on either.
6. **At Wk 26 (Q2 capstone) decide whether the Q4 capstone will use an escapement** — that decision controls Wk 41–43's depth. If you want pure CMT, an escapement is optional and can be replaced by a flywheel. If you want any timekeeping flavor, escapement weeks become load-bearing.
7. **After the year, the natural next step is screw theory and spatial mechanisms** — work through McCarthy Ch. 7+ and the MIT OCW 2.12 Introduction to Robotics. The Q4 screw-theory survey week is intentionally a tease, not a complete treatment.

## Caveats

- **Time discipline.** Four hours per week is realistic only if respected; Q3 walker weeks and Q4 capstone weeks genuinely benefit from 6–8 h sessions. Plan to compress easier weeks (e.g., Wk 9 Whitworth is shorter than Wk 39 walker) rather than skip ambitious ones.
- **Print queue.** The A1 Mini at typical 0.2 mm layer / ~300 mm/s prints most weekly mechanism parts in 30 min to 2 h, so design and print can usually fit in the same 4 h session. Multi-color prints with AMS Lite take longer due to purge cycles — plan around it.
- **AMS Lite purge waste.** Multi-color prints generate purge towers that waste filament — budget 15–30% extra filament for color-heavy weeks. Cluster prints of the same color set where possible; for high-color-change geometries (small parts, many changes per layer), consider whether the visual benefit justifies the waste, or single-color print parts and paint.
- **A1 Mini build volume.** 180×180×180 mm covers all weekly projects natively, but the Klann/Jansen walker (Wks 37–39) and the CMT capstone box (Wks 50–51) are designed from the outset as printable panels / sub-assemblies. Large flat panels are limited to ~170×170 mm useful area after margins.
- **PLA limits.** PLA creeps under sustained load and softens above ~55 °C. For the capstone, a wound spring left loaded for days will deform PLA — design to unload between sessions, or substitute PETG for spring-loaded parts (the AMS Lite makes mid-print material swaps trivial; one spool of PETG covers all spring-loaded use through the year).
- **CAD license drift.** Onshape Free's public-only policy and 10-document / 100 MB cap are unlikely to change in ways that affect a hobbyist, but the *non-commercial* restriction is enforced — if your hobby ever takes a commercial turn, plan to migrate or upgrade. Autodesk has changed Fusion's Personal Use terms multiple times (2014, 2020, 2023); the current 3-year free term and <$1,000 USD annual revenue threshold are confirmed via autodesk.com/products/fusion-360/personal (May 2026 fetch), but verify the current document cap before relying on it. Archive STEP exports of significant work in FreeCAD for perpetual offline access regardless of which primary you choose.
- **GIM 2026.1 is Windows-only;** SAM and Linkage Rector are also Windows-only. macOS/Linux users will need a Windows VM, dual-boot, or run under Wine — but with Onshape (browser-based) as primary CAD and OrcaSlicer (cross-platform) for slicing, your daily driver stays on your native OS.
- **The Disney "Computational Design of Mechanical Characters" software is not publicly released by Disney Research.** A community Python reimplementation exists (github.com/ofirbartal100/Mechanical_Characters) — treat it as a study aid for understanding the SIGGRAPH 2013 paper, not as a turnkey design tool.
- **"Press print and assemble" framing** in 3D-printing news posts does not deliver the depth of understanding this plan targets. Use such posts for parts catalogs and visual inspiration, not pedagogy.
- **Greg Zumwalt's library is heavily Fusion-360-based.** Most of his designs require minor adaptation of clearance and orientation when reprinted on a Bambu A1 Mini with OrcaSlicer — expect a calibration print of any new Zumwalt mechanism before printing the full assembly.
- **Channel and follower counts cited (thang010146 4,027 videos / 378k subs; Zumwalt 248 Instructables / 1.99M views / 1,735 followers; Cabaret FB 32,946 likes)** are point-in-time as of May 2026 and will drift; use them as rough scale indicators, not invariants.
