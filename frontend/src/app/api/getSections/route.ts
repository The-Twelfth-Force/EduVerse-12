import { query } from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';
import { Section } from "@/lib/dbSchema";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q');
    if (!q) {
        return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }

    try {
        const results = await query<Section[]>({
            query: "SELECT * FROM Section WHERE Course_ID LIKE ? OR Subject LIKE ? OR S_Info LIKE ? OR Date LIKE ?",
            values: ['%'+q+'%', '%'+q+'%', '%'+q+'%', '%'+q+'%'],
        });

        return NextResponse.json(results);
    } catch (error) {
        console.error('Error fetching sections:', error);
        return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
    }
}