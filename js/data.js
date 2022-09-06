const STORAGE_KEY = 'TODO_APPS';
let books = [];

function isStorageExist() {
    if( typeof(Storage) === "undefined" ) {
        alert('browser anda tidak mendukung web storage!');
        return false;
    }
    return true;
}

function saveData() { 
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("datadisimpan"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if( data !== null ) {
        books = data;
    }

    document.dispatchEvent(new Event("dataloaded"));
}

function updateDataToStorage() {
    if( isStorageExist() ) {
        saveData();
    }
}

function todoObject(judul, penulis, tahun, isCompleted) {
    return {
        id : +new Date(),
        judul,
        penulis,
        tahun,
        isCompleted
    };
}


function findTodo(todoId) {
    for( const book of books ) {
        if( book.id === todoId ) {
            return book;
        }
    }
    return null;
}


function findBookIndex(todoId) {
    let index = 0;
    for( const book of books ) {
        if( book.id === todoId ) {
            return index;
        }
        index++;
    }
    return -1;
}



function refreshDataFromBooks() {
    const uncompleted = document.getElementById(UNCOMPLETEDBOOK_ID);
    let completed = document.getElementById(COMPLETEDBOOK_ID);
    for( const book of books ) {
        const newBook = makeTodoBook(book.judul, book.penulis, book.tahun, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;


        if( book.isCompleted ) {
            completed.append(newBook);
        } else {
            uncompleted.append(newBook);
        }
    }
}
