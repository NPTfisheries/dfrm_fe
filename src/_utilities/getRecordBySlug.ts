export function getRecordBySlug(data: any, slug: string) {
    if (!data) { return; }
    for (let item of data) {
      if (item.slug === slug) {
        return item;
      }
    }
  }