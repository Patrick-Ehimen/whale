import {
  ChinaIcon,
  DutchIcon,
  UkIcon,
  FranceIcon,
  SpainIcon,
  SwedenIcon,
  MarginTrade,
  MobileApp,
  TradeApi,
  Wallet,
  Widget,
  News,
} from "@/public";

export const languages = [
  {
    code: "en",
    name: "English",
    flag: UkIcon,
  },
  {
    code: "de",
    name: "German",
    flag: DutchIcon,
  },
  {
    code: "fr",
    name: "French",
    flag: FranceIcon,
  },
  {
    code: "zh",
    name: "Chinese",
    flag: ChinaIcon,
  },
  {
    code: "sv",
    name: "Swedish",
    flag: SwedenIcon,
  },
  {
    code: "es",
    name: "Spanish",
    flag: SpainIcon,
  },
];

export const hoverMenuItems = [
  {
    id: 1,
    img: MarginTrade,
    title: "Margin Trading",
    para: "Trade digital assets with leverage on our Broker.",
    link: "#",
  },
  {
    id: 2,
    img: MobileApp,
    title: "Mobile App",
    para: "Buy, Sell, Earn and exchange crypto anywhere and anytime.",
    link: "#",
  },
  {
    id: 3,
    img: TradeApi,
    title: "Trading API",
    para: "  Automate your cryptocurrency trading with reliable and stable API. ",
    link: "#",
  },
  {
    id: 4,
    img: News,
    title: "News",
    para: "Read the latest crypto news & make beter investing decions.",
    link: "#",
  },
  {
    id: 5,
    img: Widget,
    title: "Widgets",
    para: "Set up and our widgets to your website and attracr visitors.",
    link: "#",
  },
  {
    id: 6,
    img: Wallet,
    title: "Wallet",
    para: "Buy crypto with your card, trade, and earn on your holdings from our Defi wallet.",
    link: "#",
  },
];

export const navigationItems = [
  { label: "Buy Crypto", href: "/buy-crypto" },
  { label: "Market", href: "/" },
  { label: "NFT", href: "/", badge: "NEW" },
  { label: "Promotion", href: "/" },
  { label: "About", href: "/" },
  { label: "Blog", href: "/" },
];
