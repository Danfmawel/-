# Используем образ линукс Alpine
FROM node:20.18.0-alpine

# Указываем рабочую дерикторию
WORKDIR /app

# Копируем package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем всё остальное
COPY . .

# Установить Prisma
RUN npm install -g prisma

# Копируем Prisma schema
COPY prisma/schema.prisma ./prisma/

# Генерируем Prisma client
RUN prisma generate

# Открыть порт для разработки
EXPOSE 4000

# Команда запуска (можно поменять на npm start для production)
CMD ["npm", "run", "start:dev"]