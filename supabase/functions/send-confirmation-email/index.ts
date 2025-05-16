
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

// Configure CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Digital Software Market SendMail API endpoint
const SEND_MAIL_API_URL = "https://mailing.techrealm.online/sendmail?smtp_server=true&track_open=false";

interface EmailRequest {
  candidateName: string;
  email: string;
  uniqueId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { candidateName, email, uniqueId }: EmailRequest = await req.json();
    
    console.log(`Sending confirmation email to ${candidateName} (${email}) with ID: ${uniqueId}`);
    
    if (!candidateName || !email) {
      throw new Error("Missing required fields: candidateName or email");
    }

    // Get the HTML content from the public file
    // For edge functions, we need to fetch the file content from the deployed app URL
    const projectUrl = Deno.env.get("PROJECT_URL") || "https://taas.techrealm.pk";
    const htmlResponse = await fetch(`${projectUrl}/public.html`);
    
    if (!htmlResponse.ok) {
      throw new Error(`Failed to fetch email template: ${htmlResponse.status}`);
    }
    
    let htmlContent = await htmlResponse.text();
    
    // Simple personalization of the HTML content if needed
    htmlContent = htmlContent.replace(/{{candidateName}}/g, candidateName);
    htmlContent = htmlContent.replace(/{{email}}/g, email);
    htmlContent = htmlContent.replace(/{{uniqueId}}/g, uniqueId);
    
    // Send email using Digital Software Market SendMail API
    const emailResponse = await fetch(SEND_MAIL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: htmlContent,
        subject: "You've Been Fast-Tracked - TechRealm TAAS Application",
        sender_email: "applications@techrealm.pk",
        sender_name: "TechRealm TAAS Recruiting",
        recipient: email
      }),
    });
    
    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      throw new Error(`Email API error: ${emailResponse.status} - ${errorText}`);
    }
    
    const emailResult = await emailResponse.json();
    
    // Log the success result
    console.log("Email sent successfully:", emailResult);
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Confirmation email sent successfully",
        data: emailResult 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
};

serve(handler);
