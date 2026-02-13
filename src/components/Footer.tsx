export default function Footer() {
  return (
    <footer className="text-center py-6 text-sm font-body text-[#f4f4f4]/80">
      <p className="mb-3 uppercase tracking-[0.24em] text-[#f4f4f4]/70">
        AN AI curious experiment.
      </p>
      <p>
        Built with curiosity by{' '}
        <a
          href="https://queenbee.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f4f4f4] hover:text-white transition-colors"
        >
          Queen Bee
        </a>
      </p>
    </footer>
  );
}
