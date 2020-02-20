const cubeColor = {
  normal: 0xff0000,
  hover: 0x00ff00,
  click: 0x0000ff
};

const planeColor = {
  normal: 0xaaaaaa,
  hover: 0x00ff00,
  click: 0x0000ff
};

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

  const planeGeometry = new THREE.PlaneGeometry(60, 20);

  const planeMaterial = new THREE.MeshBasicMaterial({
    color: planeColor.normal
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);
  plane.name = "plane";

  scene.add(plane);

  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: cubeColor.normal
  });

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.name = "cube";

  cube.position.set(0, 3, 0);
  cube.rotation.set(0.5 * Math.PI, 0, 0);

  scene.add(cube);

  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  let isMouseDown = false;

  function onMouseMove(event) {
    // (-1 to +1)

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  new THREE.OrbitControls(camera, renderer.domElement);

  const update = () => {
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    scene.children.forEach(element => {
      if (element instanceof THREE.Mesh) {
        const colorObject = element.name === "cube" ? cubeColor : planeColor;
        element.material.color.set(colorObject.normal);
      }
    });

    console.log("intersects", intersects);

    if (intersects[0]) {
      const colorObject =
        intersects[0].object.name === "cube" ? cubeColor : planeColor;
      if (!isMouseDown) {
        intersects[0].object.material.color.set(colorObject.hover);
      } else {
        intersects[0].object.material.color.set(colorObject.click);
      }
    }

    renderer.render(scene, camera);

    requestAnimationFrame(update);
  };

  update();

  window.addEventListener("mousemove", onMouseMove, false);

  window.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  window.addEventListener("mouseup", () => {
    isMouseDown = false;
  });
};

init();
