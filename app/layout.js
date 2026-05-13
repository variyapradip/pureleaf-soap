import "./globals.css";

export const metadata = {
    title: "PureLeaf Soap",
    description:
        "Handmade herbal soaps crafted with natural ingredients for healthy glowing skin.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}