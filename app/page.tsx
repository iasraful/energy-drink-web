"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!canRef.current || !container.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Initial state (Section 1)
    gsap.set(canRef.current, {
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      rotation: 0, // In CSS, 0 means it keeps its original orientation (which is horizontal for Can-label-90deg.png)
      scale: 1,
    });

    // Section 1 -> Section 2
    tl.to(canRef.current, {
      top: "150%", // Move down one viewport height
      left: "70%", // Move slightly right to sit under "SINCE 2002 PRODUCING"
      rotation: 0,
      scale: 1.2,
      ease: "power2.inOut",
    }, 0);

    // Section 2 -> Section 3
    tl.to(canRef.current, {
      top: "250%", // Move down another viewport height
      left: "50%", // Move back to center
      rotation: -90, // Rotate to make it vertical (0 degree in reality)
      scale: 0.8, // Match the scale of the other cans
      ease: "power2.inOut",
    }, 0.5);

  }, { scope: container });

  return (
    <main ref={container} className="bg-black text-white min-h-[300vh] overflow-x-hidden font-sans relative">

      {/* Animated Fixed Can */}
      <img
        ref={canRef}
        src="/Can-label-90deg.png"
        alt="Nitro Can"
        className="fixed z-30 pointer-events-none drop-shadow-[0_20px_50px_rgba(214,255,0,0.3)] w-[600px] md:w-[800px]"
        style={{ transformOrigin: "center center" }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-6 mix-blend-difference">
        <div className="font-syncopate font-bold text-2xl text-[var(--color-neon)]">NITRO</div>
        <div className="hidden md:flex space-x-12 text-sm font-medium">
          <a href="#" className="hover:text-[var(--color-neon)] transition-colors">Home</a>
          <a href="#" className="hover:text-[var(--color-neon)] transition-colors">Shop</a>
          <a href="#" className="hover:text-[var(--color-neon)] transition-colors">About</a>
          <a href="#" className="hover:text-[var(--color-neon)] transition-colors">Gallery</a>
          <a href="#" className="hover:text-[var(--color-neon)] transition-colors">Contact</a>
        </div>
        <button className="bg-[var(--color-neon)] text-black px-6 py-2 font-bold hover:scale-105 transition-transform">
          Buy Now
        </button>
      </nav>

      {/* SECTION 1: Giant NITRO Text */}
      <section className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-black py-12 px-12 z-10">
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
          <h1 className="font-sakana font-bold text-[var(--color-neon)] opacity-90 leading-none" style={{ fontSize: "28vw", letterSpacing: "-3%", transform: "scaleY(1.2)" }}>
            NITRO
          </h1>
        </div>

        <div className="flex-1"></div>

        <div className="relative z-10 flex items-end justify-between w-full">
          <p className="text-xs max-w-xs text-gray-300">
            WOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. NUNC VULPUTATE LIBERO ET VELIT INTERDUM, AC.
          </p>

          <div className="flex space-x-4">
            <button className="bg-white text-black px-8 py-3 font-semibold hover:bg-[var(--color-neon)] transition-colors">
              Buy Now
            </button>
            <button className="border border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-black transition-colors">
              More info
            </button>
          </div>

          <div className="flex space-x-4">
            {['f', 'ig', 'x', 'in'].map((social) => (
              <div key={social} className="w-10 h-10 border border-[var(--color-neon)] rounded-full flex items-center justify-center text-[var(--color-neon)] hover:bg-[var(--color-neon)] hover:text-black cursor-pointer transition-colors uppercase font-bold text-sm">
                {social}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Football Player */}
      <section className="relative w-full h-screen flex items-center overflow-hidden z-20">
        <div className="absolute top-0 left-0 w-[60%] h-[90%] z-0 opacity-50 bg-gradient-to-r from-black via-transparent to-black rounded-3xl overflow-hidden mx-8 my-8 mt-16">
          <Image
            src="/second-section-image.png"
            alt="Football Player"
            fill
            className="object-cover mix-blend-luminosity opacity-80"
          />
        </div>

        <div className="relative z-10 w-full flex justify-end px-12 pt-32">
          <div className="font-syncopate font-bold leading-[0.8] text-right flex flex-col items-end uppercase text-[var(--color-neon)]" style={{ fontSize: "10vw" }}>
            <div className="transform -skew-x-[15deg]">SINCE</div>
            <div className="transform -skew-x-[15deg] mb-12">2002</div>
            <div className="transform -skew-x-[15deg]">PROD</div>
            <div className="transform -skew-x-[15deg]">UCING</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Five Cans */}
      <section className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden px-12 z-10">
        <div className="flex justify-between items-end w-full max-w-7xl mx-auto h-[60vh] gap-4">

          <div className="flex flex-col items-center flex-1 h-[70%]">
            <div className="relative w-full h-full mb-4">
              <Image src="/Nitro-eng-can.png" alt="Nitro Eng" fill className="object-contain" />
            </div>
            <h3 className="font-syncopate font-bold text-lg uppercase italic">NITRO ENG</h3>
            <p className="text-gray-400 text-sm">High intensity</p>
            <p className="font-bold text-xl mt-1">10.58 $</p>
          </div>

          <div className="flex flex-col items-center flex-1 h-[85%]">
            <div className="relative w-full h-full mb-4">
              <Image src="/Nitro-red-can.png" alt="Nitro Red" fill className="object-contain" />
            </div>
            <h3 className="font-syncopate font-bold text-lg uppercase italic">NITRO RED</h3>
            <p className="text-gray-400 text-sm">High intensity</p>
            <p className="font-bold text-xl mt-1">11.00 $</p>
          </div>

          {/* Center Can Placeholder (Animated can will rest here) */}
          <div className="flex flex-col items-center flex-1 h-full pt-10">
            <div className="relative w-full h-full mb-4"></div>
            <h3 className="font-syncopate font-bold text-xl uppercase italic text-[var(--color-neon)] drop-shadow-[0_0_10px_rgba(214,255,0,0.8)]">NITRO GREEN</h3>
            <p className="text-gray-400 text-sm">High intensity</p>
            <p className="font-bold text-xl mt-1">12.00 $</p>
          </div>

          <div className="flex flex-col items-center flex-1 h-[85%]">
            <div className="relative w-full h-full mb-4">
              <Image src="/Nitro-sky-can.png" alt="Nitro Sky" fill className="object-contain" />
            </div>
            <h3 className="font-syncopate font-bold text-lg uppercase italic">NITRO SKY</h3>
            <p className="text-gray-400 text-sm">High intensity</p>
            <p className="font-bold text-xl mt-1">11.00 $</p>
          </div>

          <div className="flex flex-col items-center flex-1 h-[70%]">
            <div className="relative w-full h-full mb-4">
              <Image src="/Nitro-blue-can.png" alt="Nitro Blue" fill className="object-contain" />
            </div>
            <h3 className="font-syncopate font-bold text-lg uppercase italic">NITRO BLUE</h3>
            <p className="text-gray-400 text-sm">High intensity</p>
            <p className="font-bold text-xl mt-1">10.58 $</p>
          </div>

        </div>
      </section>

    </main>
  );
}
