
import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Define types for our personality test
type Answer = {
  text: string;
  score: number;
};

type Question = {
  question: string;
  options: Answer[];
  signal: string;
};

type UserAnswer = {
  questionIndex: number;
  selectedOption: number;
  score: number;
};

const questions: Question[] = [
  {
    question: "Application silence for 5 days — what do you do?",
    options: [
      { text: "Message the recruiter on WhatsApp or call them directly", score: 0 },
      { text: "Send another email and maybe call if no reply within a day", score: 1 },
      { text: "Wait a few days before sending a polite follow-up email", score: 3 },
      { text: "Let it go — they'll contact me if they want to", score: 2 },
      { text: "Politely follow up once and focus on other roles", score: 5 }
    ],
    signal: "Professionalism + Patience"
  },
  {
    question: "You found the recruiter's Instagram. What do you do?",
    options: [
      { text: "Message them there — it's just networking", score: 0 },
      { text: "I might message if they posted about hiring", score: 1 },
      { text: "Leave it alone — it's private", score: 3 },
      { text: "I would never cross professional boundaries", score: 3 },
      { text: "Only engage if invited", score: 5 }
    ],
    signal: "Boundary Respect + Judgment"
  },
  {
    question: "What's a work flaw you have?",
    options: [
      { text: "I get impatient and send too many follow-ups", score: 4 },
      { text: "I work too hard and can't stop", score: 1 },
      { text: "I overthink things or ask too many questions", score: 5 },
      { text: "I don't have any", score: 0 },
      { text: "I can be too direct under stress", score: 4 }
    ],
    signal: "Self-Awareness + Authenticity"
  },
  {
    question: "Reaction to rejection from a dream job",
    options: [
      { text: "Ask what went wrong", score: 2 },
      { text: "Rant on social media", score: 0 },
      { text: "Send a follow-up thank you", score: 3 },
      { text: "Say nothing — waste of time", score: 1 },
      { text: "Send gratitude, ask for feedback, and move on", score: 5 }
    ],
    signal: "Emotional Maturity"
  },
  {
    question: "Thoughts during a 3-hour hiring queue wait",
    options: [
      { text: "Leave — this is unprofessional", score: 0 },
      { text: "It sucks, but worth it", score: 5 },
      { text: "Rehearse pitch", score: 3 },
      { text: "Wait and post about it", score: 1 },
      { text: "Wait quietly — used to long lines", score: 2 }
    ],
    signal: "Intuition + Endurance"
  },
  {
    question: "Zoom interview starts 15 minutes late, no apology",
    options: [
      { text: "End the call — disrespectful", score: 0 },
      { text: "Say nothing and continue", score: 2 },
      { text: "Ask if everything is okay first", score: 5 },
      { text: "Get annoyed but fake it", score: 1 },
      { text: "Joke to break tension", score: 4 }
    ],
    signal: "Empathy + Adaptability"
  },
  {
    question: "Recruiter read your message but didn't reply",
    options: [
      { text: "Message again soon", score: 1 },
      { text: "They're probably busy — I'll wait", score: 4 },
      { text: "That's rude — I might not want to work there", score: 2 },
      { text: "Follow up again", score: 1 },
      { text: "Overthinking — I'll wait and move on", score: 3 }
    ],
    signal: "Emotional Regulation"
  },
  {
    question: "Teammate missed deadline that affects you",
    options: [
      { text: "Call them out", score: 0 },
      { text: "Cover for them without saying anything", score: 2 },
      { text: "Talk to them directly and help fix it", score: 5 },
      { text: "Say nothing but resent them", score: 1 },
      { text: "Report to manager", score: 2 }
    ],
    signal: "Conflict Management"
  },
  {
    question: "Offer is 30% below expected, but you want the role",
    options: [
      { text: "Accept immediately", score: 1 },
      { text: "Ask to revisit compensation", score: 5 },
      { text: "Express disappointment", score: 3 },
      { text: "Decline firmly", score: 2 },
      { text: "Accept and prove yourself", score: 4 }
    ],
    signal: "Negotiation + Adaptability"
  },
  {
    question: "You reply-all by accident with a personal comment",
    options: [
      { text: "Panic and apologize formally", score: 4 },
      { text: "Ignore it", score: 1 },
      { text: "Blame the system", score: 0 },
      { text: "Laugh it off casually", score: 3 },
      { text: "Resign", score: 0 }
    ],
    signal: "Composure under Embarrassment"
  },
  {
    question: "Coworker takes credit for your work",
    options: [
      { text: "Publicly call them out", score: 0 },
      { text: "Let it go", score: 1 },
      { text: "Speak to them privately", score: 5 },
      { text: "Raise it in 1:1 with manager", score: 4 },
      { text: "Hint about your contribution mid-meeting", score: 3 }
    ],
    signal: "Ethics + Professionalism"
  },
  {
    question: "Asked to do task outside job description",
    options: [
      { text: "Say no — not your job", score: 0 },
      { text: "Agree without question", score: 2 },
      { text: "Ask for clarity on expectations", score: 5 },
      { text: "Accept but flag it later", score: 4 },
      { text: "Do it, then raise concern after", score: 3 }
    ],
    signal: "Ownership + Boundaries"
  },
  {
    question: "No feedback after 10 days of final interview",
    options: [
      { text: "Send daily follow-ups", score: 0 },
      { text: "Send one polite follow-up", score: 5 },
      { text: "Wait longer", score: 3 },
      { text: "Move on without following up", score: 2 },
      { text: "Ask a friend to contact them", score: 1 }
    ],
    signal: "Persistence + Professionalism"
  },
  {
    question: "Team didn't welcome you in group chat",
    options: [
      { text: "Complain to HR", score: 0 },
      { text: "Ask someone why", score: 1 },
      { text: "Introduce yourself casually", score: 5 },
      { text: "Stay quiet", score: 2 },
      { text: "Give it time", score: 4 }
    ],
    signal: "Social Awareness"
  },
  {
    question: "Job role changes from original listing",
    options: [
      { text: "Accept anyway", score: 2 },
      { text: "Ask for new description in writing", score: 5 },
      { text: "Decline immediately", score: 1 },
      { text: "Say yes and wing it", score: 0 },
      { text: "Ask if comp or expectations changed too", score: 4 }
    ],
    signal: "Adaptability + Caution"
  },
  {
    question: "Asked to work on a weekend last-minute",
    options: [
      { text: "Say no", score: 1 },
      { text: "Say yes to keep team happy", score: 3 },
      { text: "Ask if it's optional", score: 5 },
      { text: "Agree but ask for time off later", score: 4 },
      { text: "Agree but feel frustrated inside", score: 2 }
    ],
    signal: "Work Ethic + Emotional Management"
  },
  {
    question: "Colleague makes mildly offensive joke",
    options: [
      { text: "Call them out publicly", score: 0 },
      { text: "Laugh it off", score: 2 },
      { text: "Talk to them privately", score: 5 },
      { text: "Report them", score: 3 },
      { text: "Ignore it", score: 1 }
    ],
    signal: "Intuition + Boundaries"
  },
  {
    question: "Confusing midnight message from boss",
    options: [
      { text: "Call them", score: 0 },
      { text: "Ignore it until work hours", score: 4 },
      { text: "Reply immediately", score: 2 },
      { text: "Clarify in the morning", score: 5 },
      { text: "Panic and try to decode it", score: 1 }
    ],
    signal: "Urgency Control"
  },
  {
    question: "Junior keeps asking basic questions",
    options: [
      { text: "Tell them to figure it out", score: 0 },
      { text: "Patiently answer each time", score: 4 },
      { text: "Offer a session to explain things", score: 5 },
      { text: "Start ignoring their messages", score: 1 },
      { text: "Complain to manager", score: 2 }
    ],
    signal: "Leadership + Mentorship"
  },
  {
    question: "You made a mistake that cost the company money",
    options: [
      { text: "Try to fix it quietly", score: 1 },
      { text: "Blame another team", score: 0 },
      { text: "Admit and propose a fix", score: 5 },
      { text: "Wait until asked", score: 2 },
      { text: "Resign", score: 0 }
    ],
    signal: "Accountability"
  }
];

