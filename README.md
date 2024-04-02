# Social media Application

## Description:
I've developed a dynamic social media platform,
Where users can effortlessly follow and unfollow,
Engage with content by liking and posting photos,
And seamlessly connect with posts from those they follow.

## Features:
 `User registration`: Implemented a seamless registration process for new users.\
 `User login`: Enabled secure login functionality for registered users.\
`Create post`: Provided users with the ability to craft and share their own posts.\
`View post`: Developed a feature allowing users to browse through posts from themselves and others.\
`Like post`: Implemented the option for users to express appreciation for posts by liking them.\
`Follow/unfollow`: Enabled users to connect with others by following or unfollowing their profiles.\
`Show follow list`: Provided users with a convenient way to view the list of profiles they follow\

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
`PUT /`\
Description: Update a post.\
`DELETE /`\
Description: Delete a post.\

Bcrypt Mechanism:\
This section outlines the use of bcrypt for secure password comparison:\
Mechanism\
Secure Comparison: Bcrypt's compare() function securely compares plaintext passwords with hashed passwords.\
Benefits\
Enhanced Security: Comparing hashed passwords protects user data, even in case of a breach.\
Ease of Use: Bcrypt simplifies secure password comparison for developers.\
Integration\
Node.js Usage: Utilize compare() from the bcrypt package for password comparison.\
Security Considerations\
Data Sensitivity: Treat passwords as sensitive data to prevent unauthorized access.\
Parameter Security: Safeguard bcrypt parameters and secrets.\
Contact Information\
For assistance or issues, contact [Your Contact Information].\



