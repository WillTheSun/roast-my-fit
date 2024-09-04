import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { resizeAndLimitImage } from '@/app/utils/imageProcessing';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { image } = await request.json();

  if (!image) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 });
  }

  try {
    // Decode base64 image
    const imageBuffer = Buffer.from(image.split(',')[1], 'base64');
    
    // Resize and limit the image
    const processedImageBuffer = await resizeAndLimitImage(imageBuffer);
    
    // Convert processed image back to base64
    const processedImageBase64 = `data:image/jpeg;base64,${processedImageBuffer.toString('base64')}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Roast this outfit." },
            {
              type: "image_url", image_url: {
                url: processedImageBase64
              }
            },
          ],
        },
      ],
    });

    const roast = response.choices[0].message.content;

    return NextResponse.json({ roast });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing the request' }, { status: 500 });
  }
}