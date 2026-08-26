export default function AboutUsSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl space-y-20 px-6">
        {/* Header */}
        <div className="text-center space-y-6">

          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Established in 2022 under the guidance of{" "}
            <strong className="text-gray-900 dark:text-gray-100">
              Dr. Sunil Kumar
            </strong>{" "}
            (Department of CS & IT), Coding Club CUH is a student-driven community
            that fosters innovation, peer learning, and problem-solving through
            technology.
          </p>
        </div>

        {/* Who We Are */}
        <div className="space-y-5">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Who We Are
          </h3>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            The Coding Club CUH is a platform for passionate learners to explore coding,
            share knowledge, and innovate through technology. Since its inception, the
            club has been central to cultivating a strong tech community within CUH.
          </p>
        </div>

        {/* Our Mission */}
        <div className="space-y-5">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Our Mission
          </h3>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
            We strive to bridge the gap between classroom learning and real-world
            applications by:
          </p>
          <ul className="list-disc list-inside space-y-3 text-lg lg:text-xl text-gray-700 dark:text-gray-300">
            <li>Encouraging peer-to-peer learning.</li>
            <li>Organizing coding workshops, hackathons, and seminars.</li>
            <li>Building real-world projects that make an impact.</li>
            <li>Preparing students for internships, placements, and competitive events.</li>
          </ul>
        </div>

        {/* What We Do */}
        <div className="space-y-5">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            What We Do
          </h3>
          <ul className="list-disc list-inside space-y-3 text-lg lg:text-xl text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Coding Classes by Students →</strong>{" "}
              Peer-led sessions on programming, web development, and emerging technologies.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Development Projects →</strong>{" "}
              Applications, websites, and tools for campus and beyond.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Workshops & Events →</strong>{" "}
              Hackathons, coding competitions, and guest lectures from industry experts.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Community Growth →</strong>{" "}
              Encouraging teamwork, leadership, and innovative thinking.
            </li>
          </ul>
        </div>

        {/* Our Vision */}
        <div className="space-y-5">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Our Vision
          </h3>
          <ul className="list-disc list-inside space-y-3 text-lg lg:text-xl text-gray-700 dark:text-gray-300">
            <li>Spreading a strong coding culture across departments.</li>
            <li>Connecting students with industry leaders, alumni, and experts.</li>
            <li>Empowering students to see coding as a tool for solving real-world problems.</li>
          </ul>
        </div>

        {/* Achievements */}
        <div className="space-y-5">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Achievements
          </h3>
          <ul className="list-disc list-inside space-y-3 text-lg lg:text-xl text-gray-700 dark:text-gray-300">
            <li>Conducted dozens of workshops and coding contests.</li>
            <li>Helped students participate successfully in national hackathons.</li>
            <li>Guided juniors in creating open-source projects.</li>
            <li>Strengthened the CS & IT community at CUH.</li>
          </ul>
        </div>

        {/* Why Join Us */}
        <div className="space-y-5">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Why Join Us?
          </h3>
          <ul className="list-disc list-inside space-y-3 text-lg lg:text-xl text-gray-700 dark:text-gray-300">
            <li>Practical exposure beyond classroom learning.</li>
            <li>A supportive community of coders and innovators.</li>
            <li>Opportunities to showcase skills at events and competitions.</li>
            <li>A chance to grow into future-ready professionals.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
