# Cloud Storage Application

Welcome to the Cloud Storage Application repository! This application allows you to store and manage files in the cloud.

'pdf', 'docx', 'png', 'xlsx', 'jpeg', 'gif', 'bmp', 'csv', 'mp4', 'webm', 'mp3' and 'txt' file extensions preview is supported!

## Deployment Instructions
```shell
### Step 1: Clone the repository

git clone https://github.com/AlTeleg/cloud-storage

### Step 2: Install dependencies for the frontend

cd cloud-storage/frontend
npm install
npm run build

### Step 3: Create and activate a Python virtual environment

cd ../backend
python -m venv venv  # Create a virtual environment (optional)
source venv/bin/activate  # Activate the virtual environment (optional) - for Unix/Mac
venv\Scripts\activate  # Activate the virtual environment (optional) - for Windows

### Step 4: Set up the database and create a .env file

Before proceeding with this step, make sure you have PostgreSQL installed and running. Then, create a new database for the application.

Next, create a file named .env in the cloud-storage/backend/ directory. Inside the file, add the following configuration variables:

SECRET_KEY=your-secret-key
DEBUG=True  # or False, depending on your needs
ALLOWED_HOSTS=your-allowed-hosts

DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-db-host
DB_PORT=your-db-port

Replace your-secret-key, your-allowed-hosts, your-db-name, your-db-user, your-db-password, your-db-host, and your-db-port with your own values.

### Step 5: Install dependencies for the backend

cd storage_server
pip install -r requirements.txt

### Step 6: Create and apply migrations, collect static files

python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic

### Step 7: Run the backend server

python manage.py runserver 0.0.0.0:8000

Now you can access the application by visiting http://localhost:8000 in your web browser.

## Short Deployment Instructions

If you already have the backend repository cloned, you can follow these shortened instructions:

### Step 1: Create and activate a Python virtual environment

cd cloud-storage-back
python -m venv venv  # Create a virtual environment (optional)
source venv/bin/activate  # Activate the virtual environment (optional) - for Unix/Mac
venv\Scripts\activate  # Activate the virtual environment (optional) - for Windows

### Step 2: Set up the database and create a .env file

Before proceeding with this step, make sure you have PostgreSQL installed and running. Then, create a new database for the application.

Next, create a file named .env in the cloud-storage-back/ directory. Inside the file, add the following configuration variables:

SECRET_KEY=your-secret-key
DEBUG=True  # or False, depending on your needs
ALLOWED_HOSTS=your-allowed-hosts

DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-db-host
DB_PORT=your-db-port

Replace your-secret-key, your-allowed-hosts, your-db-name, your-db-user, your-db-password, your-db-host, and your-db-port with your own values.

### Step 3: Install dependencies for the backend

cd storage_server
pip install -r requirements.txt

### Step 4: Create and apply migrations, collect static files

python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic

### Step 5: Run the backend server

python manage.py runserver 0.0.0.0:8000

Now you can access the application by visiting http://localhost:8000 in your web browser.