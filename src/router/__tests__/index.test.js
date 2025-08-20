import { describe, it, expect } from 'vitest';
import router from '../index';

describe('Router', () => {
  it('has correct routes configured', () => {
    const routes = router.getRoutes();
    
    // Check that we have the expected number of routes
    expect(routes).toHaveLength(4);
    
    // Check specific route paths
    const paths = routes.map(route => route.path);
    expect(paths).toContain('/');
    expect(paths).toContain('/vertical-ph');
    expect(paths).toContain('/onlyfans');
    expect(paths).toContain('/about');
  });

  it('has correct route names', () => {
    const routes = router.getRoutes();
    const names = routes.map(route => route.name);
    
    expect(names).toContain('pornhub');
    expect(names).toContain('vertical-pornhub');
    expect(names).toContain('onlyfans');
    expect(names).toContain('about');
  });

  it('has analytics meta for all routes', () => {
    const routes = router.getRoutes();
    
    routes.forEach(route => {
      expect(route.meta).toBeDefined();
      expect(route.meta.analytics).toBeDefined();
      expect(typeof route.meta.analytics.pageviewTemplate).toBe('function');
    });
  });
});