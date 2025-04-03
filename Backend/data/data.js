// data.js:

const products = [
  {
    name: "iPhone 15 Pro Max",
    description:
      "iPhone 15 Pro Max mang lại trải nghiệm công nghệ cao cấp với màn hình Super Retina XDR 6.7 inch, chip A17 Bionic mạnh mẽ, và hệ thống camera chuyên nghiệp với khả năng zoom quang 10x. Thiết kế với khung titan bền bỉ, hỗ trợ kết nối 5G, và thời lượng pin vượt trội.",
    category: "Điện thoại thông minh",
    brand: "Apple",
    baseSku: "IP-15PM",
    features: [
      "Super Retina XDR",
      "Chip A17 Bionic",
      "Camera zoom quang 10x",
      "5G",
      "Sạc nhanh",
      "Chống nước chuẩn IP68",
    ],
    variants: [
      {
        variantSku: "IP-15PM-001-BLK-128GB",
        color: "Đen",
        ram: "6GB",
        storage: "128GB",
        price: 1199.99,
        discountPrice: 1149.99,
        countInStock: 25,
        images: [
          {
            url: "https://picsum.photos/500/500?random=47",
            altText: "iPhone 15 Pro Max Black Front View",
          },
          {
            url: "https://picsum.photos/500/500?random=48",
            altText: "iPhone 15 Pro Max Black Back View",
          },
        ],
      },
      {
        variantSku: "IP-15PM-002-SLV-256GB",
        color: "Bạc",
        ram: "6GB",
        storage: "256GB",
        price: 1299.99,
        discountPrice: 1249.99,
        countInStock: 30,
        images: [
          {
            url: "https://picsum.photos/500/500?random=49",
            altText: "iPhone 15 Pro Max Silver Front View",
          },
          {
            url: "https://picsum.photos/500/500?random=50",
            altText: "iPhone 15 Pro Max Silver Back View",
          },
        ],
      },
    ],
    collections: "Công nghệ cao cấp",
    material: "Titan & Kính",
    rating: 4.8,
    numReviews: 45,
  },
];

module.exports = products;
