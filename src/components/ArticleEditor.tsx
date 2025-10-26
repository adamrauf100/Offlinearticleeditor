import { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Save, Clock, Check } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

interface ArticleEditorProps {
  article: Article | null;
  onSave: (article: Article) => void;
  onAutoSave: (article: Article) => void;
}

export function ArticleEditor({ article, onSave, onAutoSave }: ArticleEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setCategory(article.category);
      setTags(article.tags.join(', '));
      setHasChanges(false);
      setSaveStatus('saved');
    }
  }, [article]);

  const handleChange = useCallback(() => {
    setHasChanges(true);
    setSaveStatus('unsaved');
  }, []);

  useEffect(() => {
    if (!hasChanges || !article) return;

    const timer = setTimeout(() => {
      setSaveStatus('saving');
      const updatedArticle: Article = {
        ...article,
        title: title || 'Untitled Article',
        content,
        category,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        updatedAt: Date.now(),
      };
      onAutoSave(updatedArticle);
      setTimeout(() => setSaveStatus('saved'), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, content, category, tags, hasChanges, article, onAutoSave]);

  const handleManualSave = () => {
    if (!article) return;
    setSaveStatus('saving');
    const updatedArticle: Article = {
      ...article,
      title: title || 'Untitled Article',
      content,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      updatedAt: Date.now(),
    };
    onSave(updatedArticle);
    setHasChanges(false);
    setTimeout(() => setSaveStatus('saved'), 500);
  };

  if (!article) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select an article to edit or create a new one
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          {saveStatus === 'saved' && (
            <Badge variant="outline" className="gap-1">
              <Check className="w-3 h-3" />
              Saved
            </Badge>
          )}
          {saveStatus === 'saving' && (
            <Badge variant="outline" className="gap-1">
              <Clock className="w-3 h-3 animate-spin" />
              Saving...
            </Badge>
          )}
          {saveStatus === 'unsaved' && (
            <Badge variant="secondary" className="gap-1">
              Unsaved changes
            </Badge>
          )}
        </div>
        <Button onClick={handleManualSave} size="sm" className="gap-2">
          <Save className="w-4 h-4" />
          Save Now
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleChange();
            }}
            placeholder="Article Title"
            className="text-3xl border-none px-0 focus-visible:ring-0"
          />

          <div className="flex gap-2">
            <Input
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                handleChange();
              }}
              placeholder="Category"
              className="flex-1"
            />
            <Input
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
                handleChange();
              }}
              placeholder="Tags (comma separated)"
              className="flex-1"
            />
          </div>

          <Textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              handleChange();
            }}
            placeholder="Start writing your article..."
            className="min-h-[500px] resize-none border-none px-0 focus-visible:ring-0"
          />
        </div>
      </div>
    </div>
  );
}
