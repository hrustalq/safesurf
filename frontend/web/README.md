# VPN Advertisement Website

A modern, multilingual (English/Russian) website built to showcase and promote VPN services. Built with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/), [Shadcn/UI](https://ui.shadcn.com/), and [Docker](https://www.docker.com/).

## 📑 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Development](#development)
  - [Docker Setup](#docker-setup)
- [Project Structure](#project-structure)
- [Internationalization](#internationalization)
- [Contributing](#contributing)
- [Documentation](#documentation)

## Features
- 🌐 Multilingual support (English/Russian)
- 🛡️ Comprehensive VPN service information
- 📱 Responsive design for all devices
- 📖 Detailed setup guides
- ⬇️ Easy-to-access download section
- 📞 Contact and support information
- 🎨 Modern UI with Shadcn components

## Tech Stack
- [Next.js 15](https://nextjs.org/) - React Framework
- [React 19](https://react.dev/) - React
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Shadcn/UI](https://ui.shadcn.com/) - UI Components
- [Next-intl](https://next-intl-docs.vercel.app/) - Internationalization
- [Authjs.dev](https://authjs.dev/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Docker](https://www.docker.com/) - Containerization

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Docker (optional)

### Development
1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Docker Setup
1. Build the container:
```bash
docker build -t vpn-website .
```

2. Run the container:
```bash
docker run -p 3000:3000 vpn-website
```

## Project Structure
```
src/
├── app/             # Next.js app router
├── components/      # Reusable UI components
├── lib/            # Utility functions and configurations
├── locales/        # Translation files
└── styles/         # Global styles
```

## Internationalization
The website supports both English and Russian languages. Language files are located in the `src/locales` directory. The language switch is available in the navigation menu.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Shadcn/UI Documentation](https://ui.shadcn.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
