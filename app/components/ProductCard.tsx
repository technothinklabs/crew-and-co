import Image from "next/image";
import type { MenuItem } from "../data/menu";
import Badge from "./Badge";
import Button from "./Button";

export default function ProductCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_4px_12px_-1px_rgb(61_21_0_/_0.09),0_2px_6px_-2px_rgb(61_21_0_/_0.05)] transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-1 hover:shadow-[0_10px_28px_-3px_rgb(61_21_0_/_0.11),0_4px_10px_-4px_rgb(61_21_0_/_0.07)]">
      {/* Image */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xl bg-cream-100">
        {item.badge && (
          <div className="absolute left-3 top-3 z-10">
            <Badge variant={item.badge} />
          </div>
        )}
        <Image
          src={item.image}
          alt={item.name}
          width={200}
          height={200}
          className="h-40 w-40 object-cover transition-transform duration-[350ms] group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <Badge variant="category">{item.category}</Badge>
        <h3 className="font-display text-xl font-bold text-coffee-900 mt-1">
          {item.name}
        </h3>
        <p className="font-sans text-sm text-coffee-500 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        {item.options && (
          <p className="font-sans text-xs text-coffee-400 mt-0.5">{item.options}</p>
        )}
      </div>

      {/* Price + CTA */}
      <div className="mt-auto flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-coffee-900">
          ${item.price.toFixed(2)}
        </span>
        <Button variant="primary" size="sm">
          Add
        </Button>
      </div>
    </article>
  );
}
