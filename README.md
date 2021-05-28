## webapi-no-framework
criação de uma webapi com node sem framework

## Instruçõees para executar o projeto
#### 1) Clone o projeto em uma pasta.
`git clone https://github.com/LuanBMartins/webapi-no-framework.git`
#### 2) Entre na pasta raiz do projeto.
`cd webapi-no-framework` <br>
`cd webapi` <br>
`cd src`
#### 3) Instale as depend&ecirc;ncias.
`npm install -y`

## Ferramentas
#### Foi utilizado nesse projeto o módulo http
`const http = require('http')`

#### No arquivo "index.js" temos a função "handler" responsável por processar uma solicatção HTTP e retornar uma resposta HTTP
Nesta função é verificado a rota e o método da requisação.
```
const handler = (req, res) => {
    const {url, method} = req
    const [first, route, id] = url.split('/')
    req.queryString = { id: isNaN(id) ? id : Number(id) }
   
    const key = `/${route}:${method.toLowerCase()}`
    res.writeHead(200, DEFAULT_HEADER)
   
    const chosen = routes[key] || routes.default
    return chosen(req, res).catch(handlerError(res))
    
}
```
E por fim temos a configuração das rotas.
```
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
```