import os
import sys
from PIL import Image, ImageDraw, ImageFont

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

BASE_DIR = r"d:\drone\auris_video"
output_dir = os.path.join(BASE_DIR, "slides")
os.makedirs(output_dir, exist_ok=True)

LOGO_NEXUS = os.path.join(BASE_DIR, "assets", "nexus_forge_logo.png")
LOGO_AURIS = os.path.join(BASE_DIR, "assets", "auris_logo.png")

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
font_title = get_font(44, bold=True)
font_subtitle = get_font(26, bold=False)
font_heading = get_font(22, bold=True)
font_body = get_font(19, bold=False)
font_small = get_font(15, bold=False)
font_tag = get_font(13, bold=True)

def draw_header_and_footer(draw, section_num, section_title, tag_text="SMART INDIA HACKATHON 2026 • HARDWARE EDITION"):
    # Header bar
    draw.rectangle([0, 0, W, 70], fill=(11, 17, 31, 255))
    draw.line([0, 70, W, 70], fill=(0, 240, 255, 100), width=2)
    
    # AURIS Mini Logo / text
    draw.ellipse([30, 22, 50, 42], fill=(0, 240, 255))
    draw.text((60, 16), "AURIS", font=get_font(28, bold=True), fill=(0, 240, 255))
    draw.rectangle([165, 20, 245, 48], outline=(0, 240, 255, 150), width=1)
    draw.text((175, 24), "SIH 2026", font=font_tag, fill=(0, 240, 255))
    
    # Tag
    draw.text((270, 24), "TEAM NEXUS FORGE • MENTOR: DR. K ARUN KUMAR", font=font_small, fill=(148, 163, 184))
    
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

def paste_logo_badge(img, draw, logo_path, bx1, by1, bx2, by2, badge_tag, badge_title, badge_motto):
    draw_hud_box(draw, bx1, by1, bx2, by2, bg=(14, 20, 36, 240), border=(0, 240, 255, 120))
    draw.text((bx1 + 20, by1 + 14), badge_tag, font=font_tag, fill=(0, 240, 255))
    
    cw = bx2 - bx1 - 36
    ch = 220
    cx1 = bx1 + 18
    cy1 = by1 + 38
    cx2 = cx1 + cw
    cy2 = cy1 + ch
    
    # White rounded card to hold the official logo emblem
    draw.rounded_rectangle([cx1, cy1, cx2, cy2], radius=10, fill=(255, 255, 255), outline=(0, 240, 255, 200), width=2)
    
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        logo_w, logo_h = logo.size
        scale = min((cw - 16) / logo_w, (ch - 16) / logo_h)
        new_w = int(logo_w * scale)
        new_h = int(logo_h * scale)
        logo_resized = logo.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        pos_x = cx1 + (cw - new_w) // 2
        pos_y = cy1 + (ch - new_h) // 2
        img.paste(logo_resized, (pos_x, pos_y), logo_resized)
        
    draw.text((bx1 + 20, cy2 + 14), badge_title, font=font_heading, fill=(255, 214, 0))
    draw.text((bx1 + 20, cy2 + 42), badge_motto, font=font_small, fill=(203, 213, 225))

