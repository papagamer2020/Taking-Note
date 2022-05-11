function findById(id, notes) {
    const result = notes.filter((note) => note.id === id)[0];
    return result;
}

module.exports = {
    findById
}