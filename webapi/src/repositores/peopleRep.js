const {readFile, writeFile} = require('fs/promises')


class PeopleRep {
    constructor({file}) {
        this.file = file
    }

    async _currentFileContent() {
        return JSON.parse(await readFile(this.file))
    }
    async find(itemId) {
        const all = await this._currentFileContent()
        if(!itemId) return all

        return all.find( ({id}) => itemId === id )
    }
    async create(data) {
        const currentFile = await this._currentFileContent()
        currentFile.push(data)
        await writeFile(this.file, JSON.stringify(currentFile))
        return data.id
    }
}

module.exports = PeopleRep

// const people = new PeopleRep({file: './../../database/data.json'})
// people.find(1).then(console.log)
// people.create({id:2, name:"cuca", age:21, city:"juvenal"}).then(console.log)