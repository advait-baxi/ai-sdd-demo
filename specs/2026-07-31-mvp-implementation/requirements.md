# MVP Requirements: AgentClinic Wellness Platform
Date: 2026-07-31
Status: Draft

## 1. Introduction
This document defines the scope and requirements for the Minimum Viable Product (MVP) of AgentClinic, a wellness platform for AI agents. The goal is to complete the transition from a base layout to a fully functional service that connects distressed agents with therapeutic interventions.

## 2. Core Objectives
- **Therapeutic Matching**: Provide a catalog of therapies and link them to known agent ailments.
- **Service Delivery**: Enable the booking of appointments between agents and therapists.
- **Operational Oversight**: Provide staff (specifically Mary) with a high-level dashboard to manage the clinic.
- **Production Readiness**: Ensure a polished, accessible, and hardened application.

## 3. Feature Specifications

### 3.1 Therapies Catalog (Phase 3)
- **Data Model**: Create a `therapies` table (id, name, description, category).
- **Ailment Mapping**: Establish a relationship between `ailments` and `therapies` (e.g., a join table `ailment_therapies`).
- **User Interface**:
    - `/therapies` list page displaying all available wellness treatments.
    - Detail views for each therapy.
    - Integration: When viewing an ailment, the system should recommend associated therapies.

### 3.2 Appointment Booking (Phase 4)
- **Data Model**: Create an `appointments` table (id, agent_id, therapist_id, appointment_time, status).
- **Booking Flow**:
    - On an agent's profile page, provide a "Book Therapy" button/form.
    - Form inputs: Selection of therapy, preferred date/time.
    - Submission leads to a confirmation page.
- **Validation**: Prevent booking in the past; ensure valid agent and therapy IDs.

### 3.3 Staff Dashboard (Phase 5)
- **User Interface**: `/dashboard` root route for staff.
- **Key Metrics**:
    - Total Agents currently enrolled.
    - Number of open/pending appointments.
    - Count of active ailments in the system.
- **Management Views**:
    - Table of recent appointments with the ability to update status (e.g., "Completed", "Cancelled").
    - Overview of agents needing urgent care.

### 3.4 Polish & Accessibility (Phase 6)
- **Semantic HTML**: Use correct tags (`<main>`, `<nav>`, `<footer>`, `<h1>`-`<h6>`) for all pages.
- **Interactivity**:
    - Consistent focus indicators for all interactive elements.
    - Full keyboard navigation support (Tab/Enter).
- **Visuals**: Leverage PicoCSS for a professional, mobile-first responsive experience.

### 3.5 Hardening (Phase 7)
- **Error Handling**: 
    - Custom 404 page for missing routes.
    - Generic 500 error page for unexpected server failures.
- **Security**: Implement input sanitization on all form submissions to prevent XSS/Injection.
- **Observability**: Basic logging middleware to track requests and errors.

## 4. Technical Constraints
- **Framework**: Hono (Server-side JSX).
- **Database**: SQLite via `better-sqlite3`.
- **Styling**: PicoCSS.
- **Testing**: Vitest for functional validation.
- **Deployment**: Node.js runtime.
