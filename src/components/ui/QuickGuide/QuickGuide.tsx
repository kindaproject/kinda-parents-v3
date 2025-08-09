interface InfoItem { heading: string; text: string }

interface QuickGuideProps {
  title: string
  items: InfoItem[]
  className?: string
  style?: any
}

export const QuickGuide: React.FC<QuickGuideProps> = ({ title, items, className, style }) => (
  <div className={"card" + "  " + className} style={style}>
    <div className="card-body p-4">
      <h3 className="fs-3 text-gray-800 fw-bold mb-4">{title}</h3>
      {items.map((it, i) => (
        <div key={i}>
          <div className="fw-bold mt-5">{it.heading}</div>
          <div className="text-gray-600" style={{ whiteSpace: 'pre-line' }}>{it.text}</div>
        </div>
      ))}
    </div>
  </div>
)
