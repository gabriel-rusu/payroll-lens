import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { FinalOffer } from '../model/offer-comparison';
import { SavedComparison } from '../model/saved-comparison';

const STORAGE_KEY = 'saved-comparisons';
// Earlier versions appended raw offers here on every save
const LEGACY_STORAGE_KEY = 'offer-comparison';

@Injectable({
  providedIn: 'root',
})
export class ComparisonHistoryService {
  private storage = inject(StorageService);
  private saved = signal<SavedComparison[]>(this.load());

  // Stored oldest first, since every save moves its comparison to the end; shown newest first
  readonly comparisons = computed(() => [...this.saved()].reverse());

  find(id: string): SavedComparison | undefined {
    return this.saved().find((comparison) => comparison.id == id);
  }

  // Updates the comparison with `id` when given, otherwise stores a new one; returns its id
  save(offers: FinalOffer, id?: string): string {
    const comparison: SavedComparison = {
      id: id ?? crypto.randomUUID(),
      savedAt: new Date().toISOString(),
      offers,
    };
    this.persist([...this.saved().filter((saved) => saved.id != comparison.id), comparison]);
    return comparison.id;
  }

  remove(id: string) {
    this.persist(this.saved().filter((comparison) => comparison.id != id));
  }

  private persist(comparisons: SavedComparison[]) {
    this.saved.set(comparisons);
    this.storage.set(STORAGE_KEY, comparisons);
  }

  private load(): SavedComparison[] {
    const saved: SavedComparison[] | null = this.storage.get(STORAGE_KEY);
    if (saved) {
      return saved;
    }
    return this.migrateLegacy();
  }

  // Keeps only distinct legacy entries, in their original order
  private migrateLegacy(): SavedComparison[] {
    const legacy = this.storage.get(LEGACY_STORAGE_KEY);
    const entries: FinalOffer[] = (Array.isArray(legacy) ? legacy : [legacy]).filter(Boolean);
    const distinct = [...new Map(entries.map((offers) => [JSON.stringify(offers), offers])).values()];
    const savedAt = new Date().toISOString();
    const migrated = distinct.map((offers) => ({ id: crypto.randomUUID(), savedAt, offers }));
    if (migrated.length > 0) {
      this.storage.set(STORAGE_KEY, migrated);
      this.storage.remove(LEGACY_STORAGE_KEY);
    }
    return migrated;
  }
}
