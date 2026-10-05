# AURORE PARIS — Haute Parfumerie & Horlogerie Digital Flagship

> **Modern Enterprise Architecture** • Next.js 14 App Router • TypeScript • Prisma ORM • PostgreSQL • Tailwind CSS • Three.js WebGL • Docker Compose

---

## 🌟 Executive Overview
AURORE PARIS is an enterprise-grade digital flagship e-commerce platform built to the architectural standards of luxury French perfume and horlogerie maisons. Featuring **Three.js WebGL 3D vessel inspection, cinematic video scrub narrative, Next.js 14 App Router, TypeScript, Prisma ORM, and PostgreSQL**, it delivers high-conversion luxury aesthetics (obsidian noir & champagne gold palette, high-res studio photography, glassmorphism) paired with robust back-end engineering (type-safe APIs, Zod input validation, database transactions, and multi-stage containerization).

---

## 🏗️ Enterprise System Architecture

```
Website-1-Ecommerce/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── products/route.ts       # GET/POST catalog endpoints
│   │   │   ├── orders/route.ts         # Zod validated order creation
│   │   │   └── health/route.ts         # Container healthcheck probe
│   │   ├── cart/page.tsx               # Interactive shopping bag & line items
│   │   ├── checkout/page.tsx           # Private client checkout & validation
│   │   ├── products/[id]/page.tsx      # Dynamic product showcase with specs
│   │   ├── layout.tsx                  # Root layout, Google Fonts, CartDrawer
│   │   ├── page.tsx                    # Luxury homepage with Hero & Curated Grids
│   │   └── globals.css                 # Tailwind directives & gold shimmer tokens
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Scrolled blur, mobile drawer, bag trigger
│   │   │   └── Footer.tsx              # Luxury branding & legal governance
│   │   ├── shop/
│   │   │   ├── HeroSection.tsx         # Atelier photography & trust markers
│   │   │   ├── ProductCard.tsx         # Hover zoom, price compare, add-to-bag
│   │   │   └── CartDrawer.tsx          # Slide-out glassmorphic shopping bag
│   │   └── common/
│   │       └── CookieConsent.tsx       # WCAG compliant privacy consent
│   │
│   ├── hooks/
│   │   └── useCart.ts                  # Persistent Zustand shopping bag store
│   │
│   ├── lib/
│   │   ├── prisma.ts                   # Singleton Prisma client instance
│   │   ├── utils.ts                    # cn(), formatPrice(), order generator
│   │   └── validators.ts               # Strict Zod schemas for order payloads
│   │
│   └── types/
│       └── index.ts                    # TypeScript types (Product, Order, Review)
│
├── prisma/
│   ├── schema.prisma                   # PostgreSQL relational models
│   └── seed.js                         # Database seeder for luxury catalog
│
├── public/
│   ├── images/                         # High-resolution product & hero photography
│   └── favicon.svg                     # Vector brand favicon
│
├── Dockerfile                          # Multi-stage production container
├── docker-compose.yml                  # PostgreSQL 16 + Next.js App orchestration
├── .env.example                        # Enterprise environment template
├── package.json                        # Dependencies & build scripts
├── tsconfig.json                       # Path aliases (@/*) & strict TS compiler
├── next.config.mjs                     # Security headers & image optimization
├── tailwind.config.ts                  # Design tokens & color system
└── README.md                           # This architecture manual
```

---

## 🗄️ Relational Database Schema (Prisma / PostgreSQL)

- **`Product`**: `id`, `slug`, `name`, `description`, `price`, `compareAtPrice`, `sku`, `stock`, `images`, `badge`, `isFeatured`, `categoryId`, relations to `Category`, `OrderItem`, `Review`.
- **`Category`**: `id`, `slug`, `name`, `description`, `image`, relation to `Product[]`.
- **`User`**: `id`, `email`, `name`, `role` (`CUSTOMER` / `ADMIN`), relation to `Order[]`.
- **`Order`**: `id`, `orderNumber`, `customerEmail`, `customerName`, `customerPhone`, `shippingAddress` (JSON), `totalAmount`, `status` (`PENDING`, `PAID`, `SHIPPED`, `DELIVERED`, `CANCELLED`), relation to `OrderItem[]`.
- **`OrderItem`**: `id`, `orderId`, `productId`, `quantity`, `unitPrice`, `totalPrice`.
- **`Review`**: `id`, `productId`, `author`, `rating`, `comment`.

---

## 🚀 Local Development & Deployment

### 1. Installation & Environment Setup
```bash
cd "e:\3D Projecta\Website-1-Ecommerce"

# Install enterprise dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 2. Database Migration & Seeding
```bash
# Push schema to PostgreSQL database
npx prisma db push

# Seed luxury catalog data
npm run prisma:seed
```

### 3. Launch Development Server
```bash
npm run dev
# Open http://localhost:3000
```

### 4. Enterprise Docker Compose Deployment (App + PostgreSQL)
```bash
docker compose up -d --build
# Next.js App: http://localhost:3000
# Health Check: http://localhost:3000/api/health
# PostgreSQL: port 5432
```
