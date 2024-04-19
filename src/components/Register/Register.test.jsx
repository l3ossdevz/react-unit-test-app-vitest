import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Register from './Register'
import axios from 'axios'

// Mock axios to avoid real API calls
vi.mock('axios')

describe('App component', () => {
   beforeAll(() => {
      // Mock window.alert
      global.window.alert = vi.fn()
   })
   it('renders the form', () => {
      const { getByLabelText, getByText } = render(<Register />)
      expect(getByLabelText(/name :/i)).toBeInTheDocument()
      expect(getByLabelText(/email :/i)).toBeInTheDocument()
      expect(getByLabelText(/phone :/i)).toBeInTheDocument()
      expect(getByText(/submit/i)).toBeInTheDocument()
   })

   it('shows validation errors', () => {
      const { getByText } = render(<Register />)

      fireEvent.click(getByText(/submit/i))

      expect(getByText(/name is required/i)).toBeInTheDocument()
      expect(getByText(/email is required/i)).toBeInTheDocument()
      expect(getByText(/phone number is required/i)).toBeInTheDocument()
   })

   it('shows validation email format errors', () => {
      const { getByLabelText, getByText } = render(<Register />)

      fireEvent.change(getByLabelText(/name :/i), {
         target: { value: 'John Doe' },
      })
      fireEvent.change(getByLabelText(/email :/i), {
         target: { value: 'johndoe@example' },
      })
      fireEvent.change(getByLabelText(/phone :/i), {
         target: { value: '1234567890' },
      })

      fireEvent.click(getByText(/submit/i))

      expect(getByText(/Invalid email format/i)).toBeInTheDocument()
   })

   it('submits form successfully', async () => {
      const { getByLabelText, getByText } = render(<Register />)
      const mockResponse = {
         data: {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '1234567890',
         },
      }
      axios.post.mockResolvedValue(mockResponse)
      fireEvent.change(getByLabelText(/name :/i), {
         target: { value: 'John Doe' },
      })
      fireEvent.change(getByLabelText(/email :/i), {
         target: { value: 'johndoe@example.com' },
      })
      fireEvent.change(getByLabelText(/phone :/i), {
         target: { value: '1234567890' },
      })

      fireEvent.click(getByText(/submit/i))

      await waitFor(() => {
         expect(axios.post).toHaveBeenCalledWith(
            'https://661feb2516358961cd95e81e.mockapi.io/users',
            {
               name: 'John Doe',
               email: 'johndoe@example.com',
               phone: '1234567890',
            }
         )
      })
   })
})
