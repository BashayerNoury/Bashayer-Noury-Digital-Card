const SmokeBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="smoke-blob smoke-blob-1" />
      <div className="smoke-blob smoke-blob-2" />
      <div className="smoke-blob smoke-blob-3" />
    </div>
  );
};

export default SmokeBackground;
