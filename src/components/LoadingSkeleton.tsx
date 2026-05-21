import React from "react";

interface SkeletonProps {
  variant?: "product-card" | "product-grid" | "details" | "table-row" | "text";
  count?: number;
}

export const LoadingSkeleton: React.FC<SkeletonProps> = ({ variant = "product-card", count = 1 }) => {
  const items = Array.from({ length: count });

  if (variant === "product-grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <LoadingSkeleton variant="product-card" count={4} />
      </div>
    );
  }

  if (variant === "table-row") {
    return (
      <>
        {items.map((_, i) => (
          <tr key={i} className="animate-pulse border-b border-neutral-100 dark:border-neutral-800">
            <td className="p-4"><div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-800 rounded"></div></td>
            <td className="p-4">
              <div className="h-4 w-40 bg-neutral-200 dark:bg-neutral-800 rounded mb-2"></div>
              <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            </td>
            <td className="p-4"><div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded"></div></td>
            <td className="p-4"><div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded"></div></td>
            <td className="p-4"><div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div></td>
            <td className="p-4"><div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-800 rounded"></div></td>
          </tr>
        ))}
      </>
    );
  }

  if (variant === "details") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto px-4 py-8 animate-pulse">
        {/* Left Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-neutral-200 dark:bg-neutral-800 rounded-3xl w-full"></div>
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-800 rounded-xl"></div>
            <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-800 rounded-xl"></div>
            <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-800 rounded-xl"></div>
          </div>
        </div>
        {/* Right Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="h-8 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded mt-4"></div>
          </div>
          <hr className="border-neutral-100 dark:border-neutral-800" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="h-4 w-4/6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
              <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
              <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="flex gap-2">
              <div className="h-10 w-12 rounded bg-neutral-200 dark:bg-neutral-800"></div>
              <div className="h-10 w-12 rounded bg-neutral-200 dark:bg-neutral-800"></div>
              <div className="h-10 w-12 rounded bg-neutral-200 dark:bg-neutral-800"></div>
            </div>
          </div>
          <div className="h-14 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white dark:bg-[#0b0f19]/40 border border-neutral-100 dark:border-neutral-900 rounded-3xl p-3 flex flex-col gap-4"
        >
          <div className="aspect-[4/5] bg-neutral-200 dark:bg-neutral-800 rounded-2xl w-full"></div>
          <div className="space-y-2 px-1">
            <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="flex justify-between items-center mt-2">
              <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              <div className="h-8 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default LoadingSkeleton;
