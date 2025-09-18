import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Glassmorphism Colors
        glass: {
          DEFAULT: "hsl(var(--glass))",
          light: "hsl(var(--glass-light))",
          dark: "hsl(var(--glass-dark))",
        },
        
        // Message Bubble Colors
        "bubble-incoming": "hsl(var(--bubble-incoming))",
        "bubble-incoming-foreground": "hsl(var(--bubble-incoming-foreground))",
        "bubble-outgoing": "hsl(var(--bubble-outgoing))",
        "bubble-outgoing-foreground": "hsl(var(--bubble-outgoing-foreground))",
        
        // Gradient Accent Colors
        "primary-blue": "hsl(var(--primary-blue))",
        "primary-purple": "hsl(var(--primary-purple))",
        "primary-teal": "hsl(var(--primary-teal))",
        "accent-glow": "hsl(var(--accent-glow))",
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "gradient-glassmorphism": "linear-gradient(135deg, hsl(var(--primary-blue)) 0%, hsl(var(--primary-purple)) 35%, hsl(var(--primary-teal)) 100%)",
        "gradient-glow": "linear-gradient(135deg, hsl(var(--primary-blue)/0.8) 0%, hsl(var(--accent-glow)/0.6) 50%, hsl(var(--primary-purple)/0.8) 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "message-slide-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px) scale(0.95)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px hsl(var(--accent-glow)/0.3)",
          },
          "50%": {
            boxShadow: "0 0 20px hsl(var(--accent-glow)/0.6), 0 0 30px hsl(var(--accent-glow)/0.4)",
          },
        },
        "sidebar-slide": {
          from: {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "message-slide": "message-slide-up 0.4s ease-out",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "sidebar-slide": "sidebar-slide 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
