import React, { useState, useEffect } from "react";
import { Save, RefreshCw, AlertTriangle, HelpCircle, Upload, X, ImageIcon } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const Settings: React.FC = () => {
  const { adminSettings, updateSettings, resetDatabase } = useAppContext();

  const [businessName, setBusinessName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [defaultGreeting, setDefaultGreeting] = useState("");
  const [cloudinaryCloudName, setCloudinaryCloudName] = useState("");
  const [cloudinaryUploadPreset, setCloudinaryUploadPreset] = useState("");
  const [heroBannerImages, setHeroBannerImages] = useState<string[]>([]);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [bannerError, setBannerError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (adminSettings) {
      setBusinessName(adminSettings.businessName);
      setWhatsappNumber(adminSettings.whatsappNumber);
      setCurrencySymbol(adminSettings.currencySymbol);
      setDefaultGreeting(adminSettings.greetingTemplate);
      setCloudinaryCloudName(adminSettings.cloudinaryCloudName || "");
      setCloudinaryUploadPreset(adminSettings.cloudinaryUploadPreset || "");
      setHeroBannerImages(adminSettings.heroBannerImages || []);
    }
  }, [adminSettings]);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerError("");
    const files = e.target.files;
    if (!files) return;

    const cloudName = cloudinaryCloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = cloudinaryUploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const MAX_CLOUDINARY_SIZE = 5 * 1024 * 1024; // 5MB
    const MAX_LOCAL_SIZE = 1 * 1024 * 1024; // 1MB

    setBannerUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;

        if (!cloudName || !uploadPreset) {
          if (file.size > MAX_LOCAL_SIZE) {
            setBannerError("Local files must be under 1MB to avoid database size limits. Configure Cloudinary first.");
            continue;
          }
          const reader = new FileReader();
          reader.onloadend = () => { if (typeof reader.result === "string") setHeroBannerImages(prev => [...prev, reader.result as string]); };
          reader.readAsDataURL(file);
          continue;
        }

        if (file.size > MAX_CLOUDINARY_SIZE) {
          setBannerError(`Image "${file.name}" exceeds the 5MB size limit.`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: formData });
        if (!res.ok) throw new Error("Upload failed.");
        const data = await res.json();
        if (data.secure_url) setHeroBannerImages(prev => [...prev, data.secure_url]);
      }
    } catch (err: any) {
      setBannerError(err.message || "Upload error.");
    } finally {
      setBannerUploading(false);
    }
  };

  const removeBannerImage = (idx: number) => {
    setHeroBannerImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    updateSettings({
      businessName: businessName.trim(),
      whatsappNumber: whatsappNumber.trim().replace(/[^\d+]/g, ""),
      currencySymbol: currencySymbol.trim(),
      greetingTemplate: defaultGreeting.trim(),
      cloudinaryCloudName: cloudinaryCloudName.trim(),
      cloudinaryUploadPreset: cloudinaryUploadPreset.trim(),
      heroBannerImages,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleReset = () => {
    const confirmReset = window.confirm("CAUTION: This will reset ALL products, categories, and settings to defaults. Cannot be undone. Proceed?");
    if (confirmReset) { resetDatabase(); alert("Database reset to defaults."); }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading font-extrabold text-2xl uppercase tracking-wider text-white">System Settings</h1>
        <p className="text-xs text-neutral-455">Configure shop metadata, WhatsApp routing, banner images, and media settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-[#0a0f1d] border border-neutral-900 rounded-3xl p-5 sm:p-6 space-y-5">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">General Configuration</h3>

          {saveSuccess && (
            <div className="text-[10px] text-emerald-450 font-bold bg-emerald-950/20 p-2.5 border border-emerald-900/30 rounded-xl">
              ✓ Settings saved successfully!
            </div>
          )}

          {/* Business Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Brand / Business Name</label>
            <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-650" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1.5">
                <span>WhatsApp Number</span>
                <span className="group relative text-neutral-600 hover:text-neutral-400 cursor-help">
                  <HelpCircle className="h-3 w-3" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 w-44 bg-neutral-950 text-neutral-455 text-[9px] p-2 rounded-xl border border-neutral-850 opacity-0 pointer-events-none group-hover:opacity-100 transition z-10 leading-normal">
                    Include country code, no spaces (e.g. +94775286498)
                  </span>
                </span>
              </label>
              <input type="text" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+94775286498"
                className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-650 font-mono" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Currency Symbol</label>
              <input type="text" value={currencySymbol} onChange={(e) => setCurrencySymbol(e.target.value)}
                placeholder="Rs."
                className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-650 font-mono" required />
            </div>
          </div>

          {/* Greeting template */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">WhatsApp Order Template</label>
            <textarea value={defaultGreeting} onChange={(e) => setDefaultGreeting(e.target.value)} rows={3}
              className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-650 resize-none font-mono text-[11px]" required />
          </div>

          {/* ─── HERO BANNER IMAGES ─── */}
          <div className="border-t border-neutral-900/60 pt-5 space-y-3">
            <div>
              <h4 className="font-heading font-bold text-[10px] uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5" />
                Hero Banner Images
              </h4>
              <p className="text-[10px] text-neutral-500 mt-1">
                Upload images for the homepage hero slideshow. Recommended: wide landscape photos (1920×1080+).
              </p>
            </div>

            {/* Existing banner images */}
            {heroBannerImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {heroBannerImages.map((img, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden aspect-video bg-neutral-900">
                    <img src={img} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeBannerImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 bg-black/70 rounded-full text-white hover:bg-rose-900/80 transition cursor-pointer">
                      <X className="h-3 w-3" />
                    </button>
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold text-white/60 bg-black/50 px-1.5 py-0.5 rounded-full">
                      {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Upload button */}
            <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed rounded-2xl cursor-pointer transition ${bannerUploading ? "border-indigo-500 bg-indigo-950/10" : "border-neutral-800 hover:border-indigo-600 bg-[#070b13]"}`}>
              <input type="file" accept="image/*" multiple onChange={handleBannerUpload} className="hidden" disabled={bannerUploading} />
              {bannerUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] text-indigo-400 font-bold">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 text-neutral-500" />
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                    {heroBannerImages.length > 0 ? "Add more banner images" : "Upload banner images"}
                  </span>
                </>
              )}
            </label>
            {bannerError && <p className="text-[10px] text-rose-400 font-semibold">{bannerError}</p>}
          </div>

          {/* Cloudinary Config */}
          <div className="border-t border-neutral-900/60 pt-5 space-y-4">
            <div>
              <h4 className="font-heading font-bold text-[10px] uppercase tracking-wider text-indigo-400">Cloudinary Media Config</h4>
              <p className="text-[10px] text-neutral-450 leading-relaxed mt-1">
                Your Cloudinary credentials for image uploads across the admin panel.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Cloud Name</label>
                <input type="text" value={cloudinaryCloudName} onChange={(e) => setCloudinaryCloudName(e.target.value)}
                  placeholder="e.g. divjuliq6"
                  className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-650 font-mono" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Upload Preset</label>
                <input type="text" value={cloudinaryUploadPreset} onChange={(e) => setCloudinaryUploadPreset(e.target.value)}
                  placeholder="e.g. clothing-shop"
                  className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-650 font-mono" />
              </div>
            </div>
          </div>

          <button type="submit"
            className="w-full py-3.5 bg-indigo-650 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-indigo-600/10 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1.5">
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </form>

        {/* DANGER ZONE */}
        <div className="bg-[#0a0f1d] border border-neutral-900 rounded-3xl p-5 sm:p-6 space-y-4">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-rose-455 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4" />
            <span>Danger Zone</span>
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Reset all products, categories, and settings to factory defaults.
          </p>
          <button onClick={handleReset}
            className="w-full py-3 border border-rose-900/60 hover:bg-rose-950/20 text-rose-400 hover:text-rose-350 text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5">
            <RefreshCw className="h-4 w-4" />
            <span>Reset Demo DB</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Settings;
