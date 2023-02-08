const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createAt = new Date().toISOString;
    const updateAt = createAt;

    const newNote = {
        title, tags, body, id, createAt, updateAt,
    };

    notes.push(newNote);

    const isSucces = notes.filter((note) => note.id === id).length > 0;

    if (isSucces) {
        const response = h.response({
            status: 'success',
            message: 'catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'failed',
        message: 'catatan gagal di tambahkan'
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByidHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((note) => note.id === id)[0];

    if ( note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan',
    });

    response.code(404);
    return response;
};

const editNoteByHandler = (request,h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updateAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        };

        const response = h.request({
            status: 'success',
            message: 'catatan berhasil dipeerbaharui',
        });

        response.code(200);
        return response;
    }

    const response = h.request({
        status: 'fail',
        message: 'gagal memperbaharui catatan, id tidak ditemukan',
    });

    response.code(404);
    return response;
};

const deleteNoteIdByHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'catatan berhasil dihapus',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan gagal dihapus, id tidak ditemukan',
    });

    response.code(404);
    return response;
}

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByidHandler, editNoteByHandler, deleteNoteIdByHandler };