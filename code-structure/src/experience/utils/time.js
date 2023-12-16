import EventEmitter from "./eventemitter";

export default class Time extends EventEmitter{
	constructor() {
		super()

		this.start = Date.now();
		this.current = this.start
		this.elapsed = 0
		this.delta = 16

		window.requestAnimationFrame(()=>{
			this.animate()
		})

	}

	animate(){
		const currentTime = Date.now()
		this.delta = currentTime - this.current
		this.current = currentTime
		this.elapsed = this.current - this.start

		this.trigger('animate')

		window.requestAnimationFrame(()=>{
			this.animate()
		})
	}
}