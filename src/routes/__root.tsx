// @refresh reset
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PortalAuthProvider } from "@/lib/portal-auth";
import { useRouterState } from "@tanstack/react-router";
import { FloatingChatbot } from "@/components/ai/FloatingChatbot";
import { CookieConsent } from "@/components/site/CookieConsent";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pediatric Urgent Care™ — Expert Care. At Your Door." },
      {
        name: "description",
        content:
          "Board-certified Nurse Practitioners visit your home across Ontario. Same-day pediatric sick visits, vaccinations, and follow-ups. PHIPA compliant.",
      },
      { name: "author", content: "Pediatric Urgent Care" },
      { property: "og:title", content: "Pediatric Urgent Care™ — Expert Care. At Your Door." },
      { property: "og:description", content: "Pediatric Urgent Care™ offers on-demand pediatric home visits and clinic services across Ontario." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Pediatric Urgent Care™ — Expert Care. At Your Door." },
      { name: "description", content: "Pediatric Urgent Care™ offers on-demand pediatric home visits and clinic services across Ontario." },
      { name: "twitter:description", content: "Pediatric Urgent Care™ offers on-demand pediatric home visits and clinic services across Ontario." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4a6a7d48-033b-45d8-96c3-b88b409c4b8b/id-preview-1a550d5c--7ead7cd0-0fe6-42da-8708-7387154de864.lovable.app-1779869842577.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4a6a7d48-033b-45d8-96c3-b88b409c4b8b/id-preview-1a550d5c--7ead7cd0-0fe6-42da-8708-7387154de864.lovable.app-1779869842577.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isPortal =
    path === "/login" ||
    path.startsWith("/parent") ||
    path.startsWith("/np") ||
    path.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <PortalAuthProvider>
        {!isPortal && <Header />}
        <main id="main">
          <Outlet />
        </main>
        {!isPortal && <Footer />}
        {!isPortal && <FloatingChatbot />}
        {!isPortal && <CookieConsent />}
      </PortalAuthProvider>
    </QueryClientProvider>
  );
}
