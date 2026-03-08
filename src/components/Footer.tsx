const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 py-3 text-center pointer-events-none">
      <p className="text-muted-foreground/50 text-xs">
        Made with <span className="text-muted-foreground/70">♥</span> In{" "}
        <a
          href="https://lovable.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-muted-foreground transition-colors pointer-events-auto"
        >
          Lovable
        </a>
      </p>
    </footer>
  );
};

export default Footer;