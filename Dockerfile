FROM node:20-alpine
WORKDIR /app

# Copy only essential files
COPY package*.json ./
COPY src ./src
COPY public ./public
COPY index.html .
COPY vite.config.* .

# Install dependencies inside the image
RUN npm ci

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
