
import { api } from '../Api/init'



class ApiMethods {
    constructor(endpoint) {
        this.endpoint = endpoint
    }

    create = (obj, func) => {
        func = func || null

        api.post(
            this.endpoint, obj
        ).then(func)
    }

    all = () => {
        return api.get(this.endpoint)
    }

    find = (id) => {
        return api.get(this.endpoint + id)
    }

    edit = (id, obj, func) => {
        func = func || null
        
        api.put(
            this.endpoint + id, obj
        ).then(func)
    }

    destroy = (id, func) => {
        func = func || null

        api.delete(
            this.endpoint + id
        ).then(func)       

    }
}


const bookmarksAPI = new ApiMethods('https://express-mongo-passport-qosevaoepq.now.sh/bookmarks')
// const authenticationAPI = new ApiMethods('http://localhost:3000/')

export  { bookmarksAPI }
