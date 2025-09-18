import Navigation from '../Navigation'
import { useState } from 'react'

export default function NavigationExample() {
  const [activeSection, setActiveSection] = useState('hero')
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="pt-20 p-8">
        <p className="text-muted-foreground">Navigation component with theme toggle and smooth scrolling</p>
      </div>
    </div>
  )
}