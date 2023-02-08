const { addNoteHandler, getAllNotesHandler, getNoteByidHandler, editNoteByHandler, deleteNoteIdByHandler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler : addNoteHandler

    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByidHandler
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteIdByHandler
    }
];

module.exports = routes;