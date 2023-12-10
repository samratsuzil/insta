import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get("username");

  const data = await axios
    .get(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 8.1.0; motorola one Build/OPKS28.63-18-3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.80 Mobile Safari/537.36 Instagram 72.0.0.21.98 Android (27/8.1.0; 320dpi; 720x1362; motorola; motorola one; deen_sprout; qcom; pt_BR; 132081645)",
        },
      }
    )
    .then((res) => res.data);

  const user = data?.data?.user;

  if (!!user)
    return Response.json(
      { user: user },
      {
        status: 200,
      }
    );
  else
    return Response.json(
      { error: "Couldn't fetch" },
      {
        status: 404,
      }
    );
}
