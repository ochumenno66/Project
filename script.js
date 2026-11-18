// 1
const book = document.querySelectorAll('.book');

book[1].after(book[0]);
book[4].after(book[2]);
book[4].after(book[3]);
book[5].after(book[2]);

// 2
const body = document.querySelector('body');
body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';

// 3
const bookTitle = book[4].querySelector('h2 > a');
bookTitle.textContent = 'Книга 3. this и Прототипы Объектов';

// 4
const adv = document.querySelector('.adv');
adv.remove();

// 5
const bookLi2 = book[0].querySelectorAll('ul > li');
bookLi2[6].after(bookLi2[4]);
bookLi2[6].after(bookLi2[5]);
bookLi2[8].after(bookLi2[5]);
bookLi2[8].after(bookLi2[4]);
bookLi2[8].after(bookLi2[7]);
bookLi2[4].after(bookLi2[7]);
bookLi2[5].after(bookLi2[7]);
bookLi2[10].before(bookLi2[2]);

const bookLi5 = book[5].querySelectorAll('ul > li');
bookLi5[2].before(bookLi5[4]);
bookLi5[4].before(bookLi5[3]);
bookLi5[3].before(bookLi5[9]);
bookLi5[6].after(bookLi5[5]);
bookLi5[7].after(bookLi5[5]);

// 6
const bookUl6 = book[2].querySelector('ul');
const bookLi6 = book[2].querySelectorAll('ul > li');

const newText = document.createElement('li');
newText.innerHTML = 'Глава 8: За пределами ES6';
bookUl6.append(newText);

const newBookLi6 = bookUl6.querySelectorAll('li');
newBookLi6[10].after(newBookLi6[9]);
