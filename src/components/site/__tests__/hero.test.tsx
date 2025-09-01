import { render, screen } from '@testing-library/react'
import { Hero } from '../hero'

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}))

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    expect(screen.getByText('Calisto A.I.')).toBeInTheDocument()
    expect(screen.getByText('Protege & Automatiza')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Hero />)
    expect(screen.getByText(/tecnologia aplicada ao campo/i)).toBeInTheDocument()
    expect(screen.getByText(/tecnologia que protege lavouras/i)).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /falar com a calisto/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /conhecer serviços/i })).toBeInTheDocument()
  })

  it('renders stats section', () => {
    render(<Hero />)
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('90%')).toBeInTheDocument()
    expect(screen.getByText('99.9%')).toBeInTheDocument()
  })

  it('renders logo image', () => {
    render(<Hero />)
    const logoImages = screen.getAllByAltText('Calisto A.I.')
    expect(logoImages.length).toBeGreaterThan(0)
  })

  it('has correct links', () => {
    render(<Hero />)
    const contactLink = screen.getByRole('link', { name: /falar com a calisto/i })
    const servicesLink = screen.getByRole('link', { name: /conhecer serviços/i })
    
    expect(contactLink).toHaveAttribute('href', '/contato')
    expect(servicesLink).toHaveAttribute('href', '/servicos')
  })
})
