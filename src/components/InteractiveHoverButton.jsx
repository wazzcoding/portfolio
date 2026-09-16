export default function InteractiveHoverButton({ as: Tag = 'button', text, wide = false, className = '', ...props }) {
  return <Tag className={`interactive-hover-button${wide ? ' is-wide' : ''} ${className}`.trim()} {...props}>
    <span className="ihb-text"><span>{text}</span><span aria-hidden="true">{text}</span></span>
    <span className="ihb-arrow" aria-hidden="true">↗</span>
  </Tag>
}
