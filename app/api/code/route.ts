// app/api/code/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const isAllowed = await checkApiLimit();
    const isPro = await checkSubscription();
    if (!isAllowed && !isPro) {
      return new NextResponse("API Limit Exceeded", { status: 403 });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let modifiedPrompt = prompt;
    if (!modifiedPrompt.toLowerCase().startsWith("generate the code for")) {
      modifiedPrompt = `Generate the code for ${modifiedPrompt}`;
    }
    if (!isPro) {
      await increaseApiLimit();
    }
    const result = await model.generateContent(modifiedPrompt);

    const generatedCode = result.response.text();

    return NextResponse.json({ generatedCode }, { status: 200 });
  } catch (error: any) {
    console.error("[CODE_GENERATION_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}