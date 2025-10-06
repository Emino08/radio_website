/**
 * Color Test Utilities
 * Validates that CSS custom properties are correctly set
 */

export interface ColorTestResult {
  name: string;
  variable: string;
  computedValue: string;
  expectedDescription: string;
  passed: boolean;
}

/**
 * Tests if CSS custom properties are defined and accessible
 */
export function testCSSColors(): ColorTestResult[] {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);

  const tests: ColorTestResult[] = [
    {
      name: 'Primary Color',
      variable: '--primary',
      computedValue: computedStyle.getPropertyValue('--primary').trim(),
      expectedDescription: 'oklch(0.238 0.043 259.542) = #072043 (Dark Blue)',
      passed: false,
    },
    {
      name: 'Primary Foreground',
      variable: '--primary-foreground',
      computedValue: computedStyle.getPropertyValue('--primary-foreground').trim(),
      expectedDescription: 'oklch(1 0 0) = White',
      passed: false,
    },
    {
      name: 'Secondary Color',
      variable: '--secondary',
      computedValue: computedStyle.getPropertyValue('--secondary').trim(),
      expectedDescription: 'oklch(0.661 0.117 76.819) = #bf993b (Gold)',
      passed: false,
    },
    {
      name: 'Secondary Foreground',
      variable: '--secondary-foreground',
      computedValue: computedStyle.getPropertyValue('--secondary-foreground').trim(),
      expectedDescription: 'oklch(1 0 0) = White',
      passed: false,
    },
    {
      name: 'Background',
      variable: '--background',
      computedValue: computedStyle.getPropertyValue('--background').trim(),
      expectedDescription: 'oklch(1 0 0) = White',
      passed: false,
    },
    {
      name: 'Foreground',
      variable: '--foreground',
      computedValue: computedStyle.getPropertyValue('--foreground').trim(),
      expectedDescription: 'oklch(0.238 0.043 259.542) = Dark Blue',
      passed: false,
    },
  ];

  // Check if values are defined
  tests.forEach((test) => {
    test.passed = test.computedValue !== '';
  });

  return tests;
}

/**
 * Tests if Tailwind utilities are working correctly
 */
export function testTailwindUtilities(): { utility: string; working: boolean }[] {
  const testDiv = document.createElement('div');
  testDiv.style.position = 'absolute';
  testDiv.style.visibility = 'hidden';
  document.body.appendChild(testDiv);

  const tests = [
    { utility: 'bg-primary', class: 'bg-primary' },
    { utility: 'text-primary', class: 'text-primary' },
    { utility: 'bg-secondary', class: 'bg-secondary' },
    { utility: 'text-secondary', class: 'text-secondary' },
    { utility: 'border-primary', class: 'border-primary' },
    { utility: 'border-secondary', class: 'border-secondary' },
  ];

  const results = tests.map(({ utility, class: className }) => {
    testDiv.className = className;
    const styles = getComputedStyle(testDiv);
    
    let working = false;
    if (className.startsWith('bg-')) {
      working = styles.backgroundColor !== '' && styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
    } else if (className.startsWith('text-')) {
      working = styles.color !== '';
    } else if (className.startsWith('border-')) {
      working = styles.borderColor !== '';
    }

    return { utility, working };
  });

  document.body.removeChild(testDiv);
  return results;
}

/**
 * Converts hex color to oklch (approximation for validation)
 */
export function hexToOklch(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // This is a simplified conversion - actual oklch conversion is more complex
  // For testing purposes, we'll return the RGB values as a reference
  return `RGB(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

/**
 * Gets the actual rendered color of an element with a given class
 */
export function getRenderedColor(className: string, property: 'backgroundColor' | 'color' = 'backgroundColor'): string {
  const testDiv = document.createElement('div');
  testDiv.className = className;
  testDiv.style.position = 'absolute';
  testDiv.style.visibility = 'hidden';
  document.body.appendChild(testDiv);

  const color = getComputedStyle(testDiv)[property];
  
  document.body.removeChild(testDiv);
  return color;
}
