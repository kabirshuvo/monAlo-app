'use client';
export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-10 text-center text-red-700">
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
    </div>
  );
}
