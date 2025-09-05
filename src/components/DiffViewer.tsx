import React from 'react';
import { Plus, Minus, Edit } from 'lucide-react';

interface DiffViewerProps {
  original: string;
  modified: string;
}

interface DiffLine {
  type: 'equal' | 'insert' | 'delete' | 'replace';
  originalLine?: string;
  modifiedLine?: string;
  originalLineNum?: number;
  modifiedLineNum?: number;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ original, modified }) => {
  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');

  // Simple diff algorithm
  const generateDiff = (): DiffLine[] => {
    const diff: DiffLine[] = [];
    let originalIndex = 0;
    let modifiedIndex = 0;

    while (originalIndex < originalLines.length || modifiedIndex < modifiedLines.length) {
      const originalLine = originalLines[originalIndex];
      const modifiedLine = modifiedLines[modifiedIndex];

      if (originalIndex >= originalLines.length) {
        // Only modified lines remaining
        diff.push({
          type: 'insert',
          modifiedLine,
          modifiedLineNum: modifiedIndex + 1,
        });
        modifiedIndex++;
      } else if (modifiedIndex >= modifiedLines.length) {
        // Only original lines remaining
        diff.push({
          type: 'delete',
          originalLine,
          originalLineNum: originalIndex + 1,
        });
        originalIndex++;
      } else if (originalLine === modifiedLine) {
        // Lines are equal
        diff.push({
          type: 'equal',
          originalLine,
          modifiedLine,
          originalLineNum: originalIndex + 1,
          modifiedLineNum: modifiedIndex + 1,
        });
        originalIndex++;
        modifiedIndex++;
      } else {
        // Lines are different - check if one exists ahead
        const originalInModified = modifiedLines.slice(modifiedIndex).indexOf(originalLine);
        const modifiedInOriginal = originalLines.slice(originalIndex).indexOf(modifiedLine);

        if (originalInModified !== -1 && (modifiedInOriginal === -1 || originalInModified <= modifiedInOriginal)) {
          // Original line found in modified, so modified lines before it are inserts
          diff.push({
            type: 'insert',
            modifiedLine,
            modifiedLineNum: modifiedIndex + 1,
          });
          modifiedIndex++;
        } else if (modifiedInOriginal !== -1) {
          // Modified line found in original, so original lines before it are deletes
          diff.push({
            type: 'delete',
            originalLine,
            originalLineNum: originalIndex + 1,
          });
          originalIndex++;
        } else {
          // Lines are different - replacement
          diff.push({
            type: 'replace',
            originalLine,
            modifiedLine,
            originalLineNum: originalIndex + 1,
            modifiedLineNum: modifiedIndex + 1,
          });
          originalIndex++;
          modifiedIndex++;
        }
      }
    }

    return diff;
  };

  const diffLines = generateDiff();
  const stats = {
    additions: diffLines.filter(line => line.type === 'insert').length,
    deletions: diffLines.filter(line => line.type === 'delete').length,
    modifications: diffLines.filter(line => line.type === 'replace').length,
  };

  const getLineStyle = (type: string) => {
    switch (type) {
      case 'insert':
        return 'bg-green-50 border-l-4 border-green-400';
      case 'delete':
        return 'bg-red-50 border-l-4 border-red-400';
      case 'replace':
        return 'bg-orange-50 border-l-4 border-orange-400';
      default:
        return 'bg-white';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'insert':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'delete':
        return <Minus className="h-4 w-4 text-red-600" />;
      case 'replace':
        return <Edit className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Stats Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-6">
          <h3 className="text-lg font-semibold text-gray-900">Diferenças Encontradas</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1 text-green-700">
              <Plus className="h-4 w-4" />
              {stats.additions} adições
            </span>
            <span className="flex items-center gap-1 text-red-700">
              <Minus className="h-4 w-4" />
              {stats.deletions} deleções
            </span>
            <span className="flex items-center gap-1 text-orange-700">
              <Edit className="h-4 w-4" />
              {stats.modifications} modificações
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-200 border-l-2 border-green-400"></div>
            <span className="text-gray-600">Adicionado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-200 border-l-2 border-red-400"></div>
            <span className="text-gray-600">Excluído</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-200 border-l-2 border-orange-400"></div>
            <span className="text-gray-600">Modificado</span>
          </div>
        </div>
      </div>

      {/* Diff Content */}
      <div className="max-h-96 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-gray-200">
          {/* Original Column */}
          <div>
            <div className="sticky top-0 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
              Original
            </div>
            <div className="divide-y divide-gray-100">
              {diffLines.map((line, index) => (
                <div key={`original-${index}`} className={`${getLineStyle(line.type)} min-h-[2rem] flex items-center`}>
                  {line.type !== 'insert' && (
                    <>
                      <div className="w-10 text-xs text-gray-500 text-center flex-shrink-0 px-2">
                        {line.originalLineNum}
                      </div>
                      <div className="flex items-center gap-2 flex-1 px-3 py-1">
                        {getIcon(line.type)}
                        <code className="text-sm font-mono text-gray-800 whitespace-pre-wrap break-all">
                          {line.originalLine || ''}
                        </code>
                      </div>
                    </>
                  )}
                  {line.type === 'insert' && (
                    <div className="w-full h-8 bg-gray-50"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Modified Column */}
          <div>
            <div className="sticky top-0 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
              Modificado
            </div>
            <div className="divide-y divide-gray-100">
              {diffLines.map((line, index) => (
                <div key={`modified-${index}`} className={`${getLineStyle(line.type)} min-h-[2rem] flex items-center`}>
                  {line.type !== 'delete' && (
                    <>
                      <div className="w-10 text-xs text-gray-500 text-center flex-shrink-0 px-2">
                        {line.modifiedLineNum}
                      </div>
                      <div className="flex items-center gap-2 flex-1 px-3 py-1">
                        {getIcon(line.type)}
                        <code className="text-sm font-mono text-gray-800 whitespace-pre-wrap break-all">
                          {line.modifiedLine || ''}
                        </code>
                      </div>
                    </>
                  )}
                  {line.type === 'delete' && (
                    <div className="w-full h-8 bg-gray-50"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffViewer;