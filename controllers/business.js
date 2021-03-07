const businessService = require('../services/business');

module.exports = {
    getAll: (req, res, next) => {
        businessService.getAll()
            .then(users => res.json(users))
            .catch(next);
    },
    getCurrent: (req, res) => {
        res.json(req.user);
    },
    getById: (req, res, next) => {
        businessService.getById(req.params.id)
            .then(user => res.json(user))
            .catch(next);
    },
    update: (req, res, next) => {
        businessService.update(req.params.id, req.body)
            .then(user => res.json(user))
            .catch(next);
    },
    _delete: (req, res, next) => {
        businessService._delete(req.params.id)
            .then(() => res.json({ message: "User deleted succesfully!"}))
            .catch(next);
    }
}