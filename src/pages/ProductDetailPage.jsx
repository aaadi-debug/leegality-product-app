import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Tag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Package,
  Ruler,
  Weight,
} from "lucide-react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById } from "../api/productsApi";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setLoading(true);
        setError("");

        const productData = await getProductById(id);

        setProduct(productData);
        setSelectedImage(productData.images?.[0] || productData.thumbnail);
      } catch (err) {
        setError(err.message || "Unable to load product details.");
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8">
          <button
            onClick={handleBack}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </button>

          <ErrorMessage message={error} />
        </main>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </button>

        {/* Main product section */}
        <section className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
          {/* Images */}
          <div>
            <div className="flex h-[360px] items-center justify-center overflow-hidden rounded-xl bg-slate-100 p-4">
              <img
                src={selectedImage}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            </div>

            {product.images?.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {product.images.map((image) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(image)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 ${
                      selectedImage === image
                        ? "border-blue-600"
                        : "border-slate-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={product.title}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main details */}
          <div>
            <p className="text-sm font-medium capitalize text-blue-600">
              {product.category.replaceAll("-", " ")}
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-md bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {product.rating}
              </div>

              <span className="text-sm text-slate-500">
                {product.reviews?.length || 0} customer reviews
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold text-slate-900">
              ${product.price}
            </p>

            {product.discountPercentage && (
              <p className="mt-1 text-sm font-medium text-green-600">
                {product.discountPercentage}% discount available
              </p>
            )}

            <p
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                product.availabilityStatus === "In Stock"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.availabilityStatus || "Availability not available"}
            </p>

            <div className="my-6 border-t border-slate-200" />

            <p className="leading-7 text-slate-600">
              {product.description}
            </p>

            {product.tags?.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-semibold text-slate-700">
                  Tags
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Product information */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Product Information
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard label="Brand" value={product.brand || "Not available"} />
            <InfoCard
              label="Category"
              value={product.category.replaceAll("-", " ")}
              icon={<Tag className="h-4 w-4" />}
            />
            <InfoCard label="SKU" value={product.sku || "Not available"} />
            <InfoCard
              label="Stock"
              value={`${product.stock ?? "N/A"} available`}
              icon={<Package className="h-4 w-4" />}
            />
            <InfoCard
              label="Minimum Order"
              value={`${product.minimumOrderQuantity ?? "N/A"} units`}
            />
            <InfoCard
              label="Weight"
              value={product.weight ? `${product.weight} kg` : "Not available"}
              icon={<Weight className="h-4 w-4" />}
            />
            <InfoCard
              label="Dimensions"
              value={
                product.dimensions
                  ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`
                  : "Not available"
              }
              icon={<Ruler className="h-4 w-4" />}
            />
            <InfoCard
              label="Warranty"
              value={product.warrantyInformation || "Not available"}
              icon={<ShieldCheck className="h-4 w-4" />}
            />
            <InfoCard
              label="Shipping"
              value={product.shippingInformation || "Not available"}
              icon={<Truck className="h-4 w-4" />}
            />
            <InfoCard
              label="Return Policy"
              value={product.returnPolicy || "Not available"}
              icon={<RotateCcw className="h-4 w-4" />}
            />
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Customer Reviews
          </h2>

          {product.reviews?.length > 0 ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {product.reviews.map((review, index) => (
                <article
                  key={`${review.reviewerEmail}-${index}`}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-800">
                      {review.reviewerName}
                    </p>

                    <div className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {review.rating}/5
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {review.comment}
                  </p>

                  <p className="mt-4 text-xs text-slate-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              No customer reviews available for this product.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

function InfoCard({ label, value, icon }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        {icon}
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-slate-800 capitalize">
        {value}
      </p>
    </div>
  );
}

export default ProductDetailPage;