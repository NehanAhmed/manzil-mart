;

import { 
  IconBrandFacebook, 
  IconBrandTwitter, 
  IconBrandInstagram, 
  IconBrandLinkedin,
  IconMapPin,
  IconPhone,
  IconMail
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Footer = () => {
  const quickLinks = [
    "About Us",
    "Careers", 
    "Press",
    "Blog",
    "Gift Cards"
  ];

  const customerService = [
    "Help Center",
    "Safety Center",
    "Community Guidelines"
  ];

  const legalLinks = [
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Accessibility"
  ];

  const socialLinks = [
    { icon: IconBrandFacebook, href: "#" },
    { icon: IconBrandTwitter, href: "#" },
    { icon: IconBrandInstagram, href: "#" },
    { icon: IconBrandLinkedin, href: "#" }
  ];

  return (
    <footer className="bg-background border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-foreground">Manzil Mart</span>
            </div>
            
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Your trusted marketplace for fresh, organic groceries and quality products delivered right to your doorstep.
            </p>
            
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-muted"
                  asChild
                >
                  <a href={social.href} aria-label={`Follow on ${social.icon.name}`}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-muted-foreground hover:text-foreground justify-start"
                    asChild
                  >
                    <a href="#">{link}</a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((link, index) => (
                <li key={index}>
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-muted-foreground hover:text-foreground justify-start"
                    asChild
                  >
                    <a href="#">{link}</a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <IconMapPin className="h-4 w-4 flex-shrink-0" />
                <span>123 Farm Road, Organic City, OC 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <IconPhone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <IconMail className="h-4 w-4 flex-shrink-0" />
                <span>support@manzilmart.com</span>
              </div>
            </div>
          </div>
        </div>

    

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Manzil Mart. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map((link, index) => (
              <Button
                key={index}
                variant="link"
                className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                asChild
              >
                <a href="#">{link}</a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
