export function getRecordById(data: any, id: string) {
    if (!data) { return; }
    for (let item of data) {
      if (item.id === id) {
        return item;
      }
    }
  }