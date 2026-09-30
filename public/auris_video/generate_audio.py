import asyncio
import os
import sys
import json
import edge_tts

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "audio")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Define the script sections and their text
SECTIONS = [
    {
        "id": "section_01",
        "title": "Team Introduction",
        "time_range": "0:00 - 0:45",
        "text": """Namaste. Welcome to Smart India Hackathon 2026.

We are Team AURIS.

Our team brings together AI, computer vision, embedded systems, drone engineering and software development to solve one critical challenge in disaster response.

When disasters happen, rescue teams need more than aerial images.

They need to know where survivors may be, what hazards surround them, how confident that information is, and where the system should search next.

Our solution is AURIS — Autonomous Uncertainty-aware Rescue Intelligence System.

AURIS is designed around one simple principle:

Sense. Verify. Decide. Replan.

And this is our story."""
    },
    {
        "id": "section_02",
        "title": "Why This Problem",
        "time_range": "0:45 - 1:30",
        "text": """In a disaster, the environment changes faster than humans can safely understand it.

Roads may be flooded.

Buildings may collapse.

Smoke and darkness can hide survivors.

And communication infrastructure may become unreliable.

A normal camera can see only what is visible.

Thermal imaging can reveal heat signatures, but heat alone does not confirm a survivor.

Acoustic sensing can provide another clue, but drone rotor noise can interfere with human sounds.

LiDAR can understand surrounding geometry, but it cannot tell us everything that is hidden.

So the real challenge is not simply collecting more data.

The real challenge is deciding what that data means — and what the drone should do next.

That became the foundation of AURIS."""
    },
    {
        "id": "section_03",
        "title": "Research & Gap Analysis",
        "time_range": "1:30 - 2:15",
        "text": """We started our work with research.

We studied UAV-based search and rescue, thermal survivor detection, autonomous disaster search, acoustic localization, drone-noise suppression, next-best-view planning, edge AI and LiDAR-based spatial sensing.

Our research showed that these technologies can individually solve important parts of the rescue problem.

But an important engineering gap remains.

Different systems focus on detection, mapping, sensing or communication as separate capabilities.

We asked:

What happens when the evidence is incomplete or conflicting?

What happens when RGB sees nothing, thermal detects a weak heat signature, and acoustic sensing detects a possible human sound?

A simple detection system may stop at uncertainty.

We wanted our system to do something more.

We wanted uncertainty itself to become an input for the next decision."""
    },
    {
        "id": "section_04",
        "title": "Our Core Insight",
        "time_range": "2:15 - 2:50",
        "text": """This led us to one important insight.

A survivor not detected by one sensor does not mean the survivor is not there.

Not detected does not mean not present.

Imagine a survivor partially hidden behind rubble.

RGB provides weak evidence.

Thermal provides a possible heat signature.

Acoustic sensing provides another weak signal.

The evidence does not agree.

AURIS does not immediately declare a survivor — and it does not simply move on.

Instead, it asks:

What information do we need next?

It can reposition the drone, select a better viewpoint, re-inspect the area and gather additional evidence.

This is our core innovation:

Adaptive Rescue Intelligence."""
    },
    {
        "id": "section_05",
        "title": "Our Solution",
        "time_range": "2:50 - 3:40",
        "text": """To implement this idea, we designed AURIS as a multimodal edge-AI rescue platform.

The first layer is perception.

RGB provides visual information.

Thermal provides heat signatures.

The microphone array provides acoustic evidence.

LiDAR provides spatial information.

GPS and inertial sensing provide position and motion.

Gas sensing provides environmental anomaly information.

The second layer is edge intelligence.

Raspberry Pi 5 with AI acceleration performs local AI processing using Python, PyTorch and OpenCV.

The third layer is evidence fusion.

Instead of trusting one sensor, AURIS combines multiple sources of evidence.

The fourth layer is adaptive decision-making.

If the evidence is uncertain, the system does not simply stop.

It searches for a better viewpoint.

It remembers what has already been explored.

It considers risk, battery and communication state.

And it continuously updates the rescue mission.

The complete intelligence loop is:

Sense. Process. Fuse. Verify. Reinspect. Prioritize. Replan."""
    },
    {
        "id": "section_06_1",
        "title": "Physical Platform",
        "time_range": "3:40 - 4:15",
        "text": """This is our physical AURIS test platform.

The hexacopter integrates the flight controller, onboard computing, AI acceleration and multimodal sensors into a single aerial platform.

The flight controller manages the aircraft, while Raspberry Pi provides the onboard intelligence.

Our platform integrates RGB, thermal, LiDAR, optical flow, GPS, acoustic and environmental sensing capabilities."""
    },
    {
        "id": "section_06_2",
        "title": "Multimodal Perception",
        "time_range": "4:15 - 4:50",
        "text": """Now we move to perception.

The RGB pipeline searches for visual survivor and hazard candidates.

The thermal pipeline checks for heat signatures, especially in low-visibility environments.

The acoustic module analyzes sound direction and potential human distress signals while accounting for UAV noise.

LiDAR provides surrounding spatial information for obstacle awareness and local mapping.

Together, these sensors allow AURIS to see, sense, hear and understand its surroundings from multiple perspectives."""
    },
    {
        "id": "section_06_3",
        "title": "Uncertainty & Reinspection",
        "time_range": "4:50 - 5:40",
        "text": """Now comes the most important part of our demonstration.

AURIS identifies a possible survivor candidate.

But the evidence is uncertain.

The RGB confidence is moderate.

The thermal signal is stronger.

The acoustic signal is weak.

The system does not immediately confirm the survivor.

Instead, it identifies the area as uncertain.

It then selects a better viewpoint.

The drone repositions.

It gathers new visual, thermal and acoustic evidence.

The new evidence is stronger and more consistent.

The system can now increase its confidence in the candidate.

This is the difference between simply detecting something and intelligently verifying it."""
    },
    {
        "id": "section_06_4",
        "title": "Adaptive Mission & Dashboard",
        "time_range": "5:40 - 6:30",
        "text": """All of this intelligence is connected to our ground-station dashboard.

The operator can monitor the drone position, mission state, sensor information, detected candidates and surrounding hazards.

AURIS also considers operational constraints such as battery, communication state, search coverage and environmental risk.

So the drone does not simply follow a fixed route.

Its mission can adapt based on what it discovers.

If an area is confidently cleared, the drone can continue searching elsewhere.

If an area remains uncertain, it can return and gather more evidence.

This creates a continuous closed-loop rescue system:

Sense. Verify. Decide. Replan."""
    },
    {
        "id": "section_07",
        "title": "Innovation & Closing",
        "time_range": "6:30 - 7:15",
        "text": """AURIS is not just a drone with multiple sensors.

Its core innovation is Adaptive Rescue Intelligence.

First, Uncertainty-Aware Search — because not detected does not mean not present.

Second, Multi-Sensor Verification — combining RGB, thermal and acoustic evidence before increasing confidence.

Third, Next-Best-View Reinspection — gathering additional evidence when the current viewpoint is insufficient.

Fourth, Search Memory — remembering explored and uncertain areas to reduce redundant searching.

Fifth, Risk-Aware Mission Planning — considering hazards, battery, communication and mission priorities.

All these capabilities form one closed-loop intelligence system.

Because in a disaster, seeing everything is impossible.

But an intelligent system can decide what to look at next.

AURIS transforms uncertain sensor information into adaptive rescue decisions.

From detection…

to verification…

to decision…

and finally…

replanning.

AURIS — Autonomous Uncertainty-aware Rescue Intelligence System.

Sense. Verify. Decide. Replan.

We are Team AURIS.

Thank you."""
    }
]

