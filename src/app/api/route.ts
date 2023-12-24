import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let userResp = null;
  let errResp = null;
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username)
    return NextResponse.json(
      { error: "No username provided" },
      { status: 500 }
    );

  await axios
    .get(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      {
        headers: {
          "User-Agent": "Instagram 72.0.0.21.98 Android",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .then((res) => {
      if (res.status == "ok") {
        const user = res.data.user;
        userResp = {
          full_name: user.full_name,
          username: user.username,
          profile_pic_url: user.profile_pic_url,
          profile_pic_url_hd: user.profile_pic_url_hd,
          edge_follow_count: user.edge_follow.count,
          edge_followed_by_count: user.edge_followed_by.count,
        };
      } else {
        errResp = `${res.statusText} Internal Server Error`;
      }
    })
    .catch((err) => {
      errResp = `${err.message}`;
    });

  return Response.json({ user: userResp, error: errResp });
}
