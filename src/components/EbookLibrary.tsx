
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, Star, Search, Filter, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EbookLibraryProps {
  onDownload: () => void;
}

const EbookLibrary = ({ onDownload }: EbookLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();

  // Auto-update every 3 months (90 days)
  useEffect(() => {
    const checkForUpdate = () => {
      const now = new Date();
      const threeMonthsAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
      
      if (lastUpdated < threeMonthsAgo) {
        setLastUpdated(now);
        toast({
          title: "Library Updated!",
          description: "New books have been added to the collection.",
        });
      }
    };

    // Check immediately and then every day
    checkForUpdate();
    const interval = setInterval(checkForUpdate, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [lastUpdated, toast]);

  const allEbooks = [
    // Business & Finance
    {
      id: 1,
      title: "Digital Marketing Mastery",
      author: "Sarah Johnson",
      category: "Business",
      rating: 4.8,
      downloads: 1234,
      description: "Complete guide to modern digital marketing strategies and tactics.",
      tags: ["Marketing", "Digital", "Strategy"]
    },
    {
      id: 2,
      title: "Business Strategy 2024",
      author: "Amanda Rodriguez",
      category: "Business",
      rating: 4.7,
      downloads: 987,
      description: "Strategic planning and execution for modern businesses.",
      tags: ["Strategy", "Business", "Planning"]
    },
    {
      id: 3,
      title: "Personal Finance Mastery",
      author: "Robert Brown",
      category: "Finance",
      rating: 4.5,
      downloads: 2341,
      description: "Build wealth and achieve financial freedom.",
      tags: ["Finance", "Money", "Investment"]
    },
    {
      id: 4,
      title: "Cryptocurrency Investing",
      author: "Alex Chen",
      category: "Finance",
      rating: 4.3,
      downloads: 1876,
      description: "Navigate the world of digital currencies and blockchain.",
      tags: ["Crypto", "Investment", "Blockchain"]
    },

    // Technology & Programming
    {
      id: 5,
      title: "Python Programming Guide",
      author: "Michael Chen",
      category: "Technology",
      rating: 4.9,
      downloads: 2156,
      description: "From beginner to advanced Python programming concepts.",
      tags: ["Python", "Programming", "Code"]
    },
    {
      id: 6,
      title: "Data Science Fundamentals",
      author: "Emily Watson",
      category: "Technology",
      rating: 4.8,
      downloads: 1876,
      description: "Introduction to data science and analytics.",
      tags: ["Data", "Science", "Analytics"]
    },
    {
      id: 7,
      title: "AI & Machine Learning",
      author: "Dr. James Liu",
      category: "Technology",
      rating: 4.6,
      downloads: 1543,
      description: "Understanding artificial intelligence and ML algorithms.",
      tags: ["AI", "Machine Learning", "Technology"]
    },
    {
      id: 8,
      title: "Web Development Bootcamp",
      author: "Sofia Martinez",
      category: "Technology",
      rating: 4.7,
      downloads: 2087,
      description: "Complete guide to modern web development.",
      tags: ["Web", "Development", "JavaScript"]
    },

    // Health & Wellness
    {
      id: 9,
      title: "Mindful Living",
      author: "Dr. Rachel Green",
      category: "Health",
      rating: 4.5,
      downloads: 1432,
      description: "Achieve balance and wellness through mindfulness.",
      tags: ["Mindfulness", "Wellness", "Mental Health"]
    },
    {
      id: 10,
      title: "Nutrition Guide 2024",
      author: "Mark Thompson",
      category: "Health",
      rating: 4.4,
      downloads: 1765,
      description: "Science-based approach to healthy eating.",
      tags: ["Nutrition", "Health", "Diet"]
    },
    {
      id: 11,
      title: "Fitness for Life",
      author: "Jessica Adams",
      category: "Health",
      rating: 4.6,
      downloads: 1298,
      description: "Create sustainable fitness habits that last.",
      tags: ["Fitness", "Exercise", "Health"]
    },

    // Science & Education
    {
      id: 12,
      title: "Climate Change Science",
      author: "Dr. Maria Rodriguez",
      category: "Science",
      rating: 4.7,
      downloads: 987,
      description: "Understanding our changing planet and climate systems.",
      tags: ["Climate", "Environment", "Science"]
    },
    {
      id: 13,
      title: "Space Exploration",
      author: "Dr. Neil Harrison",
      category: "Science",
      rating: 4.8,
      downloads: 1543,
      description: "Journey through the cosmos and space missions.",
      tags: ["Space", "Astronomy", "Exploration"]
    },
    {
      id: 14,
      title: "Quantum Physics Simplified",
      author: "Dr. Anna Volkov",
      category: "Science",
      rating: 4.5,
      downloads: 876,
      description: "Making quantum mechanics accessible to everyone.",
      tags: ["Physics", "Quantum", "Science"]
    },

    // Arts & Design
    {
      id: 15,
      title: "UI/UX Design Principles",
      author: "David Kim",
      category: "Design",
      rating: 4.6,
      downloads: 1543,
      description: "Essential principles for creating beautiful user interfaces.",
      tags: ["Design", "UI", "UX"]
    },
    {
      id: 16,
      title: "Digital Art Mastery",
      author: "Lisa Chang",
      category: "Arts",
      rating: 4.4,
      downloads: 1234,
      description: "Create stunning digital artwork from scratch.",
      tags: ["Art", "Digital", "Creative"]
    },
    {
      id: 17,
      title: "Photography Essentials",
      author: "Tom Wilson",
      category: "Arts",
      rating: 4.5,
      downloads: 1876,
      description: "Master the art of photography and composition.",
      tags: ["Photography", "Art", "Visual"]
    },

    // Fiction & Literature
    {
      id: 18,
      title: "The Time Traveler's Paradox",
      author: "Jennifer Blake",
      category: "Fiction",
      rating: 4.3,
      downloads: 2341,
      description: "A thrilling sci-fi adventure through time and space.",
      tags: ["Sci-Fi", "Adventure", "Time Travel"]
    },
    {
      id: 19,
      title: "Mysteries of the Old Manor",
      author: "Charles Blackwood",
      category: "Fiction",
      rating: 4.2,
      downloads: 1765,
      description: "A captivating mystery set in Victorian England.",
      tags: ["Mystery", "Victorian", "Thriller"]
    },
    {
      id: 20,
      title: "Love in the Digital Age",
      author: "Emma Foster",
      category: "Romance",
      rating: 4.4,
      downloads: 2087,
      description: "Modern romance in the era of social media.",
      tags: ["Romance", "Modern", "Relationships"]
    },

    // History & Biography
    {
      id: 21,
      title: "Ancient Civilizations",
      author: "Dr. Robert Hayes",
      category: "History",
      rating: 4.6,
      downloads: 1432,
      description: "Explore the great civilizations of the ancient world.",
      tags: ["History", "Ancient", "Civilization"]
    },
    {
      id: 22,
      title: "Leaders Who Changed History",
      author: "Margaret Stone",
      category: "Biography",
      rating: 4.5,
      downloads: 1298,
      description: "Stories of influential leaders throughout history.",
      tags: ["Biography", "Leadership", "History"]
    },

    // Self-Help & Psychology
    {
      id: 23,
      title: "Emotional Intelligence",
      author: "Dr. Sarah Mitchell",
      category: "Psychology",
      rating: 4.7,
      downloads: 1987,
      description: "Develop your emotional awareness and social skills.",
      tags: ["Psychology", "Emotions", "Self-Help"]
    },
    {
      id: 24,
      title: "Productivity Secrets",
      author: "James Parker",
      category: "Self-Help",
      rating: 4.4,
      downloads: 1654,
      description: "Maximize your efficiency and achieve your goals.",
      tags: ["Productivity", "Goals", "Success"]
    }
  ];

  const categories = [
    "all", "Business", "Technology", "Design", "Finance", "Health", 
    "Science", "Arts", "Fiction", "Romance", "History", "Biography", 
    "Psychology", "Self-Help"
  ];

  const filteredEbooks = allEbooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ebook.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ebook.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || ebook.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleManualUpdate = () => {
    setLastUpdated(new Date());
    toast({
      title: "Library Refreshed!",
      description: "The ebook collection has been manually updated.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Ebook Library</h1>
            <p className="text-gray-600">Discover and download from our premium collection</p>
          </div>
          <div className="text-right">
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualUpdate}
              className="mb-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Library
            </Button>
            <p className="text-xs text-gray-500">
              Last updated: {lastUpdated.toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-400">
              Auto-updates every 3 months
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search ebooks by title, author, or tags..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All" : category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-600">{allEbooks.length}</h3>
          <p className="text-sm text-blue-700">Total Books</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <h3 className="text-2xl font-bold text-green-600">{categories.length - 1}</h3>
          <p className="text-sm text-green-700">Genres</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <h3 className="text-2xl font-bold text-purple-600">{filteredEbooks.length}</h3>
          <p className="text-sm text-purple-700">Filtered Results</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <h3 className="text-2xl font-bold text-orange-600">
            {Math.round(allEbooks.reduce((acc, book) => acc + book.rating, 0) / allEbooks.length * 10) / 10}
          </h3>
          <p className="text-sm text-orange-700">Avg Rating</p>
        </div>
      </div>

      {/* Ebooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEbooks.map((ebook) => (
          <Card key={ebook.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-white" />
                </div>
                <Badge className="absolute top-4 right-4 bg-white text-blue-600">
                  {ebook.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {ebook.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 mb-3">
                by {ebook.author}
              </CardDescription>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {ebook.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{ebook.rating}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Download className="h-4 w-4 mr-1" />
                  {ebook.downloads.toLocaleString()}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {ebook.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={onDownload}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Now ($2.99)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEbooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No ebooks found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default EbookLibrary;