const getApplicantType = (score: number) => {
  if (score >= 90) return { type: "Emotionally intelligent human", emoji: "✅" };
  if (score >= 75) return { type: "Likely human, some robotic traits", emoji: "🟡" };
  if (score >= 50) return { type: "Possible AI-assisted or red flag", emoji: "⚠️" };
  return { type: "Likely AI-generated or toxic human", emoji: "🚫" };
};

const PTestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    // Save the answer
    const newAnswer: UserAnswer = {
      questionIndex: currentQuestionIndex,
      selectedOption: selectedOption,
      score: questions[currentQuestionIndex].options[selectedOption].score
    };

    // Update answers
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = newAnswer;
    setUserAnswers(updatedAnswers);

    // Move to next question or complete test
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Check if the next question has already been answered
      const nextAnswer = updatedAnswers.find(a => a.questionIndex === currentQuestionIndex + 1);
      setSelectedOption(nextAnswer ? nextAnswer.selectedOption : null);
    } else {
      setTestCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // Restore the previous answer if it exists
      const prevAnswer = userAnswers.find(a => a.questionIndex === currentQuestionIndex - 1);
      setSelectedOption(prevAnswer ? prevAnswer.selectedOption : null);
    }
  };

  const handleRestartTest = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setTestCompleted(false);
  };

  const calculateTotalScore = () => {
    return userAnswers.reduce((total, answer) => total + answer.score, 0);
  };

  const totalScore = calculateTotalScore();
  const maxPossibleScore = questions.length * 5;
  const scorePercentage = (totalScore / maxPossibleScore) * 100;
  const applicantResult = getApplicantType(scorePercentage);
  
  // Check if the current question has already been answered
  React.useEffect(() => {
    const existingAnswer = userAnswers.find(a => a.questionIndex === currentQuestionIndex);
    setSelectedOption(existingAnswer ? existingAnswer.selectedOption : null);
  }, [currentQuestionIndex, userAnswers]);

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = testCompleted ? 100 : ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      <div className="container max-w-4xl mx-auto mt-24 px-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Personality Assessment Test</CardTitle>
            <CardDescription>
              {testCompleted 
                ? "Your results are ready!" 
                : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
            </CardDescription>
            <Progress value={progressPercentage} className="mt-2" />
          </CardHeader>

          <CardContent className="pt-4">
            {!testCompleted ? (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{currentQuestion.question}</h3>
                  <p className="text-sm text-muted-foreground">Signal: {currentQuestion.signal}</p>
                </div>

                <RadioGroup 
                  value={selectedOption?.toString()} 
                  onValueChange={(value) => handleOptionSelect(parseInt(value))}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    {applicantResult.emoji} {applicantResult.type}
                  </h3>
                  <p className="text-xl">Your score: {totalScore} / {maxPossibleScore} ({Math.round(scorePercentage)}%)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Score Breakdown:</h4>
                  <div className="space-y-2">
                    {userAnswers.map((answer, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>Q{answer.questionIndex + 1}: {questions[answer.questionIndex].signal}</span>
                        <span className="font-semibold">{answer.score}/5 points</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Score Interpretation:</h4>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex justify-between">
                      <span>90–100: ✅ Emotionally intelligent human</span>
                    </li>
                    <li className="flex justify-between">
                      <span>75–89: 🟡 Likely human, some robotic traits</span>
                    </li>
                    <li className="flex justify-between">
                      <span>50–74: ⚠️ Possible AI-assisted or red flag</span>
                    </li>
                    <li className="flex justify-between">
                      <span>&lt;50: 🚫 Likely AI-generated or toxic human</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className={`flex ${testCompleted ? "justify-center" : "justify-between"} pt-6`}>
            {!testCompleted ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNextQuestion} 
                  disabled={selectedOption === null}
                >
                  {currentQuestionIndex === questions.length - 1 ? "Complete Test" : "Next"}
                </Button>
              </>
            ) : (
              <Button onClick={handleRestartTest}>
                Restart Test
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PTestPage;
