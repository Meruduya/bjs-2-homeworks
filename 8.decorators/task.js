        //Задача № 1
        // Напишите усовершенствованный кеширующий декоратор cachingDecoratorNew, аналогичный рассмотренному на лекции
        // подключаю md5

        //const md5 = require('js-md5');

        function cachingDecoratorNew(func) {
        	let cache = [];

        	function wrapper(...args) {
        		// используем md5 для получения хеша аргументов функции
        		const hash = md5(JSON.stringify(args)); // получаем правильный хеш c помощью функции md5
        		// подсказка 2 —Тогда при каждом запуске (внутри wrapper) вам следует проверять, есть ли hash для данных аргументов 

        		let objectInCache = cache.find((item) => item.hash === hash); // ищем элемент, хеш которого равен нашему хешу
        		if (objectInCache) { // если элемент найден
        			//Рекомендуем параллельно выводить результаты в консоль, чтобы вам было удобнее отладивать.
        			console.log("Из кеша: " + objectInCache.value, cache); // индекс нам известен, по индексу в массиве лежит объект
        			return "Из кеша: " + objectInCache.value;
        		}

        		let result = func(...args); // в кеше результата нет — придётся считать
        		cache.push({
        			hash: hash,
        			value: result
        		}); // добавляем элемент с правильной структурой
        		if (cache.length > 5) {
        			cache.shift(); // если слишком много элементов в кеше, надо удалить самый старый (первый) 
        		}
        		console.log("Вычисляем: " + result);
        		return "Вычисляем: " + result;
        	}
        	return wrapper;
        }
        const addAndMultiply = (a, b, c) => (a + b) * c;
        const upgraded = cachingDecoratorNew(addAndMultiply);
        upgraded(1, 2, 3); // вычисляем: 9
        upgraded(1, 2, 3); // из кеша: 9
        upgraded(2, 2, 3); // вычисляем: 12
        upgraded(3, 2, 3); // вычисляем: 15
        upgraded(4, 2, 3); // вычисляем: 18
        upgraded(5, 2, 3); // вычисляем: 21
        upgraded(6, 2, 3); // вычисляем: 24 (при этом кеш для 1, 2, 3 уничтожается)
        upgraded(1, 2, 3); // вычисляем: 9  (снова вычисляем, кеша нет)

        //Задача № 2
        function debounceDecoratorNew(func, delay) {
        	let timeoutID;

        	wrapper.count = 0; //количество алли
        	wrapper.allCount = 0; //количество всех оберток

        	function wrapper(...args) {

        		//Если есть активный таймаут, увеличиваем счетчик отправленных сигналов (первый сигнал не учитывается)
        		if (timeoutID) {
        			console.log('уже есть таймаут', args);
        			clearTimeout(timeoutID);
        		}
        		//для первого сигнала - алли + счетчик вызова увеличиваем
        		//для ориентира при первом запуске можно опираться на идентификатор таймаута
        		if (!timeoutID) {
        			console.log('первый сигнал', args);
        			func.call(this, ...args);
        			wrapper.count++;
        		}

        		timeoutID = setTimeout(() => {
        			//планируем новую задержку
        			//если у нас алли, значит мы запустили сигнал сделаем ++ 
        			console.log('сработал таймаут');
        			console.log('args', args);
        			func.apply(this, args);
        			wrapper.count++;
        		}, delay);

        		wrapper.allCount++;
        	}

        	return wrapper;
        }

        const sendSignal = (signalOrder, delay) => console.log("Сигнал отправлен", signalOrder, delay);
        const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);

        setTimeout(() => upgradedSendSignal(1, 0)); // Сигнал отправлен + будет запланирован асинхронный запуск, который
        setTimeout(() => upgradedSendSignal(2, 300), 300); // проигнорировано, так как следующий сигнал отменит предыду
        setTimeout(() => upgradedSendSignal(3, 900), 900); // проигнорировано, так как следующий сигнал отменит предыду
        setTimeout(() => upgradedSendSignal(4, 1200), 1200); // проигнорировано, так как следующий сигнал отменит преду
        setTimeout(() => upgradedSendSignal(5, 2300), 2300); // Сигнал отправлен, так как следующий вызов не успеет отм
        setTimeout(() => upgradedSendSignal(6, 4400), 4400); // проигнорировано, так как следующий сигнал отменит преду
        setTimeout(() => upgradedSendSignal(7, 4500), 4500); // Сигнал будет отправлен, так как последний вызов debounce

        setTimeout(() => {
        	console.log(upgradedSendSignal.count);
        	// было выполнено 3 отправки сигнала (  а не 2 раз первый отменен)
        	console.log(upgradedSendSignal.allCount);
        	// было выполнено 6 вызовов декорированной функции
        }, 7000);
