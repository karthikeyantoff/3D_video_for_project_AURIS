import os
import sys
from PIL import Image, ImageDraw, ImageFont

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

output_dir = r"d:\drone\auris_video\slides"
os.makedirs(output_dir, exist_ok=True)

W, H = 1920, 1080

def get_font(size, bold=False):
    font_names = [
        "C:\\Windows\\Fonts\\segoeuib.ttf" if bold else "C:\\Windows\\Fonts\\segoeui.ttf",
        "C:\\Windows\\Fonts\\arialbd.ttf" if bold else "C:\\Windows\\Fonts\\arial.ttf",
        "C:\\Windows\\Fonts\\consola.ttf"
    ]
    for fn in font_names:
        if os.path.exists(fn):
            try:
                return ImageFont.truetype(fn, size)
            except Exception:
                pass
    return ImageFont.load_default()

font_hero = get_font(72, bold=True)
font_title = get_font(46, bold=True)
font_subtitle = get_font(28, bold=False)
font_heading = get_font(24, bold=True)
font_body = get_font(20, bold=False)
font_small = get_font(16, bold=False)
font_tag = get_font(14, bold=True)

def draw_header_and_footer(draw, section_num, section_title, tag_text="SMART INDIA HACKATHON 2026 • HARDWARE EDITION"):
    # Header bar
    draw.rectangle([0, 0, W, 70], fill=(11, 17, 31, 255))
    draw.line([0, 70, W, 70], fill=(0, 240, 255, 100), width=2)
    
    # AURIS Logo
    draw.ellipse([30, 22, 50, 42], fill=(0, 240, 255))
    draw.text((60, 16), "AURIS", font=get_font(28, bold=True), fill=(0, 240, 255))
    draw.rectangle([165, 20, 245, 48], outline=(0, 240, 255, 150), width=1)
    draw.text((175, 24), "SIH 2026", font=font_tag, fill=(0, 240, 255))
    
    # Tag
    draw.text((270, 24), f"TEAM NEXUS FORGE • MENTOR: DR. K ARUN KUMAR", font=font_small, fill=(148, 163, 184))
    
    # Right telemetry
    draw.text((W - 550, 22), "CORE LOOP: SENSE • VERIFY • DECIDE • REPLAN", font=font_tag, fill=(255, 214, 0))
    draw.text((W - 190, 22), "13.2 TOPS NPU", font=font_tag, fill=(0, 255, 102))

    # Footer bar
    draw.rectangle([0, H - 60, W, H], fill=(11, 17, 31, 255))
    draw.line([0, H - 60, W, H - 60], fill=(0, 240, 255, 100), width=2)
    draw.text((40, H - 42), f"SECTION {section_num}: {section_title.upper()}", font=font_tag, fill=(0, 240, 255))
    draw.text((W - 480, H - 42), "AURIS: AUTONOMOUS UNCERTAINTY-AWARE RESCUE INTELLIGENCE", font=font_tag, fill=(148, 163, 184))

def draw_hud_box(draw, x1, y1, x2, y2, bg=(18, 26, 45, 230), border=(0, 240, 255, 90)):
    draw.rectangle([x1, y1, x2, y2], fill=bg, outline=border, width=1)
    # Corner brackets
    cs = 10
    draw.line([x1, y1, x1 + cs, y1], fill=(0, 240, 255), width=2)
    draw.line([x1, y1, x1, y1 + cs], fill=(0, 240, 255), width=2)
    draw.line([x2, y1, x2 - cs, y1], fill=(0, 240, 255), width=2)
    draw.line([x2, y1, x2, y1 + cs], fill=(0, 240, 255), width=2)
    draw.line([x1, y2, x1 + cs, y2], fill=(0, 240, 255), width=2)
    draw.line([x1, y2, x1, y2 - cs], fill=(0, 240, 255), width=2)
    draw.line([x2, y2, x2 - cs, y2], fill=(0, 240, 255), width=2)
    draw.line([x2, y2, x2, y2 - cs], fill=(0, 240, 255), width=2)

