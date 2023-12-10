import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const data = await axios
    .get(
      "https://www.instagram.com/api/v1/users/web_profile_info/?username=sushilsubedi32",
      {
        headers: {
          "User-Agent":
            "Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743) ",
        },
      }
    )
    .then((res) => res.data);
  const user = data?.data?.user;
  return Response.json(
    { user: user },
    {
      status: 200,
    }
  );
}
