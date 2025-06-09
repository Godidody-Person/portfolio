// Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor( 0xffffff, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("append").appendChild(renderer.domElement);

    // Create a canvas texture with gradient for cube faces
    function createGradientTexture(color1, color2) {
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);

      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      return new THREE.CanvasTexture(canvas);
    }

    // Create materials for each face with different gradients
    const materials = [
      new THREE.MeshBasicMaterial({ map: createGradientTexture('#a1d6ff', '#bda9ff') }), // right
      new THREE.MeshBasicMaterial({ map: createGradientTexture('#3d94ba', '#bd41ff') }), // left
      new THREE.MeshBasicMaterial({ map: createGradientTexture('#00296c', '#8f52b0') }), // top
      new THREE.MeshBasicMaterial({ map: createGradientTexture('#0074f8ff', '#21aaff') }), // bottom
      new THREE.MeshBasicMaterial({ map: createGradientTexture('#9b18ff', '#2c5cfa') }), // front
      new THREE.MeshBasicMaterial({ map: createGradientTexture('#2fc0ff', '#0321ff') }), // back
    ];

    // Create cube geometry and mesh
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Track mouse position normalized to [-1, 1]
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const dampening = 0.05;

    function onMouseMove(event) {
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', onMouseMove, false);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Rotate cube continuously
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Smoothly move cube based on mouse position with dampening
      mouseX += (targetX - mouseX) * dampening;
      mouseY += (targetY - mouseY) * dampening;

      cube.position.x = mouseX * 2;
      cube.position.y = mouseY * 2;

      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });