import { Route, Switch } from "wouter";
import AppShell from "@/components/layout/AppShell";
import NotFound from "@/pages/NotFound";
import {
  AIAssistantPage, AnalyticsPage, CodeReviewPage, DashboardPage, HistoryPage, RefactorPage,
  RepositoryPage, SecurityPage, SettingsPage, TestingPage,
} from "@/pages/WorkspacePages";

export default function WorkspaceRoutes() {
  return (
    <AppShell>
      <Switch>
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/review" component={CodeReviewPage} />
        <Route path="/refactor" component={RefactorPage} />
        <Route path="/repository" component={RepositoryPage} />
        <Route path="/security" component={SecurityPage} />
        <Route path="/testing" component={TestingPage} />
        <Route path="/assistant" component={AIAssistantPage} />
        <Route path="/analytics" component={AnalyticsPage} />
        <Route path="/history" component={HistoryPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route component={NotFound} />
      </Switch>
    </AppShell>
  );
}
