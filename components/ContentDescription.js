import WhiteListTag from "@data/whitelisttags";
import { useRouter } from "next/router";

const ContentDescription = ({ content }) => {
  const { locale } = useRouter();

  if (content) {
    content = content.replace(/<img (.*)>/gi, '<img loading="lazy" $1 />');
    content = content.replace(/style/gi, "");

    WhiteListTag.forEach((tag) => {
      content = content.replace(
        new RegExp(`#${tag}`, "gi"),
        `<a href="/${locale}/tags/${tag.toLowerCase()}">#${tag}</a>`
      );
    });
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default ContentDescription;