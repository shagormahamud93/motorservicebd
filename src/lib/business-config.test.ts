import { describe, expect, it } from "vitest";
import { business, telHref, whatsappHref } from "./business-config";

describe("contact links", () => {
  it("never builds a link without a verified number", () => {
    const p = business.phone, w = business.whatsapp;
    business.phone = ""; business.whatsapp = "";
    expect(telHref()).toBeNull();
    expect(whatsappHref()).toBeNull();
    business.phone = p; business.whatsapp = w;
  });
  it("builds tel and wa.me links from a Bangladeshi number", () => {
    const p = business.phone, w = business.whatsapp;
    business.phone = "+880 1712-345678"; business.whatsapp = "+8801712345678";
    expect(telHref()).toBe("tel:+8801712345678");
    expect(whatsappHref("হ্যালো")).toBe("https://wa.me/8801712345678?text=" + encodeURIComponent("হ্যালো"));
    business.phone = p; business.whatsapp = w;
  });
});
