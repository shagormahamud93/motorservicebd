import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, ClipboardList, Cog, MapPin, Menu, MessageCircle, Phone, PhoneCall, Search, Wrench, X } from "lucide-react";
import { business, buyMotorMessage, rentalMessage, sellMotorMessage, serviceMessage, setupMessage, telHref, whatsappHref } from "@/lib/business-config";
import { ContactForm } from "@/components/site/ContactForm";
import person1Img from "@/assets/person2.jpg";
import person2Img from "@/assets/person1.jpg";
import hero from "@/assets/industrial-workshop.png";
import motorSale from "@/assets/electric-motor-sale.png";
import sellMotorImg from "@/assets/Buy-Sell-Banner.png";
import coil from "@/assets/coil.jpg";
import coil2 from "@/assets/Rewinding.png";
import threePhase from "@/assets/three-phase.jpg";
import industrialWorkshop from "@/assets/industrial-workshop.png";
import factoryElectricianRepairing from "@/assets/factory-electrician-repairing-control-panel.png";   
import submersible from "@/assets/submersible.jpg";
import submersibleFuan from "@/assets/submersible.png";
import riceMill from "@/assets/rice-mill.jpg";
import fan from "@/assets/fan.jpg";
import mixer from "@/assets/mixer.jpg";
import riceCooker from "@/assets/rice-cooker.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${business.name} | মোটর মেরামত, পাম্প ভাড়া ও মোটর ক্রয়-বিক্রয়` },
      { name: "description", content: "সিংড়া, নাটোরে মোটর মেরামত, মোটর কয়েল রিওয়াইন্ডিং, সাবমার্সিবল পাম্প ভাড়া, পানি তোলার মোটর ভাড়া, ইলেকট্রিক মোটর ক্রয়-বিক্রয় এবং রাইস মিল ও মিল-কারখানার মোটর সেটআপ ও ইলেকট্রিক্যাল কাজ।" },
      { property: "og:title", content: business.name },
      { property: "og:description", content: "মোটর মেরামত, কয়েল রিওয়াইন্ডিং, পাম্প ভাড়া ও মোটর ক্রয়-বিক্রয় — সিংড়া, নাটোর।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", name: business.name, address: { "@type": "PostalAddress", streetAddress: "সিংড়া রোড, জয়পুরহাট কলম", addressLocality: "সিংড়া", addressRegion: "নাটোর", addressCountry: "BD" }, currenciesAccepted: "BDT", ...(business.phone && { telephone: business.phone }) }) }],
  }),
  component: Index,
});

