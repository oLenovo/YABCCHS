import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatEventDate, type YabEvent } from "@/data/events";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z
    .string()
    .trim()
    .email("Enter a valid student email")
    .max(255, "Email is too long"),
  grade: z.enum(["9", "10", "11", "12"], { message: "Select your grade level" }),
  role: z.string().min(1, "Choose a role or slot"),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function SignUpDialog({
  event,
  open,
  onOpenChange,
}: {
  event: YabEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setErrors({});
    }
  }, [open, event?.id]);

  if (!event) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse({ name, email, grade, role });
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto size-12 text-accent" />
            <DialogHeader className="mt-4">
              <DialogTitle className="text-center">You're signed up!</DialogTitle>
              <DialogDescription className="text-center">
                We saved your spot as <strong>{role}</strong> for {event.title} on{" "}
                {formatEventDate(event.date)}. A confirmation will land in your student inbox.
              </DialogDescription>
            </DialogHeader>
            <Button className="mt-6 w-full" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Sign up · {event.title}</DialogTitle>
              <DialogDescription>
                {formatEventDate(event.date)} · {event.location}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={name}
                  maxLength={100}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jordan Rivera"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Student email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  maxLength={255}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@student.school.edu"
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Grade level</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {["9", "10", "11", "12"].map((g) => (
                        <SelectItem key={g} value={g}>
                          Grade {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.grade && <p className="text-xs text-destructive">{errors.grade}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Role / slot</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pick a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {event.roles.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Submit sign-up
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
