import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/landing/ui/button";
import { CardSpotlight } from "./CardSpotlight";

const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular,
  buttonText,
  buttonLink,
  billingPeriod,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonLink: string;
  billingPeriod?: string;
}) => (
  <CardSpotlight className={`h-full ${isPopular ? "border-primary" : "border-white/10"} border-2`}>
    <div className="relative h-full p-6 flex flex-col">
      {isPopular && (
        <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-medium mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Custom" && billingPeriod && <span className="text-gray-400">/{billingPeriod}</span>}
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        className="button-gradient w-full" 
        onClick={() => window.open(buttonLink, '_blank')}
      >
        {buttonText}
      </Button>
    </div>
  </CardSpotlight>
);

export const PricingSection = () => {
  return (
    <section className="container px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          Choose Your{" "}
          <span className="text-gradient font-medium">Trading Plan</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Select the perfect trading plan with advanced features and competitive fees
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingTier
          name="Beginner"
          price="$0"
          description="Perfect for beginners starting their crypto journey"
          features={[
            "Voice channel Access",
            "General chat support",
            "Basic trading tools",
          ]}
          buttonText="Join Discord"
          buttonLink="https://discord.gg/DKf2mnUDMp"
          billingPeriod="month"
        />
        <PricingTier
          name="Professional"
          price="$110"
          description="Advanced features for serious traders"
          features={[
            "Top tier trading insights",
            "Educational resources",
            "Advanced technical analysis",
            "AI trading signals",
          ]}
          isPopular
          buttonText="Subscribe Now"
          buttonLink="https://www.launchpass.com/gz/gridzero"
          billingPeriod="month"
        />
        <PricingTier
          name="Professional Plus"
          price="$1200"
          description="One on one mentorship and custom AI tools"
          features={[
            "Custom trading solutions",
            "Priority access to AI tools",
            "Copy trading features",
            "Mentorship from experts in AI and trading",
            "Priority support"
          ]}
          buttonText="Subscribe Now"
          buttonLink="https://www.launchpass.com/gz/gridzero"
          billingPeriod="year"
        />
      </div>
    </section>
  );
};