 const COMPLETEDBOOK_ID = "completeBookshelfList";
 const UNCOMPLETEDBOOK_ID = "incompleteBookshelfList";


const BOOK_ITEMID = "itemId";


function makeTodoBook(judul, penulis, tahun, isCompleted) {
    const textJudul = document.createElement('h3');
    textJudul.innerText = judul;
    const textPenulis = document.createElement('p');
    textPenulis.innerHTML = "Penulis : <span>" + penulis + "</span>";
    const textTahun = document.createElement('p');
    textTahun.innerHTML = "Tahun : <span>" + tahun + "</span>";


    textPenulis.classList.add('penulis');
    textTahun.classList.add('tahun');


    const button = document.createElement('div');

    const container = document.createElement('div');
    
    container.append(textJudul, textPenulis, textTahun, button);

    if( isCompleted ) {
        button.append(
           undoButton(),
           trashButton()
            );
    } else {
        button.append(
           cekButton(), 
           trashButton());
    }


    return container;       
}


function cekButton() { 
    return createCheckButton('check-button', function(event) {
        addTaskToCompleted(event.target.parentElement.parentElement);
    });
}
function trashButton() { 
    return createTrashButton('trash-button', function(event) {
        removeTaskCompleted(event.target.parentElement.parentElement);
    });
}
function undoButton() { 
    return createUndoButton('undo-button', function(event) {
        undoTaskFromCompleted(event.target.parentElement.parentElement);
    });
}


function addTodo() {
    const uncompleted = document.getElementById(UNCOMPLETEDBOOK_ID);

    const judul = document.getElementById('inputBookTitle').value;
    const penulis = document.getElementById('inputBookAuthor').value;
    const tahun = document.getElementById('inputBookYear').value;

    const book = makeTodoBook(judul, penulis, tahun, false);

    const bookObject = todoObject(judul, penulis, tahun, false);
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);


    uncompleted.append(book);

    updateDataToStorage();
}

function createUndoButton(buttonTypeClass, eventListener) {
    const tombol = document.createElement("input");
    tombol.setAttribute('type', 'button');
    tombol.setAttribute('value', 'Buku Belum dibaca');
    tombol.setAttribute('style', 'background-color:cornflowerblue; border-radius:5px; padding:8px; margin-right:10px; border:0; cursor:pointer; color:white;');
    tombol.classList.add(buttonTypeClass);
    tombol.addEventListener('click', function(event) {
        eventListener(event);
    });
    return tombol;
}
function createTrashButton(buttonTypeClass, eventListener) {
    const tombol = document.createElement("input");
    tombol.setAttribute('type', 'submit');
    tombol.setAttribute('value', 'Hapus Buku');
    tombol.setAttribute('style', 'background-color:#ff6666;; border-radius:5px; padding:8px; border:0; cursor:pointer; color:white;');
    tombol.classList.add(buttonTypeClass);
    tombol.addEventListener('click', function(event) {
        eventListener(event);
    });
    return tombol;
}
function createCheckButton(buttonTypeClass, eventListener) {
    const tombol = document.createElement("input");
    tombol.setAttribute('type', 'submit');
    tombol.setAttribute('value', ' Buku Selesai dibaca');
    tombol.setAttribute('style', 'background-color:cornflowerblue; border-radius:5px; padding:8px; margin-right:10px; border:0; cursor:pointer; color:white;');
    tombol.classList.add(buttonTypeClass);
    tombol.addEventListener('click', function(event) {
        eventListener(event);
    });
    return tombol;
}


function addTaskToCompleted(todoId) { 

    const listCompleted = document.getElementById(COMPLETEDBOOK_ID);
    const taskJudul = todoId.querySelector('h3').innerText;
    const taskPenulis = todoId.querySelector('.penulis > span').innerText;
    const taskTahun = todoId.querySelector('.tahun > span').innerText;

    const newBook = makeTodoBook(taskJudul, taskPenulis, taskTahun, true);

    const book = findTodo(todoId[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;


    listCompleted.append(newBook);
    todoId.remove();

    updateDataToStorage();
}

function undoTaskFromCompleted(todoId) { 
    const listUncompleted = document.getElementById(UNCOMPLETEDBOOK_ID);
    const taskJudul = todoId.querySelector('h3').innerText;
    const taskPenulis = todoId.querySelector('.penulis > span').innerText;
    const taskTahun = todoId.querySelector('.tahun > span').innerText;

    const newBook = makeTodoBook(taskJudul, taskPenulis, taskTahun, false);

    const book = findTodo(todoId[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    todoId.remove();

    updateDataToStorage();
}

function removeTaskCompleted(todoId) { 
    const bookPosition = findBookIndex(todoId[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    todoId.remove();
    
    updateDataToStorage();
}

