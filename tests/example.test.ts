import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../rpn';

// Starter example — delete it, rename it, or build on it. It exists so you can
// run `npm test` and see green before you write anything of your own.
describe('POST /api/v1/evaluate', () => {
  it('evaluates a simple addition', async () => {
    const res = await request(app)
      .post('/api/v1/evaluate')
      .send({ expression: '2 3 +' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 5 });
  });
});
