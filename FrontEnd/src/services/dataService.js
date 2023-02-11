import axios from 'axios'

class dataService{

    getData(callback){
        axios.get(`${process.env.REACT_APP_API_URL}/pokemon`)
        .then(response=>{
            callback(response.data)
        })

    }

    getOneData(id, callback){
        axios.get(`${process.env.REACT_APP_API_URL}/pokemon/${id}`)
        .then(response=>{
            callback(response.data)
        })

    }

    createData(APIdata, token, callback){
        axios.post(`${process.env.REACT_APP_API_URL}/pokemon`, APIdata, token)
        .then(
            response => {
                if(response.status=== 201) {
                    callback(true)
                }
            })
            .catch( error=>{
                console.log(error.response)
                callback(false)
            })

    }

    updateData(param, APIdata, token, callback){
        console.log(APIdata)
        axios.put(`${process.env.REACT_APP_API_URL}/pokemon/${param}`, APIdata, token)
        .then(
            response => {
                if(response.status=== 204) {
                    callback(true)
                }
            })
            .catch( error=>{
                console.log(error.response)
                callback(false)
            })

    }

    deleteData(id, token, callback){
        axios.delete(`${process.env.REACT_APP_API_URL}/pokemon/${id}`,token)
        .then (
            response => {
                if(response.status=== 204) {
                    callback(true)
                }
            })
            .catch( error=>{
                callback(false)
            })
    }

}

export default new dataService()