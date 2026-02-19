const libraryList = document.getElementById("libraryList");
const addButton = document.getElementById("addButton");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const submitBtn = document.getElementById("submitButton");
const form = document.querySelector("form");
const main = document.querySelector("main");
let editIndex = null;

addButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
  main.classList.add("blur");
});

function closeModalFn() {
  modal.classList.add("hidden");
  main.classList.remove("blur");
}

closeModal.addEventListener("click", () => {
  form.reset();
  closeModalFn();
});
let books = [
  {
    coverURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmhELtDQ21EmfqtdgOeGpnkJOV1Wri_Nm1GTfiM5U_Zf3vDKVdw-5xEhg2VvBKqHJEuo2sEHzvZWixdLORHOUxOcgP6Dc4Q2o6VGzg1Q&s=10",
    bookTitle: "Animal Farm",
    author: "George Orwell",
    pages: 254,
    read: true
  },
  {
    coverURL: "https://covers.openlibrary.org/b/id/9255896-L.jpg",
    bookTitle: "1984",
    author: "George Orwell",
    pages: 328,
    read: true
  },
  {
    coverURL: "https://covers.openlibrary.org/b/id/8101356-L.jpg",
    bookTitle: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    read: false
  }
];


function renderBooks() {
  libraryList.innerHTML = "";

  books.forEach((book, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${book.coverURL}" width="100">
      <h3>${book.bookTitle}</h3>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "Read" : "Not read"}</p>
      <button type = "button" class = "dltButton">Delete</button>
      <button  type = "button" class = "edtButton">Edit</button>
    `;

      const deleteButton = li.querySelector(".dltButton");
      deleteButton.addEventListener("click", () => {
        books.splice(index, 1);
        renderBooks();
      })

      const editButton = li.querySelector(".edtButton");
      editButton.addEventListener("click", () => {
        editIndex = index;
        document.getElementById("coverURL").value = book.coverURL;
        document.getElementById("bookTitle").value = book.bookTitle;
        document.getElementById("author").value = book.author;
        document.getElementById("pages").value = book.pages;
        document.getElementById("read").checked = book.read;

        modal.classList.remove("hidden");
        main.classList.add("blur");
      
      })

    libraryList.appendChild(li);
  }
);
}
  

renderBooks();


submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const coverURL = document.getElementById("coverURL").value;
  const bookTitle = document.getElementById("bookTitle").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  if (isNaN(pages) || pages === '') {
    alert("Please input only numbers");
    return;
  }

  const bookData = { coverURL, bookTitle, author, pages, read };

  if (editIndex === null) {
    books.push(bookData);
  } else {
    books[editIndex] = bookData;
    editIndex = null;
  }
  renderBooks();
  closeModalFn();
  form.reset();
  
});