# ==========================================
# SLIDE 1: TEAM INTRODUCTION & LOGOS
# ==========================================
def create_slide_01():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "01", "Team Introduction")
    
    # Left Hero Box
    draw_hud_box(draw, 80, 110, 1000, 940)
    draw.text((120, 140), "SMART INDIA HACKATHON 2026 • HARDWARE EDITION", font=font_tag, fill=(0, 240, 255))
    draw.text((120, 175), "AURIS", font=font_hero, fill=(0, 240, 255))
    draw.text((120, 270), "Autonomous Uncertainty-aware Rescue Intelligence System", font=font_subtitle, fill=(241, 245, 249))
    
    # Team Box
    draw.rectangle([120, 335, 960, 545], fill=(14, 22, 38), outline=(0, 240, 255, 60), width=1)
    draw.text((150, 355), "TEAM NEXUS FORGE", font=font_heading, fill=(255, 214, 0))
    draw.text((150, 395), "Mentor: Dr. K Arun Kumar", font=font_body, fill=(255, 255, 255))
    draw.text((150, 435), "Team Lead: Karthikeyan T", font=font_body, fill=(0, 240, 255))
    draw.text((150, 475), "Members: Nandhakishore • Harish Rohith • Akilan", font=font_small, fill=(203, 213, 225))
    draw.text((150, 505), "Keerthika • Ananthi", font=font_small, fill=(203, 213, 225))
    
    # Core Loop Box
    draw.rectangle([120, 575, 960, 725], fill=(14, 22, 38), outline=(255, 214, 0, 60), width=1)
    draw.text((150, 595), "CORE RESCUE LOOP", font=font_tag, fill=(255, 214, 0))
    draw.text((150, 630), "SENSE  ➔  VERIFY  ➔  DECIDE  ➔  REPLAN", font=font_heading, fill=(255, 255, 255))
    draw.text((150, 675), "From Detection  ➔  Verification  ➔  Decision  ➔  Replanning", font=font_small, fill=(0, 240, 255))

    # Core Insight Quote Box
    draw.rectangle([120, 755, 960, 905], fill=(10, 16, 30), outline=(0, 255, 102, 60), width=1)
    draw.text((150, 775), "SYSTEM PHILOSOPHY", font=font_tag, fill=(0, 255, 102))
    draw.text((150, 805), "“Not detected does not mean not present.”", font=font_heading, fill=(255, 255, 255))
    draw.text((150, 850), "Transforming uncertainty into an actionable decision trigger.", font=font_small, fill=(148, 163, 184))

    # Right Top Half: The 2 Official Logos!
    paste_logo_badge(img, draw, LOGO_NEXUS, 1040, 110, 1430, 470, 
                     "OFFICIAL TEAM EMBLEM", "TEAM NEXUS FORGE", "“Forged Together, Built to Conquer.”")
    
    paste_logo_badge(img, draw, LOGO_AURIS, 1460, 110, 1840, 470, 
                     "OFFICIAL SYSTEM EMBLEM", "PROJECT AURIS", "Sense • Verify • Decide • Replan")

    # Right Bottom Half: System Credentials HUD Box
    draw_hud_box(draw, 1040, 495, 1840, 940)
    draw.text((1070, 520), "SYSTEM CREDENTIALS & HARDWARE SPECS", font=font_heading, fill=(0, 240, 255))
    
    specs = [
        ("DOMAIN", "Multimodal Edge AI + USAR Hexacopter"),
        ("COMPUTE", "Raspberry Pi 5 + Hailo AI NPU (13.2 TOPS)"),
        ("AVIONICS", "Pixhawk 2.4.8 Autopilot (ArduCopter USAR)"),
        ("PERCEPTION", "RGB + Thermal Radiometric + 360° LiDAR + 4-Mic Array"),
        ("SOFTWARE", "ROS 2 Humble • PyTorch • OpenCV • Fast-LIO2"),
        ("TARGET", "Zero False-Negative Survivor Extraction in USAR")
    ]
    y = 570
    for title, val in specs:
        draw.text((1070, y), title, font=font_tag, fill=(148, 163, 184))
        draw.text((1070, y + 20), val, font=font_body, fill=(255, 255, 255))
        y += 58
        
    img.save(os.path.join(output_dir, "slide_01.png"))
    print("Generated slide_01.png with both logos!")

