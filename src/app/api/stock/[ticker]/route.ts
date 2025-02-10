// import { get } from "@/utils/fetcher"
import { get } from "@/utils/fetcher";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600

export async function GET(
  request: NextRequest,
  { params }: { params: { ticker: string } }
) {
  
const { ticker } = await params;
  const searchParams = request.nextUrl.searchParams;
  const startTs = searchParams.get('startTs');
  const endTs = searchParams.get('endTs');


    try {
        const data = await get(`${process.env.NEXT_PUBLIC_STOCK_API_URL}v2/aggs/ticker/${ticker}/range/1/day/${startTs}/${endTs}`, {
            params: {
                adjusted: true,
                sort: 'asc',
                apiKey: process.env.STOCK_API_KEY
            }
        })

        return NextResponse.json({
            success: true,
            data,
            message: 'Successfully',
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
              success: false,
              message: 'Failed to fetch data',
            },
            { status: 500 }
          );
    }
}