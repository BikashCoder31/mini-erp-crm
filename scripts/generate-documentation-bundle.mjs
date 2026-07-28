import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const documentationDirectory = join(root, 'docs', 'case-study');
const entries = await readdir(documentationDirectory);
const numberedFiles = entries
  .filter((file) => /^\d{2}_.+\.md$/.test(file))
  .sort((left, right) => left.localeCompare(right));

const errors = [];
const warnings = [];

if (numberedFiles.length !== 12) {
  errors.push(`Expected 12 numbered documents, found ${numberedFiles.length}.`);
}

const documents = [];
for (const file of numberedFiles) {
  const content = await readFile(join(documentationDirectory, file), 'utf8');
  const title = content.match(/^# (.+)$/m)?.[1];
  if (!title) errors.push(`${file} has no level-one title.`);
  if (!content.includes('**Documentation status:** Complete')) {
    errors.push(`${file} is not marked Documentation Complete.`);
  }
  const fenceCount = (content.match(/^```/gm) ?? []).length;
  if (fenceCount % 2 !== 0) errors.push(`${file} has unbalanced code fences.`);
  documents.push({ content, file, title: title ?? file });
}

const bundleHeader = `# Mini ERP + CRM Operations Portal — Complete Documentation Bundle

**Project:** Full Stack Developer Case Study — Mini ERP + CRM Operations Portal  
**Bundle version:** 1.2  
**Generated:** 2026-07-28  
**Documentation status:** Complete  
**Application implementation status:** Complete  
**Source assignment:** \`Full Stack Developer Case Study (1).pdf\`  

> This bundle combines the authoritative documentation index and Steps 1–11.
> It records verified implementation evidence and explicitly preserves pending
> candidate-owned or external closeout.

## Included documents

${documents.map(({ file, title }) => `- \`${file}\` — ${title}`).join('\n')}

---
`;

const bundleBody = documents
  .map(
    ({ content, file }) =>
      `\n\n<!-- BEGIN ${file} -->\n\n${content.trimEnd()}\n\n<!-- END ${file} -->`,
  )
  .join('\n\n---');
const bundle = `${bundleHeader}${bundleBody}\n`;
const bundlePath = join(documentationDirectory, 'COMPLETE_DOCUMENTATION_BUNDLE.md');
await writeFile(bundlePath, bundle, 'utf8');

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

function statistics(file, content) {
  return {
    file,
    lines: content.split(/\r?\n/).length,
    words: content.trim() ? content.trim().split(/\s+/u).length : 0,
    bytes: Buffer.byteLength(content),
    sha256: sha256(content),
  };
}

const manifestFiles = [];
for (const { content, file } of documents) {
  manifestFiles.push(statistics(file, content));
}
manifestFiles.push(statistics('COMPLETE_DOCUMENTATION_BUNDLE.md', bundle));

for (const { file } of documents) {
  if (!bundle.includes(`<!-- BEGIN ${file} -->`) || !bundle.includes(`<!-- END ${file} -->`)) {
    errors.push(`Bundle boundary missing for ${file}.`);
  }
}

const manifest = {
  generated: '2026-07-28',
  project: 'Mini ERP + CRM Operations Portal',
  documentation_status: 'Complete',
  application_implementation_status: 'Complete',
  numbered_document_count: numberedFiles.length,
  files: manifestFiles,
  validation: {
    errors,
    warnings,
    passed: errors.length === 0,
  },
};
const manifestContent = `${JSON.stringify(manifest, null, 2)}\n`;
const manifestPath = join(documentationDirectory, 'DOCUMENTATION_MANIFEST.json');
await writeFile(manifestPath, manifestContent, 'utf8');

const checksumFiles = [...numberedFiles, 'COMPLETE_DOCUMENTATION_BUNDLE.md'];
const checksumLines = [];
for (const file of checksumFiles) {
  const content = await readFile(join(documentationDirectory, file));
  checksumLines.push(`${sha256(content)}  ${file}`);
}
checksumLines.push(`${sha256(manifestContent)}  DOCUMENTATION_MANIFEST.json`);
await writeFile(
  join(documentationDirectory, 'MANIFEST_SHA256.txt'),
  `${checksumLines.join('\n')}\n`,
  'utf8',
);

if (errors.length > 0) {
  throw new Error(errors.join('\n'));
}

process.stdout.write(
  `Generated documentation bundle and manifests for ${numberedFiles.length} numbered files.\n`,
);
