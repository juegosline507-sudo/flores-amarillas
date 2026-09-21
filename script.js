const container = document.getElementById('canvas-container');

// Escena y cámara
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.015);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 18, 50);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// 1. Campo masivo de Estrellas/Chispas brillantes
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 4000;
const starPositions = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i += 3) {
  starPositions[i] = (Math.random() - 0.5) * 180;
  starPositions[i + 1] = (Math.random() - 0.5) * 180;
  starPositions[i + 2] = (Math.random() - 0.5) * 180;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const starsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.35,
  transparent: true,
  opacity: 0.9
});
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// 2. Planeta central (Sombra/Agujero Negro)
const sphereGeo = new THREE.SphereGeometry(8.5, 32, 32);
const sphereMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
const planet = new THREE.Mesh(sphereGeo, sphereMat);
planet.position.set(0, 2, 0);
scene.add(planet);

// 3. Anillo de Luz Amarillo Radiante
const ringGeo = new THREE.RingGeometry(9.2, 11.5, 64);
const ringMat = new THREE.MeshBasicMaterial({
  color: 0xffea00,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.95
});
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotation.x = Math.PI / 2.3;
ring.position.set(0, 2, 0);
scene.add(ring);

// 4. Textura de Flores Amarillas
function createGlowFlowerTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.translate(64, 64);
  ctx.fillStyle = '#ffea00';
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.ellipse(0, -32, 10, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.rotate((Math.PI * 2) / 12);
  }

  ctx.beginPath();
  ctx.arc(0, 0, 16, 0, Math.PI * 2);
  ctx.fillStyle = '#5a3a00';
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

const flowerTexture = createGlowFlowerTexture();

// Generar Flores distribuidas
const flowerGroup = new THREE.Group();
const numFlowers = 140;

for (let i = 0; i < numFlowers; i++) {
  const spriteMat = new THREE.SpriteMaterial({
    map: flowerTexture,
    transparent: true,
    opacity: 0.95
  });
  const sprite = new THREE.Sprite(spriteMat);

  const radius = 13 + Math.random() * 25;
  const angle = Math.random() * Math.PI * 2;
  const yOffset = (Math.random() - 0.5) * 4;

  sprite.position.x = Math.cos(angle) * radius;
  sprite.position.z = Math.sin(angle) * radius;
  sprite.position.y = 2 + (Math.sin(angle * 2) * 2) + yOffset;

  const scale = 1.8 + Math.random() * 1.8;
  sprite.scale.set(scale, scale, 1);

  flowerGroup.add(sprite);
}
scene.add(flowerGroup);

// 5. Frases brillantes flotando en el espacio 3D
const messages = [
  "Eres mi luz 💛",
  "Universo de Flores 🌻",
  "Te quiero mucho ✨",
  "Siempre brillas 🌟",
  "Nunca te olvides lo especial que eres 💛",
  "Flores para ti 🌻",
  "Tu sonrisa ilumina mi día ✨"
];

const messageElements = [];

messages.forEach((text) => {
  const div = document.createElement('div');
  div.className = 'message-tag';
  div.innerText = text;
  document.body.appendChild(div);

  const angle = Math.random() * Math.PI * 2;
  const radius = 15 + Math.random() * 18;
  const height = -2 + Math.random() * 12;

  messageElements.push({
    element: div,
    pos: new THREE.Vector3(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    )
  });
});

// Animación principal
let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  ring.rotation.z = time * 0.12;
  flowerGroup.rotation.y = time * 0.15;
  starField.rotation.y = time * 0.03;

  // Actualizar posiciones de texto 3D
  messageElements.forEach((item) => {
    const rotatedPos = item.pos.clone();
    rotatedPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), time * 0.1);

    const tempV = rotatedPos.clone();
    tempV.project(camera);

    const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(tempV.y * 0.5) + 0.5) * window.innerHeight;

    item.element.style.left = `${x}px`;
    item.element.style.top = `${y}px`;

    if (tempV.z > 1) {
      item.element.style.display = 'none';
    } else {
      item.element.style.display = 'block';
    }
  });

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
