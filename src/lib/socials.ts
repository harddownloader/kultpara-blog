import { FACEBOOK, INSTAGRAM, TELEGRAM } from './const';
import { SocialNetwork } from "@/types/Socials";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from '@mui/icons-material/Telegram';



export const socials: Array<SocialNetwork> = [
  {
    link: FACEBOOK,
    name: 'facebook',
    icon: FacebookIcon,
  },
  {
    link: '',
    name: 'twitter',
    icon: TwitterIcon,
  },
  {
    link: INSTAGRAM,
    name: 'instagram',
    icon: InstagramIcon,
  },
  {
    link: TELEGRAM,
    name: 'telegram',
    icon: TelegramIcon,
  },
];
