
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, Calendar } from "lucide-react";

interface LocationState {
  candidateName?: string;
  email?: string;
  uniqueId?: string;
}

const CareerSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { candidateName, email, uniqueId } = (location.state as LocationState) || {};

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount
      document.body.removeChild(script);
    };
  }, []);

  // If the user navigated directly to this page without going through the application
  useEffect(() => {
    if (!candidateName && !uniqueId) {
      // Give the location state time to load (in case of direct link with state)
      const timer = setTimeout(() => {
        if (!location.state) {
          navigate("/career/apply");
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [candidateName, uniqueId, navigate, location.state]);

  return (
    <div className="min-h-screen pb-16">
      <Navigation />

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
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/acctechrealm/30min" 
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerSuccessPage;
