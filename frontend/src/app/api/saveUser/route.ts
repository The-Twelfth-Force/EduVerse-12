import { query } from "@/lib/db";
import { User } from "@/lib/dbSchema";

export async function POST(request: Request) {
    const { clerkID, School_Email, Password } = await request.json();
    const dateC = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format date to YYYY-MM-DD HH:MM:SS

    if (!clerkID || !School_Email || !Password) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await query<User[]>({
        query: "SELECT * FROM User WHERE clerkID = ?",
        values: [clerkID],
    });
    if (existingUser.length > 0) {
        return Response.json({ error: 'User already exists' }, { status: 409 });
    }
    // Insert the new user into the database
    try {
        const results = await query<User[]>({
            query: "INSERT INTO User (UserID, School_Email, Password, Date_Created, clerkID) VALUES (?, ?, ?, ?, ?)",
            values: [Math.random()*1000000, School_Email, Password, dateC, clerkID],
        });
        console.log('User saved:', results);
        return Response.json({ message: 'User saved successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error saving user:', error);
        return Response.json({ error: 'Failed to save user' }, { status: 500 });
    }
}