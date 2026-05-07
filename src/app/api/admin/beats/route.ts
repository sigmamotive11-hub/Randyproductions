import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const adminClient = createClient(supabaseUrl, serviceRoleKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const beatData = {
      title: body.title,
      bpm: body.bpm || '-',
      key: body.key || '-',
      price: body.price,
      image: body.image,
      audio: body.audio,
      wav_link: body.wav_link || '',
      stems_link: body.stems_link || '',
      tags: body.tags || [],
    };
    const { data, error } = await adminClient
      .from('beats')
      .insert([beatData])
      .select();
    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Insert failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const { error } = await adminClient
      .from('beats')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Delete failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
