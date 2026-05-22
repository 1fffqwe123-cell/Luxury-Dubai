import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { properties, Property } from "@/lib/properties";
import PropertyCard from "@/components/property/PropertyCard";
import { useTranslation } from "@/contexts/LanguageContext";

function useQueryParams() {
  const [location] = useLocation();
  return useMemo(() => {
    const parts = location.split("?");
    if (parts.length < 2) return new URLSearchParams();
    return new URLSearchParams(parts[1]);
  }, [location]);
}

export default function Properties() {
  const { t, language } = useTranslation();
  const query = useQueryParams();

  const [status, setStatus] = useState<"buy" | "rent">((query.get("status") as "buy" | "rent") || "buy");
  const [propType, setPropType] = useState(query.get("type") || "all");
  const [loc, setLoc] = useState(query.get("location") || "all");
  const [beds, setBeds] = useState(query.get("bedrooms") || "any");
  const [sort, setSort] = useState("newest");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const BUY_MAX = 50000000;
  const RENT_MAX = 500000;
  const BUY_MIN = 500000;
  const RENT_MIN = 5000;

  const [priceRange, setPriceRange] = useState<[number, number]>([
    status === "buy" ? BUY_MIN : RENT_MIN,
    status === "buy" ? BUY_MAX : RENT_MAX,
  ]);
  const [minInput, setMinInput] = useState(priceRange[0].toString());
  const [maxInput, setMaxInput] = useState(priceRange[1].toString());

  useEffect(() => {
    const min = status === "buy" ? BUY_MIN : RENT_MIN;
    const max = status === "buy" ? BUY_MAX : RENT_MAX;
    setPriceRange([min, max]);
    setMinInput(min.toString());
    setMaxInput(max.toString());
  }, [status]);

  const handleSliderChange = (vals: number[]) => {
    setPriceRange([vals[0], vals[1]]);
    setMinInput(vals[0].toString());
    setMaxInput(vals[1].toString());
  };

  const handleMinInput = (v: string) => {
    setMinInput(v);
    const n = Number(v.replace(/,/g, ""));
    if (!isNaN(n)) setPriceRange([n, priceRange[1]]);
  };

  const handleMaxInput = (v: string) => {
    setMaxInput(v);
    const n = Number(v.replace(/,/g, ""));
    if (!isNaN(n)) setPriceRange([priceRange[0], n]);
  };

  const filtered = useMemo(() => {
    let list = properties.filter((p) => p.status === status);
    if (propType !== "all") list = list.filter((p) => p.type === propType);
    if (loc !== "all") list = list.filter((p) => p.location === loc);
    if (beds !== "any") {
      const b = Number(beds);
      list = list.filter((p) => beds === "5" ? p.bedrooms >= 5 : p.bedrooms === b);
    }
    list = list.filter((p) => p.priceValue >= priceRange[0] && p.priceValue <= priceRange[1]);
    if (sort === "priceAsc") list = [...list].sort((a, b) => a.priceValue - b.priceValue);
    else if (sort === "priceDesc") list = [...list].sort((a, b) => b.priceValue - a.priceValue);
    return list;
  }, [status, propType, loc, beds, priceRange, sort]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const formatPrice = (val: number) => {
    if (val >= 1000000) return `AED ${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `AED ${(val / 1000).toFixed(0)}K`;
    return `AED ${val}`;
  };

  const pMin = status === "buy" ? BUY_MIN : RENT_MIN;
  const pMax = status === "buy" ? BUY_MAX : RENT_MAX;

  const FilterPanel = () => (
    <div className="space-y-7">
      {/* Status */}
      <div>
        <div className="flex rounded-lg overflow-hidden border border-border">
          {(["buy", "rent"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                status === s ? "bg-[hsl(43,74%,49%)] text-white" : "bg-background text-muted-foreground hover:bg-muted"
              }`}
              data-testid={`filter-toggle-${s}`}
            >
              {s === "buy" ? t("search.buy") : t("search.rent")}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          {t("search.type")}
        </label>
        <div className="flex flex-wrap gap-2">
          {["all", "apartment", "villa", "penthouse", "townhouse"].map((type) => {
            const labels: Record<string, string> = {
              all: language === "ar" ? "الكل" : "All",
              apartment: language === "ar" ? "شقة" : "Apartment",
              villa: language === "ar" ? "فيلا" : "Villa",
              penthouse: language === "ar" ? "بنتهاوس" : "Penthouse",
              townhouse: language === "ar" ? "تاون هاوس" : "Townhouse",
            };
            return (
              <button
                key={type}
                onClick={() => setPropType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  propType === type
                    ? "bg-[hsl(220,40%,18%)] text-white border-[hsl(220,40%,18%)]"
                    : "bg-background text-foreground border-border hover:border-[hsl(220,40%,18%)]"
                }`}
                data-testid={`filter-type-${type}`}
              >
                {labels[type]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          {t("search.location")}
        </label>
        <div className="relative">
          <select
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className="w-full text-sm font-medium bg-background border border-border rounded-lg px-3 py-2.5 pr-8 text-foreground outline-none appearance-none cursor-pointer"
            data-testid="filter-location"
          >
            <option value="all">{language === "ar" ? "جميع المناطق" : "All Locations"}</option>
            {["Downtown Dubai", "Palm Jumeirah", "Dubai Marina", "Business Bay", "DIFC", "Jumeirah"].map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          {t("search.bedrooms")}
        </label>
        <div className="flex gap-2 flex-wrap">
          {["any", "1", "2", "3", "4", "5"].map((b) => (
            <button
              key={b}
              onClick={() => setBeds(b)}
              className={`w-10 h-10 rounded-lg text-sm font-semibold border transition-colors ${
                beds === b
                  ? "bg-[hsl(220,40%,18%)] text-white border-[hsl(220,40%,18%)]"
                  : "bg-background text-foreground border-border hover:border-[hsl(220,40%,18%)]"
              }`}
              data-testid={`filter-beds-${b}`}
            >
              {b === "any" ? (language === "ar" ? "أي" : "Any") : b === "5" ? "5+" : b}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
          {t("filter.price")}
        </label>
        <Slider
          value={[priceRange[0], priceRange[1]]}
          min={pMin}
          max={pMax}
          step={status === "buy" ? 100000 : 1000}
          onValueChange={handleSliderChange}
          className="mb-4"
        />
        <div className="flex gap-2 text-xs text-muted-foreground mb-2">
          <span>{formatPrice(priceRange[0])}</span>
          <span className="flex-1 text-center">—</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <div className="flex-1">
            <label className="block text-[10px] text-muted-foreground mb-1">{t("filter.min")}</label>
            <input
              type="text"
              value={minInput}
              onChange={(e) => handleMinInput(e.target.value)}
              className="w-full text-xs font-medium bg-background border border-border rounded px-2.5 py-2 text-foreground outline-none focus:border-[hsl(43,74%,49%)]"
              data-testid="input-min-price"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[10px] text-muted-foreground mb-1">{t("filter.max")}</label>
            <input
              type="text"
              value={maxInput}
              onChange={(e) => handleMaxInput(e.target.value)}
              className="w-full text-xs font-medium bg-background border border-border rounded px-2.5 py-2 text-foreground outline-none focus:border-[hsl(43,74%,49%)]"
              data-testid="input-max-price"
            />
          </div>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setStatus("buy"); setPropType("all"); setLoc("all"); setBeds("any");
          setPriceRange([BUY_MIN, BUY_MAX]); setMinInput(BUY_MIN.toString()); setMaxInput(BUY_MAX.toString());
        }}
        className="text-xs font-semibold text-[hsl(43,74%,49%)] hover:underline"
      >
        {language === "ar" ? "إعادة ضبط" : "Reset Filters"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Header */}
      <div className="bg-[hsl(220,40%,18%)] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[hsl(43,74%,49%)] font-semibold">Dubai</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">{t("properties.title")}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Desktop filters sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-card border border-card-border rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-sm mb-6 flex items-center gap-2">
                <SlidersHorizontal size={15} />
                {language === "ar" ? "تصفية النتائج" : "Filter Results"}
              </h3>
              <FilterPanel />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-7 gap-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> {t("properties.found")}
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium px-4 py-2 border border-border rounded-lg hover:bg-muted"
                >
                  <SlidersHorizontal size={14} />
                  {language === "ar" ? "فلتر" : "Filters"}
                </button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="text-sm font-medium bg-background border border-border rounded-lg px-3 py-2 pr-8 text-foreground outline-none appearance-none cursor-pointer"
                    data-testid="select-sort"
                  >
                    <option value="newest">{t("sort.newest")}</option>
                    <option value="priceAsc">{t("sort.priceAsc")}</option>
                    <option value="priceDesc">{t("sort.priceDesc")}</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-muted-foreground">
                <div className="text-4xl mb-4">🔍</div>
                <p className="font-semibold text-lg text-foreground mb-2">
                  {language === "ar" ? "لا توجد نتائج" : "No properties found"}
                </p>
                <p className="text-sm">{language === "ar" ? "جرب تعديل معايير البحث" : "Try adjusting your filters"}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p, i) => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="relative w-80 max-w-full bg-background h-full overflow-y-auto p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">{language === "ar" ? "تصفية" : "Filters"}</h3>
              <button onClick={() => setMobileFiltersOpen(false)}><X size={20} /></button>
            </div>
            <FilterPanel />
          </motion.div>
        </div>
      )}
    </div>
  );
}
