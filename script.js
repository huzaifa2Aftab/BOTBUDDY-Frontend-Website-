// 3D Hero Section with Three.js
const canvas = document.getElementById('hero3d');
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  // Add a spinning torus knot (main feature)
  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0xa0e7e5, metalness: 0.7, roughness: 0.2 });
  const torusKnot = new THREE.Mesh(geometry, material);
  torusKnot.position.x = -1.5;
  scene.add(torusKnot);

  // 3D Bot Model (centered)
  const bot = new THREE.Group();
  // Body
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 1.1, 32), new THREE.MeshStandardMaterial({ color: 0x1de9b6, metalness: 0.7, roughness: 0.3 }));
  bot.add(body);
  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 32), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.6, roughness: 0.2 }));
  head.position.y = 0.75;
  bot.add(head);
  // Eyes
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x181848 });
  const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), eyeMat);
  leftEye.position.set(-0.09, 0.82, 0.28);
  const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), eyeMat);
  rightEye.position.set(0.09, 0.82, 0.28);
  bot.add(leftEye);
  bot.add(rightEye);
  // Arms
  const armMat = new THREE.MeshStandardMaterial({ color: 0xffc107 });
  const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.7, 16), armMat);
  leftArm.position.set(-0.45, 0.25, 0);
  leftArm.rotation.z = Math.PI / 4;
  bot.add(leftArm);
  const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.7, 16), armMat);
  rightArm.position.set(0.45, 0.25, 0);
  rightArm.rotation.z = -Math.PI / 4;
  bot.add(rightArm);
  // Legs
  const legMat = new THREE.MeshStandardMaterial({ color: 0x23236c });
  const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16), legMat);
  leftLeg.position.set(-0.15, -0.85, 0);
  bot.add(leftLeg);
  const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16), legMat);
  rightLeg.position.set(0.15, -0.85, 0);
  bot.add(rightLeg);
  // Antenna
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.25, 8), new THREE.MeshStandardMaterial({ color: 0xff61a6 }));
  antenna.position.set(0, 1.05, 0);
  bot.add(antenna);
  const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), new THREE.MeshStandardMaterial({ color: 0xff61a6 }));
  antennaTip.position.set(0, 1.18, 0);
  bot.add(antennaTip);
  bot.position.x = 1.2;
  scene.add(bot);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xa0e7e5, 1, 100);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  camera.position.z = 4;

  let colorShift = 0;
  let armWave = 0;
  function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.013;
    colorShift += 0.01;
    torusKnot.material.color.setHSL((0.5 + Math.sin(colorShift) * 0.2), 0.7, 0.7);
    // Animate bot: head rotation and left arm waving
    head.rotation.y = Math.sin(Date.now() * 0.001) * 0.5;
    leftArm.rotation.x = Math.sin(Date.now() * 0.002) * 0.7;
    renderer.render(scene, camera);
  }
  animate();

  // Responsive resize
  window.addEventListener('resize', () => {
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  });
}

// Contact form handler (demo only)
document.querySelector('form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for contacting us! We will get back to you soon.');
  this.reset();
}); 