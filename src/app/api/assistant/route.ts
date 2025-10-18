import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
const assistantId = process.env.OPENAI_ASSISTANT_ID;

if (!apiKey || !assistantId) {
  console.error('Missing OPENAI_API_KEY or OPENAI_ASSISTANT_ID');
}

const openai = apiKey ? new OpenAI({ apiKey }) : null;

export async function POST(request: NextRequest) {
  if (!openai || !assistantId) {
    return NextResponse.json(
      { error: 'OpenAI Assistant not configured. Please add OPENAI_API_KEY and OPENAI_ASSISTANT_ID to .env.local' },
      { status: 500 }
    );
  }

  try {
    const { message, rideData, scooterModel, weatherConditions } = await request.json();

    const thread = await openai.beta.threads.create();

    const contextMessage = `Analyze my ride with the following details:

Ride Data:
${rideData}

Scooter Model: ${scooterModel}
Weather Conditions: ${weatherConditions || 'Unknown'}

${message || 'Please analyze my ride and provide insights and suggestions.'}`;

    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: contextMessage,
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

      if (runStatus.status === 'failed' || runStatus.status === 'cancelled' || runStatus.status === 'expired') {
        throw new Error(`Run ${runStatus.status}`);
      }
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data[0];

    if (lastMessage.role === 'assistant' && lastMessage.content[0].type === 'text') {
      return NextResponse.json({
        response: lastMessage.content[0].text.value,
      });
    }

    return NextResponse.json({ error: 'No response from assistant' }, { status: 500 });
  } catch (error) {
    console.error('OpenAI Assistant error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI assistant' },
      { status: 500 }
    );
  }
}
