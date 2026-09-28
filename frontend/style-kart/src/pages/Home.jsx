import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      
      <section className="bg-gray-100">
        <div className="mx-auto flex min-h-500px max-w-7xl items-center px-6">
          
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              New Collection
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight">
              Discover Your Style
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Explore fashion designed for your everyday style.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-block rounded bg-black px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Shop Now
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;