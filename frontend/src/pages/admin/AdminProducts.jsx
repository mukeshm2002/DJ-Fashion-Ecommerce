import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import { INITIAL_PRODUCTS } from '../../data/seedData.js';
import { Plus, Edit, Trash2, Search, Filter, Image, X } from 'lucide-react';

export default function AdminProducts() {
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Dresses',
    price: 3499,
    comparePrice: 4299,
    stock: 15,
    fabric: '100% Organic Linen',
    description: '',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    status: 'Active',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop'],
  });

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products?status=Active');
      if (data.success && data.products.length > 0) {
        setProducts(data.products);
      } else {
        setProducts(INITIAL_PRODUCTS);
      }
    } catch (err) {
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Dresses',
      price: 3499,
      comparePrice: 4299,
      stock: 15,
      fabric: '100% Organic Linen',
      description: 'Crafted with premium natural fibers.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      status: 'Active',
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop'],
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
        addToast('Product updated successfully!', 'success');
      } else {
        await api.post('/products', formData);
        addToast('New product created!', 'success');
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      // Local fallback edit/create
      if (editingId) {
        setProducts(prev => prev.map(p => (p._id === editingId || p.slug === editingId ? { ...p, ...formData } : p)));
        addToast('Product updated locally!', 'success');
      } else {
        const newP = { ...formData, _id: `p-${Date.now()}`, slug: formData.name.toLowerCase().replace(/ /g, '-') };
        setProducts(prev => [newP, ...prev]);
        addToast('New product created locally!', 'success');
      }
      setIsModalOpen(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      addToast('Product removed', 'info');
      fetchProducts();
    } catch (err) {
      setProducts(prev => prev.filter(p => p._id !== id && p.slug !== id));
      addToast('Product removed locally', 'info');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? p.category.toLowerCase() === selectedCategory.toLowerCase() : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-border pb-6 gap-4">
        <div>
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">PRODUCT MANAGEMENT</span>
          <h1 className="font-serif text-3xl font-bold text-brand-dark mt-1">Catalog & Inventory Products</h1>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-btn shadow-floating flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search by product title or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 bg-brand-surface rounded-btn border border-brand-border focus:outline-none focus:border-brand-primary"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-xs font-semibold bg-brand-surface px-4 py-3 rounded-btn border border-brand-border focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="Dresses">Dresses</option>
          <option value="Co-ords">Co-ords</option>
          <option value="Tops">Tops</option>
          <option value="Bottoms">Bottoms</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-brand-surface rounded-card border border-brand-border shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-brand-bg text-brand-muted uppercase border-b border-brand-border font-bold">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40">
              {filteredProducts.map((p) => (
                <tr key={p._id || p.slug} className="hover:bg-brand-bg/40">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={p.images?.[0]} alt={p.name} className="w-12 h-14 object-cover rounded bg-brand-bg shrink-0" />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-brand-dark line-clamp-1">{p.name}</h4>
                      <span className="text-[10px] text-brand-muted">{p.fabric}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-brand-muted">{p.sku || 'DJ-DRS-001'}</td>
                  <td className="py-3 px-4 font-semibold text-brand-dark">{p.category}</td>
                  <td className="py-3 px-4 font-bold text-brand-primary">₹{p.price.toLocaleString()}</td>
                  <td className="py-3 px-4 font-bold">
                    <span className={p.stock <= 5 ? 'text-amber-600 font-extrabold' : 'text-brand-dark'}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                      p.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {p.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingId(p._id || p.slug);
                          setFormData({
                            name: p.name,
                            category: p.category,
                            price: p.price,
                            comparePrice: p.comparePrice || 0,
                            stock: p.stock,
                            fabric: p.fabric || '',
                            description: p.description || '',
                            sizes: p.sizes || ['S', 'M', 'L'],
                            status: p.status || 'Active',
                            images: p.images || ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop']
                          });
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 bg-brand-bg hover:bg-brand-secondary text-brand-dark rounded transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(p._id || p.slug)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-dark/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-surface max-w-xl w-full rounded-card shadow-modal border border-brand-border p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-brand-border">
              <h3 className="font-serif text-xl font-bold text-brand-dark">
                {editingId ? 'Edit Product Details' : 'Create New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-brand-dark block mb-1">Product Title</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seraphina Tiered Midi Dress"
                  required
                  className="w-full p-3 bg-brand-bg rounded-btn border border-brand-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-brand-dark block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 bg-brand-bg rounded-btn border border-brand-border font-semibold"
                  >
                    <option value="Dresses">Dresses</option>
                    <option value="Co-ords">Co-ords</option>
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-brand-dark block mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-3 bg-brand-bg rounded-btn border border-brand-border font-semibold"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-brand-dark block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                    className="w-full p-3 bg-brand-bg rounded-btn border border-brand-border"
                  />
                </div>

                <div>
                  <label className="font-bold text-brand-dark block mb-1">Compare Price (₹)</label>
                  <input
                    type="number"
                    value={formData.comparePrice}
                    onChange={(e) => setFormData({ ...formData, comparePrice: Number(e.target.value) })}
                    className="w-full p-3 bg-brand-bg rounded-btn border border-brand-border"
                  />
                </div>

                <div>
                  <label className="font-bold text-brand-dark block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    required
                    className="w-full p-3 bg-brand-bg rounded-btn border border-brand-border"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-brand-dark block mb-1">Fabric Composition</label>
                <input
                  type="text"
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  placeholder="70% Organic Linen, 30% Cotton"
                  className="w-full p-3 bg-brand-bg rounded-btn border border-brand-border"
                />
              </div>

              <div>
                <label className="font-bold text-brand-dark block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-brand-bg rounded-btn border border-brand-border resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary text-white font-bold text-xs uppercase py-3.5 rounded-btn shadow-floating"
              >
                Save Product Changes
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
