import { ChevronLeft, ChevronRight, Clock, Folder } from 'lucide-react';

interface SidebarProps {
  language: 'ko' | 'en';
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ language, collapsed, setCollapsed }: SidebarProps) {
  const translations = {
    ko: {
      workspace: '워크스페이스',
      history: '히스토리',
    },
    en: {
      workspace: 'Workspace',
      history: 'History',
    },
  };

  const t = translations[language];

  return (
    <aside
      className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-white border-r border-lime-200 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 bg-white border border-lime-300 rounded-full p-1 hover:bg-lime-50 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-lime-700" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-lime-700" />
        )}
      </button>

      {/* Sidebar Content */}
      <div className="pt-8 px-4">
        <div className="space-y-2">
          {/* Workspace */}
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-lime-50 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <Folder className="w-5 h-5 text-lime-700 flex-shrink-0" />
            {!collapsed && <span>{t.workspace}</span>}
          </button>

          {/* History */}
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-lime-50 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <Clock className="w-5 h-5 text-lime-700 flex-shrink-0" />
            {!collapsed && <span>{t.history}</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
