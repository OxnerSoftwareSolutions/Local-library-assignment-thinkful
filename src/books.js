/* #### findAuthorById()

The `findAuthorById()` function in `public/src/books.js` has two parameters, in the following order:

- An array of author objects.
- An integer ID of a single author object.

It returns the author object that has the matching ID.

**Example:**

```javascript
findAuthorById(authors, 11);
/*
  {
    id: 11,
    name: {
      first: "Luz",
      last: "Beach",
    },
  }
 */

function findAuthorById(authors, id) {
  return authors.find((authorsObj, idx)=> authorsObj.id === id 
}
/* #### findBookById()

The `findBookById()` function in `public/src/books.js` has two parameters, in the following order:

- An array of book objects.
- A string ID of a single book object.

It returns the book object that has the matching ID.

**Example:**

```javascript
findBookById(books, "5f447132320b4bc16f950076");
/*
  {
    id: "5f447132320b4bc16f950076",
    title: "est voluptate nisi",
    ...
  }
 */
function findBookById(books, id) {
  return books.find((bookObj, idx)=> bookObj.id === id 
}
/* #### partitionBooksByBorrowedStatus()

The `partitionBooksByBorrowedStatus()` function in `public/src/books.js` has a single parameter:

- An array of book objects.

It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.

The first array contains book objects that represent the books _that are currently checked out_, while the second array contains book objects that represent the books _that have been returned._ You can check for the return status by looking at the first transaction object in the `borrows` array.

**Example:**

```javascript
partitionBooksByBorrowedStatus(books);
/*
  [
    [
      {
        id: "5f447132d487bd81da01e25e",
        title: "sit eiusmod occaecat eu magna",
        genre: "Science",
        authorId: 8,
        borrows: [
          {
            id: "5f446f2e2cfa3e1d234679b9",
            returned: false,
          },
          ...
        ]
      },
      ...
    ],
    [
      {
        id: "5f44713265e5d8d17789beb0",
        title: "tempor occaecat fugiat",
        genre: "Travel",
        authorId: 16,
        borrows: [
          {
            id: "5f446f2e4eff1030e7316861",
            returned: true,
          },
          ...
        ]
      },
      ...
    ]
  ]
 */
  function partitionBooksByBorrowedStatus(books) {
    let booksReturned = books.filter((bookObj) =>    /*The .filter() method will look through the books array and compile a new array that meets our condition.
*/
     book.borrows.every((borrow) => borrow.returned === true)
    );
    //  Within the filter method we will use a helper function with the every method that will check if our condition is true within the borrow array.  If it is true */
    let booksBorrowed = books.filter((bookObj) =>
     bookObj.borrows.some((borrow) => borrow.returned === false)
    );
    let result = [[...booksBorrowed], [...booksReturned]];
    return result;
   }
/* #### getBorrowersForBook()

The `getBorrowersForBook()` function in `public/src/books.js` has two parameters, in the following order:

- A book object.
- An array of all account objects.

It should return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's `borrows` array. However, each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.

**Example:**

```javascript
getBorrowersForBook(book, accounts);
/*
  [
    {
      id: "5f446f2e4eff1030e7316861",
      returned: true,
      picture: "https://api.adorable.io/avatars/75/barber.waters@kegular.biz",
      age: 37,
      name: {
        first: "Barber",
        last: "Waters",
      },
      company: "KEGULAR",
      email: "barber.waters@kegular.biz",
      registered: "Tuesday, April 14, 2020 9:15 PM",
    },
    {
      id: "5f446f2ecc5c4787c403f844",
      returned: true,
      picture: "https://api.adorable.io/avatars/75/dyer.trevino@slax.io",
      age: 34,
      name: {
        first: "Dyer",
        last: "Trevino",
      },
      company: "SLAX",
      email: "dyer.trevino@slax.io",
      registered: "Saturday, August 1, 2015 8:13 PM",
    },
  ]
 */

  /* The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.end 
  Optional
The index of the first element to exclude from the returned array. slice extracts up to but not including end. For example, slice(1,4) extracts the second element through the fourth element (elements indexed 1, 2, and 3).

A negative index can be used, indicating an offset from the end of the sequence. slice(2,-1) extracts the third element through the second-to-last element in the sequence.

If end is omitted, slice extracts through the end of the sequence (arr.length).

If end is greater than the length of the sequence, slice extracts through to the end of the sequence (arr.length). */
function getBorrowersForBook(book, accounts) {
  return book.borrows
   .map((borrow) => {//Use the map() method to loop through the borrows array of the book object.
    let account = accounts.find((account) => account.id === borrow.id);//Use the find() method within the map method to loop through the accounts array make a callback function that takes in each account and finds the account where account.id === borrow.id
    return { ...borrow, ...account };//Return the spread operator that contains the output values of the map method as borrow and the account variable.
   })
   .slice(0, 10);//Use the slice method on the output array to return only the portion of the array up to index value 10 of the returned array.
 }
 
 module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
