import ServicesSection from '../ServicesSection'

export default function ServicesSectionExample() {
  const handleContactClick = () => {
    console.log('Contact button clicked from services')
  }

  return (
    <div className="bg-background">
      <ServicesSection onContactClick={handleContactClick} />
    </div>
  )
}