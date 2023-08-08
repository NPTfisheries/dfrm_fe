export function formatLabel(key: string): string {
    // Convert underscores to spaces
    const formattedKey = key.replace(/_/g, ' ');
    
    // Capitalize the first letter of each word
    return formattedKey.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }