import React, { useState } from 'react';
import { 
  ShoppingBag, Search, User, ShieldCheck, Heart, Menu, X, Plus, Trash2, 
  ArrowLeft, Settings, Package, Image as ImageIcon, Phone, Mail, MessageCircle
} from 'lucide-react';

// Exact WhatsApp Catalogue Products + Initial Section Samples
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Dinning/parlour Nodic lights",
    section: "chandeliers",
    price: 65000,
    originalPrice: 70000,
    rating: 5.0,
    reviews: 48,
    description: "Worthy esthetic lights for parlour and dining room.",
    images: [
      "https://images.unsplash.com/photo-1543198126-a83850366b3f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    name: "3 step down chandelier",
    section: "chandeliers",
    price: 80000,
    originalPrice: 90000,
    rating: 4.9,
    reviews: 32,
    description: "3D step down pendant light, with modern generational ambient lighting.",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    name: "Drop lights (chandeliers)",
    section: "chandeliers",
    price: 45000,
    originalPrice: 50000,
    rating: 4.8,
    reviews: 19,
    description: "Visibility and calm in your room, multi-layered crystal finish.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    name: "Drop light (3 Colour)",
    section: "chandeliers",
    price: 45000,
    originalPrice: 50000,
    rating: 4.9,
    reviews: 27,
    description: "3 colour switchable drop light for versatile indoor moods.",
    images: [
      "https://images.unsplash.com/photo-1524484485487-4552277d3a5a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 5,
    name: "Pendant light",
    section: "chandeliers",
    price: 27000,
    originalPrice: 30000,
    rating: 4.7,
    reviews: 15,
    description: "Aesthetic for passage and small rooms.",
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 6,
    name: "Ultra-Slim 6W Round POP Ceiling Light",
    section: "pop",
    price: 3500,
    originalPrice: 4500,
    rating: 4.8,
    reviews: 110,
    description: "Energy-saving recessed downlight engineered for seamless false ceiling (POP) installations.",
    images: [
      "https://images.unsplash.com/photo-1550985616-118121c81e3a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 7,
    name: "12W POP Glass Border Designer Downlight",
    section: "pop",
    price: 7200,
    originalPrice: 8500,
    rating: 4.9,
    reviews: 85,
    description: "Crystal glass rimmed 12W POP ceiling fixture that adds extra luxury depth to ceilings.",
    images: [
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 8,
    name: "Flexible RGB Tape Light / Rope Light (5M)",
    section: "pop",
    price: 8500,
    originalPrice: 10000,
    rating: 4.6,
    reviews: 64,
    description: "High-density flexible LED rope light ideal for hidden cove lighting and tray POP ceilings.",
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 9,
    name: "Modern Crystal Touch Bedside Table Lamp",
    section: "tablelamps",
    price: 27000,
    originalPrice: 32000,
    rating: 4.9,
    reviews: 42,
    description: "Romantic warm LED bedside light with elegant crystal-style design.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 10,
    name: "3D Moon LED Wall Art Frame (60x120cm)",
    section: "wallart",
    price: 275000,
    originalPrice: 300000,
    rating: 5.0,
    reviews: 24,
    description: "Luxury illuminated moon wall art frame with versatile interior decoration.",
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState('shop');
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
  const [newOriginalPrice, setNewOriginalPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImages, setNewImages] = useState(['', '']);

  const whatsappPhone = "2349016453771";
  const contactEmail = "turkishclassic4@gmail.com";

  const getWhatsAppLink = (productName, price) => {
    const text = encodeURIComponent(`Hello T.CLASSIC LIGHTING! I am interested in purchasing "${productName}" priced at ₦${price.toLocaleString()}. Please let me know how to proceed.`);
    return `https://wa.me/${whatsappPhone}?text=${text}`;
  };

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
      originalPrice: newOriginalPrice ? Number(newOriginalPrice) : Number(newPrice),
      rating: 5.0,
      reviews: 1,
      description: newDesc || 'Modern lighting masterpiece by T.CLASSIC LIGHTING.',
      images: validImages
    };
    setProducts([product, ...products]);
    setNewTitle('');
    setNewPrice('');
    setNewOriginalPrice('');
    setNewDesc('');
    setNewImages(['', '']);
    alert('Product successfully added to store!');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      
      {/* Top Banner with direct contact details */}
      <div className="bg-black text-amber-400 text-xs py-2 px-4 flex flex-wrap items-center justify-between max-w-7xl mx-auto font-medium">
        <span>T.CLASSIC LIGHTING — <span className="italic text-white">We design to reflect your soul</span></span>
        <div className="flex items-center gap-4 text-gray-300">
          <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-amber-400">
            <Phone size={12} /> 09016453771
          </a>
          <a href={`mailto:${contactEmail}`} className="flex items-center gap-1 hover:text-amber-400">
            <Mail size={12} /> {contactEmail}
          </a>
        </div>
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
                placeholder="Search chandeliers, POP lights, bedside lamps, wall art..." 
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
          <div className="flex items-center gap-4">
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

      {/* Main Storefront View */}
      {currentView === 'shop' && !selectedProduct && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          
          {/* Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-amber-950 text-white p-8 md:p-12 mb-8 shadow-xl">
            <div className="max-w-xl">
              <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">New Generation Lighting</span>
              <h1 className="text-3xl md:text-5xl font-extrabold mt-3 mb-4 leading-tight">Illuminate Your World With Elegance</h1>
              <p className="text-gray-300 text-sm md:text-base mb-6">Explore our curated collections of crystal chandeliers, dropping lights, POP section lights, table lamps, and 3D LED wall art frames.</p>
              <div className="flex gap-3">
                <a 
                  href={`https://wa.me/${whatsappPhone}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition flex items-center gap-2"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
                <button 
                  onClick={() => setSelectedSection('chandeliers')} 
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 rounded-lg text-sm transition"
                >
                  Shop Catalog
                </button>
              </div>
            </div>
          </div>

          {/* Section Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {[
              { id: 'all', label: 'All Catalogue Products' },
              { id: 'chandeliers', label: 'Chandeliers & Nordic Dropping Lights' },
              { id: 'pop', label: 'POP Section (6W/12W Glass/Tape Light)' },
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

          {/* Product Grid matching WhatsApp Catalogue layout */}
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
                  <p className="text-xs text-gray-500 line-clamp-1 mb-2">{product.description}</p>
                  
                  <div className="flex items-baseline gap-2 mt-auto mb-3">
                    <span className="text-lg font-extrabold text-black">₦{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-semibold py-2 rounded transition"
                    >
                      Add Cart
                    </button>
                    <a 
                      href={getWhatsAppLink(product.name, product.price)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2 rounded transition text-center flex items-center justify-center gap-1"
                    >
                      <MessageCircle size={14} /> Buy Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      )}

      {/* Product Detail View */}
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
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-black text-amber-600">₦{selectedProduct.price.toLocaleString()}</span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-sm text-gray-400 line-through">₦{selectedProduct.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <a 
                  href={getWhatsAppLink(selectedProduct.name, selectedProduct.price)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} /> Order via WhatsApp (09016453771)
                </a>
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} /> Add to Store Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {currentView === 'admin' && (
        <div className="max-w-5xl mx-auto px-4 py-8">
          {!isAdminLoggedIn ? (
            <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
              <div className="text-center mb-6">
                <ShieldCheck size={40} className="mx-auto text-amber-500 mb-2" />
                <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); if (adminEmail && adminPassword) setIsAdminLoggedIn(true); }} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Admin Email" 
                  value={adminEmail} 
                  onChange={(e) => setAdminEmail(e.target.value)} 
                  className="w-full p-3 bg-gray-50 border rounded-lg text-sm"
                  required 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={adminPassword} 
                  onChange={(e) => setAdminPassword(e.target.value)} 
                  className="w-full p-3 bg-gray-50 border rounded-lg text-sm"
                  required 
                />
                <button type="submit" className="w-full bg-black text-amber-400 font-bold py-3 rounded-lg text-sm">Access Dashboard</button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-white p-6 rounded-2xl border">
                <h1 className="text-2xl font-extrabold">T.CLASSIC Admin Dashboard</h1>
                <button onClick={() => setIsAdminLoggedIn(false)} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold">Log Out</button>
              </div>

              {/* Add Product Form */}
              <div className="bg-white p-6 rounded-2xl border space-y-4">
                <h2 className="font-bold text-lg">Add Product to Catalogue</h2>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Product Name" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="p-3 bg-gray-50 border rounded-lg text-sm" required />
                    <select value={newSection} onChange={e => setNewSection(e.target.value)} className="p-3 bg-gray-50 border rounded-lg text-sm">
                      <option value="chandeliers">Chandeliers & Dropping Lights</option>
                      <option value="pop">POP Section</option>
                      <option value="tablelamps">Table & Bedside Lamps</option>
                      <option value="wallart">LED Wall Art Frame</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder="Discount Price (₦)" value={newPrice} onChange={e => setNewPrice(e.target.value)} className="p-3 bg-gray-50 border rounded-lg text-sm" required />
                    <input type="number" placeholder="Original Price (₦)" value={newOriginalPrice} onChange={e => setNewOriginalPrice(e.target.value)} className="p-3 bg-gray-50 border rounded-lg text-sm" />
                  </div>
                  <input type="url" placeholder="Primary Image URL" value={newImages[0]} onChange={e => setNewImages([e.target.value, newImages[1]])} className="w-full p-3 bg-gray-50 border rounded-lg text-sm" required />
                  <input type="url" placeholder="Secondary Image URL" value={newImages[1]} onChange={e => setNewImages([newImages[0], e.target.value])} className="w-full p-3 bg-gray-50 border rounded-lg text-sm" />
                  <textarea placeholder="Description" value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-lg text-sm" rows={2} />
                  <button type="submit" className="bg-amber-500 text-white font-bold px-6 py-3 rounded-lg text-sm">Publish Product</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="font-bold text-lg">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)}><X size={20} /></button>
              </div>
              <div className="py-4 space-y-3">
                {cart.length === 0 ? <p className="text-gray-400 text-center py-10">Cart is empty</p> : cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border">
                    <div>
                      <h4 className="font-semibold text-xs">{item.name}</h4>
                      <p className="text-sm font-bold mt-1">₦{item.price.toLocaleString()} x {item.qty}</p>
                    </div>
                    <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
            {cart.length > 0 && (
              <a 
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Hello T.CLASSIC LIGHTING! I want to order the following items from my cart:\n` + cart.map(i => `- ${i.name} (Qty: ${i.qty}) = ₦${(i.price * i.qty).toLocaleString()}`).join('\n') + `\nTotal: ₦${cart.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString()}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-green-600 text-white font-bold py-3 rounded-xl text-center block"
              >
                Checkout on WhatsApp
              </a>
            )}
          </div>
        </div>
      )}

      {/* Footer with Contact Info */}
      <footer className="bg-black text-white py-10 mt-16 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="text-lg font-black text-amber-400 mb-2">T.CLASSIC LIGHTING</h3>
            <p className="text-gray-400 italic text-xs mb-3">"We design to reflect your soul"</p>
            <p className="text-gray-400 text-xs">Modern generational lighting, crystal chandeliers, POP fittings, bedside lamps, and wall art frames.</p>
          </div>
          <div>
            <h4 className="font-bold uppercase text-xs text-amber-400 mb-3">Direct Contact</h4>
            <p className="text-gray-300 text-xs mb-1">WhatsApp: <strong>09016453771</strong></p>
            <p className="text-gray-300 text-xs mb-1">Email: <strong>turkishclassic4@gmail.com</strong></p>
          </div>
          <div>
            <h4 className="font-bold uppercase text-xs text-amber-400 mb-3">Customer Support</h4>
            <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer" className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded inline-block">
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}