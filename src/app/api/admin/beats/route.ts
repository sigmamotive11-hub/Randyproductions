import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, serviceRoleKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('beats')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return Response.json(data || []);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch beats';
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from('beats')
      .insert([{
        title: body.title,
        bpm: body.bpm || '-',
        key: body.key || '-',
        price: body.price,
        image: body.image,
        audio: body.audio,
        tags: body.tags || [],
      }])
      .select();

    if (error) throw error;
    return Response.json(data[0]);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Upload failed';
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Missing id' }, { status: 400 });
    }

    const { error } = await supabase
      .from('beats')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return Response.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Delete failed';
    return Response.json({ error: msg }, { status: 500 });
  }
}
