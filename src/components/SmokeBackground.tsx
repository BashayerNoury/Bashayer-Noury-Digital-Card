const SmokeBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main flowing smoke stream - the curved wisp */}
      <div className="smoke-stream" />
      <div className="smoke-stream-2" />
      {/* Large ambient blobs */}
      <div className="smoke-blob smoke-blob-1" />
      <div className="smoke-blob smoke-blob-2" />
      <div className="smoke-blob smoke-blob-3" />
      <div className="smoke-blob smoke-blob-4" />
      {/* Bright highlight wisps */}
      <div className="smoke-wisp smoke-wisp-1" />
      <div className="smoke-wisp smoke-wisp-2" />
    </div>
  );
};

export default SmokeBackground;
