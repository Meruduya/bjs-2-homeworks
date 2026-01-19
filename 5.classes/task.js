// ========== ЗАДАЧА 1. ПЕЧАТНОЕ ИЗДАНИЕ ==========

// Базовый класс для всех печатных изданий
class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  // Геттер для state
  get state() {
    return this._state;
  }

  // Сеттер для state с ограничениями
  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  // Метод для восстановления издания
  fix() {
    this.state = this._state * 1.5;
  }
}

// Класс для журналов
class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

// Класс для книг
class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

// Класс для романов
class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

// Класс для фантастики
class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

// Класс для детективов
class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

// ========== ЗАДАЧА 2. БИБЛИОТЕКА ==========

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  // Добавление книги в библиотеку (только если state > 30)
  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  // Поиск книги по параметру
  findBookBy(type, value) {
    const foundBook = this.books.find(book => book[type] === value);
    return foundBook || null;
  }

  // Выдача книги читателю с удалением из библиотеки
  giveBookByName(bookName) {
    const bookIndex = this.books.findIndex(book => book.name === bookName);
    
    if (bookIndex !== -1) {
      const book = this.books[bookIndex];
      this.books.splice(bookIndex, 1);
      return book;
    }
    
    return null;
  }
}

// ========== ТЕСТОВЫЙ СЦЕНАРИЙ ==========

console.log("=== НАЧАЛО ТЕСТИРОВАНИЯ ===\n");

// 1. Создаём библиотеку
const library = new Library("Библиотека имени Ленина");
console.log(`Создана библиотека: ${library.name}\n`);

// 2. Добавляем книги разных типов
library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);

library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);

library.addBook(
  new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138)
);

library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(`Добавлено книг в библиотеку: ${library.books.length}`);
console.log("Список книг:");
library.books.forEach(book => console.log(`  - ${book.name} (${book.releaseDate})`));
console.log();

// 3. Ищем книгу 1919 года или создаём её
let oldBook = library.findBookBy("releaseDate", 1919);
if (!oldBook) {
  console.log("Книга 1919 года не найдена, создаём новую");
  oldBook = new NovelBook("Александр Грин", "Алые паруса", 1919, 200);
  library.addBook(oldBook);
  console.log(`Добавлена книга: ${oldBook.name}`);
} else {
  console.log(`Найдена книга 1919 года: ${oldBook.name}`);
}
console.log(`Книг в библиотеке: ${library.books.length}\n`);

// 4. Выдаём книгу
const issuedBook = library.giveBookByName("Машина времени");
console.log(`Выдана книга: ${issuedBook.name}`);
console.log(`Автор: ${issuedBook.author}`);
console.log(`Состояние книги при выдаче: ${issuedBook.state}`);
console.log(`Книг осталось в библиотеке: ${library.books.length}\n`);

// 5. Повреждаем книгу
issuedBook.state = 20;
console.log(`Книга повреждена! Новое состояние: ${issuedBook.state}\n`);

// 6. Восстанавливаем книгу
issuedBook.fix();
console.log(`Книга восстановлена! Состояние после ремонта: ${issuedBook.state}\n`);

// 7. Пытаемся вернуть книгу в библиотеку
console.log("Попытка вернуть книгу в библиотеку...");
library.addBook(issuedBook);
console.log(`Книг в библиотеке: ${library.books.length}`);
console.log("(Книга не добавлена, т.к. state = 30, нужно строго больше 30)\n");

// Восстанавливаем ещё раз
issuedBook.fix();
console.log(`Книга восстановлена повторно! Состояние: ${issuedBook.state}`);

// Теперь возвращаем успешно
library.addBook(issuedBook);
console.log(`Книга успешно возвращена в библиотеку!`);
console.log(`Книг в библиотеке: ${library.books.length}\n`);

// Дополнительные тесты из задания
console.log("=== ДОПОЛНИТЕЛЬНЫЕ ТЕСТЫ ===\n");
console.log(library.findBookBy("name", "Властелин колец")); // null
console.log(library.findBookBy("releaseDate", 1924).name); // "Мурзилка"

console.log("\n=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===");
