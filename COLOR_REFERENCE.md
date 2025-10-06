# 🎨 Radio New Song 97.7 FM - Color Reference

## Exact Brand Colors

### Primary Color - Dark Blue
- **Hex:** `#072043`
- **RGB:** `rgb(7, 32, 67)`
- **HSL:** `hsl(210, 81%, 15%)`
- **Usage:** Headers, navigation, primary buttons, hero sections, footer

### Secondary Color - Gold
- **Hex:** `#bf993b`
- **RGB:** `rgb(191, 153, 59)`
- **HSL:** `hsl(43, 53%, 49%)`
- **Usage:** Accents, call-to-action buttons, highlights, on-air badges, links

## Color Application

### Primary (#072043) is used for:
✓ Navigation header background
✓ Hero section backgrounds
✓ Primary buttons (e.g., "Contact Us")
✓ Footer background
✓ Headings and important text
✓ Card borders (hover states)
✓ Program time indicators

### Secondary (#bf993b) is used for:
✓ "Listen Live" buttons
✓ "ON AIR" badges
✓ Accent highlights
✓ Category badges
✓ Link hover states
✓ Icons and decorative elements
✓ Call-to-action elements
✓ Feature card accents

## CSS Variables

```css
:root {
  --primary: 210 81% 15%;      /* #072043 */
  --secondary: 43 53% 49%;      /* #bf993b */
  --accent: 43 53% 49%;         /* #bf993b */
  --ring: 43 53% 49%;           /* #bf993b */
}
```

## Verification

To verify colors are correct:
1. Primary buttons should be dark blue (#072043)
2. Secondary/accent buttons should be gold (#bf993b)
3. Header/footer should be dark blue
4. "Listen Live" button should be gold
5. "ON AIR" badge should be gold

## Example Usage in Components

```tsx
// Primary button
<Button className="bg-primary hover:bg-primary/90">
  Contact Us
</Button>

// Secondary button  
<Button className="bg-secondary hover:bg-secondary/90">
  Listen Live Now
</Button>

// Accent badge
<Badge className="bg-secondary">
  ON AIR • 97.7 FM
</Badge>
```

---

**Colors Updated:** ✅ Exact match to your specifications
- Primary: #072043 (Dark Blue)
- Secondary: #bf993b (Gold)
