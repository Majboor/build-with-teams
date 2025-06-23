import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Video, User, Mail, Phone, ArrowLeft, ArrowRight, AlertCircle, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { personalityQuestions } from "@/components/career/personalityQuestions";

interface JobDetails {
  jobId: string | null;
  title: string;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  videoUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  agreeTerms: boolean;
  personalityAnswers: string[];
}

const initialFormValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  resume: null,
  coverLetter: "",
  videoUrl: "",
  linkedinUrl: "",
  portfolioUrl: "",
  agreeTerms: false,
  personalityAnswers: Array(personalityQuestions.length).fill(""),
};

export default function CareerApplyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [jobDetails, setJobDetails] = useState<JobDetails>({ jobId: null, title: "" });
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [safariWarningVisible, setSafariWarningVisible] = useState(false);
  
  // New state for special alert functionality
  const [showSpecialAlert, setShowSpecialAlert] = useState(false);
  const [showSpecialBanner, setShowSpecialBanner] = useState(false);

  useEffect(() => {
    const jobId = searchParams.get("jobId");
    const title = searchParams.get("title");
    
    if (jobId) {
      setJobDetails({ jobId, title: title || "" });
      
      // Check if this is the special video model job
      if (jobId === "video-model-reels-host") {
        setShowSpecialAlert(true);
        setShowSpecialBanner(true);
      }
    }

    // Safari Warning Logic
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      setSafariWarningVisible(true);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (questionIndex: number, value: string) => {
    const newAnswers = [...formValues.personalityAnswers];
    newAnswers[questionIndex] = value;
    setFormValues(prev => ({ ...prev, personalityAnswers: newAnswers }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, agreeTerms: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormValues(prev => ({ ...prev, resume: e.target.files[0] }));
    }
  };

  const handleVideoUrlChange = (url: string) => {
    setFormValues(prev => ({ ...prev, videoUrl: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formValues.resume) {
        toast({
          title: "Error",
          description: "Please upload your resume.",
          variant: "destructive",
        });
        return;
      }

      // Upload resume to Supabase Storage
      const resumeFile = formValues.resume;
      const resumeFileName = `resume_${Date.now()}_${resumeFile.name}`;

      const { data: resumeData, error: resumeError } = await supabase.storage
        .from('resumes')
        .upload(resumeFileName, resumeFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (resumeError) {
        throw resumeError;
      }

      const { data: resumePublicUrlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(resumeFileName);

      // Prepare application data for submission to Supabase
      const applicationData = {
        ...formValues,
        resume_url: resumePublicUrlData.publicUrl,
        job_id: jobDetails.jobId,
      };

      // Submit application data to Supabase
      const { data, error } = await supabase
        .from('applications')
        .insert([applicationData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your application has been submitted successfully.",
      });

      // Reset form and navigate
      setFormValues(initialFormValues);
      setCurrentStep(1);
      navigate("/careers");

    } catch (err: any) {
      console.error("Error submitting application:", err);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSpecialAlertClose = () => {
    setShowSpecialAlert(false);
  };

  const handleSpecialBannerClose = () => {
    setShowSpecialBanner(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Special Alert Dialog */}
      <Dialog open={showSpecialAlert} onOpenChange={setShowSpecialAlert}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Important Notice
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              While we welcome applicants of all backgrounds, we especially encourage women with a strong affinity for beauty and fashion products to apply.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button onClick={handleSpecialAlertClose}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Special Banner Alert */}
      {showSpecialBanner && (
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="flex items-center justify-between w-full">
            <span className="text-blue-800">
              While we welcome applicants of all backgrounds, we especially encourage women with a strong affinity for beauty and fashion products to apply.
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSpecialBannerClose}
              className="ml-4 h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {safariWarningVisible && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            It appears you are using Safari. Please note that there may be compatibility issues with some features. For the best experience, consider using Chrome or Firefox.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/careers")}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Careers
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">
          {jobDetails.title || "Job Application"}
        </h1>
        <p className="text-gray-600">
          Complete your application below. All fields marked with * are required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="resume">Resume *</Label>
                <Input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
                {formValues.resume && (
                  <p className="text-sm text-gray-500 mt-1">
                    Selected file: {formValues.resume.name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formValues.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Write a brief cover letter..."
                />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Video Introduction</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <p>
                Record a short video introducing yourself. This is a great way to
                showcase your personality and communication skills.
              </p>
              <Button
                onClick={() =>
                  navigate("/career/apply/video", {
                    state: { returnUrl: "/career/apply" },
                  })
                }
                className="flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Record Video
              </Button>
              {formValues.videoUrl && (
                <p className="text-sm text-gray-500 mt-1">
                  Video URL: {formValues.videoUrl}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
                <Input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formValues.linkedinUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                <Input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={formValues.portfolioUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.yourportfolio.com"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Personality Questions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {personalityQuestions.map((question, index) => (
                <div key={index}>
                  <Label>{question}</Label>
                  <RadioGroup
                    defaultValue={formValues.personalityAnswers[index]}
                    onValueChange={(value) => handleRadioChange(index, value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="agree" id={`q${index}-agree`} />
                      <Label htmlFor={`q${index}-agree`}>Agree</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="neutral" id={`q${index}-neutral`} />
                      <Label htmlFor={`q${index}-neutral`}>Neutral</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="disagree" id={`q${index}-disagree`} />
                      <Label htmlFor={`q${index}-disagree`}>Disagree</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {currentStep === 6 && (
          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="agreeTerms" className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formValues.agreeTerms}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <span>I agree to the terms and conditions *</span>
                </Label>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button variant="secondary" onClick={prevStep}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}

          {currentStep < 6 ? (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting || !formValues.agreeTerms} className="flex items-center gap-2">
              {isSubmitting && <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"></svg>}
              Submit Application
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