const services = [
  { t: "সিঙ্গেল ফেজ মোটর মেরামত", d: "বাসাবাড়ি ও দোকানের সিঙ্গেল ফেজ মোটর, ক্যাপাসিটর ও সুইচ সমস্যা।", img: coil, alt: "সিঙ্গেল ফেজ মোটরের কয়েল" },
  { t: "থ্রি ফেজ মোটর মেরামত", d: "কারখানা ও মিলের থ্রি ফেজ মোটরের সার্ভিসিং ও রিওয়াইন্ডিং।", img: threePhase, alt: "নীল রঙের থ্রি ফেজ ইন্ডাস্ট্রিয়াল মোটর" },
  { t: "মোটর কয়েল রিওয়াইন্ডিং", d: "পুড়ে যাওয়া মোটরের কয়েল নতুন কপার তার দিয়ে বাধাই।", img: coil2, alt: "মোটরের স্টেটরে কপার কয়েল বাধাই" },
  { t: "রাইস মিল ও কারখানার মোটর", d: "রাইস মিলের মোটর ও সংশ্লিষ্ট বৈদ্যুতিক যন্ত্রের মেরামত।", img: riceMill, alt: "বেল্ট ড্রাইভসহ রাইস মিলের মোটর" },
  { t: "সাবমার্সিবল পাম্প মেরামত", d: "সাবমার্সিবল ও পানির পাম্পের মোটর মেরামত।", img: submersible, alt: "ওয়ার্কবেঞ্চে রাখা সাবমার্সিবল পানির পাম্প" },
  { t: "পানি তোলার মোটর ও পাম্প ভাড়া", d: "জমি, পুকুর বা কৃষিকাজে পানি তোলার জন্য মোটর ও সাবমার্সিবল পাম্প ভাড়া।", img: submersibleFuan, alt: "পানি তোলার সাবমার্সিবল পাম্প", msg: rentalMessage, cta: "পাম্প ভাড়া নিতে যোগাযোগ করুন" },
  { t: "ইলেকট্রিক মোটর ক্রয়-বিক্রয়", d: "নতুন ও পুরোনো ইলেকট্রিক মোটর কেনা ও বিক্রির জন্য যোগাযোগ করুন।", img: motorSale, alt: "বিক্রির জন্য রাখা ইলেকট্রিক মোটর", msg: buyMotorMessage, cta: "মোটর কেনাবেচায় যোগাযোগ করুন" },
  { t: "ফ্যান মেরামত", d: "সিলিং ও টেবিল ফ্যানের কয়েল, বেয়ারিং ও রেগুলেটর সমস্যা।", img: fan, alt: "খোলা সিলিং ফ্যানের মোটর ও টেবিল ফ্যান" },
  { t: "মিক্সার ও ব্লেন্ডার মেশিন", d: "মিক্সার গ্রাইন্ডার ও ব্লেন্ডারের মোটর মেরামত।", img: mixer, alt: "মেরামতের জন্য খোলা মিক্সার গ্রাইন্ডার" },
  { t: "রাইস কুকার ও অন্যান্য যন্ত্রপাতি", d: "রাইস কুকারের হিটিং এলিমেন্ট, থার্মোস্ট্যাট ও সুইচসহ অন্যান্য ইলেকট্রিক্যাল যন্ত্র মেরামত।", img: riceCooker, alt: "মাল্টিমিটার দিয়ে রাইস কুকার পরীক্ষা" },
  { t: "মিল-কারখানায় মোটর সেটআপ", d: "মিল-কারখানায় মোটর স্থাপন, সংযোগ ও প্রয়োজনীয় ইলেকট্রিক্যাল কাজ।", img: threePhase, alt: "কারখানায় মোটর সেটআপ", msg: setupMessage, cta: "সেটআপের জন্য যোগাযোগ করুন" },
];
const formServices = ["মোটর মেরামত", "কয়েল রিওয়াইন্ডিং", "সাবমার্সিবল পাম্প মেরামত", "পানি তোলার মোটর/পাম্প ভাড়া", "ইলেকট্রিক মোটর কিনতে চাই", "ইলেকট্রিক মোটর বিক্রি করতে চাই", "মিল-কারখানার মোটর সেটআপ", "অন্যান্য ইলেকট্রিক্যাল কাজ"];
const nav = [["#home", "হোম"], ["#about", "আমাদের সম্পর্কে"], ["#services", "সার্ভিস"], ["#rental", "পাম্প ভাড়া"], ["#trade", "মোটর কেনাবেচা"], ["#contact", "যোগাযোগ"]];
const hp = [
  "০.২৫ HP",
  "০.৫ HP",
  "০.৭৫ HP",
  "১ HP",
  "১.৫ HP",
  "২ HP",
  "৩ HP",
  "৫ HP",
  "৭.৫ HP",
  "১০ HP",
  "১৫ HP",
  "২০ HP",
  "২৫ HP",
  "৩০ HP",
  "৪০ HP",
  "৫০ HP",
  "৭৫ HP",
  "১০০ HP",
  "অন্যান্য"
];
const steps = [
  { i: PhoneCall, t: "যোগাযোগ করুন" },
  { i: ClipboardList, t: "মোটর বা মেশিনের সমস্যা জানান" },
  { i: Search, t: "পরীক্ষা ও খরচ নিয়ে আলোচনা করুন" },
  { i: Wrench, t: "সম্মতি অনুযায়ী মেরামতের কাজ সম্পন্ন করুন" },
];
const people = [
  {
    name: "মোঃ আশিকুল ইসলাম আলী",
    role: "ব্যবসার পরিচিতি ও গ্রাহক যোগাযোগ",
    desc: "আশিক ইলেকট্রিক ওয়ার্কস এন্ড সার্ভিসিং সেন্টারের সার্ভিস, মোটর কেনাবেচা, পাম্প ভাড়া এবং অন্যান্য কাজ সম্পর্কে জানতে যোগাযোগ করুন।",
    img: person1Img,
    phone:"+8801705-809316",
    alt: "আশিক — আশিক ইলেকট্রিক ওয়ার্কস এন্ড সার্ভিসিং সেন্টার",
  },
  {
    name: "মোঃ ওয়াজেদ আলী",
    role: "মোটর মেরামত ও মিল-কারখানার ইলেকট্রিক্যাল কাজ",
    desc: "সিঙ্গেল ফেজ ও থ্রি ফেজ মোটর, কয়েল রিওয়াইন্ডিং, সাবমার্সিবল পাম্প এবং মিল-কারখানার বিভিন্ন ইলেকট্রিক্যাল কাজ সম্পর্কে জানতে যোগাযোগ করুন।",
    img: person2Img,
    phone:"+8801719-825596",
    alt: "মোঃ ওয়াজেদ আলী — মোটর মেরামত ও ইলেকট্রিক্যাল কাজ",
  },
];

