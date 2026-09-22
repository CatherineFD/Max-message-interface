class ApiCache {
  private inFlightRequests: Map<string, Promise<unknown>> = new Map();

  async dedupedRequest<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    if (this.inFlightRequests.has(key)) {
      return this.inFlightRequests.get(key) as Promise<T>;
    }

    const promise = requestFn()
      .finally(() => {
        this.inFlightRequests.delete(key);
      });

    this.inFlightRequests.set(key, promise);
    return promise;
  }
}

export const apiCache = new ApiCache();