import { useState } from "react";

function CheckoutForm({
  onSubmit,
  loading,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError("Enter a valid 6-digit pincode.");
      return;
    }

    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border bg-white p-6"
    >
      <h2 className="text-xl font-bold">
        Delivery Address
      </h2>

      {error && (
        <div className="mt-4 rounded bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-6 grid gap-5">

        <div>
          <label className="text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-2 w-full rounded border px-4 py-3 outline-none focus:border-black"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 w-full rounded border px-4 py-3 outline-none focus:border-black"
            placeholder="10-digit mobile number"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Address
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="mt-2 w-full rounded border px-4 py-3 outline-none focus:border-black"
            placeholder="House number, street, area"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <div>
            <label className="text-sm font-medium">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-2 w-full rounded border px-4 py-3 outline-none focus:border-black"
              placeholder="City"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              State
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-2 w-full rounded border px-4 py-3 outline-none focus:border-black"
              placeholder="State"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="mt-2 w-full rounded border px-4 py-3 outline-none focus:border-black"
              placeholder="Pincode"
            />
          </div>

        </div>

      </div>

      <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded bg-black py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
          {loading
          ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}

export default CheckoutForm;