import React, { useRef, useState } from 'react'

export default function RealBulkoorCardGenerator() {
  const [name, setName] = useState('Real Bulkoor')
  const [level, setLevel] = useState('Bullish')
  const [imgData, setImgData] = useState(DEFAULT_IMG)
  const previewRef = useRef(null)

  function onFileChange(e) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => setImgData(reader.result)
    reader.readAsDataURL(f)
  }

  function downloadCard() {
    const width = 1200
    const height = 760
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    roundRect(ctx, 20, 20, width - 40, height - 40, 28, '#0f172a')
    ctx.fillStyle = '#06b6d4'
    ctx.fillRect(40, 40, 240, 20)

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imgData
    img.onload = () => {
      const imgX = 80
      const imgY = 120
      const imgSize = 240

      ctx.save()
      ctx.beginPath()
      ctx.arc(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize)
      ctx.restore()

      ctx.fillStyle = '#fff'
      ctx.font = 'bold 48px Inter, system-ui'
      ctx.textBaseline = 'top'
      ctx.fillText(name || 'Real Bulkoor', imgX + imgSize + 40, imgY + 20)

      ctx.fillStyle = '#94a3b8'
      ctx.font = '400 26px Inter, system-ui'
      ctx.fillText('Real community participant', imgX + imgSize + 40, imgY + 84)

      const badgeX = imgX + imgSize + 40
      const badgeY = imgY + 140
      drawBadge(ctx, badgeX, badgeY, level)

      ctx.fillStyle = '#9ca3af'
      ctx.font = '400 20px Inter, system-ui'
      ctx.fillText('Real Bulkoor — generated card', 60, height - 120)

      const link = document.createElement('a')
      link.download = `${(name || 'real-bulkoor').replace(/\\s+/g, '_').toLowerCase()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Real Bulkoor — Card Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <label className="block">
            <div className="text-sm text-slate-500 mb-2">Name</div>
            <input
              className="w-full px-3 py-2 rounded border bg-slate-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="block">
            <div className="text-sm text-slate-500 mb-2">Bullish level</div>
            <select
              className="w-full px-3 py-2 rounded border bg-white"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Not bullish</option>
              <option>Mild</option>
              <option>Bullish</option>
              <option>Very bullish</option>
              <option>Max bullish</option>
            </select>
          </label>

          <label className="block">
            <div className="text-sm text-slate-500 mb-2">Photo (optional)</div>
            <input type="file" accept="image/*" onChange={onFileChange} />
          </label>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => downloadCard()}
              className="px-4 py-2 bg-slate-900 text-white rounded hover:opacity-95"
            >
              Download card
            </button>

            <button
              onClick={() => {
                setImgData(DEFAULT_IMG)
                setName('Real Bulkoor')
                setLevel('Bullish')
              }}
              className="px-4 py-2 border rounded"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="p-4 bg-white rounded shadow" ref={previewRef}>
            <CardPreview name={name} level={level} imgData={imgData} />
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        Tip: choose a clear face photo for best result. The card export is a high-resolution PNG.
      </p>
    </div>
  )
}

function CardPreview({ name, level, imgData }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl bg-slate-900 text-white p-6">
        <div className="flex items-center gap-4">
          <img src={imgData} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
          <div>
            <div className="text-lg font-semibold">{name || 'Real Bulkoor'}</div>
            <div className="text-sm text-slate-300">Real Bulkoor card</div>
            <div className="mt-3 inline-block px-3 py-1 bg-slate-700 rounded text-sm">{level}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function roundRect(ctx, x, y, w, h, r, fillStyle) {
  ctx.fillStyle = fillStyle || '#111827'
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
  ctx.fill()
}

function drawBadge(ctx, x, y, text) {
  const padX = 18
  const padY = 10
  ctx.font = '600 28px Inter, system-ui'
  const w = ctx.measureText(text).width + padX * 2
  const h = 44
  ctx.fillStyle = '#065f46'
  ctx.fillRect(x, y, w, h)
  ctx.fillStyle = '#fff'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x + padX, y + h / 2)
}

const DEFAULT_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(\n  `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 24 24' fill='none'>\n    <rect width='24' height='24' rx='4' fill='%232b2f3a'/>\n    <g transform='translate(4,4) scale(0.8)'>\n      <circle cx='8' cy='7' r='3' fill='%2399a3b2'/>\n      <rect x='2' y='13' width='12' height='5' rx='2' fill='%2399a3b2'/>\n    </g>\n  </svg>`)}`
