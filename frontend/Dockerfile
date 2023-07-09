FROM node:alpine

#Creates directories
RUN mkdir -p /frontend

#Sets an environment variable
ENV PORT 3000

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /frontend

#Copy new files or directories into the filesystem of the container
COPY package.json /frontend
COPY package-lock.json /frontend

#Execute commands in a new layer on top of the current image and commit the results
RUN npm install --legacy-peer-deps

##Copy new files or directories into the filesystem of the container
COPY . /frontend

#Execute commands in a new layer on top of the current image and commit the results
RUN npm run build

#Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 3000

#Allows you to configure a container that will run as an executable
ENTRYPOINT ["npm", "run"]