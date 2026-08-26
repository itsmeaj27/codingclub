export default function AboutSection() {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-handjet tracking-wider mb-6">About Coding Club CUH</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-6 leading-relaxed">
              Coding Club CUH was founded in 2022 with a clear vision: to create an ecosystem where students can learn, build, and grow together. We bridge the gap between academic theory and real-world software engineering.
            </p>
            <div className="space-y-4">
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                  <span className="text-blue-500">🎯</span> Our Mission
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">To foster a strong programming culture and equip students with modern tech skills through peer-to-peer learning and hands-on projects.</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                  <span className="text-emerald-500">💡</span> Students Teach, Students Learn
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">We believe the best way to learn is to teach. Our club operates on a peer learning model where senior students guide and mentor juniors.</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
             {/* Using placeholder until real CMS image is loaded */}
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-4xl">👨‍💻👩‍💻</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
