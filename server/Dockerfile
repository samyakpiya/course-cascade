# Use the AWS Lambda Node.js 20 base image
FROM public.ecr.aws/lambda/nodejs:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev dependencies for building)
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Build TypeScript files
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Use a second stage to prepare the production image
FROM public.ecr.aws/lambda/nodejs:20

# Set the working directory
WORKDIR ${LAMBDA_TASK_ROOT}

# Copy built JavaScript files and node_modules from the build stage
COPY --from=build /app/dist ${LAMBDA_TASK_ROOT}
COPY --from=build /app/node_modules ${LAMBDA_TASK_ROOT}/node_modules

# Copy package.json (optional)
COPY --from=build /app/package*.json ${LAMBDA_TASK_ROOT}

# Set environment variables (adjust as needed)
ENV NODE_ENV=production

# Command to start the Lambda function
CMD ["index.handler"]