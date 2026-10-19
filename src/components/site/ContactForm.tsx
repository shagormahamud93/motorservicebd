import { useState, type FormEvent } from "react";
import { z } from "zod";
import { AlertTriangle, MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/business-config";

const schema = z.object({
  name: z.string().trim().min(2, "আপনার নাম লিখুন").max(80),
  phone: z.string().trim().regex(/^(\+?88)?01\d{9}$/, "সঠিক মোবাইল নম্বর লিখুন (যেমন ০১৭XXXXXXXX ইংরেজিতে)"),
  whatsapp: z.string().trim().max(20).optional(),
  service: z.string().min(1, "সার্ভিসের ধরন নির্বাচন করুন"),
  machine: z.string().trim().max(80).optional(),
  hp: z.string().trim().max(20).optional(),
  phase: z.string(),
  problem: z.string().trim().min(5, "সমস্যার বিবরণ লিখুন").max(1000),
  method: z.string(),
});

const field = "w-full min-w-0 rounded-lg border border-input bg-card px-3 py-2.5 text-base outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";

export function ContactForm({ services }: { services: string[] }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      setResult(null);
      return;
    }
    setErrors({});
    const d = parsed.data;
    const msg = `আসসালামু আলাইকুম। নতুন সার্ভিস অনুরোধ:\nনাম: ${d.name}\nমোবাইল: ${d.phone}${d.whatsapp ? `\nWhatsApp: ${d.whatsapp}` : ""}\nসার্ভিস: ${d.service}${d.machine ? `\nমেশিন: ${d.machine}` : ""}${d.hp ? `\nক্ষমতা: ${d.hp}` : ""}\nফেজ: ${d.phase}\nসমস্যা: ${d.problem}\nযোগাযোগের মাধ্যম: ${d.method}`;
    const wa = whatsappHref(msg);
    if (wa) {
      window.open(wa, "_blank", "noopener");
      setResult("WhatsApp খোলা হয়েছে — বার্তাটি পাঠাতে WhatsApp-এ Send চাপুন।");
    } else {
      setResult("দুঃখিত, অনলাইন অনুরোধ পাঠানো এখনো চালু হয়নি। আপনার তথ্য সংরক্ষিত আছে — অনুগ্রহ করে সরাসরি দোকানে যোগাযোগ করুন।");
    }
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-2xl border bg-card p-5 shadow-sm sm:grid-cols-2 sm:p-7">
      <label className="block min-w-0">নাম *<input name="name" className={field} placeholder="আপনার নাম" />{err("name")}</label>
      <label className="block min-w-0">মোবাইল নম্বর *<input name="phone" inputMode="tel" className={field} placeholder="01XXXXXXXXX" />{err("phone")}</label>
      <label className="block min-w-0">WhatsApp নম্বর<input name="whatsapp" inputMode="tel" className={field} placeholder="ঐচ্ছিক" /></label>
      <label className="block min-w-0">সার্ভিসের ধরন *
        <select name="service" className={field} defaultValue=""><option value="">নির্বাচন করুন</option>{services.map((s) => <option key={s}>{s}</option>)}<option>অন্যান্য</option></select>{err("service")}
      </label>
      <label className="block min-w-0">মোটর/মেশিনের নাম<input name="machine" className={field} placeholder="যেমন: পানির পাম্প" /></label>
      <label className="block min-w-0">মোটর ক্যাপাসিটি<input name="hp" className={field} placeholder="যেমন: ৩ HP" /></label>
      <label className="block min-w-0">ফেজ
        <select name="phase" className={field}><option>জানা নেই</option><option>সিঙ্গেল ফেজ</option><option>থ্রি ফেজ</option><option>প্রযোজ্য নয়</option></select>
      </label>
      <label className="block min-w-0">যোগাযোগের মাধ্যম
        <select name="method" className={field}><option>ফোন</option><option>WhatsApp</option></select>
      </label>
      <label className="block min-w-0 sm:col-span-2">সমস্যার বিবরণ *<textarea name="problem" rows={4} className={field} placeholder="মোটর বা মেশিনে কী সমস্যা হচ্ছে লিখুন" />{err("problem")}</label>
      <div className="sm:col-span-2">
        <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition hover:brightness-105 sm:w-auto">
          <MessageCircle className="size-5" /> অনুরোধ পাঠান
        </button>
        {result && (
          <p role="status" className="mt-4 flex gap-2 rounded-lg bg-secondary p-3 text-secondary-foreground">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" /> {result}
          </p>
        )}
      </div>
    </form>
  );
}
