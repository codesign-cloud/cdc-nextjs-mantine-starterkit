import {NextResponse} from "next/server";

export async function GET(request: Request) {
  return new Response('Hello world!');
}
export async function POST(request: Request) {
  return NextResponse.json({ id: 1, message:"Hello world!" });
}

