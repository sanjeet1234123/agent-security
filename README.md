# AgentSOC

A modern Security Operations Center (SOC) dashboard built with Next.js for monitoring, managing, and reviewing security incidents in real-time.

## 🚀 Features

- **Incident Management**: Comprehensive incident tracking and management system
- **Real-time Monitoring**: Monitor security incidents as they occur
- **Advanced Filtering**: Filter incidents by status, category, date, and search terms
- **User Authentication**: Secure login system with session management
- **Responsive Design**: Modern UI that works across all devices
- **Dark/Light Theme**: Toggle between dark and light themes
- **Notifications**: Real-time notification system for security alerts
- **Pagination**: Efficient data pagination for large incident datasets

## 🛡️ Security Incident Categories

AgentSOC handles various types of security incidents:

- **Privilege Escalation**: AdminPolicy attacks and unauthorized privilege changes
- **Unauthorized Access**: Root login attempts from suspicious IPs (including Tor)
- **Malware**: EC2 CryptoMiner and other malicious software detection
- **Misconfiguration/Data Exposure**: Public S3 buckets with PII and other exposures
- **Vulnerability**: Critical CVEs in Lambda functions and other services
- **Reconnaissance**: SSH port probes and network scanning attempts

## 🏗️ Tech Stack

- **Framework**: [Next.js 15.3.4](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **Icons**: Tabler Icons & Lucide React
- **State Management**: Zustand
- **Theme**: next-themes for dark/light mode
- **Authentication**: Custom auth store with session persistence

## 📦 Dependencies

### Core Dependencies

- React 19.0.0
- Next.js 15.3.4 with Turbopack
- TypeScript 5
- Tailwind CSS 4

### UI & Components

- Radix UI components (Avatar, Dialog, Dropdown, Select, etc.)
- Lucide React & Tabler Icons
- Class Variance Authority
- Vaul (drawer component)

### Utilities

- Zustand (state management)
- Chroma.js (color manipulation)
- React Markdown (markdown rendering)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd agent-soc/frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

```text
Email: demo@xenonstack.com
Password: xenon123
```

## 📁 Project Structure

```text
src/
├── app/                    # Next.js App Router
│   ├── (app)/             # Authenticated app routes
│   │   ├── incident/      # Incident management pages
│   │   └── layout.tsx     # App layout with sidebar
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── incidents/         # Incident-specific components
│   ├── ui/               # UI primitives
│   └── ...               # Various app components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── store/                # Zustand state management
└── styles/               # Global styles
```

## 🎯 Key Features Explained

### Incident Management

- View all security incidents in a paginated table
- Filter by status: "Needs Attention", "Reviewed", "Contained"
- Filter by category and search across multiple fields
- Detailed incident view with comprehensive information

### Authentication System

- Session-based authentication with Zustand
- Automatic redirects for authenticated/unauthenticated users
- Persistent login state across browser sessions

### Responsive Design

- Mobile-first responsive design
- Collapsible sidebar for better mobile experience
- Adaptive layouts for different screen sizes

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🎨 Theming

The application supports both dark and light themes using `next-themes`. Users can:

- Toggle between dark/light modes
- Automatic system theme detection
- Persistent theme preference

## 🔧 Configuration

The app uses several configuration files:

- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `components.json` - Shadcn/ui configuration
- `tsconfig.json` - TypeScript configuration

## 📱 Browser Support

AgentSOC supports all modern browsers including:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 🤝 Development

This is a private application for internal organizational use.

For development team members:

1. Follow the organization's development guidelines
2. Create feature branches for new development: `git checkout -b feature/new-feature`
3. Commit changes following internal standards: `git commit -am 'Add new feature'`
4. Submit pull requests through the internal review process

## 📄 License

This project is private and proprietary to the organization.

## 🆘 Support

For support and questions, please contact the internal development team or submit tickets through the organization's internal ticketing system.
