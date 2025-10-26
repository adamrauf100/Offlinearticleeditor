# Offline WikiEditor

A fully functional offline article writing and syncing tool designed for areas with poor connectivity. Write, organize, and manage your articles entirely offline with automatic saving and data persistence.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![Priority](https://img.shields.io/badge/priority-high-red.svg)

## 🌟 Features

### Core Functionality
- **📝 Rich Article Editor** - Write articles with title, content, categories, and tags
- **💾 Auto-Save** - Automatic saving every 2 seconds with visual status indicators
- **🔍 Full-Text Search** - Search across all articles by title, content, category, or tags
- **📊 Statistics Dashboard** - Track articles, word count, categories, and tags
- **📤 Import/Export** - Backup and restore your data with JSON export/import
- **🗑️ Article Management** - Create, edit, and delete articles with confirmation dialogs
- **💾 Local Storage** - All data persists in browser's local storage for offline access

### User Experience
- **⚡ Real-time Status** - See save status (Saved, Saving, Unsaved changes)
- **🎨 Modern UI** - Clean teal/emerald design with gradient accents
- **🔄 Responsive Layout** - Sidebar navigation with full-width editor
- **📱 Toast Notifications** - User-friendly feedback for all actions
- **⌨�� Keyboard-Friendly** - Efficient workflow with auto-focus

## 🛠️ Technology Stack

- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling with custom design tokens
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon system
- **Sonner** - Elegant toast notifications
- **Local Storage API** - Offline data persistence

## 📁 Project Structure

```
├── App.tsx                      # Main application component
├── components/
│   ├── ArticleEditor.tsx        # Rich text editor with auto-save
│   ├── ArticleList.tsx          # Sidebar with article list & search
│   ├── StatsPanel.tsx           # Statistics dashboard
│   └── ui/                      # shadcn/ui components
├── styles/
│   └── globals.css              # Global styles and design tokens
└── README.md                    # Project documentation
```

## 🚀 Getting Started

### Using the Application

1. **Create Your First Article**
   - Click the "New Article" button in the sidebar
   - Start typing your article title and content
   - Content auto-saves every 2 seconds

2. **Organize Your Work**
   - Add categories to group related articles
   - Use tags (comma-separated) for flexible organization
   - View statistics in the dashboard

3. **Search & Find**
   - Use the search bar to find articles by any text
   - Searches across titles, content, categories, and tags
   - Results update in real-time

4. **Backup Your Data**
   - Click "Export" to download all articles as JSON
   - Click "Import" to restore from a backup file
   - Perfect for syncing between devices or creating backups

## 💡 Key Components

### ArticleEditor
The main editing interface featuring:
- Title input with large text styling
- Category and tags input fields
- Large textarea for article content
- Auto-save with visual status indicators
- Manual save button for instant saving

### ArticleList
Sidebar navigation component with:
- Searchable article list
- Offline status indicator
- Article preview cards with metadata
- Delete confirmation dialogs
- Responsive hover effects

### StatsPanel
Dashboard displaying:
- Total articles count
- Total word count across all articles
- Number of categories
- Number of unique tags

## 💾 Data Storage

All articles are stored in the browser's `localStorage` under the key `wikieditor_articles`. Each article contains:

```typescript
{
  id: string;           // Unique timestamp-based ID
  title: string;        // Article title
  content: string;      // Article content
  category: string;     // Single category
  tags: string[];       // Array of tags
  createdAt: number;    // Creation timestamp
  updatedAt: number;    // Last update timestamp
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Teal (600-700 range)
- **Secondary**: Emerald (50-700 range)
- **Accent**: Cyan (100-600 range)
- **Status Colors**: 
  - Success: Emerald
  - Warning: Amber
  - Error: Red

### Icons
- **PenTool**: Main app icon
- **BookMarked**: Articles icon
- **CloudOff**: Offline status
- **BookText, TrendingUp, FolderTree, Hash**: Statistics icons
- **CheckCircle2, Loader2**: Save status icons

## 🔮 Future Enhancements

- [ ] Markdown support with live preview
- [ ] Rich text formatting toolbar (bold, italic, lists, etc.)
- [ ] Version history and restore points
- [ ] Export to PDF/Markdown/HTML formats
- [ ] Article templates for common document types
- [ ] Dark mode theme support
- [ ] Collaborative editing with conflict resolution
- [ ] Sync with cloud storage (Dropbox, Google Drive)
- [ ] Mobile-responsive design improvements
- [ ] Keyboard shortcuts for power users

## 📝 Development Notes

### Auto-Save Implementation
Articles auto-save 2 seconds after the last change. The save status indicator shows:
- **Saved** (Green): All changes persisted
- **Saving** (Teal): Currently saving
- **Unsaved changes** (Amber): Changes pending

### Search Algorithm
Full-text search checks:
1. Article titles (case-insensitive)
2. Article content
3. Categories
4. All tags

### Data Persistence
- Data saves to localStorage on every article update
- Import/export uses JSON format for portability
- No server required - completely offline

## 🤝 Contributing

This project is designed for offline use in low-connectivity areas. Ideas for improvement:
- Better offline indicators
- More robust data export formats
- Enhanced search capabilities
- Accessibility improvements

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

Built with:
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Made for offline article writers everywhere** ✍️
