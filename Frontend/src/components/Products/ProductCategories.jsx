import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCategories = () => {
  const scrollRef = useRef(null);
  const dragThreshold = 5;

  const isDragging = useRef(false); // Dùng useRef để kiểm soát tốt hơn
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = [
    {
      _id: "1",
      name: "Chairs",
      images: [
        {
          url: "https://picsum.photos/500/500/?random=1",
          altText: "Chairs",
        },
      ],
    },
    {
      _id: "2",
      name: "Dining tables",
      images: [
        {
          url: "https://picsum.photos/500/500/?random=2",
          altText: "Dining tables",
        },
      ],
    },
    {
      _id: "3",
      name: "Office chairs",
      images: [
        {
          url: "https://picsum.photos/500/500/?random=3",
          altText: "Office chairs",
        },
      ],
    },
    {
      _id: "4",
      name: "Desks",
      images: [
        {
          url: "https://picsum.photos/500/500/?random=4",
          altText: "Desks",
        },
      ],
    },
    {
      _id: "5",
      name: "Lounge chairs",
      images: [
        {
          url: "https://picsum.photos/500/500/?random=5",
          altText: "Lounge chairs",
        },
      ],
    },
    {
      _id: "6",
      name: "Sofas",
      images: [
        {
          url: "https://picsum.photos/500/500/?random=6",
          altText: "Sofas",
        },
      ],
    },
  ];

  const handleMouseDown = (e) => {
    isDragging.current = false; // Reset trạng thái kéo
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (startX.current === 0) return;

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;

    if (Math.abs(walk) > dragThreshold) {
      isDragging.current = true; // Đánh dấu là đang kéo
    }

    if (isDragging.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    startX.current = 0;
  };

  const handleMouseClick = (e) => {
    if (isDragging.current) {
      e.preventDefault(); // Chặn sự kiện click nếu đang kéo
      e.stopPropagation(); // Ngăn sự kiện click lan lên thẻ Link
    }
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  });

  return (
    <section className="px-4 lg:px-16">
      <div className="mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Product Categories</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the lastest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded ${
              canScrollLeft ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded ${
              canScrollRight ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`mx-auto overflow-x-hidden flex space-x-4 relative`}
        // ${
        //   isDragging ? "cursor-grabbing" : "cursor-grab"
        // }
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {categories.map((product) => (
          <div
            key={product._id}
            className="min-w-[75%] sm:min-w-[50%] lg:min-w-[290px] relative"
          >
            <Link
              to={`/products/all?category${product._id}`}
              className="block"
              draggable="false"
              onClick={handleMouseClick}
            >
              <img
                className="w-full h-[450px] object-cover rounded-lg"
                src={product.images[0]?.url || null}
                alt={product.images[0]?.altText || product.name}
                draggable="false"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                {/* <Link to={`/product/${product._id}`} className="block"> */}
                <h4 className="font-medium">{product.name}</h4>
                {/* </Link> */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
