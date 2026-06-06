"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Download, Upload, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useProgressStore } from "@/stores/progressStore";

export function ProgressActions() {
  const t = useTranslations("progress");
  const tCommon = useTranslations("common");
  const exportJSON = useProgressStore((s) => s.exportJSON);
  const importJSON = useProgressStore((s) => s.importJSON);
  const reset = useProgressStore((s) => s.reset);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isExporting, setIsExporting] = React.useState(false);
  const [isImporting, setIsImporting] = React.useState(false);

  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const json = exportJSON();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `trickdex-progress-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(t("exported"));
    } catch {
      toast.error(t("importedError"));
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportClick = () => {
    if (isImporting) return;
    fileInputRef.current?.click();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    try {
      const text = await file.text();
      const ok = importJSON(text);
      if (ok) {
        toast.success(t("imported"));
      } else {
        toast.error(t("importedError"));
      }
    } finally {
      setIsImporting(false);
      // Reset input para permitir reimportar el mismo archivo
      e.target.value = "";
    }
  };

  const handleReset = () => {
    reset();
    toast.success(t("resetDone"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("actions")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-medium">{t("exportTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("exportDesc")}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={isExporting}
            aria-busy={isExporting}
          >
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {t("exportButton")}
          </Button>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-medium">{t("importTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("importDesc")}</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleFile}
            disabled={isImporting}
          />
          <Button
            variant="outline"
            onClick={handleImportClick}
            disabled={isImporting}
            aria-busy={isImporting}
          >
            {isImporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {t("importButton")}
          </Button>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-medium">{t("resetTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("resetDesc")}</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <RotateCcw className="mr-2 h-4 w-4" />
                {t("resetButton")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("resetTitle")}</DialogTitle>
                <DialogDescription>{t("resetConfirm")}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{tCommon("cancel")}</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={handleReset}>
                    {tCommon("confirm")}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
