import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-44 items-center justify-center overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 border-t border-slate-200 pt-2">
        <h3 className="line-clamp-1 font-semibold text-slate-800">
          {product.title}
        </h3>

        <div className="flex justify-between gap-2">
          <p className="text-lg font-bold text-slate-900 mt-2">
            ${product.price}
          </p>

          <div className="mt-2 flex items-center gap-1 text-sm text-slate-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;