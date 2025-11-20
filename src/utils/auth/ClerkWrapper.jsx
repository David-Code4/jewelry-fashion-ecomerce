import { ClerkProvider } from "@clerk/astro";

export default function ClerkWrapper({ children }) {
  return (
    <ClerkProvider publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  );
}
