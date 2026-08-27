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
  assert.match(html, /<title>Avant Creative Group \| Photography &amp; Film Zimbabwe<\/title>/);
  assert.match(html, /property="og:image" content="https:\/\/avant\.co\.zw\/og\.png"/);
  assert.match(html, /rel="canonical" href="https:\/\/avant\.co\.zw"/);
  assert.match(html, /Stories worth seeing/);
  assert.match(html, /aria-roledescription="carousel"/);
  assert.match(html, /aria-label="Pause slideshow"/);
  assert.match(html, /href="\/contact">Start a conversation/);
  assert.doesNotMatch(html, /href="mailto:[^"]+">Start a conversation/);
  assert.equal((html.match(/class="project-card /g) ?? []).length, 4, "homepage should show exactly four featured projects");
});

test("ships optimized portfolio imagery and the branded social card", async () => {
  const root = new URL("../public/", import.meta.url); const media = ["harare-jacaranda.webp", "hwange-elephant.webp", "victoria-falls-lodge.webp", "victoria-falls-dawn.webp", "chilojo-cliffs.webp"];
  for (const file of media) { const details = await stat(new URL(`media/${file}`, root)); assert.ok(details.size < 500_000, `${file} should stay below 500 KB`); }
  await access(new URL("og.png", root));
  const socialCard = await stat(new URL("og.png", root)); assert.ok(socialCard.size < 1_500_000, "og.png should stay below 1.5 MB");
  await assert.rejects(access(new URL("media/harare-jacaranda.png", root)));
});
