
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const normalizeCategory = useCallback((name) =>
    (name || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
  , []);

  const fetchCategoryItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const normalizedCategory = normalizeCategory(categoryName);
      const response = await api.get(`/category/${normalizedCategory}`);

      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.results)
        ? response.data.results
        : [];

      setItems(data);
    } catch (err) {
      console.error('Fetch Error:', err);
      setError(err?.response?.data?.detail || err?.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  }, [api, categoryName, normalizeCategory]);

  useEffect(() => {
    fetchCategoryItems();
    setSelectedItem(null);
  }, [categoryName, fetchCategoryItems]);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (selectedItem) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItem]);

  const LoadingState = (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-2xl text-green-600">Loading {categoryName} treks...</div>
    </div>
  );

  const ErrorState = (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-2xl text-red-600">Error: {error}</div>
        <button
          onClick={fetchCategoryItems}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
        >
          Retry
        </button>
      </div>
    </div>
  );

  const EmptyState = (
    <div className="min-h-screen bg-[#f5f5f5] px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-6">
        {categoryName} Treks
      </h1>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 text-center">
        <p className="text-gray-700 mb-4">No treks found for this category yet.</p>
        <p className="text-gray-500">Try a different category or check back later.</p>
        <div className="mt-6">
          <button
            onClick={fetchCategoryItems}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return LoadingState;
  if (error) return ErrorState;
  if (!items?.length) return (
    <>
      <Navbar />
      {EmptyState}
    </>
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5f5f5] px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">
          {categoryName} Treks
        </h1>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {items.map((item) => {
            const id = item.id || item._id || item.slug || item.title;
            return (
              <div
                key={id}
                onClick={() => openModal(item)}
                className="cursor-pointer hover:scale-105 transition-transform w-full max-w-sm"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
                  <div className="relative">
                    <img
                      src={item.image_url || '/default-trek-image.jpg'}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    {item?.badge && (
                      <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-[#4c6444] line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 line-clamp-3">{item.short_description}</p>

                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-600">
                      {item.duration && (
                        <div className="bg-gray-100 rounded px-2 py-1 text-center">{item.duration} days</div>
                      )}
                      {item.difficulty && (
                        <div className="bg-gray-100 rounded px-2 py-1 text-center">{item.difficulty}</div>
                      )}
                      {item.max_elevation && (
                        <div className="bg-gray-100 rounded px-2 py-1 text-center">{item.max_elevation} m</div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-lg font-semibold text-[#4c6444]">
                        {item.cost ? `$${Number(item.cost).toLocaleString()}` : '—'}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); openModal(item); }}
                        className="px-3 py-2 bg-[#4c6444] hover:bg-[#40563a] text-white rounded-lg text-sm"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedItem.image_url || '/default-trek-image.jpg'}
                alt={selectedItem.title}
                className="w-full h-72 object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 bg-white/90 hover:bg-white px-3 py-1 rounded-full text-gray-700 shadow"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6 grid gap-4">
              <h2 className="text-2xl font-bold text-[#4c6444]">{selectedItem.title}</h2>
              <p className="text-gray-700 leading-relaxed">{selectedItem.description || selectedItem.short_description}</p>

              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                {selectedItem.duration && (
                  <div className="bg-gray-100 rounded-lg p-3"><span className="font-semibold">Duration:</span> {selectedItem.duration} days</div>
                )}
                {selectedItem.difficulty && (
                  <div className="bg-gray-100 rounded-lg p-3"><span className="font-semibold">Difficulty:</span> {selectedItem.difficulty}</div>
                )}
                {selectedItem.max_elevation && (
                  <div className="bg-gray-100 rounded-lg p-3"><span className="font-semibold">Max Elevation:</span> {selectedItem.max_elevation} m</div>
                )}
                {selectedItem.region && (
                  <div className="bg-gray-100 rounded-lg p-3"><span className="font-semibold">Region:</span> {selectedItem.region}</div>
                )}
                {selectedItem.season && (
                  <div className="bg-gray-100 rounded-lg p-3"><span className="font-semibold">Best Season:</span> {selectedItem.season}</div>
                )}
                {selectedItem.cost && (
                  <div className="bg-gray-100 rounded-lg p-3"><span className="font-semibold">Estimated Cost:</span> ${Number(selectedItem.cost).toLocaleString()}</div>
                )}
              </div>

              {Array.isArray(selectedItem.tags) && selectedItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedItem.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs border border-emerald-200">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert('Saved to favorites (placeholder).');
                    closeModal();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#4c6444] hover:bg-[#3c5136] text-white"
                >
                  Save trek
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPage;
