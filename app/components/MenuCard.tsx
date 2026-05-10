import Image from "next/image";
import type { MenuItem } from "../data/menu";
import Badge from "./Badge";

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex gap-4 rounded-xl border border-cream-300 bg-white p-4 shadow-[0_2px_4px_0_rgb(61_21_0_/_0.07)] transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[0_4px_12px_-1px_rgb(61_21_0_/_0.09)]">
      {/* Image */}
      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-cream-100">
        <Image
          src={item.image}
          alt={item.name}
          width={112}
          height={112}
          className="h-full w-full object-cover transition-transform duration-[350ms] group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            {item.badge && <Badge variant={item.badge} />}
          </div>
          <h3 className="font-display text-lg font-bold text-coffee-900 leading-snug">
            {item.name}
          </h3>
          <p className="font-sans text-sm text-coffee-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
          {item.options && (
            <p className="font-sans text-xs text-coffee-400 mt-0.5">
              {item.options}
            </p>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-coffee-900">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
}
