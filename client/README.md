# Course Cascade

Course Cascade is a modern Learning Management System (LMS) built with Next.js, leveraging cloud infrastructure for scalability and performance.

## Features

- 🔐 Secure authentication with Clerk
- 📚 Course creation and management
- 📝 Interactive lesson content
- 📊 Student progress tracking
- 🎥 Video content streaming
- 💾 File storage and management
- 📱 Responsive design for all devices

## Tech Stack

### Frontend

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Clerk Authentication

### Backend & Infrastructure

- AWS Lambda (Serverless Functions)
- Amazon API Gateway
- Amazon DynamoDB
- Amazon S3 (File Storage)
- Amazon CloudFront (CDN)
- Amazon ECR (Container Registry)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- AWS Account
- Clerk Account
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/course-cascade.git
cd course-cascade
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
# ... other environment variables
```

4. Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy

### AWS Infrastructure Setup

1. Configure AWS CLI
2. Deploy AWS resources using Infrastructure as Code (IaC)
3. Set up CI/CD pipeline

Detailed deployment instructions can be found in the [deployment documentation](docs/deployment.md).

## Architecture

```
┌─────────────────┐
│   Next.js App   │
└─────────────────┘
         │
         ├────────────────────────────┐
         ▼                            ▼
┌─────────────────┐           ┌──────────────┐
│    Clerk Auth   │           │  CloudFront  │
└─────────────────┘           └──────────────┘
         │                            │
         ▼                            ▼
┌─────────────────┐           ┌──────────────┐
│     Vercel      │           │     S3       │
└─────────────────┘           └──────────────┘
         │
         ▼
┌─────────────────┐
│   API Gateway   │
└─────────────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────┐
│   AWS Lambda    │◀────│     ECR      │
└─────────────────┘     └──────────────┘
         │
         ├────────────────────────────┐
         ▼                            ▼
┌─────────────────┐           ┌──────────────┐
│    DynamoDB     │           │     S3       │
└─────────────────┘           └──────────────┘
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- AWS for cloud infrastructure
- Clerk for authentication services

---

Built with ❤️ using [Next.js](https://nextjs.org/)