# ==========================================
# SLIDE 1: TEAM INTRODUCTION
# ==========================================
def create_slide_01():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "01", "Team Introduction")
    
    # Left Hero Box
    draw_hud_box(draw, 100, 130, 1150, 940)
    draw.text((150, 170), "SMART INDIA HACKATHON 2026", font=font_tag, fill=(0, 240, 255))
    draw.text((150, 210), "AURIS", font=font_hero, fill=(0, 240, 255))
    draw.text((150, 310), "Autonomous Uncertainty-aware Rescue Intelligence System", font=font_subtitle, fill=(241, 245, 249))
    
    # Team Box
    draw.rectangle([150, 380, 1100, 560], fill=(14, 22, 38), outline=(0, 240, 255, 60), width=1)
    draw.text((180, 400), "TEAM NEXUS FORGE", font=font_heading, fill=(255, 214, 0))
    draw.text((180, 440), "Mentor: Dr. K Arun Kumar", font=font_body, fill=(255, 255, 255))
    draw.text((180, 475), "Team Lead: Karthikeyan T", font=font_body, fill=(0, 240, 255))
    draw.text((180, 510), "Members: Nandhakishore • Harish Rohith • Akilan • Keerthika • Ananthi", font=font_small, fill=(203, 213, 225))
    
    # Core Loop Box
    draw.rectangle([150, 600, 1100, 750], fill=(14, 22, 38), outline=(255, 214, 0, 60), width=1)
    draw.text((180, 620), "CORE RESCUE LOOP", font=font_tag, fill=(255, 214, 0))
    draw.text((180, 660), "SENSE  ➔  VERIFY  ➔  DECIDE  ➔  REPLAN", font=font_title, fill=(255, 255, 255))
    draw.text((180, 715), "From Passive Aerial Detection  ➔  Adaptive Rescue Intelligence", font=font_small, fill=(0, 240, 255))

    # Right Info Panel
    draw_hud_box(draw, 1200, 130, 1820, 940)
    draw.text((1240, 170), "SYSTEM CREDENTIALS", font=font_heading, fill=(0, 240, 255))
    
    specs = [
        ("DOMAIN", "Edge AI + USAR Hexacopter"),
        ("COMPUTE", "Raspberry Pi 5 + AI HAT+ (13.2 TOPS)"),
        ("AVIONICS", "Pixhawk 2.4.8 Autopilot (ArduCopter)"),
        ("PERCEPTION", "RGB + Thermal + LiDAR + Acoustic"),
        ("TARGET", "Urban Search & Rescue (USAR)"),
        ("MISSION", "Zero False-Negative Survivor Recovery")
    ]
    y = 230
    for title, val in specs:
        draw.text((1240, y), title, font=font_tag, fill=(148, 163, 184))
        draw.text((1240, y + 22), val, font=font_body, fill=(255, 255, 255))
        y += 85
        
    img.save(os.path.join(output_dir, "slide_01.png"))
    print("Generated slide_01.png")

