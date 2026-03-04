import { Skeleton } from "@/components/ui/skeleton";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import type { TeamMember } from "../../backend.d";
import { useGetAllTeamMembers } from "../../hooks/useQueries";

const FALLBACK_TEAM: TeamMember[] = [
  {
    id: BigInt(1),
    name: "Shaik Rashid",
    role: "Founder & Creative Director",
    photoUrl: "",
    twitter: "@shaikrashid",
    linkedin: "shaikrashid",
    instagram: "@shaikrashid",
  },
  {
    id: BigInt(2),
    name: "Aisha Patel",
    role: "Lead UI/UX Designer",
    photoUrl: "",
    twitter: "@aishadesigns",
    linkedin: "aishapatel",
    instagram: "@aishadesigns",
  },
  {
    id: BigInt(3),
    name: "Dev Mehta",
    role: "Full Stack Developer",
    photoUrl: "",
    twitter: "@devmehta",
    linkedin: "devmehta",
    instagram: "@devmehta",
  },
  {
    id: BigInt(4),
    name: "Zara Nair",
    role: "Brand Strategist",
    photoUrl: "",
    twitter: "@zaranair",
    linkedin: "zaranair",
    instagram: "@zaranair",
  },
  {
    id: BigInt(5),
    name: "Ravi Kumar",
    role: "Motion & Video Director",
    photoUrl: "",
    twitter: "@ravikumar",
    linkedin: "ravikumar",
    instagram: "@ravikumar",
  },
  {
    id: BigInt(6),
    name: "Lily Wong",
    role: "Digital Marketing Lead",
    photoUrl: "",
    twitter: "@lilywong",
    linkedin: "lilywong",
    instagram: "@lilywong",
  },
];

const AVATAR_GRADIENTS = [
  "from-orange-500 to-red-600",
  "from-pink-500 to-purple-600",
  "from-yellow-400 to-orange-500",
  "from-blue-500 to-indigo-600",
  "from-teal-500 to-cyan-600",
  "from-green-500 to-emerald-600",
];

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];

  return (
    <div
      className="team-card glass rounded-2xl overflow-hidden group cursor-pointer"
      data-ocid={`team.item.${index + 1}`}
    >
      {/* Photo area */}
      <div className={`relative h-64 bg-gradient-to-br ${gradient}`}>
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white/20 text-8xl font-bold font-display">
              {initials}
            </div>
            {/* Decorative circles */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Social overlay on hover */}
        <div className="social-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
          <p className="text-white/80 text-sm mb-4">
            Connect with {member.name.split(" ")[0]}
          </p>
          <div className="flex items-center gap-3">
            {member.twitter && (
              <a
                href={`https://twitter.com/${member.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <SiX className="w-4 h-4" />
              </a>
            )}
            {member.linkedin && (
              <a
                href={`https://linkedin.com/in/${member.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <SiLinkedin className="w-4 h-4" />
              </a>
            )}
            {member.instagram && (
              <a
                href={`https://instagram.com/${member.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <SiInstagram className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-bold font-display text-foreground text-lg group-hover:text-gradient-spark transition-all duration-300">
          {member.name}
        </h3>
        <p className="text-foreground/50 text-sm mt-1">{member.role}</p>
      </div>
    </div>
  );
}

export function Team() {
  const { data: fetchedTeam = [], isLoading } = useGetAllTeamMembers();
  const team = fetchedTeam.length > 0 ? fetchedTeam : FALLBACK_TEAM;

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.22 35 / 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-primary/30 text-sm font-medium text-spark-orange mb-4">
            Meet the Team
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
            The Creative <span className="text-gradient-spark">Minds</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            A passionate team of designers, developers, and strategists
            dedicated to crafting extraordinary digital experiences.
          </p>
        </div>

        {/* Team Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["tk1", "tk2", "tk3", "tk4", "tk5", "tk6"].map((k) => (
              <Skeleton key={k} className="h-80 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <MemberCard
                key={member.id.toString()}
                member={member}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
