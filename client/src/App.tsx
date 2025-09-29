import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portfolio from "@/pages/Portfolio";
import NotFound from "@/pages/not-found";
import { I18nProvider } from "./i18n";
import { useStableViewport } from "./lib/useStableViewport";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useStableViewport(); 
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Site-wide wrapper */}
        <div className="min-h-fluid bg-background text-foreground font-sans antialiased">
        <I18nProvider>
          <Toaster />
          <Router />
          </I18nProvider>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
