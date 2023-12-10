import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username)
    return NextResponse.json(
      { error: "No username provided" },
      { status: 500 }
    );

  const data = await axios
    .get(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      {
        headers: {
          "User-Agent": "Instagram 72.0.0.21.98 Android",
        },
      }
    )
    .then((res) => res.data);

  const user = data?.data?.user;

  if (!user)
    return Response.json(
      { error: data },
      {
        status: 404,
      }
    );

  return Response.json(
    { user: user },
    {
      status: 200,
    }
  );
}
