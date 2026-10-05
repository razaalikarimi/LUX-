import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Fallback catalog in case PostgreSQL database is still in initial provisioning
const FALLBACK_PRODUCTS = [
  {
    id: 'prod_1',
    name: "L'Étoile Noir Leather Handbag",
    slug: 'letoile-noir-handbag',
    description: 'Meticulously crafted from supple calfskin leather with 24k gold-plated brass lock closures. Hand-stitched in Florence.',
    price: 2450,
    compareAtPrice: 2850,
    sku: 'LUXE-BAG-001',
    stock: 12,
    images: ['/images/product1.jpg'],
    badge: 'Best Seller',
    isFeatured: true,
    categoryId: 'cat_1',
    category: { name: 'Leather Goods', slug: 'leather-goods' },
  },
  {
    id: 'prod_2',
    name: 'Aura Chronograph Gold Timepiece',
    slug: 'aura-chronograph-gold',
    description: 'Crafted in 18k yellow gold with sapphire crystal face and an exhibition caseback displaying the 38-jewel automatic movement.',
    price: 6800,
    compareAtPrice: 7200,
    sku: 'LUXE-WAT-002',
    stock: 5,
    images: ['/images/product2.jpg'],
    badge: 'Limited Edition',
    isFeatured: true,
    categoryId: 'cat_2',
    category: { name: 'Haute Horlogerie', slug: 'haute-horlogerie' },
  },
  {
    id: 'prod_3',
    name: 'Sovereign Stiletto Heeled Pumps',
    slug: 'sovereign-stiletto-pumps',
    description: 'Iconic 105mm stiletto silhouette sculptured from velvet-soft Italian suede with hand-beveled sole and gold heel-tip.',
    price: 1290,
    compareAtPrice: null,
    sku: 'LUXE-SHO-003',
    stock: 18,
    images: ['/images/product3.jpg'],
    badge: 'New Arrival',
    isFeatured: true,
    categoryId: 'cat_3',
    category: { name: 'Footwear & Couture', slug: 'footwear-couture' },
  },
  {
    id: 'prod_4',
    name: "Elixir d'Or Signature Parfum",
    slug: 'elixir-dor-signature-parfum',
    description: 'A sumptuous symphony of Grasse rose, bourbon vanilla, dark amber, and smoky oud. Bottled in hand-polished French crystal.',
    price: 380,
    compareAtPrice: 420,
    sku: 'LUXE-PRF-004',
    stock: 45,
    images: ['/images/product4.jpg'],
    badge: 'Signature Scent',
    isFeatured: true,
    categoryId: 'cat_4',
    category: { name: 'Parfumerie Privée', slug: 'parfumerie-privee' },
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';

    // Attempt Prisma database retrieval
    let products: any[] = [];
    try {
      products = await prisma.product.findMany({
        where: {
          ...(category ? { category: { slug: category } } : {}),
          ...(featured ? { isFeatured: true } : {}),
        },
        include: {
          category: true,
          reviews: true,
        },
      });
    } catch {
      // Fallback gracefully if database is offline or not yet migrated
      products = FALLBACK_PRODUCTS;
    }

    if (!products || products.length === 0) {
      products = FALLBACK_PRODUCTS;
    }

    return NextResponse.json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch catalog' },
      { status: 500 }
    );
  }
}
