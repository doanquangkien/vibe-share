import fs from 'fs';
import path from 'path';

const outDir = process.argv[2] || process.cwd();

const scenes = [
  { id: 1, title: 'Giọng đọc AI hoàn toàn Miễn Phí<br><span class="highlight">Do chính tay anh Code!</span>', icon: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>' },
  { id: 2, title: 'Share dùng <span class="highlight">Không Giới Hạn</span><br>Không lo hết Credit giữa chừng!', icon: '<path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z"/>' },
  { id: 3, title: 'Hiểu cảm giác cay khi bị bóp<br><span class="highlight">Làm luôn Web cho xài thoải mái</span>', icon: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>' },
  { id: 4, title: 'Nhập text & Chọn giọng<br><span class="highlight">Vài giây là có Audio ngay!</span>', icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>' },
  { id: 5, title: '<span class="highlight">Không cần nạp xu</span><br>Không cần mở ví mỗi khi tạo!', icon: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>' },
  { id: 6, title: 'Dùng ổn thì giới thiệu bạn bè<br><span class="highlight">Để anh thêm nhiều giọng mới</span>', icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/>' },
  { id: 7, title: 'Ngày nào anh còn ra video<br><span class="highlight">Là Server vẫn chưa sập!</span>', icon: '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>' },
  { id: 8, title: 'Link ở dưới <span class="highlight">Phần Bình Luận</span><br>Cứ vào test thoải mái!', icon: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>' },
  { id: 9, title: 'Thấy ngon thì <span class="highlight">Thả Follow</span><br>Không ngon cứ quay lại chửi!', icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' }
];

const kickers = [
  "FREE_AI_VOICE", "UNLIMITED_USAGE", "BUILT_FOR_CREATORS", "SUPER_FAST", "ZERO_COST", "SHARE_WITH_FRIENDS", "SERVER_ONLINE", "LINK_IN_COMMENT", "FOLLOW_AND_FEEDBACK"
];

const colors = [
  'blue', 'indigo', 'purple', 'fuchsia', 'pink', 'rose', 'orange', 'yellow', 'emerald', 'teal', 'cyan', 'sky'
];

const hexMap = {
  blue: '#3b82f6',
  indigo: '#6366f1',
  purple: '#a855f7',
  fuchsia: '#d946ef',
  pink: '#ec4899',
  rose: '#f43f5e',
  orange: '#f97316',
  yellow: '#eab308',
  emerald: '#10b981',
  teal: '#14b8a6',
  cyan: '#06b6d4',
  sky: '#0ea5e9'
};

scenes.forEach((scene, i) => {
  const color = colors[i % colors.length];
  const hex = hexMap[color];
  const kicker = kickers[i % kickers.length] + " // 0" + scene.id;
  
  const template = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../core/global.css" />
  <style>
    h2 { leading-trim: both; text-edge: cap; }
    .highlight { color: ${hex}; font-weight: 800; }
  </style>
</head>
<body class="w-[1080px] h-[1920px] bg-transparent overflow-hidden font-['Be_Vietnam_Pro']">
  <div class="w-full h-full relative" id="scene-container">
    <div id="particles" class="absolute inset-0 pointer-events-none z-0"></div>

    <div class="absolute inset-0 flex items-center justify-center z-10" style="top: -200px;">
       <div id="card" class="card-element flex flex-col items-center justify-center py-[64px] px-[64px] w-[920px] bg-slate-900/40 backdrop-blur-xl border-2 border-${color}-500/50 rounded-[40px] shadow-2xl relative overflow-hidden">
           
           <!-- Side Accent Lines (No Glow, crisp modern solid style) -->
           <div class="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-36 bg-${color}-500 rounded-r-full"></div>
           <div class="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-36 bg-${color}-500 rounded-l-full"></div>
           
           <!-- Radial Inner Background -->
           <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,${hex}22,transparent_70%)] pointer-events-none"></div>

           <!-- SVG Icon -->
           <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="${hex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-8 z-10">
              ${scene.icon}
           </svg>
           
           <!-- Kicker Text (font >= 12px) -->
           <div class="text-[22px] font-bold tracking-[0.25em] text-${color}-300 mb-6 uppercase opacity-90 z-10">
              ${kicker}
           </div>

           <!-- Main Title -->
           <h2 class="text-white text-[50px] font-medium text-center leading-[1.45] z-10 w-full">
              ${scene.title}
           </h2>
       </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
        const urlParams = new URLSearchParams(window.location.search);
        const isDev = urlParams.has('dev');
        const tl = gsap.timeline({ paused: !isDev });
        window.__timelines = window.__timelines || {};
        window.__timelines["s${scene.id}"] = tl;
        
        // Premium card entrance animation
        tl.from(".card-element", {
            opacity: 0,
            scale: 0.96,
            y: 36,
            duration: 0.8,
            ease: "back.out(1.4)"
        }, 0);
        
        tl.from("h2", {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out"
        }, 0.25);
        
        tl.from("svg", {
            opacity: 0,
            scale: 0.6,
            rotation: -10,
            duration: 0.6,
            ease: "back.out(1.8)"
        }, 0.15);

        // Seeded random for determinism
        let _seed = ${scene.id} * 1337;
        const rng = () => { _seed = _seed * 16807 % 2147483647; return (_seed - 1) / 2147483646; };
        
        // Dynamic background particles (Clean, No Glow)
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 35; i++) {
            const dot = document.createElement('div');
            dot.className = "absolute rounded-full bg-${color}-400/25 border border-${color}-400/40";
            const size = rng() * 24 + 12;
            dot.style.width = size + "px";
            dot.style.height = size + "px";
            const x = rng() * 1080;
            const y = rng() * 1920;
            dot.style.left = x + "px";
            dot.style.top = y + "px";
            
            particlesContainer.appendChild(dot);
            
            const duration = 3600;
            const velocityX = (rng() - 0.5) * 70;
            const velocityY = (rng() - 0.5) * 70;
            
            tl.to(dot, { x: velocityX * duration, y: velocityY * duration, duration: duration, ease: "none" }, 0);
        }
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, `s${scene.id}.html`), template);
});

console.log('✅ Đã tạo xong 9 files HTML (Clean Architectural Edition - No Glow - No Emoji - Crisp Lucide Icons).');
