import { describe, it, expect } from 'vitest';
import TutorialRegistry from '../tutorials';

describe('Tutorial Registry', () => {
    it('should have a DevOps tutorial registered', () => {
        const devops = TutorialRegistry.find(t => t.id === 'devops');
        expect(devops).toBeDefined();
        expect(devops.path).toBe('devops');
    });

    it('should have unique IDs for all tutorials', () => {
        const ids = TutorialRegistry.map(t => t.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });
});
