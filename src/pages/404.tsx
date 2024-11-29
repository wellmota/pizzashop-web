import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex h-screen flex-col item-center gap-2">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="text-accent-foreground">
        Back to{' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
