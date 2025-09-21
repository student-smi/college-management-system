import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  let data = console.log("clerkClient type:", typeof clerkClient);
  let data2 =console.log("clerkClient keys:", Object.keys(clerkClient));

  return Response.json({ ok: true  , data , data2 });
}
