import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const webBuild = resolve(projectRoot, 'apps', 'web', 'dist');
const sitesBuild = resolve(projectRoot, 'dist');
const clientBuild = resolve(sitesBuild, 'client');
const serverBuild = resolve(sitesBuild, 'server');
const hostingConfig = resolve(projectRoot, '.openai', 'hosting.json');

await readFile(resolve(webBuild, 'index.html'));
await readFile(hostingConfig);

await rm(sitesBuild, { recursive: true, force: true });
await mkdir(serverBuild, { recursive: true });
await cp(webBuild, clientBuild, { recursive: true });

const worker = `const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || request.method !== "GET" || !acceptsHtml) {
      return response;
    }

    const fallbackUrl = new URL("/index.html", request.url);
    return env.ASSETS.fetch(new Request(fallbackUrl, request));
  },
};

export default worker;
`;

await writeFile(resolve(serverBuild, 'index.js'), worker);
