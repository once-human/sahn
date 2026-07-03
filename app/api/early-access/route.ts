import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Path to the local JSON file where emails will be stored
    const dataFilePath = path.join(process.cwd(), 'emails.json');

    let emails = [];
    
    try {
      // Check if file exists and read its contents
      const fileContent = await fs.readFile(dataFilePath, 'utf-8');
      emails = JSON.parse(fileContent);
    } catch (err: any) {
      // If file doesn't exist, we start with an empty array
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    // Check if email already exists
    const emailExists = emails.some((entry: any) => entry.email === email);
    
    if (emailExists) {
      return NextResponse.json(
        { error: 'Email is already on the list' },
        { status: 400 }
      );
    }

    // Add new email with timestamp
    emails.push({
      email,
      timestamp: new Date().toISOString(),
    });

    // Write updated list back to file
    await fs.writeFile(dataFilePath, JSON.stringify(emails, null, 2), 'utf-8');

    return NextResponse.json(
      { message: 'Successfully joined early access' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in early-access API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
