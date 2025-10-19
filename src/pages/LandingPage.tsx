import React, { useState } from 'react';
import { PiggyBank, Check, Star, ArrowRight, BarChart3, Shield, Zap, CreditCard, TrendingUp } from 'lucide-react';
import AuthForm from '../components/AuthForm';


const LandingPage: React.FC = ({}) => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400/10 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-purple-400/10 rounded-full blur-lg animate-bounce"></div>
        
        {/* Hexagonal patterns */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 opacity-10">
          <div className="w-64 h-64 border border-white/20 transform rotate-45"></div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 opacity-5">
          <div className="w-48 h-48 border border-green-400/30 transform rotate-12"></div>
        </div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl">
            <PiggyBank className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">ExpenseTracker</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-2 rounded-full font-medium hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Sign In
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-12 lg:pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">easiest</span> way
                <br />
                to track your expenses
              </h2>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-green-500/20 rounded-full mt-1">
                  <Check className="text-green-400" size={16} />
                </div>
                <div>
                  <span className="text-white font-medium">All inclusive.</span>
                  <span className="text-gray-300 ml-2">Track expenses, set budgets, analyze spending patterns, and create detailed reports.</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-1 bg-green-500/20 rounded-full mt-1">
                  <Check className="text-green-400" size={16} />
                </div>
                <div>
                  <span className="text-white font-medium">Smart analytics.</span>
                  <span className="text-gray-300 ml-2">Get insights with beautiful charts, category breakdowns, and spending trends.</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-1 bg-green-500/20 rounded-full mt-1">
                  <Check className="text-green-400" size={16} />
                </div>
                <div>
                  <span className="text-white font-medium">Budget management.</span>
                  <span className="text-gray-300 ml-2">Set monthly budgets, track progress, and get alerts when you're overspending.</span>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-4">
              <p className="text-white font-medium">I want to:</p>
              
              <div className="grid gap-3">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-green-400 rounded-full group-hover:bg-green-400 transition-all"></div>
                    <span className="text-white font-medium">Track my personal expenses</span>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-green-400 rounded-full group-hover:bg-green-400 transition-all"></div>
                    <span className="text-white font-medium">Manage family budget</span>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-green-400 rounded-full group-hover:bg-green-400 transition-all"></div>
                    <span className="text-white font-medium">Analyze spending patterns</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email CTA */}
            <form onSubmit={handleGetStarted} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email to get started"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-green-500 text-white px-8 py-4 rounded-full font-medium hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group"
              >
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="text-white" size={16} />
                  </div>
                  <span className="text-white font-medium">Dashboard</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Mock Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-green-400" size={16} />
                    <span className="text-gray-300 text-sm">Total Expenses</span>
                  </div>
                  <div className="text-white text-xl font-bold">$2,847</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="text-blue-400" size={16} />
                    <span className="text-gray-300 text-sm">This Month</span>
                  </div>
                  <div className="text-white text-xl font-bold">$892</div>
                </div>
              </div>

              {/* Mock Chart */}
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-sm font-medium">Spending Overview</span>
                  <span className="text-gray-400 text-xs">Last 7 days</span>
                </div>
                <div className="flex items-end gap-2 h-20">
                  {[40, 65, 45, 80, 55, 70, 60].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-green-400 to-blue-400 rounded-t opacity-80"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Mock Recent Transactions */}
              <div className="space-y-3">
                <span className="text-white text-sm font-medium">Recent Transactions</span>
                {[
                  { name: 'Grocery Store', amount: '$67.50', category: 'Food', color: 'bg-red-400' },
                  { name: 'Gas Station', amount: '$45.20', category: 'Transport', color: 'bg-blue-400' },
                  { name: 'Coffee Shop', amount: '$12.80', category: 'Food', color: 'bg-red-400' }
                ].map((transaction, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 ${transaction.color} rounded-full`}></div>
                      <div>
                        <div className="text-white text-sm font-medium">{transaction.name}</div>
                        <div className="text-gray-400 text-xs">{transaction.category}</div>
                      </div>
                    </div>
                    <div className="text-white font-medium">{transaction.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating elements around dashboard */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Money Matters.</span> Simplified.
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Everything you need to take control of your finances in one beautiful, easy-to-use platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-white" size={24} />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Smart Analytics</h4>
              <p className="text-gray-300">Get detailed insights into your spending patterns with beautiful charts and reports.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={24} />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Secure & Private</h4>
              <p className="text-gray-300">Your financial data is encrypted and secure. We never share your information.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={24} />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Lightning Fast</h4>
              <p className="text-gray-300">Add expenses in seconds with our intuitive interface and smart categorization.</p>
            </div>
          </div>
        </div>
      </main>
      {isModalOpen && <AuthForm onClose={() => setIsModalOpen(false)} mode={'login'} />}
    </div>
  );
};

export default LandingPage;