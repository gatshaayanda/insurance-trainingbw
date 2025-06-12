// src/app/api/blog/[id]/route.ts
import { NextResponse } from 'next/server'
import { adminDb }      from '@/utils/firebaseAdmin'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await adminDb.collection('blogs').doc(params.id).delete()
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
