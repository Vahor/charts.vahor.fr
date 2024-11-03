import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/sonner";
import { BASE_URL } from "@/lib/constants";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const appName = "Charts";
const title = "Transform your data into beautiful charts.";
const description =
	"Get a beautiful chart in seconds. Choose a chart type and color preset or create your own.";

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	applicationName: appName,
	title: title,
	description,
	authors: [
		{
			name: "Nathan David",
			url: "https://vahor.fr",
		},
	],
	openGraph: {
		locale: "en_US",
		type: "website",
		siteName: appName,
		url: BASE_URL,
		description,
	},
	twitter: {
		creator: "@vahor_",
	},
	keywords: "charts, image, convert, csv, json",
};

export const viewport: Viewport = {
	themeColor: "#1e1e2e",
	colorScheme: "dark",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_30%_30%_at_33%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))] bg-neutral-950" />
				<Toaster />
				{children}
			</body>
		</html>
	);
}
