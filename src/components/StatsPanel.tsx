import { Card } from './ui/card';
import { FileText, Tag, FolderOpen, Clock } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

interface StatsPanelProps {
  articles: Article[];
}

export function StatsPanel({ articles }: StatsPanelProps) {
  const totalArticles = articles.length;
  const totalWords = articles.reduce((sum, article) => {
    return sum + article.content.split(/\s+/).filter(Boolean).length;
  }, 0);
  const categories = new Set(articles.map((a) => a.category).filter(Boolean)).size;
  const allTags = new Set(articles.flatMap((a) => a.tags)).size;
  const lastEdited = articles.length > 0
    ? new Date(Math.max(...articles.map((a) => a.updatedAt))).toLocaleString()
    : 'Never';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 border-b">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Articles</div>
            <div className="text-2xl">{totalArticles}</div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <FileText className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Words</div>
            <div className="text-2xl">{totalWords.toLocaleString()}</div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FolderOpen className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Categories</div>
            <div className="text-2xl">{categories}</div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Tag className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Tags</div>
            <div className="text-2xl">{allTags}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
