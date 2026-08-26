import { getPayload } from "payload";
import configPromise from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function RecentPostsSection() {
  const payload = await getPayload({ config: configPromise });
  
  const postsReq = await payload.find({
    collection: "posts",
    limit: 3,
    sort: '-publishedAt',
  });
  const posts = postsReq.docs || [];

  if (posts.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-handjet tracking-wider">Latest from our Blog</h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">Tutorials, updates, and thoughts from the community.</p>
          </div>
          <Button asChild variant="outline" className="hidden sm:flex rounded-full">
            <Link href="/posts">
              View All Posts <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => {
             const date = post.publishedAt || post.createdAt;
             const parsedDate = date ? new Date(date) : new Date();
             
             return (
              <Link href={`/posts/${post.slug}`} key={post.id} className="group flex flex-col">
                <div className="relative aspect-[16/10] w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden mb-6 border border-zinc-200 dark:border-zinc-800">
                   {post.heroImage && typeof post.heroImage === 'object' && post.heroImage.url && (
                    <Image 
                      src={post.heroImage.url} 
                      alt={post.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                
                <div className="flex gap-2 mb-3">
                  {post.categories && Array.isArray(post.categories) && post.categories.slice(0, 2).map((cat: unknown) => (
                    <span key={typeof cat === 'object' && cat !== null && 'id' in cat ? (cat as {id: string}).id : String(cat)} className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                      {typeof cat === 'object' && cat !== null && 'title' in cat ? (cat as {title: string}).title : 'Category'}
                    </span>
                  ))}
                </div>
                
                <h3 className="font-bold text-xl md:text-2xl mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                {post.meta && post.meta.description && (
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {post.meta.description}
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-sm text-zinc-500 font-mono mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <Clock className="w-4 h-4" />
                  <span>{parsedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </Link>
             )
          })}
        </div>
        
        <Button asChild variant="outline" className="w-full mt-8 sm:hidden rounded-full">
          <Link href="/posts">
            View All Posts
          </Link>
        </Button>
      </div>
    </section>
  );
}