# ==========================================
# SLIDE 2: WHY THIS PROBLEM MATTERS
# ==========================================
def create_slide_02():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "02", "Why This Problem Matters")
    
    # Title
    draw.text((100, 110), "IN A DISASTER, EVERY SECOND MATTERS", font=font_title, fill=(255, 107, 0))
    draw.text((100, 175), "Floods • Collapsed Structures • Smoke & Darkness • Severed Communications", font=font_subtitle, fill=(203, 213, 225))
    
    # 4 Sensor Limit Boxes
    boxes = [
        ("RGB OPTICAL CAMERA", "BLIND IN SMOKE", "Can show only daylight surface.\nBlocked by smoke, dust, darkness, and structural concrete rubble.", (0, 240, 255)),
        ("THERMAL FIR ARRAY", "HEAT ≠ SURVIVOR", "Reveals heat signatures.\nHowever, hot machinery, engines, and solar-heated metal cause false alarms.", (255, 107, 0)),
        ("ACOUSTIC MEMS ARRAY", "ROTOR NOISE INTERFERENCE", "Provides acoustic distress cues.\nHowever, UAV propeller wash and motor harmonics mask human cries.", (255, 214, 0)),
        ("3D LIDAR SCANNER", "GEOMETRY ONLY", "Maps surrounding 3D geometry.\nHowever, geometry alone cannot reveal who is trapped inside voids.", (0, 255, 102))
    ]
    
    x = 100
    for title, subtitle, desc, col in boxes:
        draw_hud_box(draw, x, 240, x + 395, 660)
        draw.text((x + 25, 270), title, font=font_heading, fill=col)
        draw.text((x + 25, 310), subtitle, font=font_tag, fill=(244, 63, 94))
        draw.multiline_text((x + 25, 360), desc, font=font_body, fill=(226, 232, 240), spacing=8)
        x += 435

    # Bottom Callout Box
    draw_hud_box(draw, 100, 700, 1820, 940, bg=(20, 15, 30))
    draw.text((140, 730), "THE FUNDAMENTAL RESCUE CHALLENGE", font=font_tag, fill=(244, 63, 94))
    draw.text((140, 770), "The challenge is NOT simply collecting more data.", font=font_title, fill=(255, 255, 255))
    draw.text((140, 835), "The challenge is understanding data, dealing with uncertainty, and deciding what the drone should do next.", font=font_subtitle, fill=(255, 214, 0))
    draw.text((140, 885), "DETECTION ≠ DECISION", font=font_heading, fill=(0, 240, 255))

    img.save(os.path.join(output_dir, "slide_02.png"))
    print("Generated slide_02.png")

# ==========================================
# SLIDE 3: RESEARCH & GAP ANALYSIS
# ==========================================
def create_slide_03():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "03", "Research & Gap Analysis")
    
    draw.text((100, 110), "STATE OF THE ART VS. AURIS ENGINEERING EXTENSION", font=font_title, fill=(0, 240, 255))
    draw.text((100, 175), "We studied 8 specialized domains in UAV disaster search and rescue:", font=font_subtitle, fill=(203, 213, 225))
    
    domains = [
        ("01", "UAV SAR Operations", "Aerial coverage & flight paths"),
        ("02", "Thermal Detection", "FIR radiometric human heatmaps"),
        ("03", "Acoustic Localization", "Beamforming distress cries"),
        ("04", "Noise Suppression", "Spectral subtraction of rotor wash"),
        ("05", "Next-Best-View (NBV)", "Active viewpoint optimization"),
        ("06", "Edge AI Acceleration", "Hailo-8 / NPU local inference"),
        ("07", "3D LiDAR Sensing", "Laser spatial obstacle clearance"),
        ("08", "Evidence Fusion", "Probabilistic multi-sensor fusion")
    ]
    
    for i, (num, name, desc) in enumerate(domains):
        r = i // 4
        c = i % 4
        bx = 100 + c * 435
        by = 240 + r * 200
        draw_hud_box(draw, bx, by, bx + 400, by + 170)
        draw.text((bx + 20, by + 20), f"DOMAIN {num}", font=font_tag, fill=(0, 240, 255))
        draw.text((bx + 20, by + 50), name, font=font_heading, fill=(255, 255, 255))
        draw.text((bx + 20, by + 90), desc, font=font_small, fill=(148, 163, 184))

    # Gap vs Solution
    draw_hud_box(draw, 100, 680, 930, 940, bg=(30, 15, 20))
    draw.text((130, 710), "✖  THE EXISTING SYSTEM GAP", font=font_heading, fill=(244, 63, 94))
    draw.multiline_text((130, 760), "Detection, sensing, mapping, and communication are treated as separate capabilities.\nWhen evidence is incomplete or conflicting, conventional systems stop at uncertainty.", font=font_body, fill=(226, 232, 240), spacing=8)

    draw_hud_box(draw, 980, 680, 1820, 940, bg=(15, 30, 35))
    draw.text((1010, 710), "✔  THE AURIS CLOSED-LOOP INNOVATION", font=font_heading, fill=(0, 240, 255))
    draw.multiline_text((1010, 760), "We connect these capabilities into a closed rescue loop.\nUncertainty itself becomes an input for the next flight decision — repositioning to verify.", font=font_body, fill=(226, 232, 240), spacing=8)

    img.save(os.path.join(output_dir, "slide_03.png"))
    print("Generated slide_03.png")

