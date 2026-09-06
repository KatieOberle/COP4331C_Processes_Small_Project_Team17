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