# ==========================================
# SLIDE 2: WHY THIS PROBLEM MATTERS
# ==========================================
def create_slide_02():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "02", "Why This Problem Matters")
    
    draw.text((100, 110), "IN A DISASTER, EVERY SECOND MATTERS", font=font_title, fill=(255, 107, 0))
    draw.text((100, 175), "The limitations of conventional single-sensor disaster response:", font=font_subtitle, fill=(203, 213, 225))
    
    cards = [
        ("FLOODS & ISOLATION", "Isolates victims across vast muddy terrain.", (255, 107, 0)),
        ("COLLAPSED STRUCTURES", "Traps survivors under heavy rubble & voids.", (255, 214, 0)),
        ("SMOKE & DARKNESS", "Blinds standard RGB optical cameras.", (244, 63, 94)),
        ("COMMS BLACKOUT", "Cloud-dependent systems fail completely.", (168, 85, 247))
    ]
    
    for i, (title, desc, col) in enumerate(cards):
        bx = 100 + i * 435
        by = 240
        draw_hud_box(draw, bx, by, bx + 410, by + 260)
        draw.rectangle([bx + 20, by + 20, bx + 70, by + 24], fill=col)
        draw.text((bx + 20, by + 45), title, font=font_heading, fill=col)
        draw.text((bx + 20, by + 100), desc, font=font_body, fill=(226, 232, 240))
        
    # Sensor Gaps Comparison Box
    draw_hud_box(draw, 100, 540, 1820, 940, bg=(14, 20, 36))
    draw.text((140, 570), "THE SENSOR REALITY GAP: NO SINGLE SENSOR IS ENOUGH", font=font_heading, fill=(0, 240, 255))
    
    sensor_gaps = [
        ("RGB CAMERA", "Shows visible scene only", "Blinded by smoke, dust & darkness"),
        ("THERMAL SENSOR", "Detects heat signatures", "Confused by fires, solar heated concrete"),
        ("ACOUSTIC SENSOR", "Detects survivor calls", "Drowned by drone rotor aerodynamic noise"),
        ("LiDAR SENSOR", "Maps spatial structure", "Cannot distinguish human life from obstacles")
    ]
    
    for idx, (s_name, s_pro, s_con) in enumerate(sensor_gaps):
        sx = 140 + idx * 420
        sy = 630
        draw.text((sx, sy), s_name, font=font_heading, fill=(255, 214, 0))
        draw.text((sx, sy + 35), f"✔ {s_pro}", font=font_small, fill=(0, 255, 102))
        draw.text((sx, sy + 70), f"✖ {s_con}", font=font_small, fill=(244, 63, 94))
        
    draw.rectangle([140, 780, 1780, 880], fill=(10, 16, 30), outline=(0, 240, 255, 60), width=1)
    draw.text((160, 805), "THE REAL CHALLENGE:", font=font_tag, fill=(255, 214, 0))
    draw.text((160, 835), "Not simply collecting more data — but resolving uncertainty and deciding what the drone should do next.", font=font_body, fill=(255, 255, 255))

    img.save(os.path.join(output_dir, "slide_02.png"))
    print("Generated slide_02.png")

# ==========================================
# SLIDE 3: RESEARCH & GAP ANALYSIS
# ==========================================
def create_slide_03():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "03", "Research & Gap Analysis")
    
    draw.text((100, 110), "STUDYING THE SEARCH & RESCUE LITERATURE", font=font_title, fill=(0, 240, 255))
    draw.text((100, 175), "We analyzed UAV-SAR, Thermal survivor detection, Acoustic localization, Edge AI & Next-Best-View planning:", font=font_subtitle, fill=(203, 213, 225))
    
    tech_tags = [
        "UAV Search & Rescue", "Thermal Radiometry", "Acoustic Beamforming",
        "Drone Rotor Noise Suppression", "Next-Best-View (NBV) Planning", "Edge AI Acceleration",
        "LiDAR 3D Odometry", "Evidential Reasoning Fusion"
    ]
    
    for i, t in enumerate(tech_tags):
        r = i // 4
        c = i % 4
        tx = 100 + c * 430
        ty = 240 + r * 80
        draw.rectangle([tx, ty, tx + 400, ty + 60], fill=(18, 26, 45), outline=(0, 240, 255, 100), width=1)
        draw.text((tx + 20, ty + 18), t, font=font_body, fill=(0, 240, 255))

    # The Critical Gap Box
    draw_hud_box(draw, 100, 440, 1820, 940, bg=(14, 20, 36))
    draw.text((140, 480), "THE CRITICAL GAP: SENSING, MAPPING & COMMS ARE TREATED AS SILOS", font=font_title, fill=(244, 63, 94))
    
    draw.text((140, 560), "What happens when sensor evidence is incomplete or conflicting?", font=font_heading, fill=(255, 214, 0))
    
    steps = [
        ("RGB CAMERA", "SEES NOTHING (Occluded rubble void)", (244, 63, 94)),
        ("THERMAL SENSOR", "DETECTS WEAK HEAT SIGNATURE (36.8°C)", (255, 214, 0)),
        ("ACOUSTIC ARRAY", "DETECTS FAINT HUMAN CRY (Suppressed Rotor SNR)", (0, 255, 102))
    ]
    
    for idx, (sensor, res, col) in enumerate(steps):
        sy = 630 + idx * 70
        draw.rectangle([140, sy, 500, sy + 50], fill=(18, 26, 45), outline=col, width=1)
        draw.text((160, sy + 12), sensor, font=font_body, fill=col)
        draw.text((540, sy + 12), res, font=font_body, fill=(255, 255, 255))
        
    draw.rectangle([140, 850, 1780, 915], fill=(10, 16, 30), outline=(0, 240, 255, 80), width=1)
    draw.text((160, 868), "CONVENTIONAL SYSTEMS STOP AT UNCERTAINTY ➔ AURIS MAKES UNCERTAINTY THE INPUT FOR REPLANNING!", font=font_heading, fill=(0, 240, 255))

    img.save(os.path.join(output_dir, "slide_03.png"))
    print("Generated slide_03.png")

