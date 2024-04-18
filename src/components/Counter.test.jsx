import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import Counter from './Counter'
describe('test counter component', () => {
    beforeEach(() => {
        render(<Counter />)
    })

    it('should render counter', () => {
        expect(screen.getByText(/Counter is :/)).toBeInTheDocument()
    })

    it('increment counter', () => {
        fireEvent.click(screen.getByText('Increment'))
        expect(screen.getByText('Counter is : 1')).toBeInTheDocument()
    })

    it('decrement counter', () => {
        fireEvent.click(screen.getByText('Decrement'))
        expect(screen.getByText('Counter is : 0')).toBeInTheDocument()
    })
})
