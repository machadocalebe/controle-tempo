export default function TempoDisplay({ tempo }) {
  const h = String(Math.floor(tempo / 3600)).padStart(2, "0");
  const m = String(Math.floor((tempo % 3600) / 60)).padStart(2, "0");
  const s = String(tempo % 60).padStart(2, "0");

  return <p className="text-5xl font-mono mb-6">{`${h}:${m}:${s}`}</p>;
}
