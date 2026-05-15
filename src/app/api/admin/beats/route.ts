import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceClient() {
  if (!supabaseUrl || !serviceKey) {
    throw new Error('Missing Supabase environment variables');
  }
  return createClient(supabaseUrl, serviceKey);
}

// GET — fetch all beats
export async function GET() {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('beats')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch beats';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST — create a new beat
export async function POST(req: NextRequest) {
  try {
    const supabase = getServiceClient();
    const body = await req.json();

    const { title, bpm, key, price, image, audio, tags } = body;

    if (!title || !audio) {
      return NextResponse.json({ error: 'Title and audio URL are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('beats')
      .insert({
        title,
        bpm: bpm || '-',
        key: key || '-',
        price: price || 29.99,
        image: image || 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop',
        audio,
        tags: tags || ['Beat'],
        wav_link: '',
        stems_link: '',
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create beat';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// PUT — update an existing beat
export async function PUT(req: NextRequest) {
  try {
    const supabase = getServiceClient();
    const body = await req.json();
    const { id, ...fields } = body;

    if (!id) {
      return NextResponse.json({ error: 'Beat ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('beats')
      .update(fields)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update beat';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE — remove a beat
export async function DELETE(req: NextRequest) {
  try {
    const supabase = getServiceClient();
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Beat ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('beats')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete beat';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
