import { NextResponse } from "next/server";

const END_POINT =
  "https://api.odcloud.kr/api/15091117/v1/uddi:bbcc2939-88e0-4a54-af03-ab819b4130e6?page=1&perPage=196";

type CodeGlobalObj = {
  한글명: string;
  영문명: string;
  "ISO numeric": number;
};
type ApiResponse = {
  data: CodeGlobalObj[];
};

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(END_POINT, {
      headers: {
        Authorization: `Infuser ${process.env.NEXT_PUBLIC_PHONE_CODE_GLOBAL_ENCODING}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: ApiResponse = await response.json();
    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
