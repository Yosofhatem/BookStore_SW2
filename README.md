# BookStoreSystem_SW2
The Bookstore Management System is a comprehensive web application  designed to streamline the operations of a bookstore by effectively  managing its inventory and facilitating customer interactions.

## Side info:
The database are an image that i pull the image MySQL from Dockerhup and make a connection with the back-end that no need to install the dependencies or any application  **"the power of Docker"**,

For the back-end all i do is make a docker file that copy my .jar file which has all my code and dependencies that all for any one take the code and run with no installiation for any thing.

docker-compose is just for running the two container the back and the database togather.
## How to use?
the back-end has an image that you can run on docker container in an easy way 
just open visual studio code, copy this back-end code and run this commend in the terminal 
*docker compose up -d* .

The front-end u can run it using npm start .

## key feature :

### Secure User Management:

- Leverage Spring Security for user authentication , authorization and of course JWT .
- Implement different user roles (admin, super admin) with varying access levels.
- Secure user sessions to manage access and prevent unauthorized activity.

### Encrypted Data Storage:

- Integrate AES encryption to safeguard sensitive customer and book information at rest.
- This protects data from unauthorized access even if the system is breached.

### Search and Filtering:

- Enable efficient search for books by title, author, genre, or keyword.
- Implement filters to sort inventory based on availability, price, format.

### Genre Organization:

- Categorize books by genre for intuitive browsing by users.
- Allow for subcategories within genres for further organization.

### Admin Features:

Implement distinct user roles:
#### Super Admin: Highest privilege, manages all aspects of the system.
- Create, edit, and deactivate admin and user accounts.
- Manage user roles and permissions.
  
#### Admin: Manages bookstore operations.
- Add, edit, and delete book information (title, author, genre, etc.)
- Create and manage user accounts.

## Note:
you can enter as a user with the registeration button 

but if you want to enter as a admin or super admin you can register using postman collection


![register](https://github.com/Yosofhatem/BookStore_SW2/assets/99391572/b9bf98c2-362b-4546-a8db-d1161dad7ef0)

by changing the role to ADMIN ,or SUP_ADMIN and take the generated token when login you can enter as an admin

and that's it, thanks for your time and feel free to reach me, .

