# Symalysis - 3D Model Visualization and Digital Twin Platform

Symalysis is a web-based application designed for visualizing and analyzing 3D models, with a focus on creating a "Digital Twin" of physical assets. It allows users to upload and interact with 3D models, overlay inspection data, and leverage AI-powered features for enhanced analysis and support.

## Key Features

  * **3D Model Interaction:** Load and view 3D models in `.gltf` and `.step` formats in a 3D canvas powered by Three.js and React Three Fiber.
  * **Data Visualization:** Overlay inspection data, such as PEC and LRUT data, onto the 3D models to visualize sensor readings and other metrics.
  * **File Conversion:** A backend service handles the conversion of `.step` files into the `.gltf` format suitable for web viewing.
  * **AI-Powered Features:** An "AI Corner" provides access to predictive models and a chatbot powered by Ollama for enhanced analysis and support.

## Tech Stack

**Frontend:**

  * **Framework:** React with Vite
  * **3D Rendering:** Three.js and React Three Fiber
  * **UI:** Tailwind CSS and Material Tailwind
  * **State Management:** Valtio

**Backend:**

  * **Framework:** Python with FastAPI
  * **Task Queue:** Celery with Redis
  * **File Conversion:** gmsh and trimesh

**Deployment:**

  * **Containerization:** Docker and Docker Compose

## Getting Started

### Prerequisites

  * Node.js and npm
  * Python 3.11
  * Docker and Docker Compose

### Installation and Running

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/symalysis.git
    cd symalysis
    ```

2.  **Install frontend dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

4.  **Set up the backend:**

      * Navigate to the `services/convertor` directory:
        ```bash
        cd services/convertor
        ```
      * Install Python dependencies:
        ```bash
        pip install -r requirements.txt
        ```

5.  **Run the application with Docker:**

      * From the root directory, start all services using Docker Compose:
        ```bash
        docker-compose up
        ```

## Usage

  * Open the application in your web browser.
  * Use the navigation menu to upload a 3D model in `.gltf` or `.step` format.
  * Interact with the model in the 3D canvas.
  * Upload CSV files with PEC or LRUT data to visualize inspection data.
  * Access the "AI Corner" for predictive analysis and chatbot support.

## Project Structure

```
symalysis/
├── public/
├── services/
│   └── convertor/
│       ├── app/
│       │   ├── main.py
│       │   └── worker.py
│       ├── Dockerfile
│       └── requirements.txt
├── src/
│   ├── assets/
│   ├── canvas/
│   ├── components/
│   ├── config/
│   ├── pages/
│   ├── providers/
│   ├── store/
│   ├── App.jsx
│   └── main.jsx
├── .dockerignore
├── .eslintrc.cjs
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── index.html
├── package.json
└── README.md
```

## Contributing

Contributions are welcome\! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.