# ==========================================
# SLIDE 4: OUR CORE INSIGHT
# ==========================================
def create_slide_04():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "04", "Our Core Insight")
    
    # Big Quote Box
    draw_hud_box(draw, 100, 120, 1820, 360, bg=(14, 20, 36), border=(255, 214, 0, 150))
    draw.text((150, 150), "THE AURIS FOUNDATIONAL PRINCIPLE", font=font_tag, fill=(255, 214, 0))
    draw.text((150, 190), "“NOT DETECTED DOES NOT MEAN NOT PRESENT.”", font=font_hero, fill=(0, 240, 255))
    draw.text((150, 290), "Transforming sensor uncertainty from an operational failure into a proactive decision-making input.", font=font_subtitle, fill=(226, 232, 240))

    # Scenario Breakdown
    draw_hud_box(draw, 100, 400, 1820, 940)
    draw.text((140, 430), "RESCUE DILEMMA: PARTIALLY OCCLUDED SURVIVOR IN RUBBLE", font=font_title, fill=(255, 255, 255))
    
    boxes = [
        ("CURRENT VIEWPOINT (BLIND SPOT)", 
         "• RGB: Occluded by slab (0% confidence)\n• Thermal: Edge bleed (35% confidence)\n• Audio: Faint tapping heard\n➔ Conventional drone MOVES ON.", (244, 63, 94)),
        ("AURIS REINSPECTION TRIGGER", 
         "• System detects conflicting evidence.\n• Instead of guessing, asks:\n  'What information do we need next?'\n➔ Computes Next-Best-View trajectory.", (255, 214, 0)),
        ("NEW VIEWPOINT (VERIFIED)", 
         "• Repositions +2.5m altitude, 45° pitch\n• RGB confirms visual face/hand\n• Thermal confirms 37.1°C core body\n➔ SURVIVOR CONFIRMED & LOCALIZED.", (0, 255, 102))
    ]
    
    for idx, (btitle, bdesc, bcol) in enumerate(boxes):
        bx = 140 + idx * 560
        by = 510
        draw.rectangle([bx, by, bx + 520, by + 380], fill=(14, 22, 38), outline=bcol, width=1)
        draw.text((bx + 20, by + 25), btitle, font=font_heading, fill=bcol)
        draw.multiline_text((bx + 20, by + 85), bdesc, font=font_body, fill=(241, 245, 249), spacing=12)

    img.save(os.path.join(output_dir, "slide_04.png"))
    print("Generated slide_04.png")

