import axios from 'axios'
import { useEffect, useState } from 'react'

const UserList = () => {
   const [users, setUsers] = useState([])
   const [searchTerm, setSearchTerm] = useState('')

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const response = await axios.get(
               'https://661feb2516358961cd95e81e.mockapi.io/users'
            )
            setUsers(response.data)
         } catch (error) {
            console.error('Error fetching user :', error)
         }
      }
      fetchUser()
   }, [])

   const handleSearchTerm = (event) => {
      setSearchTerm(event.target.value)
   }

   const filterUsers = users.filter(
      (user) =>
         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.email.toLowerCase().includes(searchTerm.toLowerCase())
   )

   return (
      <div className="p-4">
         <div className="mt-4">
            <input
               type="text"
               placeholder="Search by name or email..."
               className="p-2 border border-gray-500 rounded w-1/2 mb-4 "
               value={searchTerm}
               onChange={handleSearchTerm}
            />
         </div>
         <div>
            <table className="min-w-full table-auto rounded-lg border border-separate">
               <thead className="bg-gray-500">
                  <tr>
                     <th className="px-4 py-2">Name</th>
                     <th className="px-4 py-2">Email</th>
                     <th className="px-4 py-2">Phone</th>
                  </tr>
               </thead>
               <tbody>
                  {filterUsers.map((user) => (
                     <tr
                        className="bg-gray-200 border-b text-black"
                        key={user.id}
                     >
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{user.phone}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default UserList
