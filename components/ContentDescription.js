const ContentDescription = ({ content }) => {
  if (content) {
    content = content.replace(/<img (.*)>/gi, '<img loading="lazy" $1 />');
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default ContentDescription;
