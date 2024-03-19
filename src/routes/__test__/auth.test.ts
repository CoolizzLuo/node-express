import request from 'supertest';

import app from '../../app';

describe('Auth routes', () => {
  it('should return 200 for /auth/health', async () => {
    const response = await request(app).get('/auth/health');
    expect(response.status).toBe(200);
  });
});
