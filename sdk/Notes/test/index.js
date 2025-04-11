const sdk = require('../index.js');

// Initialize the SDK with the base URL of your API



sdk.initialize({
    apiBaseUrl: "http://localhost:3000"
});


// sdk.createNote({
//     title: "Test Note14",
//     content: "This is a test note.",
//     tags: "test"
// }).then(response => {
//     console.log("Note created:", response);
// }).catch(err => {
//     console.error("Error creating note:", err);
// });


// sdk.getNotes().then(response => {
//     console.log("Notes retrieved:", response);
// }).catch(err => {    
//     console.error("Error retrieving notes:", err);
// });


sdk.getNote(16).then(response => {
    console.log("Note retrieved:", response);
}).catch(err => {       
    console.error("Error retrieving note:", err);
});


// sdk.updateNote(16, {
//     title: "Updated Test Note 16",
// }).then(response => {       
//     console.log("Note updated:", response);
// }).catch(err => {    
//     console.error("Error updating note:", err);
// });


sdk.deleteNote(16).then(response => {
    console.log("Note deleted:", response);
}).catch(err => {   
    console.error("Error deleting note:", err);
});



sdk.getNote(16).then(response => {
    console.log("Note retrieved:", response);
}).catch(err => {       
    console.error("Error retrieving note:", err);
});