# Social media Application

## Description:
On our social media platform, users can post photos and engage with content by liking posts. Additionally, users can follow and unfollow others seamlessly, and connect with posts from those they follow,

## Features:
 `User registration`: Implemented a seamless registration process for new users.\
 `User login`: Enabled secure login functionality for registered users.\
`Create post`: Provided users with the ability to craft and share their own posts.\
`View post`: Developed a feature allowing users to browse through posts from themselves and others.\
`Like post`: Implemented the option for users to express appreciation for posts by liking them.\
`Follow/unfollow`: Enabled users to connect with others by following or unfollowing their profiles.\
`Show follow list`: Provided users with a convenient way to view the list of profiles they follow\
`Logout`:Implemented logout functionality for users.\
`Update Profile`:Implemented functionality for users to update their profile information such as profile picture, bio, etc.\
`Get FeedData`:Implemented functionality to fetch and display posts or updates from users that the current user follows.


## APIs
`This section outlines APIs.`\
Endpoints\
`POST /signup`\
Description: Register a new user.\
`POST /login`\
Description: Authenticate user login.\
`GET /refresh`\
Description: Refresh user access token.\
`POST /logout`\
Description: Logout current user. \
`GET /follow`\
Description: Toggle follow/unfollow for a specific user.\
`GET /getFeedData`\
Description: Retrieve feed data, including posts from users that the current user follows.\
`GET /getMyPosts`\
Description: Retrieve posts created by the current user.\
`GET /getUserPosts`
Description: Retrieve posts created by a specific user.\
`POST /getUserProfile`\
Description: Retrieve profile information of a specific user.\
`GET /getMyInfo`\
Description: Retrieve profile information of the current user.\
`PUT `/\
Description: Update profile information of the current user.



`Bcrypt Mechanism`:\
This section outlines the use of bcrypt for secure password comparison:\
 `Mechanism`
Secure Comparison: Bcrypt's compare() function securely compares plaintext passwords with hashed passwords.\
`Benefits`
Enhanced Security: Comparing hashed passwords protects user data, even in case of a breach.\
Ease of Use: Bcrypt simplifies secure password comparison for developers.\
`Integration`
Node.js Usage: Utilize compare() from the bcrypt package for password comparison.\
`Security Considerations`
`Data Sensitivity`: Treat passwords as sensitive data to prevent unauthorized access.\
`Parameter Security`: Safeguard bcrypt parameters and secrets.\
`Contact Information`
For assistance or issues, contact [Your Contact Information].



