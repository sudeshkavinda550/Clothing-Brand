import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Upload, Plus, X, Check } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, categories, updateProduct, adminSettings } = useAppContext();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  // Find product
  const originalProduct = products.find((p) => p.id === id);

  // --- FORM STATES ---
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<{ name: string; hex: string }[]>([]);
  const [images, setImages] = useState<string[]>([]);

  // Variation items
  const availableSizesList = ["XS", "S", "M", "L", "XL", "XXL", "7", "8", "9", "10", "11", "12", "O/S"];
  const [customSize, setCustomSize] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#4f46e5");
  const [imageError, setImageError] = useState("");

  // Load product data into state on load
  useEffect(() => {
    if (originalProduct) {
      setName(originalProduct.name);
      setDescription(originalProduct.description);
      setCategory(originalProduct.category);
      setPrice(originalProduct.price);
      setStock(originalProduct.stock);
      setFeatured(originalProduct.featured);
      setTrending(originalProduct.trending);
      setSelectedSizes(originalProduct.sizes);
      setColors(originalProduct.colors);
      setImages(originalProduct.images);
    }
  }, [originalProduct]);

  if (!originalProduct) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-6 space-y-6">
        <h2 className="text-xl font-bold text-white">Product Registry Missing</h2>
        <p className="text-xs text-neutral-500">
          The requested product ID does not exist in the database catalog.
        </p>
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-650 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleAddCustomSize = () => {
    const size = customSize.trim().toUpperCase();
    if (size && !selectedSizes.includes(size)) {
      setSelectedSizes([...selectedSizes, size]);
      setCustomSize("");
    }
  };

  const handleAddColor = () => {
    const name = newColorName.trim();
    if (name) {
      if (colors.some((c) => c.hex.toLowerCase() === newColorHex.toLowerCase())) return;
      setColors([...colors, { name, hex: newColorHex }]);
      setNewColorName("");
    }
  };

  const handleRemoveColor = (hex: string) => {
    setColors(colors.filter((c) => c.hex !== hex));
  };

  // CLOUDINARY & LOCAL BASE64 IMAGE ENCODER UPLOAD HELPERS
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    const files = e.target.files;
    if (!files) return;

    const cloudName = adminSettings?.cloudinaryCloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = adminSettings?.cloudinaryUploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    // Check if Cloudinary is configured
    if (!cloudName || !uploadPreset) {
      setImageError("Configure Cloudinary settings in System Settings to upload images. Falling back to local files under 200KB.");
      
      // Fallback: local base64 files
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) {
          setImageError("Only image files are allowed.");
          return;
        }
        if (file.size > 200 * 1024) {
          setImageError("Local files must be under 200KB. Set up Cloudinary settings for larger images.");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
      return;
    }

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          setImageError("Only image files are allowed.");
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image to Cloudinary.");
        }

        const data = await response.json();
        if (data.secure_url) {
          setImages((prev) => [...prev, data.secure_url]);
        }
      }
    } catch (error: any) {
      console.error(error);
      setImageError(error.message || "An error occurred during Cloudinary upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImageError("");

    if (images.length === 0) {
      setImageError("Please add at least one product thumbnail image.");
      return;
    }

    updateProduct(originalProduct.id, {
      name,
      description,
      category,
      price,
      stock,
      featured,
      trending,
      sizes: selectedSizes,
      colors,
      images
    });

    navigate("/admin/dashboard");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin/dashboard"
          className="p-2 border border-neutral-900 rounded-full hover:bg-neutral-800 text-neutral-400 transition"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-heading font-extrabold text-xl uppercase tracking-wider text-white">
            Edit Product
          </h1>
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
            Modify registry details for: {originalProduct.name}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0a0f1d] border border-neutral-900 rounded-3xl p-5 sm:p-6 space-y-4">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Acid Wash Heavyweight Tee"
                className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-650"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide sizing recommendations, GSM specifications, fabric washes, materials details, and laundry care instructions..."
                rows={5}
                className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-650 resize-none"
                required
              />
            </div>

            {/* Price, Stock, Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-neutral-450 focus:outline-none cursor-pointer focus:border-indigo-650"
                >
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  Price ({adminSettings?.currencySymbol || "$"})
                </label>
                <input
                  type="number"
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-650 font-mono"
                  required
                />
              </div>

              {/* Stock */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  Stock Units
                </label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-[#070b13] border border-neutral-900 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-650 font-mono"
                  required
                />
              </div>
            </div>

            {/* Size checklist */}
            <div className="space-y-2 pt-2">
              <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {availableSizesList.map((size) => {
                  const active = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`h-9 px-3 border rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1 ${
                        active
                          ? "bg-indigo-600/25 border-indigo-600 text-white"
                          : "border-neutral-900 text-neutral-450 hover:border-neutral-800"
                      }`}
                    >
                      {active && <Check className="h-3 w-3 text-indigo-400" />}
                      <span>{size}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom size input */}
              <div className="flex gap-2 items-center max-w-xs pt-1.5">
                <input
                  type="text"
                  placeholder="Custom size (e.g. XXL)"
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  className="px-3 py-2 bg-[#070b13] border border-neutral-900 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-650"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSize}
                  className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Colors Card */}
          <div className="bg-[#0a0f1d] border border-neutral-900 rounded-3xl p-5 sm:p-6 space-y-4">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Apparel Colors
            </h3>

            {/* List */}
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <div
                  key={c.hex}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-neutral-900 bg-[#070b13] text-[10px] text-neutral-300 font-semibold"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                  <span>{c.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(c.hex)}
                    className="text-neutral-500 hover:text-rose-450 cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add color */}
            <div className="space-y-2 border-t border-neutral-900 pt-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Color Name (e.g. Cobalt)"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#070b13] border border-neutral-900 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-650"
                />
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-10 h-8 p-0 bg-transparent border-0 rounded-xl cursor-pointer"
                />
              </div>
              <button
                type="button"
                onClick={handleAddColor}
                className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs text-white font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Add Color Variant
              </button>
            </div>
          </div>

          {/* Images Card */}
          <div className="bg-[#0a0f1d] border border-neutral-900 rounded-3xl p-5 sm:p-6 space-y-4">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Product Gallery
            </h3>

            {imageError && (
              <div className="text-[10px] text-rose-450 font-bold bg-rose-950/20 p-2 rounded-xl border border-rose-900/30">
                {imageError}
              </div>
            )}

            {/* Thumbnails */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group"
                  >
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-rose-600 text-white rounded-full transition cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload File Input */}
            <div className="border border-dashed border-neutral-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-indigo-600/40 transition cursor-pointer relative group">
              {uploading ? (
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-400 mb-2"></div>
                  <span className="text-[10px] text-neutral-455 font-bold uppercase tracking-wider">
                    Uploading to Cloudinary...
                  </span>
                </div>
              ) : (
                <>
                  <Upload className="h-5 w-5 text-neutral-500 group-hover:text-indigo-400 transition mb-1" />
                  <span className="text-[10px] text-neutral-450 font-bold uppercase tracking-wider">
                    Upload Images
                  </span>
                  <span className="text-[9px] text-neutral-600 mt-0.5">
                    PNG, JPG via Cloudinary
                  </span>
                </>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
            </div>

            {/* Badges */}
            <div className="border-t border-neutral-900 pt-4 flex gap-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded border-neutral-900 bg-[#070b13] text-indigo-600 focus:ring-0"
                />
                <span>Featured badge</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trending}
                  onChange={(e) => setTrending(e.target.checked)}
                  className="rounded border-neutral-900 bg-[#070b13] text-indigo-600 focus:ring-0"
                />
                <span>Trending badge</span>
              </label>
            </div>
          </div>

          {/* Form Submit */}
          <div className="flex gap-3">
            <Link
              to="/admin/dashboard"
              className="flex-1 py-3.5 bg-transparent border border-neutral-900 hover:bg-[#12192c]/50 text-white rounded-full text-xs font-bold uppercase tracking-wider text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 py-3.5 bg-indigo-650 hover:bg-indigo-500 text-white rounded-full text-xs font-bold uppercase tracking-wider transition active:scale-95 cursor-pointer"
            >
              Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditProduct;