'use strict';

const fs = require('fs');
const eventsDir = `${__dirname}/calendar/events`;
const globby = require('globby');
const jsYaml = require('js-yaml');
const isAfter = require('date-fns/isAfter');
const parse = require('date-fns/parse');

(async () => {
  const target = process.argv[2];
  const files = globby.sync(`${eventsDir}/*.yml`, {absolute: true});
  const events = files.map(file => jsYaml.safeLoad(fs.readFileSync(file, 'utf-8')));

  const now = new Date();
  events
    .filter(
      event => event.city === target && isAfter(parse(event.date.split('-')[0], 'dd.MM.yyyy', 0), now)
    )
    .forEach(
      event => console.log(`- ${event.name} (${event.date} ${event.time})\n  - ${event.link}\n`)
    );
})();
