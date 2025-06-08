
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, Star, Search, Filter } from "lucide-react";

interface EbookLibraryProps {
  onDownload: () => void;
}

const EbookLibrary = ({ onDownload }: EbookLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const ebooks = [
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
      title: "Python Programming Guide",
      author: "Michael Chen",
      category: "Technology",
      rating: 4.9,
      downloads: 2156,
      description: "From beginner to advanced Python programming concepts.",
      tags: ["Python", "Programming", "Code"]
    },
    {
      id: 3,
      title: "Business Strategy 2024",
      author: "Amanda Rodriguez",
      category: "Business",
      rating: 4.7,
      downloads: 987,
      description: "Strategic planning and execution for modern businesses.",
      tags: ["Strategy", "Business", "Planning"]
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      author: "David Kim",
      category: "Design",
      rating: 4.6,
      downloads: 1543,
      description: "Essential principles for creating beautiful user interfaces.",
      tags: ["Design", "UI", "UX"]
    },
    {
      id: 5,
      title: "Data Science Fundamentals",
      author: "Emily Watson",
      category: "Technology",
      rating: 4.8,
      downloads: 1876,
      description: "Introduction to data science and analytics.",
      tags: ["Data", "Science", "Analytics"]
    },
    {
      id: 6,
      title: "Personal Finance Mastery",
      author: "Robert Brown",
      category: "Finance",
      rating: 4.5,
      downloads: 2341,
      description: "Build wealth and achieve financial freedom.",
      tags: ["Finance", "Money", "Investment"]
    }
  ];

  const categories = ["all", "Business", "Technology", "Design", "Finance"];

  const filteredEbooks = ebooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ebook.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || ebook.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Ebook Library</h1>
        <p className="text-gray-600">Discover and download from our premium collection</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search ebooks by title or author..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <div className="flex gap-2">
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

      {/* Ebooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
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
                {ebook.tags.map((tag) => (
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
