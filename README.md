

Backend
  Database Endpoints:
    http://localhost:8080/
      Shows welcome to the database message.

    http://localhost:8080/users
      Shows all users in the database including their ID, first name, last name, and username. User has a protected password that will not appear.

    http://localhost:8080/items
      Shows all of the items in the database including thier ID, userID, the item name, quantity, image, and description.

    http://localhost:8080/items/1 ,http://localhost:8080/items/2, etc.
      Shows all of the items under a specific user_id. This is what gives each user their store items when they log in.

    http://localhost:8080/details/1, http://localhost:8080/details/2, etc.
      Shows the item details for a specific item. This is used for the ProductDetails page for any specific inventory item.



Frontend
Note: All capitalized terms below are components for the given page.
  http://localhost:3000/
    This is the HomePage that will prompt the user to either log in, register, or view all of the inventory under visitor view.
    It includes a Navbar with a login button that prompts the user back to the homepage to log in from any other page in the app.

  http://localhost:3000/visitor
    Clicking visitor view from the HomePage leads to the VisitorInventory page.
    This shows a list of all of the items in the database including item id, name, stock/inventory, and description.
    The visitor can add a new item or view click on an item name to view the full details.

  http://localhost:3000/add-item
    When the visitor clicks the new item button they are taken to the AddItem page and prompted to add a name, quantity, and description for that item.
    The page routes back to the visitor inventory page after adding an item.

  http://localhost:3000/details/1, http://localhost:3000/details/2, etc
    From the visitor (/visitor) page, clicking on a product name will route to a ProductDetails page.
    This page will show the visitor the item's name, quantity, full description, and image.
    There is also a 'back to inventory, button that will route back to the visitor page.

  http://localhost:3000/register
    When a user clicks to register from the home page (http://localhost:3000/), they are routed to the Register page. It will prompt for a first name, last name, username, and password to create an account. All fields must be filled.
    The new user will then be routed back to the home page to log in with their new credentials.

  http://localhost:3000/user
    The new user will be routed to the UserInventory page that will look similar to the visitor inventory page.
    The differences include:
      For a new user the table will be blank. Simply use the new item button to begin adding items.
      Once there's an item on the table the user will see an edit button. This button will open a feature that lets the user modify the object within the page and either click save to update the item, or cancel the changes.
      There is also a delete button the user can click on to remove an item from the inventory.
    Each user will see a different list of items in their personal inventory.
    Note: To view preset examples log in with one of the following user credentials:
      Username: JohnDoe Password: Password123
      Username: JaneDoe Password: NewPassword321
