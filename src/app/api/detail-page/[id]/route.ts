import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const response = await axios.get(
      `https://apis.data.go.kr/1051000/recruitment/detail?serviceKey=DoEeiNknUWHm5hAgJAaqSZKXw4u6LMxoqGbyqhuANVvLcoURZZ6NkpUTKO1L%2FSlGuLXj%2BF6gUtzo4NWAeWbTAA%3D%3D&resultType=json&sn=${params.id}`
    );
    const data = response.data;
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
