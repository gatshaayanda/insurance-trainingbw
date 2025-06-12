import * as admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { join } from 'path'

// will resolve to <project_root>/serviceAccountKey.json
const keyPath = join(process.cwd(), 'serviceAccountKey.json')
const serviceAccount = JSON.parse(
  readFileSync(keyPath, 'utf-8')
) as admin.ServiceAccount

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const adminDb = admin.firestore()
