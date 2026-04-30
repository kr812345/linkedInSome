import SunBackground from "./SunBackground";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  withSun?: boolean;
}

export default function Section({ children, className = "", withSun = false }: SectionProps) {
  return (
    <div className={`relative w-full min-h-screen py-25 px-10 flex justify-center items-center overflow-x-hidden ${className}`}>
      {withSun && <SunBackground />}
      <div className="relative z-10 w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}