interface ImageProps {
  src?: string
  alt: string
  className?: string
  height?: string | number
  width?: string | number
  placeholder?: string
  cover?: boolean
}

export function Image({ 
  src, 
  alt, 
  className = '', 
  height = '250px', 
  width = '100%',
  placeholder = '[Image]',
  cover = false
}: ImageProps) {
  return (
    <div 
      className={`image-container ${className}`}
      style={{ 
        height, 
        width
      }}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="image"
          style={{
            objectFit: cover ? 'cover' : 'contain'
          }}
        />
      ) : (
        <div className="image-placeholder">{placeholder}</div>
      )}
    </div>
  )
}