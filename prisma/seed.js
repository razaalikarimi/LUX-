// Prisma Catalog Seeder for LUXÉ Luxury E-Commerce
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding enterprise catalog data...');

  // Clean existing tables
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const catLeather = await prisma.category.create({
    data: {
      name: 'Leather Goods',
      slug: 'leather-goods',
      description: 'Handcrafted Italian and French full-grain leather masterworks.',
      image: '/images/product1.jpg',
    },
  });

  const catHorology = await prisma.category.create({
    data: {
      name: 'Haute Horlogerie',
      slug: 'haute-horlogerie',
      description: 'Swiss certified precision automatic timepieces.',
      image: '/images/product2.jpg',
    },
  });

  const catFootwear = await prisma.category.create({
    data: {
      name: 'Footwear & Couture',
      slug: 'footwear-couture',
      description: 'Artisanal footwear tailored for red-carpet elegance.',
      image: '/images/product3.jpg',
    },
  });

  const catFragrance = await prisma.category.create({
    data: {
      name: 'Parfumerie Privée',
      slug: 'parfumerie-privee',
      description: 'Rare botanical essences and master distillations.',
      image: '/images/product4.jpg',
    },
  });

  // Create Products
  const products = [
    {
      name: "L'Étoile Noir Leather Handbag",
      slug: 'letoile-noir-handbag',
      description: 'Meticulously crafted from supple calfskin leather with 24k gold-plated brass lock closures. Hand-stitched in Florence.',
      price: 2450.0,
      compareAtPrice: 2850.0,
      sku: 'LUXE-BAG-001',
      stock: 12,
      images: ['/images/product1.jpg'],
      badge: 'Best Seller',
      isFeatured: true,
      categoryId: catLeather.id,
      reviews: {
        create: [
          { author: 'Genevieve R.', rating: 5, comment: 'The leather grain is breathtaking. Absolutely stunning craft.' },
          { author: 'Marcus H.', rating: 5, comment: 'Purchased for my wife. The packaging and finish were beyond compare.' },
        ],
      },
    },
    {
      name: 'Aura Chronograph Gold Timepiece',
      slug: 'aura-chronograph-gold',
      description: 'Crafted in 18k yellow gold with sapphire crystal face and an exhibition caseback displaying the 38-jewel automatic movement.',
      price: 6800.0,
      compareAtPrice: 7200.0,
      sku: 'LUXE-WAT-002',
      stock: 5,
      images: ['/images/product2.jpg'],
      badge: 'Limited Edition',
      isFeatured: true,
      categoryId: catHorology.id,
      reviews: {
        create: [
          { author: 'Lord Alexander', rating: 5, comment: 'Keeps impeccable timing. An heirloom piece for generations.' },
        ],
      },
    },
    {
      name: 'Sovereign Stiletto Heeled Pumps',
      slug: 'sovereign-stiletto-pumps',
      description: 'Iconic 105mm stiletto silhouette sculptured from velvet-soft Italian suede with hand-beveled sole and gold heel-tip.',
      price: 1290.0,
      compareAtPrice: null,
      sku: 'LUXE-SHO-003',
      stock: 18,
      images: ['/images/product3.jpg'],
      badge: 'New Arrival',
      isFeatured: true,
      categoryId: catFootwear.id,
      reviews: {
        create: [
          { author: 'Elena S.', rating: 5, comment: 'Surprisingly comfortable for the height. Pure couture excellence.' },
        ],
      },
    },
    {
      name: "Elixir d'Or Signature Parfum",
      slug: 'elixir-dor-signature-parfum',
      description: 'A sumptuous symphony of Grasse rose, bourbon vanilla, dark amber, and smoky oud. Bottled in hand-polished French crystal.',
      price: 380.0,
      compareAtPrice: 420.0,
      sku: 'LUXE-PRF-004',
      stock: 45,
      images: ['/images/product4.jpg'],
      badge: 'Signature Scent',
      isFeatured: true,
      categoryId: catFragrance.id,
      reviews: {
        create: [
          { author: 'Claire D.', rating: 5, comment: 'Incredible longevity and sillage. Constantly receive compliments.' },
        ],
      },
    },
  ];

  for (const prod of products) {
    await prisma.product.create({ data: prod });
  }

  console.log('Seeding completed successfully: 4 Categories and 4 Featured Luxury Products created.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
