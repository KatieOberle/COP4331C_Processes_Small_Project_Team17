## AI Assistance Disclosure

This project was developed with assistance from generative AI tools:

- **Tool**: Claude
- **Dates**: September 6, 2026
- **Scope**: Implementation of `AddContact.php` — code review, debugging, and
  explanation of mysqli error handling and retrieval of database-generated
  values
- **Use**: I wrote the initial and all subsequent versions of `AddContact.php`
  myself, working from the endpoint contract in my Contact API Structure
  document. AI was used to review each draft and identify defects, which I
  then corrected. Issues it caught included: internal MySQL error messages
  being returned to the client instead of a generic message, an unguarded
  `prepare()` call that would cause a fatal error on failure, an operator
  precedence issue in the validation condition, and a sequencing error where
  `execute()` was called before `bind_param()`.AI also explained `mysqli::$insert_id` and the general pattern of querying back database-generated values (`AUTO_INCREMENT` id and
  `DEFAULT CURRENT_TIMESTAMP`) rather than reconstructing them in application
  code, which informed my decision to add the follow-up `SELECT`.

All AI-identified issues were reviewed and fixed by me, and the final
implementation reflects my own understanding of the code.
