// Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Heart shape (Y-тісегестіріп, тік жасау)
const x = 0, y = 0;
const heartShape = new THREE.Shape();
heartShape.moveTo(x + 5, -(y + 5));
heartShape.bezierCurveTo(x + 5, -(y + 5), x + 4, -y, x, -y);
heartShape.bezierCurveTo(x - 6, -y, x - 6, -(y + 7), x - 6, -(y + 7));
heartShape.bezierCurveTo(x - 6, -(y + 11), x - 3, -(y + 15.4), x + 5, -(y + 19));
heartShape.bezierCurveTo(x + 13, -(y + 15.4), x + 16, -(y + 11), x + 16, -(y + 7));
heartShape.bezierCurveTo(x + 16, -(y + 7), x + 16, -y, x + 10, -y);
heartShape.bezierCurveTo(x + 7, -y, x + 5, -(y + 5), x + 5, -(y + 5));

const geometry = new THREE.ShapeGeometry(heartShape);
const material = new THREE.MeshBasicMaterial({ color: 0xff0040, transparent:true, opacity:0.95 });
const heart = new THREE.Mesh(geometry, material);
scene.add(heart);

heart.scale.set(0.2,0.2,0.2);
heart.position.set(-2, -2, 0);

camera.position.z = 15;

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const positions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) positions[i] = (Math.random() - 0.5) * 20;
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particles = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({ color:0xffff66, size:0.12 }));
scene.add(particles);

// Animate
let scaleDir = 1;
function animate(){
  requestAnimationFrame(animate);
  if (heart.scale.x > 0.25) scaleDir = -1;
  if (heart.scale.x < 0.2) scaleDir = 1;
  heart.scale.x += 0.001 * scaleDir;
  heart.scale.y += 0.001 * scaleDir;
  particles.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
