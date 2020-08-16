declare module '*.worker.ts' {
	class WebpackWorker extends Worker {
		constructor()
	}

	const self: Worker

	export default WebpackWorker
}