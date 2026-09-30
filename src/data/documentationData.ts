export interface DocSection {
  id: string;
  number: number;
  title: string;
  category: string;
  iconName?: string;
  summary: string;
  contentHtml?: string;
  subsections?: {
    title: string;
    content: string;
  }[];
  keyTakeaways?: string[];
  citations?: {
    title: string;
    authors?: string;
    source: string;
    url: string;
    doi?: string;
    note?: string;
  }[];
}

export const DOCUMENTATION_CATEGORIES = [
  { id: 'overview', name: '1. Project Overview & Philosophy', range: [1, 5] },
  { id: 'intelligence', name: '2. Multimodal AI & Adaptive Intelligence', range: [6, 10] },
  { id: 'hardware', name: '3. Hardware, Avionics & Sensing', range: [11, 15] },
  { id: 'software', name: '4. Software Architecture & Algorithms', range: [16, 21] },
  { id: 'acoustics_edge', name: '5. Deep Innovations & Edge Modules', range: [22, 29] },
  { id: 'validation', name: '6. Roadmap, Testing & Evaluation', range: [30, 35] },
  { id: 'research_repo', name: '7. Research Foundation & Repository', range: [36, 38] },
];

export const RESEARCH_PAPERS = [
  {
    num: 1,
    domain: 'UAV Search & Rescue',
    principle: 'UAVs provide rapid deployment, mobility and aerial sensing for SAR missions.',
    citation: 'Quero & Martinez-Carranza, Unmanned aerial systems in search and rescue: A global perspective on current challenges and future applications, International Journal of Disaster Risk Reduction, 2025.',
    url: 'https://www.sciencedirect.com/science/article/pii/S2212420925000238',
    sourceLabel: 'ScienceDirect',
    edgeAction: 'Rapid aerial assessment and survivor/hazard search'
  },
  {
    num: 2,
    domain: 'Thermal Survivor Detection',
    principle: 'Thermal imaging supports human detection when RGB visibility is degraded by low illumination, smoke and partial occlusion.',
    citation: 'Tavasoli et al., Autonomous post-disaster indoor navigation and survivor detection using low-cost micro aerial vehicles, 2025. DOI: 10.1111/mice.13319',
    url: 'https://doi.org/10.1111/mice.13319',
    sourceLabel: 'Wiley Online Library',
    edgeAction: 'RGB + thermal cross-verification'
  },
  {
    num: 3,
    domain: 'Autonomous Disaster Search',
    principle: 'Autonomous UAV search can continue mission behavior when communication with a ground station is unavailable or degraded.',
    citation: 'Oh & Han, Smart Search System of Autonomous Flight UAVs for Disaster Rescue, Sensors, 2021. DOI: 10.3390/s21206810',
    url: 'https://doi.org/10.3390/s21206810',
    sourceLabel: 'MDPI Sensors',
    edgeAction: 'Offline-capable search and autonomous mission execution'
  },
  {
    num: 4,
    domain: 'Drone Acoustic Localization',
    principle: 'Microphone arrays and TDOA-based methods can estimate sound-source direction/location, while UAV ego-noise is a major challenge.',
    citation: 'Qayyum et al., DOANet: A deep neural network for acoustic localization of unmanned aerial vehicles, 2020. DOI: 10.1186/s13636-020-00184-2',
    url: 'https://doi.org/10.1186/s13636-020-00184-2',
    sourceLabel: 'Springer',
    edgeAction: 'Acoustic survivor-candidate localization'
  },
  {
    num: 5,
    domain: 'Rotor-Noise Suppression',
    principle: 'Rotor/motor state can be used as structured information for speech enhancement under strong UAV ego-noise.',
    citation: 'Gulli et al., Enhancing drone audition with rotor-conditioned deep models, 2025. DOI: 10.1186/s13636-025-00425-2',
    url: 'https://doi.org/10.1186/s13636-025-00425-2',
    sourceLabel: 'Springer',
    edgeAction: 'Rotor-aware acoustic preprocessing & motor-harmonic cancellation'
  },
  {
    num: 6,
    domain: 'Next-Best-View Planning',
    principle: 'Selecting better viewpoints can improve search coverage and visibility when targets are occluded.',
    citation: 'Strand et al., Enhancing UAV Search under Occlusion using Next Best View Planning, 2025.',
    url: 'https://arxiv.org/abs/2511.18353',
    sourceLabel: 'arXiv:2511.18353',
    edgeAction: 'Uncertainty-triggered reinspection & viewpoint optimization'
  },
  {
    num: 7,
    domain: 'Edge AI Inference',
    principle: 'Raspberry Pi AI HAT+ provides local hardware-accelerated neural-network inference on Raspberry Pi 5.',
    citation: 'Raspberry Pi AI HAT+ Technical Documentation & Architecture Specification, 2024.',
    url: 'https://www.raspberrypi.com/documentation/accessories/ai-hat-plus.html',
    sourceLabel: 'Raspberry Pi Official Docs',
    edgeAction: 'On-device perception & low-latency local inference (13/26 TOPS Hailo-8L)'
  },
  {
    num: 8,
    domain: 'LiDAR Spatial Sensing',
    principle: 'RPLIDAR A1 provides 360° 2D range scanning for spatial/obstacle information and altitude bounding.',
    citation: 'SLAMTEC RPLIDAR A1M8 360° Laser Range Scanner Technical Specifications, 2024.',
    url: 'https://www.slamtec.com/en/lidar/a1spec',
    sourceLabel: 'SLAMTEC Official',
    edgeAction: 'Local spatial awareness, obstacle avoidance, and void map verification'
  }
];