DEFAULT_VOICE = "en-IN-PrabhatNeural"  # Professional Indian English male voice (crisp & confident)
# Alternative voices: "en-US-ChristopherNeural", "en-IN-NeerjaExpressiveNeural"

async def generate_section_audio(section, voice=DEFAULT_VOICE):
    sec_id = section["id"]
    text = section["text"]
    mp3_path = os.path.join(OUTPUT_DIR, f"{sec_id}.mp3")
    vtt_path = os.path.join(OUTPUT_DIR, f"{sec_id}.vtt")
    
    print(f"🎙️ Generating voiceover for: {section['title']} ({sec_id})...")
    
    communicate = edge_tts.Communicate(text, voice, rate="+2%", volume="+5%")
    submaker = edge_tts.SubMaker()
    
    with open(mp3_path, "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)
                
    with open(vtt_path, "w", encoding="utf-8") as file:
        file.write(submaker.get_srt())
        
    print(f"   ✅ Saved: {mp3_path}")
    return mp3_path

async def generate_full_master_audio(voice=DEFAULT_VOICE):
    full_text = "\n\n".join([f"--- {s['title']} ---\n\n" + s["text"] for s in SECTIONS])
    mp3_path = os.path.join(OUTPUT_DIR, "auris_full_voiceover.mp3")
    vtt_path = os.path.join(OUTPUT_DIR, "auris_full_voiceover.vtt")
    
    print("🎙️ Generating FULL Master Voiceover Audio...")
    clean_text = "\n\n".join([s["text"] for s in SECTIONS])
    communicate = edge_tts.Communicate(clean_text, voice, rate="+2%", volume="+5%")
    submaker = edge_tts.SubMaker()
    
    with open(mp3_path, "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)
                
    with open(vtt_path, "w", encoding="utf-8") as file:
        file.write(submaker.get_srt())
        
    print(f"   ✅ Master Voiceover Saved: {mp3_path}")
    
    # Also save manifest metadata for web video player
    manifest_path = os.path.join(OUTPUT_DIR, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(SECTIONS, f, indent=2)
    print(f"   ✅ Manifest Saved: {manifest_path}")

async def main():
    print("==================================================")
    print("🚀 AURIS — SIH 2026 Voice-Over Generator (Edge-TTS)")
    print(f"   Voice: {DEFAULT_VOICE}")
    print("==================================================")
    
    for sec in SECTIONS:
        await generate_section_audio(sec)
        
    await generate_full_master_audio()
    print("\n🎉 ALL AUDIO & SUBTITLE FILES GENERATED SUCCESSFULLY!\n")

if __name__ == "__main__":
    asyncio.run(main())
