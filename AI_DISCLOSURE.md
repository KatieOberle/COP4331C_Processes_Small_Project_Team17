## AI Assistance Disclosure

This project was developed with assistance from generative AI tools:

- **Tool**: Claude (Anthropic, claude.ai)
- **Dates**: September 3-4, 2026
- **Scope**: Database schema additions (Contacts.DateCreated column, 
  foreign key constraint, indexes, Login uniqueness constraint), 
  generation of the ERD diagram, troubleshooting terminal/SSH/Git issues, 
  and review of the final code before submission
- **Use**: AI provided example SQL for the schema additions, which was 
  reviewed and adapted into the final schema: the `DateCreated` column on 
  Contacts, an enforced `FOREIGN KEY` constraint with `ON DELETE CASCADE`, 
  indexes on `UserID` and `(FirstName, LastName)` to support efficient 
  server-side search, and a `UNIQUE` constraint on `Login`. AI also 
  generated the ERD diagram visualizing the schema and its relationships. 
  AI assisted with troubleshooting terminal issues during setup, including 
  SSH/SCP connection failures to the DigitalOcean droplet, GitHub 
  authentication (personal access token setup), and Git branch/permission 
  errors. AI reviewed the final version of the database code before 
  submission.

All AI-provided example SQL was reviewed, tested, and adapted as needed 
before being run against the live DigitalOcean database. Final schema 
reflects my understanding of the design decisions involved.
