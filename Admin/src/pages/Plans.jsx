import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Crown } from "lucide-react";
import { toast } from "react-hot-toast";
import { getPlans, createPlan, updatePlan, deletePlan } from "../services/api";

// ─── Constants ────────────────────────────────────────────────────────────────

const EMPTY = {
  name: "",
  title: "", // ✅ add

  price: "",
  duration: "month",
  features: "",
  popular: false,
  description: "",
};

const DURATION_LABEL = {
  month: "/ month",
  year: "/ year",
  "one-time": "one-time",
};

// ─── Modal Component ──────────────────────────────────────────────────────────

const Modal = ({ plan, onClose, onSave }) => {
  const [form, setForm] = useState(
    plan
      ? {
          ...plan,
          features: Array.isArray(plan.features)
            ? plan.features.join("\n")
            : plan.features,
        }
      : EMPTY,
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        title: form.name, // ✅ add this line
        price: Number(form.price),
        features:
          typeof form.features === "string"
            ? form.features
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean)
            : form.features,
      };
      if (plan?._id) {
        await updatePlan(plan._id, payload);
        toast.success("Plan updated!");
      } else {
        await createPlan(payload);
        toast.success("Plan created!");
      }
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save plan");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500 transition";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-white font-semibold text-base">
            {plan ? "Edit Plan" : "Add New Plan"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg p-1 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400">
              Plan Name *
            </label>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Pro, Basic, Enterprise"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400">
              Description
            </label>
            <input
              className={inputClass}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Short description of the plan"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">
                Price (₹) *
              </label>
              <input
                className={inputClass}
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="999"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">
                Duration
              </label>
              <select
                className={inputClass}
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              >
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
                <option value="one-time">One Time</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400">
              Features * (one per line)
            </label>
            <textarea
              className={`${inputClass} resize-none h-32`}
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              placeholder={`Unlimited projects\nPriority support\nCustom domain`}
              required
            />
          </div>

          {/* Popular Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.popular}
              onChange={(e) => setForm({ ...form, popular: e.target.checked })}
              className="w-4 h-4 accent-indigo-500"
            />
            <span className="text-sm text-gray-300">Mark as Popular</span>
          </label>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg text-sm text-gray-300 border border-gray-600 hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition disabled:opacity-50"
            >
              {saving ? "Saving..." : plan ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'add' | planObject
  const [deleting, setDeleting] = useState(null);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await getPlans();
      let data = [];
      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data?.plans)) data = res.data.plans;
      else if (Array.isArray(res.data?.data)) data = res.data.data;
      setPlans(data);
    } catch (err) {
      toast.error("Failed to load plans");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    setDeleting(id);
    try {
      await deletePlan(id);
      toast.success("Plan deleted!");
      fetchPlans();
    } catch {
      toast.error("Failed to delete plan");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Modal */}
      {modal && (
        <Modal
          plan={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSave={() => {
            setModal(null);
            fetchPlans();
          }}
        />
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Plans</h1>
          <p className="text-sm text-gray-400 mt-1 ml-1">
            {plans.length} total plans
          </p>
        </div>
        <button
          onClick={() => setModal("add")}
          className="flex items-center gap-2 bg-[#212121] hover:bg-[#303030] text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          <Plus size={16} /> Add Plan
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm">Loading plans...</p>
        </div>
      ) : /* Empty State */
      plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
            <Crown size={24} className="text-gray-500" />
          </div>
          <p className="text-white font-medium">No plans yet</p>
          <p className="text-gray-500 text-sm mt-1 mb-4">
            Create your first pricing plan.
          </p>
          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 bg-[#212121] hover:bg-[#303030] text-white text-sm px-4 py-2 rounded-lg transition"
          >
            <Plus size={15} /> Add Plan
          </button>
        </div>
      ) : (
        /* Plans Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const features = Array.isArray(plan.features) ? plan.features : [];
            const isDeleting = deleting === plan._id;

            return (
              <div
                key={plan._id}
                className={`relative bg-[#212121]  rounded-2xl p-5 flex flex-col gap-4 transition
                  ${plan.popular ? "border-indigo-500 ring-1 ring-indigo-500/40" : "border-gray-700 hover:border-gray-600"}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 text-xs font-semibold text-white bg-indigo-600 px-3 py-0.5 rounded-full shadow">
                    <Crown size={11} fill="currentColor" /> Most Popular
                  </span>
                )}
                <h3 className="text-white font-bold text-4xl">
                  {plan.title || plan.name} {/* ✅ dono handle karo */}
                </h3>
                {/* Plan Name + Actions */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold text-base">
                      {plan.name}
                    </h3>
                    {plan.description && (
                      <p className="text-gray-400 text-xs mt-0.5">
                        {plan.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setModal(plan)}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
                      aria-label="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(plan._id)}
                      disabled={isDeleting}
                      className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition disabled:opacity-40"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-extrabold text-white">
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-400 text-sm mb-1">
                    {DURATION_LABEL[plan.duration] || ""}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700" />

                {/* Features */}
                <ul className="space-y-2 flex-1">
                  {features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <Check
                        size={15}
                        className="text-indigo-400 mt-0.5 shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Plans;
