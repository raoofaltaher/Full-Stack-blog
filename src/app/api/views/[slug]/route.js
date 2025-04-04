import { NextResponse } from 'next/server';
import clientPromise from '@/src/lib/mongodb';

export async function GET(request, { params }) {
  const slug = params.slug;
  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(); // Use your default database configured in the connection string

    const viewsCollection = db.collection('views');
    const viewDoc = await viewsCollection.findOne({ slug: slug });

    return NextResponse.json({ count: viewDoc ? viewDoc.count : 0 });
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json({ error: 'Internal Server Error fetching views' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const slug = params.slug;
  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(); // Use your default database configured in the connection string

    const viewsCollection = db.collection('views');

    // Use findOneAndUpdate with upsert:true to increment or insert if not exists
    const result = await viewsCollection.findOneAndUpdate(
      { slug: slug },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: 'after' } // Create if doesn't exist, return the updated doc
    );

    // The result.value contains the document *after* the update if found or inserted
    const newCount = result?.count || 1; // If upserted, count will be 1

    return NextResponse.json({ count: newCount });

  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json({ error: 'Internal Server Error incrementing views' }, { status: 500 });
  }
}
