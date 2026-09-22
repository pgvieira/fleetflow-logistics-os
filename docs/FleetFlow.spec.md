# Project: FleetFlow — Fleet Management Platform

**Industry:** Logistics / Transportation                      
**Role:** Frontend Engineer                               
**Difficulty:** Mid → Senior                                    
**Suggested stack:** React + TypeScript, but you can choose the rest

## 1. Product context

A logistics company operates a fleet of trucks used to transport goods between distribution centers and customers.

They currently manage vehicles, drivers, maintenance, and trips through spreadsheets and several disconnected systems.

The company wants a web application where its operations team can:

- monitor the fleet;
- register and manage vehicles;
- manage drivers;
- schedule trips;
- track vehicle maintenance;
- identify operational problems;
- analyze basic fleet metrics.

The application will initially be used by approximately 50–100 internal users.

## 2. User roles

There are three roles:

### **Fleet Manager**

Can:

- view all fleet information;
- create/edit vehicles;
- create/edit drivers;
- schedule trips;
- cancel trips;
- manage maintenance records;
- access dashboards and reports.

### **Dispatcher**

Can:

- view vehicles and drivers;
- schedule trips;
- assign drivers and vehicles;
- update trip status;
- view maintenance information.

Cannot:

- delete vehicles;
- manage users;
- modify maintenance configuration.

### **Driver**

Can:

- view their assigned trips;
- view trip details;
- update the status of their current trip;
- report a vehicle problem.

## 3. Authentication

The application requires authentication.

The backend provides:

| HTTP Method | Endpoint     |
|-------------|--------------|
| POST        | /auth/login  |
| POST        | /auth/logout |
| GET         | /auth/me     |

Login:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Response:

```json
{
  "user": {
    "id": "usr_123",
    "name": "John Smith",
    "email": "john@example.com",
    "role": "FLEET_MANAGER"
  }
}
```

The frontend must protect authenticated routes.

The user's permissions should determine which features/actions are available.

## 4. Dashboard

After logging in, users are taken to the dashboard.

The dashboard should display:

### Fleet overview

- Total vehicles
- Available vehicles
- Vehicles currently on a trip
- Vehicles under maintenance

### Trips

- Scheduled
- In progress
- Completed
- Cancelled

### Alerts

Examples:

- Vehicle maintenance overdue
- Vehicle unavailable
- Driver license expiring soon
- Trip without an assigned driver
- Trip without an assigned vehicle

### Recent trips

Display the latest trips with:

- origin;
- destination;
- vehicle;
- driver;
- scheduled departure;
- status.

The dashboard should allow the user to select a date range.

## 5. Vehicles

Route:

```GET /vehicles```

Display a paginated list.

Each vehicle contains:

```json
{
  "id": "veh_123",
  "plate": "ABC1D23",
  "model": "Volvo FH 540",
  "year": 2024,
  "type": "TRUCK",
  "status": "AVAILABLE",
  "odometer": 152340,
  "nextMaintenance": "2026-10-15"
}
```

Possible statuses:

```
AVAILABLE
IN_TRIP
MAINTENANCE
INACTIVE
```

The user should be able to:

- search by plate/model;
- filter by status;
- filter by vehicle type;
- sort columns;
- paginate;
- open vehicle details.

## 6. Vehicle details

Route:

```GET /vehicles/:vehicleId```

Display:

### Basic information

- Plate
- Model
- Manufacturer
- Year
- Vehicle type
- Current status
- Mileage

### Current trip

If the vehicle is currently assigned to a trip, display it.

### Maintenance history

Show:

- maintenance type;
- date;
- mileage;
- cost;
- description;
- status.

### Actions

Depending on permissions:

- Edit vehicle
- Deactivate vehicle
- Schedule maintenance

## 7. Drivers

Route:

```GET /drivers```

Display a searchable and paginated list.

Driver:

```json
{
  "id": "drv_123",
  "name": "Carlos Silva",
  "licenseNumber": "123456789",
  "licenseCategory": "E",
  "licenseExpiration": "2027-05-20",
  "status": "ACTIVE"
}
```

The interface should indicate when a driver's license is:

- valid;
- expiring within 30 days;
- expired.

Users should be able to:

- search;
- filter;
- create;
- edit;
- view details.

## 8. Trips

This is the most important module.

Route:

`GET /trips`

A trip contains:

```json
{
  "id": "trip_123",
  "origin": "São Paulo",
  "destination": "Curitiba",
  "scheduledDeparture": "2026-10-02T08:00:00Z",
  "estimatedArrival": "2026-10-02T14:00:00Z",
  "vehicleId": "veh_123",
  "driverId": "drv_123",
  "status": "SCHEDULED"
}
```

Statuses:

```
DRAFT
SCHEDULED
IN_PROGRESS
COMPLETED
CANCELLED
```

## 9. Creating a trip

Route:

`POST /trips/new`

The user needs to provide:

- origin;
- destination;
- scheduled departure;
- estimated arrival;
- vehicle;
- driver;
- optional notes.

### Important business rules

The frontend should prevent invalid combinations.

For example:

`A vehicle cannot be assigned to two trips whose schedules overlap.`

The same rule applies to drivers.

Example:

```
Vehicle ABC1D23
Trip A
08:00 → 12:00
```

```
Vehicle ABC1D23
Trip B
10:00 → 15:00
```

This must not be allowed.

The API will also validate this, so the frontend must correctly handle the server error.

## 10. Trip details

Route:

`GET /trips/:tripId`

Display:

