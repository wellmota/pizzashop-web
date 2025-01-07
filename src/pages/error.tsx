import { Link, useRouteError } from 'react-router-dom';

export function Error() {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">
        Oh no, something wrong is happening...
      </h1>
      <p>
        An error has happened while trying to load the page. Please try
        refreshing the page or come back later. If the problem persists, contact
        support for further assistance.
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-foreground">
        Back to{' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
