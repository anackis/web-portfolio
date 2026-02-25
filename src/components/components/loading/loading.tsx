const BOX_INDICES = [0, 1, 2, 3, 4, 5, 6, 7] as const

export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-screen__loading">
        {BOX_INDICES.map((boxIndex) => (
          <div
            key={boxIndex}
            className="loading-screen__box"
            style={{ "--box-index": boxIndex } as React.CSSProperties}
          >
            <div className="loading-screen__box-inner" />
          </div>
        ))}

        <div className="loading-screen__ground">
          <div className="loading-screen__ground-surface" />
        </div>
      </div>
    </div>
  )
}
