# The Twix App

## Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Authors](#authors)

## Description

The app is a social media platform that allows users to post messages, view posts from others, like posts, and add comments. The app is easy to use and offers a user-friendly interface.

## Features

- **Register/Login**: Users can register/login.
- **Posting**: Users can create new posts.
- **Feed**: Users can view posts from others in a feed.
- **Liking**: Users can like posts.
- **Commenting**: Users can add comments to posts.

## Installation

First of all you need to pull **sqldb** from the user **mlepnos** in docker.
![Docker Image](images/image.png)

To start the app you need to `docker-compose up` in the root of the project.

```bash
docker-compose up
```

Now you need to run `npm install` or `yarn install` to install the dependencies.

To start the application you need to start the two containers in docker.
Then you need to visit the site [Twix](http://localhost:3000/login)

## Usage

After installing and starting the application, you can use it as follow:

1. **Register and Login**:

   - Register with an email address and password, or you can use the login informations.
   - Login with this email **kaan@gmail.com** and the password **123456**.

2. **Posting**:

   - Create a new post by clicking the button and entering your message.

3. **Feed**:

   - View the latest posts from other users in the feed.

4. **Liking**:

   - Like a post by clicking the heart icon.

5. **Commenting**:
   - Add a comment to a post by clicking the plus button and entering your comment.

## Authors

**M. Kaan Asik** and **Esra Balci**
