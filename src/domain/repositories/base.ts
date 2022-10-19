export interface BaseRepository<I, O> {
  create: (input: I) => Promise<O>;
  update: (id: string, input: Partial<I>,) => Promise<O>;
  delete: (id: string) => Promise<void>;
  findOne: (id: string) => Promise<O>;
  findAll: () => Promise<O[]>;
}