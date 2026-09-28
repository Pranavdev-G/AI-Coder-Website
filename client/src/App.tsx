import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const WorkspaceRoutes = lazy(() => import("@/components/layout/WorkspaceRoutes"));

function RouteLoading() {
  return <div className="route-loading" role="status"><span className="step-spinner" /> Preparing workspace…</div>;
}

function Router() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route component={WorkspaceRoutes} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <WorkspaceProvider>
            <Toaster theme="dark" position="bottom-right" />
            <Router />
          </WorkspaceProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