export const DOC_SECTIONS: DocSection[] = [
  {
    id: 'sec-1-home',
    number: 1,
    title: 'Home & Executive Summary',
    category: '1. Project Overview & Philosophy',
    summary: 'Master overview of AURIS: Autonomous Uncertainty-aware Rescue Intelligence System for disaster first response.',
    keyTakeaways: [
      'Disaster environments are uncertain, dynamic and perilous — aerial images alone are insufficient.',
      'Core Axiom: "Not detected ≠ Not present."',
      'Core Loop: SENSE → VERIFY → DECIDE → REPLAN',
      'Integrates RGB + Thermal + Acoustic + LiDAR + IMU with 13 TOPS Edge AI on a custom Hexacopter.'
    ]
  },
  {
    id: 'sec-2-problem-statement',
    number: 2,
    title: 'Problem Statement & Disaster Realities',
    category: '1. Project Overview & Philosophy',
    summary: 'The Golden Hours challenge in post-disaster environments (earthquakes, floods, landslides, collapses) and why basic camera drones fail.',
    keyTakeaways: [
      'Infrastructure collapse: damaged roads, toxic gas leaks, downed high-voltage lines, smoke, flooded pockets.',
      'Ground assessment is slow, hazardous, and puts first-responders at severe risk.',
      'The Core Engineering Problem: "How can an autonomous drone decide what to do when the available evidence is incomplete, contradictory, or uncertain?"'
    ]
  },
  {
    id: 'sec-3-existing-approach-gap',
    number: 3,
    title: 'Existing Approaches & 5 Critical Gaps',
    category: '1. Project Overview & Philosophy',
    summary: 'Detailed critique of standard drone surveillance systems and why the 1-way "Detect -> Report" pipeline breaks down in real disasters.',
    keyTakeaways: [
      'Limitation 1: Single Sensor Dependence (RGB fails in darkness, heavy smoke, and dust).',
      'Limitation 2: Detection Does Not Equal Confirmation (Heat hotspot ≠ living victim; noise ≠ survivor).',
      'Limitation 3: Occlusion & Line-of-Sight Blockage (Rubble slabs obscure fixed vantage points).',
      'Limitation 4: Search Redundancy (Pre-planned lawnmower paths waste battery repeating clear areas while uncertain spots are skipped).',
      'Limitation 5: Cloud/Comms Dependency (Disaster sites suffer total RF blackout and cellular tower destruction).'
    ]
  },
  {
    id: 'sec-4-proposed-solution',
    number: 4,
    title: 'Proposed Solution: AURIS Architecture',
    category: '1. Project Overview & Philosophy',
    summary: 'High-level multi-tiered architecture transforming raw multi-modal telemetry into actionable rescue intelligence on the edge.',
    keyTakeaways: [
      'Multimodal Sensor Array: RGB + LWIR Thermal + MEMS Microphone Array + RPLiDAR A1 + Gas Sensing.',
      'Onboard Edge-AI: Raspberry Pi 5 + Raspberry Pi AI HAT+ (13 TOPS Hailo-8L NPU).',
      'Closed-Loop Engine: Multi-sensor fusion, uncertainty assessment, risk weighting, and autonomous mission replanning.',
      'Offline-First Transmission: Resilient prioritized packet transmission over SIYI HM30 data link.'
    ]
  },
  {
    id: 'sec-5-core-innovation',
    number: 5,
    title: 'Core Innovation: Adaptive Rescue Intelligence',
    category: '1. Project Overview & Philosophy',
    summary: 'Why uncertainty itself is treated as a first-class mathematical variable that drives the next drone action.',
    keyTakeaways: [
      'Evolution from "Detect → Report" to "Detect → Assess → Verify → Reinspect → Prioritize → Replan".',
      'Search space is partitioned into Explored, Confidently Cleared, Potentially Occupied, and Uncertain / Needs Reinspection.',
      'Prevents false-negative conclusions when a survivor is partially concealed beneath debris.'
    ]
  },
  {
    id: 'sec-6-multisensor-fusion',
    number: 6,
    title: 'Multi-Sensor Evidence Fusion Matrix',
    category: '2. Multimodal AI & Adaptive Intelligence',
    summary: 'Exhaustive breakdown of sensor channels, roles, spectral bands, sample rates, and failure modes.',
    keyTakeaways: [
      'RGB Camera: High-res visual recognition (victims, structural cracks, fire perimeter).',
      'MLX90640 Thermal: 32x24 LWIR thermal matrix for detecting human body temperatures (36-38°C) through smoke/darkness.',
      'MEMS Microphone Array: Captures acoustic distress cries, whistling, pipe-knocking, and shouting.',
      'RPLIDAR A1M8: 360° 12m 2D LiDAR for obstacle geometry and structural voids.',
      'MiCS-6814 & TFMini: Environmental toxic gas detection and precision rangefinding.'
    ]
  },
  {
    id: 'sec-7-evidence-fusion-logic',
    number: 7,
    title: 'Evidence Fusion Logic & Decision Rules',
    category: '2. Multimodal AI & Adaptive Intelligence',
    summary: 'Bayesian evidence aggregation, confidence scoring, and multi-hypothesis arbitration.',
    keyTakeaways: [
      'High Confidence: RGB (✓) + Thermal (✓) + Acoustic (✓) → Immediate Geo-Tagged Alert & Priority Dispatch.',
      'Conflicting Evidence: RGB (?) + Thermal (✓) + Acoustic (?) → Trigger NBV Reinspection & Low-Altitude Hover.',
      'Insufficient Evidence: RGB (✗) + Thermal (?) + Acoustic (✗) → Update Probabilistic Search Memory grid to 0.40.'
    ]
  },
  {
    id: 'sec-8-next-best-view',
    number: 8,
    title: 'Next-Best-View (NBV) Reinspection Engine',
    category: '2. Multimodal AI & Adaptive Intelligence',
    summary: 'Autonomous calculation of alternative vantage points and orbital paths to disambiguate occluded scenes.',
    keyTakeaways: [
      'Analyzes geometric occlusion angles and local obstacle vectors via RPLiDAR.',
      'Computes optimal secondary viewpoint (offset angle, altitude, gimbal pitch) to maximize information gain.',
      'Executes smooth localized waypoint maneuvers via MAVLink companion control.'
    ]
  },
  {
    id: 'sec-9-search-memory',
    number: 9,
    title: 'Probabilistic Search Memory Grid',
    category: '2. Multimodal AI & Adaptive Intelligence',
    summary: 'Occupancy and observation-confidence mapping that records continuous information quality rather than binary visited flags.',
    keyTakeaways: [
      'Grid Confidence Values: 0.95 (Strongly Covered), 0.75 (Reasonably Covered), 0.40 (Uncertain), 0.10 (Barely Observed).',
      'Accounts for drone flight speed, camera FOV, smoke density, and viewing angles.',
      'Enables intelligent return missions to high-uncertainty areas once immediate hazards clear.'
    ]
  },
  {
    id: 'sec-10-risk-aware-planning',
    number: 10,
    title: 'Risk-Aware Mission Planning Engine',
    category: '2. Multimodal AI & Adaptive Intelligence',
    summary: 'Multi-objective path and task optimization considering environmental hazards and vehicle health.',
    keyTakeaways: [
      'Cost Function = f(Survivor Priority, Search Uncertainty, Environmental Risk, Battery State, Comm Link).',
      'Dynamic hazard avoidance: Maintains safe standoff distance from active flames, gas plumes, and electrical arcs.',
      'Contingency management: Automatically re-routes to home base or safe emergency LZ upon critical battery threshold (<20%).'
    ]
  },
  {
    id: 'sec-11-hardware-architecture',
    number: 11,
    title: 'Hardware Architecture & Hexacopter Platform',
    category: '3. Hardware, Avionics & Sensing',
    summary: 'Physical layout, propulsion, airframe specifications, and power distribution of the AURIS hexacopter.',
    keyTakeaways: [
      'Airframe: Custom 680mm carbon-fiber hexacopter with folding arms and vibration-isolated avionics deck.',
      'Propulsion: 6x 2216 880KV Brushless DC Motors with 10x4.5 carbon nylon propellers & 30A BLHeli_S ESCs.',
      'Avionics: Pixhawk 2.4.8 / Pixhawk 4 Autopilot with dual IMU, MS5611 barometer, and Neo-M8N GPS.',
      'Power: 4S 5200mAh 35C Li-Po Battery with dual 5V/5A + 12V/3A UBEC power distribution module.'
    ]
  },
  {
    id: 'sec-12-onboard-computing',
    number: 12,
    title: 'Onboard Edge Computing & Hailo-8L NPU',
    category: '3. Hardware, Avionics & Sensing',
    summary: 'Companion computer architecture running 13 TOPS dedicated neural acceleration for on-device inference.',
    keyTakeaways: [
      'Raspberry Pi 5 (Quad-Core ARM Cortex-A76 @ 2.4GHz) running Linux 64-bit real-time kernel.',
      'Raspberry Pi AI HAT+ featuring Hailo-8L Neural Processing Unit delivering 13 TOPS dedicated AI compute.',
      'Achieves <10ms inference latency for YOLOv8/YOLOv11 survivor models at full 30 FPS without cloud dependency.'
    ]
  },
  {
    id: 'sec-13-sensor-specifications',
    number: 13,
    title: 'Sensor Architecture & Detailed Technical Specs',
    category: '3. Hardware, Avionics & Sensing',
    summary: 'Complete component specifications, communication protocols (I2C, SPI, UART, USB), and sampling frequencies.',
    keyTakeaways: [
      'RGB: Sony IMX708 (12MP, 1080p60/4K30) via CSI-2 ribbon.',
      'Thermal: MLX90640 FIR Sensor (32x24 pixels, -40°C to 300°C range, 16Hz) via I2C.',
      'Acoustic: 4-Channel I2S MEMS Microphone Array with spatial circular geometry.',
      'LiDAR: SLAMTEC RPLIDAR A1M8 (360°, 12m radius, 5.5-10Hz scan rate, 8000 samples/sec) via UART/USB.',
      'Distance & Gas: Benewake TFMini Plus (0.1-12m) + MiCS-6814 Multi-Gas Sensor (CO, NO2, NH3).'
    ]
  },
  {
    id: 'sec-14-communication-architecture',
    number: 14,
    title: 'Communication Architecture & Offline Resilience',
    category: '3. Hardware, Avionics & Sensing',
    summary: 'Graceful network degradation model, local packet buffering, and bandwidth-adaptive telemetry.',
    keyTakeaways: [
      'Tier 1 (High Bandwidth): Full HD video stream + Real-time thermal overlay + Raw telemetry (10-20 Mbps).',
      'Tier 2 (Degraded Link): Compressed incident thumbnails + Geo-coordinates + Confidence breakdown (10-50 kbps).',
      'Tier 3 (Complete Blackout): 100% Onboard autonomous execution + Local Flash NVMe logging + Recovery failsafes.'
    ]
  },
  {
    id: 'sec-15-siyi-hm30-link',
    number: 15,
    title: 'SIYI HM30 Digital Video & Telemetry Link',
    category: '3. Hardware, Avionics & Sensing',
    summary: 'Long-range OFDM telemetry transceiver specifications, frequency hopping, and ground station link analysis.',
    keyTakeaways: [
      'Frequency: 5.1 - 5.8 GHz OFDM with adaptive frequency hopping.',
      'Transmission Range: Up to 30 km line-of-sight with dual high-gain directional antennas.',
      'Latency: Ultra-low 150ms glass-to-glass latency for simultaneous 1080p stream and MAVLink telemetry.'
    ]
  },
  {
    id: 'sec-16-software-architecture',
    number: 16,
    title: 'Software Architecture & Edge Tech Stack',
    category: '4. Software Architecture & Algorithms',
    summary: 'Onboard multi-threaded software stack, microservices, IPC pipelines, and Python/PyTorch runtime.',
    keyTakeaways: [
      'Edge AI Framework: Python 3.11, Hailo TAPPAS SDK / ONNX Runtime, PyTorch 2.3, OpenCV 4.9.',
      'Inter-Process Communication: FastDDS / ROS2 Humble micro-nodes and ZeroMQ pub/sub sockets.',
      'Companion Flight Bridge: MAVSDK-Python / pymavlink over high-speed serial UART @ 921600 baud.'
    ]
  },
  {
    id: 'sec-17-autopilot-software',
    number: 17,
    title: 'Drone Autopilot Software & PX4/MAVLink',
    category: '4. Software Architecture & Algorithms',
    summary: 'Flight state machine, autonomous fail-safes, geofencing, and companion computer override protocols.',
    keyTakeaways: [
      'PX4 Autopilot: Provides precision attitude control, EKF2 sensor fusion, and RTL (Return-to-Launch) failsafes.',
      'MAVLink Protocol: Bidirectional telemetry, waypoint injection, ROI (Region of Interest) targeting, and gimbal control.',
      'Companion Control: Offboard flight mode enabled dynamically during Next-Best-View maneuvers.'
    ]
  },
  {
    id: 'sec-18-ground-dashboard',
    number: 18,
    title: 'Ground Station Dashboard (MERN Stack)',
    category: '4. Software Architecture & Algorithms',
    summary: 'Tactical command center UI, real-time WebSockets telemetry feed, geospatial map plotting, and incident management.',
    keyTakeaways: [
      'Frontend: React 18 + TypeScript + Tailwind CSS + Lucide Icons + Three.js WebGL visualization.',
      'Backend: Node.js + Express REST/WebSocket gateway handling real-time telemetry packets.',
      'Database: MongoDB store for historical flight logs, victim incident cards, and geo-tagged sensor maps.'
    ]
  },
  {
    id: 'sec-19-system-architecture-diagram',
    number: 19,
    title: 'Complete Software Architecture Diagram',
    category: '4. Software Architecture & Algorithms',
    summary: 'End-to-end component interaction flow from physical sensors to ground rescue team dispatch.',
    keyTakeaways: [
      'Perception Service → Acoustic Service → Fusion Service → Localization Service.',
      'Search Memory Service ↔ Next-Best-View Planner ↔ Risk Engine ↔ Mission Manager.',
      'Sensor Scheduler & Communication Manager → Ground Dashboard & Responders.'
    ]
  },
  {
    id: 'sec-20-applied-algorithms',
    number: 20,
    title: 'Applied Algorithmic Modules (7 Key Algorithms)',
    category: '4. Software Architecture & Algorithms',
    summary: 'Mathematical formulations for YOLO detection, thermal thresholding, GCC-PHAT TDOA, Bayesian fusion, NBV entropy, and cost maps.',
    keyTakeaways: [
      'Algorithm 1: Real-time Multi-Class Visual Detection (YOLOv8-Nano / Hailo-8L optimized).',
      'Algorithm 2: Thermal Anomaly Clustering & Gradient Segmentation.',
      'Algorithm 3: Generalized Cross-Correlation with Phase Transform (GCC-PHAT) for Acoustic DOA.',
      'Algorithm 4: Multi-Modal Bayesian Evidence Fusion Matrix.',
      'Algorithm 5: Next-Best-View Information Gain Planner.',
      'Algorithm 6: Probabilistic Search Memory & Grid Occupancy.',
      'Algorithm 7: Multi-Factor Risk & Energy Cost Routing.'
    ]
  },
  {
    id: 'sec-21-core-intelligence-loop',
    number: 21,
    title: 'The Closed-Loop Intelligence Cycle',
    category: '4. Software Architecture & Algorithms',
    summary: 'Detailed step-by-step state machine: SENSE → PROCESS → FUSE → VERIFY → REINSPECT → PRIORITIZE → REPLAN → SENSE.',
    keyTakeaways: [
      'Transforms the drone from a passive video transmitter into an active scientific investigator.',
      'Never discards ambiguous data — converts ambiguity into deliberate reinspection tasks.',
      'Continuous recursive refinement of the disaster operational map.'
    ]
  },
  {
    id: 'sec-22-acoustic-survivor-detection',
    number: 22,
    title: 'Acoustic Survivor Detection & Array Processing',
    category: '5. Deep Innovations & Edge Modules',
    summary: 'Deep dive into 4-channel microphone array beamforming, TDOA sound localization, and human distress frequency recognition.',
    keyTakeaways: [
      'Audio Pipeline: Microphone Array → Raw Audio → Bandpass Filtering → Rotor Noise Suppression → GCC-PHAT DOA → Classifier.',
      'Detects vocal calls, screaming, rhythmic metal/concrete knocking, whistles (frequencies 300Hz - 3.5kHz).',
      'Serves as non-line-of-sight cue to steer camera gimbals toward rubble voids.'
    ]
  },
  {
    id: 'sec-23-motor-synchronized-filtering',
    number: 23,
    title: 'Motor-Synchronized Acoustic Rotor Filtering',
    category: '5. Deep Innovations & Edge Modules',
    summary: 'Using real-time ESC RPM telemetry as a reference signal for dynamic harmonic notch filtering of UAV rotor noise.',
    keyTakeaways: [
      'Problem: Hexacopter rotor blades generate dominant acoustic peaks at Blade Passing Frequencies (BPF) and harmonics.',
      'Innovation: ESC RPM feedback directly updates adaptive notch filter centers in real time.',
      'Improves Signal-to-Noise Ratio (SNR) by 12-18 dB for weak human voice signals.'
    ]
  },
  {
    id: 'sec-24-ground-station-hud',
    number: 24,
    title: 'Ground Station Operational UI & Telemetry HUD',
    category: '5. Deep Innovations & Edge Modules',
    summary: 'Layout and functional specifications of the tactical operator dashboard, video feeds, and mission controls.',
    keyTakeaways: [
      'Multi-modal viewports: Live RGB feed, false-color thermal heatmap, 2D LiDAR radar, 3D terrain viewer.',
      'Incident Manager: Interactive triage list showing geo-coordinates, confidence bars, and hazard alerts.',
      'Telemetry gauges: Altitude, battery percentage, motor current, GPS lock status, SIYI link RSSI.'
    ]
  },
  {
    id: 'sec-25-3d-digital-twin',
    number: 25,
    title: '3D Digital Twin Architecture & WebGL Engine',
    category: '5. Deep Innovations & Edge Modules',
    summary: 'Virtual twin implementation in Blender and Three.js for simulation, training, sensor frustum verification, and mission review.',
    keyTakeaways: [
      'Provides high-fidelity 3D replica of the 680mm hexacopter, sensors, disaster terrain, and victim models.',
      'Renders dynamic sensor cones (RGB FOV, Thermal FOV, LiDAR scanning plane, Acoustic DOA vectors).',
      'Enables risk-free validation of autonomous search algorithms and Next-Best-View logic.'
    ]
  },
  {
    id: 'sec-26-end-to-end-scenario',
    number: 26,
    title: 'End-to-End 10-Phase Rescue Scenario Walkthrough',
    category: '5. Deep Innovations & Edge Modules',
    summary: 'Chronological timeline of a complete urban disaster mission from initial deployment to survivor extraction.',
    keyTakeaways: [
      'Phase 1: Autonomous Grid Search → Phase 2: Weak RGB Detection → Phase 3: Acoustic Triangulation.',
      'Phase 4: Evidence Fusion triggers Reinspection → Phase 5: Next-Best-View Repositioning.',
      'Phase 6: Multi-sensor Verification → Phase 7: Geo-tagging & Hazard Assessment.',
      'Phase 8: Incident Card Creation → Phase 9: Prioritized Packet Transmission → Phase 10: Mission Resumption.'
    ]
  },
  {
    id: 'sec-27-sensor-scheduling',
    number: 27,
    title: 'Cognitive Sensor Scheduling & Energy Management',
    category: '5. Deep Innovations & Edge Modules',
    summary: 'Adaptive compute allocation that scales sensor sampling rates and AI inference frequency based on operational context.',
    keyTakeaways: [
      'Normal Patrol: RGB High (30 FPS), Thermal Low (4 Hz), Acoustic Low (16 kHz), LiDAR Normal (5 Hz).',
      'Candidate Detected: RGB High (30 FPS), Thermal High (16 Hz), Acoustic High (44.1 kHz), LiDAR High (10 Hz).',
      'Low Battery (<25%): Low-priority background compute halted; maximum power diverted to flight propulsion.'
    ]
  },
  {
    id: 'sec-28-explainable-evidence',
    number: 28,
    title: 'Explainable Rescue Evidence & Incident Packets',
    category: '5. Deep Innovations & Edge Modules',
    summary: 'Transparent, auditable evidence breakdown for first responders, avoiding "black-box" decision errors.',
    keyTakeaways: [
      'Detailed Incident Record: RGB Confidence + Thermal Gradient Score + Acoustic Bearing Agreement + Temporal Consistency.',
      'Surrounding Hazards: Proximity to live fires, downed high-voltage lines, toxic gas concentrations, and flood depth.',
      'Traversability Analysis: Recommends vehicle vs foot stretcher squad and safest entry corridor.'
    ]
  },
  {
    id: 'sec-29-survivor-response-estimation',
    number: 29,
    title: 'Survivor Response-State Estimation & Audio Protocol',
    category: '5. Deep Innovations & Edge Modules',
    summary: 'Two-way audio dialogue protocol to evaluate consciousness and vital responsiveness without medical diagnosis claims.',
    keyTakeaways: [
      'Automated voice prompt broadcast via onboard miniature loudspeaker during stabilized hover.',
      'Acoustic array listens for responsive vocal cues or rhythmic tapping.',
      'Tags survivor status as "Responsive", "Audibly Weak", or "Unconscious / Unresponsive" for rescue prioritization.'
    ]
  },
  {
    id: 'sec-30-prototype-roadmap',
    number: 30,
    title: 'Prototype Development Strategy (8 Phases)',
    category: '6. Roadmap, Testing & Evaluation',
    summary: 'Structured, de-risked engineering roadmap from benchtop assembly to autonomous field trials.',
    keyTakeaways: [
      'Phase 1: Core Platform Assembly (Frame, Pixhawk 4, RPi 5, Power).',
      'Phase 2: Baseline Perception & Onboard Detection.',
      'Phase 3: Probabilistic Search Memory & Coverage Mapping.',
      'Phase 4: Multi-Sensor Verification & Disagreement Handling.',
      'Phase 5: Acoustic Innovation (MEMS Array & Rotor Filtering).',
      'Phase 6: Next-Best-View Autonomous Repositioning.',
      'Phase 7: Full Mission Intelligence & Communication Adaptation.',
      'Phase 8: Comprehensive Field Validation & Benchmark Evaluation.'
    ]
  },
  {
    id: 'sec-31-feasibility-bom',
    number: 31,
    title: 'Feasibility, Bill of Materials (BOM) & Budget',
    category: '6. Roadmap, Testing & Evaluation',
    summary: 'Analysis of off-the-shelf component accessibility, commercial viability, and cost breakdown.',
    keyTakeaways: [
      'Accessible COTS Components: Standardized 2216 BLDC motors, Pixhawk 4, Raspberry Pi 5, Hailo NPU.',
      'Software Stack: Open-source foundations (PX4, ROS2, PyTorch, React, Node.js, MongoDB).',
      'Modular Maintenance: Fast field replacement of broken carbon arms, motor pods, or sensor modules.'
    ]
  },
  {
    id: 'sec-32-challenges-mitigations',
    number: 32,
    title: '10 Engineering Challenges & Mitigation Matrix',
    category: '6. Roadmap, Testing & Evaluation',
    summary: 'Technical challenges (rotor noise, smoke, occlusion, GPS dropouts, comm loss) and their exact solutions.',
    keyTakeaways: [
      'Rotor Noise → Motor-synchronized notch filtering + spatial beamforming.',
      'Low Visibility → Dual-spectrum RGB + LWIR Thermal cross-fusion.',
      'Rubble Occlusion → Next-Best-View (NBV) orbital reinspection.',
      'Sensor Disagreement → Multi-hypothesis Bayesian evidence arbitration.',
      'Communication Loss → Full onboard edge autonomy + local flash logging.'
    ]
  },
  {
    id: 'sec-33-testing-validation',
    number: 33,
    title: '5-Level Testing & Multi-Tier Validation Plan',
    category: '6. Roadmap, Testing & Evaluation',
    summary: 'Methodical verification methodology from sensor bench tests to simulated disaster exercises.',
    keyTakeaways: [
      'Level 1: Component Benchtop Calibration (Sensor noise floor, FPS, thermal accuracy).',
      'Level 2: AI Model Evaluation (Precision, Recall, mAP, NPU latency).',
      'Level 3: Sensor Fusion & Disagreement Scenarios (Synthetic conflicting cues).',
      'Level 4: Next-Best-View Occlusion Resolution (Physical rubble barrier tests).',
      'Level 5: Full Autonomous Mission Flight Trials in mock disaster environments.'
    ]
  },
  {
    id: 'sec-34-performance-metrics',
    number: 34,
    title: 'Performance Metrics & Scientific Grounding',
    category: '6. Roadmap, Testing & Evaluation',
    summary: 'Rigorous quantitative benchmarks for AI perception, compute latency, acoustic DOA, search coverage, and flight time.',
    keyTakeaways: [
      'AI Perception: Precision, Recall, F1-Score, mAP@0.5, False-Positive Rate.',
      'Edge Compute: Inference Latency (<10ms on Hailo-8L), FPS (30 FPS), CPU/NPU load.',
      'Acoustic: Direction of Arrival (DOA) error (<±8°), Signal-to-Noise Ratio (SNR) gain.',
      'Honest Claims: Final metrics must reflect measured experimental values rather than fabricated claims.'
    ]
  },
  {
    id: 'sec-35-operational-boundaries',
    number: 35,
    title: 'Operational Boundaries, Safety & Human Primacy',
    category: '6. Roadmap, Testing & Evaluation',
    summary: 'Clear demarcation of prototype limits, environmental constraints, and responder-in-the-loop governance.',
    keyTakeaways: [
      'System is an autonomous decision-support tool — ultimate rescue dispatch remains with human incident commanders.',
      'Environmental Constraints: Max sustained wind speed 10 m/s (not certified for cyclone winds without specialized airframe).',
      'Fail-safe Primacy: Hardware Geofence, Auto Return-to-Launch on low voltage or RC link loss.'
    ]
  },
  {
    id: 'sec-36-long-term-expansion',
    number: 36,
    title: 'Long-Term Expansion & Research Roadmap',
    category: '7. Research Foundation & Repository',
    summary: 'Future capabilities: Through-rubble FMCW radar, multi-UAV swarm search, satellite NTN links, and real-time digital twins.',
    keyTakeaways: [
      'Through-Rubble Sensing: Compact 24GHz FMCW / Ultra-Wideband (UWB) radar for deep subsurface detection.',
      'Multi-Drone Swarm Intelligence: Distributed coverage planning with peer-to-peer mesh networking.',
      'Satellite Comms: 5G Non-Terrestrial Network (NTN) uplink for remote wilderness SAR.'
    ]
  },
  {
    id: 'sec-37-research-foundation',
    number: 37,
    title: 'Research Foundation & Primary Citations',
    category: '7. Research Foundation & Repository',
    summary: 'Literature review establishing the scientific basis of each AURIS subsystem and direct paper links.',
    keyTakeaways: [
      'Explicitly distinguishes between established prior research and AURIS system-level integration.',
      'Covers UAV SAR, Thermal Detection, Acoustic Localization, Rotor Noise Suppression, and Next-Best-View Planning.',
      'Includes direct links to ScienceDirect, Wiley, MDPI, Springer, and arXiv publications.'
    ]
  },
  {
    id: 'sec-38-project-repository',
    number: 38,
    title: 'Project Repository & Codebase Structure',
    category: '7. Research Foundation & Repository',
    summary: 'Standardized monorepo directory organization, microservices map, and developer setup instructions.',
    keyTakeaways: [
      'Clean modular hierarchy: /edge-ai, /drone, /dashboard, /3d-digital-twin, /datasets, /experiments.',
      'Reproducible Docker containers and Python virtual environments.',
      'Single technical source of truth for SIH judges, researchers, and open-source contributors.'
    ]
  }
];
