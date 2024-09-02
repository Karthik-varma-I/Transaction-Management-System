# Transaction-Management-System
This web development project is designed to manage transactions with a focus on CRUD (Create, Read, Update, Delete) operations. The system includes distinct interfaces for both users and administrators, built using HTML, CSS, JavaScript, Express, and MySQL.
Contributed to the project by designing intuitive UIs, developing RESTful APIs with Express.js, and managing MySQL databases. Implemented secure authentication, transaction notifications, and admin controls for user and transaction management.

How to run the project:
-> Ensure all the files available in the project folder.
-> Firstly execute 'database.sql'(/server) file in your local mysql.
-> Use command 'npm i' or 'npm install' inorder to download all the dependency modules.
-> To run the server you have to use command "npm start". Also ensure 
   your terminal path is in directory 'server'.
-> Then server will run at the url 'http:localhost:8888'.

-> All the frontend part is residing in client directory.
-> All the API files and database.sql are residing in the server directory.
-> 'Client' directory is used as static directory, where all the files in client 
   directory are static.
     
-> Landing page would be 'create account' page.
-> You can login as:
    -- User using SignIn form.
    -- Admin using Admin form with Login credintials:
        = email : "admin@gmail.com"
        = password : "admin"


Features:

User Functionality:
-------------------
Account Creation: Users can create and manage their own accounts.
Transaction Creation: Users can create transactions, which will trigger notifications to the admin.

Admin Functionality:
--------------------
Account Management: Admins have the authority to update and delete user accounts.
Transaction Management: Admins can view, accept, or reject user-created transactions. They also have the capability to update or delete existing transactions.
Notifications: Admins receive notifications whenever a new transaction is created by a user.

Authentication and Authorization:
--------------------------------
User Authentication: Ensures secure access for users to their accounts.
Admin Authorization: Grants admin privileges for managing transactions and user accounts.

Tech Stack:
----------
Frontend: HTML, CSS, JavaScript
Backend: Express.js
Database: MySQL
