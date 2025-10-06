import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function TailwindTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            🎨 Tailwind CSS Test Page
          </h1>
          <p className="text-xl text-muted-foreground">
            Testing all Tailwind utilities and custom colors
          </p>
        </div>

        {/* Color Test - Your Brand Colors */}
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-2xl">Brand Colors Test</CardTitle>
            <CardDescription>Testing #072043 (Primary) and #bf993b (Secondary)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Color Test */}
              <div className="space-y-2">
                <div className="w-full h-32 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">Primary #072043</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Should be: Dark Blue (#072043)
                </div>
              </div>

              {/* Secondary Color Test */}
              <div className="space-y-2">
                <div className="w-full h-32 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-xl">Secondary #bf993b</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Should be: Gold (#bf993b)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons Test */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons Test</CardTitle>
            <CardDescription>Testing button variants with hover effects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary hover:bg-primary/90">
                Primary Button
              </Button>
              <Button className="bg-secondary hover:bg-secondary/90">
                Secondary Button
              </Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              ✓ Hover over buttons - cursor should change and colors should darken
            </p>
          </CardContent>
        </Card>

        {/* Responsive Grid Test */}
        <Card>
          <CardHeader>
            <CardTitle>Responsive Grid Test</CardTitle>
            <CardDescription>1 column on mobile, 2 on tablet, 3 on desktop</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20 hover:border-secondary transition-colors"
                >
                  <p className="font-semibold">Card {i}</p>
                  <p className="text-sm text-muted-foreground">Hover for effect</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Typography Test */}
        <Card>
          <CardHeader>
            <CardTitle>Typography & Spacing Test</CardTitle>
            <CardDescription>Testing font sizes, weights, and spacing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h1 className="text-4xl font-bold text-primary">Heading 1 - 4xl</h1>
            <h2 className="text-3xl font-semibold text-secondary">Heading 2 - 3xl</h2>
            <h3 className="text-2xl font-medium">Heading 3 - 2xl</h3>
            <p className="text-lg text-foreground">
              Large paragraph text with proper spacing and line height
            </p>
            <p className="text-base text-muted-foreground">
              Regular paragraph with muted foreground color
            </p>
            <p className="text-sm italic">Small italic text</p>
          </CardContent>
        </Card>

        {/* Flex & Alignment Test */}
        <Card>
          <CardHeader>
            <CardTitle>Flexbox & Alignment Test</CardTitle>
            <CardDescription>Testing flex utilities and alignment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="font-semibold">Left</span>
              <Badge className="bg-secondary">Center Badge</Badge>
              <span className="font-semibold">Right</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
              <Badge variant="outline">Badge 1</Badge>
              <Badge variant="outline">Badge 2</Badge>
              <Badge variant="outline">Badge 3</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Borders & Shadows Test */}
        <Card>
          <CardHeader>
            <CardTitle>Borders & Shadows Test</CardTitle>
            <CardDescription>Testing border utilities and shadows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 border-2 border-primary rounded-lg">
                <p className="font-semibold">Border Primary</p>
              </div>
              <div className="p-6 border-2 border-secondary rounded-lg shadow-lg">
                <p className="font-semibold">Border + Shadow</p>
              </div>
              <div className="p-6 rounded-lg shadow-2xl bg-white">
                <p className="font-semibold">Large Shadow</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hover & Transition Test */}
        <Card>
          <CardHeader>
            <CardTitle>Hover & Transition Test</CardTitle>
            <CardDescription>Testing hover states and transitions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <p className="font-semibold">Hover to scale & fade</p>
              </div>
              <div className="p-6 bg-secondary text-secondary-foreground rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <p className="font-semibold">Hover for shadow</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Padding & Margin Test */}
        <Card>
          <CardHeader>
            <CardTitle>Spacing Test (Padding & Margin)</CardTitle>
            <CardDescription>Testing p-4, m-4, space-y, gap utilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 border-l-4 border-primary">
                Padding 4 (1rem)
              </div>
              <div className="p-8 bg-secondary/10 border-l-4 border-secondary">
                Padding 8 (2rem)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="border-2 border-green-500 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">✅ Tailwind CSS Test Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Colors working: Primary (#072043) = Dark Blue, Secondary (#bf993b) = Gold</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Hover effects working (cursor changes)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Responsive grid working (resize browser)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Typography utilities working</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Spacing utilities working</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Borders and shadows working</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Transitions and animations working</span>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>If you can see styled content above with proper colors, Tailwind CSS is working correctly!</p>
          <p className="mt-2">Primary: #072043 | Secondary: #bf993b</p>
        </div>
      </div>
    </div>
  );
}
