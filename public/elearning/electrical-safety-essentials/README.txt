SCORM package placeholder
=========================

This folder is where the "Electrical Safety Essentials" free course lives.

When you receive the SCORM zip from the authoring tool:

  1. Unzip it.
  2. Replace the contents of this folder with the unzipped contents.
  3. Make sure the course's entry HTML is called index.html (or rename/edit
     app/learn/courses/[slug]/page.tsx  ->  scormEntryUrl to match the actual
     filename — commonly "index_lms.html" or "story.html").

The learner player at /learn/courses/electrical-safety-essentials will embed
the entry file in an iframe with both SCORM 1.2 and SCORM 2004 runtime APIs
available on the parent window, so no additional configuration is required.

No progress tracking is persisted — we only watch for the completion event
and then surface the certificate flow.
