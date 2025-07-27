import { motion } from "framer-motion";

const LogoCarousel = () => {
  const logos = [
    "/dextools.svg",
    "/discord-icon.svg",
    "/tradingview-seeklogo.svg",
    "/groq.png",
    "/ollama.png",
  ];

  // Create enough logo copies to fill wide screens seamlessly
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden bg-background/50 backdrop-blur-sm py-12 mt-20">
      <div className="flex animate-scroll">
        {duplicatedLogos.map((logo, index) => (
          <motion.img
            key={`logo-${index}`}
            src={logo}
            alt={`Partner logo ${(index % logos.length) + 1}`}
            className="h-8 flex-shrink-0 mx-4 md:mx-12 lg:mx-16 bg-transparent rounded grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
            style={{ color: '#fff' }}
            initial={{ opacity: 0.5 }}
            whileHover={{ 
              opacity: 1,
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;