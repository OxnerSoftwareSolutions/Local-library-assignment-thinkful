const accounts = require("../data/accounts");
const books = require("../data/books");

/* ### getTotalBooksCount()

The `getTotalBooksCount()` function in `public/src/home.js` has a single parameter:

- An array of book objects.

It returns a _number_ that represents the number of book objects inside of the array.

**Example:**

```javascript
getTotalBooksCount(books); // 100
```
 */

function getTotalBooksCount(books) {
  return books.length;
}
/* ### getTotalAccountsCount()

The `getTotalAccountsCount()` function in `public/src/home.js` has a single parameter:

- An array of accounts.

It returns a _number_ that represents the number of account objects inside of the array.

**Example:**

```javascript
getTotalAccountsCount(accounts); // 75
```
 */
function getTotalAccountsCount(accounts) {
  return accounts.length;
}
/* ### getBooksBorrowedCount()

The `getBooksBorrowedCount()` function in `public/src/home.js` has a single parameter:

- An array of books.

It returns a _number_ that represents the number of books _that are currently checked out of the library._ This number can be found by looking at the first transaction object in the `borrows` array of each book. If the transaction says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed.

**Example:**

```javascript
getBooksBorrowedCount(accounts); // 65
```
 */
function getBooksBorrowedCount(books) {//Create a function named getBooksBorrowedCount that takes in a books array
  return books.reduce( ( total, book ) =>{
    return book.borrows[0].returned ? total += 0 : total += 1;
  }, 0 );
 }
 /* ### getMostCommonGenres()

The `getMostCommonGenres()` function in `public/src/home.js` has a single parameter:

- An array of book objects.

It returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.

Each object in the returned array has two keys:

- The `name` key which represents the name of the genre.
- The `count` key which represents the number of times the genre occurs.

Even if there is a tie, the array should only contain no more than five objects.

**Example:**

```javascript
getMostCommonGenres(books);
/*
  [
    { name: "Nonfiction", count: 9 },
    { name: "Historical Fiction", count: 7 },
    { name: "Thriller", count: 7 },
    ...
  ] */

  /* The Object.entries() method returns an array of a given object's own enumerable string-keyed property [key, value] pairs. This is the same as iterating with a for...in loop, except that a for...in loop enumerates properties in the prototype chain as well.

The order of the array returned by Object.entries() is the same as that provided by a for...in loop. If there is a need for different ordering, then the array should be sorted first, like Object.entries(obj).sort((a, b) => a[0].localeCompare(b[0]));. */
  function getMostCommonGenres(books) {
    let result = {};// declaring a variable that represents map as an empty array that we will push to later 
    books.forEach((bookObj) => {//Loop through the books array using the forEach method 
     if (result[bookObj.genre]) {//count the number of times each genre shows up storing these results in an array
      //If there is a genre in the map then add 1
      //If there isn't a genre in the map then set the key and value to one
      result[bookObj.genre]++;
     } else {
      result[bookObj.genre] = 1;
     }
    });
    return Object.entries(result)////return the object entries result the Object entries and return them with name and count
     .map(([name, count]) => {
      return {
       name,
       count
      };
     })
     .sort((crrtObj, nxtObj) => nxtObj.count - crrtObj.count)//Sort the array so the most common comes first
     .slice(0, 5);
   }
  


/* ### getMostPopularBooks()

The `getMostPopularBooks()` function in `public/src/home.js` has a single parameter:

- An array of book objects.

It returns an array containing five objects or fewer that represents the most popular books in the library. Popularity is represented by the number of times a book has been borrowed.

Each object in the returned array has two keys:

- The `name` key which represents the title of the book.
- The `count` key which represents the number of times the book has been borrowed.

Even if there is a tie, the array should only contain no more than five objects.

**Example:**

```javascript
getMostPopularBooks(books);
/*
  [
    { name: "incididunt nostrud minim", count: 30 },
    { name: "culpa do sint", count: 30 },
    { name: "ullamco est minim", count: 29 },
    ...
  ]
*/
function getMostPopularBooks(books) {
  return books.map((book) => {return { name: book.title, count: book.borrows.length };
   })
   .sort((crrtObj, nxtObj) => (crrtObj.count < nxtObj.count ? 1 : -1))//sort the books by their borrows count so that they can be returned in the most popular order
   .slice(0, 5);
 }




/* ### getMostPopularAuthors()

The `getMostPopularAuthors()` function in `public/src/home.js` has two parameters, in the following order:

- An array of book objects.
- An array of author objects.

It returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most. Popularity is represented by finding all of the books written by the author and then adding up the number of times those books have been borrowed.

Each object in the returned array has two keys:

- The `name` key which represents the first and last name of the author.
- The `count` key which represents the number of times the author's books have been borrowed.

Even if there is a tie, the array should contain no more than five objects.

**Example:**

```javascript
getMostPopularAuthors(books, authors);
/*
  [
    { name: "Cristina Buchanan", count: 112 },
    { name: "Tami Hurst", count: 83 },
    { name: "Chrystal Lester", count: 80 },
    ...
  ]
 */
  function getMostPopularAuthors(books, authors) {
    let result = [];//Declare a variable that will store the value of the most popular authors array
    authors.forEach((author) => {//Loop through the authors array using the forEach method 
     let theAuthor = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0
     };// declarin theAuthor variable representing an object with a name: key and a count key
     books.forEach((book) => {// Loop through the books array using the forEach method
      if (book.authorId === author.id) {// check to see if book.authorId matches the author.id 
       theAuthor.count += book.borrows.length;// if it does add theAuthor.count to the books.borrows.length
      }
     });
     result.push(theAuthor);// push the results to the theAuthor object
    });
    return result.sort((crrtObj, nxtObj) => nxtObj.count - crrtObj.count).slice(0, 5);//return the result and sort the information relayed back; stop at index 5 
   }



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
