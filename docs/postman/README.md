# Mini ERP + CRM Postman package

Import:

1. `Mini_ERP_CRM.postman_collection.json`
2. `Local.postman_environment.json`

Select the local environment, set the four password variables to the seeded
assessment passwords, and run the entire collection in order. Password values
are intentionally blank and marked secret in the committed environment.

The default `baseUrl` is `http://localhost:4000/api/v1`. For the currently
verified production-style fallback, change it to
`http://localhost:4400/api/v1`.

The runner creates uniquely suffixed customer, product, and challan records.
It verifies:

- API and database readiness.
- Login and token capture for Admin, Sales, Warehouse, and Accounts.
- Customer creation, follow-up history, and read access.
- Warehouse product creation and stock IN.
- Sales stock-write denial.
- Insufficient manual stock OUT.
- Draft challan creation without stock mutation.
- Confirmation and Accounts read access.
- Repeated-confirmation protection.
- Insufficient-stock confirmation rollback.
- Sales denial and Admin success for Confirmed cancellation.
- Repeated-cancellation protection.

The collection does not delete its synthetic records because no destructive
delete endpoints exist. Use a disposable local database when repeatedly
running it.
