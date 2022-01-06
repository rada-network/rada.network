import { usePageStore } from "@lib/usePageStore";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

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

//   switch (dataStore.type) {
//       case "research":

//           break;

//       default:
//           break;
//   }

  return (
    <div className="px-2 md:px-6 xl:px-16 ">
      <ul
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="inline-flex items-center space-x-1 md:space-x-3 list-none my-3"
      >
        {list.map((item) => (
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="inline-flex items-center"
          >
            <i className={`fad fa-${item.isHome ? "home" : "angle-right"}`}></i>
            <a
              itemProp="item"
              href={item.link}
              className="ml-2 text-sm font-medium"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
