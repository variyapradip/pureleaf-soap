import "./globals.css";
import { Toaster } from 'react-hot-toast';

import {
    Poppins,
    Roboto,
    Roboto_Slab,
    Archivo_Black,
    Quintessential,
} from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    variable: "--font-roboto",
});

const robotoSlab = Roboto_Slab({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-roboto-slab",
});

const archivoBlack = Archivo_Black({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-archivo-black",
});

const quintessential = Quintessential({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-quintessential",
});

export const metadata = {
    title: "PureLeaf Soap",
    description:
        "Handmade herbal soaps crafted with natural ingredients for healthy glowing skin.",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`
                ${poppins.variable}
                ${roboto.variable}
                ${robotoSlab.variable}
                ${archivoBlack.variable}
                ${quintessential.variable}
            `}
        >
            <body>
            <Toaster />
                {children}
            </body>
        </html>
    );
}