# Инструкция по разворачиванию проекта (полный вариант)

## Шаг 1: Клонирование репозитория

git clone https://github.com/AlTeleg/cloud-storage

## Шаг 2: Установка зависимостей для frontend

cd cloud-storage/frontend
npm install

## Шаг 3: Создание статических файлов для frontend

npm run build

## Шаг 4: Установка зависимостей для backend

cd ../backend
pip install -r requirements.txt

## Шаг 5: Генерация и применение миграций 

python manage.py makemigrations
python manage.py migrate

## Шаг 6: Запуск сервера backend

python manage.py runserver




# Инструкция по разворачиванию проекта (короткая версия)

## Шаг 1: Клонирование репозитория backend

git clone https://github.com/AlTeleg/cloud-storage-back

## Шаг 2: Установка зависимостей для backend

cd cloud-storage
pip install -r requirements.txt

## Шаг 3: Генерация и применение миграций 

python manage.py makemigrations
python manage.py migrate

## Шаг 4: Запуск сервера backend

python manage.py runserver
