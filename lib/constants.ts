export const BASE_URL = {
	dev: "http://localhost:3000",
	prod: "https://charts.vahor.fr",
}[process.env.NODE_ENV === "development" ? "dev" : "prod"];
