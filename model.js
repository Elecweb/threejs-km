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

  camera.position.set(0, 0, 10);
  camera.lookAt(scene.position);

  const loader = new THREE.GLTFLoader();

  let mesh;

  loader.load("./rocket.gltf", function(gltf) {
    // scene.add(gltf.scene);

    gltf.scene.traverse(function(child) {
      if (child.name === "shipModel") {
        mesh = child;
        child.material = new THREE.MeshBasicMaterial({
          color: 0xe70300
        });
        child.children[0].material = new THREE.MeshBasicMaterial({
          color: 0xffffff
        });

        child.children[1].material = new THREE.MeshBasicMaterial({
          map: child.children[1].material.map,
          side: THREE.DoubleSide,
          transparent: true
        });

        mesh.rotation.x = 0.5 * Math.PI;
      }
    });

    // ship = mesh;

    scene.add(mesh);

    renderer.render(scene, camera);
  });

  new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  const update = () => {
    renderer.render(scene, camera);
    if (mesh) {
      mesh.rotation.x += 0.1;
    }
    requestAnimationFrame(update);
  };

  update();
};

init();
