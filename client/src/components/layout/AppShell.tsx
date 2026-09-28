import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  Activity, Bot, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Code2, FlaskConical, Grid2X2,
  Menu, MessageSquareText, Moon, Network, PanelLeftClose, PanelLeftOpen, ScanLine, Settings2, ShieldCheck,
  Sparkles, Sun, X,
} from "lucide-react";
import { navGroups } from "@/data/demoData";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { toast } from "sonner";

const iconMap: Record<string, typeof Grid2X2> = {
  grid: Grid2X2,
  scan: ScanLine,
  sparkles: Sparkles,
  network: Network,
  shield: ShieldCheck,
  flask: FlaskConical,
  message: MessageSquareText,
  chart: Activity,
  clock: Clock3,
  settings: Settings2,
};

const routeTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/review": "Code review",
  "/refactor": "AI refactor",
  "/repository": "Repository intelligence",
  "/security": "Security center",
  "/testing": "Test lab",
  "/assistant": "AI assistant",
  "/analytics": "Engineering analytics",
  "/history": "Review history",
  "/settings": "Settings",
};

export default function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const { model, setModel } = useWorkspace();
  const pageTitle = routeTitles[location] ?? "Workspace";

  useEffect(() => {
    document.body.classList.toggle("light-mode", lightMode);
    return () => document.body.classList.remove("light-mode");
  }, [lightMode]);

  const closeMobile = () => setMobileOpen(false);
  const openHelp = () => toast("Help center", { description: "Demo workspace · keyboard shortcut: ⌘ K" });

  return (
    <div className={`app-shell ${collapsed ? "is-collapsed" : ""}`}>
      {mobileOpen && <button type="button" aria-label="Close navigation" className="mobile-scrim" onClick={closeMobile} />}
      <aside className={`app-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="brand-lockup">
          <Link href="/dashboard" className="brand-mark" aria-label="AI Coder overview" onClick={closeMobile}>
            <span className="brand-glyph"><Code2 size={16} strokeWidth={2.3} /></span>
            {!collapsed && <span className="brand-name">ai<span>coder</span></span>}
          </Link>
          <button className="icon-button sidebar-collapse" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
          <button className="icon-button mobile-close" onClick={closeMobile} aria-label="Close navigation"><X size={18} /></button>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-avatar">S</div>
          {!collapsed && <><div className="workspace-copy"><strong>Studio team</strong><span>Pro workspace</span></div><ChevronDown size={14} className="muted-icon" /></>}
        </div>

        <nav aria-label="Main navigation" className="sidebar-nav">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              {!collapsed && <div className="nav-group-label">{group.label}</div>}
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] ?? Grid2X2;
                const active = location === item.path;
                return (
                  <Link key={item.path} href={item.path} onClick={closeMobile} className={`nav-link ${active ? "active" : ""}`} aria-current={active ? "page" : undefined} title={collapsed ? item.label : undefined}>
                    <Icon size={17} strokeWidth={active ? 2.1 : 1.75} />
                    {!collapsed && <span>{item.label}</span>}
                    {active && <span className="nav-active-rail" />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="usage-box">
            {!collapsed ? <><div className="usage-label"><span>Monthly usage</span><strong>68%</strong></div><div className="usage-track"><span /></div><small>34.2k of 50k credits</small></> : <div className="usage-collapsed" title="Monthly usage: 68%"><Activity size={17} /></div>}
          </div>
          <button className="profile-row" onClick={() => toast("Account", { description: "Developer profile · demo workspace" })}>
            <span className="profile-avatar">JD</span>
            {!collapsed && <><span className="profile-copy"><strong>Jordan Davis</strong><small>Developer</small></span><ChevronDown size={14} /></>}
          </button>
        </div>
      </aside>

      <div className="app-main-column">
        <header className="app-topbar">
          <button type="button" className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={19} /></button>
          <div className="topbar-location"><span className="topbar-root">Workspace</span><ChevronRight size={13} /><span>{pageTitle}</span></div>
          <div className="topbar-actions">
            <label className="model-select-wrap"><Bot size={15} /><span className="model-select-label">Model</span><select aria-label="AI model" value={model} onChange={(event) => setModel(event.target.value)}><option>Balanced</option><option>Fast</option><option>Deep Analysis</option></select><ChevronDown size={12} /></label>
            <span className="topbar-separator" />
            <button type="button" className="icon-button theme-toggle" onClick={() => setLightMode(!lightMode)} aria-label={lightMode ? "Switch to dark theme" : "Switch to light theme"} title="Toggle theme">{lightMode ? <Moon size={16} /> : <Sun size={16} />}</button>
            <button type="button" className="icon-button" onClick={openHelp} aria-label="Help" title="Help"><CircleHelp size={16} /></button>
            <div className="topbar-avatar" aria-label="Jordan Davis">JD</div>
          </div>
        </header>
        <main className="app-content" key={location}>{children}</main>
      </div>
    </div>
  );
}
