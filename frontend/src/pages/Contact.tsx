import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Get in <span className="text-secondary">Touch</span>
            </h1>
            <p className="text-xl text-primary-foreground/90">
              We'd love to hear from you! Reach out to us for any inquiries, prayer requests, or feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+232 76 123 456"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Write your message here..."
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-sm text-muted-foreground">
                        123 Fenton Road<br />
                        Bo, Southern Province<br />
                        Sierra Leone
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a href="tel:+23276123456" className="text-sm text-muted-foreground hover:text-primary">
                        +232 76 123 456
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:info@radionewsong.sl" className="text-sm text-muted-foreground hover:text-primary">
                        info@radionewsong.sl
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Broadcasting Hours</p>
                      <p className="text-sm text-muted-foreground">
                        24/7 - Always on air!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20">
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                  <CardDescription>Stay connected on social media</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-primary/10 transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-primary" />
                      <span className="font-medium">Facebook</span>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-primary/10 transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-primary" />
                      <span className="font-medium">Instagram</span>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-primary/10 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-primary" />
                      <span className="font-medium">Twitter</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
                <CardHeader>
                  <CardTitle>Prayer Request?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-primary-foreground/90 mb-4">
                    We believe in the power of prayer. Share your prayer request with us.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Submit Prayer Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Find Us on the Map</h2>
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-96 bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31748.123456789!2d-11.7383333!3d7.9500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTcnMDAuMCJOIDExwrA0NCczMC4wIlc!5e0!3m2!1sen!2ssl!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
