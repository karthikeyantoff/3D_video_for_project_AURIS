import subprocess
import os
import sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

audio_dir = r"d:\drone\auris_video\audio"
output_video = r"d:\drone\auris_video\AURIS_SIH2026_Official_Video.mp4"

# Check human master audio
master_audio = os.path.join(audio_dir, "auris_human_master.mp3")
if not os.path.exists(master_audio):
    print("Master audio not found, generating...")
    subprocess.run(["python", r"d:\drone\auris_video\convert_direct.py"])

print("Ready to render official MP4 presentation video with real human voiceover!")
print("Source audio:", master_audio)
