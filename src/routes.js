const { handler } = require('@hapi/hapi/lib/cors');
const { addNoteHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: () => {},
  },

  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: () => {},
    const editNoteByIdHandler = (request, h) => {
      const { id } = request.params;
     
      const { title, tags, body } = request.payload;
      const updatedAt = new Date().toISOString();
     
      const index = notes.findIndex((note) => note.id === id);
     
      if (index !== -1) {
        notes[index] = {
          ...notes[index],
          title,
          tags,
          body,
          updatedAt,
        };
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    };
    {
      method: 'PUT',
      path: '/notes/{id}',
      handler: editNoteByIdHandler,
    },
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: () => {},
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
 },
];

const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  deleteNoteByIdHandler,
  editNoteByIdHandler,
} = require('./handler');