
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { getJobById, JobListing } from "@/data/jobListings";
import { ArrowLeft, Briefcase, Clock, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      const foundJob = getJobById(jobId);
      if (foundJob) {
        setJob(foundJob);
      }
      setIsLoading(false);
    }
  }, [jobId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="container py-12 flex-1 flex items-center justify-center">
          <div className="text-center">
            <p>Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="container py-12 flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Job Not Found</CardTitle>
              <CardDescription>
                The job posting you're looking for doesn't exist or may have been removed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/careers">View All Job Openings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/careers" 
              className="flex items-center mb-6 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Jobs
            </Link>
            
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Remote Position</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>Project-based</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                <span>Team-as-a-Service Model</span>
              </div>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">What is TaaS?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{job.taasDescription}</p>
              <p className="mt-4 text-sm text-muted-foreground italic">
                <strong>Note:</strong> {job.note}
              </p>
            </CardContent>
          </Card>
          
          <div className="grid gap-8 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate("/career/apply", { state: { jobTitle: job.title } })} 
              size="lg"
              className="px-8"
            >
              Apply for this Position
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
