const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tag, body } = request.playload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tag, body, id, createdAt, updatedAt,
};

notes.Push(newNote);

const isSuccess = notes.filter((note) => note.id === id).length > 0;

if (isSuccess){
const response = h.response({
    status : 'success'
    message : 'Catatan telah berhasil ditambah'
    data {
        noteId : id,
    };
})
response.code (201);
return response;
}
const response = h.response({
    status : 'fail'
    message : 'Catatan gagal ditambahkan'
    data {
        noteId : id,
    };
});
response.code (500);
return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
  });

  const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const note = notes.filter((n) => n.id === id)[0];
   
   if (note !== undefined) {
      return {
        status: 'success',
        data: {
          note,
        },
      };
    }
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  };
  const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const index = notes.findIndex((note) => note.id === id);
   
    if (index !== -1) {
      notes.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });
      response.code(200);
      return response;
    }
   
   const response = h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };
   
  module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
  };