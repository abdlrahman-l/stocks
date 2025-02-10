// import { get } from "@/utils/fetcher"
import { get } from "@/utils/fetcher";
import { StockPriceResponse } from "@/utils/interface/stock";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker } = await params;
  const searchParams = request.nextUrl.searchParams;
  const startTs = searchParams.get("startTs");
  const endTs = searchParams.get("endTs");

  try {
    const data = await get<StockPriceResponse>(
      `${process.env.NEXT_PUBLIC_STOCK_API_URL}v2/aggs/ticker/${ticker}/range/1/day/${startTs}/${endTs}`,
      {
        params: {
          adjusted: true,
          sort: "asc",
          apiKey: process.env.STOCK_API_KEY,
        },
      }
    );

    return NextResponse.json({
      success: true,
      data,
      message: "Successfully",
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error :any) {
    if (error.response && error.response.status === 429) {
      return NextResponse.json(
        {
          success: false,
          message: "Rate limit exceeded. Please try again later.",
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch data",
      },
      { status: 500 }
    );
  }
}