# ==========================================
# SLIDE 4: OUR CORE INSIGHT
# ==========================================
def create_slide_04():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "04", "Our Core Insight")
    
    # Axiom Banner
    draw_hud_box(draw, 100, 110, 1820, 320, bg=(16, 24, 44))
    draw.text((140, 135), "THE AURIS FOUNDATIONAL AXIOM", font=font_tag, fill=(255, 214, 0))
    draw.text((140, 175), "“NOT DETECTED  ≠  NOT PRESENT”", font=font_hero, fill=(255, 255, 255))
    draw.text((140, 265), "A survivor partially hidden behind rubble will not register high confidence on a single sensor at a single static viewpoint.", font=font_subtitle, fill=(203, 213, 225))

    # 4 Disagreement Matrix Columns
    cols = [
        ("RGB OPTICAL", "WEAK EVIDENCE (15%)", "Occluded by concrete slab", (244, 63, 94)),
        ("THERMAL FIR", "POSSIBLE HEAT (48%)", "Localized 34°C hotspot", (255, 107, 0)),
        ("ACOUSTIC SENSING", "WEAK SOUND (35%)", "Faint distress cry cue", (255, 214, 0)),
        ("AURIS DECISION", "TRIGGER REINSPECT", "Reposition & Gather Evidence", (0, 240, 255))
    ]
    x = 100
    for title, val, sub, col in cols:
        draw_hud_box(draw, x, 360, x + 395, 680)
        draw.text((x + 25, 390), title, font=font_heading, fill=col)
        draw.text((x + 25, 450), val, font=font_title, fill=(255, 255, 255))
        draw.text((x + 25, 530), sub, font=font_body, fill=(148, 163, 184))
        draw.rectangle([x + 25, 600, x + 370, 620], fill=(25, 35, 60))
        # Progress indicator
        pw = 50 if "15%" in val else 160 if "48%" in val else 120 if "35%" in val else 330
        draw.rectangle([x + 25, 600, x + 25 + pw, 620], fill=col)
        x += 435

    # Bottom Decision Comparison
    draw_hud_box(draw, 100, 720, 1820, 940)
    draw.text((140, 750), "CONVENTIONAL SYSTEM: Reports low-confidence and moves on  ➔  Risk of fatal false negative.", font=font_heading, fill=(244, 63, 94))
    draw.text((140, 810), "AURIS: Asks 'What information do we need next?'  ➔  Reposition drone, select better viewpoint, and verify.", font=font_heading, fill=(0, 240, 255))
    draw.text((140, 875), "CORE INNOVATION: ADAPTIVE RESCUE INTELLIGENCE", font=font_tag, fill=(255, 214, 0))

    img.save(os.path.join(output_dir, "slide_04.png"))
    print("Generated slide_04.png")

