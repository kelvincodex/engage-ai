# Engage AI

## Project Overview

Engage AI is a modern React application leveraging cutting-edge technologies to provide an enhanced user experience.
the live link: https://engage-ai.onrender.com
## Prerequisites

- Node.js (version 16 or later)
- Yarn package manager

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kelvincodex/engage-ai.git
cd engage-ai
```

### 2. Environment Setup

1. Create environment file:
```bash
cp .env.example .env
```

2. Open `.env` and fill in any required environment variables

### 3. Install Dependencies

```bash
yarn install
```

## Running the Project

To start the development server:

```bash
yarn dev
```

## Key Features

- React.js frontend application
- Redux state management
- LocalForage as persistent storage engine
- Deep serialization for complex state management

### State Management

- **Redux**: Centralized state management
- **LocalForage**: Provides offline storage capabilities
- **Deep Serialization**: Enables complex object storage and retrieval

## Available Scripts

- `yarn dev`: Start development server
- `yarn build`: Create production build
- `yarn peview`: Run preview

## Project Structure

```
engage-ai/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── store/
│   │   ├── module/
│   │   └── index/
│   ├── service/
│   ├── util/
│   ├── view/
│   ├── model/
│   └── router/
│
├── .env.example
└── README.md
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
