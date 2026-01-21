// ========== ЗАДАЧА 1. Форматтер чисел ==========

function parseCount(value) {
    const parsedValue = Number.parseFloat(value);
    if (Number.isNaN(parsedValue)) {
        throw new Error("Невалидное значение");
    }
    return parsedValue;
}

const parsedValue = parseCount('42.2');
console.log(typeof parsedValue);

function validateCount(value) {
    try {
        const parsedValue = parseCount(value);
        return parsedValue;
    } catch(error) {
        return error;
    }
}

const invalidValue = validateCount('string');
console.log(invalidValue);
console.log(invalidValue.message);


// ========== ЗАДАЧА 2. Треугольник ==========

class Triangle {
    constructor (a, b, c) {
        if ((a + b <= c) || (a + c <= b) || (b + c <= a)) {
            throw new Error('Треугольник с такими сторонами не существует');
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }
     get perimeter() {
        return this.a + this.b + this.c;
     }

     get area() {
        const p = this.perimeter / 2;
        const area = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
        return +area.toFixed(3);
     }
}

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    } catch (e) {
        console.log(e);
        return {
            get perimeter() {
                return 'Ошибка! Треугольник не существует';
            },
            get area() {
                 return 'Ошибка! Треугольник не существует';
            }
        };
    }
}

const triangle = getTriangle(3, 4, 5);
console.log(triangle.perimeter);  // 12
console.log(triangle.area);       // 6

const invalidTriangle = getTriangle(1, 2, 3);
console.log(invalidTriangle.perimeter);  // 'Ошибка! Треугольник не существует'
console.log(invalidTriangle.area);       // 'Ошибка! Треугольник не существует'
console.log(invalidTriangle.a, invalidTriangle.b)﻿
