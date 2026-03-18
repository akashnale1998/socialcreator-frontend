"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full space-y-8 p-10 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative space-y-6">
              <div className="mx-auto w-20 h-20 bg-rose-500/20 rounded-2xl flex items-center justify-center border border-rose-500/20">
                <AlertTriangle className="text-rose-500 w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-white">Oops! Something went wrong</h1>
                <p className="text-white/60 text-sm">
                  We encountered an unexpected error. Our team has been notified and we're working to fix it.
                </p>
              </div>

              {this.state.error && (
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-left">
                    <p className="text-xs font-mono text-rose-300 break-words opacity-70">
                        {this.state.error.message}
                    </p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => window.location.reload()}
                  className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
                
                <Link href="/" onClick={() => this.setState({ hasError: false })}>
                  <Button variant="outline" className="w-full gap-2 border-white/10">
                    <Home className="w-4 h-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
