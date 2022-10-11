const accounts = require("../data/accounts");
const books = require("../data/books");
/* #### findAccountById()

The `findAccountById()` function in `public/src/accounts.js` has two parameters, in the following order:

- An array of account objects.
- A string ID of a single account object.

It returns the account object that has the matching ID.

**Example:**

```javascript
findAccountById(accounts, "5f446f2ecfaf0310387c9603");
/*
  {
    "id": "5f446f2ecfaf0310387c9603",
    "name": {
      "first": "Esther",
      "last": "Tucker"
    },
    ...
  }
*/ 

function findAccountById(accounts, id) {
  return accounts.find((accountsObj, idx)=> accountsObj.id === id) 
}

/* 
#### sortAccountsByLastName()

The `sortAccountsByLastName()` function in `public/src/accounts.js` has a single parameter:

- An array of account objects.

It returns a sorted array of the provided account objects. The objects are sorted alphabetically by last name.

**Example:**

```javascript
sortAccountsByLastName(accounts);
/*
  [
    {
      "name": {
        "first": "Kirby",
        "last": "Alston"
      },
      ...
    },
    {
      "name": {
        "first": "Toni",
        "last": "Ball"
      },
      ...
    },
  ]  
*/
function sortAccountsByLastName(accounts) {
  return accounts.sort((acctA, acctB)=> {
    if (acctA.name.last < acctB.name.last) {
      return -1;
    }
  });
}

/* 
#### getTotalNumberOfBorrows()

The `getTotalNumberOfBorrows()` function in `public/src/accounts.js` has two parameters, in the following order:

- An account object.
- An array of all book objects.

It returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.

**Example:**

```javascript
getTotalNumberOfBorrows(account, books); // 22
```
 */


function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach(book => book.borrows.forEach(borrow => account.id === borrow.id && total++));
  return total;
}



/*
#### getBooksPossessedByAccount()

The `getBooksPossessedByAccount` function in `public/src/accounts.js` has three parameters, in the following order:

- An account object.
- An array of all book objects.
- An array of all author objects.

It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.

**Example:**

```javascript
getBooksPossessedByAccount(account, books, authors);
/*
  [
    {
      id: "5f447132320b4bc16f950076",
      title: "est voluptate nisi",
      genre: "Classics",
      authorId: 12,
      author: {
        id: 12,
        name: {
          first: "Chrystal",
          last: "Lester",
        },
      },
      borrows: [
        {
          id: "5f446f2e6059326d9feb9a68",
          returned: false,
        },
        ...
      ],
    },
  ]
 */
  // function getBooksPossessedByAccount(account, books, authors) {
  //   let result = [];//Declare a variable that will store the value of the final result in an empty array.
  //   let borrowMatch = [];//Declare a variable that will store the value of the matching borrow object.
  //   books.forEach((book) => {//Loop through the books array using the forEach method 
  //    const book = {//Destructure the book object.
  //     id: book.id,
  //     title: book.title,
  //     genre: book.genre,
  //     authorId: book.authorId,
  //     author: {},
  //     borrows: {}
  //    };
  //    const { id, title, genre, authorId, author, borrows } = book;
   
  //    book.borrows.forEach((borrow) => {
  //     // loop through the borrowed array check if borrow.id is equal to accountId and borrow.returned == false
  //     if (borrow.id === account.id && borrow.returned === false) {//If conditional is true push the book object into the result array and the borrows object to borrowsMatch array.
  //      result.push(book);
  //      borrowMatch.push(borrow);
  //      book.borrows = borrowMatch;
  //      book.author = authors.filter((auth) => auth.id === book.authorId)[0];
  //     }
  //    });
  //   });
  //   return result;
  //  }

  /* #### getBooksPossessedByAccount()

The `getBooksPossessedByAccount` function in `public/src/accounts.js` has three parameters, in the following order:

- An account object.
- An array of all book objects.
- An array of all author objects.

It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it. */ 
function filterBooks(books, account){
  return books.filter((bookObj) => {
    let recent = bookObj.borrows[0];
    return !recent.returned && recent.id === account.id;
  })
}

  function getBooksPossessedByAccount(account, books, authors) {
    let filtered = filterBooks(books, account);
    // return books.filter((bookObj) => {
    //     let recent = bookObj.borrows[0];
    //     return !recent.returned && recent.id === account.id;
    //   })
    return filtered.map((bookObj) => {
        let author = authors.find(author => author.id === bookObj.authorId);
        return { ...bookObj, author };
      });
    
  }







module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
