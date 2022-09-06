document.addEventListener('DOMContentLoaded', function() {

    const submitForm = document.getElementById("inputBook");
    
    submitForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        addTodo();
    });


    if( isStorageExist() ) {
        loadDataFromStorage();
    }

});

document.addEventListener("datadisimpan", () => {
    console.log('Data berhasil disimpan!');
});

document.addEventListener("dataloaded", () => {
    refreshDataFromBooks();
});
