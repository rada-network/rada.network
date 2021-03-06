import { createPostUri } from "../components/card-layouts/PostsList";
import slug from "slug";

const utils = {
  timeDifference: function (current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = current - previous;

    const date = new Date(previous);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + "s";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + "m";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + "h";
    } else if (elapsed < msPerMonth) {
      // return Math.round(elapsed/msPerDay) + ' days ago';
      return months[date.getMonth()] + " " + date.getDate();
    } else if (elapsed < msPerYear) {
      const month = Math.round(elapsed / msPerMonth);
      return month + (month < 2 ? " month" : " months");
    } else {
      const year = Math.round(elapsed / msPerYear);
      return year + year < 2 ? " year" : " years";
    }
  },

  titleTime: function (createdAt) {
    const date = new Date(createdAt);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let hour = date.getHours();
    const min = date.getMinutes();
    let ampm = "am";

    if (hour > 12) {
      hour -= 12;
      ampm = "pm";
    }
    const fullDate =
      months[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear();
    return hour + ":" + min + " " + ampm.toUpperCase() + " - " + fullDate;
  },

  numberFormat: function (number, fixed) {
    if (fixed === undefined) fixed = 1;
    const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    let tier = (Math.log10(Math.abs(number)) / 3) | 0;
    if (tier === 0) return number;
    if (tier > SI_SYMBOL.length - 1) tier = SI_SYMBOL.length - 1;
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);
    // scale the number
    const scaled = number / scale;
    // format number and add suffix
    return scaled.toFixed(fixed) + suffix;
  },

  currencyFormat: function (number) {
    const SI_SYMBOL = ["", "K", "M"];
    let tier = (Math.log10(Math.abs(number)) / 3) | 0;
    if (tier === 0) return number;
    if (tier > SI_SYMBOL.length - 1) tier = SI_SYMBOL.length - 1;
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);
    // scale the number
    const scaled = number / scale;
    // format number and add suffix
    return (
      scaled.toLocaleString("us-EN", { style: "currency", currency: "USD" }) +
      suffix
    );
  },

  topicTransform: function (word) {
    switch (word) {
      case "defi":
        return "DeFi";
      case "dapp":
        return "DApp";
      case "nft":
        return "NFT";
      default:
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
  },
  createSiteMetadata: function (
    { page, data, dataStore, subPage },
    locales = [],
    asPath = ""
  ) {
    let base = {
      facebook: {},
      twitter: {},
      keyword: "rada,dao,angellist,blockchain,crypto",
      description:
        "The DAO-based AngelList for Blockchain. As a leading decentralized community-driven LaunchPad, we fund and launch the most promising Gamefi and Blockchain projects.",
      alternate: locales.map((locale) => ({
        hreflang: locale,
        href: `${process.env.NEXT_PUBLIC_URL}/${locale}${asPath}`,
      })),
    };

    if (page === "Index" || page === "launchverse") {
      return Object.assign(base, {
        title: "LaunchVerse",
        description:
          "LaunchVerse is a product of RADA - The DAO-based AngelList for Blockchain. As a leading decentralized community-driven LaunchPad, we fund and launch the most promising Gamefi and Blockchain projects.",
      });
    }

    if (page === "IdeaDetail") {
      let keywords = JSON.parse(data.keywords);
      keywords = Object.entries(keywords);
      let keyword = keywords
        .map(function (item) {
          return item[0];
        })
        .join(",");
      return Object.assign(base, {
        title: data.title,
        description: data.description,
        keyword: keyword,
      });
    }

    if (page === "Tag") {
      return Object.assign(base, {
        title: data.word,
        description: "latest news, social, idea for " + data.word,
      });
    }

    if (page === "Explore") {
      let title = "Network";
      let description = "The DAO based AngelList for Blockchain";

      switch (data.query) {
        case "news":
          title = "News";
          break;
        case "rada":
          title = "Raders";
          break;
        case "research":
          title = "Research";
          break;
        case "articles":
          title = "Articles";
          break;
        case "about-rada":
          title = "About Rada";
          break;
        case "video":
          title = "Video";
          break;

        default:
          title = data.query;
          break;
      }

      return Object.assign(base, {
        title: title,
        description: description,
      });
    }

    if (page === "News") {
      return Object.assign(base, {
        title: "Explore News",
        description: "latest news ",
      });
    }

    if (page === "Social") {
      return Object.assign(base, {
        title: "Explore Social",
        description: "latest socials",
      });
    }

    if (page === "Project") {
      return Object.assign(base, {
        title: "Launchpad Projects",
      });
    }

    if (page == "ProjectDetail") {
      let subTitle = "";
      if (subPage == "research") {
        subTitle = "Research";
      } else if (subPage == "share2earn") {
        subTitle = "Share2Earn";
      }

      return Object.assign(base, {
        title: `${data?.content?.title} ${subTitle}`,
        description: data?.content?.description + "",
        "og:description": data?.content?.description + "",
        "og:image": data?.thumbnail_uri + "",
        canonical: createPostUri(
          data?.news?.title,
          data?.news?.slug,
          data.news,
          dataStore.lang
        ),
      });
    }

    if (page === "ItemDetail") {
      let keywords, keyword;

      if (data.keywords !== null) {
        try {
          keywords = JSON.parse(data.keywords);
          keywords = Object.entries(keywords);
          keyword = keywords
            .map(function (item) {
              return item[0];
            })
            .join(",");
        } catch (e) {
          keyword = data.keywords.replace(/\n/g, ",");
        }
      } else {
        keyword = base.keywords;
      }

      let title = data.title;
      let slug = data.slug;
      if (data.lang && data.lang === "all") {
        if (dataStore.lang === "en") {
          title = data.title_en;
          slug = data.slug_en;
        }
      }

      const multilang = data.multilang?.news ?? data.multilang?.video;
      let alternate = [];

      if (multilang) {
        alternate = locales.map((locale) => ({
          hreflang: locale,
          href:
            process.env.NEXT_PUBLIC_URL +
            createPostUri(title, multilang[locale]?.slug, data.item, locale),
        }));
      }

      base = {
        ...base,
        alternate: alternate,
      };

      return Object.assign(base, {
        title: title,
        description: data.description,
        keyword: keyword,
        "og:title": title,
        "og:type": "Article",
        "og:image": data.thumbnailUri,
        "og:url": createPostUri(title, slug, data.item, dataStore.lang),
        "article:tag": keyword,
        "article:section": data.type,
        "article:published_time": data.createdAt,
        "article:author":
          data.grabTopic !== null ? data.grabTopic.name : "Rada",
        canonical: createPostUri(title, slug, data.item, dataStore.lang),
      });
    }

    if (page === "Search") {
      return Object.assign(base, {
        title: "Search result for " + data.q,
        description: "Search result for " + data.q,
      });
    }
  },
  convertToSlug: function (Text) {
    return slug(Text, { lowercase: true }).toLowerCase();
  },
  slug: function (str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ?? for n, etc
    const from =
      "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????a??/_,:;";
    const to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  },
  url_slug: function (s, opt) {
    s = String(s);
    opt = Object(opt);

    var defaults = {
      delimiter: "-",
      limit: undefined,
      lowercase: true,
      replacements: {},
      transliterate: typeof XRegExp === "undefined" ? true : false,
    };

    // Merge options
    for (var k in defaults) {
      if (!opt.hasOwnProperty(k)) {
        opt[k] = defaults[k];
      }
    }

    var char_map = {
      // Latin
      ??: "A",
      ??: "A",
      ??: "A",
      ??: "A",
      ??: "A",
      ??: "A",
      ??: "AE",
      ??: "C",
      ??: "E",
      ??: "E",
      ??: "E",
      ??: "E",
      ??: "I",
      ??: "I",
      ??: "I",
      ??: "I",
      ??: "D",
      ??: "N",
      ??: "O",
      ??: "O",
      ??: "O",
      ??: "O",
      ??: "O",
      ??: "O",
      ??: "O",
      ??: "U",
      ??: "U",
      ??: "U",
      ??: "U",
      ??: "U",
      ??: "Y",
      ??: "TH",
      ??: "ss",
      ??: "a",
      ??: "a",
      ??: "a",
      ??: "a",
      ??: "a",
      ??: "a",
      ??: "ae",
      ??: "c",
      ??: "e",
      ??: "e",
      ??: "e",
      ??: "e",
      ??: "i",
      ??: "i",
      ??: "i",
      ??: "i",
      ??: "d",
      ??: "n",
      ??: "o",
      ??: "o",
      ??: "o",
      ??: "o",
      ??: "o",
      ??: "o",
      ??: "o",
      ??: "u",
      ??: "u",
      ??: "u",
      ??: "u",
      ??: "u",
      ??: "y",
      ??: "th",
      ??: "y",

      // Latin symbols
      "??": "(c)",

      // Greek
      ??: "A",
      ??: "B",
      ??: "G",
      ??: "D",
      ??: "E",
      ??: "Z",
      ??: "H",
      ??: "8",
      ??: "I",
      ??: "K",
      ??: "L",
      ??: "M",
      ??: "N",
      ??: "3",
      ??: "O",
      ??: "P",
      ??: "R",
      ??: "S",
      ??: "T",
      ??: "Y",
      ??: "F",
      ??: "X",
      ??: "PS",
      ??: "W",
      ??: "A",
      ??: "E",
      ??: "I",
      ??: "O",
      ??: "Y",
      ??: "H",
      ??: "W",
      ??: "I",
      ??: "Y",
      ??: "a",
      ??: "b",
      ??: "g",
      ??: "d",
      ??: "e",
      ??: "z",
      ??: "h",
      ??: "8",
      ??: "i",
      ??: "k",
      ??: "l",
      ??: "m",
      ??: "n",
      ??: "3",
      ??: "o",
      ??: "p",
      ??: "r",
      ??: "s",
      ??: "t",
      ??: "y",
      ??: "f",
      ??: "x",
      ??: "ps",
      ??: "w",
      ??: "a",
      ??: "e",
      ??: "i",
      ??: "o",
      ??: "y",
      ??: "h",
      ??: "w",
      ??: "s",
      ??: "i",
      ??: "y",
      ??: "y",
      ??: "i",

      // Turkish
      ??: "S",
      ??: "I",
      ??: "C",
      ??: "U",
      ??: "O",
      ??: "G",
      ??: "s",
      ??: "i",
      ??: "c",
      ??: "u",
      ??: "o",
      ??: "g",

      // Russian
      ??: "A",
      ??: "B",
      ??: "V",
      ??: "G",
      ??: "D",
      ??: "E",
      ??: "Yo",
      ??: "Zh",
      ??: "Z",
      ??: "I",
      ??: "J",
      ??: "K",
      ??: "L",
      ??: "M",
      ??: "N",
      ??: "O",
      ??: "P",
      ??: "R",
      ??: "S",
      ??: "T",
      ??: "U",
      ??: "F",
      ??: "H",
      ??: "C",
      ??: "Ch",
      ??: "Sh",
      ??: "Sh",
      ??: "",
      ??: "Y",
      ??: "",
      ??: "E",
      ??: "Yu",
      ??: "Ya",
      ??: "a",
      ??: "b",
      ??: "v",
      ??: "g",
      ??: "d",
      ??: "e",
      ??: "yo",
      ??: "zh",
      ??: "z",
      ??: "i",
      ??: "j",
      ??: "k",
      ??: "l",
      ??: "m",
      ??: "n",
      ??: "o",
      ??: "p",
      ??: "r",
      ??: "s",
      ??: "t",
      ??: "u",
      ??: "f",
      ??: "h",
      ??: "c",
      ??: "ch",
      ??: "sh",
      ??: "sh",
      ??: "",
      ??: "y",
      ??: "",
      ??: "e",
      ??: "yu",
      ??: "ya",

      // Ukrainian
      ??: "Ye",
      ??: "I",
      ??: "Yi",
      ??: "G",
      ??: "ye",
      ??: "i",
      ??: "yi",
      ??: "g",

      // Czech
      ??: "C",
      ??: "D",
      ??: "E",
      ??: "N",
      ??: "R",
      ??: "S",
      ??: "T",
      ??: "U",
      ??: "Z",
      ??: "c",
      ??: "d",
      ??: "e",
      ??: "n",
      ??: "r",
      ??: "s",
      ??: "t",
      ??: "u",
      ??: "z",

      // Polish
      ??: "A",
      ??: "C",
      ??: "e",
      ??: "L",
      ??: "N",
      ??: "o",
      ??: "S",
      ??: "Z",
      ??: "Z",
      ??: "a",
      ??: "c",
      ??: "e",
      ??: "l",
      ??: "n",
      ??: "o",
      ??: "s",
      ??: "z",
      ??: "z",

      // Latvian
      ??: "A",
      ??: "C",
      ??: "E",
      ??: "G",
      ??: "i",
      ??: "k",
      ??: "L",
      ??: "N",
      ??: "S",
      ??: "u",
      ??: "Z",
      ??: "a",
      ??: "c",
      ??: "e",
      ??: "g",
      ??: "i",
      ??: "k",
      ??: "l",
      ??: "n",
      ??: "s",
      ??: "u",
      ??: "z",
    };

    // Make custom replacements
    for (var k in opt.replacements) {
      s = s.replace(RegExp(k, "g"), opt.replacements[k]);
    }

    // Transliterate characters to ASCII
    if (opt.transliterate) {
      for (var k in char_map) {
        s = s.replace(RegExp(k, "g"), char_map[k]);
      }
    }

    // Replace non-alphanumeric characters with our delimiter
    var alnum =
      typeof XRegExp === "undefined"
        ? RegExp("[^a-z0-9]+", "ig")
        : XRegExp("[^\\p{L}\\p{N}]+", "ig");
    s = s.replace(alnum, opt.delimiter);

    // Remove duplicate delimiters
    s = s.replace(RegExp("[" + opt.delimiter + "]{2,}", "g"), opt.delimiter);

    // Truncate slug to max. characters
    s = s.substring(0, opt.limit);

    // Remove delimiter from ends
    s = s.replace(
      RegExp("(^" + opt.delimiter + "|" + opt.delimiter + "$)", "g"),
      ""
    );

    return opt.lowercase ? s.toLowerCase() : s;
  },
  stripHTML: function (str) {
    return str?.replace(/<[^>]+>/g, "");
  },
};

export default utils;
