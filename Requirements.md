# Functional Requirements Document (FRD) for Ride Sharing Application

## 1. Introduction

This document outlines the functional requirements for a ride-sharing application that enables authenticated users (via Keycloak) to offer rides, search for available rides, and book rides.

## 2. Scope

The system supports three primary user actions:
- **Offer a Ride:** A user can create a ride offer by specifying ride details.
- **Search for a Ride:** A user can search for available rides based on provided criteria.
- **Book a Ride:** A user can book a ride by selecting the number of places (seats) they require.

## 3. System Overview

- **Authentication:** All users must be authenticated through Keycloak.
- **Ride Data Model:** Each ride includes:
  - **Ride Date/Time**
  - **Car Type:** Two predefined car types are available: one with 7 seats and one with 4 seats.
  - **Itinerary:** An unordered selection of destinations chosen from a fixed list of 8 available destinations.
  - **Free Places:** A ride must specify the total number of free places available (an integer between 1 and 7).
  - **Price per Place:** A fixed value (ranging from 10 to 20) that, when multiplied by the number of chosen destinations and the number of seats booked, determines the total booking cost.

## 4. Functional Requirements

### 4.1 Ride Offering

- **FR-1:** The system shall allow an authenticated user to offer a ride.
  - **FR-1.1:** When offering a ride, the user must provide:
    - **Ride Date/Time.**
    - **Car Type:** Choose one of the two predefined types (7 seats or 4 seats).
    - **Itinerary:** A selection (order does not matter) from the fixed list of 8 available destinations.
    - **Total Free Places:** An integer value between 1 and 7.
    - **Price per Place:** A fixed price value within the range of 10 to 20.
  - **FR-1.2:** The ride offer is stored in the system and made available for search and booking.

### 4.2 Ride Searching

- **FR-2:** The system shall allow an authenticated user to search for rides.
  - **FR-2.1:** Search criteria may include:
    - Date/Time range.
    - Car type.
    - Selected destination(s) (from the fixed list).
  - **FR-2.2:** The search results shall display ride details including the available free places and the price per place.

### 4.3 Ride Booking

- **FR-3:** The system shall allow an authenticated user to book a ride.
  - **FR-3.1:** During booking, the user must specify the number of places (seats) they wish to reserve.
  - **FR-3.2:** The system shall check that the requested number of places does not exceed the ride’s current available free places.
  - **FR-3.3:** Upon successful booking, the available free places for that ride shall be reduced by the number of places booked.
  - **FR-3.4:** The total booking cost shall be calculated as:  
    **Total Cost = (Number of Chosen Destinations) × (Number of Places Booked) × (Price per Place)**
    - _Example: For 3 selected destinations, 2 seats booked, and a price per place of 20, the total cost would be 3 × 2 × 20 = 120._
- **FR-4:** The system shall prevent overbooking by disallowing bookings that exceed the available free places.
- **FR-5:** Bookings shall be cancelable under defined conditions:
  - **FR-5.1:** A ride offer can be modified or canceled only before any booking is made.
  - **FR-5.2:** Bookings made by users shall be cancelable, with the refund amount dependent on the time of cancellation. *(Specific refund rules to be defined in the cancellation policy.)*

### 4.4 Concurrency & Data Consistency

- **FR-6:** The booking process shall ensure that simultaneous booking attempts do not result in overbooking.
  - **Implementation Suggestion:** Utilize optimistic concurrency control with row-level locking (or equivalent transactional mechanisms) to atomically check and update the available free places during a booking transaction. This approach helps ensure data consistency without significant performance degradation.

## 5. Non-functional Requirements

- **Performance:** Ride availability and booking updates must reflect in real time to prevent conflicts.
- **Security:** All endpoints related to offering, searching, and booking rides must enforce authentication via Keycloak.
- **Usability:** The user interface should clearly present the ride details (available free places, selected destinations, car type, and cost calculation) to the user.
- **Data Integrity:** All transactions affecting ride availability (offer, booking, cancellation) must be atomic and reliably persisted.

## 6. Assumptions

- All users are authenticated via the Keycloak integration.
- The ride’s free places and price per place are determined at the time of ride offering and remain fixed for that ride.
- The booking process is atomic and ensures consistent updates to the available free places.
