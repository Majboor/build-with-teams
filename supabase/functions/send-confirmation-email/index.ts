
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  candidateName: string;
  email: string;
  uniqueId: string;
}

const brevoApiKey = Deno.env.get("BREVO_API_KEY");
const brevoApiUrl = "https://api.brevo.com/v3/smtp/email";
const senderEmail = "taas@techrealm.online";
const senderName = "TaaS Careers";

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ConfirmationEmailRequest = await req.json();
    const { candidateName, email, uniqueId } = requestData;

    if (!email || !candidateName || !uniqueId) {
      return new Response(
        JSON.stringify({ error: "Email, candidate name, and uniqueId are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Use the new hiring template from Supabase Storage
    const templateUrl = "https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/applications/hiringbk.html";
    const templateResponse = await fetch(templateUrl);

    if (!templateResponse.ok) {
      console.error("Failed to fetch confirmation template. Status:", templateResponse.status);
      throw new Error("Failed to fetch confirmation template");
    }

    let htmlTemplate = await templateResponse.text();

    // Parse the candidate's first name
    const firstName = candidateName.split(' ')[0];

    // Replace all occurrences of placeholders with actual values
    htmlTemplate = htmlTemplate.replace(/\{\{firstName\}\}/g, firstName);
    htmlTemplate = htmlTemplate.replace(/\{\{candidateName\}\}/g, candidateName);
    htmlTemplate = htmlTemplate.replace(/\{\{email\}\}/g, email);
    htmlTemplate = htmlTemplate.replace(/\{\{uniqueId\}\}/g, uniqueId);
    
    // Current date for the email
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    htmlTemplate = htmlTemplate.replace(/\{\{submissionDate\}\}/g, formattedDate);

    // Prepare the email payload for Brevo API
    const emailPayload = {
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          email: email,
          name: candidateName,
        },
      ],
      subject: "Your TaaS Application Confirmation",
      htmlContent: htmlTemplate,
    };

    // Send the email using Brevo API
    const response = await fetch(brevoApiUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey || "",
      },
      body: JSON.stringify(emailPayload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Brevo API error:", responseData);
      throw new Error(`Failed to send confirmation email: ${JSON.stringify(responseData)}`);
    }

    console.log("Confirmation email sent successfully:", responseData);

    return new Response(
      JSON.stringify({ success: true, messageId: responseData.messageId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
