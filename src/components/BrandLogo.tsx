type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

/** Official JC Lounge gold artwork, supplied with transparent alpha. */
export default function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  return (
    <img
      src="/images/jc-lounge-gold-official.png"
      alt="JC Lounge"
      width={1208}
      height={1302}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
