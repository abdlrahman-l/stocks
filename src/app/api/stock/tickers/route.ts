// import { get } from "@/utils/fetcher"
import { NextResponse } from "next/server";

export const dynamic = 'force-static'
export async function GET() {
    try {
        // const data = await get(`${process.env.NEXT_PUBLIC_POLYGON_API_URL}/v3/reference/tickers`, {
        //     active: true,
        //     limit: 100,
        // })

        return NextResponse.json({
            success: true,
            // data,
            message: 'Tickers list found',
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
              success: false,
              message: 'Failed to fetch Tickers list',
            },
            { status: 500 }
          );
    }
}