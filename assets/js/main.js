// --- Mobile Menu ---
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// --- Header Scroll Effect ---
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg', 'bg-deep-900/90');
            header.classList.remove('py-4');
            header.classList.add('py-2');
        } else {
            header.classList.remove('shadow-lg', 'bg-deep-900/90');
            header.classList.remove('py-2');
            header.classList.add('py-4');
        }
    });
}

// --- Scroll Reveal Animation ---
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// --- Module Switcher ---
function switchModule(id) {
    // Buttons
    document.querySelectorAll('.module-btn').forEach(btn => {
        btn.classList.remove('bg-neon-cyan/20', 'text-white', 'border-neon-cyan');
        btn.classList.add('bg-transparent', 'text-gray-400', 'border-gray-600');
        
        if (btn.dataset.target === id) {
            btn.classList.remove('bg-transparent', 'text-gray-400', 'border-gray-600');
            btn.classList.add('bg-neon-cyan/20', 'text-white', 'border-neon-cyan');
        }
    });

    // Content
    document.querySelectorAll('.module-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('opacity-100');
        content.classList.add('opacity-0');
    });

    const target = document.getElementById('module-' + id);
    if (target) {
        target.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            target.classList.remove('opacity-0');
            target.classList.add('opacity-100');
        }, 50);
    }
}

// make switchModule globally accessible (used by inline onclicks)
window.switchModule = switchModule;

// --- Data Simulation ---
function updateData() {
    // Helper function for smooth number transition
    const animateValue = (element, start, end, duration, suffix = '', precision = 2) => {
        if (!element) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = (progress * (end - start) + start).toFixed(precision);
            element.innerText = value + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // System Stability
    const elStability = document.getElementById('system-stability');
    if (elStability) {
        const currentStability = parseFloat(elStability.innerText);
        const targetStability = 99.997 + Math.random() * (99.999 - 99.997);
        animateValue(elStability, currentStability, targetStability, 1000, '%', 3);
    }

    // Automatic Disposal Rate
    const elDisposal = document.getElementById('auto-disposal');
    if (elDisposal) {
        const currentDisposal = parseFloat(elDisposal.innerText);
        const targetDisposal = 92.2 + Math.random() * (92.5 - 92.2);
        animateValue(elDisposal, currentDisposal, targetDisposal, 1000, '%', 1);
    }

    // Altitude
    const elAlt = document.getElementById('data-alt');
    if (elAlt) {
        const currentAlt = parseFloat(elAlt.innerText);
        const targetAlt = 408.0 + (Math.random() - 0.5) * 0.5;
        animateValue(elAlt, currentAlt, targetAlt, 1000, ' km');
        
        // Update bar if exists
        const barAlt = elAlt.parentElement.nextElementSibling.firstElementChild;
        if (barAlt) {
            // Normalize 408 +/- 0.5 to percentage (approx range 400-416)
            const pct = ((targetAlt - 400) / 16) * 100; 
            barAlt.style.width = Math.max(10, Math.min(90, pct)) + '%';
            barAlt.style.transition = 'width 1s ease-out';
        }
    }

    // Velocity
    const elVel = document.getElementById('data-vel');
    if (elVel) {
        // Just small fluctuations
        const baseVel = 27600;
        const noise = Math.floor((Math.random() - 0.5) * 50);
        elVel.innerText = (baseVel + noise).toLocaleString() + ' km/h';
    }

    // Temperature
    const elTemp = document.getElementById('data-temp');
    if (elTemp) {
        const currentTemp = parseFloat(elTemp.innerText);
        const targetTemp = 23.00 + (Math.random() - 0.5) * 0.2;
        animateValue(elTemp, currentTemp, targetTemp, 1000, ' °C');
    }

    // CPU
    const elCpu = document.getElementById('data-cpu');
    const barCpu = document.getElementById('bar-cpu');
    if (elCpu && barCpu) {
        const currentCpu = parseInt(elCpu.innerText);
        const targetCpu = Math.max(10, Math.min(90, Math.floor(42 + (Math.random() - 0.5) * 30)));
        
        // Custom animation for integer
        let startTimestamp = null;
        const duration = 800;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const val = Math.floor(progress * (targetCpu - currentCpu) + currentCpu);
            elCpu.innerText = val + '%';
            barCpu.style.width = val + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
        barCpu.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Color change based on load
        if (targetCpu > 80) {
            elCpu.className = 'text-red-500 font-bold transition-colors duration-500';
            barCpu.className = 'bg-red-500 h-full transition-colors duration-500';
        } else if (targetCpu > 50) {
            elCpu.className = 'text-neon-purple font-bold transition-colors duration-500';
            barCpu.className = 'bg-neon-purple h-full transition-colors duration-500';
        } else {
            elCpu.className = 'text-neon-cyan font-bold transition-colors duration-500';
            barCpu.className = 'bg-neon-cyan h-full transition-colors duration-500';
        }
    }
}
setInterval(updateData, 2000);

// --- Telemetry Card Rotation ---
const card = document.querySelector('.telemetry-card');

card.addEventListener('mousemove', e => {
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left - r.width / 2;
  const y = e.clientY - r.top - r.height / 2;
  card.style.transform =
    `rotateX(${ -y / 5 }deg) rotateY(${ x / 5 }deg)`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0) rotateY(0)';
});


