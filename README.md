# Tina the AI Insurance Chatbot

An AI-powered chatbot that takes your car's make, model, and year and recommends an insurance policy.

## Features

- Ask about your car's make, model, and year.
- Receive a recommended insurance policy.
- Easy to run locally or with Docker.

## Tech Stack / Libraries

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [OpenAI API](https://openai.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [CORS](https://www.npmjs.com/package/cors)

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

2. Install dependencies:

```bash
# In frontend folder
npm install

# In backend folder
npm install

# In base folder (for concurrently)
npm install
```

## Running the Project

Start the frontend and backend concurrently:

```bash
npm run dev
```

Open your browser and interact with the chatbot at `http://localhost:5173`.

## Environment Variables

Create a `.env` file in the backend folder and add your OpenAI API key:

```env
PORT=your_backend_port_here
OPENAI_API_KEY=your_api_key_here
```

## Docker (Optional)

If you want to use Docker:

1. Build the Docker image:

```bash
docker compose build
```

2. Run the containers:

```bash
docker compose up
```

## Usage

1. Open the app in your browser.
2. Enter your car make and model.
3. Receive the recommended insurance policy.

## License

[MIT](LICENSE)