const btn = "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition";

function CallLink({ className, children }: { className: string; children: ReactNode }) {
  const href = telHref();
  return href ? <a href={href} className={className}>{children}</a> : <a href="#contact" className={className} title="ফোন নম্বর শীঘ্রই যুক্ত হবে">{children}</a>;
}
function WaLink({ msg, className, children }: { msg?: string; className: string; children: ReactNode }) {
  const href = whatsappHref(msg);
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a> : <a href="#contact" className={className}>{children}</a>;
}

function Index() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 10);
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("scroll", s); window.addEventListener("keydown", k);
    return () => { window.removeEventListener("scroll", s); window.removeEventListener("keydown", k); };
  }, []);
  const configured = !!telHref();

  return (
    <div className="pb-20 md:pb-0">
      <header className={`sticky top-0 z-40 border-b bg-background/95 backdrop-blur transition-shadow ${scrolled ? "shadow-md" : ""}`}>
        <div className="container-site flex h-16 items-center justify-between gap-3">
          <a href="#home" className="flex min-w-0 items-center gap-2 font-bold text-primary">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"><Cog className="size-5" /></span>
            <span className="truncate text-lg">{business.shortName}</span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">{nav.map(([h, l]) => <a key={h} href={h} className="font-medium hover:text-accent">{l}</a>)}</nav>
          <div className="flex items-center gap-2">
            <CallLink className={`${btn} hidden bg-accent py-2 text-accent-foreground hover:brightness-105 sm:inline-flex`}><Phone className="size-4" /> ফোন করুন</CallLink>
            <button className="grid size-10 place-items-center rounded-lg border lg:hidden" aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"} aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mnav" className="border-t bg-background lg:hidden">
            <div className="container-site grid py-2">{nav.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 font-medium hover:bg-muted">{l}</a>)}</div>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="bg-ink text-ink-foreground">
          <div className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
            <div className="animate-rise min-w-0">
              <p className="mb-4 inline-flex rounded-full bg-accent/15 px-3 py-1 text-sm text-accent">{business.address}</p>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">মোটর মেরামত, কয়েল রিওয়াইন্ডিং ও মিল-কারখানার সকল ইলেকট্রিক্যাল কাজ</h1>
              <p className="mt-5 text-lg opacity-85">বাসাবাড়ি, দোকান, রাইস মিল ও কারখানার মোটর, সাবমার্সিবল পাম্প মেরামত ও ভাড়া, মোটর কেনাবেচা এবং মিল-কারখানার ইলেকট্রিক্যাল কাজ।</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CallLink className={`${btn} bg-accent text-accent-foreground hover:brightness-105`}><Phone className="size-5" /> ফোন করুন</CallLink>
                <WaLink className={`${btn} bg-whatsapp text-primary-foreground hover:brightness-110`}><MessageCircle className="size-5" /> WhatsApp-এ যোগাযোগ</WaLink>
                <a href="#services" className={`${btn} border border-ink-foreground/30 hover:bg-ink-foreground/10`}>সার্ভিস দেখুন <ArrowRight className="size-4" /></a>
              </div>
              {!configured && <p className="mt-4 text-sm opacity-70">ফোন ও WhatsApp নম্বর শীঘ্রই যুক্ত করা হবে।</p>}
            </div>
            <img src={hero} alt="ওয়ার্কশপে ইলেকট্রিক মোটরের কয়েল মেরামত" width={1280} height={960} className="animate-rise aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl" />
          </div>
        </section>

        <section id="about" className="container-site py-16">
          <h2 className="text-3xl font-bold text-primary">আমাদের সম্পর্কে</h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{business.name} সিংড়া, নাটোরে ইলেকট্রিক মোটর মেরামত, কয়েল রিওয়াইন্ডিং, পাম্প ভাড়া, মোটর কেনাবেচা এবং মিল-কারখানার বৈদ্যুতিক কাজ করে থাকে।</p>
          <ul className="mt-5 grid max-w-3xl gap-2">{["সিঙ্গেল ফেজ ও থ্রি ফেজ মোটর", "পরীক্ষার পর খরচ জানানো হয়", "বাসাবাড়ি থেকে কারখানা পর্যন্ত"].map((x) => <li key={x} className="flex gap-2"><CheckCircle2 className="size-5 text-accent" />{x}</li>)}</ul>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {people.map((p) => (
              <article key={p.name} className="flex min-w-0 flex-col gap-5 rounded-2xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                <img src={p.img} alt={p.alt} loading="lazy" width={896} height={1152} className="aspect-[3/4] w-full rounded-xl object-cover object-top sm:w-44 sm:shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-primary">{p.name}</h3>
                  <p className="mt-1 font-medium text-accent">{p.role}</p>
                  <p className="mt-3 text-muted-foreground">{p.desc}</p>
                  <p className="mt-3 text-muted-foreground">মোবাইল নম্বর: {p.phone}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="bg-muted py-16">
          <div className="container-site">
            <h2 className="text-3xl font-bold text-primary">আমাদের সার্ভিসসমূহ</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.map((s) => (
                <article key={s.t} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <img src={s.img} alt={s.alt} loading="lazy" width={944} height={704} className="aspect-[4/3] w-full object-cover" />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold">{s.t}</h3>
                    <p className="mt-2 flex-1 text-muted-foreground">{s.d}</p>
                    <WaLink msg={s.msg ?? serviceMessage(s.t)} className="mt-4 inline-flex items-center gap-2 font-semibold text-whatsapp"><MessageCircle className="size-4" /> {s.cta ?? "WhatsApp-এ জানুন"}</WaLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="rental" className="container-site grid items-center gap-10 py-16 lg:grid-cols-2">
          <img src={submersibleFuan} alt="পানি তোলার সাবমার্সিবল পাম্প" loading="lazy" width={944} height={704} className="aspect-[4/3] w-full rounded-2xl object-cover" />
          <div>
            <h2 className="text-3xl font-bold text-primary">পানি তোলার মোটর ও সাবমার্সিবল পাম্প ভাড়া</h2>
            <p className="mt-4 text-lg text-muted-foreground">জমি, পুকুর, কৃষিকাজ বা অন্যান্য প্রয়োজনীয় কাজে পানি তোলার জন্য মোটর ও সাবমার্সিবল পাম্প ভাড়ার বিষয়ে যোগাযোগ করুন। পানির গভীরতা, প্রয়োজনীয় পানি, বিদ্যুতের ব্যবস্থা এবং কাজের ধরন অনুযায়ী উপযুক্ত পাম্প সম্পর্কে আলোচনা করে নিতে পারবেন।</p>
            <p className="mt-3 text-sm text-muted-foreground">পাম্পের প্রাপ্যতা, ভাড়ার সময়, পরিবহন ও খরচ আলোচনা করে নিশ্চিত করা হয়।</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <WaLink msg={rentalMessage} className={`${btn} bg-whatsapp text-primary-foreground hover:brightness-110`}><MessageCircle className="size-5" /> পাম্প ভাড়া নিতে যোগাযোগ করুন</WaLink>
              <CallLink className={`${btn} bg-accent text-accent-foreground hover:brightness-105`}><Phone className="size-5" /> ফোন করুন</CallLink>
            </div>
          </div>
        </section>

        <section id="trade" className="bg-ink py-16 text-ink-foreground">
          <div className="container-site grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">ইলেকট্রিক মোটর ক্রয়-বিক্রয়</h2>
              <p className="mt-4 text-lg opacity-85">বিভিন্ন ধরনের ইলেকট্রিক মোটর কেনা ও বিক্রির জন্য যোগাযোগ করুন। মোটরের HP, সিঙ্গেল ফেজ বা থ্রি ফেজ, ব্যবহার, অবস্থা এবং প্রয়োজন অনুযায়ী উপলভ্য মোটর ও দাম সম্পর্কে জেনে নিন। পুরোনো মোটর বিক্রি করতে চাইলে সেটির বিবরণও জানাতে পারেন।</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WaLink msg={buyMotorMessage} className={`${btn} bg-whatsapp text-primary-foreground hover:brightness-110`}><MessageCircle className="size-5" /> মোটর কিনতে চাই</WaLink>
                <WaLink msg={sellMotorMessage} className={`${btn} border border-ink-foreground/30 hover:bg-ink-foreground/10`}><MessageCircle className="size-5" /> মোটর বিক্রি করতে চাই</WaLink>
                <CallLink className={`${btn} bg-accent text-accent-foreground hover:brightness-105`}><Phone className="size-5" /> ফোন করুন</CallLink>
              </div>
              <p className="mt-4 text-sm opacity-70">নির্দিষ্ট মোটরের প্রাপ্যতা ও দাম যোগাযোগের মাধ্যমে নিশ্চিত করা হয়।</p>
            </div>
            <img src={sellMotorImg} alt="ক্রয়-বিক্রয়ের জন্য ইলেকট্রিক মোটর" loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full rounded-2xl object-cover" />
          </div>
        </section>

        <section className="container-site grid items-center gap-10 py-16 lg:grid-cols-2">
          <img src={factoryElectricianRepairing} alt="মিল-কারখানায় মোটর সেটআপ" loading="lazy" width={944} height={704} className="aspect-[4/3] w-full rounded-2xl object-cover" />
          <div>
            <h2 className="text-3xl font-bold text-primary">মিল-কারখানার মোটর সেটআপ ও ইলেকট্রিক্যাল কাজ</h2>
            <p className="mt-4 text-lg text-muted-foreground">রাইস মিল, কারখানা, ওয়ার্কশপ এবং অন্যান্য প্রতিষ্ঠানের মোটর স্থাপন, মোটর সংযোগ এবং প্রয়োজনীয় ইলেকট্রিক্যাল কাজের জন্য যোগাযোগ করুন। কাজের ধরন, মোটরের ক্ষমতা এবং স্থাপনার প্রয়োজন অনুযায়ী বিস্তারিত আলোচনা করে নেওয়া যাবে।</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <WaLink msg={setupMessage} className={`${btn} bg-whatsapp text-primary-foreground hover:brightness-110`}><MessageCircle className="size-5" /> WhatsApp-এ জানান</WaLink>
              <CallLink className={`${btn} bg-accent text-accent-foreground hover:brightness-105`}><Phone className="size-5" /> ফোন করুন</CallLink>
            </div>
          </div>
        </section>

        <section className="container-site pb-16">
          <h2 className="text-3xl font-bold text-primary">মোটরের ক্ষমতা</h2>
          <div className="mt-6 flex flex-wrap gap-3">{hp.map((h) => <span key={h} className="rounded-xl border-2 border-primary/20 bg-card px-5 py-3 text-lg font-semibold text-primary">{h}</span>)}</div>
          <p className="mt-4 text-muted-foreground">মেরামত সম্ভব কিনা তা মোটর পরীক্ষার পর জানানো হয়।</p>
        </section>

        <section id="process" className="bg-ink py-16 text-ink-foreground">
          <div className="container-site">
            <h2 className="text-3xl font-bold">মেরামত প্রক্রিয়া</h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.t} className="rounded-2xl border border-ink-foreground/15 p-6">
                  <s.i className="size-8 text-accent" />
                  <p className="mt-4 text-sm opacity-70">ধাপ {i + 1}</p>
                  <p className="mt-1 text-lg font-semibold">{s.t}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="container-site grid gap-10 py-16 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-3xl font-bold text-primary">যোগাযোগ</h2>
            <p className="mt-4 flex gap-2"><MapPin className="size-5 shrink-0 text-accent" />{business.address}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CallLink className={`${btn} bg-accent text-accent-foreground`}><Phone className="size-5" /> কল করুন</CallLink>
              <WaLink className={`${btn} bg-whatsapp text-primary-foreground`}><MessageCircle className="size-5" /> WhatsApp</WaLink>
            </div>
            {!configured && <p className="mt-4 text-sm text-muted-foreground">ফোন নম্বর এখনো যুক্ত করা হয়নি।</p>}
          </div>
          <ContactForm services={formServices} />
        </section>
      </main>

      <footer className="bg-ink py-10 text-ink-foreground">
        <div className="container-site flex flex-col gap-4 md:flex-row md:justify-between">
          <div><p className="font-bold">{business.name}</p><p className="mt-1 text-sm opacity-75">{business.address}</p></div>
          <nav className="flex flex-wrap gap-4 text-sm">{nav.map(([h, l]) => <a key={h} href={h} className="opacity-80 hover:opacity-100">{l}</a>)}</nav>
        </div>
        <p className="container-site mt-6 text-sm opacity-60">© {new Date().getFullYear()} {business.name}</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t bg-card pb-[env(safe-area-inset-bottom)] md:hidden">
        <CallLink className="flex flex-col items-center gap-1 py-2.5 text-sm font-medium text-primary"><Phone className="size-5" />কল করুন</CallLink>
        <WaLink className="flex flex-col items-center gap-1 border-x py-2.5 text-sm font-medium text-whatsapp"><MessageCircle className="size-5" />WhatsApp</WaLink>
        <a href="#contact" className="flex flex-col items-center gap-1 py-2.5 text-sm font-medium"><ClipboardList className="size-5" />ফর্ম</a>
      </div>
      <WaLink className="fixed bottom-6 right-6 z-40 hidden size-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-xl md:grid"><MessageCircle className="size-7" /><span className="sr-only">WhatsApp</span></WaLink>
    </div>
  );
}
