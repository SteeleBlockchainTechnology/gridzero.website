import { motion } from "framer-motion";
import { ArrowRight, Command } from "lucide-react";
import { Button } from "@/components/landing/ui/button";
import Navigation from "@/components/landing/Navigation";
import { FeaturesSection } from "@/components/landing/features/FeaturesSection";
import { PricingSection } from "@/components/landing/pricing/PricingSection";
import LogoCarousel from "@/components/landing/LogoCarousel";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/landing/Footer";
import { TextGenerateEffect } from "@/components/landing/ui/text-generate-effect";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container px-4 pt-40 pb-20"
      >
        {/* Background */}
        <div 
          className="absolute inset-0 -z-10 bg-[#0A0A0A]"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full glass"
        >
          <span className="text-sm font-medium">
            <Command className="w-4 h-4 inline-block mr-2" />
            Next-gen trading hub
          </span>
        </motion.div>
        
        <div className="max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-normal mb-4 tracking-tight text-left">
            <span className="text-gray-200">
              <TextGenerateEffect words="Master the Markets with" />
            </span>
            <br />
            <span className="text-white font-medium">
              <TextGenerateEffect words="AI tools & Strategies" />
            </span>
          </h1>
          
            <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl text-left"
            >
            Unlock your trading potential with expert education, actionable insights, and cutting-edge AI tools designed to help you enhance your trades.{" "}
            <span className="text-white">Learn, strategize, and trade smarter.</span>
            </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Button
              size="lg"
              className="button-gradient"
              asChild
            >
              <a
                href="https://discord.gg/DKf2mnUDMp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Trading Now
              </a>
            </Button>
            <Button size="lg" variant="link" className="text-white">
              <a
                href="https://coinmarketcap.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                View Markets <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative mx-auto max-w-5xl mt-20"
        >
          <div className="glass rounded-xl overflow-hidden">
            <img
              src="/lovable-uploads/c32c6788-5e4a-4fee-afee-604b03113c7f.png"
              alt="CryptoTrade Dashboard"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
        */}
      </motion.section>

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Features Section */}
      <div id="features" className="bg-black">
        <FeaturesSection />
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-black">
        <PricingSection />
      </div>

      {/* Testimonials Section */}
      <div className="bg-black">
        <TestimonialsSection />
      </div>

      {/* CTA Section */}
      <section className="container px-4 py-20 relative bg-black">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start trading?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of traders who have already discovered the power of our platform.
          </p>
            <Button size="lg" className="button-gradient" asChild>
            <a
              href="https://discord.gg/DKf2mnUDMp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Master the Markets
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default Index;