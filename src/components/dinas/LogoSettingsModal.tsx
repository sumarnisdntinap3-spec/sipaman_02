import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MagetanLogo } from '../common/MagetanLogo';
import { Image, Upload, RotateCcw, X, Check, AlertCircle, Sparkles } from 'lucide-react';

interface LogoSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoSettingsModal: React.FC<LogoSettingsModalProps> = ({ isOpen, onClose }) => {
  const { customLogoUrl, setCustomLogoUrl, showToast } = useApp();
  const [previewUrl, setPreviewUrl] = useState<string | null>(customLogoUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Format berkas harus berupa gambar (PNG, JPG, SVG, WebP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('Ukuran file maksimal 2 MB.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewUrl(result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setErrorMsg('Gagal membaca berkas gambar.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setCustomLogoUrl(previewUrl);
    showToast('success', 'Logo Diperbarui', 'Logo resmi aplikasi berhasil diubah!');
    onClose();
  };

  const handleResetDefault = () => {
    setPreviewUrl(null);
    setCustomLogoUrl(null);
    showToast('info', 'Logo Default', 'Logo dikembalikan ke Logo Resmi Kabupaten Magetan.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-blue-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="text-sm font-bold">Ubah Logo Resmi Aplikasi</h3>
              <p className="text-[11px] text-blue-200">Pengaturan Tampilan Aplikasi SI PAMAN</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Logo Preview Box */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
            <div className="w-24 h-28 p-2 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center relative">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview Logo"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <MagetanLogo className="w-20 h-24" />
              )}
            </div>

            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-slate-800 block">
                {previewUrl ? 'Preview Logo Baru' : 'Logo Default (Kabupaten Magetan)'}
              </span>
              <p className="text-[11px] text-slate-500">
                Logo ini akan ditampilkan pada Banner Header, Login Modal, Dashboard, dan Cetak Surat Disposisi.
              </p>
            </div>
          </div>

          {/* Upload Button Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Pilih / Upload Gambar Logo Baru
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="appLogoFileInput"
              />
              <label
                htmlFor="appLogoFileInput"
                className="w-full py-2.5 px-4 rounded-xl border border-blue-300 bg-blue-50/60 hover:bg-blue-100/80 text-blue-900 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
              >
                <Upload className="w-4 h-4 text-blue-700" />
                <span>{isUploading ? 'Membaca Gambar...' : 'Upload Berkas Logo (PNG/JPG)'}</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleResetDefault}
              className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Kembalikan ke Logo Magetan"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>Reset Default</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Logo</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
