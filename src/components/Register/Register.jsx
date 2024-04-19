import axios from 'axios'
import { useState } from 'react'

const Register = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
   })

   const [errors, setErrors] = useState({})

   // Combine validation logic into a single function for each field
   const validateName = (name) => !name && { name: 'Name is required' }
   const validateEmail = (email) =>
      !email
         ? { email: 'Email is required' }
         : !/\S+@\S+\.\S+/.test(email) && { email: 'Invalid email format' }
   const validatePhone = (phone) =>
      !phone
         ? { phone: 'Phone number is required' }
         : phone.length !== 10 && {
              phone: 'Invalid phone number, needs 10 digits',
           }

   const handleChange = (event) => {
      const { name, value } = event.target
      setFormData({ ...formData, [name]: value })
      // Validate on change for real-time feedback (optional)
      setErrors({
         ...errors,
         ...validateName(value)[name], // Update only the changed field's error
         ...validateEmail(value)[name],
         ...validatePhone(value)[name],
      })
   }

   const handleSubmit = async (event) => {
      event.preventDefault()
      const newErrors = {
         ...validateName(formData.name),
         ...validateEmail(formData.email),
         ...validatePhone(formData.phone),
      }
      if (Object.keys(newErrors).length === 0) {
         try {
            const response = await axios.post(
               'https://661feb2516358961cd95e81e.mockapi.io/users',
               formData
            )
            if (!response.data) throw new Error('Error in form submission')
            // Handle success here
            alert('Register successful!')
         } catch (error) {
            // Handle errors here
            console.log('error', error)
            alert('Register fail!')
         }
      } else {
         setErrors(newErrors)
      }
   }

   return (
      <div className="p-4">
         <form onSubmit={handleSubmit}>
            <div className="mb-4">
               <label htmlFor="name" className="block mb-2 text-left">
                  Name :
               </label>
               <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               />
               {errors.name && (
                  <p className="text-left text-xs text-red-500 p-2">
                     {errors.name}
                  </p>
               )}
            </div>

            <div className="mb-4">
               <label htmlFor="email" className="block mb-2 text-left">
                  Email :
               </label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               />
               {errors.email && (
                  <p className="text-left text-xs text-red-500 p-2">
                     {errors.email}
                  </p>
               )}
            </div>

            <div className="mb-4">
               <label htmlFor="phone" className="block mb-2 text-left">
                  Phone :
               </label>
               <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone || ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               />
               {errors.phone && (
                  <p className="text-left text-xs text-red-500 p-2">
                     {errors.phone}
                  </p>
               )}
            </div>
            {/* Submit Button */}
            <button
               type="submit"
               className="bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 rounded-lg w-1/3 px-5 py-2.5"
            >
               Submit
            </button>
         </form>
      </div>
   )
}

export default Register
