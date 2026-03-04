"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

// ─── Animation wrapper ────────────────────────────────────────────
function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────
function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-dark text-white px-6 py-3 rounded-lg font-body text-sm shadow-lg"
    >
      {message}
    </motion.div>
  );
}

// ─── Email Modal ──────────────────────────────────────────────────
function EmailModal({ onClose }: { onClose: (msg?: string) => void }) {
  const [email, setEmail] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-cream rounded-2xl p-8 mx-4 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onClose()}
          className="absolute top-4 right-4 text-muted hover:text-dark transition-colors text-xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="font-heading text-2xl mb-2">Join the waitlist</h3>
        <p className="text-muted text-sm mb-6">
          We&apos;re opening doors soon. Drop your email and be the first to
          know.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) onClose("You're on the list! We'll be in touch soon.");
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-lg border border-muted-light/40 bg-white text-dark placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent/40 font-body text-sm"
          />
          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded-lg font-body font-medium text-sm hover:bg-accent-hover transition-colors"
          >
            Notify me
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function Home() {
  const [toast, setToast] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCTA = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback((msg?: string) => {
    setShowModal(false);
    if (msg) setToast(msg);
  }, []);

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-cream/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <a
            href="#"
            className="font-heading text-lg md:text-xl tracking-wide text-dark"
          >
            CASIAH WEST
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-body text-muted">
            <a href="#about" className="hover:text-dark transition-colors">
              About
            </a>
            <a href="#community" className="hover:text-dark transition-colors">
              Community
            </a>
            <a href="#podcast" className="hover:text-dark transition-colors">
              Podcast
            </a>
            <a href="#coaching" className="hover:text-dark transition-colors">
              Coaching
            </a>
            <button
              onClick={handleCTA}
              className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              Join The Girls
            </button>
          </div>
          <button
            onClick={handleCTA}
            className="md:hidden bg-accent text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Join
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end md:items-center">
        <Image
          src="/images/casiah-5.jpg"
          alt="Casiah West"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-0 pt-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              The advice no one else is gonna give you
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-body mb-8 max-w-md leading-relaxed">
              Relationship counselor, podcast host, and the friend who tells you
              what you need to hear.
            </p>
            <button
              onClick={handleCTA}
              className="bg-accent text-white px-8 py-4 rounded-lg font-body font-medium text-base hover:bg-accent-hover transition-colors"
            >
              Join For The Girls &mdash; $14/mo
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── PROOF BAR ───────────────────────────────────────── */}
      <section className="bg-dark text-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap justify-between items-center gap-6 text-center">
            {[
              ["484K+", "TikTok Followers"],
              ["234K+", "Instagram Followers"],
              ["25M+", "Likes"],
              ["10+", "Years Experience"],
            ].map(([num, label]) => (
              <div key={label} className="flex-1 min-w-[140px]">
                <div className="font-heading text-2xl md:text-3xl mb-1">
                  {num}
                </div>
                <div className="text-white/60 text-xs md:text-sm font-body uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ───────────────────────────────────────── */}
      <section id="community" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <FadeIn>
              <div className="relative aspect-[3/4] w-full max-w-lg">
                <Image
                  src="/images/casiah-4.jpg"
                  alt="Casiah West"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-2xl"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <p className="text-accent font-body text-sm font-medium uppercase tracking-widest mb-4">
                  Membership
                </p>
                <h2 className="font-heading text-3xl md:text-5xl leading-tight mb-6">
                  For The Girls
                </h2>
                <p className="text-muted font-body text-base md:text-lg leading-relaxed mb-8">
                  This isn&apos;t a course. It&apos;s not a masterclass.
                  It&apos;s the group chat you&apos;ve been looking for &mdash;
                  real conversations, real advice, and a community of women who
                  actually get it.
                </p>
                <ul className="space-y-4 mb-10 font-body text-base text-dark">
                  {[
                    "Private community access",
                    "Monthly live Q&A with Casiah",
                    '4 exclusive "How To" guides included free',
                    "Weekly voice notes & short videos",
                    "Submit anonymous questions for the podcast",
                    "Early access to podcast episodes",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-accent mt-1 text-lg leading-none">
                        &#10003;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleCTA}
                    className="bg-accent text-white px-8 py-4 rounded-lg font-body font-medium text-base hover:bg-accent-hover transition-colors"
                  >
                    $14/month
                  </button>
                  <button
                    onClick={handleCTA}
                    className="border-2 border-dark text-dark px-8 py-4 rounded-lg font-body font-medium text-base hover:bg-dark hover:text-white transition-colors"
                  >
                    $99/year — save $69
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── HOW TO GUIDES ───────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-accent font-body text-sm font-medium uppercase tracking-widest mb-4">
              Included free with membership
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-white leading-tight mb-4 max-w-2xl">
              The guides everyone&apos;s been asking for
            </h2>
            <p className="text-white/60 font-body text-base md:text-lg mb-14 max-w-xl">
              Four exclusive &ldquo;How To&rdquo; guides, written by Casiah,
              covering the topics you actually care about.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "How To Make Someone Obsessed With You",
                desc: "The real psychology behind attraction — no games, no manipulation.",
                num: "01",
              },
              {
                title: "How To Get Out of a Toxic Relationship",
                desc: "A step-by-step guide for when you know you deserve better.",
                num: "02",
              },
              {
                title: "How To Be Happy By Yourself",
                desc: "Building a life so good you don't need someone to complete it.",
                num: "03",
              },
              {
                title: "How To Get Over Being Cheated On",
                desc: "Healing, rebuilding trust, and coming back stronger.",
                num: "04",
              },
            ].map((guide, i) => (
              <FadeIn key={guide.num} delay={i * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 hover:bg-white/10 transition-colors">
                  <span className="text-accent font-heading text-5xl md:text-6xl opacity-40 block mb-4">
                    {guide.num}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl text-white mb-3 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-white/50 font-body text-sm leading-relaxed">
                    {guide.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section id="about" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <FadeIn>
              <div className="relative aspect-[3/4] w-full max-w-lg">
                <Image
                  src="/images/casiah-7.jpg"
                  alt="Casiah West — portrait"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-2xl"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <p className="text-accent font-body text-sm font-medium uppercase tracking-widest mb-4">
                  Meet Casiah
                </p>
                <h2 className="font-heading text-3xl md:text-5xl leading-tight mb-6">
                  The friend who tells you what you need to hear
                </h2>
                <div className="space-y-4 text-muted font-body text-base md:text-lg leading-relaxed mb-8">
                  <p>
                    I started sharing advice on TikTok because I was tired of
                    watching people get the same recycled garbage from people
                    who&apos;ve never been in a real relationship.
                  </p>
                  <p>
                    I&apos;m a Registered Dietitian, Licensed Health
                    Professional, Certified Health Coach, and Relationship
                    Counselor. I wrote <em>The Mind-Body Diet</em>. I co-host
                    the <em>New Society Podcast</em> with Devean Chase.
                  </p>
                  <p>
                    But honestly? The thing that qualifies me most is that
                    I&apos;ve actually lived through it. All of it.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Registered Dietitian",
                    "Licensed Health Professional",
                    "Certified Health Coach",
                    "Relationship Counselor",
                    "Author",
                  ].map((cred) => (
                    <span
                      key={cred}
                      className="bg-dark/5 text-dark/80 px-4 py-2 rounded-full font-body text-xs uppercase tracking-wider"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PODCAST ─────────────────────────────────────────── */}
      <section id="podcast" className="py-20 md:py-28 bg-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <FadeIn>
              <div>
                <p className="text-accent font-body text-sm font-medium uppercase tracking-widest mb-4">
                  Listen now
                </p>
                <h2 className="font-heading text-3xl md:text-5xl text-white leading-tight mb-6">
                  New Society Podcast
                </h2>
                <p className="text-white/60 font-body text-base md:text-lg leading-relaxed mb-4">
                  Co-hosted with Devean Chase. Real conversations about
                  relationships, self-improvement, and everything nobody wants
                  to say out loud.
                </p>
                <p className="text-white/40 font-body text-sm mb-10">
                  New episodes weekly on all platforms.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://open.spotify.com/show/4YkEjWAFTDxposnMrTdHBj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-dark px-6 py-3 rounded-lg font-body font-medium text-sm hover:bg-white/90 transition-colors"
                  >
                    Spotify
                  </a>
                  <a
                    href="https://podcasts.apple.com/us/podcast/new-society-podcast/id1548498943"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/20 text-white px-6 py-3 rounded-lg font-body font-medium text-sm hover:bg-white/10 transition-colors"
                  >
                    Apple Podcasts
                  </a>
                  <a
                    href="https://www.youtube.com/@casiahwest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/20 text-white px-6 py-3 rounded-lg font-body font-medium text-sm hover:bg-white/10 transition-colors"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative aspect-square w-full max-w-md mx-auto md:ml-auto">
                <Image
                  src="/images/casiah-8.jpg"
                  alt="New Society Podcast"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover rounded-2xl"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── COACHING ────────────────────────────────────────── */}
      <section id="coaching" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="text-accent font-body text-sm font-medium uppercase tracking-widest mb-4">
                1:1 Sessions
              </p>
              <h2 className="font-heading text-3xl md:text-5xl leading-tight mb-6">
                For when you need more than a group chat
              </h2>
              <p className="text-muted font-body text-base md:text-lg leading-relaxed mb-4">
                Personalized coaching sessions covering relationship counseling,
                personal development, and health coaching. One hour, just you
                and Casiah, focused on your situation.
              </p>
              <p className="font-heading text-4xl md:text-5xl text-dark mb-8">
                $199
                <span className="text-muted text-lg md:text-xl font-body">
                  {" "}
                  / session
                </span>
              </p>
              <button
                onClick={handleCTA}
                className="bg-accent text-white px-8 py-4 rounded-lg font-body font-medium text-base hover:bg-accent-hover transition-colors"
              >
                Book a session
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── BOOK ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-dark/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="text-accent font-body text-sm font-medium uppercase tracking-widest mb-3">
                  The book
                </p>
                <h2 className="font-heading text-3xl md:text-4xl leading-tight mb-3">
                  The Mind-Body Diet
                </h2>
                <p className="text-muted font-body text-base md:text-lg max-w-lg">
                  Casiah&apos;s guide to the connection between what you eat,
                  how you feel, and who you become. Available now on Amazon.
                </p>
              </div>
              <a
                href="https://www.amazon.com/dp/B09HJLRQBF"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark text-white px-8 py-4 rounded-lg font-body font-medium text-base hover:bg-dark/80 transition-colors whitespace-nowrap self-start"
              >
                Get the book
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="relative py-32 md:py-44">
        <Image
          src="/images/casiah-6.jpg"
          alt="Casiah West"
          fill
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl text-white leading-tight mb-6 max-w-3xl mx-auto">
              Ready to join the conversation?
            </h2>
            <p className="text-white/70 font-body text-base md:text-lg mb-10 max-w-md mx-auto">
              Real advice, real community, real results. For The Girls is
              waiting for you.
            </p>
            <button
              onClick={handleCTA}
              className="bg-accent text-white px-10 py-4 rounded-lg font-body font-medium text-base md:text-lg hover:bg-accent-hover transition-colors"
            >
              Join For The Girls &mdash; $14/mo
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-dark text-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 mb-12">
            <div>
              <span className="font-heading text-xl tracking-wide block mb-4">
                CASIAH WEST
              </span>
              <p className="text-white/50 font-body text-sm leading-relaxed">
                Relationship counselor, podcast host, R.D., and the advice no
                one else is gonna give you.
              </p>
            </div>
            <div>
              <span className="font-body text-xs uppercase tracking-widest text-white/40 block mb-4">
                Links
              </span>
              <ul className="space-y-2 font-body text-sm text-white/60">
                <li>
                  <a
                    href="#community"
                    className="hover:text-white transition-colors"
                  >
                    For The Girls
                  </a>
                </li>
                <li>
                  <a
                    href="#podcast"
                    className="hover:text-white transition-colors"
                  >
                    Podcast
                  </a>
                </li>
                <li>
                  <a
                    href="#coaching"
                    className="hover:text-white transition-colors"
                  >
                    1:1 Coaching
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.amazon.com/dp/B09HJLRQBF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    The Mind-Body Diet
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <span className="font-body text-xs uppercase tracking-widest text-white/40 block mb-4">
                Connect
              </span>
              <ul className="space-y-2 font-body text-sm text-white/60">
                <li>
                  <a
                    href="https://www.tiktok.com/@casiahwest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/casiahwest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@casiahwest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:casiahwest@globaltlnt.com"
                    className="hover:text-white transition-colors"
                  >
                    casiahwest@globaltlnt.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 font-body text-xs">
              &copy; {new Date().getFullYear()} Casiah West. All rights
              reserved.
            </p>
            <p className="text-white/30 font-body text-xs">
              Management:{" "}
              <a
                href="mailto:casiahwest@globaltlnt.com"
                className="hover:text-white/50 transition-colors"
              >
                casiahwest@globaltlnt.com
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── MODALS & TOASTS ─────────────────────────────────── */}
      {showModal && <EmailModal onClose={closeModal} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
