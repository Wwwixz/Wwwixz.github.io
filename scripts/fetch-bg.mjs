/**
 * Подбирает и скачивает свободные фото (Wikimedia Commons) для фонов игры.
 * Запуск: node scripts/fetch-bg.mjs
 * Фото кладутся в src/assets/bg/<ключ>.jpg, метаданные — в src/assets/bg/credits.json
 */
import { mkdir, writeFile } from 'node:fs/promises'

const UA = 'GeoGameAfrica/1.0 (educational quiz; contact: local)'

const QUERIES = {
  elephant: 'African elephant savanna sunset',
  zebra: 'plains zebra serengeti',
  nile: 'felucca Nile Aswan sunset',
  mountain: 'Mount Kilimanjaro',
  desert: 'Sahara dunes sunset Erg Chebbi',
  coast: 'Boulders Beach African penguins',
  volcano: 'Nyiragongo lava lake',
  jungle: 'Bwindi impenetrable forest gorilla',
  baobab: 'Avenue of the Baobabs Madagascar',
  island: 'Madagascar beach sunset',
  lion: 'lion savanna sunset',
  giraffe: 'giraffe sunset silhouette',
}

const API = 'https://commons.wikimedia.org/w/api.php'

async function search(query) {
  const url =
    API +
    '?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=8' +
    '&prop=imageinfo&iiprop=url%7Csize%7Cmime%7Cextmetadata&iiurlwidth=1600' +
    `&gsrsearch=${encodeURIComponent(query + ' filetype:bitmap')}`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`API ${res.status}`)
  const json = await res.json()
  const pages = json?.query?.pages ?? {}
  return Object.values(pages)
    .map((p) => ({ title: p.title, ...(p.imageinfo?.[0] ?? {}) }))
    .filter((p) => p.thumburl)
}

function stripHtml(s) {
  return String(s ?? '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

function pick(cands) {
  const good = (c) =>
    c.mime === 'image/jpeg' && c.width >= 1000 && c.width > c.height && c.width / c.height < 2.8 &&
    !/map|diagram|chart|logo|flag/i.test(c.title)
  return cands.find(good) ?? null
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`download ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(dest, buf)
  return buf.length
}

await mkdir('src/assets/bg', { recursive: true })
const credits = {}

for (const [key, q] of Object.entries(QUERIES)) {
  try {
    const cands = await search(q)
    const best = pick(cands)
    if (!best) {
      console.log(`!! ${key}: ничего не подошло (${cands.length} кандидатов)`)
      continue
    }
    const ext = best.mime === 'image/png' ? 'png' : 'jpg'
    const dest = `src/assets/bg/${key}.${ext}`
    const bytes = await download(best.thumburl, dest)
    credits[key] = {
      file: `src/assets/bg/${key}.${ext}`,
      title: best.title.replace(/^File:/, ''),
      author: stripHtml(best.extmetadata?.Artist?.value) || '—',
      license: stripHtml(best.extmetadata?.LicenseShortName?.value) || '—',
      page: best.descriptionurl ?? '',
      bytes,
    }
    console.log(
      `ok ${key}: ${best.width}x${best.height} ${(bytes / 1024).toFixed(0)}KB — ${credits[key].title} [${credits[key].license}]`,
    )
  } catch (e) {
    console.log(`!! ${key}: ${e.message}`)
  }
}

await writeFile('src/assets/bg/credits.json', JSON.stringify(credits, null, 2))
console.log('\ncredits -> src/assets/bg/credits.json')
