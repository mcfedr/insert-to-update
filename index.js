#!/usr/bin/env node
const program = require('commander'),
    winston = require('winston'),
    split = require('split');

program
    .version(require('./package.json').version)
    .description('Converts INSERT statements to UPDATE statements')
    .option('-k, --key <key>', 'Keys for the where statement, should be wrapped with "`" if its used in the SQL', val => val.split(','), 'id')
    .parse(process.argv);

if (!program.key || !program.key.length) {
    winston.error('No keys specified');
    return;
}

const insertMatch = /INSERT INTO\s+([\w`]+?)\s+\((.+?)\)\s+VALUES\s+\((.+?)\)/;

process.stdin
    .pipe(split(/;/, line => line.trim()))
    .on('data', line => {
        if (!line) {
            return;
        }
        const parts = line.match(insertMatch);
        if (!parts) {
            process.stdout.write(`${line};\n`);
            return;
        }

        const tableName = parts[1];
        const cols = parts[2].split(',');
        const vals = parts[3].split(',');

        const where = program.key
            .map(key => {
                const idx = cols.indexOf(key);
                return `${key} = ${vals[idx]}`;
            })
            .join(' AND ');

        const set = cols
            .filter(col => program.key.indexOf(col) === -1)
            .map(col => {
                const idx = cols.indexOf(col);
                return `${col} = ${vals[idx]}`;
            })
            .join(', ');

        process.stdout.write(`UPDATE ${tableName} SET ${set} WHERE ${where};\n`);
    });
