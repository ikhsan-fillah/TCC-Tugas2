const Note = require("../schema/Note");

const findAll = async () => {
  return await Note.findAll({
    order: [["tanggal_dibuat", "DESC"]],
    attributes: ["id", "judul", "isi", "tanggal_dibuat"],
  });
};

const findById = async (id) => {
  return await Note.findByPk(id, {
    attributes: ["id", "judul", "isi", "tanggal_dibuat"],
  });
};

const create = async (noteData) => {
  return await Note.create(noteData);
};

const updateById = async (id, noteData) => {
  return await Note.update(noteData, {
    where: { id },
  });
};

const deleteById = async (id) => {
  return await Note.destroy({
    where: { id },
  });
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
