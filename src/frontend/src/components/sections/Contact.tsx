import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { useSubmitContact } from "../../hooks/useQueries";

const PROJECT_TYPES = [
  "Web Development",
  "UI/UX Design",
  "Branding",
  "Graphic Design",
  "Video Editing",
  "Digital Marketing",
  "Other",
];

const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000+",
];

const SOCIAL_LINKS = [
  {
    icon: SiX,
    label: "X (Twitter)",
    href: "https://twitter.com/shaiksparkcreations",
    color: "oklch(0.9 0 0)",
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "https://instagram.com/shaiksparkcreations",
    color: "oklch(0.65 0.25 330)",
  },
  {
    icon: SiLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/shaiksparkcreations",
    color: "oklch(0.6 0.15 230)",
  },
  {
    icon: SiFacebook,
    label: "Facebook",
    href: "https://facebook.com/shaiksparkcreations",
    color: "oklch(0.55 0.2 240)",
  },
  {
    icon: SiYoutube,
    label: "YouTube",
    href: "https://youtube.com/@shaiksparkcreations",
    color: "oklch(0.65 0.25 25)",
  },
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    deadline: "",
    message: "",
  });

  const {
    mutate: submit,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(form);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.68 0.22 35 / 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-primary/30 text-sm font-medium text-spark-orange mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
            Start Your <span className="text-gradient-spark">Project</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Have a project in mind? We'd love to hear about it. Fill in the
            details and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info cards */}
            <div className="glass rounded-2xl p-6 space-y-5">
              <h3 className="font-bold font-display text-foreground text-xl mb-4">
                Let's Connect
              </h3>

              {[
                {
                  icon: Mail,
                  label: "Email Us",
                  value: "hello@shaikspark.com",
                  color: "oklch(0.68 0.22 35)",
                },
                {
                  icon: Phone,
                  label: "Call Us",
                  value: "+1 (555) 123-SPARK",
                  color: "oklch(0.82 0.2 85)",
                },
                {
                  icon: MapPin,
                  label: "Our Studio",
                  value: "123 Creative Hub, Innovation District",
                  color: "oklch(0.65 0.25 330)",
                },
              ].map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: `${info.color}18`,
                        border: `1px solid ${info.color}30`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: info.color }} />
                    </div>
                    <div>
                      <div className="text-foreground/50 text-xs font-medium uppercase tracking-wider">
                        {info.label}
                      </div>
                      <div className="text-foreground font-medium mt-0.5">
                        {info.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <div
              className="glass rounded-2xl overflow-hidden h-44 relative"
              data-ocid="contact.map_marker"
            >
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-3"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.14 0.04 260) 0%, oklch(0.16 0.06 280) 100%)",
                }}
              >
                {/* Grid lines */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(oklch(0.68 0.22 35) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.22 35) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="relative z-10 w-10 h-10 rounded-full bg-spark-orange flex items-center justify-center shadow-spark animate-pulse-glow">
                  <MapPin className="w-5 h-5 text-white" fill="white" />
                </div>
                <p className="relative z-10 text-foreground/60 text-sm">
                  Innovation District, Creative Hub
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-6">
              <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{
                        background: `${social.color}15`,
                        border: `1px solid ${social.color}30`,
                        color: social.color,
                      }}
                      title={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 space-y-5"
            >
              {/* Success State */}
              {isSuccess && (
                <div
                  data-ocid="contact.success_state"
                  className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 animate-fade-in"
                >
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Message Sent! 🎉</p>
                    <p className="text-sm opacity-80">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="ml-auto text-green-400/60 hover:text-green-400 text-xs"
                  >
                    Send another
                  </button>
                </div>
              )}

              {/* Error State */}
              {isError && (
                <div
                  data-ocid="contact.error_state"
                  className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-red-400 animate-fade-in"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Submission Failed</p>
                    <p className="text-sm opacity-80">
                      Please try again in a moment.
                    </p>
                  </div>
                </div>
              )}

              {/* Row: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground/70 text-sm">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    data-ocid="contact.name_input"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="glass border-border focus:border-primary/60 focus:ring-primary/30 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/70 text-sm">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    data-ocid="contact.email_input"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="glass border-border focus:border-primary/60 focus:ring-primary/30 rounded-xl"
                  />
                </div>
              </div>

              {/* Row: Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground/70 text-sm">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  data-ocid="contact.phone_input"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="glass border-border focus:border-primary/60 focus:ring-primary/30 rounded-xl"
                />
              </div>

              {/* Row: Project Type + Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground/70 text-sm">
                    Project Type *
                  </Label>
                  <Select
                    value={form.projectType}
                    onValueChange={(val) => handleChange("projectType", val)}
                    required
                  >
                    <SelectTrigger
                      data-ocid="contact.project_type_select"
                      className="glass border-border focus:border-primary/60 rounded-xl"
                    >
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground/70 text-sm">
                    Budget Range *
                  </Label>
                  <Select
                    value={form.budget}
                    onValueChange={(val) => handleChange("budget", val)}
                    required
                  >
                    <SelectTrigger
                      data-ocid="contact.budget_select"
                      className="glass border-border focus:border-primary/60 rounded-xl"
                    >
                      <SelectValue placeholder="Select budget..." />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_RANGES.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label
                  htmlFor="deadline"
                  className="text-foreground/70 text-sm"
                >
                  Project Deadline
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  data-ocid="contact.deadline_input"
                  value={form.deadline}
                  onChange={(e) => handleChange("deadline", e.target.value)}
                  className="glass border-border focus:border-primary/60 focus:ring-primary/30 rounded-xl"
                  style={{ colorScheme: "dark" }}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground/70 text-sm">
                  Project Details *
                </Label>
                <Textarea
                  id="message"
                  data-ocid="contact.message_textarea"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  required
                  rows={5}
                  className="glass border-border focus:border-primary/60 focus:ring-primary/30 rounded-xl resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl btn-spark text-white font-semibold text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-center text-foreground/40 text-xs">
                We typically respond within 24 hours. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
