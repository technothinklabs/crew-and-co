import Image from "next/image";
import type { Event } from "../data/events";

export default function EventCard({ event }: { event: Event }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_12px_-1px_rgb(61_21_0_/_0.09)] transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-1 hover:shadow-[0_10px_28px_-3px_rgb(61_21_0_/_0.11)]">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-cream-200">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-[550ms] group-hover:scale-105"
        />
        {/* Day/time badge */}
        <div className="absolute bottom-3 left-3">
          <div className="rounded-pill bg-white/90 px-3 py-1 backdrop-blur-sm">
            <p className="font-sans text-xs font-semibold text-coffee-800 leading-none">
              {event.dayPattern}
            </p>
            <p className="font-sans text-[11px] text-coffee-500 mt-0.5 leading-none">
              {event.time}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-coffee-900 leading-tight">
            {event.name}
          </h3>
          <span className="shrink-0 rounded-pill bg-gold-100 px-3 py-1 font-sans text-xs font-medium text-gold-700">
            {event.price}
          </span>
        </div>

        {event.capacity && (
          <p className="font-sans text-xs font-medium text-coffee-400">
            {event.capacity}
          </p>
        )}

        <p className="font-sans text-sm text-coffee-600 leading-relaxed flex-1">
          {event.description}
        </p>
      </div>
    </article>
  );
}
