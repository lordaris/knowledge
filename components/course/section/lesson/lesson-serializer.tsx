import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

export async function getServerSideProps() {
  const mdxSource = await serialize(source);
  return {
    props: {
      mdxSource,
    },
  };
}
