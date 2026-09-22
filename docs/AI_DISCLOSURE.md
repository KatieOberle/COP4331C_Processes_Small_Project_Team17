# AI Disclosure

This project was developed with assistance from generative AI tools.
Entries are listed by date, newest last.

---

## Contact API Structure Document — September 5–6, 2026

- **Tool**: Claude (Anthropic, claude.ai)
- **Scope**: Design of the Contact API structure document (endpoint paths,
  HTTP methods, request/response JSON, error handling conventions);
  conceptual explanation of PHP sessions, password hashing, REST conventions,
  and JSON syntax; review of an existing team API endpoint
- **Use**: Primarily tutoring (explaining concepts and reviewing my drafts
  rather than producing the deliverable). AI generated the blank section
  headings used to structure the document, and supplied corrected example
  JSON for several blocks (the Add Contact success response, the nested
  `results` array in Search Contacts, and one row of the error conditions
  table) after I drafted versions containing syntax errors. AI explained
  the Insecure Direct Object Reference vulnerability that arises from
  accepting `userId` in a request body, and explained bcrypt
  (`password_hash()` / `password_verify()`) and salting relative to the
  unsalted SHA-256 hashes in our initial seed data.
- **My decisions**: camelCase field naming, HTTP status codes over an
  `error` field convention, session-based user identity rather than a
  client-supplied `userId`, name-only partial matching, and the
  required/optional field rules.

---

## Logout.php — September 21, 2026

- **Tool**: Claude (Anthropic, claude.ai)
- **Scope**: Code review of `api/Logout.php`
- **Use**: I wrote Logout.php myself. AI reviewed it and identified that the
  helper function name (`sendResultInfoAsJson`) didn't match the call
  (`sendJson`), and that the helper echoed a PHP array instead of JSON.
  After my first attempt at the fix, AI supplied the corrected line
  `echo json_encode($obj);`. AI also suggested removing the closing `?>`
  tag. I made all changes.

---

All AI-provided examples and suggestions were reviewed and adapted before
inclusion, and the final work reflects my own understanding of the
concepts involved.