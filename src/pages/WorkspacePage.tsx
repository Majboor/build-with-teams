
export default function WorkspacePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Workspace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Dummy workspace data */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">Project {i + 1}</h3>
            <p className="text-muted-foreground">A sample project workspace with tasks and team members.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
