import HeroSection from '../HeroSection'

export default function HeroSectionExample() {
  const handleScrollToContact = () => {
    console.log('Scroll to contact triggered')
  }

  return (
    <div className="bg-background">
      <HeroSection onScrollToContact={handleScrollToContact} />
    </div>
  )
}