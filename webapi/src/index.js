const http = require('http')
const PORT = 3000
const DEFAULT_HEADER = {'Content-type': 'application/json'}
const PeopleFactory = require('./factores/peopleFactory')
const peopleService = PeopleFactory.generateInstance()
const People = require('./entities/people') //validação dos dados


//Rotas da api
const routes = {
    '/people:get': async (req, res) => {
        const {id} = req.queryString
        const people = await peopleService.find(id)
        res.write(JSON.stringify({results: people}))
        return res.end()
    },
    '/people:post': async(req, res) => {
        for await (const data of req) {
            try {
                // await Promise.reject('erro!!!')
                const item = JSON.parse(data)
                const people = new People(item)
                const {error, valid} = people.isValid()
                if(!valid) {
                    res.writeHead(400, DEFAULT_HEADER)
                    res.write(JSON.stringify({error: error.join(',')}))
                    return res.end()
                }
    
                const id = await peopleService.create(people)
                res.writeHead(201, DEFAULT_HEADER)
                res.write(JSON.stringify({success: 'User Created', id}))
                return res.end()
            } catch (error) {
                return handlerError(res)(error)
            }
        }
    },
    default: async (req, res) => {
        res.write('Rota não implementada (:')
        res.end()
    }
}

const handlerError = res => {
    return error => {
        console.error('Error', error);
        res.writeHead(500, DEFAULT_HEADER)
        res.write(JSON.stringify({error: 'Internal Server Error!!'}))

        return res.end()
    }
}

//Captura da requisição e tratamento de method
const handler = (req, res) => {
    const {url, method} = req
    const [first, route, id] = url.split('/')
    req.queryString = { id: isNaN(id) ? id : Number(id) }
   
    const key = `/${route}:${method.toLowerCase()}`
    res.writeHead(200, DEFAULT_HEADER)
   
    const chosen = routes[key] || routes.default
    return chosen(req, res).catch(handlerError(res))
    
}

http.createServer(handler)
    .listen(PORT, ()=> console.log('server runnint at', PORT))