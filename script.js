document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('mydialog');
    const openDialogButton = document.getElementById('create');
    const cancelButton = document.getElementById('cancelButton');
    const form = document.getElementById('bookForm');
    const myLibrary = [];

    openDialogButton.addEventListener('click', () => {
        dialog.showModal();
    });

    cancelButton.addEventListener('click', () => {
        dialog.close();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addBookToLibrary();
        dialog.close();
        form.reset();
    });

    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    function addBookToLibrary() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;

        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);

        // Update the UI to reflect the new book in the library
        displayBooks();
    }

    function displayBooks() {
        const libraryContainer = document.getElementById('cards');
        libraryContainer.innerHTML = ''; // Clear previous content

        myLibrary.forEach((book, index) => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `
                <p>Title: ${book.title}</p>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p>Read: ${book.read ? 'Yes' : 'No'}</p>
                <button data-index="${index}" class="remove">Remove</button>
            `;
            libraryContainer.appendChild(bookElement);
        });

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                removeBookFromLibrary(index);
            });
        });
    }

    function removeBookFromLibrary(index) {
        myLibrary.splice(index, 1); // Remove the book from the array
        displayBooks(); // Update the UI
    }
});
