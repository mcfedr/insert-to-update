# Insert to update converter

Quick tool for converting `INSERT` sql statements to `UPDATE`.

Usage:

    yarn run convert -- -k "\`productIdentifier\`" < ~/Desktop/changes.sql

## Limitations

 - Only supports single row per INSERT
 - Will not handle `,` in the data correctly
