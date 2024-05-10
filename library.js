const myLibrary = [{
    "title": "The Fellowship of the Ring",
    "author": "J.R.R. Tolkein",
    "pages": 450,
    "read": true,
    "rating": 5
}];
createLibraryCards(myLibrary);

function Book(title, author, pages, read, rating) {
    this.title = title; // Title of book as String
    this.author = author; // Author of book as String
    this.pages = pages; // Number of pages as Int
    this.read = read; // Book has been read == true, not read == false
    this.rating = rating; // rating of book 1-5 as Int
}

function addBookToLibrary(newBookValues) {
    //const addedBook = new Book(title, author, pages, read, rating);
    const addedBook = new Book(newBookValues[0],newBookValues[1],newBookValues[2],newBookValues[3],newBookValues[4]);
    myLibrary.push(addedBook);
    return addedBook;
}

function createLibraryCards(myLibrary) {
    const library = document.querySelector("#library");
    library.replaceChildren();
    myLibrary.forEach(function (book, bookIndex) {
        const divLibraryCard = document.createElement("div");
        divLibraryCard.classList.add("card");
        divLibraryCard.id = bookIndex;
        const titleLibraryCard = document.createElement("h4");
        titleLibraryCard.textContent = book.title;
        const authorLibraryCard = document.createElement("p");
        authorLibraryCard.classList.add("author");
        authorLibraryCard.textContent = book.author;
        const pagesLibraryCard = document.createElement("p");
        pagesLibraryCard.textContent = book.pages + " pages";
        const hrLibraryCard = document.createElement("hr");
        const divTwoLibraryCard = document.createElement("div");
        divTwoLibraryCard.classList.add("flex");
        const divThreeLibraryCard = document.createElement("div");
        divThreeLibraryCard.classList.add("flex", "column");
        const progressLibraryCard = document.createElement("p");
        if (book.read) {
            progressLibraryCard.textContent = "Progress: 100%";
        } else {
            progressLibraryCard.textContent = "Progress: 0%";
        }
        const progressDiv = document.createElement("div");
        progressDiv.classList.add("flex");
        const progressIcon = document.createElement("img");
        progressIcon.src = "images/list-status.svg";
        progressIcon.classList.add("icons");
        progressDiv.addEventListener("click", () => {
            changeReadStatus(bookIndex);
        });
        const ratingTextLibraryCard = document.createElement("p");
        ratingTextLibraryCard.textContent = "Rating:";
        const divFourLibraryCard = document.createElement("div");
        divFourLibraryCard.classList.add("flex", "rating-stars");
        for (let i = 1; i <= book.rating; i++) {
            const star = document.createElement("img");
            star.src = "images/star.svg";
            star.classList.add("icons");
            divFourLibraryCard.appendChild(star);
        }
        const divFiveLibraryCard = document.createElement("div");
        const starPlus = document.createElement("img");
        const starRemove = document.createElement("img");
        const bookRemove = document.createElement("img");
        starPlus.src = "images/star-plus.svg";
        starRemove.src = "images/star-remove.svg";
        bookRemove.src = "images/book-remove.svg";
        starPlus.classList.add("icons");
        starRemove.classList.add("icons");
        bookRemove.classList.add("icons");
        bookRemove.addEventListener("click", () => {
            removeBook(bookIndex);
        });
        starRemove.addEventListener("click", () => {
            decreaseRating(bookIndex);
        });
        starPlus.addEventListener("click", () => {
            increaseRating(bookIndex);
        });
        divFiveLibraryCard.appendChild(starPlus);
        divFiveLibraryCard.appendChild(starRemove);
        divFiveLibraryCard.appendChild(bookRemove);
        progressDiv.appendChild(progressLibraryCard);
        progressDiv.appendChild(progressIcon);
        divThreeLibraryCard.appendChild(progressDiv);
        //divThreeLibraryCard.appendChild(progressLibraryCard);
        //divThreeLibraryCard.appendChild(progressIcon);
        divThreeLibraryCard.appendChild(ratingTextLibraryCard);
        divThreeLibraryCard.appendChild(divFourLibraryCard);
        divTwoLibraryCard.appendChild(divThreeLibraryCard);
        divTwoLibraryCard.appendChild(divFiveLibraryCard);
        divLibraryCard.appendChild(titleLibraryCard);
        divLibraryCard.appendChild(authorLibraryCard);
        divLibraryCard.appendChild(pagesLibraryCard);
        divLibraryCard.appendChild(hrLibraryCard);
        divLibraryCard.appendChild(divTwoLibraryCard);
        library.appendChild(divLibraryCard);
        
    });
}

function getNewBook() {
    const newBook = document.querySelectorAll("input");
    let newBookValues = [];
    newBook.forEach((inputItem) => {
        if (inputItem.name == "read") {
            newBookValues.push(inputItem.checked);
        } else {
        newBookValues.push(inputItem.value);
        }
    });
    addBookToLibrary(newBookValues);
    createLibraryCards(myLibrary);
}

function removeBook(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    createLibraryCards(myLibrary);
}

function changeReadStatus(bookIndex) {
    if (myLibrary[bookIndex].read == true) {
        myLibrary[bookIndex].read = false;
    } else if (myLibrary[bookIndex].read == false) {
        myLibrary[bookIndex].read = true;
    }
    createLibraryCards(myLibrary);
}

function increaseRating(bookIndex) {
    if (myLibrary[bookIndex].rating < 5) {
        myLibrary[bookIndex].rating++;
    }
    createLibraryCards(myLibrary);
}

function decreaseRating(bookIndex) {
    if (myLibrary[bookIndex].rating > 0) {
        myLibrary[bookIndex].rating--;
    }
    createLibraryCards(myLibrary);
}

const addNewBookButton = document.querySelector("#newBook");
addNewBookButton.addEventListener("click", getNewBook);