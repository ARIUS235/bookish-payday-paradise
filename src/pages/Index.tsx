
import { useState, useEffect } from "react";
import { BookOpen, Download, Users, Star, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AuthModal from "@/components/AuthModal";
import EbookLibrary from "@/components/EbookLibrary";
import PaymentModal from "@/components/PaymentModal";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Simulate login state - in real app this would connect to Supabase auth
  useEffect(() => {
    const savedUser = localStorage.getItem('ebook_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('ebook_user', JSON.stringify(userData));
    setShowAuthModal(false);
    // In real app, this would trigger payment for login
    setShowPaymentModal(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('ebook_user');
  };

  const featuredBooks = [
    {
      id: 1,
      title: "Digital Marketing Mastery",
      author: "Sarah Johnson",
      cover: "/api/placeholder/200/300",
      price: "$9.99",
      rating: 4.8,
      downloads: 1234
    },
    {
      id: 2,
      title: "Python Programming Guide",
      author: "Michael Chen",
      cover: "/api/placeholder/200/300",
      price: "$12.99",
      rating: 4.9,
      downloads: 2156
    },
    {
      id: 3,
      title: "Business Strategy 2024",
      author: "Amanda Rodriguez",
      cover: "/api/placeholder/200/300",
      price: "$14.99",
      rating: 4.7,
      downloads: 987
    }
  ];

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">EbookVault</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        <EbookLibrary onDownload={() => setShowPaymentModal(true)} />
        
        {showPaymentModal && (
          <PaymentModal 
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            type="download"
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EbookVault</span>
            </div>
            <Button onClick={() => setShowAuthModal(true)}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your Next
            <span className="text-blue-600 block">Great Read</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access thousands of premium ebooks across every genre. Learn, grow, and explore 
            with our curated collection of digital books.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowAuthModal(true)}
            >
              Start Reading Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Browse Library
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">50,000+</h3>
              <p className="text-gray-600">Premium Ebooks</p>
            </div>
            <div>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">100,000+</h3>
              <p className="text-gray-600">Active Readers</p>
            </div>
            <div>
              <Download className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">1M+</h3>
              <p className="text-gray-600">Downloads</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Featured Ebooks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <BookOpen className="h-20 w-20 text-white" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded text-sm font-semibold text-blue-600">
                      {book.price}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg mb-2">{book.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 mb-4">
                    by {book.author}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{book.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Download className="h-4 w-4 mr-1" />
                      {book.downloads}
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => setShowAuthModal(true)}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Login to Access
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of readers who are already discovering amazing content.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => setShowAuthModal(true)}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal 
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          type="login"
        />
      )}
    </div>
  );
};

export default Index;
