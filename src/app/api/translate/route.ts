import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${body.target}&dt=t&q=${encodeURIComponent(body.text)}`;
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        {
          translatedText: null,
        },
        {
          status: 500,
        },
      );
    }
    const data = await response.json();
    const translatedText =
      data[0]?.map((item: string[]) => item[0]).join("") ?? body.text;

    return NextResponse.json({
      translatedText,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        translatedText: null,
      },
      {
        status: 500,
      },
    );
  }
}
