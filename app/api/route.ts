import { NextRequest, NextResponse } from 'next/server';

const clients = new Set<ReadableStreamDefaultController>();

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      clients.add(controller);
    },
    cancel(controller) {
      clients.delete(controller);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  for (const client of clients) {
    try {
      client.enqueue(`data: ${JSON.stringify(data)}\n\n`);
    } catch (e) {
      clients.delete(client);
    }
  }

  return new NextResponse(JSON.stringify({ message: '67', data }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
