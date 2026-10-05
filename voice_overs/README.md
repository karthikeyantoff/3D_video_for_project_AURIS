# 🎙️ AURIS Official Voice-Over Tracks (Smart India Hackathon 2026)

This directory contains all **8 sections of the official human voice-over** for the **AURIS (Autonomous Uncertainty-aware Rescue Intelligence System)** presentation, presented by **Team Nexus Forge** (Mentor: Dr. K Arun Kumar | Team Lead: Karthikeyan T).

---

## 🎧 Track List & Script Reference

### 1. Welcome & Team Introduction
* **Audio Files:** [`01_welcome_and_team_intro.ogg`](./01_welcome_and_team_intro.ogg) | [`01_welcome_and_team_intro.mp3`](./01_welcome_and_team_intro.mp3)
* **Duration:** ~31.65s
* **Script:**
  > “Namaste, and welcome to Smart India Hackathon 2026.  
  > We are Team Nexus Forge, guided by our mentor Dr. K Arun Kumar.  
  > I’m Karthikeyan T, Team Lead, along with Nandhakishore, Harish Rohith, Akilan, Keerthika, and Ananthi.  
  > Together, we combine AI, Computer Vision, Embedded Systems, Drone Technology, and Software Engineering to address a critical challenge in disaster response.  
  > This journey led us to AURIS — Autonomous Uncertainty-aware Rescue Intelligence System.  
  > Sense. Verify. Decide. Replan.”

---

### 2. Why This Problem (Disaster Response Crisis)
* **Audio Files:** [`02_why_this_problem.ogg`](./02_why_this_problem.ogg) | [`02_why_this_problem.mp3`](./02_why_this_problem.mp3)
* **Duration:** ~50.73s
* **Script:**
  > “In a disaster, every second matters.  
  > Floods can isolate people. Collapsed structures can hide survivors.  
  > Smoke, darkness, and debris can make visual detection difficult.  
  > And in many disaster zones, communication infrastructure may be unreliable.  
  > A conventional camera can show us what is visible. Thermal sensing can reveal heat signatures.  
  > Acoustic sensing can provide another clue. LiDAR can help us understand the surrounding environment.  
  > But no single sensor can provide the complete picture.  
  > The real challenge is not simply collecting more data.  
  > The real challenge is understanding that data, dealing with uncertainty, and deciding what the drone should do next.  
  > This is where our idea begins.  
  > AURIS is designed not just to detect — but to understand, verify, and adapt.”

---

### 3. Research & Gap Analysis
* **Audio Files:** [`03_research_and_gap_analysis.ogg`](./03_research_and_gap_analysis.ogg) | [`03_research_and_gap_analysis.mp3`](./03_research_and_gap_analysis.mp3)
* **Duration:** ~50.87s
* **Script:**
  > “Before building AURIS, we started with research.  
  > We studied UAV-based search and rescue, thermal survivor detection, autonomous disaster search, acoustic localization, drone-noise suppression, next-best-view planning, edge AI, and LiDAR-based spatial sensing.  
  > These technologies already provide powerful capabilities for different parts of disaster response.  
  > But we identified an important gap.  
  > Detection, sensing, mapping, and communication are often treated as separate capabilities.  
  > So we asked a simple question: What happens when the evidence is incomplete or conflicting?  
  > What if the RGB camera sees nothing, while thermal detects a possible heat signature, and acoustic sensing detects a weak human sound?  
  > A detection-only system may stop at uncertainty.  
  > We wanted uncertainty to become an input for the next decision.  
  > And that became the foundation of AURIS.”

---

### 4. Our Core Insight ("Not Detected ≠ Not Present")
* **Audio Files:** [`04_our_core_insight.ogg`](./04_our_core_insight.ogg) | [`04_our_core_insight.mp3`](./04_our_core_insight.mp3)
* **Duration:** ~44.27s
* **Script:**
  > “This research led us to one important insight.  
  > Not detected does not mean not present.  
  > Imagine a survivor partially hidden behind rubble. The RGB camera may provide weak visual evidence.  
  > Thermal sensing may detect a possible heat signature. Acoustic sensing may provide another weak signal.  
  > But the evidence may not agree.  
  > AURIS does not immediately declare a survivor. And it does not simply move on.  
  > Instead, it asks: What information do we need next?  
  > The drone can reposition itself, select a better viewpoint, re-inspect the area, and gather additional evidence.  
  > This transforms uncertainty from a limitation into a decision-making input.  
  > And this is the core innovation of AURIS — Adaptive Rescue Intelligence.”

---

