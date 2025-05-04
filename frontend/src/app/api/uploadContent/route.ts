import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';


export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('fileUpload') as File;
    const fileTitle = formData.get('fileTitle') as string;

    if (!file || !fileTitle) {
        return NextResponse.json({ error: 'Missing file or title' }, { status: 400 });
    }

    const fs = require('fs');
    const path = require('path');

    function createFolder(folderPath: any) {
    fs.mkdir(folderPath, { recursive: true }, (err: any) => {
        if (err) {
        console.error("An error occurred:", err);
        } else {
        console.log("Folder created successfully!");
        }
    });
    }

    // Example usage:
    const newFolderPath = path.join(process.cwd(), 'private', 'uploads');
    createFolder(newFolderPath);

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}-${file.name}`;
    const filepath = path.join(process.cwd(), 'private', 'uploads', filename);

    try {
        await writeFile(filepath, buffer);
        return NextResponse.json({ message: 'Upload successful', filePath: `../private/uploads/${filename}` });
    } catch (error) {
        console.error('Upload failed:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
