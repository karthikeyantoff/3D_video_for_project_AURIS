import subprocess
import os
import sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

src_dir = r"D:\sih2026\voice_over_for_26177"
dst_dir = r"d:\drone\auris_video\audio"
os.makedirs(dst_dir, exist_ok=True)

src_files = os.listdir(src_dir)
print("Found in source:", src_files)

mapping = {
    "section_01.mp3": [f for f in src_files if "welcome" in f.lower()][0],
    "section_02.mp3": [f for f in src_files if "why_this_problem" in f.lower()][0],
    "section_03.mp3": [f for f in src_files if "research" in f.lower()][0],
    "section_04.mp3": [f for f in src_files if "insight" in f.lower()][0],
    "section_05.mp3": [f for f in src_files if "solution" in f.lower()][0],
    "section_06.mp3": [f for f in src_files if "v6" in f.lower()][0],
    "section_07.mp3": [f for f in src_files if "v7" in f.lower()][0],
    "section_08.mp3": [f for f in src_files if "v8" in f.lower()][0],
}

print("Mapping:")
for k, v in mapping.items():
    print(f"  {k} <- {v}")
    src = os.path.join(src_dir, v)
    dst = os.path.join(dst_dir, k)
    cmd = ["ffmpeg", "-y", "-i", src, "-b:a", "192k", dst]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"  ✅ Converted {v} -> {k}")
    else:
        print(f"  ❌ Error on {v}: {res.stderr}")

# Also concatenate into master
concat_txt = os.path.join(dst_dir, "concat_human.txt")
with open(concat_txt, "w", encoding="utf-8") as f:
    for k in sorted(mapping.keys()):
        f.write(f"file '{k}'\n")

master_out = os.path.join(dst_dir, "auris_human_master.mp3")
cmd2 = ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_txt, "-c", "copy", master_out]
subprocess.run(cmd2, capture_output=True)
print("Master human voiceover created:", master_out)
