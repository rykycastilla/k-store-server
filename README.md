# k-store-server
This is the backend service for **k-store** app. It uses **Node**, **Typescript** and **Redis** as its database.

## Scripts<sup>[1]</sup>

### **dev**
Used to deploy in your local machine in a development environment, supporting fast refresh and Typescript compilation without building.
``` bash
pnpm run dev
```

### **build**
This command compile the source code (Typescript and JSON) to JavaScript files (usable by node). You can access the compiled code in `./dist/` directory.
``` bash
pnpm run build
```

### **start**
Deploy the backend service running the code in `./dist` directory
``` bash
pnpm start
```

## Env
A description for the environment variables needed for the project
``` env
# Database Encryption parameters
ENCRYPTION_INCREASE
ENCRYPTION_KEY

# Parameters for Google Auth
GOOGLE_CALLBACK_URL  # Redirect URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# URL with Redis Database
REDIS_STORE

# URL where is redirected the user access token
SESSION_CALLBACK

# Lifetime of a single user session (in milliseconds)
SESSION_LIFETIME
```

## API
1. Get the current backup for an specific user

**HEADERS**:
``` Typescript
{ authorization:string }
```
**GET**: */backup/* ->
``` Typescript
{
  backup: Backup,
  nextToken: string,
}

// Backup: ./src/interfaces/user.ts
```
<sup>[2]<sup>

---

2. Check if this user already has a backup

**HEADERS**:
``` Typescript
{ authorization:string }
```
**GET**: */backup/exists/* ->
``` Typescript
{
  date: number | null,
  nextToken: string,
}
```
<sup>[2][3]</sup>

---

3. Create a new backup

**HEADERS**
``` Typescript
{ authorization:string }
```
**BODY**
``` Typescript
interface BackupPotsRequest { ... }

// BackupPostRequest: ./src/types/backup_post_request.ts
```

**POST**: */backup/* ->
``` Typescript
{ nextToken:string }
```
<sup>[2]</sup>

---

4. Get the name of the user

**HEADERS**:
``` Typescript
{ authorization:string }
```
**GET**: */user/name/* ->
``` Typescript
{
  name: string,
  nextToken: string
}
```
<sup>[2]</sup>

---

5. Get the email of the user

**HEADERS**:
``` Typescript
{ authorization: string }
```
**GET**: */user/email/* ->
``` Typescript
{
  email: string,
  nextToken: string
}
```
<sup>[2]</sup>

---

6. Get the profile picture

**HEADERS**:
``` Typescript
{ authorization:string }
```
**GET**: */user/picture/* -> `image/png`

---

7. Delete this user

**HEADERS**:
``` Typescript
{ authorization:string }
```
**DELETE**: */user/* ->
``` Typescript
{ success:boolean }
```

> 1. This backend app uses the package manager **pnpm**
> 2. `nextToken` has an updated user session token. It would be used to avoid forgetting access 
> 3. If `date` is `null` means the backup does not exists