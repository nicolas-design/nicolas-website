import Footer from '../Footer'

export default function FooterExample() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Page content above footer</p>
      </div>
      <Footer />
    </div>
  )
}