### 5. Our Solution Architecture
* **Audio Files:** [`05_our_solution_architecture.ogg`](./05_our_solution_architecture.ogg) | [`05_our_solution_architecture.mp3`](./05_our_solution_architecture.mp3)
* **Duration:** ~71.91s
* **Script:**
  > “To turn this idea into reality, we designed AURIS as a multimodal edge-AI rescue platform.  
  > The first layer is perception. RGB provides visual information. Thermal sensing provides heat signatures. The microphone array provides acoustic evidence. LiDAR provides spatial information. GPS and inertial sensing provide position and motion information. Gas sensing provides environmental anomaly information.  
  > The second layer is edge intelligence. Our Raspberry Pi 5, supported by AI acceleration, performs local processing using Python, PyTorch, and OpenCV.  
  > The third layer is evidence fusion. Instead of depending on a single sensor, AURIS combines information from multiple sources.  
  > The fourth layer is adaptive decision-making. When the evidence is uncertain, the system does not simply stop. It can search for a better viewpoint, remember what has already been explored, and consider factors such as risk, battery, and communication state.  
  > The mission can then adapt based on what the system discovers.  
  > Our complete intelligence loop is: Sense. Process. Fuse. Verify. Reinspect. Prioritize. Replan.”

---

### 6. Prototype & Intelligence Demonstration
* **Audio Files:** [`06_prototype_and_intelligence_demo.ogg`](./06_prototype_and_intelligence_demo.ogg) | [`06_prototype_and_intelligence_demo.mp3`](./06_prototype_and_intelligence_demo.mp3)
* **Duration:** ~89.43s
* **Script:**
  > “Now, let us move from the concept to our prototype.  
  > This is our physical AURIS test platform — a hexacopter integrating flight control, onboard computing, AI acceleration, and multimodal sensing.  
  > At the core, the Pixhawk flight controller manages the aircraft, while the Raspberry Pi 5 provides onboard computing and AI capabilities.  
  > Our platform brings together RGB, thermal, LiDAR, optical flow, GPS, acoustic, and environmental sensing.  
  > Now, let us see how these capabilities work together.  
  > The RGB pipeline searches for visual survivor and hazard candidates.  
  > The thermal pipeline provides additional heat-signature evidence, especially in low-visibility conditions.  
  > The acoustic module analyzes potential human sounds while accounting for the challenge of UAV rotor noise.  
  > LiDAR provides spatial information for obstacle awareness and local environmental understanding.  
  > Together, these sensing systems allow AURIS to see, sense, hear, and understand its surroundings from multiple perspectives.  
  > But the most important part comes next.  
  > AURIS identifies a possible survivor candidate, but the available evidence is uncertain.  
  > Instead of immediately confirming the candidate or ignoring the location, AURIS marks the area for further investigation.  
  > It can then select a better viewpoint, reposition the drone, and gather additional evidence.  
  > The new observations are evaluated together with the previous evidence.  
  > This is where our system moves beyond simple detection — from detecting a possibility to intelligently verifying it.”

---

### 7. Adaptive Mission & Ground Station Dashboard
* **Audio Files:** [`07_adaptive_mission_and_dashboard.ogg`](./07_adaptive_mission_and_dashboard.ogg) | [`07_adaptive_mission_and_dashboard.mp3`](./07_adaptive_mission_and_dashboard.mp3)
* **Duration:** ~52.15s
* **Script:**
  > “The intelligence does not stop at verification.  
  > All the information is connected to our ground-station dashboard, where the operator can monitor the drone position, mission state, sensor observations, detected candidates, and surrounding hazards.  
  > AURIS also considers operational factors such as battery status, communication state, search coverage, and environmental risk.  
  > This means the drone is not limited to following one fixed route.  
  > If an area has been sufficiently explored, the system can continue searching elsewhere.  
  > If an area remains uncertain, it can prioritize that location for further investigation.  
  > The mission therefore adapts according to the information gathered during the search.  
  > This creates a continuous closed-loop rescue process: Sense. Verify. Decide. Replan.  
  > And that is how AURIS transforms sensor observations into actionable rescue intelligence.”

---

### 8. Innovation Pillars & Closing
* **Audio Files:** [`08_innovation_pillars_and_closing.ogg`](./08_innovation_pillars_and_closing.ogg) | [`08_innovation_pillars_and_closing.mp3`](./08_innovation_pillars_and_closing.mp3)
* **Duration:** ~77.85s
* **Script:**
  > “AURIS is not just a drone with multiple sensors.  
  > Its core innovation is Adaptive Rescue Intelligence.  
  > First — Uncertainty-Aware Search. Because not detected does not mean not present.  
  > Second — Multi-Sensor Verification. RGB, thermal, and acoustic evidence are combined to strengthen the assessment of a potential survivor.  
  > Third — Next-Best-View Reinspection. When the current viewpoint is insufficient, AURIS can gather additional evidence from a better position.  
  > Fourth — Search Memory. The system keeps track of explored and uncertain areas to support more informed searching.  
  > Fifth — Risk-Aware Mission Planning. Mission decisions can consider hazards, battery, communication, and search priorities.  
  > Together, these capabilities form one continuous closed-loop intelligence system.  
  > Because in a disaster, seeing everything is impossible. But an intelligent system can decide what to look at next.  
  > AURIS transforms uncertain sensor information into adaptive rescue decisions.  
  > From detection… to verification… to decision… and finally… replanning.  
  > This is AURIS — Autonomous Uncertainty-aware Rescue Intelligence System.  
  > Sense. Verify. Decide. Replan.  
  > We are Team Nexus Forge.  
  > Thank you.”
