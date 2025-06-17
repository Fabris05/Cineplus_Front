import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
    try {
        const data = await request.formData();
        const file = data.get("imagen");

        if (!file) {
            return new Response(JSON.stringify({ error: "No file provided" }), {
                status: 400,
            });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filePath = path.join(
            process.cwd(),
            "public",
            "images",
            "movies",
            file.name
        );
        await writeFile(filePath, buffer);

        return new Response(
            JSON.stringify({ message: "Archivo subido", filename: file.name }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error: " + error }), {
            status: 500,
        });
    }
}
