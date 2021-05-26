class PeopleService {
    constructor({ peopleRepository }) {
        this.peopleRepository = peopleRepository 
    }
    async find(itemId) {
        return this.peopleRepository.find(itemId)
    }

    async create(data) {
        return this.peopleRepository.create(data)
    }
}

module.exports = PeopleService