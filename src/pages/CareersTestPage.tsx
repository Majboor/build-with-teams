import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleStop, Pause, Play, Upload, Circle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function CareersTestPage() {
  const { toast } = useToast();
  const [recording, setRecording] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  
  const MAX_RECORDING_TIME = 60; // 1 minute in seconds

  const startRecording = async () => {
    try {
      // Request camera and microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setVideoData(blob);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        
        // Stop the timer
        if (timerInterval !== null) {
          clearInterval(timerInterval);
          setTimerInterval(null);
        }
      };
      
      // Start recording
      mediaRecorder.start(100);
      setRecording(true);
      setPaused(false);
      setElapsedTime(0);
      
      // Start the timer
      const interval = window.setInterval(() => {
        setElapsedTime(prev => {
          if (prev >= MAX_RECORDING_TIME) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
      setTimerInterval(interval);
      
    } catch (err) {
      console.error("Error accessing media devices:", err);
      toast({
        title: "Permission Error",
        description: "Please allow access to camera and microphone",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      
      // Stop all tracks in the stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      setRecording(false);
      
      // Stop the timer
      if (timerInterval !== null) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  };
  
  const pauseRecording = () => {
    if (mediaRecorderRef.current && recording && !paused) {
      mediaRecorderRef.current.pause();
      setPaused(true);
      
      // Pause the timer
      if (timerInterval !== null) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  };
  
  const resumeRecording = () => {
    if (mediaRecorderRef.current && recording && paused) {
      mediaRecorderRef.current.resume();
      setPaused(false);
      
      // Resume the timer
      const interval = window.setInterval(() => {
        setElapsedTime(prev => {
          if (prev >= MAX_RECORDING_TIME) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
      setTimerInterval(interval);
    }
  };
  
  const uploadVideo = async () => {
    if (!videoData) return;
    
    try {
      setUploading(true);
      
      // Create a unique filename
      const fileName = `video_${Date.now()}.webm`;
      
      // Upload the video to Supabase Storage
      const { data, error } = await supabase.storage
        .from('videos')
        .upload(fileName, videoData, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);
      
      setUploadedUrl(publicUrlData.publicUrl);
      
      toast({
        title: "Success!",
        description: "Video uploaded successfully",
      });
    } catch (err) {
      console.error("Error uploading video:", err);
      toast({
        title: "Upload Failed",
        description: "There was a problem uploading your video",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Video Recording Test</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Record Video</span>
            {recording && (
              <span className="text-sm font-normal flex items-center">
                <span className={`mr-2 h-3 w-3 rounded-full bg-red-500 ${!paused ? 'animate-pulse' : ''}`}></span>
                {formatTime(elapsedTime)} / {formatTime(MAX_RECORDING_TIME)}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex justify-center">
          <div className="relative w-full max-w-md aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-lg">
            {!previewUrl ? (
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <video 
                src={previewUrl} 
                controls 
                className="w-full h-full object-cover"
              />
            )}
            
            {!recording && !previewUrl && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
                  Click record to start
                </p>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center space-x-2">
          {!recording && !previewUrl && (
            <Button onClick={startRecording}>
              <Circle className="mr-2 h-4 w-4" />
              Record
            </Button>
          )}
          
          {recording && !paused && (
            <>
              <Button onClick={pauseRecording} variant="outline">
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
              <Button onClick={stopRecording} variant="secondary">
                <CircleStop className="mr-2 h-4 w-4" />
                Stop
              </Button>
            </>
          )}
          
          {recording && paused && (
            <>
              <Button onClick={resumeRecording} variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Resume
              </Button>
              <Button onClick={stopRecording} variant="secondary">
                <CircleStop className="mr-2 h-4 w-4" />
                Stop
              </Button>
            </>
          )}
          
          {previewUrl && !uploadedUrl && (
            <>
              <Button onClick={() => {
                setPreviewUrl(null);
                setVideoData(null);
              }} variant="outline">
                Record Again
              </Button>
              <Button 
                onClick={uploadVideo} 
                disabled={uploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Submit Video"}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      
      {uploadedUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Video Uploaded Successfully</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your video is available at:</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
              <a 
                href={uploadedUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-all"
              >
                {uploadedUrl}
              </a>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Preview</h3>
              <video 
                src={uploadedUrl} 
                controls 
                className="w-full rounded-lg"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => {
              setPreviewUrl(null);
              setVideoData(null);
              setUploadedUrl(null);
            }} variant="outline">
              Record Another Video
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
