import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseHtmlToText(html: string): string {
  if (!html) return 'No description available.';

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

export function truncateDescription(
  description: string,
  maxLength: number = 120,
): string {
  const parsedDescription = parseHtmlToText(description);
  return (
    parsedDescription.substring(0, maxLength) +
    (parsedDescription.length > maxLength ? '...' : '')
  );
}
