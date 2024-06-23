function formatString(
  template: string,
  values: { [key: string]: string }
): string {
  return template.replace(/\[(.*?)\]/g, (match, key) => {
    const value = values[key.trim()];
    if (value) {
      return `<span style="font-weight:600">${value}</span>`;
    }
    return match;
  });
}

export default formatString;
