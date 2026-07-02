"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Can3D = dynamic(() => import("@/components/can-3d"), { ssr: false });

const NAV_LINKS = ["Home", "Shop", "About", "Gallery", "Contact"];

const CANS = [
  { name: "NiTRO ENG", price: "10.58 $", img: "/Nitro-eng-can.png", h: "62%" },
  { name: "NiTRO RED", price: "11.00 $", img: "/Nitro-red-can.png", h: "72%" },
  { name: "NiTRO GREEN", price: "12.00 $", img: null, h: "100%" },
  { name: "NiTRO SKY", price: "11.00 $", img: "/Nitro-sky-can.png", h: "72%" },
  { name: "NiTRO BLUE", price: "10.58 $", img: "/Nitro-blue-can.png", h: "62%" },
];

function SocialIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-11 h-11 border-2 border-neon rounded-full flex items-center justify-center text-neon hover:bg-neon hover:text-black transition-colors"
    >
      {children}
    </a>
  );
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);

  useGSAP(
    () => {
      if (!container.current) return;

      const trigger = ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      return () => trigger.kill();
    },
    { scope: container }
  );

  return (
    <main
      ref={container}
      className="text-white min-h-[300vh] overflow-x-hidden font-sans relative"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, #1c1c1c 0%, #0a0a0a 70%)",
      }}
    >
      {/* Animated Fixed 3D Can */}
      <Can3D progress={progressRef} />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-4">
        <a
          href="#"
          className="font-display italic font-black text-2xl text-neon tracking-tight"
        >
          N<span className="lowercase">i</span>TRO
        </a>
        <div className="hidden md:flex items-center gap-24 text-[15px] font-light text-white/90">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="hover:text-neon transition-colors">
              {link}
            </a>
          ))}
        </div>
        <button className="bg-neon text-black px-8 py-3 text-[15px] font-normal rounded-sm hover:brightness-110 transition-all">
          Buy Now
        </button>
      </nav>

      {/* SECTION 1: Hero - Giant NITRO Text */}
      <section className="relative w-full h-screen flex flex-col justify-between overflow-hidden pt-24 pb-10 px-12">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <h1
            className="font-display italic font-black text-neon leading-none whitespace-nowrap tracking-tighter"
            style={{ fontSize: "26vw" }}
          >
            N<span className="lowercase">i</span>TRO
          </h1>
        </div>

        <div className="flex-1" />

        <div className="relative z-40 grid grid-cols-1 md:grid-cols-3 items-end gap-8 w-full">
          <p className="text-sm max-w-md text-white/85 uppercase leading-relaxed text-pretty">
            Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac.
          </p>

          <div className="flex justify-center gap-5">
            <button className="bg-white text-black px-9 py-3 text-[15px] rounded-sm hover:bg-neon transition-colors">
              Buy Now
            </button>
            <button className="border border-white/70 text-white px-9 py-3 text-[15px] rounded-sm hover:bg-white hover:text-black transition-colors">
              More info
            </button>
          </div>

          <div className="flex justify-end gap-5">
            <SocialIcon label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.7-1.6h1.5V3.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.5H7.5V13h2.8v8h3.2z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon label="X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.6 2H8l4.4 5.8L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.5 8.8H3.6V21h2.9V8.8zM5 7.4a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4zM21 14.3c0-3.3-1.8-5.7-4.7-5.7-1.6 0-2.6.8-3.1 1.7h-.1V8.8H10V21h2.9v-6c0-1.6.5-2.8 2.1-2.8s2 1.4 2 2.9V21H21v-6.7z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </section>

      {/* SECTION 2: Football Player + SINCE 2002 */}
      <section className="relative w-full h-screen overflow-hidden pt-20">
        <div className="absolute top-24 bottom-6 left-16 w-[46%] rounded-3xl overflow-hidden">
          <Image
            src="/second-section-image.png"
            alt="Football player dribbling a ball"
            fill
            className="object-cover grayscale"
          />
        </div>

        <div
          className="relative h-full flex flex-col items-end justify-center px-14"
          style={{ zIndex: 40 }}
        >
          <div
            className="font-display italic font-black leading-[0.92] text-right uppercase text-neon tracking-tight"
            style={{ fontSize: "9.5vw" }}
          >
            <div>SINCE</div>
            <div>2002</div>
            <div>PROD</div>
            <div>UCING</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Five Cans Lineup */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden px-16 pt-20">
        <div className="flex justify-between items-end w-full max-w-[1700px] mx-auto h-[72vh] gap-6">
          {CANS.map((can) => (
            <div
              key={can.name}
              className="flex flex-col items-center justify-end flex-1 h-full"
            >
              <div className="relative w-full mb-5" style={{ height: can.h }}>
                {can.img ? (
                  <Image
                    src={can.img}
                    alt={`${can.name} energy drink can`}
                    fill
                    className="object-contain object-bottom"
                  />
                ) : (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 rounded-[50%] bg-neon/50 blur-lg"
                    aria-hidden="true"
                  />
                )}
              </div>
              <h3
                className={`font-display italic font-black text-xl uppercase tracking-wide ${
                  can.img ? "text-white" : "text-white"
                }`}
              >
                {can.name}
              </h3>
              <p className="text-muted text-sm font-light mt-1">High intensity</p>
              <p className="font-semibold text-2xl mt-2">{can.price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