- trip information;
- driver;
- vehicle;
- timeline;
- status;
- notes.

Possible actions:

```
SCHEDULED
↓
IN_PROGRESS
↓
COMPLETED
```

A scheduled trip can also become:

`SCHEDULED → CANCELLED`

Invalid transitions must not be available.

For example:

`COMPLETED → IN_PROGRESS`

it is not allowed.

## 11. Maintenance

Route:

`GET /maintenance`

Display scheduled and historical maintenance.

Maintenance record:

```json
{
  "id": "mnt_123",
  "vehicleId": "veh_123",
  "type": "PREVENTIVE",
  "scheduledDate": "2026-10-15",
  "status": "SCHEDULED",
  "estimatedCost": 1500,
  "description": "Oil and filter replacement"
}
```

Types:

```
PREVENTIVE
CORRECTIVE
INSPECTION
```

Statuses:

```
SCHEDULED
IN_PROGRESS
COMPLETED
CANCELLED
```

The vehicle should automatically appear as unavailable when it enters maintenance.

## 12. Vehicle problem reporting

Drivers have an additional action:

`Report problem`

Example:

```json
{
  "vehicleId": "veh_123",
  "type": "MECHANICAL",
  "severity": "HIGH",
  "description": "Engine temperature is above normal."
}
```

Severity:

```
LOW
MEDIUM
HIGH
CRITICAL
```

Critical problems should generate a visible alert for Fleet Managers.

## 13. API behavior

Assume the API supports:

| HTTP Method | Endpoint      |
|-------------|---------------|
| GET         | /vehicles     |
| GET         | /vehicles/:id |
| POST        | /vehicles     |
| PUT         | /vehicles/:id |
| DELETE      | /vehicles/:id |

| HTTP Method | Endpoint     |
|-------------|--------------|
| GET         | /drivers     |
| GET         | /drivers/:id |
| POST        | /drivers     |
| PUT         | /drivers/:id |

| HTTP Method | Endpoint            |
|-------------|---------------------|
| GET         | /trips              |
| GET         | /trips/:id          |
| POST        | /trips              |
| PUT         | /trips/:id          |
| POST        | /trips/:id/cancel   |
| POST        | /trips/:id/start    |
| POST        | /trips/:id/complete |

| HTTP Method | Endpoint     |
|-------------|--------------|
| GET         | /maintenance |
| POST        | /maintenance |

| HTTP Method | Endpoint          |
|-------------|-------------------|
| POST        | /vehicle-problems |

| HTTP Method | Endpoint   |
|-------------|------------|
| GET         | /dashboard |

List endpoints support:

```
?page=1
&pageSize=20
&search=...
&status=...
&sortBy=...
&sortDirection=...
```

## 14. API errors

The API can return:

Validation error

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid request",
  "fields": {
    "scheduledDeparture": "Departure must be before estimated arrival."
  }
}
```

Business rule violation

```json
{
  "code": "RESOURCE_CONFLICT",
  "message": "The selected vehicle is already assigned to another trip during this period."
}
```

Unauthorized

`401`

Forbidden

`403`

Not found

`404`

Unexpected error

`500`

You should decide how each category should be presented to the user.

## 15. Non-functional requirements

The application should:

- work on desktop and tablet;
- have accessible interactive elements;
- provide loading states;
- provide empty states;
- provide error states;
- prevent duplicate submissions;
- provide confirmation for destructive actions;
- preserve filters/pagination when appropriate;
- handle API failures gracefully;
- avoid unnecessary API requests;
- provide feedback after mutations.

## 16. Important edge cases

These are intentional traps.

Your implementation should consider:

### Authentication

What happens if the user's session expires while they are using the application?

### Pagination

What happens if the user is on page 5 and deletes the last item on that page?

### Filters

What happens when filters change while a previous request is still loading?

### Forms

What happens if the API rejects a field that passed frontend validation?

### Double submission

What happens if the user clicks Save five times?

### Navigation

What happens if the user has unsaved changes and tries to leave the form?

### Concurrent changes

What happens if another user changes a trip while you're viewing it?

### Permissions

What happens if the user's permissions change during their session?

### Empty data

What does the dashboard look like for a newly created account with no vehicles or trips?

## 17. What I am deliberately NOT specifying

This is important.

I am **not** telling you:

- whether to use Redux/Zustand/context;
- whether to use TanStack Query;
- whether to use React Hook Form;
- whether to use Zod;
- how to structure your folders;
- whether to use feature-based architecture;
- whether to use a design system;
- whether to use Tailwind;
- whether to use a UI library;
- how to implement routing;
- how to handle authentication;
- how to cache data;
- how to handle server state;
- how to test it.

Those are your engineering decisions.

## 18. Your challenge

Build the application as if you received this specification from a real product team.

I'd recommend you **don't ask me for the solution while developing it.**

Instead, when you hit a decision like:

`Should I put this state in Zustand or keep it local?`

make the decision yourself and document why.

When you're finished, bring me:

1. Architecture/folder structure
2. Important technical decisions
3. Screenshots or the running application
4. Code/repository if available
5. Tests
6. Any decisions you're unsure about

Then I'll review it as a Senior Frontend Engineer / Tech Lead.

And I won't just say "looks good".

I'll challenge things like:

`Why is this state global?`

`Why are you caching this?`

`Why is this component responsible for data fetching?`

`What happens if two requests race?`

`Why did you choose this abstraction?`

`Is this actually reusable or just prematurely abstracted?`

`What happens when this list has 100,000 records?`

`Why is this business rule duplicated between the UI and hook?`