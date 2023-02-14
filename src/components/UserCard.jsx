import React from 'react'
import '../styles/UserCard.css'

const UserCard = ({user,deleteUserById, setUpdateInfo, handleOpen}) => {

    const handleDelete = () =>{
        deleteUserById(user.id)
    }

    const handleUpdate = () => {
        setUpdateInfo(user)
        handleOpen()
    }
  return (
    <article className='users__container'>
        <h2 className='user__name'>{`${user.first_name} ${user.last_name}`}</h2>
        <ul className='user__data-list'>
            <li className='user__data-li'><span className='user_data-span'>Email:</span>{user.email}</li>
            <li className='user__data-li'><span className='user_data-span'>Birthday:</span>{user.birthday}</li>
        </ul>
        <button className='user__btn' onClick={handleDelete}>Delete</button>
        <button className='user__btn' onClick={handleUpdate}>Update</button>
    </article>
  )
}

export default UserCard