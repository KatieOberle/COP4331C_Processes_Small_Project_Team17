# AI  DISCLOSURE

This project was developed with assistance from generative AI tools:

- **Tool**: Claude
- **Dates**: September 5-6, 2026
- **Scope**: Design of the Contact API structure document (endpoint paths,
HTTP methods, request/response JSON, error handling conventions),
conceptual explanation of PHP sessions, password hashing, REST conventions
and JSON syntax, and review of an existing team API endpoint
- **Use**: AI was used primarily in a tutoring capacity (explaining concepts
and reviewing my drafts rather than producing the deliverable). AI generated
the blank section headings used to structure the document, and supplied
corrected example JSON for several blocks (the Add Contact success response,
the nested `results` array in Search Contacts, and one row of the error
conditions table) after I drafted versions containing syntax errors. All
design decisions in the document are mine: camelCase field naming, HTTP
status codes over an `error`field convention, session-based user identity
rather than a client-supplied `userId`, name-only partial matching, and the
required/optional field rules. AI explained the Insecure Direct Object Reference vulnerability that arises from accepting `userId` in a request body, and explained bcrypt (`password_hash()` / `password_verify()`) and salting relative to the
unsalted SHA-256 hashes in our initial seed data.

All AI-provided examples were reviewed and adapted before inclusion, and the
final document reflects my own understanding of the design decisions involved.
