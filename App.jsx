import React, { useState } from 'react';
import { 
  ShoppingBag, Search, User, ShieldCheck, Heart, Menu, X, Plus, Trash2, 
  ChevronRight, ArrowLeft, Settings, Package, DollarSign, Edit3, Image as ImageIcon, CheckCircle 
} from 'lucide-react';

// Initial Mock Products across the 4 required sections with multi-image support
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Imperial Crystal Chandelier 8-Tier",
    section: "chandeliers",
    price: 185000,
    rating: 4.9,
    reviews: 124,
    description: "Breathtaking K9 crystal chandelier designed to cast prismatic reflections across modern living spaces. Built with high-grade polished stainless steel.",
    images: [
      "https://images.unsplash.com/photo-1543198126-a83850366b3f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    name: "Nordic Minimalist Ring Dropping Light",
    section: "chandeliers",
    price: 65000,
    rating: 4.7,
    reviews: 89,
    description: "Sleek aluminum pendant dropping light with integrated dimmable warm LED strips. Perfect for dining islands and executive offices.",
    images: [
      "https://images.unsplash.com/photo-1524484485487-4552277d3a5a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    name: "Ultra-Slim 6W Round POP Ceiling Light",
    section: "pop",
    price: 3500,
    rating: 4.8,
    reviews: 310,
    description: "Energy-saving recessed downlight engineered for seamless false ceiling (POP) installations. Bright 6W output with anti-glare diffuser.",
    images: [
      "https://images.unsplash.com/photo-1550985616-118121c81e3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    name: "12W POP Glass Border Designer Downlight",
    section: "pop",
    price: 7200,
    rating: 4.9,
    reviews: 215,
    description: "Crystal glass rimmed 12W POP ceiling fixture that adds an extra touch of luxury and illumination depth to hallways and living rooms.",
    images: [
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 5,
    name: "Flexible RGB Tape Light / Rope Light (5M)",
    section: "pop",
    price: 8500,
    rating: 4.6,
    reviews: 142,
    description: "High-density flexible LED rope light ideal for hidden cove lighting, tray ceilings, and dramatic architectural contouring.",
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550985616-118121c81e3a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 6,
    name: "Jumia-Curated Artisanal Ceramic Bedside Lamp",
    section: "tablelamps",
    price: 24500,
    rating: 4.9,
    reviews: 98,
    description: "Hand-glazed ceramic base paired with a linen drum shade. Creates a calming, soul-soothing ambiance for your bedroom retreat.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 7,
    name: "Modern Touch-Control Minimalist Table Lamp",
    section: "tablelamps",
    price: 19000,
    rating: 4.7,
    reviews: 76,
    description: "Sleek metallic bedside lamp featuring 3-level touch brightness dimming and USB charging port built into the base.",
    images: [
      "https://images.unsplash.com/photo-1534349762230-e0cadfefcffc?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 8,
    name: "Geometric 3D LED Wall Art Frame",
    section: "wallart",
    price: 45000,
    rating: 5.0,
    reviews: 64,
    description: "Illuminated metallic wall sculpture combining abstract modern artistry with tunable ambient LED backlighting.",
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561069933-758b7a54fa34?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState('shop'); // 'shop', 'admin', 'detail'
  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Admin & Products State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSection, setNewSection] = useState('chandeliers');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImages, setNewImages] = useState(['', '']);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const filteredProducts = products.filter(p => {
    const matchesSection = selectedSection === 'all' || p.section === selectedSection;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesSearch;
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const validImages = newImages.filter(img => img.trim() !== '');
    if (!newTitle || !newPrice || validImages.length === 0) {
      alert('Please fill in product name, price, and at least one image URL.');
      return;
    }
    const product = {
      id: Date.now(),
      name: newTitle,
      section: newSection,
      price: Number(newPrice),
      rating: 5.0,
      reviews: 1,
      description: newDesc || 'Modern lighting masterpiece by T.CLASSIC LIGHTING.',
      images: validImages
    };
    setProducts([product, ...products]);
    setNewTitle('');
    setNewPrice('');
    setNewDesc('');
    setNewImages(['', '']);
    alert('Product successfully added to store!');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      
      {/* Top Banner */}
      <div className="bg-black text-amber-400 text-xs py-2 px-4 text-center font-medium tracking-wider">
        T.CLASSIC LIGHTING — <span className="italic text-white">We design to reflect your soul</span>
      </div>

      {/* Main Header / Jumia Style Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button onClick={() => { setCurrentView('shop'); setSelectedProduct(null); }} className="text-left">
              <span className="text-xl font-black text-black tracking-tight">T.CLASSIC<span className="text-amber-600">.</span></span>
              <span className="block text-[10px] tracking-widest text-gray-500 uppercase">Lighting Shop</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-200 focus-within:border-amber-500">
              <span className="pl-3 text-gray-400"><Search size={18} /></span>
              <input 
                type="text" 
                placeholder="Search chandeliers, POP lights, table lamps, wall art..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-3 bg-transparent text-sm focus:outline-none"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 text-sm font-semibold transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button 
              onClick={() => setCurrentView('admin')}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-amber-600 transition"
            >
              <User size={18} />
              <span>{isAdminLoggedIn ? 'Dashboard' : 'Admin Login'}</span>
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
            >
              <ShoppingBag size={18} />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-amber-400 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {currentView === 'shop' && !selectedProduct && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          
          {/* Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-amber-950 text-white p-8 md:p-12 mb-8 shadow-xl">
            <div className="max-w-xl">
              <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">New Generation Lighting</span>
              <h1 className="text-3xl md:text-5xl font-extrabold mt-3 mb-4 leading-tight">Illuminate Your World With Elegance</h1>
              <p className="text-gray-300 text-sm md:text-base mb-6">Explore our curated collections of crystal chandeliers, modern POP fittings, artisan bedside lamps, and LED wall art frames.</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedSection('chandeliers')} 
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 rounded-lg text-sm transition"
                >
                  Shop Chandeliers
                </button>
                <button 
                  onClick={() => setSelectedSection('pop')} 
                  className="border border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition"
                >
                  POP Collection
                </button>
              </div>
            </div>
          </div>

          {/* Section Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'chandeliers', label: 'Crystal Chandeliers & Dropping Lights' },
              { id: 'pop', label: 'POP Section (6W/12W/Tape)' },
              { id: 'tablelamps', label: 'Table & Bedside Lamps' },
              { id: 'wallart', label: 'LED Wall Art Frames' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedSection(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition shadow-sm ${
                  selectedSection === tab.id 
                    ? 'bg-black text-amber-400 font-bold' 
                    : 'bg-white text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-200 flex flex-col group cursor-pointer"
                onClick={() => { setSelectedProduct(product); setActiveImageIndex(0); }}
              >
                {/* Image box with multi-picture indicator */}
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {product.images.length > 1 && (
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                      <ImageIcon size={12} /> {product.images.length} photos
                    </span>
                  )}
                  <span className="absolute top-2 left-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {product.section}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-amber-600 transition">
                    {product.name}
                  </h3>
                  <div className="text-lg font-extrabold text-black mt-auto mb-2">
                    ₦{product.price.toLocaleString()}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">⭐ {product.rating} ({product.reviews})</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition shadow-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      )}

      {/* Product Detail View (with Multi-Picture Gallery) */}
      {selectedProduct && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button 
            onClick={() => setSelectedProduct(null)} 
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black mb-6 transition"
          >
            <ArrowLeft size={16} /> Back to Products
          </button>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            
            {/* Gallery Section */}
            <div className="flex flex-col gap-4">
              <div className="h-96 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-inner">
                <img 
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        activeImageIndex === idx ? 'border-amber-500 scale-95 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedProduct.section}
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3 mb-2">
                  {selectedProduct.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span>⭐ {selectedProduct.rating} / 5.0</span>
                  <span>•</span>
                  <span>{selectedProduct.reviews} verified reviews</span>
                </div>
                <div className="text-3xl font-black text-amber-600 mb-6">
                  ₦{selectedProduct.price.toLocaleString()}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} /> Add to Cart
                </button>
                <div className="text-xs text-gray-500 text-center">
                  🔒 Secure checkout powered by T.CLASSIC LIGHTING • Nationwide delivery available.
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Admin Dashboard / Login View */}
      {currentView === 'admin' && (
        <div className="max-w-5xl mx-auto px-4 py-8">
          {!isAdminLoggedIn ? (
            <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
              <div className="text-center mb-6">
                <ShieldCheck size={40} className="mx-auto text-amber-500 mb-2" />
                <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard Login</h2>
                <p className="text-xs text-gray-500 mt-1">Manage your inventory, pricing, and multi-picture product galleries.</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (adminEmail && adminPassword) {
                  setIsAdminLoggedIn(true);
                } else {
                  alert('Please enter your admin credentials.');
                }
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Admin Email or Username</label>
                  <input 
                    type="text" 
                    placeholder="e.g. admin@tclassiclighting.com" 
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-amber-400 font-bold py-3 rounded-lg text-sm transition shadow"
                >
                  Access Dashboard
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Dashboard Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900">T.CLASSIC LIGHTING Admin</h1>
                  <p className="text-xs text-gray-500">Manage store catalog, pricing, and multi-image sections.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setCurrentView('shop')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg transition"
                  >
                    View Storefront
                  </button>
                  <button 
                    onClick={() => setIsAdminLoggedIn(false)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold px-4 py-2 rounded-lg transition"
                  >
                    Log Out
                  </button>
                </div>
              </div>

              {/* Add Product Form */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Plus size={20} className="text-amber-500" /> Add New Modern Lighting Product
                </h2>
                
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Product Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Nordic Gold Pendant Light" 
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Section Category</label>
                      <select 
                        value={newSection}
                        onChange={(e) => setNewSection(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                      >
                        <option value="chandeliers">Crystal Chandeliers & Dropping Lights</option>
                        <option value="pop">POP Section (6W/12W/Tape)</option>
                        <option value="tablelamps">Table & Bedside Lamps</option>
                        <option value="wallart">LED Wall Art Frame</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Price (₦)</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 50000" 
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Primary Image URL</label>
                      <input 
                        type="url" 
                        placeholder="https://images.unsplash.com/..." 
                        value={newImages[0]}
                        onChange={(e) => {
                          const updated = [...newImages];
                          updated[0] = e.target.value;
                          setNewImages(updated);
                        }}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Secondary Image URL (Multi-Picture Support)</label>
                    <input 
                      type="url" 
                      placeholder="https://images.unsplash.com/... (additional angle)" 
                      value={newImages[1]}
                      onChange={(e) => {
                        const updated = [...newImages];
                        updated[1] = e.target.value;
                        setNewImages(updated);
                      }}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Description</label>
                    <textarea 
                      placeholder="Describe the lighting fixture..." 
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      rows={3}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg text-sm transition shadow"
                  >
                    Publish Product to Store
                  </button>
                </form>
              </div>

              {/* Inventory List */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Current Store Inventory ({products.length} items)</h2>
                <div className="space-y-3">
                  {products.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900">{p.name}</h4>
                          <span className="text-xs text-amber-600 uppercase font-medium">{p.section} • ₦{p.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setProducts(products.filter(item => item.id !== p.id))}
                        className="text-red-500 hover:text-red-700 p-2 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag size={20} className="text-amber-500" /> Your Cart
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <ShoppingBag size={48} className="mx-auto mb-3 opacity-30" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <img src={item.images[0]} alt="" className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-xs text-gray-900 line-clamp-1">{item.name}</h4>
                      <div className="text-sm font-bold text-black mt-1">₦{item.price.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 mt-1">Qty: {item.qty}</div>
                    </div>
                    <button 
                      onClick={() => setCart(cart.filter(i => i.id !== item.id))}
                      className="text-gray-400 hover:text-red-600 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>Subtotal:</span>
                  <span className="text-amber-600">
                    ₦{cart.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString()}
                  </span>
                </div>
                <button 
                  onClick={() => { alert('Order placed successfully! Thank you for shopping with T.CLASSIC LIGHTING.'); setCart([]); setIsCartOpen(false); }}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition shadow"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-10 mt-16 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="text-lg font-black text-amber-400 mb-2">T.CLASSIC LIGHTING</h3>
            <p className="text-gray-400 italic text-xs mb-3">"We design to reflect your soul"</p>
            <p className="text-gray-400 text-xs">Your premier destination for modern generational lighting, crystal chandeliers, POP fittings, and artisan bedside lamps.</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-xs text-amber-400 mb-3">Quick Sections</h4>
            <ul className="space-y-2 text-gray-300 text-xs">
              <li><button onClick={() => setSelectedSection('chandeliers')}>Crystal Chandeliers & Dropping Lights</button></li>
              <li><button onClick={() => setSelectedSection('pop')}>POP Section (6W, 12W Glass, Tape Light)</button></li>
              <li><button onClick={() => setSelectedSection('tablelamps')}>Table & Bedside Lamps</button></li>
              <li><button onClick={() => setSelectedSection('wallart')}>LED Wall Art Frames</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-xs text-amber-400 mb-3">Customer Support</h4>
            <p className="text-gray-400 text-xs mb-2">Need assistance with architectural lighting design or installation? Contact our expert engineering team.</p>
            <p className="text-amber-400 font-semibold text-xs">support@tclassiclighting.com</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-6 mt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} T.CLASSIC LIGHTING. All rights reserved.
        </div>
      </footer>

    </div>
  );
}