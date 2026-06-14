"use client";

import { useEffect, useState } from "react";
import { Tag, X, ChevronRight, CheckCircle, Lock, Loader2 } from "lucide-react";

interface Coupon {
  _id: string;
  code: string;
  type: string;
  value: number;
  label: string;
  minCartValue: number;
  eligible: boolean;
  reason: string;
  discountAmount: number;
}

interface Props {
  cartTotal: number;
  onApply: (code: string, discountAmount: number, message: string) => void;
  appliedCode: string | null;
}

// ── Eligibility confirm popup ────────────────────────────────────────────────
function EligibilityPopup({
  coupon,
  onConfirm,
  onCancel,
}: {
  coupon: Coupon;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="bg-green-50 p-4 rounded-full">
            <CheckCircle size={32} className="text-green-500" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-shop-dark-green font-medium mb-1">
              Offer Available
            </p>
            <h3 className="text-xl font-semibold text-darkColor">
              You&apos;re eligible! 🎉
            </h3>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 w-full">
            <p className="text-2xl font-bold text-darkColor">{coupon.label}</p>
            <p className="text-sm text-gray-500 mt-1">
              using code{" "}
              <span className="font-semibold text-darkColor">{coupon.code}</span>
            </p>
            {coupon.discountAmount > 0 && (
              <p className="text-green-600 font-semibold mt-2">
                You save ₹{coupon.discountAmount} on this order ✨
              </p>
            )}
          </div>

          {coupon.type === "first_order" && (
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2 w-full">
              🎁 This is a first-order exclusive offer. It won&apos;t be available after this order.
            </p>
          )}

          <button
            onClick={onConfirm}
            className="w-full bg-shop-dark-green text-white py-3 rounded-2xl font-medium hover:opacity-90 transition"
          >
            Apply {coupon.code}
          </button>

          <button
            onClick={onCancel}
            className="text-sm text-gray-400 hover:text-gray-600 transition"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main drawer ──────────────────────────────────────────────────────────────
export default function CouponDrawer({ cartTotal, onApply, appliedCode }: Props) {
  const [open, setOpen] = useState(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [manualLoading, setManualLoading] = useState(false);

  // ── Fetch coupons when drawer opens ─────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/get-coupons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartTotal }),
        });
        const data = await res.json();
        setCoupons(data.coupons || []);
      } catch {
        setCoupons([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, [open, cartTotal]);

  // ── Handle coupon card click ─────────────────────────────────────────────
  const handleCouponClick = (coupon: Coupon) => {
    if (!coupon.eligible) return;
    setSelectedCoupon(coupon);
  };

  // ── Confirm apply from popup ─────────────────────────────────────────────
  const handleConfirmApply = () => {
    if (!selectedCoupon) return;
    onApply(
      selectedCoupon.code,
      selectedCoupon.discountAmount,
      `${selectedCoupon.code} applied! You saved ₹${selectedCoupon.discountAmount} ✨`
    );
    setSelectedCoupon(null);
    setOpen(false);
  };

  // ── Manual code apply ────────────────────────────────────────────────────
  const handleManualApply = async () => {
    if (!manualCode.trim()) return;
    setManualLoading(true);
    try {
      const res = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: manualCode.trim().toUpperCase(),
          cartTotal,
        }),
      });
      const data = await res.json();
      if (data.valid) {
        setSelectedCoupon({
          _id: "manual",
          code: manualCode.trim().toUpperCase(),
          type: data.couponType,
          value: data.couponValue,
          label: data.couponType === "flat"
            ? `₹${data.couponValue} off`
            : `${data.couponValue}% off`,
          minCartValue: 0,
          eligible: true,
          reason: "",
          discountAmount: data.discountAmount,
        });
      } else {
        // Show error inline
        setCoupons((prev) => {
          const exists = prev.find((c) => c.code === manualCode.trim().toUpperCase());
          if (exists) return prev;
          return [
            {
              _id: "manual-invalid",
              code: manualCode.trim().toUpperCase(),
              type: "unknown",
              value: 0,
              label: "",
              minCartValue: 0,
              eligible: false,
              reason: data.message,
              discountAmount: 0,
            },
            ...prev,
          ];
        });
      }
    } catch {
      // silent
    } finally {
      setManualLoading(false);
    }
  };

  return (
    <>
      {/* ── Eligibility popup ──────────────────────────────────────────── */}
      {selectedCoupon && (
        <EligibilityPopup
          coupon={selectedCoupon}
          onConfirm={handleConfirmApply}
          onCancel={() => setSelectedCoupon(null)}
        />
      )}

      {/* ── Drawer trigger ─────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between border border-dashed border-shop-dark-green/50 rounded-2xl px-4 py-3 hover:border-shop-dark-green hover:bg-green-50/30 transition-all group"
      >
        <div className="flex items-center gap-3">
          <Tag size={18} className="text-shop-dark-green" />
          <div className="text-left">
            {appliedCode ? (
              <>
                <p className="text-sm font-semibold text-green-600">
                  {appliedCode} applied ✨
                </p>
                <p className="text-xs text-gray-400">Tap to change</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-darkColor">
                  Apply Coupon
                </p>
                <p className="text-xs text-gray-400">
                  View all offers & deals
                </p>
              </>
            )}
          </div>
        </div>
        <ChevronRight
          size={18}
          className="text-gray-400 group-hover:text-shop-dark-green transition"
        />
      </button>

      {/* ── Drawer overlay ─────────────────────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-in-right">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-lg font-semibold text-darkColor">
                  Offers & Coupons
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {coupons.filter((c) => c.eligible).length} offer
                  {coupons.filter((c) => c.eligible).length !== 1 ? "s" : ""}{" "}
                  available for you
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Manual code input */}
            <div className="px-6 py-4 border-b bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && handleManualApply()}
                  className="flex-1 border border-gray-200 rounded-2xl px-4 py-2.5 outline-none focus:border-shop-dark-green text-sm bg-white"
                />
                <button
                  onClick={handleManualApply}
                  disabled={manualLoading || !manualCode.trim()}
                  className="bg-black text-white px-5 rounded-2xl text-sm font-medium hover:opacity-90 transition disabled:opacity-40"
                >
                  {manualLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Check"
                  )}
                </button>
              </div>
            </div>

            {/* Coupon list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <Loader2 size={24} className="animate-spin text-gray-400" />
                </div>
              ) : coupons.length === 0 ? (
                <p className="text-center text-gray-400 mt-20 text-sm">
                  No coupons available right now
                </p>
              ) : (
                coupons.map((coupon) => (
                  <div
                    key={coupon._id}
                    onClick={() => handleCouponClick(coupon)}
                    className={`relative rounded-2xl border-2 p-4 transition-all ${
                      coupon.eligible
                        ? "border-shop-dark-green/30 hover:border-shop-dark-green hover:shadow-md cursor-pointer bg-white"
                        : "border-gray-100 bg-gray-50 cursor-not-allowed opacity-70"
                    } ${
                      appliedCode === coupon.code
                        ? "border-green-500 bg-green-50"
                        : ""
                    }`}
                  >
                    {/* Applied badge */}
                    {appliedCode === coupon.code && (
                      <span className="absolute top-3 right-3 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-medium">
                        Applied ✓
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        {/* Code pill */}
                        <div className="inline-flex items-center gap-1.5 mb-2">
                          {coupon.eligible ? (
                            <Tag size={13} className="text-shop-dark-green" />
                          ) : (
                            <Lock size={13} className="text-gray-400" />
                          )}
                          <span
                            className={`text-sm font-bold tracking-wider font-mono ${
                              coupon.eligible
                                ? "text-shop-dark-green"
                                : "text-gray-400 line-through"
                            }`}
                          >
                            {coupon.code}
                          </span>
                        </div>

                        {/* Label */}
                        <p
                          className={`text-base font-semibold ${
                            coupon.eligible ? "text-darkColor" : "text-gray-400"
                          }`}
                        >
                          {coupon.label}
                          {coupon.type === "first_order" && (
                            <span className="ml-2 text-xs font-normal text-amber-500">
                              First order only
                            </span>
                          )}
                        </p>

                        {/* Min cart or savings */}
                        {coupon.eligible ? (
                          <p className="text-xs text-green-600 mt-1 font-medium">
                            Save ₹{coupon.discountAmount} on this order
                          </p>
                        ) : (
                          <p className="text-xs text-red-400 mt-1">
                            {coupon.reason}
                          </p>
                        )}

                        {coupon.minCartValue > 0 && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            Min. cart value ₹{coupon.minCartValue}
                          </p>
                        )}
                      </div>

                      {/* Arrow for eligible */}
                      {coupon.eligible && appliedCode !== coupon.code && (
                        <div className="mt-1">
                          <ChevronRight
                            size={18}
                            className="text-shop-dark-green"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-gray-50">
              <p className="text-xs text-gray-400 text-center">
                Only one coupon can be applied per order
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Slide-in animation */}
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.32, 0.72, 0, 1);
        }
      `}</style>
    </>
  );
}