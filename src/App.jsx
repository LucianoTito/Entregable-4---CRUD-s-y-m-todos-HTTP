import { useEffect, useState } from 'react'
import './styles/App.css'
import axios from 'axios'
import FormUser from './components/FormUser'
import UserCard from './components/UserCard'

function App() {
  const [users, setUsers] = useState([])
  const [updateInfo, setUpdateInfo] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState(null)

  const getAllUsers = () => {
    const url = 'https://users-crud.academlo.tech/users/'
    axios.get(url)
      .then(res => {
        if (Array.isArray(res.data)) {
          setUsers(res.data)
        } else {
          setError('Invalid response from server.')
        }
      })
      .catch(err => {
        console.error(err)
        setError('Failed to retrieve users.')
      })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const createNewUser = (data) => {
    const url = 'https://users-crud.academlo.tech/users/'
    axios.post(url, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => {
        console.error(err)
        setError('Failed to create new user.')
      })
  }

  const deleteUserById = id => {
    const url = `https://users-crud.academlo.tech/users/${id}/`
    axios.delete(url)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => {
        console.error(err)
        setError('Failed to delete user.')
      })
  }

  const updateUserById = (id, data) => {
    const url = `https://users-crud.academlo.tech/users/${id}/`
    axios.put(url, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
        setUpdateInfo(null)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to update user.')
      })
  }

  const handleOpen = (userId) => {
    setIsOpen(true)
    setUpdateInfo(userId)
  }

  const handleClose = () => {
    setIsOpen(false)
    setUpdateInfo(null)
  }

  return (
    <div className="App">
      <h1 className='users__tittle'>Users</h1>
      <button onClick={() => handleOpen(null)} className='app__btn-form'>Open Form</button>
      <div className={`app__form ${isOpen && 'app__form-visible'}`}>
        <FormUser
          createNewUser={createNewUser}
          updateInfo={updateInfo}
          userId={updateInfo}
          updateUserById={updateUserById}
          handleClose={handleClose}
          setUpdateInfo={setUpdateInfo}
        />
      </div>

      {error && (
        <div className="app__error">{error}</div>
      )}

      <div className='users__list'>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            deleteUserById={deleteUserById}
            setUpdateInfo={handleOpen}
          />
        ))}
      </div>
    </div>
  )
}

export default App
