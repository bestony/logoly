import { describe, it, expect } from 'vitest';
import router from '@/router';

describe('router', () => {
  it('exposes all generator routes', () => {
    const names = router.getRoutes().map((route) => route.name);
    expect(names).toEqual(
      expect.arrayContaining(['pornhub', 'vertical-pornhub', 'onlyfans', 'about'])
    );
  });

  it('provides analytics templates for every route', () => {
    for (const route of router.getRoutes()) {
      const template = route.meta?.analytics?.pageviewTemplate;
      expect(template).toBeTypeOf('function');
      const payload = template({ path: route.path });
      expect(payload).toMatchObject({ page: route.path });
      expect(payload.title.length).toBeGreaterThan(0);
    }
  });

  it('resolves each lazy component definition', async () => {
    const configs = router.options.routes;
    const components = await Promise.all(configs.map((route) => route.component()));
    for (const module of components) {
      expect(module).toBeTruthy();
    }
  });
});
