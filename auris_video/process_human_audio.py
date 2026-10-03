import subprocess
import os

audio_dir = r"d:\drone\auris_video\audio"
mapping = {
    "section_01.mp3": "welcome_v1.ogg",
    "section_02.mp3": "why_this_problem_v2.ogg",
    "section_03.mp3": "3. RESEARCH & GAP ANALYSIS - VOICE-OVER_v3.ogg",
    "section_04.mp3": "OUR CORE INSIGHT - VOICE-OVER_v4.ogg",
    "section_05.mp3": "5. OUR SOLUTION - VOICE-OVER_v5.ogg",
    "section_06.mp3": "project_v6.ogg",
    "section_07.mp3": "project_v7.ogg",
    "section_08.mp3": "project_v8.ogg"
}

for out_name, in_name in mapping.items():
    src = os.path.join(audio_dir, in_name)
    dst = os.path.join(audio_dir, out_name)
    cmd = ["ffmpeg", "-y", "-i", src, "-b:a", "192k", dst]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"Converted {in_name} -> {out_name}")
    else:
        print(f"Error converting {in_name}: {res.stderr}")

# Concatenate into master full audio
concat_txt = os.path.join(audio_dir, "concat_human.txt")
with open(concat_txt, "w", encoding="utf-8") as f:
    for k in ["section_01.mp3", "section_02.mp3", "section_03.mp3", "section_04.mp3", "section_05.mp3", "section_06.mp3", "section_07.mp3", "section_08.mp3"]:
        f.write(f"file '{k}'\n")

master_out = os.path.join(audio_dir, "auris_human_master.mp3")
cmd2 = ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_txt, "-c", "copy", master_out]
subprocess.run(cmd2, capture_output=True)
print("Master human voiceover created:", master_out)
