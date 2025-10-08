"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DocumentFormReturn } from "@/lib/document-form-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getBrandTemplate,
  getBrandTemplateNames,
  getAllBrandTemplates,
  saveCustomBrandTemplate,
  deleteCustomBrandTemplate,
  exportBrandTemplate,
  importBrandTemplate,
  BRAND_TEMPLATES,
} from "@/lib/brand-templates";
import { useState, useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  Download,
  Upload,
  Save,
  Trash2,
  Palette,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function BrandTemplateForm() {
  const form: DocumentFormReturn = useFormContext();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [customTemplateName, setCustomTemplateName] = useState<string>("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allTemplates = getAllBrandTemplates();
  const builtInTemplates = Object.keys(BRAND_TEMPLATES);

  const applyTemplate = (templateName: string) => {
    const template = getBrandTemplate(templateName);
    if (template) {
      form.setValue("config", template);
      toast({
        title: "Template applied",
        description: `"${templateName}" brand template has been applied`,
      });
    }
  };

  const saveCurrentAsTemplate = () => {
    if (!customTemplateName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your template",
      });
      return;
    }

    const currentConfig = form.getValues("config");
    saveCustomBrandTemplate(customTemplateName, currentConfig);
    toast({
      title: "Template saved",
      description: `Saved as "${customTemplateName}"`,
    });
    setCustomTemplateName("");
    setShowSaveDialog(false);
  };

  const deleteTemplate = (templateName: string) => {
    if (builtInTemplates.includes(templateName)) {
      toast({
        title: "Cannot delete",
        description: "Built-in templates cannot be deleted",
      });
      return;
    }

    deleteCustomBrandTemplate(templateName);
    toast({
      title: "Template deleted",
      description: `"${templateName}" has been deleted`,
    });
    setSelectedTemplate("");
    setShowDeleteDialog(false);
  };

  const exportCurrentTemplate = () => {
    const currentConfig = form.getValues("config");
    const json = exportBrandTemplate(currentConfig);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "brand-template.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Template exported",
      description: "Brand template downloaded as JSON",
    });
  };

  const importTemplateFromFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const template = importBrandTemplate(text);
      if (template) {
        form.setValue("config", template);
        toast({
          title: "Template imported",
          description: "Brand template has been applied",
        });
      } else {
        toast({
          title: "Import failed",
          description: "Invalid template file format",
        });
      }
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Could not read template file",
      });
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Brand Templates
        </Label>
        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a template..." />
          </SelectTrigger>
          <SelectContent>
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
              Built-in Templates
            </div>
            {builtInTemplates.map((name) => (
              <SelectItem key={name} value={name}>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </div>
              </SelectItem>
            ))}
            {Object.keys(allTemplates).filter(
              (name) => !builtInTemplates.includes(name)
            ).length > 0 && (
              <>
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">
                  Custom Templates
                </div>
                {Object.keys(allTemplates)
                  .filter((name) => !builtInTemplates.includes(name))
                  .map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="default"
          className="w-full"
          onClick={() => selectedTemplate && applyTemplate(selectedTemplate)}
          disabled={!selectedTemplate}
        >
          <Palette className="w-4 h-4 mr-2" />
          Apply Template
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Current
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Brand Template</DialogTitle>
                <DialogDescription>
                  Save your current brand configuration as a reusable template
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    placeholder="My Brand Template"
                    value={customTemplateName}
                    onChange={(e) => setCustomTemplateName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSaveDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={saveCurrentAsTemplate}>
                  Save Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={
                  !selectedTemplate ||
                  builtInTemplates.includes(selectedTemplate)
                }
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Template</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{selectedTemplate}"? This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => selectedTemplate && deleteTemplate(selectedTemplate)}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={exportCurrentTemplate}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={importTemplateFromFile}
          />
        </div>
      </div>
    </div>
  );
}
