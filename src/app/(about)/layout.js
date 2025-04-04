import InsightRoll from "@/src/components/About/InsightRoll";

const insights = [
  "Phd Candidate in Computer Science",
  "Certified SCIE reviewer",
  "Published Researcher in AI & ML",
  "AI researcher & developer",
  "Full Stack enthusiast",
];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