# ==========================================
# SLIDE 5: OUR SOLUTION
# ==========================================
def create_slide_05():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "05", "Our Solution: AURIS Architecture")
    
    draw.text((100, 110), "MULTIMODAL EDGE-AI RESCUE PLATFORM", font=font_title, fill=(0, 240, 255))
    draw.text((100, 175), "4-Layer hierarchical intelligence stack operating 100% locally onboard:", font=font_subtitle, fill=(203, 213, 225))
    
    layers = [
        ("LAYER 1", "PERCEPTION", ["• RGB Optical (Daylight)", "• Thermal (Heat Signatures)", "• Microphone Array (Audio)", "• LiDAR (Spatial Geometry)", "• GPS + IMU + Gas Sensing"], (0, 240, 255)),
        ("LAYER 2", "EDGE AI", ["• Raspberry Pi 5 (Quad ARM)", "• AI Acceleration (13.2 TOPS)", "• Python, PyTorch & OpenCV", "• Real-time local inference", "• Zero cloud dependency"], (0, 255, 102)),
        ("LAYER 3", "EVIDENCE FUSION", ["• Multi-Sensor Validation", "• False-Alarm Rejection", "• Bayesian cross-evidence", "• Uncertainty estimation", "• High-confidence verification"], (255, 214, 0)),
        ("LAYER 4", "ADAPTIVE REPLAN", ["• Next-Best-View search", "• 3D Search memory grid", "• Risk, battery & comms", "• Dynamic trajectory updates", "• Incident packet dispatch"], (255, 107, 0))
    ]
    
    x = 100
    for ltag, ltitle, items, col in layers:
        draw_hud_box(draw, x, 240, x + 395, 800)
        draw.text((x + 25, 270), ltag, font=font_tag, fill=col)
        draw.text((x + 25, 305), ltitle, font=font_heading, fill=(255, 255, 255))
        y = 380
        for it in items:
            draw.text((x + 25, y), it, font=font_body, fill=(226, 232, 240))
            y += 65
        x += 435

    draw_hud_box(draw, 100, 830, 1820, 940, bg=(14, 22, 38))
    draw.text((140, 865), "COMPLETE INTELLIGENCE LOOP:", font=font_tag, fill=(255, 214, 0))
    draw.text((390, 855), "SENSE  ➔  PROCESS  ➔  FUSE  ➔  VERIFY  ➔  REINSPECT  ➔  PRIORITIZE  ➔  REPLAN", font=font_heading, fill=(255, 255, 255))

    img.save(os.path.join(output_dir, "slide_05.png"))
    print("Generated slide_05.png")

# ==========================================
# SLIDE 6: PROTOTYPE & PERCEPTION DEMO
# ==========================================
def create_slide_06():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "06", "Prototype & Intelligence Demonstration")
    
    draw.text((100, 110), "HEXACOPTER HARDWARE RIG & 4-WAY PERCEPTION", font=font_title, fill=(0, 240, 255))
    draw.text((100, 175), "Dual-brain avionics + real-time multimodal sensing + active verification:", font=font_subtitle, fill=(203, 213, 225))
    
    # 3 Demonstration Grids
    draw_hud_box(draw, 100, 240, 630, 780)
    draw.text((130, 270), "01. PHYSICAL PLATFORM", font=font_heading, fill=(255, 107, 0))
    draw.text((130, 315), "Pixhawk + RPi 5 Dual Brain", font=font_tag, fill=(0, 240, 255))
    p_items = [
        "• Hexacopter 6-motor airframe",
        "• Pixhawk 2.4.8 manages flight",
        "• Raspberry Pi 5 runs Edge AI",
        "• Integrated sensor pod mount",
        "• Optical Flow + Altimeter hold",
        "• 5km Datalink (SIYI HM30)"
    ]
    y = 370
    for it in p_items:
        draw.text((130, y), it, font=font_body, fill=(226, 232, 240))
        y += 60

    draw_hud_box(draw, 680, 240, 1240, 780)
    draw.text((710, 270), "02. 4-WAY SENSOR FEEDS", font=font_heading, fill=(0, 255, 102))
    draw.text((710, 315), "See • Sense • Hear • Understand", font=font_tag, fill=(0, 240, 255))
    s_items = [
        "• RGB: Visual survivor candidates",
        "• Thermal: 37°C body heatmaps",
        "• Acoustic: Denoised distress cries",
        "• LiDAR: 360° laser obstacle map",
        "• Gas & Environment sensors",
        "• Synchronized multi-perspective"
    ]
    y = 370
    for it in s_items:
        draw.text((710, y), it, font=font_body, fill=(226, 232, 240))
        y += 60

    draw_hud_box(draw, 1290, 240, 1820, 780)
    draw.text((1320, 270), "03. ACTIVE VERIFICATION", font=font_heading, fill=(255, 214, 0))
    draw.text((1320, 315), "Detecting ➔ Intelligently Verifying", font=font_tag, fill=(0, 240, 255))
    v_items = [
        "• Initial detection is uncertain",
        "• Area marked for investigation",
        "• Drone repositions around debris",
        "• Gathers new multi-angle data",
        "• Bayesian confidence escalation",
        "• Verified survivor confirmed"
    ]
    y = 370
    for it in v_items:
        draw.text((1320, y), it, font=font_body, fill=(226, 232, 240))
        y += 60

    # Bottom Callout
    draw_hud_box(draw, 100, 810, 1820, 940, bg=(14, 22, 38))
    draw.text((140, 850), "MOVING BEYOND SIMPLE DETECTION — FROM DETECTING A POSSIBILITY TO INTELLIGENTLY VERIFYING IT", font=font_heading, fill=(0, 240, 255))

    img.save(os.path.join(output_dir, "slide_06.png"))
    print("Generated slide_06.png")

