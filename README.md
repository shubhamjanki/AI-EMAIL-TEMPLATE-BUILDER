# AI Email Template Builder

A modern web application that helps you create professional email templates using AI and send them directly through Gmail. Built with Next.js, Tailwind CSS, and Google's Gemini AI.

![AI Email Template Builder](https://images.unsplash.com/photo-1526554850534-7c78330d5f90?auto=format&fit=crop&q=80&w=1200&h=400)

## Features

- 🤖 **AI-Powered Generation**: Generate custom email templates using Google's Gemini AI
- 📝 **Pre-built Templates**: Choose from a collection of professional email templates
- ✉️ **Direct Gmail Integration**: Send emails directly through your Gmail account
- 🎨 **Modern UI**: Beautiful, responsive interface with glass-morphism design
- 🔒 **Secure Authentication**: Google OAuth2.0 for secure email sending
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18.x or later
- A Google Cloud Platform account
- Gmail account

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-email-template-builder
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Google Cloud Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable the Gmail API
4. Create OAuth 2.0 credentials
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy the Client ID and Client Secret to your `.env` file

## Usage

1. **Sign In**: Click the "Sign In with Google" button to authenticate
2. **Choose a Template**: Select from pre-built templates or create a custom one
3. **Generate with AI**: Enter a description and let AI create your email
4. **Customize**: Edit the generated template as needed
5. **Send**: Add recipient, subject, and send directly through Gmail

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **UI**: Tailwind CSS, shadcn/ui
- **Authentication**: NextAuth.js
- **AI**: Google Gemini AI
- **Email**: Nodemailer with Gmail
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom glass-morphism effects

## Features in Detail

### AI Template Generation
- Natural language prompt to email conversion
- Professional formatting
- Context-aware responses

### Pre-built Templates
- Welcome emails
- Newsletters
- Special offers
- Professional follow-ups

### Email Management
- HTML preview
- Copy to clipboard
- Direct sending
- Template management

### Security
- OAuth 2.0 authentication
- Secure token handling
- Email permissions management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Google Gemini AI](https://ai.google.dev/) - AI Model
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Nodemailer](https://nodemailer.com/) - Email Client
