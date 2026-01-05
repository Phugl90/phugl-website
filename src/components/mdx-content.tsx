import { remark } from "remark";
import html from "remark-html";

interface MDXContentProps {
  content: string;
}

export async function MDXContent({ content }: MDXContentProps) {
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:leading-relaxed prose-p:text-muted-foreground
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground
        prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-muted prose-pre:border
        prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4
        prose-ul:list-disc prose-ol:list-decimal
        prose-li:text-muted-foreground
        prose-img:rounded-lg prose-img:shadow-md"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