# ==========================================
# SLIDE 7: ADAPTIVE MISSION & DASHBOARD
# ==========================================
def create_slide_07():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "07", "Adaptive Mission & Dashboard")
    
    draw.text((100, 110), "GROUND-STATION DASHBOARD & SAR DISPATCH", font=font_title, fill=(0, 240, 255))
    draw.text((100, 175), "Connecting edge intelligence to rescue operators with dynamic risk-aware replanning:", font=font_subtitle, fill=(203, 213, 225))
    
    # Left Telemetry
    draw_hud_box(draw, 100, 240, 700, 940)
    draw.text((130, 270), "UAV FLIGHT TELEMETRY", font=font_heading, fill=(0, 240, 255))
    
    t_items = [
        ("ALTITUDE", "14.2 M (AGL)"),
        ("AIRSPEED", "5.2 M/S"),
        ("BATTERY", "84% (22.8V 6S)"),
        ("GPS LOCK", "18 SATELLITES (3D)"),
        ("COMM LINK", "915MHz Datalink (100%)"),
        ("NPU LOAD", "8.2ms YOLOv8 Inference")
    ]
    y = 330
    for label, val in t_items:
        draw.text((130, y), label, font=font_tag, fill=(148, 163, 184))
        draw.text((130, y + 22), val, font=font_heading, fill=(255, 255, 255))
        y += 85

    # Right Incident Packet Card
    draw_hud_box(draw, 740, 240, 1820, 940, bg=(14, 20, 36))
    draw.text((770, 270), "RESCUE INTELLIGENCE INCIDENT PACKET: #SAR-2026-089A", font=font_heading, fill=(255, 214, 0))
    draw.rectangle([770, 310, 1780, 312], fill=(0, 240, 255, 80))
    
    p_details = [
        ("GPS COORDINATES", "13.0827° N, 80.2707° E"),
        ("VICTIM CONFIDENCE", "91.4% (VERIFIED)"),
        ("HEAT SIGNATURE", "37.1°C RADIOMETRIC"),
        ("STRUCTURAL HAZARD", "CONCRETE REBAR VOID"),
        ("RECOMMENDED SQUAD", "NDRF USAR SQUAD 04"),
        ("EXTRACTION CORRIDOR", "NORTH FLANK (CLEAR)")
    ]
    for idx, (lbl, val) in enumerate(p_details):
        r = idx // 2
        c = idx % 2
        bx = 770 + c * 500
        by = 340 + r * 110
        draw.text((bx, by), lbl, font=font_tag, fill=(148, 163, 184))
        draw.text((bx, by + 25), val, font=font_heading, fill=(255, 255, 255))

    # Bottom Decision Replan
    draw.rectangle([770, 700, 1780, 900], fill=(10, 15, 28), outline=(0, 240, 255, 80), width=1)
    draw.text((800, 725), "DYNAMIC CLOSED-LOOP RESCUE PROCESS", font=font_tag, fill=(0, 255, 102))
    draw.multiline_text((800, 765), "• Explored & cleared areas ➔ Drone continues searching elsewhere.\n• Uncertain areas ➔ Prioritized for immediate Next-Best-View investigation.\n• Sense ➔ Verify ➔ Decide ➔ Replan: Sensor observations transformed into actionable rescue intelligence.", font=font_body, fill=(226, 232, 240), spacing=10)

    img.save(os.path.join(output_dir, "slide_07.png"))
    print("Generated slide_07.png")

