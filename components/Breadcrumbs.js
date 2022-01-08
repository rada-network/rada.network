import { usePageStore } from "@lib/usePageStore";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";

const Breadcrumbs = () => {
  const { dataStore } = usePageStore();
  const { locale } = useRouter();
  const { t } = useTranslation("navbar");

  const list = [
    {
      link: "/",
      text: "Home",
      isHome: true,
    },
    {
      link: `/${locale}/explore/${dataStore.type}`,
      text: t(dataStore.type),
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        itemListElements={list.map((item, i) => ({
          position: i+1,
          name: item.text,
          item: item.link
        }))}
      />
    </>
  );
};

export default Breadcrumbs;
