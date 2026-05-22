import { useState } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

export default function SearchWidget() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"buy" | "rent">("buy");
  const [propertyType, setPropertyType] = useState("all");
  const [loc, setLoc] = useState("all");
  const [bedrooms, setBedrooms] = useState("any");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("status", status);
    if (propertyType !== "all") params.set("type", propertyType);
    if (loc !== "all") params.set("location", loc);
    if (bedrooms !== "any") params.set("bedrooms", bedrooms);
    setLocation(`/properties?${params.toString()}`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Buy / Rent Toggle */}
        <div className="flex border-b border-gray-100">
          {(["buy", "rent"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex-1 py-4 text-sm font-semibold tracking-wide uppercase transition-colors duration-200 ${
                status === s
                  ? "bg-[hsl(43,74%,49%)] text-white"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              data-testid={`toggle-${s}`}
            >
              {s === "buy" ? t("search.buy") : t("search.rent")}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {/* Location */}
          <div className="flex-1 px-5 py-4">
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1.5">
              {t("search.location")}
            </label>
            <select
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className="w-full text-sm font-medium bg-transparent text-foreground outline-none cursor-pointer"
              data-testid="select-location"
            >
              <option value="all">All Locations</option>
              <option value="Downtown Dubai">Downtown Dubai</option>
              <option value="Palm Jumeirah">Palm Jumeirah</option>
              <option value="Dubai Marina">Dubai Marina</option>
              <option value="Business Bay">Business Bay</option>
              <option value="DIFC">DIFC</option>
              <option value="Jumeirah">Jumeirah</option>
            </select>
          </div>

          {/* Property type */}
          <div className="flex-1 px-5 py-4">
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1.5">
              {t("search.type")}
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full text-sm font-medium bg-transparent text-foreground outline-none cursor-pointer"
              data-testid="select-type"
            >
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="penthouse">Penthouse</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div className="flex-1 px-5 py-4">
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1.5">
              {t("search.bedrooms")}
            </label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full text-sm font-medium bg-transparent text-foreground outline-none cursor-pointer"
              data-testid="select-bedrooms"
            >
              <option value="any">{t("search.any")}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Search button */}
          <div className="px-5 py-4 sm:py-0 flex items-center">
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[hsl(220,40%,18%)] text-white text-sm font-semibold rounded-xl hover:bg-[hsl(220,40%,14%)] transition-colors duration-200"
              data-testid="btn-search"
            >
              <Search size={16} />
              {t("search.button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
