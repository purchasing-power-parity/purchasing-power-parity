import { fetchAllPPP } from "@/lib/ppp";

export async function GET() {
  const data = await fetchAllPPP();
  return Response.json(data);
}
