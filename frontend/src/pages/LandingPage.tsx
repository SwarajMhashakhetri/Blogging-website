import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-white text-2xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          EasyWallet
        </div>
        <nav>
          <ul className="flex space-x-4 text-white">
            <li><a href="#features" className="hover:text-blue-200">Features</a></li>
            <li><a href="#about" className="hover:text-blue-200">About</a></li>
            <li><a href="#contact" className="hover:text-blue-200">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center text-white mb-16">
          <h1 className="text-5xl font-bold mb-4">Manage Your Money with Ease</h1>
          <p className="text-xl mb-8">EasyWallet is your all-in-one solution for secure and convenient financial management.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/signin" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">Sign In</Link>
            <Link to="/signup" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300">Sign Up</Link>
          </div>
        </section>

        <section id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Secure Transactions", description: "Your financial data is protected with bank-level security.", icon: "🔒" },
            { title: "Easy Money Transfer", description: "Send money to friends and family with just a few taps.", icon: "💸" },
            { title: "Budget Tracking", description: "Keep your spending in check with our intuitive budgeting tools.", icon: "📊" }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </section>

        <section id="about" className="text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">About EasyWallet</h2>
          <p className="text-lg">EasyWallet was founded with a simple mission: to make managing your finances as easy as possible. Our team of financial experts and tech innovators have created a platform that simplifies every aspect of your financial life.</p>
        </section>

        <section id="contact" className="text-white">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg mb-4">Have questions? Our support team is here to help.</p>
          <a href="mailto:support@easywallet.com" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">Email Support</a>
        </section>
      </main>

      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 EasyWallet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}