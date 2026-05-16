document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.5;
        particlesContainer.appendChild(particle);
    }
    const orb1 = document.createElement('div');
    orb1.className = 'glow-orb glow-orb-1';
    document.body.appendChild(orb1);
    const orb2 = document.createElement('div');
    orb2.className = 'glow-orb glow-orb-2';
    document.body.appendChild(orb2);
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
    const form = document.getElementById('notifyForm');
    const emailInput = document.getElementById('emailInput');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();

        if (!email) {
            formMessage.textContent = 'Email tidak boleh kosong.';
            formMessage.className = 'form-message error';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Format email tidak valid.';
            formMessage.className = 'form-message error';
            return;
        }
        const btn = form.querySelector('.notify-btn');
        btn.disabled = true;
        btn.querySelector('.btn-text').textContent = 'Mengirim...';

        setTimeout(() => {
            formMessage.textContent = '✓ Terima kasih! Kami akan menghubungi Anda saat peluncuran.';
            formMessage.className = 'form-message success';
            emailInput.value = '';
            btn.disabled = false;
            btn.querySelector('.btn-text').textContent = 'Beritahu Saya';

            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }, 1200);
    });
    const canvas = document.getElementById('canvas3d');
    const loader = document.getElementById('loader');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const accentLight = new THREE.PointLight(0x10B981, 2, 20);
    accentLight.position.set(-3, 2, 3);
    scene.add(accentLight);

    const rimLight = new THREE.PointLight(0x34D399, 1.5, 20);
    rimLight.position.set(3, -2, 2);
    scene.add(rimLight);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.minPolarAngle = Math.PI * 0.3;
    controls.maxPolarAngle = Math.PI * 0.7;
    let mixer = null;
    let clock = new THREE.Clock();
    let model = null;
    function createFallbackModel() {
        const group = new THREE.Group();
        const geometry = new THREE.TorusKnotGeometry(1, 0.35, 128, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0x10B981,
            metalness: 0.7,
            roughness: 0.2,
            emissive: 0x059669,
            emissiveIntensity: 0.15,
        });
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
        const ringGeo = new THREE.TorusGeometry(1.8, 0.01, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x34D399,
            transparent: true,
            opacity: 0.3,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
        const particlesGeo = new THREE.BufferGeometry();
        const count = 200;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 6;
        }
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMat = new THREE.PointsMaterial({
            color: 0x10B981,
            size: 0.02,
            transparent: true,
            opacity: 0.6,
        });
        const points = new THREE.Points(particlesGeo, particlesMat);
        group.add(points);

        scene.add(group);
        model = group;
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
    const gltfLoader = new THREE.GLTFLoader();
    const modelPath = 'model/model.glb';

    gltfLoader.load(
        modelPath,
        (gltf) => {
            model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.5 / maxDim;

            model.scale.setScalar(scale);
            model.position.sub(center.multiplyScalar(scale));
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                        child.material.envMapIntensity = 1.5;
                    }
                }
            });

            scene.add(model);
            if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(model);
                gltf.animations.forEach((clip) => {
                    mixer.clipAction(clip).play();
                });
                console.log(`🎬 Memutar ${gltf.animations.length} animasi dari model`);
            }
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 300);
        },
        (xhr) => {
            if (xhr.lengthComputable) {
                const percent = Math.round((xhr.loaded / xhr.total) * 100);
                document.querySelector('.loader-text').textContent = `Memuat Model 3D... ${percent}%`;
            }
        },
        (error) => {
            console.warn('⚠️ Gagal memuat model GLB, menggunakan model fallback:', error);
            console.warn('Pastikan file ada di path: model/model.glb');
            createFallbackModel();
        }
    );
    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();
        if (mixer) {
            mixer.update(delta);
        }
        if (model && !mixer) {
            model.rotation.y += delta * 0.3;
            model.position.y = Math.sin(elapsed * 0.8) * 0.15;
        }
        accentLight.position.x = Math.sin(elapsed * 0.5) * 4;
        accentLight.position.z = Math.cos(elapsed * 0.5) * 4;
        rimLight.position.x = Math.cos(elapsed * 0.3) * 3;
        rimLight.position.z = Math.sin(elapsed * 0.3) * 3;

        controls.update();
        renderer.render(scene, camera);
    }

    animate();
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    function updateCameraParallax() {
        requestAnimationFrame(updateCameraParallax);
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.02;
    }
    updateCameraParallax();

});