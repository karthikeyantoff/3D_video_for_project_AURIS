import os
import sys
import subprocess
import shutil

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

BASE_DIR = r"d:\drone\auris_video"
AUDIO_DIR = os.path.join(BASE_DIR, "audio")
SLIDES_DIR = os.path.join(BASE_DIR, "slides")
CLIPS_DIR = os.path.join(BASE_DIR, "temp_clips")
OUTPUT_VIDEO = os.path.join(BASE_DIR, "AURIS_SIH2026_Final_Official_Video.mp4")

os.makedirs(CLIPS_DIR, exist_ok=True)

sections = [
    (1, "slide_01.png", "section_01.mp3"),
    (2, "slide_02.png", "section_02.mp3"),
    (3, "slide_03.png", "section_03.mp3"),
    (4, "slide_04.png", "section_04.mp3"),
    (5, "slide_05.png", "section_05.mp3"),
    (6, "slide_06.png", "section_06.mp3"),
    (7, "slide_07.png", "section_07.mp3"),
    (8, "slide_08.png", "section_08.mp3"),
]

clip_paths = []

print("🎬 Starting FFmpeg Render for SIH 2026 AURIS Presentation Video...")

for sec_num, slide_file, audio_file in sections:
    slide_path = os.path.join(SLIDES_DIR, slide_file)
    audio_path = os.path.join(AUDIO_DIR, audio_file)
    clip_path = os.path.join(CLIPS_DIR, f"clip_{sec_num:02d}.mp4")

    if not os.path.exists(slide_path):
        raise FileNotFoundError(f"Missing slide: {slide_path}")
    if not os.path.exists(audio_path):
        raise FileNotFoundError(f"Missing audio: {audio_path}")

    print(f"⏳ Rendering Section {sec_num}: {slide_file} + {audio_file} -> clip_{sec_num:02d}.mp4")

    # High quality 1080p 30fps x264 encode with aac audio
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-framerate", "30",
        "-i", slide_path,
        "-i", audio_path,
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "18",
        "-tune", "stillimage",
        "-c:a", "aac",
        "-b:a", "192k",
        "-pix_fmt", "yuv420p",
        "-shortest",
        clip_path
    ]

    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print(f"Error encoding section {sec_num}:", res.stderr)
        sys.exit(1)
    
    clip_paths.append(clip_path)
    print(f"✅ Section {sec_num} rendered successfully.")

# Create concat file
concat_txt = os.path.join(CLIPS_DIR, "concat_list.txt")
with open(concat_txt, "w", encoding="utf-8") as f:
    for cp in clip_paths:
        # ffmpeg concat demuxer requires forward slashes or escaped backslashes
        formatted = cp.replace("\\", "/")
        f.write(f"file '{formatted}'\n")

print("\n🚀 Concatenating all 8 sections into final master MP4...")
concat_cmd = [
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", concat_txt,
    "-c", "copy",
    OUTPUT_VIDEO
]

res = subprocess.run(concat_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
if res.returncode != 0:
    print("Error during concatenation, attempting re-encode concat:", res.stderr)
    # Fallback re-encode concat filter if stream copy has slight mismatch
    filter_inputs = "".join([f"[{i}:v:0][{i}:a:0]" for i in range(len(clip_paths))])
    filter_complex = f"{filter_inputs}concat=n={len(clip_paths)}:v=1:a=1[v][a]"
    cmd_fallback = ["ffmpeg", "-y"]
    for cp in clip_paths:
        cmd_fallback.extend(["-i", cp])
    cmd_fallback.extend([
        "-filter_complex", filter_complex,
        "-map", "[v]",
        "-map", "[a]",
        "-c:v", "libx264",
        "-crf", "18",
        "-preset", "medium",
        "-c:a", "aac",
        "-b:a", "192k",
        OUTPUT_VIDEO
    ])
    res2 = subprocess.run(cmd_fallback, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res2.returncode != 0:
        print("Re-encode concat also failed:", res2.stderr)
        sys.exit(1)

# Generate high-res YouTube Thumbnail
thumbnail_path = os.path.join(BASE_DIR, "AURIS_YouTube_Thumbnail_1080p.png")
shutil.copyfile(os.path.join(SLIDES_DIR, "slide_01.png"), thumbnail_path)

print(f"\n🎉 VIDEO GENERATION COMPLETE!")
print(f"📁 Master Video: {OUTPUT_VIDEO}")
print(f"📁 YouTube Thumbnail: {thumbnail_path}")

# Check output video stats using ffprobe
probe_cmd = [
    "ffprobe", "-v", "error",
    "-show_entries", "format=duration,size,bit_rate",
    "-of", "default=noprint_wrappers=1",
    OUTPUT_VIDEO
]
p_res = subprocess.run(probe_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
print("\n📊 Video File Metrics:")
print(p_res.stdout)
