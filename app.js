import * as THREE from "three";

/* =========================================================
   Games — edit this list to point at your real projects.
   ========================================================= */
const GAMES = [
  {
    title: "Neon Drift",
    desc: "A synthwave arcade racer. Chase high scores through endless neon canyons.",
    emoji: "🏎️",
    tags: ["Arcade", "WebGL", "Racing"],
    url: "#",
    hue: 285,
  },
  {
    title: "Voxel Frontier",
    desc: "Open-world block builder with survival crafting and procedural worlds.",
    emoji: "⛏️",
    tags: ["Sandbox", "Survival"],
    url: "#",
    hue: 140,
  },
  {
    title: "Starbound Tactics",
    desc: "Turn-based space strategy. Command a fleet across a dying galaxy.",
    emoji: "🚀",
    tags: ["Strategy", "Turn-based"],
    url: "#",
    hue: 200,
  },
  {
    title: "Pixel Dungeon",
    desc: "A roguelite dungeon crawler with permadeath and procedural loot.",
    emoji: "⚔️",
    tags: ["Roguelite", "RPG"],
    url: "#",
    hue: 20,
  },
  {
    title: "Gravity Golf",
    desc: "Physics puzzle golf across tiny planets with real orbital mechanics.",
    emoji: "⛳",
    tags: ["Puzzle", "Physics"],
    url: "#",
    hue: 50,
  },
  {
    title: "Echo Runner",
    desc: "A rhythm platformer where the level pulses in time with the music.",
    emoji: "🎵",
    tags: ["Rhythm", "Platformer"],
    url: "#",
    hue: 330,
  },
];

/* ---------- Build the game cards ---------- */
function buildGames() {
  const grid = document.getElementById("game-grid");
  const frag = document.createDocumentFragment();

  for (const g of GAMES) {
    const a = document.createElement("a");
    a.className = "game-card reveal";
    a.href = g.url;
    if (g.url !== "#") {
      a.target = "_blank";
      a.rel = "noopener";
    }

    const thumb = document.createElement("div");
    thumb.className = "game-thumb";
    thumb.style.background = `linear-gradient(135deg, hsl(${g.hue} 70% 22%), hsl(${(g.hue + 40) % 360} 75% 12%))`;
    thumb.textContent = g.emoji;

    const body = document.createElement("div");
    body.className = "game-body";
    body.innerHTML = `
      <h3>${g.title}</h3>
      <p>${g.desc}</p>
      <div class="game-tags">${g.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="play">Play now →</div>
    `;

    a.append(thumb, body);
    frag.appendChild(a);
  }
  grid.appendChild(frag);
}

/* ---------- Reveal-on-scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal, .section-title, .section-sub, .hero > *");
  els.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}

/* =========================================================
   Three.js background — floating cubes, spheres & toruses
   that rotate and drift as you scroll.
   ========================================================= */
function initThree() {
  const canvas = document.getElementById("bg");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05060a, 0.03);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 16);

  /* Lights */
  scene.add(new THREE.AmbientLight(0x404066, 1.2));

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(6, 8, 10);
  scene.add(key);

  const purple = new THREE.PointLight(0x7c5cff, 60, 60);
  purple.position.set(-12, 6, 6);
  scene.add(purple);

  const cyan = new THREE.PointLight(0x22d3ee, 55, 60);
  cyan.position.set(12, -6, 4);
  scene.add(cyan);

  /* Shared geometries (reused for perf) */
  const geometries = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.IcosahedronGeometry(0.75, 0),
    new THREE.SphereGeometry(0.7, 24, 16),
    new THREE.TorusGeometry(0.6, 0.25, 16, 40),
    new THREE.TorusKnotGeometry(0.5, 0.18, 90, 12),
  ];

  const palette = [0x7c5cff, 0x22d3ee, 0xb16bff, 0x38bdf8, 0xf472b6, 0x34d399];

  const shapes = [];
  const COUNT = 34;

  for (let i = 0; i < COUNT; i++) {
    const geo = geometries[i % geometries.length];
    const mat = new THREE.MeshStandardMaterial({
      color: palette[i % palette.length],
      roughness: 0.35,
      metalness: 0.5,
      flatShading: geo.type === "IcosahedronGeometry",
    });
    const mesh = new THREE.Mesh(geo, mat);

    // Spread across a tall column so there's always something in view while scrolling.
    mesh.position.set(
      (Math.random() - 0.5) * 26,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 18 - 4
    );
    const s = 0.6 + Math.random() * 1.7;
    mesh.scale.setScalar(s);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    mesh.userData.spin = new THREE.Vector3(
      (Math.random() - 0.5) * 0.6,
      (Math.random() - 0.5) * 0.6,
      (Math.random() - 0.5) * 0.6
    );
    mesh.userData.floatOffset = Math.random() * Math.PI * 2;
    mesh.userData.baseX = mesh.position.x;

    scene.add(mesh);
    shapes.push(mesh);
  }

  /* Faint starfield for depth */
  const starGeo = new THREE.BufferGeometry();
  const starCount = 600;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3 + 0] = (Math.random() - 0.5) * 120;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 160;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 20;
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: 0x8899cc, size: 0.12, transparent: true, opacity: 0.7 })
  );
  scene.add(stars);

  /* ---- Scroll + pointer state ---- */
  let scrollY = window.scrollY;
  let targetScroll = scrollY;
  window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;
  }, { passive: true });

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener("pointermove", (e) => {
    pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* ---- Resize ---- */
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /* ---- Animate ---- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth the scroll value.
    scrollY += (targetScroll - scrollY) * 0.08;
    const scrollNorm = scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);

    // Ease pointer.
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;

    for (const m of shapes) {
      const spin = m.userData.spin;
      const rate = reduceMotion ? 0.15 : 1;
      // Rotation is driven by both time and scroll — scrolling spins the shapes faster.
      m.rotation.x += spin.x * 0.01 * rate + scrollNorm * 0.02;
      m.rotation.y += spin.y * 0.01 * rate + scrollNorm * 0.02;
      m.rotation.z += spin.z * 0.008 * rate;

      // Gentle bob.
      m.position.x = m.userData.baseX + Math.sin(t * 0.5 + m.userData.floatOffset) * 0.6;
    }

    stars.rotation.y = t * 0.02;

    // Camera glides down the column as you scroll, with a subtle parallax tilt.
    camera.position.y = -scrollY * 0.02;
    camera.position.x += (pointer.x * 2.2 - camera.position.x) * 0.05;
    camera.lookAt(0, camera.position.y - pointer.y * 1.5, 0);

    renderer.render(scene, camera);
  }
  animate();
}

/* ---------- Boot ---------- */
buildGames();
initReveal();
document.getElementById("year").textContent = new Date().getFullYear();

try {
  initThree();
} catch (err) {
  // If WebGL is unavailable, the site still works — just without the 3D backdrop.
  console.warn("3D background disabled:", err);
}
