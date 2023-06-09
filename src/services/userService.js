const User = require('../models/user');
const UserRepository = require('../repositories/userRepository');
const repository = new UserRepository();

const findById = async (id) => {
    return await repository.findById(id);
}

const findByEmail = async (email) => {
    return await User.findOne({ where: { email } });
}


const findAll = async (filter, options) => {
    // return await repository.findAllWithPagination(filter, options);
    return await repository.findAll();
}


const save = async (user) => {
    return await repository.save(user);
}


const update = async (id, user) => {
    return await repository.update(id, user);
}

const remove = async (id) => {
    return await repository.remove(id);
}

module.exports = {
    findById,
    findByEmail,
    findAll,
    save,
    update,
    remove
}