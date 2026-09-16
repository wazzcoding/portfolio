export default function StackMarquee({ title, items, direction = 'left', reduceMotion = false, speed = 22 }) {
  const loop = [...items, ...items, ...items, ...items]
  if (reduceMotion) {
    return (
      <div className="stack-row">
        {title && <p className="stack-label">{title}</p>}
        <div className="stack-marquee is-static">
          <div className="stack-track is-static">
            {items.map((item) => (
              <span className="stack-pill" key={item.id}>
                <img src={item.icon} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                <small>{item.label}</small>
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="stack-row">
      {title && <p className="stack-label">{title}</p>}
      <div className="stack-marquee">
        <div className="stack-track" data-direction={direction} aria-hidden="true" style={{ animationDuration: `${speed}s` }}>
          {loop.map((item, idx) => (
            <span className="stack-pill" key={`${item.id}-${idx}`}>
              <img src={item.icon} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              <small>{item.label}</small>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
