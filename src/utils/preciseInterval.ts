export function preciseInterval(callback: Function, interval: number) {
	let isRunning = true;
	let startTime = Date.now();
	function run() {
		if (!isRunning) {
			return;
		}
		const elapsedTime = Date.now() - startTime;
		if (elapsedTime >= interval) {
			callback();
			startTime = Date.now();
		}
		requestAnimationFrame(run);
	}
	run();
	// 返回一个用于取消的函数
	return function cancel() {
		isRunning = false;
	};
}
