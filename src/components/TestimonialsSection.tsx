"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "chingchong",
    role: "Professional Trader",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4",
    content: "The one on one mentorship and advanced trading insights have significantly improved my trading performance."
  },
  {
    name: "Sam",
    role: "Certified Professional Accountant",
    image: "https://avatars.githubusercontent.com/u/2345678?v=4",
    content: "GridZer0's institutional-grade tools have transformed our trading strategy. The AI integration has saved me thousands of hours."
  },
  {
    name: "dave",
    role: "Early Crypto Investor",
    image: "https://avatars.githubusercontent.com/u/3456789?v=4",
    content: "The customer support is exceptional, and the platform's cutting edge education made getting started with crypto trading seamless. A game-changer for both beginners and pros."
  },
  {
    name: "radix404",
    role: "Web3 Developer",
    image: "https://avatars.githubusercontent.com/u/4567890?v=4",
    content: "I have seen remarkable improvement in my win rate since joining GridZer0. The AI technical analyst and hedge fund are particularly impressive."
  },
  {
    name: "carpenter",
    role: "woodworker",
    image: "https://avatars.githubusercontent.com/u/5678901?v=4",
    content: "The regular updates keep us at the forefront of emerging strategies and information. It's exactly what the crypto community needed."
  },
  {
    name: "Lisa Thompson",
    role: "Dentist and Crypto Enthusiast",
    image: "https://avatars.githubusercontent.com/u/6789012?v=4",
    content: "The platform's ability to teach me complex trading strategies while maintaining simplicity is remarkable. It's been invaluable for my portfolio management."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 overflow-hidden bg-black">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-normal mb-4">Trusted by Traders</h2>
          <p className="text-muted-foreground text-lg">
            Join a community of experienced traders at Grid Zer0
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-1`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-2`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;