import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'

export async function GET() {
  try {
    // process.cwd()는 프로젝트 루트 경로입니다.
    const filePath = path.join(process.cwd(), 'public', 'menus', 'menu.json')

    // fs 모듈로 파일을 읽습니다.
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read menu data' }, { status: 500 })
  }
}