# ==========================================
# SLIDE 8: INNOVATION & CLOSING
# ==========================================
def create_slide_08():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "08", "Innovation & Closing")
    
    draw.text((100, 110), "THE 5 PILLARS OF ADAPTIVE RESCUE INTELLIGENCE", font=font_title, fill=(0, 240, 255))
    draw.text((100, 175), "AURIS transforms uncertain sensor information into adaptive rescue decisions:", font=font_subtitle, fill=(203, 213, 225))
    
    pillars = [
        ("1. UNCERTAINTY-AWARE SEARCH", "Because not detected does not mean not present.", (255, 107, 0)),
        ("2. MULTI-SENSOR VERIFICATION", "RGB, thermal, and acoustic evidence combined before confirming.", (255, 214, 0)),
        ("3. NEXT-BEST-VIEW REINSPECTION", "Gathers additional multi-angle evidence from better positions.", (0, 255, 102)),
        ("4. SEARCH MEMORY", "Tracks explored, occluded, and uncertain sectors.", (168, 85, 247)),
        ("5. RISK-AWARE MISSION PLANNING", "Balances victim urgency against battery, hazards, and comms.", (244, 63, 94)),
        ("CONTINUOUS CLOSED-LOOP", "Sense ➔ Verify ➔ Decide ➔ Replan", (0, 240, 255))
    ]
    
    for i, (title, desc, col) in enumerate(pillars):
        r = i // 3
        c = i % 3
        bx = 100 + c * 580
        by = 240 + r * 220
        draw_hud_box(draw, bx, by, bx + 550, by + 190)
        draw.text((bx + 25, by + 30), title, font=font_heading, fill=col)
        draw.text((bx + 25, by + 85), desc, font=font_body, fill=(226, 232, 240))

    # Closing Box
    draw_hud_box(draw, 100, 710, 1820, 940, bg=(14, 20, 36))
    draw.text((140, 740), "“Because in a disaster, seeing everything is impossible. But an intelligent system can decide what to look at next.”", font=font_heading, fill=(255, 255, 255))
    draw.text((140, 800), "From Detection ➔ To Verification ➔ To Decision ➔ And Finally, Replanning.", font=font_subtitle, fill=(255, 214, 0))
    draw.text((140, 865), "AURIS — TEAM NEXUS FORGE | SMART INDIA HACKATHON 2026 | THANK YOU", font=font_tag, fill=(0, 240, 255))

    img.save(os.path.join(output_dir, "slide_08.png"))
    print("Generated slide_08.png")

# Generate all 8 slides
create_slide_01()
create_slide_02()
create_slide_03()
create_slide_04()
create_slide_05()
create_slide_06()
create_slide_07()
create_slide_08()
print("🎉 All 8 Slide Images Generated Successfully!")
