# 🧪 HyperFrames POC — Colab T4
# Copy-paste từng cell vào Colab hoặc upload file .py này

# ============================================================
# CELL 1: Cài đặt môi trường (~2 phút)
# ============================================================
!apt-get update -qq && apt-get install -y ffmpeg libatk-bridge2.0-0 libatk1.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2 libnss3 libnspr4 2>&1 | tail -3
!curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - 2>&1 | tail -2
!apt-get install -y nodejs 2>&1 | tail -2
!node --version && npm --version
print('OK: Node.js + FFmpeg ready')

# ============================================================
# CELL 2: Tạo project test tối thiểu
# ============================================================
import os

PROJ = '/content/test_project'
os.makedirs(PROJ, exist_ok=True)

# Audio: 5 giây im lặng 24kHz mono
!ffmpeg -y -f lavfi -i anullsrc=r=24000:cl=mono -t 5 {PROJ}/audio.mp3 2>&1 | tail -2
print('Audio: 5s silent @ 24kHz')

# Scene HTML: 1 scene gradient text
s1_html = """<!doctype html><html lang="vi"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#080B14;width:1080px;height:1920px;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif">
<div style="text-align:center;color:white">
<h1 style="font-size:80px;font-weight:800;background:linear-gradient(135deg,#6366f1,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent">HYPERFRAMES POC</h1>
<p style="font-size:40px;color:#94a3b8;margin-top:40px">Colab T4 GPU + Headless Chrome</p>
</div>
</body></html>"""
with open(f'{PROJ}/s1.html', 'w') as f:
    f.write(s1_html)

# index.html: root timeline
idx_html = """<!doctype html><html lang="vi"><head><meta charset="UTF-8"/><meta name="viewport" content="width=1080,height=1920"/></head>
<body style="margin:0;padding:0;background:#080B14;overflow:hidden;width:1080px;height:1920px">
<div id="root" data-composition-id="test" data-width="1080" data-height="1920" data-start="0" data-duration="5">
<audio id="my-audio" src="audio.mp3" data-start="0" data-duration="5" data-track-index="0" data-volume="1"></audio>
<div id="s1" data-composition-src="./s1.html" data-start="0" data-duration="5" data-track-index="1"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script>window.__timelines=window.__timelines||{};window.__timelines["test"]=gsap.timeline({paused:!0});</script>
</body></html>"""
with open(f'{PROJ}/index.html', 'w') as f:
    f.write(idx_html)

print('Project created: index.html + s1.html + audio.mp3 (5s)')

# ============================================================
# CELL 3: RUN HYPERFRAMES RENDER (~2-5 phút)
# ============================================================
import subprocess, time, os

print('Running npx hyperframes render...')
start = time.time()

result = subprocess.run(
    ['npx', '--yes', 'hyperframes@0.6.40', 'render', '/content/test_project', '--output', '/content/test_project/output.mp4'],
    capture_output=True, text=True, timeout=300, cwd='/content/test_project'
)

elapsed = time.time() - start
print(f'Exit code: {result.returncode}')
print(f'Time: {elapsed:.1f}s')

output_path = '/content/test_project/output.mp4'
if result.returncode == 0 and os.path.exists(output_path):
    size = os.path.getsize(output_path)
    print(f'\n🎉 SUCCESS! output.mp4: {size/1024:.1f} KB')
    print('\n✅ HyperFrames WORKS on Colab!')
else:
    print('\nSTDOUT (last 1000 chars):')
    print(result.stdout[-1000:] if result.stdout else '(empty)')
    print('\nSTDERR (last 1000 chars):')
    print(result.stderr[-1000:] if result.stderr else '(empty)')
    print('\n❌ FAILED — Check errors above')
