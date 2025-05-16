import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { personalityQuestions } from "@/components/career/personalityQuestions";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export default function CareerApplyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const jobTitle = location.state?.jobTitle || "Team Member";
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [portfolio, setPortfolio] = useState("");
  const [experience, setExperience] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleQuestionChange = (id: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Generate a unique ID for this application
    const uniqueId = uuidv4();
    
    try {
      // You would typically send this data to your backend
      toast.success("Application submitted successfully!");
      
      // Send confirmation email
      const emailResponse = await fetch('/functions/v1/send-confirmation-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateName: name,
          email: email,
          uniqueId: uniqueId,
        }),
      });

      if (!emailResponse.ok) {
        console.error('Error sending confirmation email');
      }
      
      navigate("/career/success", { 
        state: { 
          name, 
          jobTitle,
          uniqueId 
        } 
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Apply for {jobTitle} Position</CardTitle>
              <CardDescription>
                Fill out the form below to apply for this position. We'll review your application and get back to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="resume">Resume/CV</Label>
                      <Input 
                        id="resume" 
                        type="file" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setResume(e.target.files[0]);
                          }
                        }}
                        accept=".pdf,.doc,.docx"
                      />
                      <p className="text-sm text-muted-foreground">Upload your resume in PDF, DOC, or DOCX format.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio URL or LinkedIn Profile</Label>
                      <Input 
                        id="portfolio" 
                        value={portfolio} 
                        onChange={(e) => setPortfolio(e.target.value)} 
                        placeholder="https://"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience">Relevant Experience</Label>
                      <Textarea 
                        id="experience" 
                        value={experience} 
                        onChange={(e) => setExperience(e.target.value)} 
                        placeholder="Please describe your relevant experience for this role..."
                        rows={5}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Personality Assessment</h2>
                  <p className="text-muted-foreground">Please answer the following questions to help us understand your working style better.</p>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {personalityQuestions.map((question) => (
                      <div key={question.id} className="space-y-2">
                        <Label htmlFor={question.id}>{question.question}</Label>
                        <Textarea 
                          id={question.id} 
                          value={answers[question.id] || ''} 
                          onChange={(e) => handleQuestionChange(question.id, e.target.value)} 
                          placeholder="Your answer..."
                          rows={3}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" size="lg">Submit Application</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 TaaS - Team as a Service. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
