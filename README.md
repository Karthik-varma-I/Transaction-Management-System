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


User Operations:
----------------
-> User can create account and make some transactions.
-> In User page, user details and transaction details are displayed.

Admin Operations:
-----------------
-> Admin is having authority for CRUD operations.
-> There is only single admin account available.
-> Admin can 'read' all the users with their respective transactions.
-> Admin can 'update' the transaction details of any user.
-> Admin can 'delete' any user or also any particular transaction of a user.
