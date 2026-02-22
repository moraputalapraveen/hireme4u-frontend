import { Briefcase, Target, Users, TrendingUp } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Hireme4u</h1>
          <p className="text-xl text-gray-600">
            Connecting talent with opportunities since 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            At Hireme4u, our mission is to bridge the gap between talented freshers and experienced
            professionals with the best job opportunities across India. We believe that everyone
            deserves a chance to build a fulfilling career, and we're committed to making the job
            search process as simple and effective as possible.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We focus particularly on entry-level positions and opportunities for freshers, helping
            new graduates take their first steps into the professional world with confidence.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-bold text-xl mb-3">Curated Job Listings</h3>
              <p className="text-gray-700">
                We carefully curate job listings from reputable companies, ensuring quality
                opportunities for job seekers at all levels.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-bold text-xl mb-3">Fresher-Focused</h3>
              <p className="text-gray-700">
                Special emphasis on entry-level positions and fresher-friendly jobs to help new
                graduates launch their careers.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-bold text-xl mb-3">Easy to Use</h3>
              <p className="text-gray-700">
                Our intuitive search and filter system makes it easy to find jobs that match your
                skills, experience, and preferences.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hireme4u was founded in 2026 with a simple vision: to make job searching easier and
            more accessible for everyone, especially freshers entering the job market for the first
            time. We recognized that many talented individuals struggle to find the right
            opportunities, and employers often miss out on great candidates.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our platform brings together job seekers and employers, creating a streamlined experience
            that benefits both parties. We've helped thousands of freshers find their first jobs and
            continue to grow our network of employers and job opportunities every day.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, Hireme4u is a trusted name in the job search industry, known for our commitment
            to quality, user experience, and helping people achieve their career goals.
          </p>
        </section>

        {/* Values */}
        <section className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2 text-blue-600">Quality First</h3>
              <p className="text-gray-700">
                We prioritize quality over quantity, ensuring every job listing meets our standards.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-blue-600">User-Centric</h3>
              <p className="text-gray-700">
                Everything we do is designed with our users in mind, from search to application.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-blue-600">Transparency</h3>
              <p className="text-gray-700">
                We believe in clear, honest communication and transparent job listings.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-blue-600">Accessibility</h3>
              <p className="text-gray-700">
                We make job searching accessible to everyone, regardless of their background.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
