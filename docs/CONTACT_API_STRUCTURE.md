# CONTACT API STRUCTURE

**Owner:** Kevin

**Date:** 2026-09-06

## 1. Global conventions

| Item | Decision |
| --- | --- |
| Base path | `/LAMPAPI/` |
| Content type | `application/json` |
| JSON field casing | **camelCase** — `firstName`, `lastName`, `email`. |
| How the server identifies the user | **PHP sessions** — `session_start()`, then read `$_SESSION['userId']` |
| Does any request body contain a user ID? | **No.** |

### Error response shape

Every endpoint returns errors in this same shape:

Errors return the JSON body below, with the HTTP status code indicating the category; success responses never include an error field.

```json
{"error": "..."}
```

### Error conditions

| Condition | Status | Body |
| --- | --- | --- |
| Not logged in | `401` | {"error": "Not authenticated"} |
| Missing required field | `400` | {"error": "Missing required field"} |
| Contact not found / not owned by user | `404` | {"error": "Contact not found"} |
| Password too short (register only) | `400` | {"error": "Password must be at least 8 characters"} |
| Username already taken (register only) | `409` | {"error": "Username already taken"} |
| Database failure | `500` | {"error": "Server error"} |

---

## 2. Add contact

**Path & method:** POST `/LAMPAPI/AddContact.php`

**Request body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "407-555-0101"
}
```

**Success response (returns status 201):**

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "407-555-0101",
  "dateCreated": "2026-09-05 23:08:14"
}
```

**Notes / validation:** `firstName` and `lastName` are required. Either `email` or `phone` must be provided; the other may be omitted or empty. `{"error": "Missing required field"}` is returned along with status `400` if validation fails.

---

## 3. Edit contact

**Path & method:** PUT `/LAMPAPI/EditContact.php`

**Request body:**

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "407-555-0101"
}
```

**Success response:**

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "407-555-0101",
  "dateCreated": "2026-09-05 23:08:14"
}
```

**Notes / validation:** Same validation rules as Add contact. The contact must belong to the logged-in user. Ownership is enforced server-side via `WHERE ID = ? AND UserID = ?`; if no row matches, returns `404` with `{"error": "Contact not found"}`.

---

## 4. Delete contact

**Path & method:** DELETE `/LAMPAPI/DeleteContact.php`

**Request body:**

```json
{
  "id": 1
}
```

**Success response:**

```json
{
  "id": 1
}
```

**Notes / validation:** Returns `200` upon success. The contact must belong to the logged-in user. Ownership is enforced server-side via `WHERE ID = ? AND UserID = ?`; if no row matches, returns `404` with `{"error": "Contact not found"}`.

---

## 5. Search contacts

**Path & method:** POST `/LAMPAPI/SearchContacts.php`

**Request body:**

```json
{
  "search":"jo"
}
```

**Success response:**

```json
{
  "results": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@email.com",
      "phone": "407-555-0101",
      "dateCreated": "2026-09-05 23:08:14"
    },
    {
      "id": 4,
      "firstName": "Maria",
      "lastName": "Lopez",
      "email": "maria@email.com",
      "phone": "407-555-0104",
      "dateCreated": "2026-09-05 23:08:14"
    }
  ]
}
```

**Behavior:**

- Matching (name-only by design): Returns `200` upon success. Partial match against `firstName` or `lastName`, case-insensitive, wrapped in `%` wildcards. Results are limited to contacts owned by the logged-in user.
- Zero results: Returns `200` with `{"results": []}`.

---

## 6. Register

**Path & method:** POST `/LAMPAPI/Register.php`

**Request body:**

```json
{
  "firstName": "Sam",
  "lastName": "Hill",
  "login": "SamH",
  "password": "Test"
}
```

**Success response (returns status 201):**

```json
{
  "id": 3,
  "firstName": "Sam",
  "lastName": "Hill",
  "login": "SamH"
}
```

**Notes / validation:** All four fields are required; `{"error": "Missing required field"}` with status `400` if any is missing. `Login` has a `UNIQUE` constraint in the schema, so a duplicate username returns `409` with `{"error": "Username already taken"}`. The password is hashed with `password_hash()` before storage and is never returned in any response.

Passwords must be at least 8 characters. A shorter password returns `400` with `{"error": "Password must be at least 8 characters"}`. There is no maximum length and no character-class requirement.

Registering does **not** log the user in. The client must call Login afterwards to establish a session.

---

## 7. Login

**Path & method:** POST `/LAMPAPI/Login.php`

**Request body:**

```json
{
  "login": "SamH",
  "password": "Test"
}
```

**Success response (returns status 200):**

```json
{
  "id": 3,
  "firstName": "Sam",
  "lastName": "Hill"
}
```

**Notes / validation:** On success the server stores the user's ID in `$_SESSION['userId']` and returns the session cookie (`PHPSESSID`). All contact endpoints depend on this session; without it they return `401`.

A failed login returns `401` with `{"error": "Invalid login or password"}`. The same message is returned whether the username does not exist or the password is wrong, so the response does not reveal which usernames are registered.

The password hash is never returned in any response.

---

## 8. Logout

**Path & method:** POST `/LAMPAPI/Logout.php`

**Request body:** none.

**Success response (returns status 200):**

```json
{
  "loggedOut": true
}
```

**Notes / validation:** Clears the session server-side (`session_unset()` then `session_destroy()`) and expires the `PHPSESSID` cookie. Returns `200` whether or not a session existed, so the client can always treat it as successful.

After logout, every contact endpoint returns `401` until the user logs in again.
