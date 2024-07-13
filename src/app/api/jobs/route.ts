import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const PAGE_SIZE = 25;

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const job = searchParams.get("job");
  const edu = searchParams.get("edu");
  const location = searchParams.get("location");

  try {
    const response = await fetch(
      `https://apis.data.go.kr/1051000/recruitment/list?serviceKey=${API_KEY}&acbgCondLst=${edu}&ncsCdLst=${job}&numOfRows=${PAGE_SIZE}&pageNo=${page}&workRgnLst=${location}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    const data = Array.isArray(result.result) ? result.result : [result.result];

    const totalCount = result.totalCount;
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    const hasNextPage = page < totalPages;

    const responseData = {
      data,
      totalPages,
      hasNextPage,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
};
