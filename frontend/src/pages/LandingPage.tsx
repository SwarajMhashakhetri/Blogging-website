import { Link } from 'react-router-dom';

export function LandingPage() {
  const categories = ["Technology", "Lifestyle", "Travel", "Food"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <header className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            BlogHub
          </div>
          <nav>
            <Link to="/signin" className="text-gray-600 hover:text-gray-800 mr-4 transition duration-300">Sign In</Link>
            <Link to="/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg">Sign Up</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Share Your Story with the World</h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Join our vibrant community of writers and readers. Unleash your creativity and inspire others with your unique perspective.</p>
          <Link to="/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg text-lg">
            Start Your Journey
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-10 mb-20">
          {[
            { title: "Discover Stories", description: "Explore a diverse range of topics and perspectives from writers around the globe." },
            { title: "Find Your Niche", description: "Connect with readers who share your passions and interests." },
            { title: "Grow Your Audience", description: "Build a loyal following and engage with your readers in meaningful ways." }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-8 transition duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={`/category/${category.toLowerCase()}`} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                <span className="text-xl font-medium text-gray-800">{category}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Share Your Voice?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Join BlogHub today and become part of a community that values your unique perspective.</p>
          <Link to="/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg">
            Create Your Account
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2023 BlogHub. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-purple-400 transition duration-300">Terms</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Privacy</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}