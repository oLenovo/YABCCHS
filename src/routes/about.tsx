import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — CCHS Youth Advisory Board" },
      {
        name: "description",
        content:
          "Meet the student-led Youth Advisory Board: our committees, how we plan school events, and what we’re all about.",
      },
      { property: "og:title", content: "About the Youth Advisory Board" },
      {
        property: "og:description",
        content: "Our committees, our mission, and the student events we plan all year.",
      },
    ],
  }),
  component: AboutPage,
});

const committees = [
  {
    name: "Connect",
    text: "YAB itself is a place where people can connect and learn the benefits of helping others. Organizing events and helping people comfortable at Creek is one of the few things we do.",
  },
  {
    name: "Communications",
    text: "We pursue to create a platform in which students can be informed about important and impactful events happening at Creek, all in one place!",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">About us</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          We’re the students behind the good stuff at Creek
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          CCHS Youth Advisory Board is a group of students from every grade promoting positivity and
          wellness at Creek. We plan events, bring student voice to school leadership, and make it
          easy for anyone to get involved. We meet after school on every other Monday in IC 715.
        </p>

        <h2 className="mt-14 text-2xl font-bold">Our vision</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {committees.map((c) => (
            <div key={c.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-gradient-hero p-8 text-foreground">
          <h2 className="text-2xl font-bold">Stay in the loop</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Drop by a Monday meeting in IC 715 or follow us on social media for updates on events, and student-led initiatives. All grades welcome, always.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
