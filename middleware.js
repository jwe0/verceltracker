import { NextRequest, NextResponse } from "next/server";

const hook = process.env.WEBHOOK;

async function getip() {
    const res = await fetch("https://api.ipify.org?format=json");
    const json = await res.json();
    return json.ip;
}

export async function middleware(req) {

    await fetch(hook, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "Vercel Tracker",
            embeds: [
                {
                    title: "New Request",
                    description: `${req.nextUrl.pathname}`,
                    color: 0x0099ff,
                    fields: [
                        {
                            name: "URL",
                            value: "```" + `${req.nextUrl.pathname}` + "```",
                        },
                        {
                            name: "UA",
                            value: "```" + req.headers.get("user-agent") + "```",
                        },
                        {
                            name: "Params",
                            value: "```" + JSON.stringify(req.nextUrl.searchParams) + "```",
                        },
                        {
                            name: "IP",
                            value: "```" + await getip() + "```",
                        },
                        {
                            name: "Headers",
                            value: "```" + JSON.stringify(Object.fromEntries(req.headers.entries()), null, 4) + "```",
                        }
                    ]
                },
            ],
        }),
    });
    return NextResponse.rewrite(new URL("/mini.png", req.url));
}