export default function isAntiSelectEvent(event: Event): boolean {
  return (
    ('metaKey' in event && event.metaKey === true) ||
    ('ctrlKey' in event && event.ctrlKey === true)
  );
}
