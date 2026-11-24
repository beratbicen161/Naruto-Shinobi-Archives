function LoadingScreen({
  title = 'Searching the Shinobi Archives',
  description = 'Gathering classified ninja records...',
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[350px] items-center justify-center px-4 py-10"
    >
      <div className="konoha-loading-panel">

        <div className="konoha-loading-header">
          <span>HIDDEN LEAF INTELLIGENCE</span>

          <span className="konoha-loading-online">
            <span className="konoha-status-dot" />
            ACTIVE
          </span>
        </div>

        <div className="konoha-loading-visual">
          <div className="konoha-loading-grid" />

          <div className="konoha-loading-ring" />

          <img
            src={`${import.meta.env.BASE_URL}images/konoha-logo.png`}
            alt=""
            className="konoha-loading-logo"
          />

          <div className="konoha-loading-scan" />
        </div>

        <div className="konoha-loading-terminal">
          <p>
            <span>[SYS]</span> Intelligence system initialized
          </p>

          <p>
            <span>[REQ]</span> Requesting archive access
          </p>

          <p className="konoha-loading-message">
            <span>[...]</span> {description}
          </p>
        </div>

        <div className="konoha-loading-progress">
          <div className="konoha-loading-progress-bar" />
        </div>

        <div className="konoha-loading-footer">
          <span>{title}</span>
          <span className="konoha-loading-classified">
            CLASSIFIED
          </span>
        </div>

      </div>
    </div>
  )
}

export default LoadingScreen