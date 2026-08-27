import { createFileRoute } from "@tanstack/react-router";
import { BellRing, Instagram, Mail, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Links — CCHS Youth Advisory Board" },
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
            href="mailto:creekyab@student.cherrycreekschools.org"
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <Mail className="size-6 text-accent" />
            <div>
              <h2 className="font-semibold">Email the board</h2>
              <p className="text-sm text-muted-foreground">aguo@cherrycreekschools.org</p>
            </div>
          </a>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
            <MapPin className="size-6 text-accent" />
            <div>
              <h2 className="font-semibold">Where we meet</h2>
              <p className="text-sm text-muted-foreground">
                IC 715 · Every other Monday after school
              </p>
            </div>
          </div>
          <a
            href="https://instagram.com/creekyab"
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <Instagram className="size-6 text-coral" />
            <div>
              <h2 className="font-semibold">Instagram</h2>
              <p className="text-sm text-muted-foreground">@creekyab</p>
            </div>
          </a>
          <a
            href="https://www.remind.com/join/creekyab"
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <BellRing className="size-6 text-coral" />
            <div>
              <h2 className="font-semibold">Remind</h2>
              <p className="text-sm text-muted-foreground">remind.com/join/creekyab</p>
            </div>
          </a>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-secondary/60 p-6 shadow-card">
          <h2 className="font-semibold">💙 Stay updated</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Follow our socials or email us for the latest event news and student opportunities.
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-warm p-8 text-coral-foreground">
          <h2 className="text-2xl font-bold">Anonymous feedback form</h2>
          <p className="mt-2 max-w-xl">
            Tell us what events you want to see — no name needed. Responses go straight to the
            board leads.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdVVr-8mLhopMugPFTGYc5lkMRBmv3LKLJehjH_LjW0yh_-sg/viewform?usp=publish-editor"
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
