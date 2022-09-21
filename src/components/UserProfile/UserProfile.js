import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'


function UserProfile() {
    // get Token from local storage
    let clientToken = localStorage.getItem("token")

    let { userObj } = useSelector(state => state.userLogin)
    let [message, setMessage] = useState("")


    const getPrivateData = async () => {
        let res = await axios.get('/user/private', { headers: { authorization: clientToken } })
        console.log(res.data)
        setMessage(res.data.message)
    }

    return (
        <div className="container mt-5">
            <p className="text-end text-primary display-3">Welcome , {userObj.username}</p>
            <button className="btn btn-warning d-block mx-auto" onClick={getPrivateData} >Get Private Data</button>
            <p className="display-2 text-info text-center">{message}</p>
        </div>
    )
}

export default UserProfile