import { Typography } from "@material-tailwind/react";

// Import Logo Components
import { Logo } from "../../commonComponents/CommonComponets";

 
const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];
 
const currentYear = new Date().getFullYear();
 
export default function Footer() {
  return (
    <footer className="relative w-full bg-[#040404eb]">
      <div className="mx-auto w-full max-w-7xl px-8 pt-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Logo/>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-3 font-medium text-white"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      color="gray"
                      className="py-1.5 font-normal transition-colors text-[#eaedf1] hover:text-blue-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-[#e2e8f0] md:mb-0"
          >
            &copy; {currentYear} <a href="https://material-tailwind.com/">Travello</a>. All
            Rights Reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}