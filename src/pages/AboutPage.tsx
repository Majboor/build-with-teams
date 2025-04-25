
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Briefcase, History, Star, Users } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    bio: "15+ years of experience in software architecture and team leadership",
    icon: Star
  },
  {
    name: "Michael Chen",
    role: "Chief Operations Officer",
    bio: "Expert in scaling operations and optimizing team workflows",
    icon: Briefcase
  },
  {
    name: "Emily Rodriguez",
    role: "Project Manager",
    bio: "Certified PMP with a track record of successful project deliveries",
    icon: Users
  }
];

const milestones = [
  {
    year: "2021",
    title: "Company Founded",
    description: "Started with a vision to revolutionize team collaboration"
  },
  {
    year: "2022",
    title: "First Enterprise Client",
    description: "Successfully onboarded our first major enterprise client"
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Expanded operations to serve clients worldwide"
  },
  {
    year: "2024",
    title: "AI Integration",
    description: "Launched advanced AI-powered team management features"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Mission Section */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6">About Us</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Building the future of team collaboration through innovative solutions
            and cutting-edge technology.
          </p>
          <div className="flex items-center justify-center">
            <Award className="h-12 w-12 text-primary" />
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <member.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="mb-2">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">
                    {member.role}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Company History */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <History className="h-6 w-6 text-primary" />
                    {index !== milestones.length - 1 && (
                      <div className="w-px h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {milestone.year} - {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
