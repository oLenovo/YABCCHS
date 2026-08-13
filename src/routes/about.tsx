import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Youth Advisory Board" },
      {
        name: "description",
        content:
          "Meet the student-led Youth Advisory Board: our committees, how we plan school events, and how to join.",
      },
      { property: "og:title", content: "About the Youth Advisory Board" },
      {
        property: "og:description",
        content: "Our committees, our mission, and how students can join the board.",
      },
    ],
  }),
  component: AboutPage,
});

const committees = [
  {
    name: "Culture & Fests",
    text: "Plans Ethnic Fest, Heritage Night and celebrations with our culture clubs.",
  },
  {
    name: "Service & Volunteering",
    text: "Runs food drives, mural projects and partnerships with neighborhood orgs.",
  },
  {
    name: "Workshops & Learning",
    text: "Books speakers and student-led sessions on leadership and life skills.",
  },
  {
    name: "Communications",
    text: "Handles our socials, posters, and the weekly student newsletter.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">About us</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          Students shaping what happens at our school
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          The Youth Advisory Board is a group of students from every grade who plan events, bring
          student voice to school leadership, and create ways for everyone to get involved. We meet
          monthly, and every meeting is open — no application required to show up.
        </p>

        <h2 className="mt-14 text-2xl font-bold">Our committees</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {committees.map((c) => (
            <div key={c.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-gradient-hero p-8 text-primary-foreground">
          <h2 className="text-2xl font-bold">How to join</h2>
          <p className="mt-2 max-w-2xl text-primary-foreground/85">
            Come to any board meeting, sign up for a volunteer slot on the events page, or tell a
            committee lead which group you'd like to help with. Members from all grades welcome.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
