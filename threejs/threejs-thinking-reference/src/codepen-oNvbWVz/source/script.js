var scene, camera, light;
var particleSize = 0.2;
var aspectRatio = window.innerWidth / window.innerHeight,
		fov = 55;
var halfScreenWidth = window.innerWidth / 2,
		halfScreenHeight = window.innerHeight / 2;
var geometry, material, particles;
var renderer;
var clock, timer = 0;
var testMesh, testMaterial;
var mouseX, mouseY;
var random;
var screenWidth = window.innerWidth,
		screenHeight = window.innerHeight;
var uniforms;
var hello = document.getElementById('hello');

document.addEventListener('mousemove', function(e) {
	mouseX = e.screenX;
	mouseY = e.screenY;
});

function createParticleSystem(scene) {
		uniforms = {
				fogColor: { type: "c", value: scene.fog.color },
				fogNear: { type: "f", value: scene.fog.near },
				fogFar: { type: "f", value: scene.fog.far },
				time: {	type: "f", value: 1	},
				screenWidth: { type: "f", value: screenWidth},
				screenHeight: {type: "f", value: screenHeight},
				fog: {value: true}
		};

	var particleHolder = [];
	geometry = new THREE.TorusKnotBufferGeometry( 10, 3, 100, 64 );
	random = new Float32Array(geometry.attributes.position.count);
	for (var g = 0; g < random.length; g++) {
		random[g] = Math.random() * 1 + 0.1;
	}
	geometry.addAttribute('random', new THREE.BufferAttribute(random, 1));
	material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		fog: true,
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
		
	});
	
	// material = new THREE.PointsMaterial({size: particleSize});
	particles = new THREE.Points(geometry, material);
	scene.add(particles);
	
}

document.addEventListener('click', function() {
	uniforms.time.value = 0;
});



function init() {
	
	clock = new THREE.Clock();
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(fov, aspectRatio, 1, 1000);
	camera.position.z = 50;
	
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.shadowMapEnabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	scene.fog = new THREE.Fog(0x000000, 25, 60);
	createParticleSystem(scene);
	
	document.getElementById('world').appendChild(renderer.domElement);
}

function animate() {
	// halfScreenWidth = parseInt(document.getElementById('world').firstElementChild.getAttribute("width"));
	// halfScreenHeight = parseInt(document.getElementById('world').firstElementChild.getAttribute("height"));
	particles.rotation.y += .001;
	TweenMax.to(hello, 3, {scaleX:.7, scaleY:.7, ease:Strong.easeOut});
	TweenMax.to(hello, 2, {opacity:1});
	if (mouseX) {
		// TweenMax.to(hello, 3, {x:((mouseX + halfScreenWidth) *-0.1), y:((mouseY + halfScreenHeight) *-0.1), ease:Strong.easeOut});
		TweenMax.to(particles.rotation, 12, {x:((mouseY - 700)/200), y: ((mouseX - 200)/200), ease:Strong.easeOut});
		// console.log("mouseX: " + mouseX + ", mouseY: " + mouseY);
		// TweenMax.to(particles.position, 12, {x:((mouseX + halfScreenWidth) / 300), y: ((mouseY - halfScreenHeight) / 300), ease:Strong.easeOut});
		
	}
	
	//.fromTo( target:Object, duration:Number, fromVars:Object, toVars:Object, position:* ) :
	
	
	uniforms.time.value += 0.1;
	renderer.render(scene, camera);
	requestAnimationFrame(animate);

}

init();
animate();
