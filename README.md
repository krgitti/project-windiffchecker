# DiffChecker (project-windiffchecker)

Aplicação web para comparar textos/arquivos e visualizar diferenças lado a lado, construída com React, TypeScript, Vite e Tailwind CSS.

### ✨ Recursos
- **Upload** de arquivos para cada lado (original e modificado)
- **Colagem** de texto diretamente nos campos
- Visualização de diferenças com destaque
- Ações rápidas: carregar exemplo, limpar conteúdo

### 🧰 Stack
- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Ícones: `lucide-react`

### ✅ Requisitos
- Node.js 18+ (recomendado 18 LTS ou superior)
- Gerenciador de pacotes: npm, pnpm ou yarn

## 🚀 Como rodar localmente
Instale as dependências e suba o servidor de desenvolvimento.

```bash
# usando npm
npm install
npm run dev

# ou pnpm
pnpm install
pnpm dev

# ou yarn
yarn
yarn dev
```

Abra o endereço exibido no terminal (geralmente `http://localhost:5173`).

## 🏗️ Build para produção

```bash
# npm
npm run build
npm run preview

# pnpm
pnpm build
pnpm preview

# yarn
yarn build
yarn preview
```

## 📁 Estrutura do projeto
```
project-windiffchecker/
  ├─ src/
  │  ├─ components/
  │  │  ├─ DiffViewer.tsx
  │  │  └─ FileUpload.tsx
  │  ├─ App.tsx
  │  ├─ index.css
  │  ├─ main.tsx
  │  └─ vite-env.d.ts
  ├─ index.html
  ├─ package.json
  ├─ tailwind.config.js
  ├─ postcss.config.js
  ├─ tsconfig.json
  ├─ tsconfig.app.json
  ├─ tsconfig.node.json
  └─ vite.config.ts
```

## 🧪 Como usar
1. Na tela inicial, use os botões para **Carregar Exemplo** ou **Limpar Tudo**.
2. Em cada coluna, faça o **upload** de um arquivo ou **cole** o texto.
3. Clique em **Encontrar Diferenças** para abrir o visualizador lado a lado.
4. Use o botão **Editar Conteúdo** para retornar e ajustar os textos.

## 🔧 Scripts disponíveis
- `dev`: inicia o servidor de desenvolvimento do Vite
- `build`: gera o build de produção
- `preview`: serve o build localmente para inspeção
- `lint`: roda o ESLint

## 🎨 Estilos (Tailwind CSS)
As diretivas do Tailwind são importadas em `src/index.css`:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

## 🐛 Solução de problemas
- "Unknown at rule @tailwind": substituído por `@import` no `index.css` para evitar avisos do linter.
- Avisos TS sobre imports não usados: removidos imports/declarações não utilizadas em `src/App.tsx`.

## 📄 Licença
Este projeto é disponibilizado sob a licença MIT. Contribuições são bem-vindas!
