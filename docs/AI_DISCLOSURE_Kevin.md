# AI Disclosure — Kevin

This project was developed with assistance from generative AI tools.
Entries are listed by date, oldest first.

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

## AddContact.php — September 6, 2026

- **Tool**: Claude (Anthropic, claude.ai)
- **Scope**: Code review, debugging, and explanation of mysqli error
  handling and retrieval of database-generated values
- **Use**: I wrote the initial and all subsequent versions of
  `AddContact.php` myself, working from the endpoint contract in my Contact
  API Structure document. AI reviewed each draft and identified defects,
  which I then corrected: internal MySQL error messages being returned to
  the client instead of a generic message, an unguarded `prepare()` call
  that would cause a fatal error on failure, an operator precedence issue
  in the validation condition, and `execute()` being called before
  `bind_param()`. AI also explained `mysqli::$insert_id` and the pattern of
  querying back database-generated values (`AUTO_INCREMENT` id and
  `DEFAULT CURRENT_TIMESTAMP`) rather than reconstructing them in
  application code.
- **My decisions**: Adding a follow-up `SELECT` to return the
  database-generated values.

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