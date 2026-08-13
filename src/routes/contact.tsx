import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Music2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Links — Youth Advisory Board" },
      {
        name: "description",
        content:
          "Reach the Youth Advisory Board: email, meeting location, socials, feedback form and school resources.",
      },
      { property: "og:title", content: "Contact the Youth Advisory Board" },
      {
        property: "og:description",
        content: "Email us, follow our socials, or send anonymous feedback.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Contact &amp; links
        </p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Say hi, share an idea</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Got an event idea, a question about volunteer hours, or feedback for the board? We read
          everything.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:yab@student.school.edu"
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <Mail className="size-6 text-accent" />
            <div>
              <h2 className="font-semibold">Email the board</h2>
              <p className="text-sm text-muted-foreground">yab@student.school.edu</p>
            </div>
          </a>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
            <MapPin className="size-6 text-accent" />
            <div>
              <h2 className="font-semibold">Where we meet</h2>
              <p className="text-sm text-muted-foreground">
                Library Conference Room · First Thursday, 3:30 PM
              </p>
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <Instagram className="size-6 text-coral" />
            <div>
              <h2 className="font-semibold">Instagram</h2>
              <p className="text-sm text-muted-foreground">@youthadvisoryboard</p>
            </div>
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <Music2 className="size-6 text-coral" />
            <div>
              <h2 className="font-semibold">TikTok</h2>
              <p className="text-sm text-muted-foreground">@youthadvisoryboard</p>
            </div>
          </a>
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-warm p-8 text-coral-foreground">
          <h2 className="text-2xl font-bold">Anonymous feedback form</h2>
          <p className="mt-2 max-w-xl">
            Tell us what events you want to see — no name needed. Responses go straight to the
            board leads.
          </p>
          <a
            href="https://forms.gle"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Open the feedback form
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
