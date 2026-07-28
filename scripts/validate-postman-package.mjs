import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const collectionPath = join(root, 'docs', 'postman', 'Mini_ERP_CRM.postman_collection.json');
const environmentPath = join(root, 'docs', 'postman', 'Local.postman_environment.json');

const collection = JSON.parse(await readFile(collectionPath, 'utf8'));
const environment = JSON.parse(await readFile(environmentPath, 'utf8'));
const errors = [];
let requestCount = 0;
let scriptCount = 0;
let jsonBodyCount = 0;

function validateItems(items, path = []) {
  for (const item of items ?? []) {
    const itemPath = [...path, item.name ?? '<unnamed>'];
    if (item.item) {
      validateItems(item.item, itemPath);
      continue;
    }

    requestCount += 1;
    if (!item.request?.method || !item.request?.url) {
      errors.push(`${itemPath.join(' / ')} has no complete request.`);
    }
    if (typeof item.request?.url === 'string' && !item.request.url.startsWith('{{baseUrl}}/')) {
      errors.push(`${itemPath.join(' / ')} bypasses the baseUrl variable.`);
    }

    for (const event of item.event ?? []) {
      try {
        Function(event.script?.exec?.join('\n') ?? '');
        scriptCount += 1;
      } catch (error) {
        errors.push(`${itemPath.join(' / ')} has invalid ${event.listen} script: ${error.message}`);
      }
    }

    if (item.request?.body?.mode === 'raw') {
      try {
        JSON.parse(
          item.request.body.raw.replace(/{{[^}]+}}/g, '00000000-0000-4000-8000-000000000000'),
        );
        jsonBodyCount += 1;
      } catch (error) {
        errors.push(`${itemPath.join(' / ')} has an invalid JSON body: ${error.message}`);
      }
    }
  }
}

validateItems(collection.item);

const passwordVariables = (environment.values ?? []).filter(({ key }) => /password/i.test(key));
for (const variable of passwordVariables) {
  if (variable.type !== 'secret') {
    errors.push(`${variable.key} must use the Postman secret type.`);
  }
  if (variable.value !== '') {
    errors.push(`${variable.key} must remain blank in the committed environment.`);
  }
}

if (requestCount < 20) errors.push('The collection does not cover the full workflow.');
if (passwordVariables.length !== 4) {
  errors.push('The environment must define four blank role password variables.');
}

if (errors.length > 0) {
  throw new Error(errors.join('\n'));
}

process.stdout.write(
  `${JSON.stringify({ requestCount, scriptCount, jsonBodyCount, passwordVariables: passwordVariables.length })}\n`,
);
