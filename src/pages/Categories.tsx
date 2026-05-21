import React, { useState } from "react";
import { Trash2, Plus, Tag, Upload, X, ImageIcon } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const Categories: React.FC = () => {
  const { categories, addCategory, deleteCategory, adminSettings } = useAppContext();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Only image files are allowed.");
      return;
    }

    const cloudName = adminSettings?.cloudinaryCloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = adminSettings?.cloudinaryUploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      // Fallback: base64 local
      if (file.size > 200 * 1024) {
        setImageError("File too large. Configure Cloudinary in Settings for larger images.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => { if (typeof reader.result === "string") setImage(reader.result); };
      reader.readAsDataURL(file);
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed.");
      const data = await response.json();
      if (data.secure_url) setImage(data.secure_url);
    } catch (err: any) {
      setImageError(err.message || "Upload error.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const finalSlug = slug.trim().toLowerCase();
    if (!name.trim() || !finalSlug) {
      setError("Please fill in the Category Name.");
      return;
    }
    if (!image) {
      setError("Please upload a banner image.");
      return;
    }
    addCategory({ name: name.trim(), slug: finalSlug, image });
    setName("");
    setSlug("");
    setImage("");
  };

  const handleDelete = (slugToDelete: string, catName: string) => {
    const confirmDelete = window.confirm(`Delete category "${catName}"?`);
    if (confirmDelete) deleteCategory(slugToDelete);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading font-extrabold text-2xl uppercase tracking-wider text-white">
          Category Management
        </h1>
        <p className="text-xs text-neutral-450">
          Create and organize collections for the showroom catalog
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* CREATE FORM */}
        <div className="bg-[#0a0f1d] border border-neutral-900 rounded-3xl p-5 sm:p-6 space-y-4">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
            <Tag className="h-4 w-4 text-indigo-500" />
            <span>Create Category</span>
          </h3>

          {error && (
            <div className="text-[10px] text-rose-450 font-bold bg-rose-950/20 p-2 border border-rose-900/30 rounded-xl">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Category Name</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Crochet Tops"
                className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-650"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Slug (auto-generated)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                placeholder="e.g. crochet-tops"
                className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-650"
                required
              />
            </div>

            {/* Banner Image Upload */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1.5">
                <ImageIcon className="h-3 w-3" />
                <span>Banner Image</span>
              </label>

              {image ? (
                <div className="relative rounded-2xl overflow-hidden aspect-[3/2] bg-neutral-900">
                  <img src={image} alt="Banner preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-full text-white hover:bg-rose-900/80 transition cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <label className={`flex flex-col items-center justify-center gap-2 w-full aspect-[3/2] border-2 border-dashed rounded-2xl cursor-pointer transition ${uploading ? "border-indigo-500 bg-indigo-950/10" : "border-neutral-800 hover:border-indigo-600 bg-[#070b13]"}`}>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] text-indigo-400 font-bold">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 text-neutral-500" />
                      <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Click to upload</span>
                    </>
                  )}
                </label>
              )}

              {imageError && (
                <p className="text-[10px] text-rose-400 font-semibold">{imageError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3.5 bg-indigo-650 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-indigo-600/10 active:scale-95 disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Create Category</span>
            </button>
          </form>
        </div>

        {/* ACTIVE CATEGORIES LIST */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-neutral-400">
            Active Registry ({categories.length})
          </h3>

          {categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-neutral-600">
              <Tag className="h-8 w-8 mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider">No categories yet</p>
              <p className="text-[10px] mt-1">Create your first category on the left</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.slug}
                  className="group relative aspect-[3/2] rounded-3xl overflow-hidden border border-neutral-900 bg-neutral-900 flex flex-col justify-end p-5"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="relative z-10 flex items-center justify-between text-white w-full">
                    <div>
                      <h4 className="font-heading font-bold text-base uppercase tracking-wider">{cat.name}</h4>
                      <span className="text-[10px] text-neutral-400 font-medium">/{cat.slug}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(cat.slug, cat.name)}
                      className="p-2.5 rounded-xl bg-black/60 hover:bg-rose-950/80 text-neutral-400 hover:text-rose-450 border border-neutral-800 transition cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Categories;