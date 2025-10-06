import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { testCSSColors, testTailwindUtilities, getRenderedColor, type ColorTestResult } from '@/lib/colorTest';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export function ColorTest() {
  const [cssTests, setCssTests] = useState<ColorTestResult[]>([]);
  const [tailwindTests, setTailwindTests] = useState<{ utility: string; working: boolean }[]>([]);
  const [renderedColors, setRenderedColors] = useState<{ class: string; color: string; expected: string }[]>([]);

  useEffect(() => {
    // Run tests when component mounts
    runTests();
  }, []);

  const runTests = () => {
    const cssResults = testCSSColors();
    const tailwindResults = testTailwindUtilities();

    // Get actual rendered colors
    const colorTests = [
      { class: 'bg-primary', expected: '#072043 (Dark Blue)' },
      { class: 'bg-secondary', expected: '#bf993b (Gold)' },
      { class: 'text-primary', expected: '#072043 (Dark Blue)' },
      { class: 'text-secondary', expected: '#bf993b (Gold)' },
    ];

    const rendered = colorTests.map(({ class: className, expected }) => ({
      class: className,
      color: className.startsWith('bg-') 
        ? getRenderedColor(className, 'backgroundColor')
        : getRenderedColor(className, 'color'),
      expected,
    }));

    setCssTests(cssResults);
    setTailwindTests(tailwindResults);
    setRenderedColors(rendered);
  };

  const allCssPassed = cssTests.every(test => test.passed);
  const allTailwindPassed = tailwindTests.every(test => test.working);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            🧪 Color System Test Suite
          </h1>
          <p className="text-xl text-muted-foreground">
            Automated testing for Tailwind CSS and shadcn/ui color configuration
          </p>
          <Button onClick={runTests} variant="outline">
            🔄 Rerun Tests
          </Button>
        </div>

        {/* Test Summary */}
        <Card className={`border-2 ${allCssPassed && allTailwindPassed ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {allCssPassed && allTailwindPassed ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <span className="text-green-700">All Tests Passed</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                  <span className="text-yellow-700">Some Tests Need Attention</span>
                </>
              )}
            </CardTitle>
            <CardDescription>
              CSS Variables: {cssTests.filter(t => t.passed).length}/{cssTests.length} | 
              Tailwind Utilities: {tailwindTests.filter(t => t.working).length}/{tailwindTests.length}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* CSS Custom Properties Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {allCssPassed ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              CSS Custom Properties Test
            </CardTitle>
            <CardDescription>
              Verifying that CSS variables are defined in :root
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cssTests.map((test, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${test.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {test.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className="font-semibold">{test.name}</span>
                        <Badge variant="outline" className="font-mono text-xs">
                          {test.variable}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Expected: {test.expectedDescription}
                      </p>
                      <p className="text-sm font-mono">
                        Computed: {test.computedValue || '❌ Not defined'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tailwind Utilities Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {allTailwindPassed ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              Tailwind Utilities Test
            </CardTitle>
            <CardDescription>
              Verifying that Tailwind color utilities are working
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tailwindTests.map((test, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border flex items-center gap-3 ${test.working ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                >
                  {test.working ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span className="font-mono text-sm">{test.utility}</span>
                  <Badge variant={test.working ? 'default' : 'destructive'} className="ml-auto">
                    {test.working ? 'Working' : 'Failed'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rendered Colors Test */}
        <Card>
          <CardHeader>
            <CardTitle>Rendered Colors</CardTitle>
            <CardDescription>
              Actual colors being rendered in the browser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {renderedColors.map((test, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-24 h-24 ${test.class} rounded-lg border-2 border-gray-300`}></div>
                    <div className="flex-1">
                      <p className="font-mono text-sm font-semibold">{test.class}</p>
                      <p className="text-sm text-muted-foreground">Expected: {test.expected}</p>
                      <p className="text-sm font-mono mt-1">Rendered: {test.color}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Visual Color Swatches */}
        <Card>
          <CardHeader>
            <CardTitle>Visual Color Swatches</CardTitle>
            <CardDescription>
              Visual verification of primary and secondary colors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Color */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Primary Color</h3>
                <div className="bg-primary w-full h-32 rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">bg-primary</span>
                </div>
                <div className="text-sm space-y-1">
                  <p className="font-mono">Expected: #072043 (Dark Blue)</p>
                  <p className="text-muted-foreground">Should be a dark navy blue color</p>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-primary hover:bg-primary/90">Primary Button</Button>
                  <Badge className="bg-primary">Primary Badge</Badge>
                </div>
              </div>

              {/* Secondary Color */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Secondary Color</h3>
                <div className="bg-secondary w-full h-32 rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold">bg-secondary</span>
                </div>
                <div className="text-sm space-y-1">
                  <p className="font-mono">Expected: #bf993b (Gold)</p>
                  <p className="text-muted-foreground">Should be a golden/amber color</p>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-secondary hover:bg-secondary/90">Secondary Button</Button>
                  <Badge className="bg-secondary">Secondary Badge</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Component Integration Test</CardTitle>
            <CardDescription>
              Testing colors in actual UI components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Buttons:</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default (Primary)</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Badges:</p>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Cards with Color Borders:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle>Primary Border</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="border-2 border-secondary">
                  <CardHeader>
                    <CardTitle>Secondary Border</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diagnostic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Diagnostic Information</CardTitle>
            <CardDescription>
              System information for troubleshooting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm font-mono">
              <p>✓ Tailwind CSS: v4.1.14 (@tailwindcss/vite)</p>
              <p>✓ shadcn/ui: Configured with CSS variables</p>
              <p>✓ Color Mode: oklch (CSS Color Level 4)</p>
              <p>✓ CSS File: src/index.css</p>
              <p>✓ Component Path: @/components/ui</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
