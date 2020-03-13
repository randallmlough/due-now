# Invoiced
A rails + react + redux invoicing application

Invoiced is a low dependency user friendly invoicing application. Invoiced frontend is built off of react and redux. Rails is used as its API backend, but it is not tied to it. Invoiced is a standalone SPA with rails only serving the files and responding to API calls.

[Demo Invoiced](https://rails-invoiced.herokuapp.com)
## Features

- **Account management:** Register, Sign up, and log out.
- **Session management:** Invoiced leverages JWTs to determine the users access both on the client side and backend. 
- **Role Based Action Control:** Give roles to users by attaching those roles to the JWT. Rails backend will decode the jwt and will check if the user has permission to access or modify a resource beforehand. 
- **User dashboard:** The users dashboard fetches monthly activity and KPI's. Users also have the ability to create custom date ranges to view update information right from the dashboard.
- **Global search:** users can search for an invoice by either it's invoice number, the recipient's name or their email address to quickly locate and view.
- **Invoice pagination:** Users can set the desired amount of invoices they wish to view per page which dynamically updates the total pages available.
- **Invoice filtering:** Users can filter invoices by it's status (either paid or unpaid) and/or search for an invoice number as well (results will also update pagination).
- **Quick updates:** Changing the private status on the invoicing indexing page will save and update the invoice without needing to go directly to edit more.
- **Invoice creation:** Users can quickly create invoices and any number of line items relevant to the invoice.
- **Invoice updating:** Users can quickly update any invoice and changes will be reflected immediately.
- **Dynamic calculations:** Line items and subtotal/total will auto calculate when a change is determined.
- **Invoice Previews:** User can preview what the invoice will look like to the intended recipient before saving and sending off.
- **Public viewing:** Each created invoice is given a unique UUID which can be used to access the invoice by anyone without needing an account.
- **Private invoices:** An invoice can also be designated to private which won't allow anyone other than the user who created the invoice to view it.
- **Customizable Alerts/Flashes:** Present the user with simple alerts about the action or response that was just given (invoice update, logged out, etc.). Alert's are customizable.
- **Customizable Notifications:** Present the user with detailed notifications about things that happened across the app; such as, someone paid their invoice.

[See Invoiced in action](https://rails-invoiced.herokuapp.com)