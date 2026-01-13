import { useState, useEffect } from 'react';
import { 
  Store, 
  Calendar, 
  Clock, 
  AlertCircle, 
  Loader2,
  Mail,
  Phone
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../apiConfig';

const API_BASE = `${API_BASE_URL}/api`;

export default function InactiveShopsPage() {
  const { t } = useTranslation();

  const [userId, setUserId] = useState(null);
  const [inactiveShops, setInactiveShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "EMPLOYEE") {
      setError(t('inactiveShops.error.notEmployee'));
      setLoading(false);
      return;
    }

    const employeeUserId = localStorage.getItem("employeeUserId");

    if (!employeeUserId) {
      setError(t('inactiveShops.error.noUserId'));
      setLoading(false);
      return;
    }

    setUserId(employeeUserId);
  }, [t]);

  useEffect(() => {
    if (!userId) return;

    const fetchInactiveShops = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `${API_BASE}/employee/my-inactive-shops?userId=${userId}`,
          { 
            method: 'GET',
            credentials: 'include' 
          }
        );

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || t('inactiveShops.error.loadFailed'));
        }

        const data = await res.json();
        setInactiveShops(data);
      } catch (err) {
        setError(err.message || t('inactiveShops.error.generic'));
      } finally {
        setLoading(false);
      }
    };

    fetchInactiveShops();
  }, [userId, t]);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="bg-white rounded shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {t('inactiveShops.title')}
              </h1>
              <p className="text-gray-600 mt-1">
                {t('inactiveShops.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
            <p className="text-gray-600">{t('inactiveShops.loading')}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && inactiveShops.length === 0 && (
          <div className="bg-white rounded shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('inactiveShops.empty.title')}
            </h3>
            <p className="text-gray-600">
              {t('inactiveShops.empty.message')}
            </p>
          </div>
        )}

        {/* Inactive Shops Grid */}
        {!loading && !error && inactiveShops.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inactiveShops.map((shop) => (
              <div
                key={shop.shopId}
                className="bg-white rounded shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Header with Logo */}
                <div className="relative bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center">
                  {shop.shopLogoBase64 ? (
                    <img
                      src={`data:image/png;base64,${shop.shopLogoBase64}`}
                      alt={`${shop.shopName} logo`}
                      className="object-contain rounded shadow-lg bg-white"
                      onError={(e) => {
                        e.target.src = ''; 
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <Store className="w-20 h-20 text-white/70" />
                  )}

                  {/* Inactive Badge */}
                  <span className="absolute top-4 right-4 bg-white/25 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white border border-white/30">
                    {t('inactiveShops.status.inactive')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                      {shop.shopName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {shop.companyName}
                    </p>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>
                        <strong>{t('inactiveShops.labels.joined')}:</strong>{' '}
                        {formatDate(shop.joinDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>
                        <strong>{t('inactiveShops.labels.deactivated')}:</strong>{' '}
                        {formatDate(shop.resignDate) || "—"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-2">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {shop.companyEmail || "—"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {shop.companyPhone || "—"}
                    </p>
                  </div>

                  <div className="pt-2 text-center text-sm text-gray-500 italic">
                    {t('inactiveShops.contactMessage')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}