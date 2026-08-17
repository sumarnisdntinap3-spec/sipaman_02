import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />,
        };

        const borders = {
          success: 'border-emerald-200 bg-emerald-50/95 text-emerald-900',
          error: 'border-red-200 bg-red-50/95 text-red-900',
          warning: 'border-amber-200 bg-amber-50/95 text-amber-900',
          info: 'border-sky-200 bg-sky-50/95 text-sky-900',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${borders[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold leading-snug">{toast.title}</h4>
              <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-black/5 transition-colors text-slate-500 hover:text-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
