
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, User, Mail, MapPin, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  videoUrl: string;
  bio: string;
  skills: string[];
  experience: string;
  education: string;
  location: string;
  email: string;
  joinedDate: string;
}
const teamMembers: TeamMember[] = [{
  id: 1,
  name: "Asad",
  role: "AI & ML Engineer",
  description: "AI team as a service",
  videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/sign/applications/Copy-of-Newbie-Introduction-Vi-unscreen.gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NTI4N2JmMC00ZmM4LTQ1ZDItOWQ5My1kNzJkM2Y5M2Q4MmYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcHBsaWNhdGlvbnMvQ29weS1vZi1OZXdiaWUtSW50cm9kdWN0aW9uLVZpLXVuc2NyZWVuLmdpZiIsImlhdCI6MTc0ODk0NjQ0MSwiZXhwIjoxNzgwNDgyNDQxfQ.5MbaNlil9axkUaiwqipdOtfqPpxWi_Rova9aIcG_pCQ",
  bio: "Passionate AI engineer with expertise in machine learning, deep learning, and AI automation. Leading innovative AI solutions and building intelligent systems that transform businesses.",
  skills: ["Machine Learning", "Deep Learning", "Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
  experience: "5+ years in AI development",
  education: "MS in Computer Science - AI/ML",
  location: "San Francisco, CA",
  email: "asad@company.com",
  joinedDate: "January 2022"
}, {
  id: 2,
  name: "Sarah Johnson",
  role: "Frontend Developer",
  description: "React & UI/UX specialist",
  videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4",
  bio: "Creative frontend developer specializing in modern React applications and exceptional user experiences. Passionate about clean code and innovative design solutions.",
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
  experience: "4+ years in frontend development",
  education: "BS in Web Development",
  location: "New York, NY",
  email: "sarah@company.com",
  joinedDate: "March 2023"
}, {
  id: 3,
  name: "Michael Chen",
  role: "Backend Developer",
  description: "API & Database architect",
  videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4",
  bio: "Expert backend engineer with deep knowledge in scalable architectures, database optimization, and API design. Building robust systems that power modern applications.",
  skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "AWS", "Docker", "Kubernetes"],
  experience: "6+ years in backend development",
  education: "MS in Software Engineering",
  location: "Seattle, WA",
  email: "michael@company.com",
  joinedDate: "June 2021"
}, {
  id: 4,
  name: "Emily Rodriguez",
  role: "UI/UX Designer",
  description: "Design systems & user experience",
  videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4",
  bio: "Creative designer focused on user-centered design and creating intuitive digital experiences. Expert in design systems and accessibility best practices.",
  skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems", "Accessibility"],
  experience: "5+ years in UI/UX design",
  education: "BFA in Graphic Design",
  location: "Los Angeles, CA",
  email: "emily@company.com",
  joinedDate: "September 2022"
}, {
  id: 5,
  name: "David Wilson",
  role: "Project Manager",
  description: "Agile delivery & team coordination",
  videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4",
  bio: "Experienced project manager with expertise in Agile methodologies and cross-functional team leadership. Ensuring successful project delivery and team efficiency.",
  skills: ["Agile/Scrum", "Project Planning", "Team Leadership", "Risk Management", "Stakeholder Management"],
  experience: "7+ years in project management",
  education: "MBA in Project Management",
  location: "Chicago, IL",
  email: "david@company.com",
  joinedDate: "April 2021"
}, {
  id: 6,
  name: "Lisa Thompson",
  role: "DevOps Engineer",
  description: "Cloud infrastructure & automation",
  videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4",
  bio: "DevOps specialist with expertise in cloud infrastructure, CI/CD pipelines, and automation. Building scalable and reliable deployment systems.",
  skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "CI/CD", "Monitoring"],
  experience: "5+ years in DevOps",
  education: "BS in Computer Science",
  location: "Austin, TX",
  email: "lisa@company.com",
  joinedDate: "November 2022"
}, {
  id: 7,
  name: "Alex Kumar",
  role: "Full Stack Developer",
  description: "End-to-end application development",
  videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4",
  bio: "Versatile full-stack developer with expertise across the entire technology stack. Building complete web applications from conception to deployment.",
  skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "GraphQL", "REST APIs", "Git"],
  experience: "4+ years in full-stack development",
  education: "BS in Software Engineering",
  location: "Boston, MA",
  email: "alex@company.com",
  joinedDate: "February 2023"
}, {
  id: 8,
  name: "Maria Garcia",
  role: "QA Engineer",
  description: "Testing & quality assurance",
  videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4",
  bio: "Quality assurance specialist ensuring software excellence through comprehensive testing strategies and automation. Committed to delivering bug-free experiences.",
  skills: ["Test Automation", "Selenium", "Jest", "Cypress", "Manual Testing", "Bug Tracking", "Performance Testing"],
  experience: "4+ years in QA testing",
  education: "BS in Computer Science",
  location: "Miami, FL",
  email: "maria@company.com",
  joinedDate: "July 2022"
}, {
  id: 9,
  name: "James Park",
  role: "Data Scientist",
  description: "Analytics & machine learning",
  videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4",
  bio: "Data scientist with expertise in statistical analysis, machine learning models, and data visualization. Turning complex data into actionable business insights.",
  skills: ["Python", "R", "SQL", "Machine Learning", "Data Visualization", "Statistics", "Big Data"],
  experience: "5+ years in data science",
  education: "PhD in Statistics",
  location: "San Diego, CA",
  email: "james@company.com",
  joinedDate: "May 2021"
}, {
  id: 10,
  name: "Rachel Adams",
  role: "Mobile Developer",
  description: "iOS & Android applications",
  videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4",
  bio: "Mobile development expert creating high-performance native and cross-platform applications. Focused on delivering exceptional mobile user experiences.",
  skills: ["React Native", "Swift", "Kotlin", "Flutter", "iOS Development", "Android Development", "Mobile UI/UX"],
  experience: "4+ years in mobile development",
  education: "BS in Mobile Computing",
  location: "Portland, OR",
  email: "rachel@company.com",
  joinedDate: "October 2022"
}, {
  id: 11,
  name: "Tom Mitchell",
  role: "Security Engineer",
  description: "Cybersecurity & compliance",
  videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4",
  bio: "Cybersecurity expert specializing in application security, infrastructure protection, and compliance frameworks. Ensuring robust security across all systems.",
  skills: ["Penetration Testing", "Security Auditing", "Compliance", "Encryption", "Network Security", "OWASP"],
  experience: "6+ years in cybersecurity",
  education: "MS in Cybersecurity",
  location: "Washington, DC",
  email: "tom@company.com",
  joinedDate: "January 2021"
}];

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  index
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [thumbnailGenerated, setThumbnailGenerated] = useState(false);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
        setIsPlaying(false);
      } else {
        videoRef.play();
        setIsPlaying(true);
      }
    }
  };

  const generateThumbnail = () => {
    if (videoRef && !thumbnailGenerated) {
      // Set video to a specific time for thumbnail (e.g., 1 second)
      videoRef.currentTime = 1;
      setThumbnailGenerated(true);
    }
  };

  const handleVideoLoadedData = () => {
    generateThumbnail();
  };

  const handleCardClick = () => {
    setShowDetails(true);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" onClick={handleCardClick}>
          <div className="relative aspect-video bg-gray-900">
            <video 
              ref={setVideoRef} 
              className="w-full h-full object-cover"
              onLoadedData={handleVideoLoadedData}
              playsInline
              muted
              preload="metadata"
            >
              <source src={member.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Overlay - shows when not playing */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-100 group-hover:opacity-90 transition-opacity duration-300">
                <Button 
                  onClick={handlePlayPause} 
                  variant="secondary" 
                  size="lg" 
                  className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                >
                  <Play className="h-6 w-6 ml-1" />
                </Button>
              </div>
            )}

            {/* Pause button overlay - shows when playing */}
            {isPlaying && (
              <div className="absolute inset-0 bg-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button 
                  onClick={handlePlayPause} 
                  variant="secondary" 
                  size="lg" 
                  className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                >
                  <Pause className="h-6 w-6" />
                </Button>
              </div>
            )}

            {/* Name overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-semibold text-lg">{member.name}</h3>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="space-y-2">
              <h4 className="font-bold text-lg text-primary">{member.role}</h4>
              <p className="text-muted-foreground">{member.description}</p>
              
              {/* Profile indicator */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="h-3 w-3" />
                  View full profile
                </span>
                <ArrowRight className="h-4 w-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </CardContent>

          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 rounded-lg ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-300 pointer-events-none" />
        </Card>
      </motion.div>

      {/* Team Member Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{member.name}</DialogTitle>
            <DialogDescription className="text-lg text-primary font-semibold">
              {member.role}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Video Section */}
            <div className="space-y-4">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video 
                  className="w-full h-full object-cover" 
                  controls 
                  preload="metadata"
                >
                  <source src={member.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              {/* Contact Info */}
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{member.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Joined {member.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  About
                </h3>
                <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Experience</h3>
                <p className="text-muted-foreground">{member.experience}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Education</h3>
                <p className="text-muted-foreground">{member.education}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const TeamSection: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4" 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            Meet Our Expert Team
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto" 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our diverse team of more than 300 experts brings together cutting-edge skills in AI, development, design, and project management to deliver exceptional results for your projects.
          </motion.p>
        </div>

        {isMobile ? (
          <div className="relative">
            <Carousel 
              opts={{ align: "start", loop: true }} 
              className="w-full max-w-sm mx-auto"
            >
              <CarouselContent>
                {teamMembers.map((member, index) => (
                  <CarouselItem key={member.id}>
                    <div className="p-1">
                      <TeamMemberCard member={member} index={index} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
