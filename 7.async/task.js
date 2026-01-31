class AlarmClock {

	// constructor — выделяет память для объекта.
	constructor() {

		// Создайте свойство intervalId для хранения id таймера без начального значения.
		this.alarmCollection = [];

		// Создайте свойство intervalId для хранения id таймера без начального значения.
		this.intervalId = null;
	}

	// addClock — добавляет новый звонок в коллекцию существующих.
	// Принимает параметр времени в формате HH:MM — время, когда действие должно запуститься.
	// Принимает параметр функции-коллбека — действие, которое должно запуститься.

	addClock(time, callback) {
		// Проверьте, есть ли звонок с таким же временем.
		if (!time || !callback) {
			throw new Error('Отсутствуют обязательные аргументы');
		}
		if (this.alarmCollection.some(alarm => alarm.time === time)) {
			console.warn('Уже присутствует звонок на это же время');
		}

		// Добавьте в массив звонков объект со свойствами callback, time, canCall.
		const newAlarm = {
			callback,
			time,
			canCall: true
		};
		this.alarmCollection.push(newAlarm);
	}

	// removeClock — удаляет звонки по определённому времени.
	removeClock(time) {
		this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time)
	}

	// getCurrentFormattedTime — возвращает текущее время в строковом формате HH:MM.
	getCurrentFormattedTime() {
		const now = new Date();
		let hours = now.getHours();
		let minutes = now.getMinutes();
		return `${hours}:${minutes}`;

	}
	// start — запускает будильник.
	start() {
		// Проверьте наличие значения в свойстве intervalId
		if (this.intervalId !== null) {
			return;
		}
		// Создавайте новый интервал, в котором каждую секунду выполняйте действия
		this.intervalId = setInterval(() => {
			const currentTime = this.getCurrentFormattedTime();
			// Перебирайте все звонки с помощью метода forEach
			this.alarmCollection.forEach(alarm => {
				if (alarm.time === currentTime && alarm.canCall) {
					alarm.canCall = false;
					alarm.callback();
				}
			});
		}, 1000);
	}
	//stop — останавливает выполнение интервала будильника.
	stop() {
		//Вызовите функцию clearInterval для удаления интервала.
		clearInterval(this.intervalId);
		this.intervalId = null;
	}
	//resetAllCalls — сбрасывает возможность запуска всех звонков.
	resetAllCalls() {
		this.alarmCollection.forEach(alarm => {
			alarm.canCall = true;
		});
	}
	//clearAlarms — удаляет все звонки.
	clearAlarms() {
		this.stop();
		this.alarmCollection = [];

	}
}
