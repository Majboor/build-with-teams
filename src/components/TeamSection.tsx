
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  videoUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Asad",
    role: "AI & ML Engineer",
    description: "AI team as a service",
    videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    description: "React & UI/UX specialist",
    videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Backend Developer",
    description: "API & Database architect",
    videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "UI/UX Designer",
    description: "Design systems & user experience",
    videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4"
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Project Manager",
    description: "Agile delivery & team coordination",
    videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4"
  },
  {
    id: 6,
    name: "Lisa Thompson",
    role: "DevOps Engineer",
    description: "Cloud infrastructure & automation",
    videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4"
  },
  {
    id: 7,
    name: "Alex Kumar",
    role: "Full Stack Developer",
    description: "End-to-end application development",
    videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4"
  },
  {
    id: 8,
    name: "Maria Garcia",
    role: "QA Engineer",
    description: "Testing & quality assurance",
    videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4"
  },
  {
    id: 9,
    name: "James Park",
    role: "Data Scientist",
    description: "Analytics & machine learning",
    videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4"
  },
  {
    id: 10,
    name: "Rachel Adams",
    role: "Mobile Developer",
    description: "iOS & Android applications",
    videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4"
  },
  {
    id: 11,
    name: "Tom Mitchell",
    role: "Security Engineer",
    description: "Cybersecurity & compliance",
    videoUrl: "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1748197943291.mp4"
  }
];

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const handlePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef) {
      videoRef.currentTime = 10; // Reset to 10 seconds for thumbnail
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="relative aspect-video bg-gray-900">
          <video
            ref={setVideoRef}
            className="w-full h-full object-cover"
            preload="metadata"
            onLoadedData={() => {
              if (videoRef) {
                videoRef.currentTime = 10; // Set thumbnail to 10 seconds
              }
            }}
            onEnded={handleVideoEnd}
            playsInline
            muted
          >
            <source src={member.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-100 group-hover:opacity-90 transition-opacity duration-300">
            <Button
              onClick={handlePlayPause}
              variant="secondary"
              size="lg"
              className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
          </div>

          {/* Name overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white font-semibold text-lg">{member.name}</h3>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-2">
            <h4 className="font-bold text-lg text-primary">{member.role}</h4>
            <p className="text-muted-foreground">{member.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const TeamSection: React.FC = () => {
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
            Our diverse team of experts brings together cutting-edge skills in AI, development, design, and project management to deliver exceptional results for your projects.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={member.id} 
              member={member} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
