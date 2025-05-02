import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import './UsersList.css'
import axios from "axios"
import { toast } from 'react-toastify'

const UsersList = ({ url }) => {

    // LIST OF USERS
    const [usersList, setUsersList] = useState([]);

    const fetchUsersList = async () => {
        const response = await axios.get(`${url}/api/user/list`);
        if (response.data.success) {
            setUsersList(response.data.data);
        }
        else {
            toast.error("User list error")
        }
    }

    useEffect(() => {
        fetchUsersList();
    }, [])

    return (
        <div className='user-list add flex-col'>

            {/*LIST OF FOODS*/}
            <h1>Customers</h1>
            <div className="user-list-table">
                <div className="user-list-table-format title">
                    <b>Name</b>
                    <b>Adress</b>
                    <b>Phone No.</b>
                    <b>Email</b>
                </div>
                {usersList.map((user, index) => {
                    return (
                        <div className="user-list-table-format" key={index}>
                            <p>{user.name.firstName} {user.name.lastName}</p>
                            <p>{user.address.street}, {user.address.city}, {user.address.province} {user.address.zipCode}, {user.address.country}</p>
                            <p>{user.phone}</p>
                            <p>{user.email}</p>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}

export default UsersList
