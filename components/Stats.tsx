const stats = [
  { value: "1 200+", label: "Godkjente meglere" },
  { value: "4.8 / 5", label: "Snittkarakter" },
  { value: "0 kr", label: "Kostnad for deg" },
  { value: "48 t", label: "Svar innen" },
];

export default function Stats() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
          {stats.map((stat) => (
            <div key={stat.label} className="px-8 py-10 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#0a1628] tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-gray-500 text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
