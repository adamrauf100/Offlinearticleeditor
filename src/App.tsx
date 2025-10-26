import { useState, useEffect } from 'react';
import { ArticleEditor } from './components/ArticleEditor';
import { ArticleList } from './components/ArticleList';
import { StatsPanel } from './components/StatsPanel';
import { Button } from './components/ui/button';
import { Download, Upload, Settings, BookOpen } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'wikieditor_articles';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setArticles(parsed);
        if (parsed.length > 0) {
          setSelectedArticleId(parsed[0].id);
        }
      } catch (error) {
        console.error('Failed to load articles:', error);
        toast.error('Failed to load articles');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    }
  }, [articles, isLoading]);

  const handleCreateArticle = () => {
    const newArticle: Article = {
      id: Date.now().toString(),
      title: '',
      content: '',
      category: '',
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setArticles([newArticle, ...articles]);
    setSelectedArticleId(newArticle.id);
    toast.success('New article created');
  };

  const handleSaveArticle = (updatedArticle: Article) => {
    setArticles((prev) =>
      prev.map((article) => (article.id === updatedArticle.id ? updatedArticle : article))
    );
    toast.success('Article saved');
  };

  const handleAutoSave = (updatedArticle: Article) => {
    setArticles((prev) =>
      prev.map((article) => (article.id === updatedArticle.id ? updatedArticle : article))
    );
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
    if (selectedArticleId === id) {
      setSelectedArticleId(articles.length > 1 ? articles[0].id : null);
    }
    toast.success('Article deleted');
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(articles, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wikieditor-backup-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully');
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target?.result as string);
            setArticles(imported);
            toast.success('Data imported successfully');
          } catch (error) {
            toast.error('Failed to import data');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const selectedArticle = articles.find((article) => article.id === selectedArticleId) || null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-pulse" />
          <div>Loading WikiEditor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Toaster />
      
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-xl">Offline WikiEditor</h1>
            <p className="text-sm text-gray-500">Write and sync articles offline</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportData} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleImportData} className="gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </header>

      <StatsPanel articles={articles} />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 flex-shrink-0">
          <ArticleList
            articles={articles}
            selectedArticleId={selectedArticleId}
            onSelectArticle={setSelectedArticleId}
            onCreateArticle={handleCreateArticle}
            onDeleteArticle={handleDeleteArticle}
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <ArticleEditor
            article={selectedArticle}
            onSave={handleSaveArticle}
            onAutoSave={handleAutoSave}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
