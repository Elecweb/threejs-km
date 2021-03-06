const init = () => {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);

  const axes = new THREE.AxesHelper(20);
  scene.add(axes);

  const planeGeometry = new THREE.PlaneGeometry(60, 20);

  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);

  scene.add(plane);

  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  cube.position.set(0, 3, 0);
  cube.rotation.set(2 * Math.PI, 0, 0);

  scene.add(cube);

  document.body.appendChild(renderer.domElement);

  new THREE.OrbitControls(camera, renderer.domElement);

  renderer.render(scene, camera);

  const update = () => {
    requestAnimationFrame(() => {
      update();
      renderer.render(scene, camera);
    });
  };

  update();
};

init();
