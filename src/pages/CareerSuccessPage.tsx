
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LocationState {
  candidateName?: string;
  email?: string;
  uniqueId?: string;
  jobPostId?: string;
}

const CareerSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get data from location state or URL parameters
  const stateData = (location.state as LocationState) || {};
  const candidateName = stateData.candidateName || searchParams.get("name") || "";
  const email = stateData.email || searchParams.get("email") || "";
  const uniqueId = stateData.uniqueId || searchParams.get("uniqueId") || "";
  const jobPostId = stateData.jobPostId || searchParams.get("jobPost") || "default-position";
  
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    
    // Set up onload handler before appending to document
    script.onload = () => {
      console.log("Calendly script loaded");
      // Add a small delay to ensure the widget initializes
      setTimeout(() => {
        setCalendlyLoaded(true);
        setIsLoading(false);
      }, 1000); // Reduced delay for faster display
    };
    
    document.body.appendChild(script);

    // Set a timeout for loading state in case script takes too long
    const loadingTimeout = setTimeout(() => {
      if (!calendlyLoaded) {
        setIsLoading(false);
      }
    }, 3000); // Reduced timeout for faster fallback

    return () => {
      // Clean up script on unmount
      document.body.removeChild(script);
      clearTimeout(loadingTimeout);
    };
  }, []);

  // If the user navigated directly to this page without going through the application
  // Modified to allow direct access with jobPost parameter
  useEffect(() => {
    if (!candidateName && !uniqueId && !searchParams.has("jobPost")) {
      // Only redirect if we don't have a job post parameter
      const timer = setTimeout(() => {
        if (!location.state && !searchParams.has("jobPost")) {
          navigate("/career/apply");
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [candidateName, uniqueId, navigate, location.state, searchParams]);

  // Get the appropriate Calendly URL based on job post
  const getCalendlyUrl = () => {
    // Default Calendly URL
    let baseUrl = "https://calendly.com/acctechrealm/30min";
    
    // Customize Calendly URL based on job post ID if needed
    if (jobPostId) {
      if (jobPostId.toLowerCase().includes("design")) {
        baseUrl = "https://calendly.com/acctechrealm/design-interview";
      } else if (jobPostId.toLowerCase().includes("dev") || jobPostId.toLowerCase().includes("developer")) {
        baseUrl = "https://calendly.com/acctechrealm/developer-interview";
      }
    }
    
    return baseUrl;
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />

      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-lg font-medium">Loading your success page...</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 pt-20 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">Application Submitted Successfully!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for applying to TaaS
              {jobPostId !== "default-position" ? ` for the ${jobPostId} position` : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
              <p className="text-green-800 dark:text-green-400">
                {candidateName ? `Hello ${candidateName.split(" ")[0]},` : "Hello,"} your application has been received and will be reviewed by our team.
              </p>
              <p className="text-sm text-green-700 dark:text-green-500 mt-2">
                Application ID: <span className="font-mono font-medium">{uniqueId || "N/A"}</span>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> 
                You're Early! Schedule an Expedited Meeting
              </h3>
              <p className="text-muted-foreground">
                As one of our early applicants, you have the opportunity to schedule an expedited meeting with our team right now.
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              {!calendlyLoaded && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[160px]" />
                    </div>
                  </div>
                  <Skeleton className="h-[600px] w-full" />
                </div>
              )}
              <div 
                className="calendly-inline-widget" 
                data-url={getCalendlyUrl()}
                style={{ 
                  minWidth: '320px', 
                  height: '700px',
                  display: calendlyLoaded ? 'block' : 'none'
                }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerSuccessPage;
