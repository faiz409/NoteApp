showNotes();

// If user adds a note, add it into localStorage 
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addNoteText);
function addNoteText(e) {
    e.preventDefault();
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let success = document.getElementById("success");
    let notesItem = localStorage.getItem("notes");
    if (notesItem == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesItem);
    }

    let myObje = {
        title: addTitle.value,
        text: addTxt.value
    }
    if (myObje.title.length != 0 && myObje.text.length != 0) {
        notesObj.push(myObje);
        addTitle.classList.remove('is-invalid');
        addTxt.classList.remove('is-invalid');
        success.style.display = "block";
        setTimeout(() => {
            success.style.display = "none";
        }, 3000);

        //      or
        // success.classList.add('show'); // show class avalible in success id div.
        // setTimeout(() => {
        //     success.classList.remove('show');
        // }, 3000);
    }
    else {
        addTitle.classList.add('is-invalid');
        addTxt.classList.add('is-invalid');
        setTimeout(() => {
            addTitle.classList.remove('is-invalid');
            addTxt.classList.remove('is-invalid');
        }, 5000);
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);

    showNotes();
}

// Function to show notes from loaclStorage.
function showNotes() {
    let notesItem = localStorage.getItem("notes");
    if (notesItem == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesItem);
    }
    let html = "";
    notesObj.forEach(function (ele, ind) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${ind + 1}. ${ele.title}</h5>
                    <p class="card-text">${ele.text}</p>
                    <button id="${ind}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h4>Nothing to show! Use "Add note" section above to add notes.</h4>`
    }
}

// Function to delete a note.
function deleteNote(indexVal) {
    let notesItem = localStorage.getItem("notes");
    if (notesItem == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesItem);
    }
    notesObj.splice(indexVal, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// Function to search the data.
let search = document.getElementById("searchTxt");
search.addEventListener("input", findData);
function findData() {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = "block";
            // console.log(element.style.display);
        }
        else {
            element.style.display = "none";
        }
    });
}