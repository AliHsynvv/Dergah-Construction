import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = "https://qarvqarisqa.app.n8n.cloud/webhook/01d00d54-7d74-43df-8279-8930d75c6bfe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("📨 Chatbot mesajı alındı:", {
      message: body.message,
      sessionId: body.sessionId,
    });

    // Forward the request to the webhook
    const requestBody = {
      sessionId: body.sessionId,
      message: body.message,
      timestamp: body.timestamp,
    };

    console.log("🌐 Webhook'a gönderiliyor:", WEBHOOK_URL);
    console.log("📦 Request body:", requestBody);

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("📊 Webhook response status:", response.status);
    console.log("📊 Webhook response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Webhook hatası:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Webhook failed with status: ${response.status}. Response: ${errorText}`);
    }

    let data;
    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
      console.log("✅ Webhook yanıtı (JSON):", JSON.stringify(data, null, 2));
    } else {
      // If response is not JSON, return a default message
      const text = await response.text();
      console.log("📝 Webhook yanıtı (text):", text);
      data = { 
        response: text || "Mesajınız alındı. Tezliklə sizinlə əlaqə saxlayacağıq.",
      };
    }

    // Try different possible response fields from n8n webhook
    const botResponse = 
      data.output || 
      data.response || 
      data.message || 
      data.text ||
      data.reply ||
      data.answer ||
      (typeof data === 'string' ? data : null) ||
      JSON.stringify(data);

    console.log("🤖 Bot cavabı:", botResponse);

    return NextResponse.json({
      success: true,
      response: botResponse,
    });

  } catch (error: any) {
    console.error("❌ Chatbot API hatası:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Mesaj göndərilərkən xəta baş verdi",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

