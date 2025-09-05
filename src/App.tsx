import { useState, useCallback } from 'react';
import { FileText, Copy, Trash2 } from 'lucide-react';
import DiffViewer from './components/DiffViewer';
import FileUpload from './components/FileUpload';

function App() {
  const [originalContent, setOriginalContent] = useState('');
  const [modifiedContent, setModifiedContent] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  const handleFileUpload = useCallback((content: string, type: 'original' | 'modified') => {
    if (type === 'original') {
      setOriginalContent(content);
    } else {
      setModifiedContent(content);
    }
  }, []);

  const handleCompare = () => {
    if (originalContent.trim() || modifiedContent.trim()) {
      setShowDiff(true);
    }
  };

  const handleClear = () => {
    setOriginalContent('');
    setModifiedContent('');
    setShowDiff(false);
  };

  const handleCopyExample = () => {
    setOriginalContent(`function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

const order = {
  id: 12345,
  items: [
    { name: "Widget A", price: 10.99 },
    { name: "Widget B", price: 15.50 }
  ]
};

console.log("Total:", calculateTotal(order.items));`);

    setModifiedContent(`function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

const order = {
  id: 12345,
  customer: "John Doe",
  items: [
    { name: "Widget A", price: 10.99, quantity: 2 },
    { name: "Widget B", price: 15.50, quantity: 1 },
    { name: "Widget C", price: 8.25, quantity: 3 }
  ]
};

console.log("Order Total:", calculateTotal(order.items));
console.log("Customer:", order.customer);`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">DiffChecker</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare arquivos e textos para encontrar diferenças. Envie arquivos ou cole o conteúdo para ver as mudanças destacadas lado a lado.
          </p>
        </div>

        {!showDiff ? (
          <div className="max-w-6xl mx-auto">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <button
                onClick={handleCopyExample}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Copy className="h-4 w-4" />
                Carregar Exemplo
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Limpar Tudo
              </button>
            </div>

            {/* Input Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Original Content */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Conteúdo Original
                  </h2>
                </div>
                
                <div className="p-6">
                  <FileUpload
                    onFileUpload={(content) => handleFileUpload(content, 'original')}
                    accept=".txt,.js,.jsx,.ts,.tsx,.html,.css,.json,.md,.py,.java,.cpp,.c"
                  />
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ou cole o conteúdo aqui:
                    </label>
                    <textarea
                      value={originalContent}
                      onChange={(e) => setOriginalContent(e.target.value)}
                      placeholder="Cole seu texto original aqui..."
                      className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Modified Content */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Conteúdo Modificado
                  </h2>
                </div>
                
                <div className="p-6">
                  <FileUpload
                    onFileUpload={(content) => handleFileUpload(content, 'modified')}
                    accept=".txt,.js,.jsx,.ts,.tsx,.html,.css,.json,.md,.py,.java,.cpp,.c"
                  />
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ou cole o conteúdo aqui:
                    </label>
                    <textarea
                      value={modifiedContent}
                      onChange={(e) => setModifiedContent(e.target.value)}
                      placeholder="Cole seu texto modificado aqui..."
                      className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Compare Button */}
            <div className="text-center">
              <button
                onClick={handleCompare}
                disabled={!originalContent.trim() && !modifiedContent.trim()}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors transform hover:scale-105 active:scale-95"
              >
                Encontrar Diferenças
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Resultados da Comparação</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDiff(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Editar Conteúdo
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Limpar Tudo
                </button>
              </div>
            </div>

            <DiffViewer
              original={originalContent}
              modified={modifiedContent}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;