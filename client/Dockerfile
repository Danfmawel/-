# Используем образ
FROM node:20.18.0-alpine

# Указываем рабочую дерикторию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем всё остальное
COPY . .

EXPOSE 3000

CMD [ "npm" , "run" , "dev" ]