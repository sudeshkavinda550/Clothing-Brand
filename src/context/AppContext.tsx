import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Category, Review, CartItem, AdminSettings } from "../types";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_REVIEWS, DEFAULT_SETTINGS } from "../data/dummyData";
import { db, auth, isFirebaseEnabled } from "../lib/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

interface AppContextType {
  products: Product[];
  categories: Category[];
  reviews: Review[];
  adminSettings: AdminSettings;
  cart: CartItem[];
  orders: { id: string; date: string; items: CartItem[]; totalPrice: number; status: string }[];
  adminLoggedIn: boolean;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  deleteCategory: (slug: string) => Promise<void>;
  updateSettings: (settings: AdminSettings) => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string, colorHex: string) => void;
  updateCartQuantity: (productId: string, size: string, colorHex: string, qty: number) => void;
  clearCart: () => void;
  submitOrder: () => Promise<void>;
  resetDatabase: () => Promise<void>;
  loginAdmin: (email: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<{ id: string; date: string; items: CartItem[]; totalPrice: number; status: string }[]>([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  // --- FIREBASE AUTH STATE LISTENER ---
  useEffect(() => {
    if (isFirebaseEnabled && auth) {
      const unsubAuth = onAuthStateChanged(auth, (user) => {
        setAdminLoggedIn(!!user);
      });
      return () => unsubAuth();
    } else {
      // Local fallback: check localStorage session
      const sessionAuth = localStorage.getItem("aura_admin_session");
      if (sessionAuth === "true") {
        setAdminLoggedIn(true);
      }
    }
  }, []);

  // --- DATABASE & REAL-TIME LISTENERS ---
  useEffect(() => {
    if (isFirebaseEnabled && db) {
      console.log("Firebase Mode Active - Subscribing to Firestore collections");

      const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
        const list: Product[] = [];
        snapshot.forEach((d) => { list.push({ id: d.id, ...d.data() } as Product); });
        if (list.length > 0) {
          setProducts(list);
        } else {
          // No products yet - admin will add them via the dashboard
          console.log("Firestore products empty. No seed products to add.");
          setProducts([]);
        }
      });

      const unsubCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
        const list: Category[] = [];
        snapshot.forEach((d) => {
          const cat = d.data() as Category;
          if (["tops", "dresses", "cardigans-sweaters", "accessories"].includes(cat.slug)) {
            console.log(`Auto-deleting hardcoded category: ${cat.slug}`);
            deleteDoc(doc(db!, "categories", cat.slug));
          } else {
            list.push(cat);
          }
        });
        setCategories(list);
      });

      const unsubReviews = onSnapshot(collection(db, "reviews"), (snapshot) => {
        const list: Review[] = [];
        snapshot.forEach((d) => { list.push({ id: d.id, ...d.data() } as Review); });
        if (list.length > 0) {
          const hasOldReviews = list.some(r => r.name === "Dilnoza S." || r.id === "rev-2" || r.id === "rev-3");
          if (hasOldReviews) {
            console.log("Old mock reviews detected in Firestore. Deleting and re-seeding...");
            list.forEach(async (r) => {
              if (r.id === "rev-1" || r.id === "rev-2" || r.id === "rev-3") {
                await deleteDoc(doc(db!, "reviews", r.id));
              }
            });
            MOCK_REVIEWS.forEach((rev) => { setDoc(doc(db!, "reviews", rev.id), rev); });
          } else {
            setReviews(list);
          }
        } else {
          console.log("Firestore reviews empty. Seeding defaults...");
          MOCK_REVIEWS.forEach((rev) => { setDoc(doc(db!, "reviews", rev.id), rev); });
        }
      });

      const unsubSettings = onSnapshot(collection(db, "settings"), (snapshot) => {
        const globalDoc = snapshot.docs.find((d) => d.id === "global");
        const globalSettings = globalDoc ? (globalDoc.data() as AdminSettings) : null;
        if (globalSettings) {
          if (globalSettings.businessName === "AURA Crochet" || globalSettings.businessName === "AURA Noir" || !globalSettings.businessName) {
            console.log("Old settings detected in Firestore. Migrating to Rashi Fashion...");
            const migrated: AdminSettings = {
              ...globalSettings,
              businessName: DEFAULT_SETTINGS.businessName,
              whatsappNumber: DEFAULT_SETTINGS.whatsappNumber,
              heroBannerImages: []
            };
            setDoc(doc(db!, "settings", "global"), migrated);
          } else {
            setAdminSettings(globalSettings);
          }
        } else {
          console.log("Firestore settings empty. Seeding defaults...");
          setDoc(doc(db!, "settings", "global"), DEFAULT_SETTINGS);
        }
      });

      const unsubOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((d) => { list.push({ id: d.id, ...d.data() }); });
        list.sort((a, b) => b.date.localeCompare(a.date));
        setOrders(list);
      });

      return () => {
        unsubProducts();
        unsubCategories();
        unsubReviews();
        unsubSettings();
        unsubOrders();
      };
    }

    // --- LOCAL STORAGE FALLBACK ---
    console.log("Local Storage Mode Active");

    const rashiSeeded = localStorage.getItem("rashi_seeded_v3");
    if (!rashiSeeded) {
       localStorage.removeItem("aura_products");
       localStorage.removeItem("aura_categories");
       localStorage.removeItem("aura_reviews");
       localStorage.removeItem("aura_settings");
       localStorage.removeItem("aura_cart");
       localStorage.removeItem("aura_orders");
       localStorage.setItem("rashi_seeded_v3", "true");
    }

    const savedProducts = localStorage.getItem("aura_products");
    if (savedProducts) { setProducts(JSON.parse(savedProducts)); }
    else { setProducts(MOCK_PRODUCTS); localStorage.setItem("aura_products", JSON.stringify(MOCK_PRODUCTS)); }

    const savedCategories = localStorage.getItem("aura_categories");
    if (savedCategories) { setCategories(JSON.parse(savedCategories)); }
    else { setCategories(MOCK_CATEGORIES); localStorage.setItem("aura_categories", JSON.stringify(MOCK_CATEGORIES)); }

    const savedReviews = localStorage.getItem("aura_reviews");
    if (savedReviews) { setReviews(JSON.parse(savedReviews)); }
    else { setReviews(MOCK_REVIEWS); localStorage.setItem("aura_reviews", JSON.stringify(MOCK_REVIEWS)); }

    const savedSettings = localStorage.getItem("aura_settings");
    if (savedSettings) { setAdminSettings(JSON.parse(savedSettings)); }
    else { setAdminSettings(DEFAULT_SETTINGS); localStorage.setItem("aura_settings", JSON.stringify(DEFAULT_SETTINGS)); }

    const savedOrders = localStorage.getItem("aura_orders");
    if (savedOrders) { setOrders(JSON.parse(savedOrders)); }
  }, []);

  // --- CART ---
  useEffect(() => {
    if (cart.length > 0) { localStorage.setItem("aura_cart", JSON.stringify(cart)); }
  }, [cart]);

  useEffect(() => {
    const savedCart = localStorage.getItem("aura_cart");
    if (savedCart) { setCart(JSON.parse(savedCart)); }
  }, []);

  const syncProductsLocal = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("aura_products", JSON.stringify(newProducts));
  };

  const syncCategoriesLocal = (newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem("aura_categories", JSON.stringify(newCategories));
  };

  // --- PRODUCTS CRUD ---
  const addProduct = async (p: Omit<Product, "id">) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = { ...p, id: newId };
    if (isFirebaseEnabled && db) {
      await setDoc(doc(db, "products", newId), newProduct);
    } else {
      syncProductsLocal([newProduct, ...products]);
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    if (isFirebaseEnabled && db) {
      await setDoc(doc(db, "products", id), updatedFields, { merge: true });
    } else {
      const updated = products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      syncProductsLocal(updated);
    }
  };

  const deleteProduct = async (id: string) => {
    if (isFirebaseEnabled && db) {
      await deleteDoc(doc(db, "products", id));
    } else {
      syncProductsLocal(products.filter((p) => p.id !== id));
    }
  };

  // --- CATEGORIES CRUD ---
  const addCategory = async (c: Category) => {
    if (categories.some((cat) => cat.slug === c.slug)) return;
    if (isFirebaseEnabled && db) {
      await setDoc(doc(db, "categories", c.slug), c);
    } else {
      syncCategoriesLocal([...categories, c]);
    }
  };

  const deleteCategory = async (slug: string) => {
    if (isFirebaseEnabled && db) {
      await deleteDoc(doc(db, "categories", slug));
    } else {
      syncCategoriesLocal(categories.filter((c) => c.slug !== slug));
    }
  };

  // --- SETTINGS ---
  const updateSettings = async (s: AdminSettings) => {
    if (isFirebaseEnabled && db) {
      await setDoc(doc(db, "settings", "global"), s);
    } else {
      setAdminSettings(s);
      localStorage.setItem("aura_settings", JSON.stringify(s));
    }
  };

  // --- CART OPERATIONS ---
  const addToCart = (item: CartItem) => {
    const existingIndex = cart.findIndex(
      (c) => c.product.id === item.product.id && c.selectedColor.hex === item.selectedColor.hex && c.selectedSize === item.selectedSize
    );
    let newCart = [...cart];
    if (existingIndex > -1) { newCart[existingIndex].quantity += item.quantity; }
    else { newCart.push(item); }
    setCart(newCart);
    localStorage.setItem("aura_cart", JSON.stringify(newCart));
  };

  const removeFromCart = (productId: string, size: string, colorHex: string) => {
    const filtered = cart.filter(
      (c) => !(c.product.id === productId && c.selectedSize === size && c.selectedColor.hex === colorHex)
    );
    setCart(filtered);
    localStorage.setItem("aura_cart", JSON.stringify(filtered));
  };

  const updateCartQuantity = (productId: string, size: string, colorHex: string, qty: number) => {
    if (qty <= 0) { removeFromCart(productId, size, colorHex); return; }
    const updated = cart.map((c) => {
      if (c.product.id === productId && c.selectedSize === size && c.selectedColor.hex === colorHex) {
        return { ...c, quantity: qty };
      }
      return c;
    });
    setCart(updated);
    localStorage.setItem("aura_cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("aura_cart", JSON.stringify([]));
  };

  // --- ORDER SUBMISSION ---
  const submitOrder = async () => {
    if (cart.length === 0) return;
    const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const orderId = `ord-${Date.now().toString().slice(-4)}`;
    const newOrder = { id: orderId, date: new Date().toISOString().split("T")[0], items: [...cart], totalPrice, status: "Pending" };

    if (isFirebaseEnabled && db) {
      await setDoc(doc(db, "orders", orderId), newOrder);
      for (const item of cart) {
        const productRef = doc(db, "products", item.product.id);
        const currentStock = products.find((prod) => prod.id === item.product.id)?.stock || 0;
        await setDoc(productRef, { stock: Math.max(0, currentStock - item.quantity) }, { merge: true });
      }
    } else {
      const newOrders = [newOrder, ...orders];
      setOrders(newOrders);
      localStorage.setItem("aura_orders", JSON.stringify(newOrders));
      const updatedProducts = products.map((prod) => {
        const cartMatches = cart.filter((ci) => ci.product.id === prod.id);
        if (cartMatches.length > 0) {
          const totalPurchased = cartMatches.reduce((acc, item) => acc + item.quantity, 0);
          return { ...prod, stock: Math.max(0, prod.stock - totalPurchased) };
        }
        return prod;
      });
      syncProductsLocal(updatedProducts);
    }
    clearCart();
  };

  // --- RESET DATABASE ---
  const resetDatabase = async () => {
    if (isFirebaseEnabled && db) {
      await setDoc(doc(db, "settings", "global"), DEFAULT_SETTINGS);
      for (const prod of products) { await deleteDoc(doc(db, "products", prod.id)); }
      MOCK_PRODUCTS.forEach((prod) => { setDoc(doc(db!, "products", prod.id), prod); });
      for (const cat of categories) { await deleteDoc(doc(db, "categories", cat.slug)); }
      MOCK_CATEGORIES.forEach((cat) => { setDoc(doc(db!, "categories", cat.slug), cat); });
      for (const rev of reviews) { await deleteDoc(doc(db, "reviews", rev.id)); }
      MOCK_REVIEWS.forEach((rev) => { setDoc(doc(db!, "reviews", rev.id), rev); });
      for (const ord of orders) { await deleteDoc(doc(db, "orders", ord.id)); }
    } else {
      localStorage.removeItem("aura_products");
      localStorage.removeItem("aura_categories");
      localStorage.removeItem("aura_reviews");
      localStorage.removeItem("aura_settings");
      localStorage.removeItem("aura_cart");
      localStorage.removeItem("aura_orders");
      setProducts(MOCK_PRODUCTS);
      setCategories(MOCK_CATEGORIES);
      setReviews(MOCK_REVIEWS);
      setAdminSettings(DEFAULT_SETTINGS);
      setCart([]);
      setOrders([]);
      localStorage.setItem("aura_products", JSON.stringify(MOCK_PRODUCTS));
      localStorage.setItem("aura_categories", JSON.stringify(MOCK_CATEGORIES));
      localStorage.setItem("aura_reviews", JSON.stringify(MOCK_REVIEWS));
      localStorage.setItem("aura_settings", JSON.stringify(DEFAULT_SETTINGS));
    }
  };

  // --- AUTH: Real Firebase Auth ---
  const loginAdmin = async (email: string, pass: string): Promise<boolean> => {
    if (isFirebaseEnabled && auth) {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
        return true;
      } catch (error) {
        console.error("Firebase login failed:", error);
        return false;
      }
    } else {
      // Local fallback
      const lowerEmail = email.toLowerCase().trim();
      if ((lowerEmail === "admin@rashifashion.com" && pass === "admin123") || (lowerEmail === "admin" && pass === "admin123")) {
        setAdminLoggedIn(true);
        localStorage.setItem("aura_admin_session", "true");
        return true;
      }
      return false;
    }
  };

  const logoutAdmin = () => {
    if (isFirebaseEnabled && auth) {
      signOut(auth);
    } else {
      setAdminLoggedIn(false);
      localStorage.removeItem("aura_admin_session");
    }
  };

  return (
    <AppContext.Provider value={{
      products, categories, reviews, adminSettings, cart, orders, adminLoggedIn,
      addProduct, updateProduct, deleteProduct, addCategory, deleteCategory,
      updateSettings, addToCart, removeFromCart, updateCartQuantity, clearCart,
      submitOrder, resetDatabase, loginAdmin, logoutAdmin
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppContextProvider");
  return context;
};