# ==========================================
# SLIDE 5: SYSTEM ARCHITECTURE
# ==========================================
def create_slide_05():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "05", "System Architecture")
    
    draw.text((100, 110), "AURIS 4-LAYER MULTIMODAL EDGE-AI ARCHITECTURE", font=font_title, fill=(0, 240, 255))
    
    layers = [
        ("LAYER 1: PERCEPTION SUITE", 
         "• RGB 4K Camera (Visual detection & pose)\n• Radiometric Thermal (FLIR Lepton 3.5)\n• 4-Mic ReSpeaker Array (Acoustic localization)\n• 360° LiDAR + Optical Flow + IMU", (0, 240, 255)),
        ("LAYER 2: EDGE INTELLIGENCE", 
         "• Raspberry Pi 5 (8GB) Host Computer\n• AI HAT+ NPU (13.2 TOPS INT8 acceleration)\n• Local inference: YOLOv8-Pose + MobileNet-SSD\n• Rotor Noise Spectral Subtraction (100Hz-8kHz)", (255, 214, 0)),
        ("LAYER 3: EVIDENCE FUSION", 
         "• Dempster-Shafer Evidential Fusion Engine\n• Spatial OctoMap 3D Volumetric Grid\n• Uncertainty Quantification Index (0.0 to 1.0)\n• Hazard & Debris Proximity Profiling", (0, 255, 102)),
        ("LAYER 4: ADAPTIVE DECISION", 
         "• Next-Best-View (NBV) Trajectory Planner\n• Risk-Aware Flight Cost Function\n• Battery, Signal & Hazard Constraint Evaluator\n• Closed-loop Autopilot Waypoint Re-injection", (168, 85, 247))
    ]
    
    for i, (ltitle, ldesc, lcol) in enumerate(layers):
        r = i // 2
        c = i % 2
        lx = 100 + c * 870
        ly = 180 + r * 320
        draw_hud_box(draw, lx, ly, lx + 840, ly + 280)
        draw.text((lx + 30, ly + 25), ltitle, font=font_heading, fill=lcol)
        draw.multiline_text((lx + 30, ly + 75), ldesc, font=font_body, fill=(241, 245, 249), spacing=10)

    # Intelligence Loop Bottom Bar
    draw.rectangle([100, 850, 1820, 930], fill=(14, 20, 36), outline=(0, 240, 255, 100), width=1)
    draw.text((140, 875), "INTELLIGENCE LOOP: SENSE ➔ PROCESS ➔ FUSE ➔ VERIFY ➔ REINSPECT ➔ PRIORITIZE ➔ REPLAN", font=font_heading, fill=(0, 240, 255))

    img.save(os.path.join(output_dir, "slide_05.png"))
    print("Generated slide_05.png")

# ==========================================
# SLIDE 6: PROTOTYPE & INTELLIGENCE DEMO
# ==========================================
def create_slide_06():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "06", "Prototype & Verification Demo")
    
    # Left Box: Hexacopter Spec
    draw_hud_box(draw, 100, 110, 750, 940)
    draw.text((130, 140), "PHYSICAL AURIS TEST PLATFORM", font=font_heading, fill=(0, 240, 255))
    draw.text((130, 180), "Heavy-Lift Autonomous SAR Hexacopter", font=font_subtitle, fill=(255, 255, 255))
    
    proto_specs = [
        ("AIRFRAME", "Tarot 680Pro Carbon Fiber Hexacopter"),
        ("PROPULSION", "6x 4114 400KV Motors + 1555 Carbon Props"),
        ("POWER", "6S 16,000mAh LiPo (28 min SAR flight time)"),
        ("FLIGHT CONTROLLER", "Pixhawk 2.4.8 (ArduCopter 4.5 USAR)"),
        ("EDGE NPU COMPUTE", "Raspberry Pi 5 + Hailo-8 NPU (13.2 TOPS)"),
        ("SENSING POD", "Sony IMX708 RGB + FLIR Lepton + LD06 LiDAR"),
        ("ACOUSTIC POD", "4-Microphone Array + DSP Filter"),
        ("TELEMETRY", "915MHz RFD900x + 5.8GHz Low-Latency Video")
    ]
    y = 235
    for title, val in proto_specs:
        draw.text((130, y), title, font=font_tag, fill=(148, 163, 184))
        draw.text((130, y + 20), val, font=font_body, fill=(255, 255, 255))
        y += 75

    # Right Box: Intelligence Verification Workflow
    draw_hud_box(draw, 780, 110, 1820, 940)
    draw.text((820, 140), "STEP-BY-STEP ADAPTIVE VERIFICATION PIPELINE", font=font_heading, fill=(255, 214, 0))
    
    steps = [
        ("STAGE 1: RGB PIPELINE", "Scans debris zone for human contours & optical survivor candidates.", (0, 240, 255)),
        ("STAGE 2: THERMAL PIPELINE", "Extracts 36.5°C - 38.0°C radiometric heat signatures through smoke.", (255, 107, 0)),
        ("STAGE 3: ACOUSTIC MODULE", "Filters motor noise, identifies human distress frequencies (400-3000Hz).", (0, 255, 102)),
        ("STAGE 4: SPATIAL LIDAR", "Maps 3D geometry, void obstacles, rebar clearances, and approach vectors.", (168, 85, 247)),
        ("STAGE 5: UNCERTAINTY TRIGGER", "Calculates fusion confidence. Score < 0.85 initiates Next-Best-View planner.", (244, 63, 94)),
        ("STAGE 6: REINSPECT & CONFIRM", "Drone maneuvers to optimal angle, collects high-SNR proof, confirms victim.", (255, 214, 0))
    ]
    
    for idx, (stitle, sdesc, scol) in enumerate(steps):
        sy = 190 + idx * 115
        draw.rectangle([820, sy, 1780, sy + 95], fill=(14, 22, 38), outline=scol, width=1)
        draw.text((845, sy + 15), stitle, font=font_heading, fill=scol)
        draw.text((845, sy + 50), sdesc, font=font_body, fill=(241, 245, 249))

    img.save(os.path.join(output_dir, "slide_06.png"))
    print("Generated slide_06.png")

# ==========================================
# SLIDE 7: ADAPTIVE MISSION & DASHBOARD
# ==========================================
def create_slide_07():
    img = Image.new("RGB", (W, H), (8, 12, 20))
    draw = ImageDraw.Draw(img)
    draw_header_and_footer(draw, "07", "Adaptive Mission & Dashboard")
    
    # Left Telemetry Panel
    draw_hud_box(draw, 100, 110, 700, 940)
    draw.text((130, 140), "GROUND CONTROL STATION", font=font_heading, fill=(0, 240, 255))
    
    dash_items = [
        ("TELEMETRY STATUS", "ARMED • AUTONOMOUS SEARCH", (0, 255, 102)),
        ("BATTERY LEVEL", "84% (21.8V) • 23 MIN REMAINING", (255, 214, 0)),
        ("COMMUNICATION LINK", "915MHz RFD900X • 99% RSSI", (0, 240, 255)),
        ("SEARCH COVERAGE", "68.4% OCCUPIED GRID COMPLETED", (168, 85, 247)),
        ("UNCERTAIN ZONES", "02 SECTORS FLAGGED FOR RE-SCAN", (244, 63, 94)),
        ("CONFIRMED VICTIMS", "03 LOCATIONS LOGGED & GPS TAGGED", (0, 255, 102)),
        ("ENVIRONMENTAL RISK", "METHANE: NORMAL • WIND: 3.2 m/s", (255, 255, 255))
    ]
    y = 195
    for title, val, col in dash_items:
        draw.text((130, y), title, font=font_tag, fill=(148, 163, 184))
        draw.text((130, y + 22), val, font=font_heading, fill=col)
        y += 90

    # Right Live Mission Control Feed
    draw_hud_box(draw, 730, 110, 1820, 940)
    draw.text((770, 140), "DYNAMIC MULTI-SENSOR RESCUE DISPATCH", font=font_title, fill=(255, 255, 255))
    
    # Victim Target Card
    draw.rectangle([770, 200, 1780, 660], fill=(14, 22, 38), outline=(0, 255, 102, 120), width=2)
    draw.text((800, 225), "TARGET #03: REBAR VOID (SECTOR 4B)", font=font_heading, fill=(0, 255, 102))
    draw.text((800, 265), "SURVIVOR CONFIRMED VIA NEXT-BEST-VIEW EVIDENCE FUSION", font=font_subtitle, fill=(255, 214, 0))
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

    # Closing Box with team credentials & closing quote
    draw_hud_box(draw, 100, 710, 1820, 940, bg=(14, 20, 36))
    draw.text((140, 735), "“Because in a disaster, seeing everything is impossible. But an intelligent system can decide what to look at next.”", font=font_heading, fill=(255, 255, 255))
    draw.text((140, 790), "From Detection ➔ To Verification ➔ To Decision ➔ And Finally, Replanning.", font=font_subtitle, fill=(255, 214, 0))
    draw.text((140, 850), "AURIS — TEAM NEXUS FORGE | MENTOR: DR. K ARUN KUMAR | SMART INDIA HACKATHON 2026 | THANK YOU", font=font_tag, fill=(0, 240, 255))

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
