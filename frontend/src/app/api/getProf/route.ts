import { query } from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';
import { Professor } from "@/lib/dbSchema";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q');
    if (!q) {
        return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }
    try {
        const results = await query<Professor[]>({
            query: "SELECT * FROM Person WHERE SSN = ?",
            values: [q],
        });
        if (results.length === 0) {
            return NextResponse.json({ error: 'No results found' }, { status: 404 });
        }
        return NextResponse.json(results);
    } catch (error) {
        console.error('Error fetching professors:', error);
        return NextResponse.json({ error: 'Failed to fetch professors' }, { status: 500 });
    }
}