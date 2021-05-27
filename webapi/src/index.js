const http = require('http')
const PORT = 3000
const DEFAULT_HEADER = {'Content-type': 'application/json'}
const PeopleFactory = require('./factores/peopleFactory')
const peopleService = PeopleFactory.generateInstance()

const routes = {
    '/people:get': async (req, res) => {
        const {id} = req.queryString
        const people = await peopleService.find(id)
        res.write(JSON.stringify({results: people}))
        return res.end()
    },

    default: (req, res) => {
        res.write('Rota não implementada (:')
        res.end()
    }
}

const handler = (req, res) => {
    const {url, method} = req
    const [first, route, id] = url.split('/')
    req.queryString = { id: isNaN(id) ? id : Number(id) }
   
    const key = `/${route}:${method.toLowerCase()}`
    res.writeHead(200, DEFAULT_HEADER)

    const chosen = routes[key] || routes.default
    return chosen(req, res)
    
}

http.createServer(handler)
    .listen(PORT, ()=> console.log('server runnint at', PORT))