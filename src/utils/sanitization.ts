export function sanitizeString(input: any): string {
  if (typeof input !== 'string') {
    return '';
  }
  return input.trim();
}

export function sanitizeInputs(inputs: Record<string, any>): Record<string, string> {
  const sanitized: Record<string, string> = {};
  for (const key in inputs) {
    sanitized[key] = sanitizeString(inputs[key]);
  }
  return sanitized;
}
