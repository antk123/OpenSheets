import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { SpreadsheetTemplate } from '@/data/templates';
import { downloadTemplate } from '@/lib/excel-generator';

interface TemplateDetailModalProps {
  template: SpreadsheetTemplate;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  core: 'bg-sky-100 text-sky-600',
  tax: 'bg-purple-100 text-purple-700',
  reports: 'bg-blue-100 text-blue-700',
  property: 'bg-amber-100 text-amber-700',
  business: 'bg-rose-100 text-rose-700',
};

export function TemplateDetailModal({ template, onClose }: TemplateDetailModalProps) {
  const handleDownload = async () => {
    await downloadTemplate(template);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className={`${template.color} h-2 w-full`} />
        <div className="px-6 pt-4 pb-2">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={categoryColors[template.category] || 'bg-slate-100 text-slate-700'}>
                {template.categoryLabel}
              </Badge>
              {template.isNew && (
                <Badge className="bg-amber-100 text-amber-700">New</Badge>
              )}
              {template.isPopular && (
                <Badge className="bg-sky-100 text-sky-600">Popular</Badge>
              )}
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {template.name}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6">
          <p className="text-slate-600 leading-relaxed mb-6">
            {template.longDescription}
          </p>

          <Separator className="my-4" />

          <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
            What&apos;s Included
          </h4>
          <ul className="space-y-2.5 mb-6">
            {template.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-slate-600">{feature}</span>
              </li>
            ))}
          </ul>

          <Separator className="my-4" />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => { handleDownload(); }}
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white h-12 text-base font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download {template.fileName}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="h-12 text-base font-medium"
            >
              Close
            </Button>
          </div>

          <p className="text-xs text-slate-400 text-center mt-4">
            File format: .xlsx (Microsoft Excel / Google Sheets / LibreOffice)
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
