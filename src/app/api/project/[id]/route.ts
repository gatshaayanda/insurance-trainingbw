import { NextRequest, NextResponse } from 'next/server'
import { firestore } from '@/utils/firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'Missing project ID' }, { status: 400 })
  }

  try {
    await deleteDoc(doc(firestore, 'projects', id))
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Delete failed' }, { status: 500 })
  }
}
