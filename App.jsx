const { useRef, useState } = React

function RealBulkoorCardGenerator() {
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
      ctx.font = 'bold 48px Inter, system-ui, Arial'
      ctx.textBaseline = 'top'
      ctx.fillText(name || 'Real Bulkoor', imgX + imgSize + 40, imgY + 20)

      ctx.fillStyle = '#94a3b8'
      ctx.font = '400 26px Inter, system-ui, Arial'
      ctx.fillText('Real community participant', imgX + imgSize + 40, imgY + 84)

      const badgeX = imgX + imgSize + 40
      const badgeY = imgY + 140
      drawBadge(ctx, badgeX, badgeY, level)

      ctx.fillStyle = '#9ca3af'
      ctx.font = '400 20px Inter, system-ui, Arial'
      ctx.fillText('Real Bulkoor — generated card', 60, height - 120)

      const link = document.createElement('a')
      link.download = `${(name || 'real-bulkoor').replace(/\s+/g, '_').toLowerCase()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  return (
    <div style={{maxWidth:'900px', margin:'0 auto', padding:'24px'}}>
      <h1 style={{fontSize:'22px', fontWeight:600, marginBottom:'16px'}}>Real Bulkoor — Card Generator</h1>

      <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:'24px'}}>
        <div>
          <label style={{display:'block', marginBottom:'16px'}}>
            <div style={{fontSize:'12px', color:'#64748b', marginBottom:'8px'}}>Name</div>
            <input
              style={{width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid #e2e8f0', background:'#f8fafc'}}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label style={{display:'block', marginBottom:'16px'}}>
            <div style={{fontSize:'12px', color:'#64748b', marginBottom:'8px'}}>Bullish level</div>
            <select
              style={{width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid #e2e8f0', background:'#fff'}}
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

          <label style={{display:'block', marginBottom:'16px'}}>
            <div style={{fontSize:'12px', color:'#64748b', marginBottom:'8px'}}>Photo (optional)</div>
            <input type="file" accept="image/*" onChange={onFileChange} />
          </label>

          <div style={{display:'flex', gap:'12px', marginTop:'12px'}}>
            <button
              onClick={downloadCard}
              style={{padding:'10px 16px', background:'#0f172a', color:'#fff', borderRadius:8, border:'none', cursor:'pointer'}}
            >
              Download card
            </button>

            <button
              onClick={() => { setImgData(DEFAULT_IMG); setName('Real Bulkoor'); setLevel('Bullish') }}
              style={{padding:'10px 16px', background:'#fff', color:'#0f172a', borderRadius:8, border:'1px solid #cbd5e1', cursor:'pointer'}}
            >
              Reset
            </button>
          </div>
        </div>

        <div>
          <div ref={previewRef} style={{padding:'16px', background:'#fff', borderRadius:12, boxShadow:'0 1px 3px rgba(0,0,0,.08)'}}>
            <CardPreview name={name} level={level} imgData={imgData} />
          </div>
        </div>
      </div>

      <p style={{marginTop:'16px', fontSize:'12px', color:'#64748b'}}>
        Tip: choose a clear face photo for best result. The card export is a high-resolution PNG.
      </p>
    </div>
  )
}

function CardPreview({ name, level, imgData }) {
  return (
    <div style={{width:'100%', maxWidth:'360px', margin:'0 auto'}}>
      <div style={{borderRadius:16, background:'#0f172a', color:'#fff', padding:'24px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
          <img src={imgData} alt="avatar" style={{width:96, height:96, borderRadius:'9999px', objectFit:'cover'}} />
          <div>
            <div style={{fontSize:'18px', fontWeight:600}}>{name || 'Real Bulkoor'}</div>
            <div style={{fontSize:'13px', color:'#cbd5e1'}}>Real Bulkoor card</div>
            <div style={{marginTop:'12px', display:'inline-block', padding:'6px 10px', background:'#334155', borderRadius:8, fontSize:'13px'}}>{level}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// helpers
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
  const h = 44
  const font = '600 28px Inter, system-ui, Arial'
  const w = measureTextWidth(text, font) + padX * 2
  ctx.fillStyle = '#065f46'
  ctx.fillRect(x, y, w, h)
  ctx.fillStyle = '#fff'
  ctx.font = font
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x + padX, y + h / 2)
}

function measureTextWidth(text, font) {
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')
  ctx.font = font
  return ctx.measureText(text).width
}

const DEFAULT_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 24 24' fill='none'>
    <rect width='24' height='24' rx='4' fill='%232b2f3a'/>
    <g transform='translate(4,4) scale(0.8)'>
      <circle cx='8' cy='7' r='3' fill='%2399a3b2'/>
      <rect x='2' y='13' width='12' height='5' rx='2' fill='%2399a3b2'/>
    </g>
  </svg>`
)}`
