import { useEffect, useMemo, useState } from 'react';
import { Trash2, RefreshCcw } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { clearInquiries, deleteInquiry, getInquiries } from '../../../utils/inquiries';

const formatDateTime = (iso) => {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString();
  } catch {
    return iso;
  }
};

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  const refresh = () => {
    setInquiries(getInquiries());
  };

  useEffect(() => {
    refresh();
  }, []);

  const total = inquiries.length;

  const hasAny = total > 0;

  const columns = useMemo(
    () => [
      { key: 'createdAt', label: 'Received' },
      { key: 'name', label: 'Name' },
      { key: 'business', label: 'Business' },
      { key: 'phone', label: 'Phone' },
      { key: 'city', label: 'City' },
      { key: 'message', label: 'Message' },
    ],
    [],
  );

  const onDelete = (id) => {
    const next = deleteInquiry(id);
    setInquiries(next);
  };

  const onClearAll = () => {
    clearInquiries();
    refresh();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-hg-gold-light">Inquiries</h1>
          <p className="text-sm text-hg-gold-beige mt-1">All landing page inquiries ({total})</p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={refresh}
            className="px-4 py-2 rounded-lg font-medium border border-hg-dark-gold/40 hover:border-hg-accent/60 hover:text-hg-cream transition-colors text-hg-gold-beige bg-[#1A1610] flex items-center gap-2"
          >
            <RefreshCcw size={16} /> Refresh
          </button>
          <Button onClick={onClearAll} className="!bg-hg-danger !text-white hover:!brightness-110">
            <Trash2 size={16} className="mr-2" /> Clear All
          </Button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-hg-dark-gold/40 overflow-hidden">
        {hasAny ? (
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-sm">
              <thead className="bg-[#2A2621]/50 border-b border-hg-dark-gold/30">
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} className="text-left px-4 py-3 text-hg-gold-light font-semibold whitespace-nowrap">
                      {c.label}
                    </th>
                  ))}
                  <th className="text-left px-4 py-3 text-hg-gold-light font-semibold whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="border-b border-hg-dark-gold/20 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-hg-gold-beige whitespace-nowrap">{formatDateTime(inq.createdAt)}</td>
                    <td className="px-4 py-3 text-hg-cream whitespace-nowrap">{inq.name}</td>
                    <td className="px-4 py-3 text-hg-gold-beige whitespace-nowrap">{inq.business}</td>
                    <td className="px-4 py-3 text-hg-gold-beige whitespace-nowrap">{inq.phone}</td>
                    <td className="px-4 py-3 text-hg-gold-beige whitespace-nowrap">{inq.city}</td>
                    <td className="px-4 py-3 text-hg-gold-beige">{inq.message || '—'}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => onDelete(inq.id)}
                        className="px-3 py-1.5 rounded-lg border border-hg-dark-gold/40 hover:border-hg-danger/80 hover:text-hg-danger transition-colors text-hg-gold-beige bg-[#1A1610] flex items-center gap-2"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-hg-gold-beige">
            No inquiries yet. Submit one from the landing page Contact section.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;

