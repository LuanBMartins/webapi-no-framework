class People{
    constructor({id, name, age, city}){
        this.id = Math.floor(Math.random() * 100) + Date.now()
        this.name = name
        this.age = age
        this.city = city
    }

    isValid(){
        const propertyNames = Object.getOwnPropertyNames(this)
        const amountInvalid = propertyNames
            .map(property => (this[property]) ? null : `${property} is missing`)
            .filter(item => item)
    
        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        }
    }
}

module.exports = People
// const people = new People({name:'junio', age:30, city: 'mdf'})
// console.log('valid', people.isValid());