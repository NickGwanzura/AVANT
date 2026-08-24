import assert from "node:assert/strict";
import { access, stat } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the polished Avant homepage and metadata", async () => {
  const response = await render(); assert.equal(response.status, 200); const html = await response.text();
  assert.match(html, /<title>Avant Creative Group · Stories Worth Seeing<\/title>/);
  assert.match(html, /property="og:image" content="https:\/\/avantgroup\.co\.zw\/og\.png"/);
  assert.match(html, /Stories worth seeing/);
  assert.match(html, /aria-roledescription="carousel"/);
  assert.match(html, /aria-label="Pause slideshow"/);
  assert.match(html, /href="\/contact">Start a conversation/);
  assert.doesNotMatch(html, /href="mailto:[^"]+">Start a conversation/);
});

test("ships optimized portfolio imagery and the branded social card", async () => {
  const root = new URL("../public/", import.meta.url); const media = ["harare-jacaranda.webp", "hwange-elephant.webp", "victoria-falls-lodge.webp", "victoria-falls-dawn.webp", "chilojo-cliffs.webp"];
  for (const file of media) { const details = await stat(new URL(`media/${file}`, root)); assert.ok(details.size < 500_000, `${file} should stay below 500 KB`); }
  await access(new URL("og.png", root));
  await assert.rejects(access(new URL("media/harare-jacaranda.png", root)));
});
