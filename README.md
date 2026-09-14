# RPN Calculator — QA / SDET Interview Exercise

A tiny Express HTTP API that evaluates [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) expressions.

Your task during the interview: **write tests for this service**.

---

## How the session runs

**Timebox: ~45 minutes of hands-on work**, then we talk.

**Stage 1 (~35 min) — write tests.** Treat `rpn.ts` as code you've been handed to verify. Don't modify it during this stage.

**Stage 2 (~10 min) — reproduce a defect.** We'll name one specific problem and ask you to write a test that reproduces it: one that fails, for the right reason. Then we'll apply the fix and you can see how your suite reacts.

**Bonus — make the fix yourself.** If you'd like to and there's time, patch `rpn.ts` instead of having us do it. Genuinely optional: we don't expect QA candidates to write production code, and skipping it costs you nothing. Take it if it plays to your strengths.

### What we're actually assessing

We care about **how you reason about coverage and risk** — how you decide what's worth testing, how you structure a suite, and how you talk about it.

We are **not** counting bugs. A well-organised suite with four solid findings beats a scattershot list of twelve. If you're weighing "write another test" against "explain my thinking", explain your thinking.

There's no fixed right answer, and you are not expected to finish exhaustively. Narrate as you go — we'd rather hear a good decision than watch silent typing.

---

## Prerequisites

- **Node.js 22.12+** (24 recommended — `npm test` will refuse to run on older versions)
- **npm** (bundled with Node)

```bash
node --version
npm --version
```

## Setup

From this directory:

```bash
npm install
npm test
```

You should see one passing test. If you do, your environment is ready.

## Run the API

```bash
npm start
```

You should see:

```
RPN calculator API listening on http://localhost:3000
```

The server defaults to port `3000`. Override with `PORT=4000 npm start` if needed. For auto-reload while editing, `npm run dev`.

## Testing setup

[Vitest](https://vitest.dev) and [supertest](https://github.com/ladjs/supertest) are pre-wired so you don't lose interview time to config:

```bash
npm test         # single run
npm run test:watch
```

`tests/example.test.ts` has one starter test showing how to drive the app in-process (no server needed). Delete it, rename it, build on it — whatever suits.

**Prefer something else?** Jest, Mocha + supertest, Playwright API tests, Postman/Newman, plain `curl` — all fine, swap it in. We pre-wired one option to save you setup, not to constrain you. If you'd rather test over real HTTP against `npm start`, that's a legitimate choice — be ready to say why you picked it.

## The endpoint

**`POST /api/v1/evaluate`**

Request body (JSON):

```json
{ "expression": "2 3 +" }
```

Response:

```json
{ "result": 5 }
```

### Quick smoke test

```bash
# Simple addition  → 5
curl -s -X POST http://localhost:3000/api/v1/evaluate \
  -H 'Content-Type: application/json' \
  -d '{"expression":"2 3 +"}'

# Classic RPN example  → 14
curl -s -X POST http://localhost:3000/api/v1/evaluate \
  -H 'Content-Type: application/json' \
  -d '{"expression":"5 1 2 + 4 * + 3 -"}'
```

## How RPN works (quick refresher)

Operands first, operator after. The operator consumes the previous two numbers from the stack.

| Infix         | RPN              |
|---------------|------------------|
| `2 + 3`       | `2 3 +`          |
| `(1 + 2) * 4` | `1 2 + 4 *`      |
| `5 + ((1+2)*4) - 3` | `5 1 2 + 4 * + 3 -` |

Supported operators: `+`, `-`, `*`, `/`. Tokens are whitespace-separated.

---

## Your task

1. Read `rpn.ts` and the API description above.
2. Decide what behaviours are worth testing — happy paths, edge cases, error handling, input validation.
3. Write your suite.

Note there is **no formal specification** beyond this README. That's deliberate, and it's the job: where the intended behaviour is genuinely unclear, say so and make a defensible call rather than guessing silently. Ask us — we'll answer in character as the product owner.

## What we'll discuss afterwards

- What you covered, and what you deliberately skipped.
- Anything you'd raise with the developer as a defect — and how you'd decide whether it's a bug or an unspecified behaviour.
- How you'd extend the suite given another day.
- Whether you'd ship this service.

## Project layout

```
.
├── rpn.ts                   # The service under test
├── server.ts                # Boots the Express app on $PORT (default 3000)
├── tests/
│   └── example.test.ts      # Starter test — yours to replace
├── package.json
├── tsconfig.json
└── README.md
```

Good luck — and have fun!
