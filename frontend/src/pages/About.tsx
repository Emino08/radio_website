import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Radio, Users, Heart, Target, Eye, Award, MapPin } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
              <Radio className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Radio New Song <span className="text-secondary">97.7 FM</span>
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Broadcasting the Good News from the heart of Bo, Sierra Leone
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Radio New Song 97.7 FM was established in 2010 with a divine vision to transform lives 
                through inspiring Christian broadcasting. Located in the vibrant city of Bo, Sierra Leone's 
                second-largest city, we have been serving our community with unwavering dedication for over 
                a decade.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Our journey began with a small team of passionate individuals who believed in the power of 
                radio to reach hearts and minds. Today, we have grown into one of the most trusted and 
                beloved radio stations in the Southern Province, reaching thousands of listeners daily with 
                our unique blend of gospel music, inspirational teachings, community news, and engaging programs.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are more than just a radio station; we are a family committed to uplifting spirits, 
                spreading hope, and bringing communities together through the power of faith-based broadcasting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To proclaim the Gospel of Jesus Christ through quality Christian broadcasting, 
                  providing our listeners with uplifting music, biblical teachings, and relevant 
                  programming that transforms lives, strengthens faith, and builds community in 
                  Bo and throughout Sierra Leone.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-full bg-secondary/10">
                    <Eye className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading Christian radio station in Sierra Leone, recognized for 
                  excellence in broadcasting, spiritual impact, and community service. We envision 
                  a future where every household in our broadcast area is touched by the 
                  transforming power of God's Word through our airwaves.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-3">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle>Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We uphold the highest standards of honesty, transparency, and ethical 
                  broadcasting in all our operations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-3">
                  <div className="p-4 rounded-full bg-secondary/10">
                    <Award className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We strive for excellence in content creation, technical delivery, and 
                  listener engagement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-3">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We are committed to serving and empowering our community through relevant 
                  and impactful programming.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Location</h2>
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="p-4 rounded-full bg-primary/10">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Radio New Song 97.7 FM</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p className="flex items-start gap-2">
                        <span className="font-semibold text-foreground">Address:</span>
                        123 Fenton Road, Bo, Southern Province, Sierra Leone
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="font-semibold text-foreground">Frequency:</span>
                        97.7 FM
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="font-semibold text-foreground">Coverage Area:</span>
                        Bo City and surrounding districts including Kenema, Moyamba, and Pujehun
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="font-semibold text-foreground">Broadcast Hours:</span>
                        24/7 - We never sleep, so you're always covered!
                      </p>
                    </div>
                    <div className="mt-6">
                      <Button className="bg-primary hover:bg-primary/90">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Team</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Meet the dedicated professionals behind Radio New Song 97.7 FM
          </p>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Rev. Samuel Kamara', role: 'Station Manager', image: 'https://ui-avatars.com/api/?name=Samuel+Kamara&size=200&background=072043&color=bf993b' },
              { name: 'Grace Koroma', role: 'Program Director', image: 'https://ui-avatars.com/api/?name=Grace+Koroma&size=200&background=bf993b&color=072043' },
              { name: 'Joseph Sesay', role: 'Head of News', image: 'https://ui-avatars.com/api/?name=Joseph+Sesay&size=200&background=072043&color=bf993b' },
              { name: 'Mary Bangura', role: 'Morning Show Host', image: 'https://ui-avatars.com/api/?name=Mary+Bangura&size=200&background=bf993b&color=072043' },
            ].map((member) => (
              <Card key={member.name} className="text-center">
                <CardHeader className="pb-4">
                  <div className="mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-secondary"
                    />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-secondary font-semibold">{member.role}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Be part of the Radio New Song family. Tune in today and experience the difference!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
              Listen Live Now
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
