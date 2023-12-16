import Sizes from "./utils/sizes";
import Time from "./utils/time";
import Camera from "./camera";
import Resources from "./utils/resources";
import Renderer from "./renderer";
import World from "./world/world";
import sources from "./sources";
import Debug from "./utils/debug";

import * as THREE from "three";

let instance = null;

export default class Experience {
	constructor(canvas) {
		if (instance) {
			return instance;
		}

		instance = this;

		window.experience = this;

		this.canvas = canvas;

		this.debug = new Debug()

		this.sizes = new Sizes();
		this.time = new Time();
		this.scene = new THREE.Scene();
		this.resources = new Resources(sources);
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.world = new World();

		this.sizes.on("resize", () => {
			this.resize();
		});

		this.time.on("animate", () => {
			this.update();
		});
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		this.camera.update();
		this.world.update()
		this.renderer.update();
	}

	destroy(){
		this.sizes.off('resize')
		this.time.off('animate')


		this.scene.traverse((child)=>{
			if (child instanceof THREE.Mesh) {
				child.geometry.dispose()

				for (const key in child.material) {
					const value = child.material[key]

					if (value && typeof value.dispose === 'function') {
						value.dispose()
					}
				}
			}
		})

		this.camera.controls.dispose()

		if (this.debug.active) {
			this.debug.ui.destroy()
		}

	}

}
