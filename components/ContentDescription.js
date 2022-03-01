import WhiteListTag from "@data/whitelisttags";
import { useRouter } from "next/router";

const ContentDescription = ({ content,allowStyle }) => {
  const { locale } = useRouter();
  allowStyle = allowStyle || false;
  if (content) {
    content = content.replace(/<img (.*)>/gi, '<img loading="lazy" $1 />');
    if (!allowStyle){
      content = content.replace(/style/gi, "");
    }

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