// --- Three.js Background ---
function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Objects
    // 1. Earth Wireframe
    const geometry = new THREE.IcosahedronGeometry(2.5, 2);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x003366, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.3 
    });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // 2. Particles (Stars/Data)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00F0FF,
        transparent: true,
        opacity: 0.8
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 3. Floating Ring (Orbit)
    const ringGeometry = new THREE.TorusGeometry(3.5, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x00A3FF, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.rotation.y = 0.2;
    scene.add(ring);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        earth.rotation.y += 0.001;
        particlesMesh.rotation.y += 0.0005;
        ring.rotation.z -= 0.002;

        renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Three.js only after load
window.addEventListener('load', initThreeJS);

// --- System Mode Switching ---
const modes = ['normal', 'combat', 'night'];
let currentModeIndex = 0;

function cycleMode() {
    currentModeIndex = (currentModeIndex + 1) % modes.length;
    const newMode = modes[currentModeIndex];
    const body = document.body;
    
    // Reset classes
    body.classList.remove('mode-combat', 'mode-night');
    
    // UI Elements
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    const hudOverlay = document.getElementById('hud-overlay');
    
    // Apply new mode
    if (newMode === 'combat') {
        body.classList.add('mode-combat');
        if (statusIndicator) statusIndicator.className = 'w-2 h-2 rounded-full bg-red-600 animate-ping';
        if (statusText) {
            statusText.innerText = 'RED ALERT';
            statusText.className = 'text-xs text-red-500 font-mono font-bold';
        }
        if (hudOverlay) {
            hudOverlay.classList.remove('hidden');
            hudOverlay.classList.remove('opacity-20');
            hudOverlay.classList.add('opacity-40');
        }
        addSystemLog('SYSTEM ALERT: COMBAT MODE ENGAGED', 'error');
    } else if (newMode === 'night') {
        body.classList.add('mode-night');
        if (statusIndicator) statusIndicator.className = 'w-2 h-2 rounded-full bg-gray-500';
        if (statusText) {
            statusText.innerText = 'STEALTH MODE';
            statusText.className = 'text-xs text-gray-400 font-mono';
        }
        if (hudOverlay) {
            hudOverlay.classList.remove('hidden');
            hudOverlay.classList.add('opacity-10'); // Very dim
        }
        addSystemLog('SYSTEM: STEALTH PROTOCOLS ACTIVE', 'info');
    } else {
        // Normal
        if (statusIndicator) statusIndicator.className = 'w-2 h-2 rounded-full bg-green-500 animate-pulse';
        if (statusText) {
            statusText.innerText = 'SYSTEM NORMAL';
            statusText.className = 'text-xs text-green-400 font-mono';
        }
        if (hudOverlay) {
            hudOverlay.classList.add('hidden');
        }
        addSystemLog('SYSTEM: NORMAL OPERATIONS RESUMED', 'success');
    }
}
// Make accessible
window.cycleMode = cycleMode;

// --- System Log Terminal ---
const logContainer = document.getElementById('system-log');

function addSystemLog(message, type = 'info') {
    if (!logContainer) return;
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    const entry = document.createElement('div');
    entry.className = 'flex gap-2 text-[10px] opacity-80 hover:opacity-100 transition-opacity';
    
    let colorClass = 'text-gray-400';
    if (type === 'error') colorClass = 'text-red-400 font-bold';
    if (type === 'success') colorClass = 'text-green-400';
    if (type === 'warning') colorClass = 'text-yellow-400';

    entry.innerHTML = `
        <span class="text-gray-600">[${time}]</span>
        <span class="${colorClass}">${message}</span>
    `;
    
    logContainer.appendChild(entry);
    
    // Auto scroll
    logContainer.scrollTop = logContainer.scrollHeight;
    
    // Limit log history
    if (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.children[0]);
    }
}

// Simulate random logs
const logMessages = [
    { msg: 'Sensors calibrating...', type: 'info' },
    { msg: 'Data stream optimized.', type: 'success' },
    { msg: 'Checking life support systems.', type: 'info' },
    { msg: 'Packet loss detected on Channel 4.', type: 'warning' },
    { msg: 'Orbit correction calculated.', type: 'success' },
    { msg: 'Background radiation nominal.', type: 'info' },
    { msg: 'AI Core load balancing.', type: 'info' }
];

setInterval(() => {
    // 30% chance to log something
    if (Math.random() > 0.7) {
        const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
        addSystemLog(randomLog.msg, randomLog.type);
    }
}, 2000);

// Initial logs
setTimeout(() => addSystemLog('System initialized.', 'success'), 500);
setTimeout(() => addSystemLog('Connecting to satellite network...', 'info'), 1500);
setTimeout(() => addSystemLog('Connection established.', 'success'), 2500);

