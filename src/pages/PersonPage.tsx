
export default function PersonPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Person Profile</h1>
      <div className="max-w-2xl mx-auto bg-card rounded-lg border p-6">
        <div className="space-y-4">
          <div className="h-24 w-24 rounded-full bg-muted mx-auto" />
          <h2 className="text-2xl font-bold text-center">John Doe</h2>
          <p className="text-center text-muted-foreground">Senior Developer</p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">john@example.com</p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-muted-foreground">New York, USA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
