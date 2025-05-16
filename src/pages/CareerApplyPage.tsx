
import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Upload, Save, User, FileText, Video, CheckSquare, Send } from "lucide-react";

// Application steps
const STEPS = {
  INTRO: 0,
  NAME: 1,
  DOCUMENTS: 2,
  VIDEO: 3,
  PERSONALITY: 4,
  SUBMIT: 5,
};

// Personality questions imported from PTestPage
import { questions } from "../components/career/personalityQuestions";

const CareerApplyPage = () => {
  const navigate = useNavigate();
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [step, setStep] = useState(STEPS.INTRO);
  const [progress, setProgress] = useState(0);
  
  // Application state
  const [candidateName, setCandidateName] = useState("");
  const [consentShowcase, setConsentShowcase] = useState(false);
  const [consentSaveProgress, setConsentSaveProgress] = useState(true);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [coverLetterText, setCoverLetterText] = useState("");
  const [useCoverLetterFile, setUseCoverLetterFile] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [personalityAnswers, setPersonalityAnswers] = useState<{
    questionIndex: number;
    selectedOption: number;
    score: number;
  }[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uniqueId, setUniqueId] = useState(`TAAS-${Date.now().toString().slice(-6)}`);

  // Load saved progress from session storage on mount
  useEffect(() => {
    const savedProgress = sessionStorage.getItem("careerApplicationProgress");
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress);
        
        // Restore all saved state
        if (parsedProgress.step !== undefined) setStep(parsedProgress.step);
        if (parsedProgress.candidateName !== undefined) setCandidateName(parsedProgress.candidateName);
        if (parsedProgress.consentShowcase !== undefined) setConsentShowcase(parsedProgress.consentShowcase);
        if (parsedProgress.uniqueId !== undefined) setUniqueId(parsedProgress.uniqueId);
        if (parsedProgress.coverLetterText !== undefined) setCoverLetterText(parsedProgress.coverLetterText);
        if (parsedProgress.useCoverLetterFile !== undefined) setUseCoverLetterFile(parsedProgress.useCoverLetterFile);
        if (parsedProgress.videoUrl !== undefined) setVideoUrl(parsedProgress.videoUrl);
        if (parsedProgress.personalityAnswers !== undefined) setPersonalityAnswers(parsedProgress.personalityAnswers);
        if (parsedProgress.currentQuestionIndex !== undefined) setCurrentQuestionIndex(parsedProgress.currentQuestionIndex);
        
        // Don't show intro modal if we're resuming
        if (parsedProgress.step > STEPS.INTRO) {
          setShowIntroModal(false);
        }
        
        toast("Application progress restored", {
          description: "You can continue from where you left off."
        });
      } catch (error) {
        console.error("Error loading saved progress:", error);
      }
    }
  }, []);
  
  // Save progress to session storage whenever state changes
  useEffect(() => {
    if (consentSaveProgress && step > STEPS.INTRO) {
      const progressData = {
        step,
        candidateName,
        consentShowcase,
        uniqueId,
        coverLetterText,
        useCoverLetterFile,
        videoUrl,
        personalityAnswers,
        currentQuestionIndex,
      };
      
      sessionStorage.setItem("careerApplicationProgress", JSON.stringify(progressData));
    }
  }, [
    step, 
    candidateName, 
    consentShowcase, 
    consentSaveProgress, 
    uniqueId,
    coverLetterText,
    useCoverLetterFile,
    videoUrl,
    personalityAnswers,
    currentQuestionIndex
  ]);
  
  // Update progress bar when step changes
  useEffect(() => {
    setProgress(((step - 1) / (Object.keys(STEPS).length - 2)) * 100);
  }, [step]);
  
  // Start application
  const handleStartApplication = () => {
    if (!consentShowcase) {
      toast.error("Consent required", {
        description: "Please provide consent to showcase your application."
      });
      return;
    }
    
    setShowIntroModal(false);
    setStep(STEPS.NAME);
  };
  
  // Handle file uploads
  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    }
  };
  
  const handleCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverLetterFile(e.target.files[0]);
    }
  };
  
  // Next and previous step navigation
  const handleNextStep = () => {
    // Validate current step
    if (step === STEPS.NAME && !candidateName) {
      toast.error("Please enter your full name");
      return;
    }
    
    if (step === STEPS.DOCUMENTS && !cvFile) {
      toast("Continuing without CV", {
        description: "You can submit your application without a CV, but it may affect your chances."
      });
    }
    
    if (step === STEPS.VIDEO && !videoUrl) {
      toast.error("Video recording is required", {
        description: "Please record a video introduction before proceeding."
      });
      return;
    }
    
    if (step === STEPS.PERSONALITY && personalityAnswers.length < questions.length) {
      toast.error("Personality test incomplete", {
        description: `Please answer all ${questions.length} questions before proceeding.`
      });
      return;
    }
    
    setStep(prevStep => prevStep + 1);
  };
  
  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1);
  };
  
  // Handle API submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append("candidate_name", candidateName);
      formData.append("unique_id", uniqueId);
      
      // Add CV if available
      if (cvFile) {
        formData.append("cv", cvFile);
      }
      
      // Add personality test results as survey
      const personalityResults = {
        answers: personalityAnswers,
        totalScore: personalityAnswers.reduce((total, answer) => total + answer.score, 0),
        maxScore: questions.length * 5,
      };
      
      // Add survey data (personality test results)
      const surveyText = JSON.stringify(personalityResults);
      formData.append("survey", surveyText);
      
      // Add cover letter as additional data
      if (useCoverLetterFile && coverLetterFile) {
        formData.append("cover_letter", coverLetterFile);
      } else if (!useCoverLetterFile && coverLetterText) {
        formData.append("cover_letter_text", coverLetterText);
      }
      
      // Add video URL
      formData.append("video_url", videoUrl);
      
      // Send the request
      const response = await fetch("https://test.applytocollege.pk/submit", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit application");
      }
      
      const data = await response.json();
      
      // Clear session storage
      sessionStorage.removeItem("careerApplicationProgress");
      
      toast.success("Application submitted successfully!", {
        description: "Thank you for applying. We'll review your application and get back to you."
      });
      
      // Show success message with link to video
      if (data.video_url) {
        setVideoUrl(data.video_url);
        // Maybe navigate to success page or show success modal
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application", {
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle personality test option selection
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };
  
  const handleNextQuestion = () => {
    if (selectedOption === null) {
      toast.error("Please select an option");
      return;
    }
    
    // Save the answer
    const newAnswer = {
      questionIndex: currentQuestionIndex,
      selectedOption,
      score: questions[currentQuestionIndex].options[selectedOption].score
    };
    
    // Update answers
    const updatedAnswers = [...personalityAnswers];
    const existingAnswerIndex = updatedAnswers.findIndex(a => a.questionIndex === currentQuestionIndex);
    
    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }
    
    setPersonalityAnswers(updatedAnswers);
    
    // Move to next question or finish test
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      
      // Check if the next question has already been answered
      const nextAnswer = updatedAnswers.find(a => a.questionIndex === currentQuestionIndex + 1);
      setSelectedOption(nextAnswer ? nextAnswer.selectedOption : null);
    } else {
      // All questions answered, enable the Next button in the main flow
      toast.success("Personality test completed!");
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      
      // Restore the previous answer if it exists
      const prevAnswer = personalityAnswers.find(a => a.questionIndex === currentQuestionIndex - 1);
      setSelectedOption(prevAnswer ? prevAnswer.selectedOption : null);
    }
  };
  
  // Render the specific content for the current step
  const renderStepContent = () => {
    switch (step) {
      case STEPS.NAME:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="candidate-name">Full Name</Label>
              <Input
                id="candidate-name"
                placeholder="Enter your full name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unique-id">Application ID</Label>
              <Input
                id="unique-id"
                value={uniqueId}
                readOnly
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">This is your unique application ID for reference.</p>
            </div>
          </div>
        );
      
      case STEPS.DOCUMENTS:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cv-file">Upload CV/Resume (PDF or DOCX)</Label>
              <Input
                id="cv-file"
                type="file"
                accept=".pdf,.docx"
                onChange={handleCvUpload}
              />
              {cvFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {cvFile.name} ({Math.round(cvFile.size / 1024)} KB)
                </p>
              )}
              {!cvFile && (
                <p className="text-sm text-muted-foreground">
                  Optional, but recommended for better chances.
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={useCoverLetterFile}
                  onCheckedChange={setUseCoverLetterFile}
                  id="cover-letter-switch"
                />
                <Label htmlFor="cover-letter-switch">Upload cover letter as file</Label>
              </div>
              
              {useCoverLetterFile ? (
                <div className="space-y-2">
                  <Label htmlFor="cover-letter-file">Upload Cover Letter (PDF or DOCX)</Label>
                  <Input
                    id="cover-letter-file"
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleCoverLetterUpload}
                  />
                  {coverLetterFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {coverLetterFile.name} ({Math.round(coverLetterFile.size / 1024)} KB)
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="cover-letter-text">Cover Letter</Label>
                  <textarea
                    id="cover-letter-text"
                    className="flex min-h-[160px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Write your cover letter here..."
                    value={coverLetterText}
                    onChange={(e) => setCoverLetterText(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        );
      
      case STEPS.VIDEO:
        return (
          <div className="space-y-6">
            <p className="text-sm">
              Please record a video introduction (required). Speak in English and cover the following:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
              <li>Introduce yourself</li>
              <li>Talk about your interests and hobbies</li>
              <li>How you got into tech</li>
              <li>Your education or skills</li>
              <li>Why you chose TaaS</li>
              <li>Your relevant experience</li>
            </ul>
            
            <div className="flex justify-center">
              <Button 
                onClick={() => navigate("/careers/test", { state: { returnUrl: "/career/apply" } })}
                variant="outline"
              >
                <Video className="mr-2 h-4 w-4" />
                Open Video Recording Tool
              </Button>
            </div>
            
            {/* Show video URL input field */}
            <div className="space-y-2">
              <Label htmlFor="video-url">Video URL</Label>
              <Input
                id="video-url"
                placeholder="Enter your recorded video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                After recording, copy the URL from the video tool and paste it here.
              </p>
            </div>
            
            {/* Show video preview if URL is available */}
            {videoUrl && (
              <div className="space-y-2">
                <Label>Video Preview</Label>
                <video 
                  src={videoUrl} 
                  controls 
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>
        );
        
      case STEPS.PERSONALITY:
        const currentQuestion = questions[currentQuestionIndex];
        const testProgress = ((currentQuestionIndex + 1) / questions.length) * 100;
        
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm">
                The personality test helps us match you to the best-fit teams, projects, and clients
                based on your unique working style and thinking patterns.
              </p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{personalityAnswers.length} answered</span>
              </div>
              <Progress value={testProgress} className="h-2" />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-md border cursor-pointer hover:bg-muted ${
                      selectedOption === index ? 'border-primary bg-primary/10' : ''
                    }`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Question
              </Button>
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex === questions.length - 1 ? "Finish Test" : "Next Question"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      
      case STEPS.SUBMIT:
        // Calculate personality test score
        const totalScore = personalityAnswers.reduce((total, answer) => total + answer.score, 0);
        const maxScore = questions.length * 5;
        const scorePercentage = Math.round((totalScore / maxScore) * 100);
        
        // Determine personality type based on score
        let personalityType;
        if (scorePercentage >= 90) {
          personalityType = "Emotionally intelligent human ✅";
        } else if (scorePercentage >= 75) {
          personalityType = "Likely human, some robotic traits 🟡";
        } else if (scorePercentage >= 50) {
          personalityType = "Possible AI-assisted or red flag ⚠️";
        } else {
          personalityType = "Likely AI-generated or toxic human 🚫";
        }
        
        return (
          <div className="space-y-6">
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">Application Summary</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Name:</dt>
                  <dd>{candidateName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Application ID:</dt>
                  <dd>{uniqueId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">CV:</dt>
                  <dd>{cvFile ? cvFile.name : "Not provided"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Cover Letter:</dt>
                  <dd>
                    {useCoverLetterFile 
                      ? (coverLetterFile ? coverLetterFile.name : "Not provided")
                      : (coverLetterText ? "Provided as text" : "Not provided")
                    }
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Video:</dt>
                  <dd>{videoUrl ? "Provided" : "Not provided"}</dd>
                </div>
              </dl>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">Personality Assessment</h3>
              <div className="text-center mb-3">
                <p className="text-lg font-bold">{personalityType}</p>
                <p>Score: {totalScore}/{maxScore} ({scorePercentage}%)</p>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 p-4 rounded-md">
              <p className="text-sm">
                <strong>⚠️ Warning:</strong> Once submitted, you will not be able to edit your application. 
                Please review all information carefully before proceeding.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Step icons for the progress indicator
  const stepIcons = {
    [STEPS.NAME]: <User />,
    [STEPS.DOCUMENTS]: <FileText />,
    [STEPS.VIDEO]: <Video />,
    [STEPS.PERSONALITY]: <CheckSquare />,
    [STEPS.SUBMIT]: <Send />,
  };
  
  // Step titles for the progress indicator
  const stepTitles = {
    [STEPS.NAME]: "Personal Info",
    [STEPS.DOCUMENTS]: "Documents",
    [STEPS.VIDEO]: "Video",
    [STEPS.PERSONALITY]: "Personality",
    [STEPS.SUBMIT]: "Submit",
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      {/* Company intro modal */}
      <Dialog open={showIntroModal} onOpenChange={setShowIntroModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">📝 Application Process – TaaS</DialogTitle>
            <DialogDescription>
              Please review the following information before proceeding.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">Who is TaaS?</h3>
              <p className="text-sm">
                TaaS (Team-as-a-Service) is an AI-powered platform that lets anyone build a real app 
                with a real team — for under $100. We instantly assign a pre-vetted team of 300+ 
                developers, designers, and PMs based on your project needs. Plan your product with AI, 
                finalize it with experts, and manage everything in a VS Code–style workspace.
                It's the first platform where AI + humans collaborate to deliver end-to-end software.
              </p>
              <p className="text-sm italic mt-2">You dream it. We build it.</p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">What will this application involve?</h3>
              <ul className="text-sm space-y-3 list-disc pl-5">
                <li>
                  A <strong>personality test</strong> to understand your mindset and align you 
                  with suitable roles.
                </li>
                <li>
                  A <strong>video recording</strong> to introduce yourself and showcase your 
                  communication skills.
                  <p className="text-red-500 mt-1">
                    ❗ Your video is <strong>required</strong>. Please <strong>speak in English only</strong>.
                  </p>
                </li>
                <li>
                  An optional <strong>CV</strong> and <strong>cover letter</strong> to share your credentials.
                </li>
              </ul>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-md text-orange-800 dark:text-orange-300">
              <h3 className="font-bold mb-2">⚠️ Important Disclaimer</h3>
              <ul className="text-sm space-y-2">
                <li>This is <strong>not an immediate hiring opportunity</strong>.</li>
                <li>TaaS is a startup actively seeking revenue streams and growth partners.</li>
                <li>
                  Your video resume or skill profile <strong>may be promoted on social media</strong> 
                  to attract clients.
                </li>
                <li>
                  You <strong>will not be compensated immediately</strong> — this is a pre-hiring 
                  and scouting process.
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="consent"
                  checked={consentShowcase}
                  onCheckedChange={setConsentShowcase}
                />
                <Label htmlFor="consent" className="text-sm">
                  I give complete consent to use my application for public showcasing.
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="save-progress"
                  checked={consentSaveProgress}
                  onCheckedChange={setConsentSaveProgress}
                />
                <Label htmlFor="save-progress" className="text-sm">
                  I want to save my progress and continue later.
                </Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={handleStartApplication}>
              Start Application
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Main application container */}
      <div className="container mx-auto px-4 pt-20 max-w-3xl">
        {step > STEPS.INTRO && (
          <>
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {Object.entries(stepTitles).map(([stepKey, title]) => {
                  const stepNumber = parseInt(stepKey);
                  // Skip intro step
                  if (stepNumber === STEPS.INTRO) return null;
                  
                  // Determine status: completed, current, or upcoming
                  const isCompleted = step > stepNumber;
                  const isCurrent = step === stepNumber;
                  
                  return (
                    <div 
                      key={stepKey}
                      className={`flex flex-col items-center ${isCurrent ? 'text-primary' : isCompleted ? 'text-green-500' : 'text-muted-foreground'}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCurrent 
                          ? 'bg-primary/20 border-2 border-primary' 
                          : isCompleted 
                            ? 'bg-green-100 dark:bg-green-900' 
                            : 'bg-muted'
                      }`}>
                        {stepIcons[stepNumber as keyof typeof stepIcons]}
                      </div>
                      <span className="text-xs mt-1 hidden sm:block">{title}</span>
                    </div>
                  );
                })}
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {/* Application card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{stepTitles[step as keyof typeof stepTitles]}</CardTitle>
                <CardDescription>
                  {step === STEPS.NAME && "Enter your personal information"}
                  {step === STEPS.DOCUMENTS && "Upload your CV and cover letter (optional)"}
                  {step === STEPS.VIDEO && "Record a video introduction"}
                  {step === STEPS.PERSONALITY && "Complete the personality assessment"}
                  {step === STEPS.SUBMIT && "Review and submit your application"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {renderStepContent()}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                  disabled={step === STEPS.NAME}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                {step < STEPS.SUBMIT ? (
                  <Button onClick={handleNextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            {/* Save progress button */}
            {consentSaveProgress && step > STEPS.INTRO && (
              <div className="mt-4 flex justify-center">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    toast.success("Progress saved", {
                      description: "You can resume your application later from this device."
                    });
                  }}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Progress
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CareerApplyPage;
