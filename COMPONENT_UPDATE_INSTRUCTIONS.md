# Component Update Instructions for Founder Images

## Current Status
You have successfully added two founder images:
- `/images/founders/massimo-menoncin.png`
- `/images/founders/anshul-pathania.png`

## Issue Identified
The component is currently looking for `/massimo-menoncin.jpg` but the actual file is at `/images/founders/massimo-menoncin.png`.

## Required Code Changes

### Update the about-team.tsx component

Replace the founders array in `src/components/sections/about-team.tsx` with the following:

```typescript
const founders = [
  {
    name: "Massimo Menoncin",
    title: "Finance & Risk Expert",
    bio: "Massimo brings deep expertise in corporate finance, risk management, and strategic advisory. With a career spanning industries and geographies, he ensures every CatalytIQ Systems solution is grounded in financial impact and operational clarity.",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-500",
    photo: "/images/founders/massimo-menoncin.png"
  },
  {
    name: "Luigi Oldrini",
    title: "Sales & Marketing Strategist",
    bio: "Luigi is a seasoned industrial marketing and sales professional with a passion for performance-driven growth. He leads the commercial lens of our projects, aligning automation with customer value and revenue.",
    icon: User,
    gradient: "from-green-500 to-emerald-500"
    // Note: No photo added yet - will use fallback icon
  },
  {
    name: "Anshul Pathania",
    title: "Business Transformation & AI Systems",
    bio: "Anshul drives the convergence of strategy, technology, and AI. With a background in turnaround consulting and intelligent systems design, he ensures CatalytIQ Systems delivers solutions that are both forward-thinking and executable.",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
    photo: "/images/founders/anshul-pathania.png"
  }
]
```

## Changes Made:
1. **Fixed Massimo's photo path**: Changed from `/massimo-menoncin.jpg` to `/images/founders/massimo-menoncin.png`
2. **Added Anshul's photo path**: Added `/images/founders/anshul-pathania.png`
3. **Luigi remains with icon**: No photo path added since image is not yet available

## Next Steps:
1. Update the component code with the corrected paths
2. Add Luigi's photo to `/images/founders/luigi-oldrini.png` when available
3. Add the photo path for Luigi in the component

## Testing:
After making these changes:
- Massimo and Anshul should display their actual photos
- Luigi will continue to show the green gradient icon until his photo is added
- All images should display in circular format with hover effects