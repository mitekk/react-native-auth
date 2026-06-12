<div align="center">

# 🔐 React Native auth flow

**A complete mobile authentication flow** — _register · sign in · reset password · verify by email_

![React Native](https://img.shields.io/badge/React_Native-0.66-149eca?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-44-000020?logo=expo&logoColor=white)
![Node](https://img.shields.io/badge/Node-lts/fermium-7c3aed?logo=nodedotjs&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-web-0a0612?logo=nextdotjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-e10098?logo=graphql&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4-3178c6?logo=typescript&logoColor=white)

A learning project: a production-shaped React Native app that wires up a full auth journey end-to-end — secure token storage on the device, a GraphQL API, and companion web/email pages for the password-reset and account-verification steps.

</div>

---

- **Explore** — [What it is](#what-it-is) · [Quick start](#quick-start) · [How the auth flow works](#how-the-auth-flow-works) · [Tech stack](#tech-stack)

---

## What it is

A native iOS/Android application demonstrating a complete authentication flow, built to explore a set of JavaScript libraries and frameworks end-to-end. It covers the screens and server logic for **login**, **registration**, **forgot password** (by email) and **token verification** (by email) — including form fields with client-side and server-side validation error notifications.

The repo is a three-package monorepo: a **React Native** app, a **GraphQL** server, and a **Next.js** web app that hosts the parts of the flow that live outside the device (the reset-password and verification pages reached from email links).

<p float="left">
    <img src="./screens/register.png" width="150" alt="Register screen" />
    <img src="./screens/login.png" width="150" alt="Login screen" />
    <img src="./screens/reset.png" width="150" alt="Reset password screen" />
    <img src="./screens/logged.png" width="150" alt="Logged-in screen" />
</p>

## Quick start

**Requirements:** Node `lts/fermium` (run `nvm use` at the repo root), Yarn `1.22.x`, Docker (for Postgres + Redis), and a React Native / Expo dev environment with an iOS or Android emulator.

Install dependencies for each package:

```bash
yarn --cwd ./packages/app
yarn --cwd ./packages/server
yarn --cwd ./packages/web
```

Bring up the database and seed it (from `packages/server`):

```bash
docker-compose up -d        # Postgres, Redis, Adminer
yarn migration:create
yarn migration:update
yarn seed:profile_icon
```

Configure an [Ethereal](https://ethereal.email/) SMTP account for the email steps in `packages/server/src/managers/email.manager.ts`.

Run each package:

| Package | Commands | Notes |
|---|---|---|
| `packages/server` | `yarn watch` + `yarn dev` | GraphQL API; `watch` compiles TS, `dev` runs the built `dist` with nodemon |
| `packages/app` | `yarn start` then `yarn ios` / `yarn android` | React Native app in the emulator |
| `packages/web` | `yarn dev` | Next.js web pages for reset / verification |

## How the auth flow works

1. **Register / Login** — the app submits credentials to the GraphQL API; `react-hook-form` + `yup` validate locally, and server-side validation errors surface back as field notifications.
2. **Tokens** — on success the API issues JWTs; the app stores them with `expo-secure-store` and attaches them to GraphQL requests via the `urql` auth exchange (with refresh handling).
3. **Forgot password** — the API emails a reset link (via the Ethereal SMTP test service); the link opens a **Next.js web page** where the user sets a new password.
4. **Verify token** — account verification follows the same out-of-app pattern: an emailed link resolved through the web app, confirming the account against the server.

State on the device is held in Redux (`@reduxjs/toolkit` + `react-redux`); the UI uses `react-native-paper` (Material Design) and `@react-navigation` stacks.

## Tech stack

| Layer | Tech |
|---|---|
| Mobile app | React Native 0.66, Expo 44, React Navigation, React Redux / Redux Toolkit, react-hook-form, yup, react-native-paper, expo-secure-store, urql |
| API | Node.js, Apollo Server (Express), TypeGraphQL, MikroORM, PostgreSQL, argon2, jsonwebtoken, nodemailer |
| Web | Next.js, MUI, Emotion, urql, react-hook-form, yup |
| Language / tooling | TypeScript, GraphQL, Yarn workspaces (per-package), Docker Compose |
