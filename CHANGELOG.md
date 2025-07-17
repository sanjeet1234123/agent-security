# Changelog

All notable changes to the AgentSOC project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Planned: Real-time incident notifications
- Planned: Advanced incident analytics dashboard
- Planned: Incident response automation
- Planned: Integration with external SIEM tools

## [0.1.0] - 2025-07-07

### Added

- Initial release of AgentSOC Security Operations Center dashboard
- Comprehensive incident management system with CRUD operations
- Advanced filtering and search capabilities for security incidents
- User authentication system with session management
- Responsive web design with dark/light theme support
- Real-time notification drawer for security alerts
- Pagination support for large incident datasets
- Modern UI components using Radix UI primitives
- TypeScript support throughout the application
- Zustand state management for authentication and app state

### Security Incident Categories Supported

- **Privilege Escalation**: AdminPolicy attacks and unauthorized privilege changes
- **Unauthorized Access**: Root login attempts from suspicious IPs (including Tor)
- **Malware**: EC2 CryptoMiner and other malicious software detection
- **Misconfiguration/Data Exposure**: Public S3 buckets with PII and other exposures
- **Vulnerability**: Critical CVEs in Lambda functions and other services
- **Reconnaissance**: SSH port probes and network scanning attempts

### Features

- **Dashboard Layout**: Collapsible sidebar navigation with responsive design
- **Incident Table**: Sortable, filterable table with status indicators
- **Search Functionality**: Global search across incident names, categories, and users
- **Status Management**: Track incidents through "Needs Attention", "Reviewed", and "Contained" states
- **User Interface**: Modern, accessible UI with consistent design patterns
- **Theme Support**: System-aware dark/light mode with user preference persistence
- **Authentication**: Secure login system with demo credentials support

### Technical Implementation

- **Framework**: Next.js 15.3.4 with App Router and Turbopack
- **Language**: TypeScript 5 for type safety
- **Styling**: Tailwind CSS 4.0 with custom design system
- **State Management**: Zustand for lightweight state management
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: Tabler Icons and Lucide React for consistent iconography
- **Build Tool**: Turbopack for faster development builds

### Development Environment

- **Node.js**: Support for Node.js 20+
- **Package Manager**: Support for npm, yarn, pnpm, and bun
- **Code Quality**: ESLint configuration with Next.js rules
- **Type Checking**: Strict TypeScript configuration

### Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### Demo Data

- Sample security incidents across all supported categories
- Demo authentication credentials for testing
- Realistic incident data for development and testing

---

## Version History

### Version Numbering

This project follows semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Incompatible API changes
- **MINOR**: New functionality in a backwards compatible manner
- **PATCH**: Backwards compatible bug fixes

### Release Schedule

- Major releases: Quarterly
- Minor releases: Monthly
- Patch releases: As needed for critical bugs

### Support

- Current version: Full support
- Previous minor version: Security updates only
- Older versions: No support

---

## Internal Development Guidelines

For internal development team members working on this project:

1. **Added** for new features
2. **Changed** for changes in existing functionality
3. **Deprecated** for soon-to-be removed features
4. **Removed** for now removed features
5. **Fixed** for any bug fixes
6. **Security** for vulnerability fixes

Follow the format above and add entries under the [Unreleased] section until the next release. All changes should be reviewed through the organization's internal development process.
