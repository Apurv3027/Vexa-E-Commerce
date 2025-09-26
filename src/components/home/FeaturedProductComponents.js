import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function FeaturedProductComponents({ products, cart, addToCart, removeFromCart }) {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const handleProductCardClick = (productID) => {
        navigate(`/products/${productID}`);
    };

    return (
        <section className="px-8 py-8">
            {/* Title */}
            <div className="flex items-center justify-between mb-6 animate-slideUp">
                <h3 className="text-2xl font-bold">{t("products.title")}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((productItem) => {
                    const isInCart = cart.some((item) => item.id === productItem.id);

                    return (
                        <div
                            key={productItem.id}
                            className="bg-white shadow-md rounded-lg p-4 
                           transform transition duration-500 cursor-pointer
                           hover:-rotate-1 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl group animate-slideUp"
                        >
                            {/* Product Image */}
                            <img
                                src={`${productItem.image}`}
                                alt={`Product ${productItem.id}`}
                                className="rounded-lg h-96 w-full object-fill transition-transform duration-500 group-hover:scale-110"
                                onClick={() => handleProductCardClick(productItem.id)}
                            />

                            {/* Product Details */}
                            <h4 className="mt-4 font-bold">{productItem.title}</h4>
                            <h6 className="text-black-600">{productItem.category}</h6>
                            <p className="text-black-600">₹{productItem.price}</p>

                            {/* Cart logic */}
                            {isInCart ? (
                                <div className="mt-6 flex items-center justify-center space-x-6 border-2 border-blue-600 rounded-lg px-6 py-2 w-full sm:w-40">
                                    {/* Remove button (Trash) */}
                                    <button
                                        onClick={() => removeFromCart(productItem.id)}
                                        className="text-black text-xl"
                                    >
                                        🗑
                                    </button>

                                    {/* Quantity */}
                                    <span className="font-bold">
                                        {cart.find((item) => item.id === productItem.id)?.quantity || 1}
                                    </span>

                                    {/* Add button (+) */}
                                    <button
                                        onClick={() => addToCart(productItem)}
                                        className="text-black text-xl"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => addToCart(productItem)}
                                    className="mt-6 w-full sm:w-40 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {t("products.addToCart")}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default FeaturedProductComponents;