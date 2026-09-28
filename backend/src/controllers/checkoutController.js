async function checkout(req, res) {
  try {
    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All checkout fields are required",
      });
    }

    res.json({
      success: true,
      message: "Checkout information received",
      data: {
        fullName,
        phone,
        address,
        city,
        state,
        pincode,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Checkout failed",
    });
  }
}

module.exports = {
  checkout,
};